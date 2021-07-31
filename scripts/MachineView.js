

class MachineView{

    constructor(_Machine , _settingsSerializer,_instructionListSerializer){

        this.M =  _Machine;

        if(_settingsSerializer==null){
            _settingsSerializer= SettingsSerializer.getDefault();
        }
        if(_instructionListSerializer ==null){
            _instructionListSerializer = InstructionListSerializer.getDefault();
        }
        this.M.setSettings(_settingsSerializer);
        this.M.setInstructionList(_instructionListSerializer);


        this.valueDisplayer = new ValueDisplayer(this.M.settings,this.M.instructionList);


        this.registerViews = [];
        this.signalViews=[];
        this.busViews =[];
        this.jalView=null;

        this.memViews = [];


        this.registerSelectedCallbacks = [];
        this.memorySlotSellectedCallbacks = [];


    }


    addOnRegisterSelectedCallback(_funk){
        this.registerSelectedCallbacks.push(_funk);
    }

    selectRegister(_reg){
        for (let index = 0; index < this.registerSelectedCallbacks.length; index++) {
            const funk = this.registerSelectedCallbacks[index];
            funk(_reg);
        }
    }

    addOnMemorySlotSellectedCallback(_funk){
        this.memorySlotSellectedCallbacks.push(_funk);
    }

    selectMemorySlot(_index){
        for (let index = 0; index < this.memorySlotSellectedCallbacks.length; index++) {
            const funk = this.memorySlotSellectedCallbacks[index];
            funk(_index);
        }
    }



    setupMachine(){
        this.setupRegisterViews(this.M.registers);
        this.setupSignalViews(this.M.singnalDictionary);

        
        this.setupMemoryViews(this.M.MEM)
        this.memViews.forEach(view => {
            this.fillMemoryView(this.M.MEM,view);
        });
        

        this.setRZButtons(this.M.RZ_register);

        this.setupBusHorizontal(this.M.S_bus,"s-bus")
        this.setupBusHorizontal(this.M.A_bus,"a-bus")
        this.setupBusVertical(this.M.S_bus,"as-bus")

    }


    displayRegister(_register,_element){
        const regName = _register.name;
        const value = this.valueDisplayer.registerToString(_register)


        _element.innerHTML=regName + ": " +value;
        if(_register.wasWriten){
            _element.classList.add("reg-selected");
        }else{
            _element.classList.remove("reg-selected");
        }

    
        if((this.M.settings.extentionFlags &_register.getExtention())===0){
            
            _element.classList.add("reg-hidden");
        }else{
            
            _element.classList.remove("reg-hidden");
        }

    }


    createRegisterElement(_register){
        let element  = document.createElement("div")
        element.classList.add("reg");
        element.innerHTML=this.displayRegister(_register,element);


        _register.addOnUpdateCallback(_reg=>{
                this.displayRegister(_reg,element);
            }
        );

        element.onclick = ()=>{
            this.selectRegister(_register);
        }

        _register.update();
        return element;
    }

    setupRegisterViews(_registers){
        _registers.forEach(reg => {
            let regWrappers = document.getElementsByClassName(reg.name+"-r");
            
            for (let i = 0; i < regWrappers.length; i++) {
                const wrapper = regWrappers[i];
                const regView = this.createRegisterElement(reg);
                
                this.registerViews.push(regView);
                wrapper.appendChild(regView);
                
            }   
        });
    }


    createSignalElement(_signal){
        let element  = document.createElement("div")
        element.classList.add("sig");

        if(_signal.isImpulse){
            element.classList.add("sig-impulse");
        }
        element.innerHTML=_signal.name;



        _signal.addOnUpdateCallback(_sig=>{

            if((this.M.settings.extentionFlags & _sig.getExtention()) === 0 ){
                element.classList.add("sig-hidden");
            }else{
                element.classList.remove("sig-hidden");
            }

            if(this.M.isSignalSelected(_signal.name)){
            
                element.classList.add("sig-selected");
            }else{
                element.classList.remove("sig-selected");
            }
        });


        element.onclick =()=>{
            let name = _signal.name;
            if(M.isSignalSelected(name)){
                M.deSelectSignalManual(name);
            }else{
                M.selectSignalManual(name);
            }
        };

        
        _signal.update();
        return element;
    }


    setupSignalViews(_signalDict){
        for (const signalName in _signalDict) {
            if (Object.hasOwnProperty.call(_signalDict, signalName)) {
                const signal = _signalDict[signalName];
                
                let signalWrappers = document.getElementsByClassName(signalName+"-s");
                
                for (let i = 0; i < signalWrappers.length; i++) {
                    const wrapper = signalWrappers[i];
                    const sigView = this.createSignalElement(signal);

                    this.signalViews.push(sigView);
                    wrapper.appendChild(sigView); 
                } 
            }
        }
    }



    displayMemoryEntry(_memory,_adress){
        const val = _memory.getValue(_adress);

        const decimal =this.valueDisplayer.wordToString(val,ValueDisplayEnum.UnsignedDecimal);

        const code =this.valueDisplayer.wordToString(val,ValueDisplayEnum.OpCodeArgument);

        return _adress+": "+decimal+" "+code;

    }

    createMemoryBodyElement(_memory){
        let element  = document.createElement("div")
        element.classList.add("mem");
        return element;
    }

    createMemoryEntryElement(_memory,_adress){
        let element  = document.createElement("div")
        element.classList.add("mem-entry");
        element.innerHTML=this.displayMemoryEntry(_memory,_adress);
        element.onclick = ()=>{this.selectMemorySlot(_adress)};
        
        return element;
    }


    setupMemoryViews(_memory){
        const memWrapperName = "mem-body";
        let memWrappers = document.getElementsByClassName(memWrapperName);

        for (let index = 0; index < memWrappers.length; index++) {
            const wrapper = memWrappers[index];
            const element = this.createMemoryBodyElement(_memory);


            this.memViews.push(element);
            wrapper.appendChild(element);

            _memory.addOnValueChangedCallback((_mem,_adr)=>{
                element.children[_adr].innerHTML=this.displayMemoryEntry(_mem,_adr);
            });

            _memory.addOnMemoryChangedCallback((_mem)=>{
                for (let index = 0; index < element.children.length; index++) {
                    const child = element.children[index];
                    child.innerHTML=this.displayMemoryEntry(_mem,index);
                }
                
            });
            element.highlight = 0;
            this.M.A_register.addOnUpdateCallback(_reg=>{
                const adr = _reg.getValue();
                element.children[element.highlight].classList.remove("mem-entry-selected");
                element.children[adr].classList.add("mem-entry-selected");
                element.highlight = adr;

            })
        }
    }


    fillMemoryView(_memory, _view){

        for (let adress = 0; adress < _memory.length(); adress++) {
            const element = this.createMemoryEntryElement(_memory,adress);

            _view.appendChild(element);
            
        }
    }



    createRZButton(_RZreg,_index,_label){
        let element  = document.createElement("button")
        element.onclick=()=>{
            _RZreg.value = _RZreg.getValue()|(1<<(_RZreg.width-1))>>_index;
            _RZreg.update();
        };
        element.innerHTML=_label;
        element.classList.add("rz-button");
        return element;
    }


    setRZButtons(_RZreg){
        let buttonWrappers = document.getElementsByClassName("rz-1");
        for (let index = 0; index < buttonWrappers.length; index++) {
            const wrapper = buttonWrappers[index];
            wrapper.appendChild(this.createRZButton(_RZreg,0,1));
        }
        buttonWrappers = document.getElementsByClassName("rz-2");
        for (let index = 0; index < buttonWrappers.length; index++) {
            const wrapper = buttonWrappers[index];
            wrapper.appendChild(this.createRZButton(_RZreg,1,2));
        }
        buttonWrappers = document.getElementsByClassName("rz-3");
        for (let index = 0; index < buttonWrappers.length; index++) {
            const wrapper = buttonWrappers[index];
            wrapper.appendChild(this.createRZButton(_RZreg,2,3));
        }
        buttonWrappers = document.getElementsByClassName("rz-4");
        for (let index = 0; index < buttonWrappers.length; index++) {
            const wrapper = buttonWrappers[index];
            wrapper.appendChild(this.createRZButton(_RZreg,3,4));
        }
    }



    displayBus(_bus,_busElement){
        if(_bus.hasValue()){
            _busElement.classList.add("bus-selected");
        }else{
            
            _busElement.classList.remove("bus-selected");
        }
    }

    createBusHorizontal(_bus){
        let element  = document.createElement("div")
        element.classList.add("bus-hor");
        this.displayBus(_bus,element);

        _bus.addOnUpdateCallback((_b)=>{
            this.displayBus(_b,element);
        })


        return element;
    }

    createBusVertical(_bus){
        let element  = document.createElement("div")
        element.classList.add("bus-vert");

        _bus.addOnUpdateCallback((_b)=>{
            this.displayBus(_b,element);
        })

        this.displayBus(_bus,element);
        return element;
    }


    setupBusHorizontal(_bus,_wrapperClassName){
        const wrappers = document.getElementsByClassName(_wrapperClassName);
        for (let i = 0; i < wrappers.length; i++) {
            const element = wrappers[i];
            const busele = this.createBusHorizontal(_bus);
            element.appendChild ( busele);
        }
    }

    setupBusVertical(_bus, _wrapperClassName){
        const wrappers = document.getElementsByClassName(_wrapperClassName);
        for (let i = 0; i < wrappers.length; i++) {
            const element = wrappers[i];
            const busele = this.createBusVertical(_bus);
            element.appendChild ( busele);
            
        }
    }

}


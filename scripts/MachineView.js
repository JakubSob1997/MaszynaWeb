





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


        this.valueDusplayer = new ValueDisplayer(this.M.settings,this.M.instructionList);


        this.registerViews = [];
        this.signalViews=[];
        this.busViews =[];
        this.jalView=null;

        this.memViews = [];


    }




    setupMachine(){
        this.setupRegisterViews(this.M.registers);
        this.setupSignalViews(this.M.singnalDictionary);

        this.setupMemoryViews(this.M.MEM)
        this.memViews.forEach(view => {
            this.fillMemoryView(this.M.MEM,view);
        });
    }




    displayRegister(_register){
        const regName = _register.name;
        const value = this.valueDusplayer.registerToString(_register)

        return regName + ": " +value;


        
    }


    createRegisterElement(_register){
        let element  = document.createElement("div")
        element.classList.add("reg");
        element.innerHTML=this.displayRegister(_register);


        _register.addOnUpdateCallback(_reg=>{
                element.innerHTML=this.displayRegister(_reg);
                if(_reg.wasWriten){
                    element.classList.add("register-selected");
                }else{
                    element.classList.remove("register-selected");
                }
            }
        );
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
        element.innerHTML=_signal.name;



        _signal.addOnUpdateCallback(_sig=>{

            if((this.M.settings.extentionFlags & _sig.extention) === 0 ){
                element.classList.add("sig-hidden");
            }else{
                element.classList.remove("sig-hidden");
            }

            if(this.M.isSignalSelected(_signal.name)){
            
                element.classList.add("signal-selected");
            }else{
                element.classList.remove("signal-selected");
            }
        });
        
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



    createMemoryBodyElement(_memory){
        let element  = document.createElement("div")
        element.classList.add("mem");
        return element;
    }

    createMemoryEntryElement(_memory,_adress){
        let element  = document.createElement("div")
        element.classList.add("mem-entry");
        element.innerHTML=_memory.getValue(_adress);

        _memory.addOnValueChangedCallback((_mem,_adr)=>{
            if(_adr==_adress){
                element.innerHTML=_memory.getValue(_adress);
            }
        });

        _memory.addOnMemoryChangedCallback((_mem)=>{
            element.innerHTML=_memory.getValue(_adress);
            
        });


        this.M.A_register.addOnUpdateCallback(_reg=>{
            if(_adress==_reg.getValue()){
                element.classList.add("mem-entry-selected");
            }else{
                element.classList.remove("mem-entry-selected");
            }

        })

        
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

            
        }
    }


    fillMemoryView(_memory, _view){
        for (let adress = 0; adress < _memory.length(); adress++) {
            const element = this.createMemoryEntryElement(_memory,adress);
            _view.appendChild(element);
        }
    }

    clearMemoryView(){

    }





}









import ValueDisplayer from "./value-displayer.js"
import { SignalOrientation,ValueDisplayEnum } from "./enums.js";
import MachineViewRegister from "./machine-vew-register.js";
import MachineViewSignal from "./machine-view-signal.js";
import MachineViewIntButton from "./machine-view-int-button.js"





export default class MachineView{

    constructor(_Machine){

        this.M =  _Machine;



        this.valueDisplayer = new ValueDisplayer(this.M.settings,this.M.instructionList);


        this.registerViews = [];
        this.signalViews=[];
        this.busViews =[];
        this.jalView=null;

        this.memViews = [];


        this.registerSelectedCallbacks = [];
        this.memorySlotSellectedCallbacks = [];


    }


    getCurentExtentions(){
        return this.M.settings.extentionFlags;
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
        

        this.setIntButtons(this.M.InteruptDevices);

        this.setupBusHorizontal(this.M.S_bus,"s-bus")
        this.setupBusHorizontal(this.M.A_bus,"a-bus")
        this.setupBusVertical(this.M.AS_bus,"as-bus")

    }

    setupRegisterViews(_registers){
        _registers.forEach(reg => {
            let regWrappers = document.getElementsByClassName(reg.name+"-r");
            
            for (let i = 0; i < regWrappers.length; i++) {
                const wrapper = regWrappers[i];
                const regView = new MachineViewRegister(this,reg);
                
                this.registerViews.push(regView);
                wrapper.appendChild(regView.getHTMLElement());
                
            }   
        });
    }


    setupSignalViews(_signalDict){
        for (const signalName in _signalDict) {
            if (Object.hasOwnProperty.call(_signalDict, signalName)) {
                const signal = _signalDict[signalName];
                
                let signalWrappers = document.getElementsByClassName(signalName+"-s");
                
                for (let i = 0; i < signalWrappers.length; i++) {
                    const wrapper = signalWrappers[i];
                    const sigView = new MachineViewSignal(this,signal);

                    this.signalViews.push(sigView);
                    wrapper.appendChild(sigView.getHTMLElement()); 
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
        element.classList.add("int-button");
        element.classList.add("custom-btn");
        return element;
    }

    setIntButtons(_interuptDevices){
        let buttonWrappers = document.getElementsByClassName("rz-1");
        for (let index = 0; index < buttonWrappers.length; index++) {
            const wrapper = buttonWrappers[index];
            const view =  new MachineViewIntButton(this,_interuptDevices.button1,"1");
            wrapper.appendChild(view.getHTMLElement());
        }
        buttonWrappers = document.getElementsByClassName("rz-2");
        for (let index = 0; index < buttonWrappers.length; index++) {
            const wrapper = buttonWrappers[index];
            const view =  new MachineViewIntButton(this,_interuptDevices.button2,"2");
            wrapper.appendChild(view.getHTMLElement());
        }
        buttonWrappers = document.getElementsByClassName("rz-3");
        for (let index = 0; index < buttonWrappers.length; index++) {
            const wrapper = buttonWrappers[index];
            const view =  new MachineViewIntButton(this,_interuptDevices.button3,"3");
            wrapper.appendChild(view.getHTMLElement());
        }
        buttonWrappers = document.getElementsByClassName("rz-4");
        for (let index = 0; index < buttonWrappers.length; index++) {
            const wrapper = buttonWrappers[index];
            const view =  new MachineViewIntButton(this,_interuptDevices.button4,"4");
            wrapper.appendChild(view.getHTMLElement());
        }
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


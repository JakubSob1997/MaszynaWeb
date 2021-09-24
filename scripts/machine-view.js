import ValueDisplayer from "./value-displayer.js"
import { SignalOrientation,ValueDisplayEnum } from "./enums.js";
import MachineViewRegister from "./machine-vew-register.js";
import MachineViewSignal from "./machine-view-signal.js";
import MachineViewMemory from "./machine-view-memory.js";
import MachineViewIntButton from "./machine-view-int-button.js"
import MachineViewBus from "./machine-view-bus.js";




export default class MachineView{

    constructor(_Machine){

        this.M =  _Machine;



        this.valueDisplayer = new ValueDisplayer(this.M.settings,this.M.instructionList);


        this.registerViews = [];
        this.signalViews=[];
        this.busViews =[];
        this.memViews = [];


        this.registerSelectedCallbacks = [];
        this.memorySlotSellectedCallbacks = [];

        
        this.M.settings.addOnExtensionFlagsChangedListener(()=>{
            this.registerViews.forEach(ele=>{ele.display();})
            this.signalViews.forEach(ele=>{ele.display();})
            this.memViews.forEach(ele=>{ele.display();})
            this.signalViews.forEach(ele=>{ele.display();})
        });


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
        

        this.setIntButtons(this.M.InteruptDevices);

        this.setupBus(this.M.S_bus,"s-bus",false)
        this.setupBus(this.M.A_bus,"a-bus",false)
        this.setupBus(this.M.AS_bus,"as-bus",true)

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


    setupMemoryViews(_memory){
        const memWrapperName = "mem-body";
        let memWrappers = document.getElementsByClassName(memWrapperName);

        for (let index = 0; index < memWrappers.length; index++) {
            const wrapper = memWrappers[index];
            const element = new MachineViewMemory(this,_memory);

            
            this.memViews.push(element);
            wrapper.appendChild(element.getHTMLElement());
            
        }
    }



    setIntButton(_wrapperName,_intDevice,_label){
        const buttonWrappers = document.getElementsByClassName(_wrapperName);
        for (let index = 0; index < buttonWrappers.length; index++) {
            const wrapper = buttonWrappers[index];
            const view =  new MachineViewIntButton(this,_intDevice,_label);
            wrapper.appendChild(view.getHTMLElement());
        }
    }

    setIntButtons(_interuptDevices){
        this.setIntButton("rz-1",_interuptDevices.button1,"1")
        this.setIntButton("rz-2",_interuptDevices.button2,"2")
        this.setIntButton("rz-3",_interuptDevices.button3,"3")
        this.setIntButton("rz-4",_interuptDevices.button4,"4")
    }
  

    setupBus(_bus,_wrapperClassName,_isVertical){
        const wrappers = document.getElementsByClassName(_wrapperClassName);
        for (let i = 0; i < wrappers.length; i++) {
            const element = wrappers[i];
            const busView = new MachineViewBus(this,_bus,_isVertical);
            element.appendChild ( busView.getHTMLElement());
            
            this.busViews.push(busView);
        }
    }



}









import MachineViewElement from "./machine-view-element.js";
import { SignalOrientation } from "./enums.js";
import Translator from "./translator.js";

export default class MachineViewSignal extends MachineViewElement{


    constructor(_machineView,_signal){
        
        
        super(_machineView);


        this.signal = _signal;

        this.element;
        this.build(_machineView,_signal);
        this.addCallbacks();

        this.display();


    }

    build(_machineView,_signal){
        this.element = document.createElement("button");

        //Disable if not manual controll
        this.setEneable(_machineView.M.manualControll);

        //Set if impulse
        this.element.classList.add("sig");
        if(_signal.isImpulse){
            this.element.classList.add("sig-impulse");
        }

        this.element.setAttribute("role","checkbox")
        this.element.setAttribute("aria-checked","false")
        this.element.setAttribute("aria-label",Translator.getTranslation("_signal","Signal"))
        
        //Set orinetation
        if(_signal.orientation==SignalOrientation.Right){
            this.element.classList.add("sig-right");
        }else if(_signal.orientation==SignalOrientation.Left){
            this.element.classList.add("sig-left");
        }

        this.element.innerText=_signal.name;

    }

    addCallbacks(){
        this.signal.addOnUpdateCallback((_sig)=>{
            this.display();
        });

        this.element.addEventListener("click",()=>{
            const name  =this.signal.name;
            if(this.machineView.M.isSignalSelected(name)){
                this.machineView.M.deSelectSignalManual(name);
            }else{
                this.machineView.M.selectSignalManual(name);
            }
        })
    }

    onExtensionChanged(){
        this.pickEnabled();
        this.display();
    }

    display(){
        
        const allExtentions = this.machineView.M.settings.extentionFlags;
        const myExtention =this.signal.getExtention();

        if(( allExtentions&myExtention ) == 0 ){
            this.element.classList.add("sig-hidden");
        }else{
            this.element.classList.remove("sig-hidden");
        }

        if(this.machineView.M.isSignalSelected(this.signal.name)){
            this.element.classList.add("sig-selected");
            this.element.setAttribute("aria-checked","true")
        }else{
            this.element.classList.remove("sig-selected");
            this.element.setAttribute("aria-checked","false")
        }

    }

    setEneable(_boolean){
        this.element.toggleAttribute("disabled",_boolean===false);
    }

    getHTMLElement(){
        return this.element;
    }

    pickEnabled(){

        
        const allExtentions = this.machineView.M.settings.extentionFlags;
        const myExtention =this.signal.getExtention();


        const isInModule = (allExtentions&myExtention)!=0
        const isManual=this.machineView.M.manualControll;

        this.setEneable((isInModule&&isManual));
    }

}





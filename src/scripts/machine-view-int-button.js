

import MachineViewElement from "./machine-view-element.js";
import { ExtnensionFlags } from "./enums.js";
import Translator from "./translator.js";


export default class MachineViewIntButton extends MachineViewElement{

    constructor(_machineView,_intDevice,_label){
        super(_machineView);

        this.element;
        this.build(_intDevice,_label)
    }

    build(_intDevice,_label){
        this.element = document.createElement("button")
        this.element.onclick=()=>{
            _intDevice.throwInterupt();
        };
        this.element.innerText=_label;
        this.element.classList.add("int-button");
        this.element.classList.add("custom-btn");
        this.element.setAttribute("aria-label",Translator.getTranslation("_int_button_label","Interrupt button"))

        this.display();
    }

    getHTMLElement(){
        return this.element;
    }

    display(){


        const allExtentions = this.machineView.M.settings.extentionFlags;
        const myExtention =ExtnensionFlags.Interupt;

        if((allExtentions&myExtention)===0){
            this.element.classList.add("int-button-hidden");
            this.element.disabled = true;
        }else{
            this.element.classList.remove("int-button-hidden");
            this.element.disabled = false;
        }

        
    }

}

















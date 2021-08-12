

import MachineViewElement from "./machine-view-element.js";



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
        this.element.innerHTML=_label;
        this.element.classList.add("int-button");
        this.element.classList.add("custom-btn");
    }

    getHTMLElement(){
        return this.element;
    }

}

















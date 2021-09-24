

import { ExecutionMode } from "./enums.js";
import SettingView from "./settings-view.js";


export default class ExecutionModeSetting extends SettingView{

    constructor(_Settings){
        super("Poziom Śledzenia")


        this.build(_Settings);

    }


    buildRadio(_name,_value,_parent){
        let radio = document.createElement("input");
        let label=document.createElement("label");
        let wrapper=document.createElement("div");
        const id = _name+"-"+_value;

        radio.type="radio";
        radio.name ="execution-mode";
        radio.id=id;
        label.innerHTML=_name;
        label.setAttribute("for",id)


        wrapper.appendChild(radio);
        wrapper.appendChild(label);
        _parent.appendChild(wrapper);
        return radio;

    }


    build(){

        this.buildRadio("Takt",ExecutionMode.OneCycle,this.content);
        //this.buildRadio("N Taktów",ExecutionMode.NCycles,this.content);
        this.buildRadio("Rozkaz",ExecutionMode.Instruction,this.content);
        this.buildRadio("Program",ExecutionMode.Program,this.content);
        
    }


}
















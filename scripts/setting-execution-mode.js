

import { ExecutionMode } from "./enums.js";
import SettingView from "./settings-view.js";


export default class ExecutionModeSetting extends SettingView{

    constructor(_Settings){
        super("Poziom Śledzenia")

        this.settings = _Settings;
        this.radioDict={};
        this.build();


        this.selectRadio(_Settings.executionMode);

        this.settings.addOnSettingsChangedListener((_s)=>{
            this.selectRadio(_s.executionMode);
        })
        
    }



    selectRadio(_executionMode){

        if(this.radioDict.hasOwnProperty(_executionMode)){
            for (const key in this.radioDict) {
                if (Object.hasOwnProperty.call(this.radioDict, key)) {
                    const radio = this.radioDict[key];
                    if(key===_executionMode){
                        this.radioDict[_executionMode].setAttribute("checked","true");
                    }else{
                        this.radioDict[_executionMode].setAttribute("checked","false");
                    }
                    
                }
            }
           
        }
    }

    onRadioChosen(_value){
        this.settings.setExecutionMode(parseInt(_value));
    }


    buildRadio(_name,_value,_parent){
        let radio = document.createElement("input");
        let label=document.createElement("label");
        let wrapper=document.createElement("div");
        const id = _name+"-"+_value;

        radio.type="radio";
        radio.name ="execution-mode";
        radio.id=id;
        radio.value=_value;

        radio.addEventListener("input",(e)=>{this.onRadioChosen(radio.value)});

        this.radioDict[_value] = radio;


        label.innerText=_name;
        label.setAttribute("for",id)


        wrapper.appendChild(radio);
        wrapper.appendChild(label);
        _parent.appendChild(wrapper);
        return radio;

    }


    build(){

        this.buildRadio("Takt",ExecutionMode.Cycle,this.content);
        this.buildRadio("Rozkaz",ExecutionMode.Instruction,this.content);
        this.buildRadio("Program",ExecutionMode.Program,this.content);
        
    }


}
















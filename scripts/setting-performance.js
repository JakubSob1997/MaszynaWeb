

import Alerter from "./alerter.js";
import { AlertStyleEnum } from "./enums.js";
import SettingView from "./settings-view.js";
import Settings from "./settings.js";
import Translator from "./translator.js";



export default  class PerofrmanceSetting extends SettingView{

    constructor(_Settings){
        super(Translator.getTranslation("_performance","Performance"));

        this.settings= _Settings;

        this.build();

        this.setupFields(_Settings);

        this.settings.addOnSettingsChangedListener((_s)=>{
            this.setupFields(_s);
        })
    }


    setupFields(_settings){
        this.cyclesBeetwenInput.value=_settings.cyclesBeetwenUpdate;
    }

    submitSettings(){

        const cyclesBeetwenVal = parseInt(this.cyclesBeetwenInput.value)

        try{
            this.settings.setPerformanceSettings(cyclesBeetwenVal)
            Alerter.sendMessage(
                `${this.header.innerText}: ${this.cyclesBeetwenLabel.innerText} - ${this.settings.cyclesBeetwenUpdate}`,
                AlertStyleEnum.InputSucces
                );
        }catch(error){
            Alerter.sendMessage(error.InputSucces);
        }
        
    }


    build(){

        this.content.classList.add("setting-label-input")


        //Max cycles
        const cyclesBeetwenid = "cyclesBeetwenSetting"

        this.cyclesBeetwenDiv = document.createElement("div");
        this.cyclesBeetwenInput = document.createElement("input");
        this.cyclesBeetwenLabel = document.createElement("label");

        this.cyclesBeetwenInput.type="number";
        this.cyclesBeetwenInput.setAttribute("min",Settings.MinCyclesBeetwenUpdate.toString());
        this.cyclesBeetwenInput.setAttribute("max",Settings.MaxCyclesBeetwenUpdate.toString());
        this.cyclesBeetwenInput.setAttribute("step","100");
        this.cyclesBeetwenLabel.innerText=Translator.getTranslation("_cycles_beetwen","Cycles beetwen each update");

        this.cyclesBeetwenInput.id=cyclesBeetwenid;
        this.cyclesBeetwenLabel.setAttribute("for",cyclesBeetwenid)

        this.cyclesBeetwenDiv.appendChild(this.cyclesBeetwenLabel);
        this.cyclesBeetwenDiv.appendChild(this.cyclesBeetwenInput);
        
        this.cyclesBeetwenInput.addEventListener("keydown",(e)=>{
            if(e.keyCode==13){
                this.submitSettings();
            }
        })

        this.confirmButton = document.createElement("button");
        this.confirmButton.innerText=Translator.getTranslation("_set","Set");
        this.confirmButton.classList.add("custom-btn");

        this.confirmButton.addEventListener("click",()=>{
            this.submitSettings();
        })


        this.content.appendChild(this.cyclesBeetwenDiv);
        this.content.appendChild(this.confirmButton);


    }

}
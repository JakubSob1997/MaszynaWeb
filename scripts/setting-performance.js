

import Alerter from "./alerter.js";
import { AlertStyleEnum } from "./enums.js";
import SettingView from "./settings-view.js";
import Settings from "./settings.js";



export default  class PerofrmanceSetting extends SettingView{

    constructor(_Settings){
        super("Wydajność");

        this.settings= _Settings;

        this.build();

        this.setupFields(_Settings);

        this.settings.addOnSettingsChangedListener((_s)=>{
            this.setupFields(_s);
        })
    }


    setupFields(_settings){
        this.pseudoThreadsInput.value=_settings.pseudoThreads;
        this.cyclesBeetwenInput.value=_settings.cyclesBeetwenUpdate;
    }

    submitSettings(){

        const pseudoThreadsVal = parseInt(this.pseudoThreadsInput.value)
        const cyclesBeetwenVal = parseInt(this.cyclesBeetwenInput.value)

        try{
            this.settings.setPerformanceSettings(pseudoThreadsVal,cyclesBeetwenVal)
            Alerter.sendMessage(
                `${this.header.innerText}: ${this.pseudoThreadsLabel.innerText} - ${this.settings.pseudoThreads}, ${this.cyclesBeetwenLabel.innerText} - ${this.settings.cyclesBeetwenUpdate}`,
                AlertStyleEnum.InputSucces
                );
        }catch(error){
            Alerter.sendMessage(error.InputSucces);
        }
        
    }


    build(){

        this.content.classList.add("setting-label-input")


        //Pseudo threads
        const pseudoThreadsid = "pseudoThreadsSetting"

        this.pseudoThreadsDiv = document.createElement("div");
        this.pseudoThreadsInput = document.createElement("input");
        this.pseudoThreadsLabel=document.createElement("label");

        this.pseudoThreadsInput.type="number";
        this.pseudoThreadsInput.setAttribute("min",Settings.MinPseudoThreads.toString());
        this.pseudoThreadsInput.setAttribute("max",Settings.MaxPseudoThreads.toString());
        this.pseudoThreadsInput.setAttribute("step","1");

        this.pseudoThreadsLabel.innerHTML="Ilość Pseudo Wątków";
        
        
        this.pseudoThreadsDiv.appendChild(this.pseudoThreadsLabel);
        this.pseudoThreadsDiv.appendChild(this.pseudoThreadsInput);
        
        this.pseudoThreadsInput.id=pseudoThreadsid;
        this.pseudoThreadsLabel.setAttribute("for",pseudoThreadsid)

        this.pseudoThreadsInput.addEventListener("keydown",(e)=>{
            if(e.keyCode==13){
                this.submitSettings();
            }
        })

        //Max cycles
        const cyclesBeetwenid = "cyclesBeetwenSetting"

        this.cyclesBeetwenDiv = document.createElement("div");
        this.cyclesBeetwenInput = document.createElement("input");
        this.cyclesBeetwenLabel = document.createElement("label");

        this.cyclesBeetwenInput.type="number";
        this.cyclesBeetwenInput.setAttribute("min",Settings.MinCyclesBeetwenUpdate.toString());
        this.cyclesBeetwenInput.setAttribute("max",Settings.MaxCyclesBeetwenUpdate.toString());
        this.cyclesBeetwenInput.setAttribute("step","100");
        this.cyclesBeetwenLabel.innerHTML="Ilość cyklów między odświeżeniami";

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
        this.confirmButton.innerHTML="Ustaw";
        this.confirmButton.classList.add("custom-btn");

        this.confirmButton.addEventListener("click",()=>{
            this.submitSettings();
        })


        this.content.appendChild(this.pseudoThreadsDiv);
        this.content.appendChild(this.cyclesBeetwenDiv);
        this.content.appendChild(this.confirmButton);


    }

}
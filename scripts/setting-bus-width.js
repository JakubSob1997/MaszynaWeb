

import Alerter from "./alerter.js";
import { AlertStyleEnum } from "./enums.js";
import SettingView  from "./settings-view.js";
import Settings from "./settings.js";

export default class BusWidthSettingView extends SettingView{

    constructor(_Settings){
        super("Szerokość Magistral");

        _Settings.addOnBusWidthChangedListener((_newSettngs)=>{
            this.onSettingsChanged(_newSettngs);
        })

        this.settings=_Settings;

        this.content.classList.add("setting-label-input")
        const addrid = "addres-width-setting";
        const codeid = "code-width-setting";

        this.codeWidthLabel = document.createElement("label");
        this.codeWidthInput=document.createElement("input");
        this.adressWidtLabel=document.createElement("label");
        this.adressWidthInput=document.createElement("input");
        this.submitButton=document.createElement("button");

        this.codeWidthLabel.innerHTML="Ilość bitów kodu";
        this.adressWidtLabel.innerHTML="Ilość bitów adresu";
        this.submitButton.innerHTML="Ustaw";

        this.codeWidthInput.id  = codeid;
        this.adressWidthInput.id = addrid;
        this.codeWidthInput.setAttribute("type","number");
        this.adressWidthInput.setAttribute("type","number");
        this.codeWidthInput.setAttribute("min",Settings.MinCodeWidth.toString());
        this.adressWidthInput.setAttribute("min",Settings.MinAddresWidth.toString());
        this.codeWidthInput.setAttribute("max",Settings.MaxCodeWidth.toString());
        this.adressWidthInput.setAttribute("max",Settings.MaxAddresWidth.toString());

        this.codeWidthLabel.setAttribute("for",codeid);
        this.adressWidtLabel.setAttribute("for",addrid);

        this.codeWidthInput.value=_Settings.codeWidth.toString();
        this.adressWidthInput.value=_Settings.adressWidth.toString();

        this.submitButton.classList.add("custom-btn");

        this.content.appendChild(this.codeWidthLabel)
        this.content.appendChild(this.codeWidthInput);
        this.content.appendChild(this.adressWidtLabel);
        this.content.appendChild(this.adressWidthInput);
        this.content.appendChild(this.submitButton);


        this.codeWidthInput.addEventListener("keydown",(e)=>{
            if(e.keyCode==13){
                this.submitSettings();
            }
        })
        this.adressWidthInput.addEventListener("keydown",(e)=>{
            if(e.keyCode==13){
                this.submitSettings();
            }
        })



        this.submitButton.addEventListener("click",()=>{
            this.submitSettings();
        })


    }

    onSettingsChanged(_newSettngs){
        this.codeWidthInput.value=_newSettngs.codeWidth.toString();
        this.adressWidthInput.value=_newSettngs.adressWidth.toString();
    }

    submitSettings(){

        let codeWidth = parseInt(this.codeWidthInput.value);
        let adressWidth = parseInt(this.adressWidthInput.value);

        try {
            
            this.settings.setBusWidth(codeWidth,adressWidth);
            Alerter.sendMessage(
                `${this.header.innerText}: ${this.codeWidthLabel.innerText} - ${this.settings.codeWidth}, ${this.adressWidtLabel.innerText} - ${this.settings.adressWidth}`,
                AlertStyleEnum.InputSucces
                );
        } catch (error) {
            Alerter.sendMessage(error,AlertStyleEnum.InputError);
        }
        
    }


}


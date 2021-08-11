import Alerter from "./alerter.js";
import { AlertStyleEnum } from "./enums.js";
import Settings from "./settings.js";




export class SettingView{
    constructor(_name){
        this.wrapper=document.createElement("div");
        this.header=document.createElement("h4");
        this.content = document.createElement("div");

        this.wrapper.classList.add("generic-setting");
        this.header.classList.add("generic-setting-header");
        this.content.classList.add("generic-setting-content");


        this.header.innerHTML = _name;

        this.wrapper.appendChild(this.header);
        this.wrapper.appendChild(this.content);
    }


    getHTMLElement(){
        return this.wrapper;
    }
}

export class SimolationLevelSetting extends SettingView{

    constructor(){
        super("Poziom śledzenia");
    }

}




export class ExtnetionPickerSetting extends SettingView{
    constructor(){
        super("Wybór modółów maszyny W");
    }

    
}


export class BusWidthSetting extends SettingView{

    constructor(_Settings){
        super("Szerokość magistral");

        _Settings.addOnBusWidthChangedListener((_newSettngs)=>{
            this.onSettingsChanged(_newSettngs);
        })

        this.settings=_Settings;

        this.codeWidthLabel = document.createElement("div");
        this.codeWidthInput=document.createElement("input");
        this.adressWidtLabel=document.createElement("div");
        this.adressWidthInput=document.createElement("input");
        this.submitButton=document.createElement("button");

        this.codeWidthLabel.innerHTML="Ilość bitów kodu";
        this.adressWidtLabel.innerHTML="Ilość bitów adresu";
        this.submitButton.innerHTML="Ustaw";

        this.codeWidthInput.setAttribute("type","number");
        this.adressWidthInput.setAttribute("type","number");
        this.codeWidthInput.setAttribute("min",Settings.MinCodeWidth.toString());
        this.adressWidthInput.setAttribute("min",Settings.MinAddresWidth.toString());
        this.codeWidthInput.setAttribute("max",Settings.MaxCodeWidth.toString());
        this.adressWidthInput.setAttribute("max",Settings.MaxAddresWidth.toString());


        this.codeWidthInput.value=_Settings.codeWidth.toString();
        this.adressWidthInput.value=_Settings.adressWidth.toString();

        this.submitButton.classList.add("custom-btn");

        this.content.appendChild(this.codeWidthLabel)
        this.content.appendChild(this.codeWidthInput);
        this.content.appendChild(this.adressWidtLabel);
        this.content.appendChild(this.adressWidthInput);
        this.content.appendChild(this.submitButton);


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

        this.settings.setBusWidth(codeWidth,adressWidth);
        try {
            
        } catch (error) {
            Alerter.sendMessage(error,AlertStyleEnum.InputError);
        }
        
    }


}




export class InteruptAdressSetting extends SettingView{

    constructor(){
        super("Adresy przerwań");
    }

}

export class IOInteruptSetting extends SettingView{
    constructor(){
        super("Przerwania We/Wy")
    }
}



export class PerofrmanceSetting extends SettingView{

    constructor(){
        super("Wydajność");

        
    }

}




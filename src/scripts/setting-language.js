

import Alerter from "./alerter.js";
import { AlertStyleEnum } from "./enums.js";
import SettingView from "./settings-view.js";
import Settings from "./settings.js";
import Translator from "./translator.js";



export default  class LanguageSetting extends SettingView{

    constructor(){
        super(Translator.getTranslation("_language","Language"));

        this.build();


    }


   generateOption(_value,_name){
        let option = document.createElement("option");
        option.value=_value;
        option.innerText=_name;
        if(_value === "DEFAULT"||_value ==="DEBUG"){
            option.lang="en"
        }else{
            option.lang=_value;
        }
        return option;
   }

    build(){

        const id = "setting-languge-select"
        this.label = document.createElement("label");
        this.label.textContent=Translator.getTranslation("_language_select","Select Language: ")
        this.readme = document.createElement('div');
        this.readme.textContent=Translator.getTranslation("_language_refresh","Page refreshes on language change.")
        
        this.readme.classList.add("info-tip")

        this.select = document.createElement("select");
        this.select.id=id;
        

        //this.label.setAttribute("for",id);
        //this.select.appendChild(this.generateOption("DEFAULT","Default"));
        //this.select.appendChild(this.generateOption("DEBUG","Debug"));
        this.select.appendChild(this.generateOption("en","English 🇬🇧"));
        this.select.appendChild(this.generateOption("pl","Polski 🇵🇱"));
        //this.select.appendChild(this.generateOption("de","Deutche"));


        this.content.appendChild(this.label);
        this.content.appendChild(this.select);
        this.content.appendChild(this.readme);

        this.select.value= Translator.language;

        this.select.addEventListener("change",()=>{
            Translator.setLanguage(this.select.value)
            location.reload();         
        })
    }

}
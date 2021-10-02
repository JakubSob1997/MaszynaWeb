

import Alerter from "./alerter.js";
import { AlertStyleEnum } from "./enums.js";
import SettingView from "./settings-view.js";
import Settings from "./settings.js";
import Translator from "./translator.js";



export default  class LanguageSetting extends SettingView{

    constructor(){
        super("Język");

        this.build();


    }


   generateOption(_value,_name){
        let option = document.createElement("option");
        option.value=_value;
        option.innerText=_name;
        return option;
   }

    build(){

        const id = "setting-languge-select"
        this.label = document.createElement("label");
        this.label.textContent="Wybierz Język:"
        this.readme = document.createElement('div');
        this.readme.textContent="*Przy zmianie języka strona się odświerza."
        
        this.readme.classList.add("info-tip")

        this.select = document.createElement("select");
        this.select.id=id;
        

        //this.label.setAttribute("for",id);

        this.select.appendChild(this.generateOption("DEBUG","Debug"));
        this.select.appendChild(this.generateOption("en","English"));
        this.select.appendChild(this.generateOption("pl","Polski"));



        this.content.appendChild(this.label);
        this.content.appendChild(this.select);
        this.content.appendChild(this.readme);

        this.select.value= Translator.getLanguage();
        console.log(this.select.value);

        this.select.addEventListener("input",()=>{
            Translator.setLanguage(this.select.value)
            localStorage.setItem("lang",this.select.value);
            location.reload();         
        })
    }

}
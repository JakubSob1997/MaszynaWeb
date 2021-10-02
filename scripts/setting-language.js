

import Alerter from "./alerter.js";
import { AlertStyleEnum } from "./enums.js";
import SettingView from "./settings-view.js";
import Settings from "./settings.js";



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
        this.label.innerText="Wybierz Język:"
        
        this.select = document.createElement("select");
        this.select.id=id;
        this.label.setAttribute("for",id);

        this.select.appendChild(this.generateOption("DEBUG","Debug"));
        this.select.appendChild(this.generateOption("en","English"));
        this.select.appendChild(this.generateOption("pl","Polski"));

        this.content.appendChild(this.label);
        this.content.appendChild(this.select);
    }

}
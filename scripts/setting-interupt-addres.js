

import Alerter from "./alerter.js";
import { AlertStyleEnum } from "./enums.js";
import SettingView from "./settings-view.js";
import Translator from "./translator.js";





export default class InteruptAddresSetting extends SettingView{

    constructor(_settings){
        super(Translator.getTranslation("_interupt_addreses","Interupt Addreses"));
    
        this.inputs=[];
        this.labels=[]

        this.settings = _settings;

        this.build();
        this.fill(_settings);

        _settings.addOnSettingsChangedListener((_s)=>{
            this.fill(_s)
        })
    }


    addEntry(_index,_parent){
        const wrapper = document.createElement("div");
        const label = document.createElement("label");
        const input = document.createElement("input");

        const id  = "interupt-addres-setting-"+_index;

        wrapper.classList.add("interupt-addres-setting-entry");


        input.type = "number"
        input.min = 0;
        input.id = id;

        label.setAttribute("for",id);

        label.textContent=Translator.getTranslation("_interupt_label","Interupt @0",[_index+1]);

        input.addEventListener("keydown",(e)=>{
            if(e.keyCode===13){
                this.onSetButton();
            }
        })

        this.inputs.push(input);
        this.labels.push(label);

        wrapper.appendChild(label);
        wrapper.appendChild(input);
        
        

        _parent.appendChild(wrapper);

    }

    build(){


        this.setButton = document.createElement("button");
        this.setButton.textContent=Translator.getTranslation("_set","Set");
        
        this.setButton.classList.add("custom-btn")
  
  
        this.addEntry(0,this.content);
        this.addEntry(1,this.content);
        this.addEntry(2,this.content);
        this.addEntry(3,this.content);
  
        this.content.appendChild(this.setButton);

        this.setButton.addEventListener("click",()=>{
            this.onSetButton();
        })
  
  
    }

    fill(_settings){

        for (let i = 0; i < this.inputs.length; i++) {
            const input = this.inputs[i];
            const addres = _settings.intAdressList[i]
            

            input.value = addres;
        }
        
    }
    onSetButton(){

        let adressses = [];
        
        
        //Build input
        for (let i = 0; i < 4; i++) {
            const element = 4[i];
            adressses[i]= parseInt (this.inputs[i].value);
        }
        let message = `${this.header.textContent}:`
        try {
            this.settings.setInteruptAddreses(adressses);

            //Build response
            for (let i = 0; i < 4; i++) {
                message+=` ${this.labels[i].textContent} - ${this.settings.intAdressList[i]},`
                

            }
            message=message.slice(0,message.length-1);
            Alerter.sendMessage(message,AlertStyleEnum.InputSucces)

        } catch (error) {
            Alerter.sendMessage(error,AlertStyleEnum.InputError);
        }

        
        

    }


}
















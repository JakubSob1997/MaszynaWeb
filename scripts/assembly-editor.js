

import SidebarContent from "./sidebar-content.js";
import AssemblyParser from "./assembly-parser.js"
import Alerter from "./alerter.js";
import { AlertStyleEnum } from "./enums.js";
import Terminator from "./terminator.js";
import AssemblySerializer from "./assembly-serializer.js";
import SerializerManager from "./serializer-manager.js";



export default class AssemblyEditor extends SidebarContent{
    constructor(_machine){

        super();
        

        this.wrapper;
        this.title;
        this.textArea;
        this.loadButton;
        this.copyButton;

        this.M = _machine;

        this.serializer = new AssemblySerializer(this);
        


        this.build();
        this.addCallbacks();
        this.load();

        SerializerManager.addSerializer(this.serializer);

    }

    getHTMLElement(){
        return this.wrapper;
    }
    focus(){
        this.title.focus();
    }


    build(){


        this.wrapper = document.createElement("div");
        this.title=document.createElement("h3");
        this.textArea =document.createElement("textarea");
        this.loadButton = document.createElement("button");
        this.copyButton = document.createElement("button");

        this.title.setAttribute("tabindex",-1);
        this.textArea.setAttribute("spellcheck","false");

        this.wrapper.classList.add("generic-inspector")
        this.loadButton.classList.add("custom-btn");
        
        this.title.innerHTML="Program"
        this.loadButton.innerHTML="Ładuj do pamięci";


        this.wrapper.appendChild(this.title);
        this.wrapper.appendChild(this.textArea);
        this.wrapper.appendChild(this.loadButton);

        


    }

    addCallbacks(){
        this.loadButton.onclick = ()=>{this.onLoadButton();};
    }

    getCode(){
        return this.textArea.value;
    }

    setCode(_code){
        this.textArea.value = _code;
    }

    save(){
        this.serializer.saveToLocalStorage();
    }

    load(){
        this.serializer.loadFromLocalStorage();
    }


    onInput(){
        this.save();
    }

    onLoadButton(){
        
        Terminator.terminate();
        this.save();
        this.parser = new AssemblyParser(this.textArea.value,this.M.settings,this.M.instructionList);
        

        if( this.parser.parseSuccesful){
            this.M.setComponentsDefault();
            this.M.resetInternalState();
            
            this.M.MEM.loadMemory( this.parser.values);

            Alerter.sendMessage("Program załadowany poprawnie!",AlertStyleEnum.Succes);
        }else{

            Alerter.sendMessage(this.parser.errorMessage,AlertStyleEnum.SyntaxError);
        }

    }


}


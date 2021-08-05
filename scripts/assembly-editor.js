

import SidebarContent from "./sidebar-content.js";
import AssemblyParser from "./assembly-parser.js"

export default class AssemblyEditor extends SidebarContent{
    constructor(_machine){

        super();
        this.wrapper = document.createElement("div");
        this.title=document.createElement("h3");
        this.textArea =document.createElement("textarea");
        this.loadButton = document.createElement("button");
        this.copyButton = document.createElement("button");
        this.warningArea = document.createElement("div");

        this.M = _machine;

        this.build();

        this.addCallbacks();

        this.load();

    }

    getHTMLElement(){
        return this.wrapper;
    }
    focus(){
        this.title.focus();
    }


    build(){
        this.title.setAttribute("tabindex",-1);

        this.wrapper.appendChild(this.title);
        this.wrapper.appendChild(this.textArea);
        
        this.wrapper.appendChild(this.loadButton);
        this.wrapper.appendChild(this.warningArea);

        this.title.innerHTML="Program"
        this.loadButton.innerHTML="Ładuj";

        this.loadButton.classList.add("custom-btn");
    }

    addCallbacks(){
        this.loadButton.onclick = ()=>{this.onLoadButton();};
    }

    save(){
        localStorage.setItem("codeTextArea",this.textArea.value);
    }

    load(){
        this.textArea.value=localStorage.getItem("codeTextArea");
    }


    onInput(){
        this.save();
    }

    onLoadButton(){
        
        this.save();
        this.parser = new AssemblyParser(this.textArea.value,this.M.settings,this.M.instructionList);
        if( this.parser.parseSuccesful){
            this.M.setComponentsDefault();
            this.M.resetInternalState();
            
            this.M.MEM.loadMemory( this.parser.values);
            this.warningArea.innerHTML ="Succes";
        }else{
            this.warningArea.innerHTML =  this.parser.errorMessage;
        }

    }


}


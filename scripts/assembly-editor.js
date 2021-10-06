

import SidebarContent from "./sidebar-content.js";
import AssemblyParser from "./assembly-parser.js"
import Alerter from "./alerter.js";
import { AlertStyleEnum } from "./enums.js";
import Terminator from "./terminator.js";
import AssemblySerializer from "./assembly-serializer.js";
import SerializerManager from "./serializer-manager.js";
import AssemblyCodeMirror from "./assembly-codemirror.js";
import {runMachine} from "./machine-execution.js";
import Translator from "./translator.js";

export default class AssemblyEditor extends SidebarContent{
    constructor(_machine,_valueDisplayer){

        super();
        

        this.wrapper;
        this.title;
        this.textArea;
        this.loadButton;
        this.copyButton;

        this.M = _machine;
        this.valueDisplayer = _valueDisplayer;

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
        this.codeMirror.cm.refresh();
    }


    build(){


        this.wrapper = document.createElement("div");
        this.title=document.createElement("h3");
        this.codeMirrorWrapper =document.createElement("div");
        this.loadButton = document.createElement("button");
        this.runButton = document.createElement("button");

        
        this.codeMirror = new AssemblyCodeMirror(this.codeMirrorWrapper);

        this.title.setAttribute("tabindex",-1);
        


        this.wrapper.classList.add("generic-inspector")
        this.loadButton.classList.add("custom-btn");
        this.runButton.classList.add("custom-btn");

        this.title.innerText=Translator.getTranslation("_program","Program");
        this.loadButton.innerText=Translator.getTranslation("_load_to_memory","Load to memory")
        this.runButton.innerText=Translator.getTranslation("_run","Run");




        this.wrapper.appendChild(this.title);
        this.wrapper.appendChild(this.codeMirrorWrapper);
        this.wrapper.appendChild(this.loadButton);
        this.wrapper.appendChild(this.runButton);

        
        this.codeMirror.cm.refresh();


    }

    addCallbacks(){
        this.loadButton.addEventListener("click",()=>{this.onLoadButton();});
        this.runButton.addEventListener("click",()=>{this.onRunButton()});
    

        this.M.addOnMachineStartedCllback((_M)=>{
            this.runButton.setAttribute("disabled","true");
        })
        this.M.addOnMachineStopedCallback((_M)=>{
            this.runButton.removeAttribute("disabled");
        })
    
    }

    getCode(){
        return this.codeMirror.cm.getValue();
    }

    setCode(_code){
        this.codeMirror.cm.setValue(_code);
        this.codeMirror.cm.clearHistory();
        this.codeMirror.cm.refresh();
        this.save();
    }

    save(){
        this.serializer.saveToLocalStorage();
    }

    load(){
        this.serializer.loadFromLocalStorage();
    }

    refresh(){
        this.codeMirror.cm.refresh();
    }


    onInput(){
        this.save();
    }

    onLoadButton(){
        
        Terminator.terminate();
        this.save();
        this.parser = new AssemblyParser(this.getCode(),this.M.settings,this.M.instructionList,this.valueDisplayer);
        

        if( this.parser.parseSuccesful){
            this.M.setComponentsDefault();
            this.M.resetInternalState();
            
            this.M.MEM.loadMemory( this.parser.values);

            Alerter.sendMessage(Translator.getTranslation("_message_program_loaded","Program was loaded to memory!"),AlertStyleEnum.Succes);
        }else{

            Alerter.sendMessage(this.parser.errorMessage,AlertStyleEnum.SyntaxError);
        }

    }

    onRunButton(){
        if(this.M.isRunning()==false){
            runMachine(this.M);
        }
    }


}




import SidebarContent from "./sidebar-content.js";
import AssemblyParser from "./assembly-parser.js"
import Alerter from "./alerter.js";
import { AlertStyleEnum, ExecutionMode } from "./enums.js";
import Terminator from "./terminator.js";
import AssemblySerializer from "./assembly-serializer.js";
import SerializerManager from "./serializer-manager.js";
import AssemblyCodeMirror from "./assembly-codemirror.js";
import {ExecutionContext,runCycle,runMachine,runMachineToCurssor, runSingleInstruction} from "./machine-execution.js";
import Translator from "./translator.js";
import VariablesPreview from "./variables-preview.js";
import ShortcutManager from "./shortcut-manager.js";
import Shorutcut from "./shortcut.js";

export default class AssemblyEditor extends SidebarContent{
    constructor(_machine,_valueDisplayer,_variablePreview){

        super();
        

        this.wrapper;
        this.title;
        this.textArea;
        this.loadButton;
        this.copyButton;

        this.M = _machine;
        this.valueDisplayer = _valueDisplayer;
 

        this.serializer = new AssemblySerializer(this);
        
        this.variablePreview;

        this.build(_variablePreview);
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


    build(_variablePreview){


        this.wrapper = document.createElement("div");
        this.title=document.createElement("h1");
        this.codeMirrorWrapper =document.createElement("div");
        this.buttonWrapper = document.createElement("div");
        this.loadButton = document.createElement("button");
        this.runButton = document.createElement("button");
        this.toCurrsorButton = document.createElement("button");
        
        this.variablePreview =_variablePreview;


        this.codeMirror = new AssemblyCodeMirror(this.codeMirrorWrapper);

        this.title.setAttribute("tabindex",-1);
        


        this.wrapper.classList.add("generic-inspector")
        this.buttonWrapper.classList.add("generic-inspector");
        this.loadButton.classList.add("custom-btn");
        this.runButton.classList.add("custom-btn");
        this.toCurrsorButton.classList.add("custom-btn");

        this.title.textContent=Translator.getTranslation("_program","Program");
        this.loadButton.textContent=Translator.getTranslation("_load_to_memory","Load to memory")
        this.runButton.textContent=Translator.getTranslation("_run","Run");
        this.toCurrsorButton.textContent=Translator.getTranslation("_run_cursor","Run to cursor")


        this.buttonWrapper.appendChild(this.loadButton);
        this.buttonWrapper.appendChild(this.runButton);
        this.buttonWrapper.appendChild(this.toCurrsorButton)


        this.wrapper.appendChild(this.title);
        this.wrapper.appendChild(this.codeMirrorWrapper);
        this.wrapper.appendChild(this.buttonWrapper);
        this.wrapper.appendChild(this.variablePreview.getHTMLElemnt());

        
        this.codeMirror.cm.refresh();


    }

    addCallbacks(){
        this.loadButton.addEventListener("click",()=>{this.onLoadButton();});
        this.runButton.addEventListener("click",()=>{this.onRunButton()});
        this.toCurrsorButton.addEventListener("click",()=>{this.onRunToCursorButton();});

        this.M.addOnMachineStartedCllback((_M)=>{
            this.runButton.setAttribute("disabled","true");
        })
        this.M.addOnMachineStopedCallback((_M)=>{
            this.runButton.removeAttribute("disabled");
        })

        this.codeMirror.cm.on("mousedown",()=>{

            setTimeout(()=>{
                if(this.parser!=null){
                    const cursor =this.codeMirror.cm.getCursor();
                    const pointer = this.parser.getInstructionByPositon(cursor.line,cursor.ch);
                    if(pointer!=null){
                        ExecutionContext.curssorAddres = pointer.addres;
                    }
                    
                }
            })
        })

        this.codeMirror.onGutterClick=(_state,_line)=>{
            this.setBreakPointAddres(_state,_line);
        }

        this.M.addOnCycleDoneCallback((M)=>{

            if(this.parser==null)return;

            if(M.isNewInstruction()){
                this.codeMirror.highlightLine(
                    this.parser.getLineByAddres(
                        M.getCurrentAddres()
                        )
                    );
            }
        })

        const M =this.M;


    
        
    
        ShortcutManager.addShortcut(new Shorutcut(
            "cycle",
            Translator.getTranslation("_shrt_run_cycle","Run Cycle"),
            ()=>{if(M.isRunning()===false){ 
                    runCycle(M);
                }else{
                    M.stopMachine();
                }
            },
            112,
        ))
        ShortcutManager.addShortcut(new Shorutcut(
            "run_instruction",
            Translator.getTranslation("_shrt_run_instruction","Run Instruction"),
            ()=>{if(M.isRunning()===false){
                runSingleInstruction(M);
                }else{
                    M.stopMachine();
                }
            },
            113
        ))
        ShortcutManager.addShortcut(new Shorutcut(
            "run_program",
            Translator.getTranslation("_shrt_run_program","Run Program"),
            ()=>{if(M.isRunning()===false){
                    runMachine(M);
                }else{
                    M.stopMachine();
                }
            },
            114
        ))
        ShortcutManager.addShortcut(new Shorutcut(
            "load_program",
            Translator.getTranslation("_shrt_load_program","Load Program To Memory"),
            ()=>{if(M.isRunning()===true){
                M.stopMachine();
            }
            this.onLoadButton();
            },
            115
        ))
        ShortcutManager.addShortcut(new Shorutcut(
            "run_to_cursor",
            Translator.getTranslation("_shrt_run_to_cursor","Run To Cursor"),
            ()=>{if(M.isRunning()===false){
                runMachineToCurssor(M);
            }else{
                M.stopMachine();
            }},
            119
        ))

        ShortcutManager.addShortcut(new Shorutcut(
            "stop_machine",
            Translator.getTranslation("_shrt_stop_machine","Stop Machine"),
            ()=>{M.stopMachine();},
            120
        ))

        ShortcutManager.addShortcut(new Shorutcut(
            "manual",
            Translator.getTranslation("_shrt_toggle_manual","Toggle Manual Mode"),
            ()=>{M.setManualMode(M.manualControll===false);},
            121
        ))
    
    }

    setBreakPointAddres(_state,_line){
        let pointer;
        if(this.parser!=null){
            pointer = this.parser.getInstructionByBreakPoint(_line);
            
        }

        if(_state){
            ExecutionContext.breakPoints[_line] =pointer!=null ? pointer.addres:null;
        }else{
            delete ExecutionContext.breakPoints[_line];
        }
        
    }

    recalcBreakpointAddreses(){
        for (const line in ExecutionContext.breakPoints) {
            if (Object.hasOwnProperty.call(ExecutionContext.breakPoints, line)) {
                this.setBreakPointAddres(true,line);
            }
        }
    }

    getCode(){
        return this.codeMirror.cm.getValue();
    }

    setCode(_code){
        this.codeMirror.cm.setValue(_code);
        this.codeMirror.cm.clearHistory();
        this.codeMirror.cm.refresh();
        ExecutionContext.breakPoints={};
        this.variablePreview.clearAll();
        
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

        if( this.parser!=null){
            this.parser.dispose();
            delete  this.parser;
        }
        this.parser = new AssemblyParser(this.getCode(),this.M.settings,this.M.instructionList,this.valueDisplayer);

        if( this.parser.parseSuccesful){

            const overflow = this.parser.values.length> this.M.MEM.length();
            const notEnoughCodeBits= this.parser.didInstructionsFit===false;

            this.M.setComponentsDefault();
            this.M.resetInternalState();
            this.M.MEM.loadMemory( this.parser.values);
            
            this.recalcBreakpointAddreses();
            this.codeMirror.clearHiglight();
            this.codeMirror.highlightLine(this.parser.getLineByAddres(0));
            this.codeMirror.fixMarkers(ExecutionContext.breakPoints);

            this.variablePreview.memory.clearPreviews();

            for (const name in this.parser.labels) {
                if (Object.hasOwnProperty.call(this.parser.labels, name)) {
                    const label = this.parser.labels[name];
                    if(label.realAddres!=null){
                        this.variablePreview.memory.addMemorySlot(label.realAddres,label.name);
                    }
                }
            }

            this.variablePreview.memory.buildList();
            
            Alerter.sendMessage(Translator.getTranslation("_message_program_loaded","Program was loaded to memory!"),AlertStyleEnum.Succes);
            if(notEnoughCodeBits){
                Alerter.sendMessage(Translator.getTranslation("_warning_instruction_overflow","Not enough instruction code values are avilable for used instructions, consider increasing code bit count."),AlertStyleEnum.Warning)
            }
            
            if(overflow){
                Alerter.sendMessage(Translator.getTranslation("_warning_program_overflow","Program didn't fit fully in the memory, consider increasing address bit count."),AlertStyleEnum.Warning)
            }
        }else{

            Alerter.sendMessage(this.parser.errorMessage,AlertStyleEnum.SyntaxError);
        }

    }

    onRunButton(){
        if(this.M.isRunning()==false){
            runMachine(this.M);
        }
    }

    onRunToCursorButton(){

        if(this.parser!=null){
            


            if(this.M.isRunning()==false){
                runMachineToCurssor(this.M)
            }
       
        }
       
    }


}


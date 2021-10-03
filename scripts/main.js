
import Machine from "./machine.js";
import buildMachine from"./machine-definitions.js";
import MachineView from "./machine-view.js";
import InsperctorManger from "./inspector-manager.js";
import EditorManager from "./editor-manager.js";
import AlertWindow from "./alert-window.js";
import { AlertStyleEnum } from "./enums.js";
import Alerter from "./alerter.js";
import AlertTerminator from "./alert-terminator.js";
import {runMachine, runCycle, runSingleInstruction} from "./machine-execution.js";



import SettingsSerializer from "./settings-serializer.js";
import InstructionListSerializer from "./instruction-list-serializer.js";
import SerializerManager from "./serializer-manager.js";
import Terminator from "./terminator.js";

import Translator from "./translator.js"


fetch("translations.json")
    .then(res=>{return res.json()})
    .then(translations=>{
        Translator.translations =translations 
        Translator.language=Translator.getLanguage();
    })
    .finally(()=>{main()})
    
function main(){


        
    const alertAreaELement = document.getElementById("alert-area");
    const alertWindow =  new  AlertWindow(alertAreaELement)
    const alertTerminator= new AlertTerminator();


    Alerter.sendMessage(Translator.getTranslation("_welcome_message","Welcome in Machine W simulator!"),AlertStyleEnum.Large);

    const M=new Machine();
    buildMachine(M);




    const settingsSeralzier = new SettingsSerializer(M.settings);
    const instructionListSerializer = new InstructionListSerializer(M.instructionList,M)

    settingsSeralzier.loadFromLocalStorage();
    instructionListSerializer.loadFromLocalStorage();

    SerializerManager.addSerializer(instructionListSerializer);
    SerializerManager.addSerializer(settingsSeralzier);

    M.settings.serializer=settingsSeralzier;
    M.instructionList.serializer=instructionListSerializer;




    //Add arrow class to all arrows
    var elems = document.body.getElementsByTagName("*");


    const MView = new MachineView(M);
    MView.setupMachine();
    M.A_register.update();
    console.log(M);




    const inspectorElement = document.getElementById("inspector");
    var inspectorManager = new InsperctorManger(inspectorElement,M,MView);

    const editorElement = document.getElementById("editor");
    var editorManager = new EditorManager(editorElement,M,MView);

    inspectorManager.instructionInspector.addInstructionSelectedCallback((_instruction)=>{
        editorManager.drawEditorForInstruction(_instruction);
    })



    let showAsmButton = document.getElementById("asm-nav");
    showAsmButton.addEventListener("click",()=>{
        editorManager.drawEditorForAssembly()
    })
    let showInstrInspectorButton =  document.getElementById("instruction-list-nav")
    showInstrInspectorButton.addEventListener("click",()=>{
        inspectorManager.drawInspectorForInstructionList();
    })

    let showSettingsButon = document.getElementById("settings-nav")
    showSettingsButon.addEventListener("click",()=>{
        inspectorManager.drawInspectorForSettings();
    })

    let showIOButton =  document.getElementById("io-nav")
    showIOButton.addEventListener("click",()=>{
        inspectorManager.drawInspectorForInputOutput();
    })

    let showFileButton =  document.getElementById("file-nav")
    showFileButton.addEventListener("click",()=>{
        inspectorManager.drawInspectorForFile();
    })

    let showInfoButton =document.getElementById("info-nav");
    showInfoButton.addEventListener("click",()=>{
        inspectorManager.drawInspectorForInfo();
    })



    let nextCycleButton = document.getElementById("next-cycle-button");
    nextCycleButton.onclick=function(){


        if(M.isRunning()==false){
            runCycle(M);
        }
        
    }

    let nextInstructionButton = document.getElementById("next-instruction-button");
    nextInstructionButton.onclick=function(){

        if(M.isRunning()==false){
            runSingleInstruction(M);
        }
        
    }

    let toggleManualButton = document.getElementById("toggle-manual-button");
    toggleManualButton.onclick = ()=>{

        M.setManualMode(M.manualControll==false);

    }

    M.addOnManualToggleCallback((_manual)=>{
        if(_manual){
            toggleManualButton.classList.add("manual-selected")
            
        }else{
            toggleManualButton.classList.remove("manual-selected")
        }

    })


    let runMachineButton=document.getElementById("run-machine-button");
    runMachineButton.addEventListener("click",()=>{
        if(M.isRunning()){
            Terminator.terminate();
        }else{
            runMachine(M);
        }
        
    })


    M.addOnMachineStartedCllback(()=>{
        
        runMachineButton.classList.add("manual-selected");
    })

    M.addOnMachineStopedCallback(()=>{
        runMachineButton.classList.remove("manual-selected");
    })
}







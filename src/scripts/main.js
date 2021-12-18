


import Machine from "./machine.js";
import buildMachine from"./machine-definitions.js";
import MachineView from "./machine-view.js";
import InsperctorManger from "./inspector-manager.js";
import EditorManager from "./editor-manager.js";
import AlertWindow from "./alert-window.js";
import { AlertStyleEnum } from "./enums.js";
import Alerter from "./alerter.js";
import AlertTerminator from "./alert-terminator.js";
import {runMachine, runCycle, runSingleInstruction, runMachineToCurssor} from "./machine-execution.js";



import SettingsSerializer from "./settings-serializer.js";
import InstructionListSerializer from "./instruction-list-serializer.js";
import SerializerManager from "./serializer-manager.js";
import Terminator from "./terminator.js";

import Translator from "./translator.js";
import AssemblyColorContext from "./assembly-color-context.js";
import InstructionColorContext from "./instruction-color-context.js";
import VariablesPreview from "./variables-preview.js";
import ShortcutManager from "./shortcut-manager.js";
import Shorutcut from "./shortcut.js";
import LayoutMediator from "./layout-mediator.js";


const runMain = ()=>{
    fetch("translations.json")
    .then(res=>{return res.json()})
    .then(translations=>{
        Translator.translations =translations 
        Translator.language=Translator.getLanguage();
        document.documentElement.setAttribute("lang",Translator.language);
    })
    .catch(()=>{
        Translator.language="DEFAULT"
        document.documentElement.setAttribute("lang","en");
    })
    .finally(()=>{main()})
}
export default runMain;

    
function main(){


    

    const navbar =document.getElementById("navbar");
    const mobileMenu = document.getElementById("mobile-menu");
    
    mobileMenu.querySelector("title").textContent=Translator.getTranslation("_nav_menu","Navigation Menu")

    function hideMobileMenu(){
        navbar.classList.remove("mobile")
    }

    function showMobileMenu(){
        navbar.classList.add("mobile");
    }

    function toggleMobileMenu(){
        navbar.classList.toggle("mobile")
    }

    navbar.addEventListener("click",(e)=>{
        if(e.target!=navbar){
            hideMobileMenu();
        }
    })

    mobileMenu.addEventListener("click",()=>{
        toggleMobileMenu();
    })
    mobileMenu.addEventListener("keydown",(e)=>{
        if(e.keyCode===13||e.keyCode===32){
            toggleMobileMenu();
        }
        
    })



        
    const alertAreaELement = document.getElementById("alert-area");
    const alertWindow =  new  AlertWindow(alertAreaELement)
    const alertTerminator= new AlertTerminator();


    Alerter.sendMessage(Translator.getTranslation("_message_welcome","Welcome in the Machine W simulator!"),AlertStyleEnum.Large);

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


    AssemblyColorContext.instructionList = M.instructionList;
    InstructionColorContext.signalDictionary = M.getSignalDictionary();
    InstructionColorContext.flagsDictionary=M.getFlagsDictionary();


    const MView = new MachineView(M);
    MView.setupMachine();
    M.A_register.update();


    const variablePreview = new VariablesPreview(MView.valueDisplayer,M.MEM);
    
    const inspectorElement = document.getElementById("inspector");
    const inspectorManager = new InsperctorManger(inspectorElement,M,MView,variablePreview);
    variablePreview.inspectorManager=inspectorManager;


    const editorElement = document.getElementById("editor");
    const editorManager = new EditorManager(editorElement,M,MView,variablePreview);

    inspectorManager.instructionInspector.addInstructionSelectedCallback((_instruction)=>{
        editorManager.drawEditorForInstruction(_instruction);
    })



    let showAsmButton = document.getElementById("asm-nav");
    showAsmButton.textContent=Translator.getTranslation("_program","Program");
    showAsmButton.addEventListener("click",()=>{
        editorManager.drawEditorForAssembly()
    })
    let showInstrInspectorButton =  document.getElementById("instruction-list-nav")
    showInstrInspectorButton.textContent=Translator.getTranslation("_instructions","Instructions");
    showInstrInspectorButton.addEventListener("click",()=>{
        inspectorManager.drawInspectorForInstructionList();
    })

    let showSettingsButon = document.getElementById("settings-nav")
    showSettingsButon.textContent=Translator.getTranslation("_settings","Settings")
    showSettingsButon.addEventListener("click",()=>{
        inspectorManager.drawInspectorForSettings();
    })

    let showIOButton =  document.getElementById("io-nav")
    showIOButton.textContent=Translator.getTranslation("_io","I/O");
    showIOButton.addEventListener("click",()=>{
        inspectorManager.drawInspectorForInputOutput();
    })

    let showFileButton =  document.getElementById("file-nav")
    showFileButton.textContent=Translator.getTranslation("_file","File");
    showFileButton.addEventListener("click",()=>{
        inspectorManager.drawInspectorForFile();
    })

    let showInfoButton =document.getElementById("info-nav");
    showInfoButton.textContent=Translator.getTranslation("_info","Info");
    showInfoButton.addEventListener("click",()=>{
        inspectorManager.drawInspectorForInfo();
    })


    ShortcutManager.addShortcut(new Shorutcut(
        "clear_alerts",
        Translator.getTranslation("_shrt_clear_alerts","Clear Notifications"),
        ()=>{Alerter.clearMessages()},
        "C".charCodeAt(0),
        true,
        true,
        false
    ))

    ShortcutManager.addShortcut(new Shorutcut(
        "open_program",
        Translator.getTranslation("_shrt_open_program","Open Program Panel"),
        ()=>{editorManager.drawEditorForAssembly()},
        "1".charCodeAt(0),
        false,
        false,
        true
    ))
    ShortcutManager.addShortcut(new Shorutcut(
        "open_instructions",
        Translator.getTranslation("_shrt_open_instructions","Open Instructions Panel"),
        ()=>{inspectorManager.drawInspectorForInstructionList();},
        "2".charCodeAt(0),
        false,
        false,
        true
    ))
    ShortcutManager.addShortcut(new Shorutcut(
        "open_settings",
        Translator.getTranslation("_shrt_open_settings","Open Settings Panel"),
        ()=>{inspectorManager.drawInspectorForSettings();},
        "3".charCodeAt(0),
        false,
        false,
        true
    ))
    ShortcutManager.addShortcut(new Shorutcut(
        "open_io",
        Translator.getTranslation("_shrt_open_io","Open Input/Output Panel"),
        ()=>{inspectorManager.drawInspectorForInputOutput()},
        "4".charCodeAt(0),
        false,
        false,
        true
    ))
    ShortcutManager.addShortcut(new Shorutcut(
        "open_file",
        Translator.getTranslation("_shrt_open_file","Open File Panel"),
        ()=>{inspectorManager.drawInspectorForFile()},
        "5".charCodeAt(0),
        false,
        false,
        true
    ))
    ShortcutManager.addShortcut(new Shorutcut(
        "open_info",
        Translator.getTranslation("_shrt_open_info","Open Info Panel"),
        ()=>{inspectorManager.drawInspectorForInfo()},
        "6".charCodeAt(0),
        false,
        false,
        true
    ))



    let nextCycleButton = document.getElementById("next-cycle-button");
    nextCycleButton.textContent=Translator.getTranslation("_cycle","Cycle");
    nextCycleButton.onclick=function(){


        if(M.isRunning()===false){
            runCycle(M);
        }
        
    }

    let nextInstructionButton = document.getElementById("next-instruction-button");
    nextInstructionButton.textContent=Translator.getTranslation("_instruction","Instruction");
    nextInstructionButton.onclick=function(){

        if(M.isRunning()===false){
            runSingleInstruction(M);
        }
        
    }

    let toggleManualButton = document.getElementById("toggle-manual-button");
    toggleManualButton.textContent=Translator.getTranslation("_manual","Manual");
    toggleManualButton.onclick = ()=>{

        M.setManualMode(M.manualControll===false);

    }


    ShortcutManager.addShortcut(new Shorutcut(
        "show_machine",
        Translator.getTranslation("_shrt_show_machine","Show Machine"),
        ()=>{LayoutMediator.showCenter();},
        36
    ))

    
    const leftBarHandle= document.getElementById("left-handle");
    const rightBarHandle = document.getElementById("right-handle");

    ShortcutManager.addShortcut(new Shorutcut(
        "focus_left",
        Translator.getTranslation("_shrt_focus_left","Focus left Handle"),
        ()=>{leftBarHandle.focus()},
        37,
        false,
        true

    ))


    ShortcutManager.addShortcut(new Shorutcut(
        "focus_right",
        Translator.getTranslation("_shrt_focus_right","Focus right Handle"),
        ()=>{rightBarHandle.focus()},
        39,
        false,
        true

    ))







    M.addOnManualToggleCallback((_manual)=>{
        if(_manual){
            toggleManualButton.classList.add("manual-selected")
            
        }else{
            toggleManualButton.classList.remove("manual-selected")
        }

    })


    let runMachineButton=document.getElementById("run-machine-button");
    runMachineButton.textContent=Translator.getTranslation("_run","Run");
    runMachineButton.addEventListener("click",()=>{
        if(M.isRunning()){
            M.stopMachine();
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



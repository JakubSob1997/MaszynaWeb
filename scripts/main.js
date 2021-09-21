
import Machine from "./machine.js";
import buildMachine from"./machine-definitions.js";
import MachineView from "./machine-view.js";
import InsperctorManger from "./inspector-manager.js";
import EditorManager from "./editor-manager.js";
import AlertWindow from "./alert-window.js";
import { AlertStyleEnum } from "./enums.js";
import Alerter from "./alerter.js";
import AlertTerminator from "./alert-terminator.js";
import {runMachine} from "./machine-execution.js";



import SettingsSerializer from "./settings-serializer.js";
import InstructionListSerializer from "./instruction-list-serializer.js";
import SerializerManager from "./serializer-manager.js";




const alertAreaELement = document.getElementById("alert-area");
const alertWindow =  new  AlertWindow(alertAreaELement)
const alertTerminator= new AlertTerminator();


Alerter.sendMessage("Witaj w symulatorze Maszyny W!",AlertStyleEnum.Large);

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


console.log(instructionListSerializer.getFromLocalStorage());

//!!!!!!!!!!!!!!!!!!!
//MOVE THIS TO MACHINE VIEW
//!!!!!!!!!!!!!!!!!!!
M.addOnManualToggleCallback((_isManual)=>{
    const signals = document.querySelectorAll("button.sig");
    signals.forEach(element => {
        
        if(_isManual){
            element.removeAttribute("disabled")
        }else{
            element.setAttribute("disabled","")
        }

    });
})



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
showAsmButton.onclick=()=>{
    editorManager.drawEditorForAssembly()
}
let showInstrInspectorButton =  document.getElementById("instruction-list-nav")
showInstrInspectorButton.onclick=()=>{
    inspectorManager.drawInspectorForInstructionList();
}

let showSettingsButon = document.getElementById("settings-nav")
showSettingsButon.onclick=()=>{
    inspectorManager.drawInspectorForSettings();
}

let showIOButton =  document.getElementById("io-nav")
showIOButton.onclick=()=>{
    inspectorManager.drawInspectorForInputOutput();
}

let showFileButton =  document.getElementById("file-nav")
showFileButton.onclick=()=>{
    inspectorManager.drawInspectorForFile();
}



let nextCycleButton = document.getElementById("next-cycle-button");
console.log(nextCycleButton);
nextCycleButton.onclick=function(){

    M.doCycle();
}

let nextInstructionButton = document.getElementById("next-instruction-button");
nextInstructionButton.onclick=function(){

    M.doInstruction();
}

let toggleManualButton = document.getElementById("toggle-manual-button");
toggleManualButton.onclick = ()=>{

    M.setManualMode(M.manualControll==false);
    if(M.manualControll){
        toggleManualButton.classList.add("manual-selected")
        
    }else{
        toggleManualButton.classList.remove("manual-selected")
    }

}


let runMachineButton=document.getElementById("run-machine-button");
runMachineButton.addEventListener("click",()=>{
    runMachine(M);
})









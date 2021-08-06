
import Machine from "./machine.js";
import buildMachine from"./machine-definitions.js";
import MachineView from "./machine-view.js";
import { SettingsSerializer } from "./settings.js";
import {InstructionListSerializer} from "./instruction-list.js";
import InsperctorManger from "./inspector-manager.js";
import EditorManager from "./editor-manager.js";
import AlertWindow from "./alert-window.js";




const alertAreaELement = document.getElementById("alert-area");

const alertWindow =  new  AlertWindow(alertAreaELement)

alertWindow.createMessage("adf");
alertWindow.createMessage("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also th","alert-warning");
alertWindow.createMessage("dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd","alert-warning");
alertWindow.createMessage("aLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has","alert-warning");
alertWindow.createMessage("Lorem Ipsum is simply dummy tex","alert-warning");
alertWindow.createMessage("It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web p","alert-warning");

const M=new Machine();
buildMachine(M);



M.setSettings( SettingsSerializer.getDefault());
M.setInstructionList(InstructionListSerializer.getDefault());

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


var loadCodeButton = document.getElementById("load-code-button");


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


/*
var insInsepctor = new InstructionInspector(M.instructionList);
const elee = document.getElementById("instr-list-test");
elee.appendChild(insInsepctor.getHTMLElement());


var insEditor =  new InstructionEditor();
document.getElementById("instr-editor-test").appendChild(insEditor.getHTMLElement());

var assemblyEditor = new AssemblyEditor(M);

*/



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


//settings-nav
//



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

    M.toggleManualMode();
    if(M.manualControll){
        toggleManualButton.classList.add("manual-selected")
        
    }else{
        toggleManualButton.classList.remove("manual-selected")
    }

    

}





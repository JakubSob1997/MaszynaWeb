/*
//NWD
//Labels
let a=14;
let b=15;
let stop = 12;
let aMinusB = 0;
let bMinusA = 6;


MEM.values[0]=(0b011<<5)+a; //aMinusB: POB a
MEM.values[1]=(0b010<<5)+b; // ODE b
MEM.values[2]=(0b111<<5)+stop; // SOZ stop
MEM.values[3]=(0b110<<5)+bMinusA; // SOM bMinusA
MEM.values[4]=(0b100<<5)+a;//LAD a
MEM.values[5]=(0b101<<5)+aMinusB+1; // SOB aMinusB+1

MEM.values[6]=(0b011<<5)+b; //bMinusA: POB b
MEM.values[7]=(0b010<<5)+a; // ODE a
MEM.values[8]=(0b111<<5)+stop; // SOZ stop
MEM.values[9]=(0b110<<5)+aMinusB; // SOM aMinusb
MEM.values[10]=(0b100<<5)+b;//LAD b
MEM.values[11]=(0b101<<5)+bMinusA+1; // SOB bMinusA+1

MEM.values[12]=(0b001<<5)+a;//stop: DOD a
MEM.values[13]=0; //STP 0 

MEM.values[14]=120; //a:
MEM.values[15]=70; //b: 

console.log(MEM.values);
*/

M=new Machine();
buildMachine(M);
//console.log(M);

console.log(InstructionList.getDefaultInstructionList());


var codeTextArea = document.getElementById("code-textarea");
var loadCodeButton = document.getElementById("load-code-button");

codeTextArea.value=localStorage.getItem("codeTextArea");

MView = new MachineView(M);
MView.setupMachine();
console.log(M);

const insInsepctor = new InstructionInspector(M.instructionList);
const insEditor =  new InstructionEditor();

insInsepctor.addInstructionSelectedCallback((_instr)=>{insEditor.populateEditor(_instr)})



loadCodeButton.onclick = ()=>{
    localStorage.setItem("codeTextArea",codeTextArea.value);

    const tmp = new AssemblyParser(codeTextArea.value,M.settings,M.instructionList);
    

    if(tmp.parseSuccesful){
        M.setComponentsDefault();
        M.MEM.loadMemory(tmp.values);
    }

}


let nextCycleButton = document.getElementById("next-cycle-button");

nextCycleButton.onclick=function(){

    M.doCycle();
}

let nextInstructionButton = document.getElementById("next-instruction-button");
nextInstructionButton.onclick=function(){

    M.doInstruction();
}

let toggleManualButton = document.getElementById("toggle-manual-button");
toggleManualButton.onclick = ()=>{
    M.manualControll = !M.manualControll;
    if(M.manualControll){
        toggleManualButton.classList.add("selected")
    }else{
        toggleManualButton.classList.remove("selected")
    }
}




/*
var A_bus_UI = document.getElementById("a-bus");
var S_bus_UI = document.getElementById("s-bus");

function busUpdate(_bus,_busUI){
    if(_bus.hasValue()){
        _busUI.classList.add("bus-selected");
    }else{
        _busUI.classList.remove("bus-selected");
    }
}

M.S_bus.addOnUpdateCallback(_bus=>{busUpdate(_bus,S_bus_UI)});
M.A_bus.addOnUpdateCallback(_bus=>{busUpdate(_bus,A_bus_UI)});

*/



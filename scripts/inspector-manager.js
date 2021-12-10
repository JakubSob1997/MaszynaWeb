


import InstructionInspector from "./instruction-inspector.js";
import RegisterInspector from "./register-inspector.js";
import MemorySlotInspector from "./memory-slot-inspector.js";
import IOInspector from "./io-inspector.js";
import SettingsInspector from "./settings-inspector.js";
import FileSInspector from "./file-inspector.js";
import LayoutMediator from "./layout-mediator.js";
import InfoInspector from "./info-inspector.js";


export default class InsperctorManger{
    constructor(_Element,_Machine,_MachineView,_variablePreview){

        

        this.inspectorElement = _Element;
        this.instructionInspector = new InstructionInspector(_Machine.instructionList,_Machine);
        this.registerInspector = new RegisterInspector(_MachineView.valueDisplayer,_variablePreview);
        this.memorySlotInspector = new MemorySlotInspector(_Machine.MEM,_MachineView.valueDisplayer,_variablePreview);
        this.inputOutputInspector = new IOInspector(_Machine);
        this.settingsInspector = new SettingsInspector(_Machine);
        this.fileInspector = new FileSInspector();
        this.infoInspector = new InfoInspector();

        _MachineView.addOnMemorySlotSellectedCallback((_index)=>{
            this.drawInspectorForMorySlot(_index)
        });

        _MachineView.addOnRegisterSelectedCallback((_reg)=>{
            this.drawInspectorForRegister(_reg);
        });

        this.inspectorElement.addEventListener("dragover",(ev)=>{
            ev.preventDefault();
            if(ev.dataTransfer.items[0].type==="application/json"){
                this.drawInspectorForFile();
                
                this.inspectorElement.classList.add("inspector-file-over");
                
            }
        });
        ["dragleave","dragend"].forEach((type)=>{
            this.inspectorElement.addEventListener(type,(ev)=>{
                this.inspectorElement.classList.remove("inspector-file-over");
            })
        });
        this.inspectorElement.addEventListener("drop",(ev)=>{
            ev.preventDefault();
            this.inspectorElement.classList.remove("inspector-file-over");
            this.fileInspector.handleFileDrop(ev.dataTransfer.files);
            console.log(ev.dataTransfer.files);
        })

        window.addEventListener("drop",(ev)=>{
            ev.preventDefault();
        })
        window.addEventListener("dragover",(ev)=>{
            ev.preventDefault();
        })


        this.currentInspector=this.infoInspector;
        this.inspectorElement.appendChild(this.infoInspector.getHTMLElement());

        
    }


    selectCurrentInspector(_inspector){
        if(this.currentInspector !=_inspector){
            this.inspectorElement.innerHTML="";
            this.currentInspector=_inspector;
            this.inspectorElement.appendChild(_inspector.getHTMLElement());
        }
        LayoutMediator.showRightPanel();
        _inspector.focus();

        
    }


    //ALll the fucs down from thera are only to have explicit names for callbacks

    drawInspectorForRegister(_reg){
        this.registerInspector.selectRegister(_reg);
        this.selectCurrentInspector(this.registerInspector);
    }

    drawInspectorForInstructionList(){
        this.selectCurrentInspector(this.instructionInspector);
        
    }
    
    drawInspectorForSettings(_settings){
        this.selectCurrentInspector(this.settingsInspector);
    }

    drawInspectorForInputOutput(){
        this.selectCurrentInspector(this.inputOutputInspector);
    }

    drawInspectorForFile(){
        this.selectCurrentInspector(this.fileInspector)
    }

    drawInspectorForMorySlot(_adress){

        this.memorySlotInspector.selectMemorySlot(_adress);
        this.selectCurrentInspector(this.memorySlotInspector);

    }

    drawInspectorForInfo(){

        this.selectCurrentInspector(this.infoInspector);

    }

}

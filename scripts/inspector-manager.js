


import InstructionInspector from "./instruction-inspector.js";
import RegisterInspector from "./register-inspector.js";
import MemorySlotInspector from "./memory-slot-inspector.js";
import InputOutputInspector from "./input-output-inspector.js";
import SettingsInspector from "./settings-inspector.js";
import FileSInspector from "./file-inspector.js";
import LayoutMediator from "./layout-mediator.js";



export default class InsperctorManger{
    constructor(_Element,_Machine,_MachineView){

        

        this.inspectorElement = _Element;
        this.instructionInspector = new InstructionInspector(_Machine.instructionList);
        this.registerInspector = new RegisterInspector(_MachineView.valueDisplayer);
        this.memorySlotInspector = new MemorySlotInspector(_Machine.MEM,_MachineView.valueDisplayer);
        this.inputOutputInspector = new InputOutputInspector();
        this.settingsInspector = new SettingsInspector();
        this.fileInspector = new FileSInspector();

        _MachineView.addOnMemorySlotSellectedCallback((_index)=>{
            this.drawInspectorForMorySlot(_index)
        });

        _MachineView.addOnRegisterSelectedCallback((_reg)=>{
            this.drawInspectorForRegister(_reg);
        });


        this.currentInspector = null;

        
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

}









class InsperctorManger{
    constructor(_Element,_Machine,_MachineView){
        this.inspectorElement = _Element;

        this.instructionInspector = new InstructionInspector(_Machine.instructionList);
        this.registerInspector = new RegisterInspector(_MachineView.valueDusplayer);
        this.memorySlotInspector = new MemorySlotInspector(_Machine.MEM,_MachineView.valueDusplayer);


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

        
    }

    drawInspectorForRegister(_reg){
        this.registerInspector.selectRegister(_reg);
        this.selectCurrentInspector(this.registerInspector);
    }

    drawInspectorForInstructionList(){
        this.selectCurrentInspector(this.instructionInspector);
        
    }
    
    drawInspectorForSettings(_settings){

    }

    drawInspectorForMorySlot(_adress){

        this.memorySlotInspector.selectMemorySlot(_adress);
        this.selectCurrentInspector(this.memorySlotInspector);

    }

}

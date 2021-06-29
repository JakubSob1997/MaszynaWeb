




class ControllUnit extends MachineComponent{

    constructor(_I_Register){
        super();

        this.I_Register =_I_Register;


        this.internalCycleCounter=0;
    }
    
    doCycle(_Machine,_InstructionList,_Settings){
       
        const opCode =  _Settings.getOpcode(this.I_Register.getValue());
        
        console.log("Code:" + opCode);
        
        if(_InstructionList.length<=opCode){
            Alerter.alert("Instruction with op code: "+ opCode.toString(2)+" undefined" );
            return;
        }
        
        let instruction = _InstructionList[opCode];

        if(instruction.cycles.length<= this.internalCycleCounter ){
            this.internalCycleCounter=0;
        }
        


        let instrcycle = instruction.cycles[this.internalCycleCounter];
        

        _Machine.selectSignals(instrcycle.signals);


        

        if(instrcycle.isFinal==false){
            this.internalCycleCounter++;
        }else{
            this.internalCycleCounter=0;
        }


        
    }
    






}





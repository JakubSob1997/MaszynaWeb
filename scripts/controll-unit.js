

import Alerter from "./alerter.js"
import MachineComponent from "./machine-component.js";

export default class ControllUnit extends MachineComponent{

    constructor(_I_Register,_FlagUnit){
        super();

        this.I_Register =_I_Register;
        this.FlagUnit = _FlagUnit;

        this.nextInstructionFlag = false;
        this.internalCycleCounter=0;
    }

    setDefault(){
        this.internalCycleCounter=0;
    }
    
    selectSinalsForCycle(_Machine,_InstructionList,_Settings){
       
        const opCode =  _Settings.getOpcode(this.I_Register.getValue());
        
        
        if(_InstructionList.length()<=opCode){
            Alerter.alert("Instruction with op code: "+ opCode.toString(2)+" undefined" );
            return;
        }
        
        let instruction = _InstructionList.getInstruction(opCode);

        if(instruction.cycles.length<= this.internalCycleCounter||instruction.isBranchPlaceHolder ){
            this.internalCycleCounter=0;
        }
        


        let instrcycle = instruction.cycles[this.internalCycleCounter];
        
    

        for (let index = 0; index < instrcycle.branchCondtions.length; index++) {
            
            const branchCondition = instrcycle.branchCondtions[index];
            if(this.FlagUnit.checkFlag(branchCondition.flagName,_Machine)!=branchCondition.negate){
                
                //if(instruction.cycles.length<= this.internalCycleCounter ){
                //    Alerter.alert("Branched out of instruction scope");
                //}

                this.internalCycleCounter=branchCondition.targetCycle;
                instrcycle = instruction.cycles[this.internalCycleCounter];
                break;
            }
        }



        _Machine.selectSignals(instrcycle.signals);


        

        if(instrcycle.isFinal==false){
            this.internalCycleCounter++;
        }else{
            this.internalCycleCounter=instruction.cycles.length+1;
        }

        this.nextInstructionFlag=this.internalCycleCounter>=instruction.cycles.length;

        
    }

}




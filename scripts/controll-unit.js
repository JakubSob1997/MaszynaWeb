

import Alerter from "./alerter.js"
import MachineComponent from "./machine-component.js";
import Translator from "./translator.js";

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
            Alerter.alert(
                Translator.getTranslation(
                    "_alert_undefined_instruction",
                    "Instruction with op code: @0 is undefined!",
                    [opCode]
                    )
            );
            return;
        }
        
        let instruction = _InstructionList.getInstruction(opCode);

        if(instruction.cycles.length<= this.internalCycleCounter ){
            this.internalCycleCounter=0;
        }
        


        const instrcycle = instruction.cycles[this.internalCycleCounter];
        
        _Machine.selectSignals(instrcycle.signals);





       


        


        
    }

    selectNextCycleCounter(_Machine,_InstructionList,_Settings){

        const opCode =  _Settings.getOpcode(this.I_Register.getValue());
        let forceNextInstrFlag=false;
        let wasJumpFlag=false;

        if(_InstructionList.length()<=opCode){
            /*Alerter.alert(
                Translator.getTranslation(
                    "_alert_undefined_instruction",
                    "Instruction with op code: @0 is undefined!",
                    [opCode]
                    )
            );*/
            return;
        }
        
        let instruction = _InstructionList.getInstruction(opCode);

        const instrcycle = instruction.cycles[this.internalCycleCounter];


        for (let index = 0; index < instrcycle.branchCondtions.length; index++) {
            
            
            const branchCondition= instrcycle.branchCondtions[index];

            //Alerter.sendMessage(this.internalCycleCounter+" "+branchCondition.flagName + " "+branchCondition.targetCycle);
            if(this.FlagUnit.checkFlag(branchCondition.flagName,_Machine)!=branchCondition.negate){
                
                wasJumpFlag=true;
                this.internalCycleCounter=branchCondition.targetCycle;
                if(this.internalCycleCounter<0){
                    this.internalCycleCounter=0;
                    forceNextInstrFlag=true;
                }
                

                break;
            }
        }

        if(!forceNextInstrFlag&&!wasJumpFlag)this.internalCycleCounter++;
        this.nextInstructionFlag=forceNextInstrFlag||this.internalCycleCounter>=instruction.cycles.length;

    }

}




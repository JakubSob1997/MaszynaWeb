

import Alerter from "./alerter.js"
import MachineComponent from "./machine-component.js";
import Translator from "./translator.js";

export default class ControllUnit extends MachineComponent{

    constructor(_I_Register,_FlagUnit,_T_Register){
        super();

        this.I_Register =_I_Register;
        this.FlagUnit = _FlagUnit;

        this.nextInstructionFlag = false;
        this.T_Register = _T_Register;
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

        const cycle  =this.T_Register.getValue();

        if(instruction.cycles.length<= cycle ){
            Alerter.alert(Translator.getTranslation(
                "_alert_undefined_cycle",
                "Cycle: @0 is undefined for instruction @1!",
                [cycle,instruction.name]
            ))
        }else{
            const instrcycle = instruction.cycles[cycle];
            _Machine.selectSignals(instrcycle.signals);
        }


        



        
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

        const instrcycle = instruction.cycles[this.T_Register.getValue()];


        for (let index = 0; index < instrcycle.branchCondtions.length; index++) {
            
            
            const branchCondition= instrcycle.branchCondtions[index];

            //Alerter.sendMessage(this.internalCycleCounter+" "+branchCondition.flagName + " "+branchCondition.targetCycle);
            if(this.FlagUnit.checkFlag(branchCondition.flagName,_Machine)!=branchCondition.negate){
                
                wasJumpFlag=true;
               
                if(branchCondition.targetCycle<0){
                    this.T_Register.setValue(0);
                    forceNextInstrFlag=true;
                }else{
                    this.T_Register.setValue(branchCondition.targetCycle);
                }
                

                break;
            }
        }

        if(!forceNextInstrFlag&&!wasJumpFlag)this.T_Register.setValue(this.T_Register.getValue()+1);
        if(instruction.cycles.length<= this.T_Register.getValue() ){
            this.T_Register.setValue(0)
            this.nextInstructionFlag=true;
        }

    }

}






import MachineComponent from "./machine-component.js";
import { ALUOperationEnum } from "./enums.js";
import Alerter from "./alerter.js"


export default class ArythmeticLogicUnit extends MachineComponent {

    constructor(_AKRegister){

        super();

        this.AKRegister =_AKRegister;

        this.Operation=ALUOperationEnum.Unselected;
        
        this.BusReference = null;
        this.SetOperation(ALUOperationEnum.Unselected);
        
    }

    resetState(){
        this.Operation = ALUOperationEnum.Unselected;
        this.BusReference = null;
    }

    writeOperation(){

        if(this.BusReference==null || this.BusReference.hasValue()==false){
            Alerter.alert("Undefined Arythmetic Logic Input")
            return;
        }


        const _inputval = this.BusReference.getValue();
        const _akval = this.AKRegister.getValue();

        let output;

        switch (this.Operation) {
            case ALUOperationEnum.Unselected:
                Alerter.alert("Unselected Arythmetic Logic Operation");
                return;
            case ALUOperationEnum.PRZEP:
                 output= _inputval
                 break;
            case ALUOperationEnum.DOD:
                output= _akval+_inputval;
                break;
            case ALUOperationEnum.ODE:
                output= _akval-_inputval;
                break;
            case ALUOperationEnum.NEG:
                output = ~_inputval;
                break;
            case ALUOperationEnum.LUB:
                output = _akval|_inputval;
                break;
            case ALUOperationEnum.I:
                output = _akval&_inputval;
                break;
            case ALUOperationEnum.MNO:
                output = _akval*_inputval;
                break;
            case ALUOperationEnum.DZIEL:
                output = Math.floor(_akval/_inputval);
                break;
            case ALUOperationEnum.SHR:
                output = _inputval>>1;
                break;
            case ALUOperationEnum.MOD:
                output = _akval%_inputval;
                break;
            default:
                Alerter.alert("Arethmitic Logic Operation Is Undefined")
                return;
        }

            
        this.AKRegister.write(output);
    }
    




    SetOperation(_OperationEnum){


        if(this.Operation!=ALUOperationEnum.Unselected){
            Alerter.alert("Arythmetic Logic Operation already selected");
            return;
        }

        this.Operation = _OperationEnum;


        
    }


}


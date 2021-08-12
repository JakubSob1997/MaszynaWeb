

import MachineComponent from "./machine-component.js";
import { JALOperationEnum } from "./enums.js";
import Alerter from "./alerter.js"


export default class ArythmeticLogicUnit extends MachineComponent {

    constructor(_AKRegister){

        super();

        this.AKRegister =_AKRegister;

        this.Operation=JALOperationEnum.Unselected;
        
        this.BusReference = null;
        this.SetOperation(JALOperationEnum.Unselected);
        
    }

    resetState(){
        this.Operation = JALOperationEnum.Unselected;
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
            case JALOperationEnum.Unselected:
                Alerter.alert("Unselected Arythmetic Logic Operation");
                return;
            case JALOperationEnum.PRZEP:
                 output= _inputval
                 break;
            case JALOperationEnum.DOD:
                output= _akval+_inputval;
                break;
            case JALOperationEnum.ODE:
                output= _akval-_inputval;
                break;
            case JALOperationEnum.NEG:
                output = ~_inputval;
                break;
            case JALOperationEnum.LUB:
                output = _akval|_inputval;
                break;
            case JALOperationEnum.I:
                output = _akval&_inputval;
                break;
            case JALOperationEnum.MNO:
                output = _akval*_inputval;
                break;
            case JALOperationEnum.DZIEL:
                output = Math.floor(_akval/_inputval);
                break;
            case JALOperationEnum.SHR:
                output = _inputval>>1;
                break;
            case JALOperationEnum.MOD:
                output = _akval%_inputval;
            default:
                Alerter.alert("Arethmitic Logic Operation Is Undefined")
                return;
        }

            
        this.AKRegister.write(output);
    }
    




    SetOperation(_OperationEnum){


        if(this.Operation!=JALOperationEnum.Unselected){
            Alerter.alert("Arythmetic Logic Operation already selected");
            return;
        }

        this.Operation = _OperationEnum;


        
    }


}


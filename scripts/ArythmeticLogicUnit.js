



class ArythmeticLogicUnit {

    constructor(_AKRegister){
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

        let output


        console.log(this.Operation);

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
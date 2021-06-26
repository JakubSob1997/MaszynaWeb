



class ArythmeticLogicUnit {

    constructor(_AKRegister){
        this.AKRegister =_AKRegister;

        this.Operation=null;
        
        this.BusReference = null;
        this.SetOperation(JALOperationEnum.Unselected);
        
    }

    resetState(){
        this.SetOperation(JALOperationEnum.Unselected);
        this.BusReference = null;
    }

    writeOperation(){
        if(this.Operation==null){
            Alerter.alert("Unselected Arythmetic Logic Operation")
            return;
        }
        if(this.BusReference==null){
            Alerter.alert("Undefined Arythmetic Logic Input")
            return;
        }

        this.AKRegister.write(
            this.Operation(
                this.AKRegister.getValue(),
                this.BusReference.getValue())
                ) ;

            
        
    }
    




    SetOperation(_OperationEnum){


        if(this.Operation!=null){
            Alerter.alert("Arythmetic Logic Operation already selected");
            return;
        }

        switch (_OperationEnum) {
            case JALOperationEnum.Unselected:
                this.Operation = null;
                break;
            case JALOperationEnum.PRZEP:
                this.Operation = function(_akval,_inputval){
                    return _inputval;
                }
            case JALOperationEnum.DOD:
                this.Operation = function(_akval,_inputval){
                    return _akval+_inputval;
                }
            case JALOperationEnum.ODE:
                this.Operation = function(_akval,_inputval){
                    return _akval-_inputval;
                }
        
            default:
                Alerter.alert("Arethmitic Logic Operation Is Undefined")
                break;
        }
    }


}
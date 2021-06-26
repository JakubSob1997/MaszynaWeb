


class Bus{


    constructor(){
        this.referenceRegister =null;
        this.bufferValue=0;
        this.hasBufferedValue=false;
    }

    resetState(){
        this.referenceRegister =null;
        this.bufferValue=0;
        this.hasBufferedValue=false;
    }




    setSourceRegister(_referenceRegister){
        if(this.referenceRegister ==null){
            this.referenceRegister=_referenceRegister;
        }else{
            Alerter.alert("Multiple data sources set for bus")
        }

        
    }


    bufferValueForInpulse(){
        this.hasBufferedValue = this.referenceRegister !=null;
        if(this.hasBufferedValue){
            this.bufferValue = this.referenceRegister.getValue();
        }

    }

    getValue(){
        if(this.hasBufferedValue){
            return this.bufferValue;
        }else{
            Alerter.alert("Undefined value on the BUS")
        }
        
    }

}

import MachineComponent from "./machine-component.js";
import Alerter from "./alerter.js"

export default class Bus extends MachineComponent{


    constructor(_busMask){
        super();

        this.referenceRegister =null;
        this.bufferValue=0;
        this.hasBufferedValue=false;
        this.onUpdateCallbacks = [];
        this.busMask=_busMask;
        this.tmpMask=null;
    }

    resetState(){
        this.referenceRegister =null;
        this.bufferValue=0;
        this.hasBufferedValue=false;
        this.tmpMask=null;
    }


    addOnUpdateCallback(_funk){
        this.onUpdateCallbacks.push(_funk);
    }

    update(){
        if(this.onUpdateCallbacks!=null){
            this.onUpdateCallbacks.forEach(element => {
                element(this);
            });
        }
        
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
        this.update();

    }

    hasValue(){
        return this.hasBufferedValue;
    }
    setTmpMask(_mask){
        this.tmpMask=_mask;
    }

    getValue(){
        if(this.hasBufferedValue){
            
            return (this.tmpMask??this.busMask)&this.bufferValue;
        }else{
            Alerter.alert("Undefined value on the BUS")
        }
        
    }

}

import MachineComponent from "./machine-component.js";
import Alerter from "./alerter.js"
import { MatchRegisterWidthEnum } from "./enums.js";
import Translator from "./translator.js";

export default class Bus extends MachineComponent{


    constructor(_busMathcRule,_name){
        super();

        this.name =_name;
        this.referenceRegister =null;
        this.bufferValue=0;
        this.hasBufferedValue=false;
        this.onUpdateCallbacks = [];

        this.busMatchRule=_busMathcRule;
        this.busMask=~0;

        this.tmpMask= ~0;

        this.wasUpdateFlag=false;
    }

    resetState(){
        this.referenceRegister =null;
        this.bufferValue=0;
        this.hasBufferedValue=false;
        this.tmpMask= ~0;
    }

    onBusWidthChanged(_settings){
        switch (this.busMatchRule) {
            case MatchRegisterWidthEnum.ToAdress:
                this.busMask=_settings.adressMask;
                break;
            case MatchRegisterWidthEnum.ToWord:
                this.busMask=_settings.getWordMask();
                break;
            case MatchRegisterWidthEnum.ToCode:
                this.busMask=_settings.codeMask;
                break;
            default:
                break;
        }
    }


    addOnUpdateCallback(_funk){
        this.onUpdateCallbacks.push(_funk);
    }

    update(){


        if(this.wasUpdateFlag==false){

            this.wasUpdateFlag=true;

            requestAnimationFrame(()=>{
                this.onUpdateCallbacks.forEach(element => {
                    element(this);
                });
                this.wasUpdateFlag=false;
            })

            
        }
        
    }


    setSourceRegister(_referenceRegister){
        if(this.referenceRegister ==null){
            this.referenceRegister=_referenceRegister;
        }else{
            Alerter.alert(
                Translator.getTranslation(
                    "_alert_bus_multiple_source",
                    "Multiple data sources set for the @0 bus!",
                    [this.name])
                )
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
            
            return (this.tmpMask&this.busMask)&this.bufferValue;
        }else{
            Alerter.alert(
                Translator.getTranslation(
                    "_alert_bus_no_value",
                    "Undefined value on the @0 bus!",
                    [this.name]
                    )
            )
        }
        
    }

}
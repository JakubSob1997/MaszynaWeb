import Alerter from "./alerter.js";
import Translator from "./translator.js";



export default class Signal{


    constructor(_name,_isImpulse,_onSignal,_extention,_orientation){
        this.name = _name;
        this.isImpulse =_isImpulse;
        this.onSignal=_onSignal;
        this.orientation=_orientation??SignalOrientation.None;

        if(_extention == undefined){
            this.extention =ExtnensionFlags.Base;
        }else{
            this.extention=_extention;
        }
        
        this.onUpdateCallbacks = [];
        this.wasUpdatedFlag=false;
    }

    getExtention(){
        return this.extention;
    }

    update(){
        if(this.wasUpdatedFlag ==false){
            this.wasUpdatedFlag=true;
            requestAnimationFrame(()=>{
                this.onUpdateCallbacks.forEach(callBack => {
                    callBack(this);
                });
                this.wasUpdatedFlag=false;
            })
            
        }
        
    }

    addOnUpdateCallback(_funk){
        this.onUpdateCallbacks.push(_funk);
    }

    executeSignal(_Machine){
        if((_Machine.settings.extentionFlags&this.extention)==0){

            Alerter.alert(Translator.getTranslation(
                "_alert_signal_module_inactive",
                "Module containing \"@0\" signal is inactive!",
                [this.name]
            ))
        }else{
            this.onSignal(_Machine);
        }

        
    }


}
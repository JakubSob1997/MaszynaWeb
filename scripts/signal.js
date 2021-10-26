import Alerter from "./alerter.js";



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
            setTimeout(()=>{
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

            Alerter.alert("Moduł zwierający sygnał \""+this.name +"\" nie jest aktywny.")
        }else{
            this.onSignal(_Machine);
        }

        
    }


}
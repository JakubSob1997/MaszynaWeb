


class Signal{


    constructor(_name,_isImpulse,_onSignal,_extention){
        this.name = _name;
        this.isImpulse =_isImpulse;
        this.onSignal=_onSignal;
        
        if(_extention == undefined){
            this.extention =ExtnensionFlags.Base;
        }else{
            this.extention=_extention;
        }
        


        this.onUpdateCallbacks = [];

    }


    update(){
        this.onUpdateCallbacks.forEach(callBack => {
            callBack(this);
        });
    }

    addOnUpdateCallback(_funk){
        this.onUpdateCallbacks.push(_funk);
    }




}
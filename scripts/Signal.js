


class Signal{


    constructor(_name,_isImpulse,_onSignal){
        this.name = _name;
        this.isImpulse =_isImpulse;
        this.onSignal=_onSignal;
        
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
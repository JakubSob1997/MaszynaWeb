

const Alerter = {


    alertCallbacks: {},


    alert: function(_alertMessage){
        for (const funk in this.alertCallbacks) {
            if (Object.hasOwnProperty.call(this.alertCallbacks, funk)) {
                const element = this.alertCallbacks[funk];
                element(_alertMessage);
            }
        }
    } ,

    instructionAlert: function(_alertMessage){
        console.log(_alertMessage);
    },


    
    addAlertCallback: function(_funk){
        this.alertCallbacks[_funk]=_funk;
    },

    removeAlertCallback: function(_funk){
        if(this.addAlertCallback.hasOwnProperty(_funk)){
            delete this.alertCallbacks[_funk];
        }
    }



}

Alerter.addAlertCallback(message=>console.log(message));
//Alerter.addAlertCallback(message=>{throw message;})

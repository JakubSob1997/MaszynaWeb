

const Alerter = {


    alertCallbacks: [],


    alert: function(_alertMessage){
        this.alertCallbacks.forEach(callBack => {
            callBack(_alertMessage);
        });
    } ,

    instructionAlert: function(_alertMessage){
        console.log(_alertMessage);
    },


    
    addAlertCallback: function(_funk){
        this.alertCallbacks.push(_funk);
    }



}

Alerter.addAlertCallback(message=>console.log(message));

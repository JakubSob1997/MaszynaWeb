

 const Alerter = {


    alertRecievers:[],


    alert: function(_alertMessage){
        this.alertRecievers.forEach((alertReciever) => {
            alertReciever.alert(_alertMessage);
        });
    },


    sendMessage: function(_message,_style){
        this.alertRecievers.forEach((alertReciever)=>{
            alertReciever.sendMessage(_message,_style);
        });
    },

    clearMessages: function(){
        this.alertRecievers.forEach((alertReciever)=>{
            alertReciever.clearMessages();
        });
    },



    addAlertReciever(_reciever){
        this.alertRecievers.push(_reciever)
    }



}
export default Alerter;

export class IAlertReciever{
    alert(_message){
        console.log("overide me(alert): "+_message);
    }

    sendMessage(_message,_style){
        console.log("overide me(message): "+_message);
    }

    clearMessages(){
        console.log("overide me(clrscrn");
    }
}










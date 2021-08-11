import Terminator from "./terminator.js";
import Alerter,{ IAlertReciever } from "./alerter.js";


/*
    This dude down here stops machine execution
    when you send an alert with Alerter.alert()
*/


export default class AlertTerminator extends IAlertReciever{

    constructor(){
        super();
        if(Alerter!=null){
            Alerter.addAlertReciever(this);
        }
    }

    alert(_message){Terminator.terminate()}
    sendMessage(_message,_style){}
    clearMessages(){}

}


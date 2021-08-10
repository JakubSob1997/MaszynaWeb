import Terminator from "./terminator.js";
import Alerter,{ IAlertReciever } from "./alerter.js";


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


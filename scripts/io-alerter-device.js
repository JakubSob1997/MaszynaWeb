



import Alerter from "./alerter.js";
import {  AlertStyleEnum } from "./enums.js";
import IODevice from "./io-device.js";
import Translator from "./translator.js";

export default class AlerterDevice{

    constructor(){
        this.printDevice= new IOAlerterPrint();
        this.clearDevice=new IOAlerterClear();
    }


}

export class IOAlerterPrint extends IODevice{
    constructor(){
        super();
    }

    start(_IODriver){
        const val =_IODriver.write().toString();
        Alerter.sendMessage(Translator.getTranslation("_message_machine","Message fom Machine W value: @0",[val]),AlertStyleEnum.Machine);
        _IODriver.confirm();
    }

    getDescription(){
        return Translator.getTranslation("_io_alerter_out","Notifications output (out)");
    }

}

export class IOAlerterClear extends IODevice{


    start(_IODriver){
        Alerter.clearMessages();
        _IODriver.confirm();
    }

    getDescription(){
        return Translator.getTranslation("_io_alerter_clear_cmd","Clear notifications (cmd)");
    }
}


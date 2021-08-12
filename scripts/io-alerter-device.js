



import Alerter from "./alerter.js";
import {  AlertStyleEnum } from "./enums.js";
import IODevice from "./io-device.js";

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
        if(_IODriver==undefined){
            console.log("No io driver provided");
            return;
        }
        const val =_IODriver.write();
        Alerter.sendMessage("Komunikat Maszyny W wartość: "+val,AlertStyleEnum.Machine);
        _IODriver.confirm();
    }

    getDescription(){
        return "Wyjście powiadomień (wy)";
    }

}

export class IOAlerterClear extends IODevice{


    start(_IODriver){
        if(_IODriver==undefined){
            console.log("No io driver provided");
            return;
        }
        Alerter.clearMessages();
        _IODriver.confirm();
    }

    getDescription(){
        return "Wyczyść powiadomienia (pol)";
    }
}


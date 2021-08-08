



import Alerter from "./alerter.js";
import {  AlertStyleEnum } from "./enums.js";
import IODevice from "./io-device.js";

export default class AlerterOutputDevice extends IODevice{

    constructor(){
        super();
    }

    start(_IODriver){
        if(_IODriver==null){
            console.log("No io driver provided");
        }
        const val =_IODriver.write();
        Alerter.sendMessage("Komunikat maszyny W wartość: "+val,AlertStyleEnum.Machine);
        _IODriver.confirm();
    }



}


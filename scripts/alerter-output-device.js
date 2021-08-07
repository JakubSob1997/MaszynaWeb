

import { IODeviceEnum } from "./enums.js";
import InputOutputDevice from "./input-output-device.js";

export default class AlerterOutputDevice extends InputOutputDevice{

    constructor(_ioDriver){
        super(_ioDriver);
    }


    deviceType(_adress){
        return IODeviceEnum.Output;
    }


    handleOutput(_outputValue){
        console.log("I am an output device value: "+_outputValue+" (overide me)");
    }


    confirmOutput(_adress){
        _iodriver.confirmOutput(_adress);
    }



}




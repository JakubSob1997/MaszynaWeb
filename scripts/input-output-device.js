
import { IODeviceEnum } from "./enums.js";


export default class InputOutputDevice{
    constructor(_ioDriver){
        this.ioDriver = _ioDriver;
    }

    setIODriver(_ioDriver){
        this.ioDriver = _ioDriver;
    }

    deviceType(_adress){
        console("Please define my device type (overide me)")
        return IODeviceEnum.Undefined;
    }


    handleOutput(_outputValue, _adress){
        console.log("I am an output device value: "+_outputValue+" (overide me)");
    }


    confirmOutput(_adress){
        if(this.ioDriver!=null){
            this.ioDriver.confirmOutput(_adress);
        }
    }



    provideInput(_adress){
        console.log("I am an input device (overide me)");
        return 0;
    }


}
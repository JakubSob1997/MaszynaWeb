

import AlerterDevice from "./io-alerter-device.js";
import IORandom from "./io-random-device.js";
import ConsoleDevice from "./io-console-device.js";
import InteruptDevice from "./interupt-device.js";
import CycleTimerDevice from "./io-cycle-timer-device.js";
import { InteruptEnum } from "./enums.js";
import Translator from "./translator.js";


export default function buildDevices(_Machine,_IOUnit,_interuptDriver){

    let consoleDevice = new ConsoleDevice();
    let ioRandom = new IORandom();
    let alerterDevice = new AlerterDevice();
    let cycleTimerDevice = new CycleTimerDevice(_Machine,_interuptDriver);

    function buildIODevices(_IOUnit){

        let IODevices ={};
        
        
        
        IODevices.ioRandom=ioRandom;
        IODevices.alerterDevice=alerterDevice;
        IODevices.consoleDevice=consoleDevice;
        IODevices.cycleTimerDevice=cycleTimerDevice;
        
    
        _IOUnit.addIODevice(consoleDevice.numericInputIO,0);
        _IOUnit.addIODevice(consoleDevice.asciiInputIO,1);
        _IOUnit.addIODevice(consoleDevice.consoleOutputIO,2);
        _IOUnit.addIODevice(consoleDevice.clearConsoleIO,3);
        _IOUnit.addIODevice(alerterDevice.printDevice,4);
        _IOUnit.addIODevice(alerterDevice.clearDevice,5);
        _IOUnit.addIODevice(ioRandom,6);
        _IOUnit.addIODevice(cycleTimerDevice.ioStart,7)
    
    
        return IODevices;
    
    }

    function buildInteruptDevices(_interuptDriver){


        let interuptDevices = {};
    
        let button1 = new InteruptDevice(_interuptDriver);
        let button2 = new InteruptDevice(_interuptDriver);
        let button3 = new InteruptDevice(_interuptDriver);
        let button4 = new InteruptDevice(_interuptDriver);
    
        button1.description = Translator.getTranslation("_int_button","Interrupt Button @0",[1])
        button2.description = Translator.getTranslation("_int_button","Interrupt Button @0",[2])
        button3.description = Translator.getTranslation("_int_button","Interrupt Button @0",[3])
        button4.description = Translator.getTranslation("_int_button","Interrupt Button @0",[4])
    
        button1.interuptVactor = InteruptEnum.INT1;
        button2.interuptVactor = InteruptEnum.INT2;
        button3.interuptVactor = InteruptEnum.INT3;
        button4.interuptVactor = InteruptEnum.INT4;
    
        button1.canChangeVactor=false;
        button2.canChangeVactor=false;
        button3.canChangeVactor=false;
        button4.canChangeVactor=false;
    
        interuptDevices.button1=button1;
        interuptDevices.button2=button2;
        interuptDevices.button3=button3;
        interuptDevices.button4=button4;
        interuptDevices.cycleTimer=cycleTimerDevice.interupt;
    
        return interuptDevices;
    }


    return [buildIODevices(_IOUnit),buildInteruptDevices(_interuptDriver)]
}































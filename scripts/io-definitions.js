

import AlerterDevice from "./io-alerter-device.js";
import IORandom from "./io-random-device.js";
import ConsoleDevice from "./io-console-device.js";



export default function buildIODevices(_IOUnit){

    let IODevices ={};
    let consoleDevice = new ConsoleDevice();
    let ioRandom = new IORandom();
    let alerterDevice = new AlerterDevice();
    
    
    IODevices.ioRandom=ioRandom;
    IODevices.alerterDevice=alerterDevice;
    IODevices.consoleDevice=consoleDevice;

    

    
    

    _IOUnit.addIODevice(consoleDevice.numericInputIO,0);
    _IOUnit.addIODevice(consoleDevice.asciiInputIO,1);
    _IOUnit.addIODevice(consoleDevice.consoleOutputIO,2);
    _IOUnit.addIODevice(consoleDevice.clearConsoleIO,3);
    _IOUnit.addIODevice(alerterDevice.printDevice,4);
    _IOUnit.addIODevice(alerterDevice.clearDevice,5);
    _IOUnit.addIODevice(ioRandom,6);


    return IODevices;

}























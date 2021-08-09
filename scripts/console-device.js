

import Alerter from "./alerter.js";
import { AlertStyleEnum } from "./enums.js";
import IODevice from "./io-device.js";

export default class ConsoleDevice{

    constructor(){
        this.numericInputIO=new IOConsoleNumericInput(this);
        this.asciiInputIO = new IOConsoleASCIInput(this);
        this.consoleOutputIO = new IOConsoleOutput(this);
        this.clearConsoleIO=new IOConsoleClear(this);


        this.asciiInputString ="";
        this.numberInputVal =0;
        this.consoleOutputString="";

        this.onUpdateOutput=function(_device){(console.log("Overide Me"))};
        this.onUpdateASCII=function(_device){(console.log("Overide Me"))};
       
    }


    readASCII(){
        if(this.asciiInputString===""){
            Alerter.sendMessage("Add console wait behaviour",AlertStyleEnum.UnhandledException)
            return 0;
        }


        const char =this.asciiInputString.charAt(0);
        this.asciiInputString=this.asciiInputString.substring(1);
        this.onUpdateASCII();
        return char;
    }

    readNum(){
        return this.numberInputVal;
    }

    writConsole(_value){
        let char = String.fromCharCode(_value);
        this.consoleOutputString+=char;
        this.onUpdateOutput(this);
    }

    clearConsole(){
        this.consoleOutputString="";
        this.onUpdateOutput(this);
    }


}


class IOConsoleNumericInput extends IODevice{
    constructor(_ConsoleDevice){
        super();
        this.consoleDevice=_ConsoleDevice;
    }

    start(_IODriver){
        if(_IODriver==null){
            console.log("No io driver provided");
            return;
        }
        const _val = _ConsoleDevice.readNum();
        _IODriver.read(_val)
        _IODriver.confirm();
    }

    getDescription(){
        return "Wejście numeryczne konsoli (we)";
    }
}

class IOConsoleASCIInput extends IODevice{
    constructor(_ConsoleDevice){
        super();
        this.consoleDevice=_ConsoleDevice;
    }

    start(_IODriver){
        if(_IODriver==null){
            console.log("No io driver provided");
            return;
        }
        const _val = _ConsoleDevice.readASCII();
        _IODriver.read(_val)
        _IODriver.confirm();
    }

    getDescription(){
        return "Wejście ASCII konsoli (we)";
    }
}


class IOConsoleOutput extends IODevice{
    constructor(_ConsoleDevice){
        super();
        this.consoleDevice=_ConsoleDevice;
    }

    start(_IODriver){
        if(_IODriver==null){
            console.log("No io driver provided");
            return;
        }
        const _outVal = _IODriver.write()
        _ConsoleDevice.writConsole(_outVal);
        _IODriver.confirm();
    }

    getDescription(){
        return "Wyjście konsoli (wy)";
    }
}


class IOConsoleClear extends IODevice{
    constructor(_ConsoleDevice){
        super();
        this.consoleDevice=_ConsoleDevice;
    }

    start(_IODriver){
        if(_IODriver==null){
            console.log("No io driver provided");
            return;
        }
        _ConsoleDevice.clearConsole();
        _IODriver.confirm();
    }

    getDescription(){
        return "Wyczyść konsole (pol)";
    }
}











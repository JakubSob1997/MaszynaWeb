

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


    setASCIIInput(_string){
        this.asciiInputString =_string;
        if(this.waitingDriver!=null){
            this.readASCII(this.waitingDriver);
            this.waitingDriver=null;
        }
    }

    setNumericInput(_val){
        this.numberInputVal =_val;
    }



    readASCII(_IODriver){

        


        if(this.asciiInputString===""){
            this.waitingDriver = _IODriver;
            return;
        }else{
            const char =this.asciiInputString.charCodeAt(0);
            this.asciiInputString=this.asciiInputString.substring(1);
            this.onUpdateASCII(this);
            _IODriver.read(char)
            _IODriver.confirm();
        }



        
    }

    readNum(){
        const val = this.numberInputVal;
        return val
    }

    writeConsole(_value){
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
        const _val = this.consoleDevice.readNum();
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
        this.consoleDevice.readASCII(_IODriver);
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
        this.consoleDevice.writeConsole(_outVal);
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
        this.consoleDevice.clearConsole();
        _IODriver.confirm();
    }

    getDescription(){
        return "Wyczyść konsole (pol)";
    }
}











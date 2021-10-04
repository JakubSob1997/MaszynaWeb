

import Alerter from "./alerter.js";
import { AlertStyleEnum } from "./enums.js";
import IODevice from "./io-device.js";
import Translator from "./translator.js";

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

            if(this.readASCII(this.waitingDriver)==true){
                this.waitingDriver=null;
            }
            
        }
    }

    setNumericInput(_val){
        this.numberInputVal =_val;
    }



    readASCII(_IODriver){

        


        if(this.asciiInputString===""){
            this.waitingDriver = _IODriver;
            return false;
        }else{
            const char =this.asciiInputString.charCodeAt(0);
            this.asciiInputString=this.asciiInputString.substring(1);
            this.onUpdateASCII(this);
            _IODriver.read(char)
            _IODriver.confirm();
            return true;
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
        const _val = this.consoleDevice.readNum();
        _IODriver.read(_val)
        _IODriver.confirm();
    }

    getDescription(){
        return Translator.getTranslation("_io_console_num_in","Numeric console input (in)");
    }
}

class IOConsoleASCIInput extends IODevice{
    constructor(_ConsoleDevice){
        super();
        this.consoleDevice=_ConsoleDevice;
    }

    start(_IODriver){
        this.consoleDevice.readASCII(_IODriver);
    }

    getDescription(){
        return Translator.getTranslation("_io_console_char_in","Character (UTF-8) console input (in)");
    }
}


class IOConsoleOutput extends IODevice{
    constructor(_ConsoleDevice){
        super();
        this.consoleDevice=_ConsoleDevice;
    }

    start(_IODriver){
        const _outVal = _IODriver.write()
        this.consoleDevice.writeConsole(_outVal);
        _IODriver.confirm();
    }

    getDescription(){
        return Translator.getTranslation("_io_console_out","Console output (out)");
    }
}


class IOConsoleClear extends IODevice{
    constructor(_ConsoleDevice){
        super();
        this.consoleDevice=_ConsoleDevice;
    }

    start(_IODriver){
        this.consoleDevice.clearConsole();
        _IODriver.confirm();
    }

    getDescription(){
        return Translator.getTranslation("_io_console_clear_cmd","Clear console (cmd)");
    }
}











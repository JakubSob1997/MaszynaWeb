

import Alerter from "./alerter.js";
import { AlertStyleEnum } from "./enums.js";
import IODevice from "./io-device.js";
import Translator from "./translator.js";

export default class ConsoleDevice{

    constructor(){
        this.numericInputIO=new IOConsoleNumericInput(this);
        this.characterInputIO = new IOConsoleCharacterInput(this);
        this.consoleOutputIO = new IOConsoleOutput(this);
        this.clearConsoleIO=new IOConsoleClear(this);


        this.characterInputString ="";
        this.numberInputVal =0;
        this.consoleOutputString="";

        this.onUpdateOutput=function(_device){(console.log("Overide Me"))};
        this.onUpdateCharacterInput=function(_device){(console.log("Overide Me"))};
       
    }


    setCharacterInput(_string){
        this.characterInputString =_string;
        if(this.waitingDriver!=null){

            if(this.readCharacter(this.waitingDriver)==true){
                this.waitingDriver=null;
            }
            
        }
    }

    setNumericInput(_val){
        this.numberInputVal =_val;
    }



    readCharacter(_IODriver){

        


        if(this.characterInputString===""){
            this.waitingDriver = _IODriver;
            return false;
        }else{
            const char =this.characterInputString.charCodeAt(0);
            this.characterInputString=this.characterInputString.substring(1);
            this.onUpdateCharacterInput(this);
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


export class IOConsoleNumericInput extends IODevice{
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

export class IOConsoleCharacterInput extends IODevice{
    constructor(_ConsoleDevice){
        super();
        this.consoleDevice=_ConsoleDevice;
    }

    start(_IODriver){
        this.consoleDevice.readCharacter(_IODriver);
    }

    getDescription(){
        return Translator.getTranslation("_io_console_char_in","Character console input (in)");
    }
}


export class IOConsoleOutput extends IODevice{
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


export class IOConsoleClear extends IODevice{
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













import IODevice from "./io-device.js";

export default class ConsoleDevice{

    constructor(){
        this.numericInputIO=new IOConsoleNumericInput(this);
        this.asciiInputIO = new IOConsoleASCIInput(this);
        this.consoleOutputIO = new IOConsoleOutput(this);
        this.clearConsoleIO=new IOConsoleClear(this);
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
        console("(overide) interacted by io diriver "+ _IODriver)
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
        console("(overide) interacted by io diriver "+ _IODriver)
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
        console("(overide) interacted by io diriver "+ _IODriver)
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
        console("(overide) interacted by io diriver "+ _IODriver)
        _IODriver.confirm();
    }

    getDescription(){
        return "Wyczyść konsole (pol)";
    }
}













import IODevice from "./io-device";

export default class ConsoleDevice{

    constructor(){
        
    }


}

export class ConsoleInputDevice extends IODevice{
    constructor(_ConsoleDevice){
        this.consoleDevice=_ConsoleDevice;
    }

    start(_IODriver){
        console("(overide) interacted by io diriver "+ _IODriver)
        _IODriver.confirm();
    }

    getDescripton(){
        return "Wejście Konsoli";
    }
}

export class ConsoleOutputDevice extends IODevice{
    constructor(_ConsoleDevice){
        this.consoleDevice=_ConsoleDevice;
    }

    start(_IODriver){
        console("(overide) interacted by io diriver "+ _IODriver)
        _IODriver.confirm();
    }

    getDescripton(){
        return "Wyjście Konsoli";
    }
}

















import { ExtnensionFlags } from "./enums.js";
import MachineComponent from "./machine-component.js";
import Register from "./register.js";


class FlagState{
    constructor(_name,_flagBit,_isActive){
        
        this.flagName=_name;
        this.flagBit=_flagBit;
        this.isActive=_isActive;
    }
}

export default class FlagRegister extends Register{
    constructor(){

        super("F");
        this.flags = {}






    }

    addFlag(_name,_flagBit){

    }

    getTextContent(){
        return "";
    }

    setDefault(){}
    update(){}
    resetState(){}
    onBusWidthChanged(_settings){}
    getExtention(){return  ExtnensionFlags.Flags;}
}




























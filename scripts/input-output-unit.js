

import MachineComponent from "./machine-component.js";
import Alerter from "./alerter.js"

export default class InputOutputUnit extends MachineComponent{

    constructor(_RB_register,_G_register){
        super();

        this.RB_register = _RB_register;
        this.G_register = _G_register;
    }

    doStart(){
        
    }
}

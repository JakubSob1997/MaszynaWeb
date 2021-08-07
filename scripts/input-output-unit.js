

import MachineComponent from "./machine-component.js";
import Alerter from "./alerter.js"

export default class InputOutputUnit extends MachineComponent{

    constructor(_RB_register,_G_register,_I_register){
        super();

        this.RB_register = _RB_register;
        this.G_register = _G_register;
        this.I_register=_I_register

        this.adressMask= ~0;
        
    }

    onBusWidthChanged(_settings){
        this.adressMask=_settings.adressMask;
    }

    addIODevice(_IODevice){
        _IODevice.driver = this;
    }

    confirmOutput(){
        this.G_register.setValue(1);
    }

    doStart(){
        
    }
}

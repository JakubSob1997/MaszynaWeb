

import Alerter from "./alerter.js";
import MachineComponent from "./machine-component.js";
import Translator from "./translator.js";


export default class IOUnit extends MachineComponent/*extends IODriver */{

    constructor(_RB_register,_G_register,_I_register){
        super();

        this.RB_register = _RB_register;
        this.G_register = _G_register;
        this.I_register=_I_register

        this.adressMask= ~0;

        this.ioDriver = this;

        this.devices={};

        
        //This is am example of how you can redefine interaction wth I/O Devices
        /*
        this.ioDriver = {
            buffer: this.RB_register,
            confirm(){
                Alerter.sendMessage("IO_CONFIRM")},
            read(_val){
                Alerter.sendMessage(`READ ${_val}`)
            },
            write(){
                const val = this.buffer.getValue();
                Alerter.sendMessage(`WRITE ${val}`)
                return val;
            }
        }
        */

        
    }


    doStart(){
        this.init(this.getCurrentAddres());
    }

    getCurrentAddres(){
        return this.I_register.getValue()&this.adressMask;
    }

    onBusWidthChanged(_settings){
        
        this.adressMask=_settings.adressMask;
    }

    addIODevice(_IODevice,_adress){
        this.devices[_adress]=_IODevice;
    }


    getDevice(_adress){
        return this.devices[_adress]
    }

    init(_adress){
        let device = this.getDevice(_adress);
        if(device==null){
            Alerter.alert(Translator.getTranslation(
                "_alert_undefined_io_device",
                "Undefined IO device at addres @0!",
                [_adress]
            ));
            return;
        }
        this.G_register.setValue(0);
        device.start(this.ioDriver);
        
    }

    /*
        I can read, I can write, I can confirm
        That's why I am an IODriver
    */

    
    read(_value){
        if(isNaN(_value)||typeof(_value)!="number"){
            Alerter.alert(Translator.getTranslation(
                "_alert_io_input_nan",
                "I/O input: @0 is not a number!",
                [_value]
            ));
            return;
        }
        this.RB_register.setValue(Math.floor(_value));
    }

    write(){
        return this.RB_register.getValue();
    }

    confirm(){
        this.G_register.setValue(1);
    }
}

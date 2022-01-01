import IODevice from "./io-device.js";
import Translator from "./translator.js";
import UniversalSerializer from "./universal-serializer.js";
import SerializerManager from "./serializer-manager.js";
import InteruptDevice from "./interupt-device.js";
import { InteruptEnum } from "./enums.js";



export default class CycleTimerDevice{


        constructor(_machine,_interuptDriver){
            this.cyclesToWait =100;
            this.interupt = new InteruptDevice(_interuptDriver)
            this.interupt.description=Translator.getTranslation("_interupt_cycle_timer","Cycle Timer Interupt");
            this.interupt.interuptVactor=InteruptEnum.INT1;
            this.ioStart = new IOStartTimer(this)


            this.onStateChange = (_newValue)=>{
                console.log("overide me "+_newValue)
            }


            this.state = -1;
            _machine.addOnCycleDoneForceCallback(()=>{
                if(this.state>=0){
                    

                    if(this.state===0){
                        this.interupt.throwInterupt();
                    }

                    this.state--;
                    this.onStateChange(this.state);
                }

                
            })
        }

        start(_count){
            this.state=_count;
            this.onStateChange(this.state);
        }

}


export class IOStartTimer extends IODevice{


    constructor(_timer){
        super();
        this.timer=_timer;
    }

    start(_IODriver){
        this.timer.start(_IODriver.write());
        _IODriver.confirm();
    }

    getIOModule(){
        return IOModuleFlags.Base;
    }

    getDescription(){
        return Translator.getTranslation("_io_cycle_timer_start","Start cycle timer (out)");
    }
}





import IODevice from "./io-device.js";
import Translator from "./translator.js";

export default class IORandom extends IODevice{
    constructor(){
        super();

        this.min = 0;
        this.max = Math.floor(((~0)>>>1));
    }


    getRnadomInt(){
        const val = Math.random();
        return Math.floor( val* (this.max - this.min)) + this.min;
    }

    start(_IODriver){
        let val =this.getRnadomInt();
        val=val>>8;
        _IODriver.read(val);
        _IODriver.confirm();
    }

    getDescription(){
        return Translator.getTranslation("_io_random_in","Random number generator (in)")
    }
}









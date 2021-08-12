

import IODevice from "./io-device.js";

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
        if(_IODriver==null){
            console.log("No io driver provided");
            return;
        }
        let val =this.getRnadomInt();
        val=val>>8;
        _IODriver.read(val);
        _IODriver.confirm();
    }

    getDescription(){
        return "Generator liczb losowych (we)";
    }
}









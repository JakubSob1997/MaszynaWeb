import { IOModuleFlags } from "./enums.js";



export default class IODevice{
    constructor(){

    }



    start(_IODriver){
        console("(overide) interacted by io diriver "+ _IODriver)
        _IODriver.confirm();
    }

    getIOModule(){
        return IOModuleFlags.Base;
    }

    getDescription(){
        return "I am a generic IO device";
    }



}
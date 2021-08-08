


export default class IODevice{
    constructor(){

    }

    start(_IODriver){
        console("(overide) interacted by io diriver "+ _IODriver)
        _IODriver.confirm();
    }



}
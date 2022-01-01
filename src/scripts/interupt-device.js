




export default class InteruptDevice{

    constructor(_interuptDirver){
        this.interuptDriver = _interuptDirver;
        this.interuptVactor=0;
        this.canChangeVactor=true;
        this.description = "I am a generic Interupt device";
    }

    setInteruptDriver(_interuptDirver){
        this.interuptDriver = _interuptDirver;
    }

    getInteruptVector(){
        return this.interuptVactor;
    }

    throwInterupt(){
        this.interuptDriver.handleInterupt(this);
    }



    getDescription(){
        return this.description;
    }


}










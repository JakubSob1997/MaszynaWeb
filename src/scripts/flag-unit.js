import Alerter from "./alerter.js"




export class ConditionFlag{
    constructor(_name,_bit,_flagCheckFunk){
        this.name = _name;
        this.bit=_bit;
        this.isFlagActive = _flagCheckFunk;
    }
}

export default class FlagsUnit{

    constructor(_flagRegister){
        this.conditionFlags = {};

        

    }

    updateUnit(){
        
    }

    addFlag(_conditionFlag){
        this.conditionFlags[_conditionFlag.name] = _conditionFlag;
    }


    checkFlag(_flagName,_Machine){
        return this.conditionFlags[_flagName].isFlagActive();
    }

}






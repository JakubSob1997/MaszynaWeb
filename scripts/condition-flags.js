import Alerter from "./alerter.js"




export class ConditionFlag{
    constructor(_name,_flagCheckFunk){
        this.name = _name;
        this.isFlagActive = _flagCheckFunk;
    }
}

export default class FlagsUnit{

    constructor(){
        this.conditionFlags = [];
    }

    addFlag(_conditionFlag){
        this.conditionFlags[_conditionFlag.name] = _conditionFlag;
    }


    checkFlag(_flagName,_Machine){
        return this.conditionFlags[_flagName].isFlagActive(_Machine);
    }

}






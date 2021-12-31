import Alerter from "./alerter.js"





export default class FlagsUnit{

    constructor(_flagRegister){
        this.conditionFlags = {};

        

    }

    addFlag(_conditionFlag){
        this.conditionFlags[_conditionFlag.name] = _conditionFlag;
    }


    checkFlag(_flagName){
        return this.conditionFlags[_flagName].isFlagActive();
    }

}






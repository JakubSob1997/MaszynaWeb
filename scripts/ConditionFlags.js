




class ConditionFlag{
    constructor(_name,_flagCheckFunk){
        this.name = _name;
        this.isFlagActive = _flagCheckFunk;
    }
}

class FlagsUnit{

    constructor(_AK_Register){
        this.AK_register = _AK_Register;
        this.conditionFlags = [];
    }

    addFlag(_conditionFlag){
        this.conditionFlags[_conditionFlag.name] = _conditionFlag;
    }


    checkFlag(_flagName){
        return this.conditionFlags[_flagName].isFlagActive(this);
    }

}






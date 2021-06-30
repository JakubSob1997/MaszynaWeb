



class BranchCondition{
    constructor(_flagName,_cycleIfTrue){
        this.flagName = _flagName;
        this.cycleIfTrue = _cycleIfTrue;
    }
}



class InstrCycle{
    constructor(_signals){
        this.signals = _signals;
        this.branchCondtions = [];
        this.isFinal = false;
    }
}




class Instruction{
    constructor(_name){
        this.name = _name
        this.cycles = []

    }
}



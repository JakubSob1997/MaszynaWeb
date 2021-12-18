import InstructionData from "./instruction-data.js";




export class BranchCondition {
    constructor(_flagName, _targetCycle, _negate) {
        this.flagName = _flagName;
        this.targetCycle = _targetCycle;
        this.negate = _negate ?? false;
    }
}



export class InstrCycle {
    constructor(_signals) {
        this.signals = _signals;
        this.branchCondtions = [];
        this.isFinal = false;
        this.ogIndex = NaN;
    }
}



export default class Instruction {
    constructor(_name) {
        this.name = _name?.toUpperCase();
        this.source = "";
        this.cycles = []
        this.argCount = 1;
    }

    getData(){
        return new InstructionData(this.name,this.source);
    }
}











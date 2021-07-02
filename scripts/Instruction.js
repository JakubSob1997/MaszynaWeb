



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
        this.name.toUpperCase();
        this.cycles = []
        this.argCount = 1;
    }
}



class InstructionList{
    constructor(_instrArray){
        this.indexDictionary=[];
        this.instructionArray = _instrArray;
        this.reindexDictionary();


    }


    length(){
        return this.instructionArray.length;
    }


    hasInstruction(_indexOrName){
        return this.getInstructionIndex(_indexOrName)>=0;
    }

    getInstruction(_indexOrName){
        let index = this.getInstructionIndex(_indexOrName);
        if(index>=0&& index<this.length()){

            return this.instructionArray[index];
        }
        return null;
    }

    addInstruction(_newInstruction){
        this.instructionArray.push(_newInstruction);
        this.reindexDictionary();
    }


    removeInstruction(_indexOrName){
        let index = getInstructionIndex(_indexOrName);
        if(index>=0&& index<this.length()){

            this.instructionArray.splice(index,1);
            reindexDictionary();

            return true;
        }
        return false;
    }


    reindexDictionary(){
        this.indexDictionary = [];
        for (let index = 0; index < this.instructionArray.length; index++) {
            const instr = this.instructionArray[index];

            if(instr.name in this.indexDictionary == false){
                this.indexDictionary[instr.name] = index;
            }
            
        }
    }


    getInstructionIndexByName(_name){
        _name=_name.toUpperCase();

        if(_name in this.indexDictionary){
            const index =  this.indexDictionary[_name];
            return index;
        }
        return -1;
    }

    getInstructionIndex(_indexOrName){

        let index=-1;
        if(typeof _indexOrName =="string"){
            index =this.getInstructionIndexByName(_indexOrName);
        }else
        if(typeof _indexOrName=="number"){
            index = _indexOrName;
        }
        return index;
    }



}



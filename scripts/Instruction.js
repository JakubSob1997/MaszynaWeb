



class BranchCondition{
    constructor(_flagName,_targetCycle,_negate){
        this.flagName = _flagName;
        this.targetCycle = _targetCycle;
        this.negate = _negate??false;
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
        this.name = _name.toUpperCase();
        this.source ="";
        this.cycles = []
        this.argCount = 1;
    }
}



class InstructionListSerializer{
    constructor(_instrArray){
        this.instructionArray = _instrArray;
    }

    

    static serializeList(_instructionList){
        return new InstructionListSerializer(_instructionList.instructionArray);
    }


    static getDefault(){
        let STP_inst = new Instruction("STP");
        STP_inst.argCount=0;
        STP_inst.cycles[0] =new InstrCycle(["czyt","wys","wei","il"]);
        STP_inst.cycles[1]=new InstrCycle(["stop"]);
        STP_inst.source = 
        "ROZKAZ STP;\n"+
        "BEZARG;\n"+
        "czyt wys wei il;\n"+
        "stop;"
    
        let DOD_inst = new Instruction("DOD");
        DOD_inst.cycles[0]=new InstrCycle(["czyt","wys","wei","il"]);
        DOD_inst.cycles[1]=new InstrCycle(["wyad","wea"]);
        DOD_inst.cycles[2]=new InstrCycle(["wyl","wea","czyt","wys","weja","dod","weak"]);
        DOD_inst.source =
            "ROZKAZ DOD;\n"+
            "czyt wys wei il;\n"+
            "wyad wea;\n"+
            "wel wea czyt wys weja dod weak;";

        /*
        let ODE_inst = new Instruction("ODE");
        ODE_inst.cycles[0]=new InstrCycle(["czyt","wys","wei","il"]);
        ODE_inst.cycles[1]=new InstrCycle(["wyad","wea"]);
        ODE_inst.cycles[2]=new InstrCycle(["wyl","wea","czyt","wys","weja","ode","weak"]);
        */

        let ODE_inst = new Instruction("ODE");
        ODE_inst.cycles[0]=new InstrCycle(["czyt","wys","wei","il"]);
        ODE_inst.cycles[1]=new InstrCycle(["wyad","wea","eni"]);
        ODE_inst.cycles[2]=new InstrCycle(["wyl","wea","czyt","wys","weja","ode","weak"]);
        ODE_inst.cycles[2].isFinal=true;
        ODE_inst.cycles[2].branchCondtions = [new BranchCondition("INT",3)];
        ODE_inst.cycles[3]=new InstrCycle(["dws","czyt","wys","weja","ode","weak"]);
        ODE_inst.cycles[4]=new InstrCycle(["wyls","wes","wyws","wea"]);
        ODE_inst.cycles[5]=new InstrCycle(["pisz","wyap","wel","wea","rint"]);

        ODE_inst.source=
            "ROZKAZ ODE;\n"+
            "czyt wys wei il;\n"+
            "wyad wea eni;\n"+
            "JEZELI INT @przerw;\n"+
            "wyl wea czyt wys weja ode weak wyl KONIEC;\n"+
            "@przerw wyls wes wyws wea;\n"+
            "pisz wyap wel wea rint";
        let POB_inst = new Instruction("POB");
        POB_inst.cycles[0]=new InstrCycle(["czyt","wys","wei","il"]);
        POB_inst.cycles[1]=new InstrCycle(["wyad","wea"]);
        POB_inst.cycles[2]=new InstrCycle(["wyl","wea","czyt","wys","weja","przep","weak"]);
    
    
        let LAD_inst = new Instruction("LAD");
        LAD_inst.cycles[0]=new InstrCycle(["czyt","wys","wei","il"]);
        LAD_inst.cycles[1]=new InstrCycle(["wyad","wea","wyak","wes"]);
        LAD_inst.cycles[2]=new InstrCycle(["pisz","wyl","wea"]);
    
        let SOB_inst = new Instruction("SOB");
        SOB_inst.cycles[0]=new InstrCycle(["czyt","wys","wei","il"]);
        SOB_inst.cycles[1]=new InstrCycle(["wyad","wel","wea"]);
    
    
        let SOM_inst =  new Instruction("SOM");
        SOM_inst.cycles[0]=new InstrCycle(["czyt","wys","wei","il"]);
        SOM_inst.cycles[1]=new InstrCycle(["wyl","wea"])
        SOM_inst.cycles[1].isFinal=true;
        SOM_inst.cycles[1].branchCondtions = [new BranchCondition("Z",2)];
        SOM_inst.cycles[2]=new InstrCycle(["wyad","wea","wel"]);
    
        let SOZ_inst =  new Instruction("SOZ");
        SOZ_inst.cycles[0]=new InstrCycle(["czyt","wys","wei","il"]);
        SOZ_inst.cycles[1]=new InstrCycle(["wyl","wea"])
        SOZ_inst.cycles[1].isFinal=true;
        SOZ_inst.cycles[1].branchCondtions = [new BranchCondition("ZAK",2)];
        SOZ_inst.cycles[2]=new InstrCycle(["wyad","wea","wel"]);
    
    
    
        let instrArray=[];
        instrArray.push(STP_inst); //000
        instrArray.push(DOD_inst); //001
        instrArray.push(ODE_inst); //010
        instrArray.push(POB_inst); //011
        instrArray.push(LAD_inst); //100
        instrArray.push(SOB_inst); //101
        instrArray.push(SOM_inst); //110
        instrArray.push(SOZ_inst); //111
    
    
        return new InstructionListSerializer(instrArray);
    }

}



class InstructionList{

    constructor(_instrArray){
        this.indexDictionary=[];
        this.instructionArray = _instrArray;
        this.reindexDictionary();
    }

    static getDeserializedList(_instructionListSerializer){
        return new InstructionList(_instructionListSerializer.instructionArray);
    }


    static getDefaultInstructionList(){
        return new InstructionList(InstructionListSerializer.getDefault().instructionArray);
    }


    setupValues(_instructionListSerializer){
        this.instructionArray = _instructionListSerializer.instructionArray;
        this.reindexDictionary();
    }

    length(){
        return this.instructionArray.length;
    }

    swap(_indexOrName1,_indexOrName2){
        let index1 = this.getInstructionIndex(_indexOrName1);
        let index2 = this.getInstructionIndex(_indexOrName2);

        let tmp = this.instructionArray[index1];
        this.instructionArray[index1]= this.instructionArray[index2];
        this.instructionArray[index2]=tmp;
        this.reindexDictionary();

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
            if(_indexOrName>=0&_indexOrName <this.instructionArray.length)
            index = _indexOrName;
        }
        return index;
    }


}



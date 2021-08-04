
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
        let index = this.getInstructionIndex(_indexOrName);
        if(index>=0&& index<this.length()){

            this.instructionArray.splice(index,1);
            this.reindexDictionary();

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


    createEmptyInstruction(_prefix){
        const prefix = _prefix??"ROZ";
        let postfix = 0;


        let newName = prefix+postfix.toString();

        while (this.hasInstruction(newName)==true) {
            postfix++;
            newName = prefix+postfix.toString();
        }

        let instructionCode = 
        "ROZKAZ "+newName+";\n"+
        "czyt wys wei il;\n"+
        "wyl wea;\n";

        const parser = new InstrcutionParser(instructionCode);

        return parser.toInstruction();

    }


}



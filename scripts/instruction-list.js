
import Instruction,{InstrCycle,BranchCondition} from "./instruction.js"
import InstrcutionParser from "./instruction-parser.js";

export default class InstructionList{


    static getDeserializedList(_instructionListSerializer,_singnalDictionary){
        
        let instrList =  new InstructionList();
        instrList.setupValues(_instructionListSerializer,_singnalDictionary);
        
    }


    static getDefaultInstructionList(_singnalDictionary){
        return InstructionList.getDeserializedList(InstructionListSerializer.getDefault(),_singnalDictionary);
    }


    

    setupValues(_instructionListSerializer,_singnalDictionary){

        const sourceArr  =_instructionListSerializer.instructionArray

        this.instructionArray=[];

        for (let i = 0; i < sourceArr.length; i++) {
            const source = sourceArr[i];

            const parseResult = new InstrcutionParser(source);
            this.instructionArray.push(parseResult.toInstruction());
        }

        this.reindexDictionary();
    }

    constructor(){
        this.indexDictionary=[];
        this.instructionArray =[];
        this.reindexDictionary();

        this.onInstructionDeletedCallbacks=[];
        this.onInstructionChangedCallbacks=[];
    }


    addOnInstructionDeletedCallback(_funk){
        this.onInstructionDeletedCallbacks.push(_funk);
    }

    addOnInstuctionChangedCallback(_funk){
        this.onInstructionChangedCallbacks.push(_funk);
    }


    invokeInstructionDeleted(_instrname,_index){
        this.onInstructionDeletedCallbacks.forEach(funk => {
            funk(_instrname,_index);
        });
    }

    invokeInstructionChanged(_oldName,_newName,_index){
        this.onInstructionChangedCallbacks.forEach(funk => {
            funk(_oldName,_newName,_index);
        });
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
        const oldindex = this.getInstructionIndex(_newInstruction.name);
        if(oldindex>=0){
            return false
        }
        this.instructionArray.push(_newInstruction);
        this.reindexDictionary();
        return true;
    }


    removeInstruction(_indexOrName){
        let index = this.getInstructionIndex(_indexOrName);
        

        if(index>=0&& index<this.length()){
            const name = this.instructionArray[index].name;
            this.instructionArray.splice(index,1);
            this.reindexDictionary();

            this.invokeInstructionDeleted(name,index);
            return true;
        }
        return false;
    }
    updateInstruction(_indexOrName,_newInstructionObject){
        let index = this.getInstructionIndex(_indexOrName);

        if(index>=0&& index<this.length()){

            const newName =_newInstructionObject.name;


            if(this.getInstructionIndex(newName)!=index){
                return false;
            }

            const oldName = this.instructionArray[index].name;
            this.instructionArray[index]= _newInstructionObject;
            this.reindexDictionary();

            this.invokeInstructionChanged(oldName,newName,index);
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



export class InstructionListSerializer{
    constructor(_instrSourceArray){
        this.instructionArray = _instrSourceArray;
    }

    

    static serializeList(_instructionList){
        return new InstructionListSerializer(_instructionList.instructionArray);
    }


    static getDefault(){


        const STP  = 
            "ROZKAZ STP;\n"+
            "BEZARG;\n"+
            "czyt wys wei il;\n"+
            "stop;\n"
        
        const DOD = 
            "ROZKAZ DOD;\n"+
            "czyt wys wei il;\n"+
            "wyad wea;\n"+
            "wyl wea czyt wys weja dod weak;\n";

        const ODE = 
            "ROZKAZ ODE;\n"+
            "czyt wys wei il;\n"+
            "wyad wea;\n"+
            "wyl wea czyt wys weja ode weak;\n";
        
        const POB = 
            "ROZKAZ POB;\n"+
            "czyt wys wei il;\n"+
            "wyad wea;\n"+
            "wyl wea czyt wys weja przep weak;\n";
        
        const LAD = 
            "ROZKAZ LAD;\n"+
            "czyt wys wei il;\n"+
            "wyad wea wyak wes;\n"+
            "pisz wyl wea;\n";
        

        const SOB=
            "ROZKAZ SOB;\n"+
            "czyt wys wei il;\n"+
            "wyad wea wel;\n";
        
        const SOM=
            "ROZKAZ SOM;\n"+
            "czyt wys wei il;\n"+
            "JEZELI Z @skok;\n"+
            "wyl wea KONIEC;\n"+
            "@skok wyad wea wel;\n";

        const SOZ=
            "//Skok przy zerze [Jump if zero] \n"+
            "ROZKAZ SOZ;\n"+
            "czyt wys wei il;\n"+
            "JEZELI ZAK @skok;\n"+
            "wyl wea KONIEC;\n"+
            "@skok wyad wea wel;\n";

        const sourceCodes = [STP,DOD,ODE,POB,LAD,SOB,SOM,SOZ]

        return new InstructionListSerializer(sourceCodes)
    }


}


/*
    ODE_inst.source=
            "ROZKAZ ODE;\n"+
            "czyt wys wei il;\n"+
            "wyad wea eni;\n"+
            "JEZELI INT @przerw;\n"+
            "wyl wea czyt wys weja ode weak wyl KONIEC;\n"+
            "@przerw wyls wes wyws wea;\n"+
            "pisz wyap wel wea rint";

*/
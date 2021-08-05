
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
    }


    addOnInstructionDeletedCallback(_funk){
        this.onInstructionDeletedCallbacks.push(_funk);
    }

    invokeInstructionDeleted(_instrname,_index){
        this.onInstructionDeletedCallbacks.forEach(funk => {
            funk(_instrname,_index);
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
        this.instructionArray.push(_newInstruction);
        this.reindexDictionary();
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

        
        let ODE_inst = new Instruction("ODE");
        ODE_inst.cycles[0]=new InstrCycle(["czyt","wys","wei","il"]);
        ODE_inst.cycles[1]=new InstrCycle(["wyad","wea"]);
        ODE_inst.cycles[2]=new InstrCycle(["wyl","wea","czyt","wys","weja","ode","weak"]);
        

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
    */
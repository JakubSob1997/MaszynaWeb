
import Instruction,{InstrCycle,BranchCondition} from "./instruction.js"
import InstrcutionParser from "./instruction-parser.js";
import Terminator from "./terminator.js";
import InstructionListData from "./instruction-list-data.js";
import Alerter from "./alerter.js";
import { AlertStyleEnum } from "./enums.js";

export default class InstructionList{


    static getDeserializedList(_instructionListData,_instructionValidator){
        
        let instrList =  new InstructionList();

        instrList.setupValues(_instructionListData,_instructionValidator);
        return instrList;
    }


    static getDefaultInstructionList(_instructionValidator){
        return InstructionList.getDeserializedList(InstructionListData.getDefault(),_instructionValidator);
    }


    

    setupValues(_instrListData,_instructionValidator){

        const instructionDatas  =_instrListData.instructionDataArray;

   

        if(instructionDatas==null){
            return
        }

        this.instructionArray=[];

        for (let i = 0; i < instructionDatas.length; i++) {
            const source = instructionDatas[i].sourceCode;

            const parseResult = new InstrcutionParser(source);
            parseResult.validate(_instructionValidator);

            if(parseResult.parseSuccesful){

                const instr =parseResult.toInstruction();
                console.log(instr);
                this.instructionArray.push(instr);
            }else{
                parseResult.errorList.forEach(error => {
                    Alerter.sendMessage(instructionDatas[i].name + " - "+error,AlertStyleEnum.SyntaxError);
                });
            }

            
        }

        
        this.invokeInstructionListChanged();
        this.reindexDictionary();
    }

    constructor(){
        this.indexDictionary=[];
        this.instructionArray =[];
        this.reindexDictionary();

        this.onInstructionDeletedCallbacks=[];
        this.onInstructionChangedCallbacks=[];
        this.onInstructionListChangedCallbacks=[];

        this.serializer = null; //:SeralizerBase
    }

    save(){
        if(this.serializer!=null){
            this.serializer.saveToLocalStorage();
        }
    }

    

    addOnInstructionDeletedCallback(_funk){
        this.onInstructionDeletedCallbacks.push(_funk);
    }

    addOnInstuctionChangedCallback(_funk){
        this.onInstructionChangedCallbacks.push(_funk);
    }

    addOnInstructionListChangedCallbacks(_funk){
        this.onInstructionListChangedCallbacks.push(_funk);
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

    invokeInstructionListChanged(){
        this.onInstructionListChangedCallbacks.forEach(funk => {
            funk(this);
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
            const checkIndex = this.getInstructionIndex(newName);

            if(checkIndex!=index&&checkIndex>=0&& checkIndex<this.length()){
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

        Terminator.terminate();
        this.save();
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

    getDataObject(){


        let instrDatas  = [];

        this.instructionArray.forEach(instr=>{
            instrDatas.push(instr.getData())
        })

        return new InstructionListData(instrDatas);
    }


}



import InstructionList from "./instruction-list.js";
import InstructionListData from "./instruction-list-data.js";
import SerializerBase from "./serializer-base.js";

export default class InstructionListSerializer extends SerializerBase{
    constructor(_instructionList,_instructionValidator){
        super();
        this.instructionList=_instructionList;
        this.instructionValidator=_instructionValidator
    }


    getDefault(){

        return InstructionListData.getDefault();
    }

    getKeyName(){
        return "instructionList";
    }

    setObjectData(_dataObject){
        this.instructionList.setupValues(_dataObject,this.instructionValidator)
    }

    getObjectData(){
        

        return this.instructionList.getDataObject() ;
    }

    

    
}



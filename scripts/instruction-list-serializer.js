
import InstructionList from "./instruction-list.js";
import InstructionListData from "./instruction-list-data.js";
import SerializerBase from "./serializer-base.js";

export default class InstructionListSerializer extends SerializerBase{
    constructor(_instructionList){
    }

    getDefault(){
        return InstructionListData.getDefault();
    }

    getKeyName(){
        return "instructionList";
    }
}



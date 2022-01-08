import SerializerBase from "./serializer-base.js";




export default class AssemblySerializer extends SerializerBase{
    constructor(_assemblyEditor){
        super();
        this.assemblyEditor=_assemblyEditor;
    }


    getDefault(){
        return "//Write your code here\n//Tutaj napisz swój program\n";
    }

    getKeyName(){
        return "program";
    }

    setObjectData(_dataObject){
        this.assemblyEditor.setCode(_dataObject);
    }

    getObjectData(){
        

        return this.assemblyEditor.getCode();
    }

    

    
}



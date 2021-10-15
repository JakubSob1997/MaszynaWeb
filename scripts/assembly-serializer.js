import SerializerBase from "./serializer-base.js";




export default class AssemblySerializer extends SerializerBase{
    constructor(_assemblyEditor){
        super();
        this.assemblyEditor=_assemblyEditor;
    }


    getDefault(){
        return "//You can find example programs at\n//File=>Presets=>[name].json=>Load";
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



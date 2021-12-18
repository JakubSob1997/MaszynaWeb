import SerializerBase from "./serializer-base.js";




export default class UniversalSerializer extends SerializerBase{


    constructor(_key,_default,_setFunk,_getFunk){
        super();
        this.key=_key;
        this.default=_default;
        this.setFunk=_setFunk;
        this.getFunk=_getFunk;

    }


    getDefault(){
        return  this.default;
    }

    //This should be Immutable during the lifespan of that object
    getKeyName(){
        return this.key;
    }

    setObjectData(_dataO){
        this.setFunk(_dataO);
    }

    getObjectData(){
        return this.getFunk();
    }



}
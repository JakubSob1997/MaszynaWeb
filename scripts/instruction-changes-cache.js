





export default class InstructionChangesCache{
    
    constructor(){
        this.dirtyCaches = {};
        this.loadCacheSesssion();
    }

    loadCacheSesssion(){
        const cacheJSON = sessionStorage.getItem("instruction_cache");
        if(cacheJSON!=null){
            this.dirtyCaches=JSON.parse(cacheJSON);
        }
    }


    isDirty(_key){
        return Object.hasOwnProperty.call(this.dirtyCaches, _key)
    }


    setCache(_key,_value){
        this.dirtyCaches[_key] = _value;
        sessionStorage.setItem("instruction_cache",JSON.stringify(this.dirtyCaches));
    }

    getCache(_key){
        return this.dirtyCaches[_key];
    }


    clearCache(_key){
        if(Object.hasOwnProperty.call(this.dirtyCaches, _key)){
            delete this.dirtyCaches[_key];
        }
        sessionStorage.setItem("instruction_cache",JSON.stringify(this.dirtyCaches));
    }

    clearAll(){
        delete this.dirtyCaches;
        this.dirtyCaches={};
        sessionStorage.setItem("instruction_cache",JSON.stringify(this.dirtyCaches));
    }






}



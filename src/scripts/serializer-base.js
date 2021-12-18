



/**
 * Serializers are supposed to be responsible for comunicating with objects
 * especcialy during file import and exports
 */


export default class SerializerBase {
    constructor(){

    }

    getDefault(){
        console.log("(overide me)SerializerBase.getDefault()")
        return null;
    }

    //This should be Immutable during the lifespan of that object
    getKeyName(){
        console.log("(overide me)SerializerBase.getKeyName()")
        return null;
    }

    setObjectData(_dataO){
        console.log("(overide me)SerializerBase.getObjectData()")
    }

    getObjectData(){
        console.log("(overide me)SerializerBase.getObjectData()")
        return null;
    }


    //Default for object type overide for smthing else
    getFromLocalStorage(){
        const jsonString = localStorage.getItem(this.getKeyName());
        let dataObject;
        if(jsonString==null){
            dataObject = this.getDefault();
        }else{
            dataObject=JSON.parse(jsonString);
            if(dataObject==null){
                dataObject=this.getDefault();
            }
        }
        return dataObject;
    }

    //Default for object type overide for smthing else
    saveToLocalStorage(){
        const jsonString = JSON.stringify(this.getObjectData())
        localStorage.setItem(this.getKeyName(),jsonString);
    }

    loadFromLocalStorage(){
        const dataObject = this.getFromLocalStorage();
        this.setObjectData(dataObject);
    }

    setToDefault(){
        this.setObjectData(this.getDefault());
        this.saveToLocalStorage();
    }


}


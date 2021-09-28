
import Alerter from "./alerter.js"
import {AlertStyleEnum} from "./enums.js"

let SerializerManager={
    serializers:{},

    addSerializer:function(_serializer){
        this.serializers[_serializer.getKeyName()]=_serializer;
    },

    exportLocalFile:function (content, fileName, contentType) {
        var a = document.createElement("a");
        var file = new Blob([content], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    },

    exportSerializers:function(_serializerList,_filename){
        let exportOpbjject={}
        if(_filename==null){
            _filename="W_Preset.json";
        }

        for (const key in _serializerList) {
            if (Object.hasOwnProperty.call(_serializerList, key)) {
                const serilaizer = _serializerList[key];
                exportOpbjject[serilaizer.getKeyName()]=serilaizer.getObjectData();
            }
        }

        const jsonString = JSON.stringify(exportOpbjject,null,"\t");
        this.exportLocalFile(jsonString,_filename,"application/json")
    },

    loadFromObject(_obj,_serializerList){
        for (const key in _obj) {
            if (Object.hasOwnProperty.call(_obj, key)) {
                const value = _obj[key];
                
                if(_serializerList.hasOwnProperty(key)){
                    const serializer = _serializerList[key];
                    serializer.setObjectData(value);
                }

            }
        }
    },
   

    readDataFromJson:function(_fileObject,_serializerList){
        let promise = new Promise((resolve,reject)=>{
            let reader = new FileReader();
        reader.onload=(e)=>{
            const content = e.target.result;
            const jsonObj = JSON.parse(content);
            jsonObj.fileName=_fileObject.name;

            resolve(jsonObj);
        };
        reader.onerror=(e)=>{
            reject();
        }
        reader.readAsText(_fileObject);
        })

        return promise;
        
    },

    /*
    loadDataFromJson:function(_fileObject,_serializerList){
        let reader = new FileReader();
        reader.onload=(e)=>{
            const content = e.target.result;
            const jsonObj = JSON.parse(content);
            this.loadFromObject(jsonObj,_serializerList);

            Alerter.sendMessage(`Wczytanie pliku "${_fileObject.name}" przebiegło pomyślnie.`,AlertStyleEnum.InputSucces);


        };
        reader.onerror=(e)=>{
            Alerter.sendMessage(`Wczytanie pliku "${_fileObject.name}" się nie powiodło.`,AlertStyleEnum.InputError);

        }
        reader.readAsText(_fileObject);
    },*/

    getDefaultObject(){
        let obj ={};

        for (const key in this.serializers) {
            if (Object.hasOwnProperty.call(this.serializers, key)) {
                const serializer = this.serializers[key];
                obj[serializer.getKeyName()] = serializer.getDefault();
            }
        }
        return obj;
    },

    /*
    setAllToDefault(){
        for (const key in this.serializers) {
            if (Object.hasOwnProperty.call(this.serializers, key)) {
                const serializer = this.serializers[key];
                serializer.setToDefault();
            }
        }
        Alerter.sendMessage("Wczytano domyślne ustawienia.",AlertStyleEnum.InputSucces);
    },
    */

   
}



export default SerializerManager;









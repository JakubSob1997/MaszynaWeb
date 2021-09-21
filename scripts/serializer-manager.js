
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
   
    readDataFromJson:function(_fileObject,_serializerList){
        let reader = new FileReader();
        reader.onload=(e)=>{
            const content = e.target.result;
            const jsonObj = JSON.parse(content);

            for (const key in jsonObj) {
                if (Object.hasOwnProperty.call(jsonObj, key)) {
                    const value = jsonObj[key];
                    
                    if(_serializerList.hasOwnProperty(key)){
                        const serializer = _serializerList[key];
                        serializer.setObjectData(value);
                    }

                }
            }

            Alerter.sendMessage(`Wczytanie pliku "${_fileObject.name}" przebiegło pomyślnie.`,AlertStyleEnum.InputSucces);


        };
        reader.onerror=(e)=>{
            Alerter.sendMessage(`Wczytanie pliku "${_fileObject.name}" się nie powiodło.`,AlertStyleEnum.InputError);

        }
        reader.readAsText(_fileObject);
    },


    setAllToDefault(){
        for (const key in this.serializers) {
            if (Object.hasOwnProperty.call(this.serializers, key)) {
                const serializer = this.serializers[key];
                serializer.setToDefault();
            }
        }
        Alerter.sendMessage("Wczytano domyślne ustawienia.",AlertStyleEnum.InputSucces);
    }

}




export default SerializerManager;









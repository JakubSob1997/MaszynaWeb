

const SerializerManager={
    serializers:{},

    addSerializer(_serializer){
        this.serializers[_serializer.getKeyName()]=_serializer;
    },

    exportLocalFile (content, fileName, contentType) {
        const a = document.createElement("a");
        const file = new Blob([content], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    },

    exportSerializers(_serializerList,_filename){
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

        const jsonString = JSON.stringify(exportOpbjject,null,2);
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
   

    readDataFromJson(_fileObject,_serializerList){
        const promise = new Promise((resolve,reject)=>{
            let reader = new FileReader();
        reader.onload=(e)=>{
            const content = e.target.result;
            let jsonObj
            try {
                jsonObj = JSON.parse(content);
                
            } catch (error) {
                reject(error)
            }
            
            jsonObj.fileName=_fileObject.name;
            resolve(jsonObj);
            
        };
        reader.onerror=(error)=>{
            reject(error);
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

            Alerter.sendMessage(`Wczytanie pliku "${_fileObject.name}" przebieg??o pomy??lnie.`,AlertStyleEnum.InputSucces);


        };
        reader.onerror=(e)=>{
            Alerter.sendMessage(`Wczytanie pliku "${_fileObject.name}" si?? nie powiod??o.`,AlertStyleEnum.InputError);

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
        Alerter.sendMessage("Wczytano domy??lne ustawienia.",AlertStyleEnum.InputSucces);
    },
    */

   
}



export default SerializerManager;












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
    }
   





}




export default SerializerManager;









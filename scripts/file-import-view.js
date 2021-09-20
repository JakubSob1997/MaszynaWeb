

import SerializerManager from "./serializer-manager.js";



export default class FileImportView{

    constructor(){
        this.wrapper;
        this.build();
    }

    build(){
        this.wrapper=document.createElement("div");

        this.header=document.createElement("h4");
        this.fileInput=document.createElement("input");
        this.fileInput.type="file"
        this.fileInput.accept="application/json";
        this.header.innerHTML="Import";

        this.wrapper.appendChild(this.header);
        this.wrapper.appendChild(this.fileInput);


        this.fileInput.addEventListener("input",()=>{
            if(this.fileInput.files.length>0){
                SerializerManager.readDataFromJson(this.fileInput.files[0],SerializerManager.serializers);
            }
        })

    }

    getHTMLElement(){
        return this.wrapper;
    }


}





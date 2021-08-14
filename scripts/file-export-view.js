

import SerializerManager from "./serializer-manager.js";



export default class FileExportView{

    constructor(){
        this.wrapper;
        this.build();
    }

    build(){
        this.wrapper=document.createElement("div");

        this.testButton = document.createElement("button");
        this.testButton.classList.add("custom-btn");
        this.testButton.innerHTML = "save";
        this.testButton.onclick=(e)=>{
            SerializerManager.exportSerializers(SerializerManager.serializers);
        }


        this.wrapper.appendChild(this.testButton);

    }

    getHTMLElement(){
        return this.wrapper;
    }


}















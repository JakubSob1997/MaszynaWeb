

import SerializerManager from "./serializer-manager.js";



export default class FileExportView{

    constructor(){
        this.wrapper;
        this.header;
        this.build();
    }

    build(){
        this.wrapper=document.createElement("div");
        this.header=document.createElement("h4");

        this.testButton = document.createElement("button");


        this.testButton.classList.add("custom-btn");


        this.testButton.innerHTML = "save";
        this.header.innerHTML="Export";

        this.wrapper.appendChild(this.header);
        this.wrapper.appendChild(this.testButton);

        this.testButton.onclick=(e)=>{
            SerializerManager.exportSerializers(SerializerManager.serializers);
        }



    }

    getHTMLElement(){
        return this.wrapper;
    }


}















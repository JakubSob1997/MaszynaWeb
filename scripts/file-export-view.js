

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
        this.content = document.createElement("div");

        this.saveButton = document.createElement("button");
        this.nameInput = document.createElement("input");
        this.jsonSpan= document.createElement("span");

        this.saveButton.classList.add("custom-btn");
        this.nameInput.classList.add("file-name-input");
        this.jsonSpan.classList.add("file-json-span");

        this.saveButton.innerHTML = "Zapisz";
        this.header.innerHTML="Zapisz na Dysk";
        this.jsonSpan.innerHTML=".json";

        this.content.appendChild(this.nameInput);
        this.content.appendChild(this.jsonSpan);
        this.content.appendChild(this.saveButton);

        this.wrapper.appendChild(this.header);
        this.wrapper.appendChild(this.content);

        this.saveButton.onclick=(e)=>{
            let name = this.nameInput.value==""?null:this.nameInput.value+".json";
            SerializerManager.exportSerializers(SerializerManager.serializers,name);
        }



    }

    getHTMLElement(){
        return this.wrapper;
    }


}















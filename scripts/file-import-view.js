

import FileViewBase from "./file-view-base.js";
import SerializerManager from "./serializer-manager.js";



export default class FileImportView extends FileViewBase{

    constructor(_fileInspector){
        super(_fileInspector,"Wczytaj z Dysku");

        this.wrapper;
        this.build();
    }

    build(){

        this.fileInput=document.createElement("input");
        this.fileInput.type="file"
        this.fileInput.accept="application/json";

        this.inputLabel = document.createElement("label");
        const id = "file-import-input";
        this.fileInput.id=id;
        this.inputLabel.setAttribute("for",id);
        this.inputLabel.tabIndex=0;

        this.inputLabel.addEventListener("keypress",e=>{
            if(e.keyCode==13||e.keyCode==32){
                this.inputLabel.click()
            }
        })

        this.content.appendChild(this.inputLabel);
        this.content.appendChild(this.fileInput);

        this.fileInput.classList.add("display-none");
        this.inputLabel.innerHTML="Wczytaj z Dysku";
        this.inputLabel.classList.add("file-entry");

        this.fileInput.addEventListener("input",()=>{
            if(this.fileInput.files.length>0){
                SerializerManager.readDataFromJson(this.fileInput.files[0],SerializerManager.serializers)
                    .then((_data)=>{this.pickObject(_data)})
            }
        })

    }




}





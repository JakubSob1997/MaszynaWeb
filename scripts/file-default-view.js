
import ConfirmButtonView from "./confirm-buttton-view.js";
import FileViewBase from "./file-view-base.js";
import SerializerManager from "./serializer-manager.js";

export default class FileDefaultView extends FileViewBase{

    constructor(_fileInspector){

        super(_fileInspector,"Wczytaj Domyśle")
        this.wrapper;
        this.build();
    }

    build(){


        this.defaultButton = document.createElement("button");
        this.defaultButton .addEventListener("click",()=>{
            let obj  =SerializerManager.getDefaultObject();
            obj.fileName="Domyślne Ustawienia";
            this.pickObject(obj);
        })

        this.defaultButton.innerHTML="Wczytaj Domyślne"
        this.defaultButton.classList.add("file-entry");

        this.content.appendChild(this.defaultButton);

       


    }



}
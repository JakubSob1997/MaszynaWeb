
import ConfirmButtonView from "./confirm-buttton-view.js";
import FileViewBase from "./file-view-base.js";
import SerializerManager from "./serializer-manager.js";
import Translator from "./translator.js";

export default class FileDefaultView extends FileViewBase{

    constructor(_fileInspector){

        super(_fileInspector,Translator.getTranslation("_load_default","Load Default"));
        this.wrapper;
        this.build();
    }

    build(){


        this.defaultButton = document.createElement("button");
        this.defaultButton .addEventListener("click",()=>{
            let obj  =SerializerManager.getDefaultObject();
            obj.fileName=Translator.getTranslation("_default_settings","Default Settings");
            this.pickObject(obj);
        })

        this.defaultButton.innerText=Translator.getTranslation("_load_default","Load Default");
        this.defaultButton.classList.add("file-entry");

        this.content.appendChild(this.defaultButton);

       


    }



}
import ConfirmButtonView from "./confirm-buttton-view.js";
import SerializerManager from "./serializer-manager.js";
import { PreviewFileName, PreviewInstructionList, PreviewProgram, PreviewExtensions,} from "./preview-base.js";
import Alerter from "./alerter.js";
import { AlertStyleEnum } from "./enums.js";
import Translator from "./translator.js";




export default class FilePreviewView{
    constructor(){
        this.build();
        
    }

    build(){
        

        this.wrapper = document.createElement("div");
        this.wrapper.classList.add("display-none");
        this.wrapper.classList.add("file-preview");

        this.header = document.createElement("h2");
        this.content = document.createElement("div");
        
        this.content.classList.add("file-preview-content");

        this.header.innerText= Translator.getTranslation("_preview","Preview");
        this.header.classList.add("file-view-header");
        this.header.classList.add("file-preview-header");
        this.loadButton = new ConfirmButtonView();
        this.loadButton.getHTMLElement().innerText=Translator.getTranslation("_load_file","Load");

        this.loadButton.addOnClickHandler(()=>{
            this.load();
        })


        this.previewFileName = new PreviewFileName();
        this.previewInstructionList = new PreviewInstructionList();
        this.previewProgram = new PreviewProgram();
        this.previewExtensions = new PreviewExtensions();

        this.previews = [
            this.previewFileName, 
            this.previewInstructionList, 
            this.previewProgram,
            this.previewExtensions,
        ]


        this.previews.forEach(prev => {
            this.content.appendChild(prev.getHTMLElemet());
        });


        this.wrapper.appendChild(this.header);
        this.wrapper.appendChild(this.content);
        this.wrapper.appendChild(this.loadButton.getHTMLElement());


    }

    load(){
        SerializerManager.loadFromObject(this.object,SerializerManager.serializers);
        Alerter.sendMessage(Translator.getTranslation("_message_file_loaded","Machine was loaded."),AlertStyleEnum.InputSucces);
        this.wrapper.classList.add("display-none");
    }

    preview(_obj){


        this.wrapper.classList.remove("display-none");
        this.object = _obj;
        this.loadButton.getHTMLElement().focus();


        this.previews.forEach(prev => {
            prev.fillPreview(_obj);
        });

        console.log(_obj);


    }

    getHTMLElement(){
        return this.wrapper;
    }


}
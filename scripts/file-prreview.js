import ConfirmButtonView from "./confirm-buttton-view.js";
import SerializerManager from "./serializer-manager.js";
import { PreviewFileName, PreviewInstructionList, PreviewProgram, PreviewExtensions,} from "./preview-base.js";
import Alerter from "./alerter.js";
import { AlertStyleEnum } from "./enums.js";




export default class FilePreviewView{
    constructor(){
        this.build();
        
    }

    build(){
        

        this.wrapper = document.createElement("div");
        this.wrapper.classList.add("display-none");
        this.header = document.createElement("h4");
        this.content = document.createElement("div");
        
        this.header.innerHTML= "Podgląd";
        this.header.classList.add("file-view-header");
        this.loadButton = new ConfirmButtonView();
        this.loadButton.getHTMLElement().innerHTML="Wczytaj";

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
        Alerter.sendMessage("Maszyna została wczytana.",AlertStyleEnum.InputSucces);
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

import ConfirmButtonView from "./confirm-buttton-view.js";
import SerializerManager from "./serializer-manager.js";

export default class FileDefaultView{

    constructor(){
        this.wrapper;
        this.build();
    }

    build(){
        this.wrapper=document.createElement("div");

        this.header=document.createElement("h4");
        this.header.innerHTML="Wczytaj domyślne ustawienia";


        this.defaultButton = new ConfirmButtonView();
        const buttonElement = this.defaultButton.getHTMLElement();;
        this.defaultButton.addOnClickHandler(()=>{
            SerializerManager.setAllToDefault();
        })

        buttonElement.innerHTML="Wczytaj Domyślne"


        this.wrapper.appendChild(this.header);
        this.wrapper.appendChild(buttonElement);


       


    }

    getHTMLElement(){
        return this.wrapper;
    }


}
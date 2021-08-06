



import Alerter from "./alerter.js";


export default class AlertWindow{
    
    constructor(_windowElement){
        
        this.wrapper = _windowElement;



    }

    createMessage(_message,_style){
        const entry = new AlertEntry(this,_message,_style);

        this.wrapper.appendChild(entry.getHTMLElement())


    }
    clearMesseges(){

    }



    discardEntry(_alertEntry){
        const element = _alertEntry.getHTMLElement();

        const nextFocus = element.nextElementSibling??element.previousElementSibling ??null;

        if(nextFocus!=null){
            nextFocus.lastChild.focus();
        }
        this.wrapper.removeChild(element)

    }

   

}


class AlertEntry{
    constructor(_window,_messageString,_alertStyle){

        this.wrapper= document.createElement("div");
        this.text = document.createElement("div");
        this.exitButton = document.createElement("button");

        this.text.innerHTML=_messageString;
        this.exitButton.innerHTML="X";

        this.wrapper.classList.add("alert-entry");
        this.text.classList.add("alert-text");
        this.exitButton.classList.add("alert-close-button");
        if(_alertStyle!=null){
            this.text.classList.add(_alertStyle);
        }


        this.wrapper.appendChild(this.text);
        this.wrapper.appendChild(this.exitButton);

        this.exitButton.addEventListener("click",()=>{
            _window.discardEntry(this);
        })



    }


    focus(){
        this.exitButton.focus();
    }

    getHTMLElement(){
        return this.wrapper;
    }
}




















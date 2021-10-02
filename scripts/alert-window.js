



import Alerter,{IAlertReciever} from "./alerter.js";
import { AlertStyleEnum } from "./enums.js";
import LayoutMediator from "./layout-mediator.js";


/*
    This is the window responsible for
    making all of those anoyig pop-ups
    that tell you usefull stuff
*/


export default class AlertWindow extends IAlertReciever{
    
    constructor(_windowElement){
        
        super();
        this.wrapper = _windowElement;

        Alerter.addAlertReciever(this);

    }

    alert(_message){
        this.createMessage(_message,AlertStyleEnum.Warning);
    }

    sendMessage(_message,_style){
        this.createMessage(_message,_style);
    }
    



    createMessage(_message,_style){
        const entry = new AlertEntry(this,_message,_style);
        this.wrapper.appendChild(entry.getHTMLElement())
       

    }
    clearMessages(){
        this.wrapper.innerHTML=""
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


/*
    This is the code behind a single anoying pop-up
*/


class AlertEntry{
    constructor(_window,_messageString,_alertStyle){

        this.wrapper= document.createElement("div");
        this.text = document.createElement("div");
        this.exitButton = document.createElement("button");

        this.text.innerText=_messageString;
        this.exitButton.innerText="X";
        
        
        this.text.setAttribute("role","alert");

        this.wrapper.classList.add("alert-entry");
        this.text.classList.add("alert-text");
        this.exitButton.classList.add("alert-close-button");


        if(_alertStyle!=undefined){
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























import CustomElement from "./custom-element.js";


export default class ConfirmButton extends CustomElement{

    constructor(){
        super();

        this.element = document.createElement("button");

        this.isReady=false;
        this.element.classList.add("confirm-btn");


        this.element.addEventListener("click",(e)=>{this.onClick(e)})
        this.element.addEventListener("mouseleave",(e)=>{this.onMouseLeave(e)})
        this.element.addEventListener("blur",(e)=>{this.onMouseLeave(e)})

        this.onclickHandlers = [];

    }

    onClick(_e){
       
        if(this.isReady){
            this.onclickHandlers.forEach(funk => {
                funk(_e);
            });
        }


        this.setReady(!this.isReady);
    }
    onMouseLeave(_e){
        if(this.isReady){
            this.setReady(false);
        }
        /*
        this.element.blur();
        */
    }


    setReady(_isReady){
        this.isReady=_isReady;

        if(this.isReady){
            this.element.classList.add("confirm-btn-ready");
        }else{
            this.element.classList.remove("confirm-btn-ready");
        }

    }



    getHTMLElement(){
        return  this.element;
    }


    addOnClickHandler(_funk){
        this.onclickHandlers.push(_funk);
    }


}








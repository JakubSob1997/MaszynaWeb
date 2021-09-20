

export default class ConfirmButtonView /*extends CustomElement*/{

    constructor(){

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
            this.setReady(false);
            this.onclickHandlers.forEach(funk => {
                funk(_e);
            });
        }else{
            this.setReady(true);
        }


        
    }
    onMouseLeave(_e){
        if(this.isReady){
            this.setReady(false);
        }
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








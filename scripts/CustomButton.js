



class CustomButton extends CustomElement{
    constructor(){
        super();

        this.element = document.createElement("div");
        this.element.classList.add("custom-btn");

    }


    getHTMLElement(){
        return this.element;
    }



}



















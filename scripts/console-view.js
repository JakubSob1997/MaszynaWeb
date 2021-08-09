



export default class ConsoleView{

    constructor(_consoleDevice){
        this.wrapper;
        this.asciiInputEle;
        this.numericInputEle;
        this.outputEle;
        this.clrConsoleButton;

        this.build();
    }

    build(_consoleDevice){
        this.wrapper = document.createElement("div");
        this.asciiInputEle = document.createElement("input");
        this.numericInputEle=document.createElement("input");
        this.outputEle=document.createElement("div");
        this.clrConsoleButton=document.createElement("button");


        this.numericInputEle.setAttribute("type","number");
        this.numericInputEle.setAttribute("step","1");


        this.clrConsoleButton.innerHTML="Wyczyść";

        this.wrapper.classList.add("generic-inspector");
        this.clrConsoleButton.classList.add("custom-btn");


        


        this.wrapper.appendChild(this.asciiInputEle);
        this.wrapper.appendChild(this.numericInputEle);
        this.wrapper.appendChild(this.outputEle);
        this.wrapper.appendChild(this.clrConsoleButton);


        
    }



    getHTMLElement(){
        return this.wrapper;
    }

}



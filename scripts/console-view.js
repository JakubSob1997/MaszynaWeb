



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
        this.outputWrapper=document.createElement("div");
        this.outputEle=document.createElement("textarea");
        this.clrConsoleButton=document.createElement("button");


        this.numericInputEle.setAttribute("type","number");
        this.numericInputEle.setAttribute("step","1");


        this.clrConsoleButton.innerHTML="Wyczyść";

        this.wrapper.classList.add("generic-inspector");
        this.clrConsoleButton.classList.add("custom-btn");
        this.outputWrapper.classList.add("console-output-wrapper");
        this.outputEle.classList.add("console-output");
        this.numericInputEle.setAttribute("value","0");
        this.outputEle.setAttribute("readonly","true");


        this.outputEle.value="Lorem Ipsum is simp\nly dummy text of the printing and\n typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, re\nmaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."


        this.outputWrapper.appendChild(this.outputEle);

        this.wrapper.appendChild(this.asciiInputEle);
        this.wrapper.appendChild(this.numericInputEle);
        this.wrapper.appendChild(this.outputWrapper);
        this.wrapper.appendChild(this.clrConsoleButton);

        

    }

    addCalbacks(){

    }



    getHTMLElement(){
        return this.wrapper;
    }

}



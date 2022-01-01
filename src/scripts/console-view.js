import Translator from "./translator.js";




export default class ConsoleView{

    constructor(_consoleDevice){
        this.wrapper;
        this.heading;
        this.inputWrapper;
        this.asciiInputEle;
        this.numericInputEle;
        this.widthWrapper;
        this.outputEle;
        this.clrConsoleButton;


        this.inputLabel;
        this.outputLabel;
        this.build();
        this.addCallbacks(_consoleDevice)
    }

    build(_consoleDevice){
        
        this.wrapper = document.createElement("div");
        this.heading =document.createElement("h3");
        this.inputWrapper=document.createElement("div");
        this.characterInputEle = document.createElement("input");
        this.numericInputEle=document.createElement("input");
        this.widthWrapper=document.createElement("div");
        this.outputEle=document.createElement("textarea");
        this.clrConsoleButton=document.createElement("button");
        this.inputLabel=document.createElement("p");
        this.outputLabel=document.createElement("p");



        this.numericInputEle.setAttribute("type","number");
        this.numericInputEle.setAttribute("step","1");

        this.heading.innerText=Translator.getTranslation("_console","Console");
        this.clrConsoleButton.innerText=Translator.getTranslation("_clear","Clear");
        this.inputLabel.innerText=Translator.getTranslation("_input","Input");
        this.outputLabel.innerText=Translator.getTranslation("_output","Output");

        this.wrapper.classList.add("generic-inspector");
        this.clrConsoleButton.classList.add("custom-btn");
        this.widthWrapper.classList.add("console-width-wrapper");
        this.outputEle.classList.add("console-output");

        this.inputWrapper.classList.add("console-input-wrapper");
        this.characterInputEle.classList.add("console-character-input");
        this.numericInputEle.classList.add("console-numeric-input");



        this.numericInputEle.setAttribute("value","0");
        this.outputEle.setAttribute("readonly","true");


        this.inputWrapper.appendChild(this.characterInputEle);
        this.inputWrapper.appendChild(this.numericInputEle);

        this.widthWrapper.appendChild(this.inputLabel);
        this.widthWrapper.appendChild(this.inputWrapper);
        this.widthWrapper.appendChild(this.outputLabel)
        this.widthWrapper.appendChild(this.outputEle);
        

        this.wrapper.appendChild(this.heading);
        this.wrapper.appendChild(this.widthWrapper);
        this.wrapper.appendChild(this.clrConsoleButton);

        

    }

    addCallbacks(_device){
        _device.onUpdateOutput = (d)=>{
            this.onUpdateOutput(d);
        }

        _device.onUpdateCharacterInput = (d)=>{
            this.onUpdateCharacterInput(d);
        }

        this.clrConsoleButton.addEventListener("click",()=>{
            _device.clearConsole();
        })

        this.characterInputEle.addEventListener("input",(e)=>{
            _device.setCharacterInput(e.target.value);
        })

        this.numericInputEle.addEventListener("input",(e)=>{
            _device.setNumericInput(parseInt(e.target.value));
        })
    }



    onUpdateOutput(_device){
        if(!!this.updateOutputFlag ===false){
            requestAnimationFrame(()=>{
                this.outputEle.value=_device.consoleOutputString;
                this.updateOutputFlag =false;
            })
            this.updateOutputFlag =true;
        }
       
    }

    onUpdateCharacterInput(_device){
        if(!!this.updateCharacterInputFlag ===false){
            requestAnimationFrame(()=>{
                this.characterInputEle.value=_device.characterInputString;
                this.updateCharacterInputFlag =false;
            })
            this.updateCharacterInputFlag =true;
        }
        
    }



    getHTMLElement(){
        return this.wrapper;
    }

}







export default class ConsoleView{

    constructor(_consoleDevice){
        this.wrapper;
        this.asciiInputEle;
        this.numericInputEle;
        this.outputEle;
        this.clrConsoleButton;

        this.build();
        this.addCallbacks(_consoleDevice)
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
        this.asciiInputEle.classList.add("console-ascii-input");
        this.numericInputEle.classList.add("console-numeric-input");



        this.numericInputEle.setAttribute("value","0");
        this.outputEle.setAttribute("readonly","true");


        

        this.outputWrapper.appendChild(this.outputEle);

        this.wrapper.appendChild(this.asciiInputEle);
        this.wrapper.appendChild(this.numericInputEle);
        this.wrapper.appendChild(this.outputWrapper);
        this.wrapper.appendChild(this.clrConsoleButton);

        

    }

    addCallbacks(_device){
        _device.onUpdateOutput = (d)=>{
            this.onUpdateOutput(d);
        }

        _device.onUpdateASCII = (d)=>{
            this.onUpdateASCIIInput(d);
        }

        this.clrConsoleButton.addEventListener("click",()=>{
            _device.clearConsole();
        })

        this.asciiInputEle.addEventListener("input",(e)=>{
            _device.setASCIIInput(e.target.value);
        })

        this.numericInputEle.addEventListener("input",(e)=>{
            _device.setNumericInput(parseInt(e.target.value));
        })
    }



    onUpdateOutput(_device){
        this.outputEle.value=_device.consoleOutputString;
    }

    onUpdateASCIIInput(_device){
        this.asciiInputEle.value=_device.asciiInputString;
    }



    getHTMLElement(){
        return this.wrapper;
    }

}







class FlowControlView{
    constructor(_Machine){
        this.wrapper = document.createElement("div");
        this.manualButton = document.createElement("button");
        this.cycleButton = document.createElement("button");
        this.instructionButton = document.createElement("button");
        this.runButton = document.createElement("button");
    }


    build(){
        this.wrapper.appendChild(this.manualButton);
        this.wrapper.appendChild(this.cycleButton);
        this.wrapper.appendChild(this.instructionButton);
        this.wrapper.appendChild(this.runButton);
    }

    addCallbacks(){
        this.manualButton.onclick = ()=>{this.onManualButton();};
        this.cycleButton.onclick = ()=>{this.onCycleButton();};
        this.instructionButton.onclick = ()=>{this.onCycleButton();};
        this.runButton.onclick=()=>{this.onRunButton();};
    }


    onManualButton(){

    }

    onCycleButton(){

    }

    onInstructionButton(){

    }

    onRunButton(){

    }

    getHTMLElement(){
        return this.wrapper;
    }
}


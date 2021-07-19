



class InstructionEditor{

    constructor(){

        this.wrapper= document.createElement("div");
        this.instrName = document.createElement("div");
        this.textField = document.createElement("textarea");
        this.button = document.createElement("button");
        this.buildEditor();

        document.getElementById("instr-editor-test").appendChild(this.getHTMLElement());

    }

    buildEditor(){

        this.wrapper.appendChild(this.instrName);
        this.wrapper.appendChild(this.textField);
        this.wrapper.appendChild(this.button);
        this.instrName.innerHTML="inst"
        this.button.innerHTML="save"
    }

    populateEditor(_instruction){

        this.instrName.innerHTML = _instruction.name;
        this.textField.value=_instruction.source;

        this.addCallbacks(_instruction);

    }

    addCallbacks(_instruction){
        this.button.onclick = ()=>{
            const parser = new InstrcutionParser(this.textField.value);
            console.log(parser);
        }
    }

    getHTMLElement(){
        return this.wrapper;
    }

}







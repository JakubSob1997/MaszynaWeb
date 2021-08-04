



class InstructionEditor extends SidebarContent{

    constructor(){


        super();
        this.wrapper= document.createElement("div");
        this.instrName = document.createElement("h3");
        this.textField = document.createElement("textarea");
        this.button = document.createElement("button");
        this.buildEditor();

        

    }

    focus(){
        this.instrName .focus();
    }

    buildEditor(){

        this.instrName.setAttribute("tabindex",-1);

        this.wrapper.appendChild(this.instrName);
        this.wrapper.appendChild(this.textField);
        this.wrapper.appendChild(this.button);
        this.instrName.innerHTML="inst"     
        this.button.innerHTML="Zapisz"


        this.wrapper.classList.add("instr-editor")
        this.button.classList.add("custom-btn");                    
        
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

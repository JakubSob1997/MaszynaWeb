


import SidebarContent from "./sidebar-content.js";
import ConfirmButton from "./confirm-buttton.js";

export default class InstructionEditor extends SidebarContent{

    constructor(_instructionList){


        super();
        this.wrapper;
        this.header;
        this.textField;
        this.saveButon ;
        this.deleteButon;


        this.buildEditor(_instructionList);

        this.instrName;

        

    }

    focus(){
        this.header .focus();
    }

    buildEditor(_instructionList){

        this.wrapper= document.createElement("div");
        this.header = document.createElement("h3");
        this.textField = document.createElement("textarea");
        this.saveButon = document.createElement("button");
        this.deleteButon= new ConfirmButton();

        this.header.setAttribute("tabindex",-1);

        this.wrapper.appendChild(this.header);
        this.wrapper.appendChild(this.textField);
        this.wrapper.appendChild(this.saveButon);
        this.wrapper.appendChild(this.deleteButon.getHTMLElement());
        this.header.innerHTML="inst"     
        this.saveButon.innerHTML="Zapisz"
        this.deleteButon.getHTMLElement().innerHTML="Usuń";


        this.wrapper.classList.add("instr-editor")
        this.saveButon.classList.add("custom-btn");        
        
        
        console.log(_instructionList);

        if( _instructionList!=null ){

            this.deleteButon.addOnClickHandler((e)=>{
                _instructionList.removeInstruction(this.instrName);
            })


            _instructionList.addOnInstructionDeletedCallback((_name,_index)=>{
                this.onInstrDeleted(_name,_index);
            })
        }

        
    }

    populateEditor(_instruction){

        this.instrName=_instruction.name;
        this.header.innerHTML = "Rozkaz: "+_instruction.name;
        this.textField.value=_instruction.source;

        this.addCallbacks(_instruction);

    }

    onInstrDeleted(_name,_index){
        if(_name===this.instrName){
            this.textField.value="DELETED";
        }
    }

    addCallbacks(_instruction){
        

        this.saveButon.onclick = ()=>{
            const parser = new InstrcutionParser(this.textField.value);
            console.log(parser);
        }
    }

    getHTMLElement(){
        return this.wrapper;
    }

}

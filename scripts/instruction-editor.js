


import SidebarContent from "./sidebar-content.js";
import ConfirmButton from "./confirm-buttton.js";
import InstrcutionParser from "./instruction-parser.js";
import Alerter from "./alerter.js";
import { AlertStyleEnum } from "./enums.js";

export default class InstructionEditor extends SidebarContent{

    constructor(_Machine,_parentContainer){

        super();


        this.hackParentContainer = _parentContainer;

        this.wrapper;
        this.header;
        this.textField;
        this.saveButon ;
        this.deleteButon;


        this.buildEditor();
        this.addCallbacks(_Machine);
        this.instrName;

        

    }

    focus(){
        this.header.focus();
    }

    buildEditor(){

        this.wrapper= document.createElement("div");
        this.header = document.createElement("h3");
        this.textField = document.createElement("textarea");
        this.saveButon = document.createElement("button");
        this.deleteButon= new ConfirmButton();

        this.header.setAttribute("tabindex",-1);
        this.textField.setAttribute("spellcheck","false");

        this.wrapper.appendChild(this.header);
        this.wrapper.appendChild(this.textField);
        this.wrapper.appendChild(this.saveButon);
        this.wrapper.appendChild(this.deleteButon.getHTMLElement());
        this.header.innerHTML="inst"     
        this.saveButon.innerHTML="Zapisz"
        this.deleteButon.getHTMLElement().innerHTML="Usuń";


        this.wrapper.classList.add("generic-inspector")
        this.saveButon.classList.add("custom-btn");        
        

        

        
    }

    populateEditor(_instruction){

        this.instrName=_instruction.name;
        this.header.innerHTML = "Rozkaz: "+_instruction.name;
        this.textField.value=_instruction.source;

        

    }

    onInstrDeleted(_name,_index){
        if(_name===this.instrName){
            this.hackParentContainer.hideContent(this);
        }
    }

    onInstrChanged(_old,_new,_index,_list){
        if(_old===this.instrName){
            this.populateEditor(_list.getInstruction(_index));
        }
    }

    addCallbacks(_Machine){
        

        if( _Machine!=null ){

            this.deleteButon.addOnClickHandler((e)=>{
                _Machine.instructionList.removeInstruction(this.instrName);
            })




            _Machine.instructionList.addOnInstructionDeletedCallback((_name,_index)=>{
                this.onInstrDeleted(_name,_index);
            })

            _Machine.instructionList.addOnInstuctionChangedCallback(
                (_old,_new,_index)=>{
                    this.onInstrChanged(_old,_new,_index,_Machine.instructionList);
                }
            )


            this.saveButon.onclick = ()=>{
                const parser = new InstrcutionParser(this.textField.value);
                parser.validate(_Machine);



                if(parser.parseSuccesful==true){

                    const instr = parser.toInstruction();
                    console.log(instr);
                    if(_Machine.instructionList.updateInstruction(this.instrName,instr)){
                        Alerter.sendMessage("Rozkaz "+instr.name+" został poprawnie zapisany!",AlertStyleEnum.Succes);
                    }else{
                        Alerter.sendMessage("Już istnieje rozkaz "+instr.name+" w liście instrukcji!",AlertStyleEnum.SyntaxError);
                    }
                    
                }else{
                    parser.errorList.forEach(error => {
                        Alerter.sendMessage(error,AlertStyleEnum.SyntaxError);
                    });
                }

                

                //console.log(parser);
            }
        }


       
    }

    getHTMLElement(){
        return this.wrapper;
    }

}


import SidebarContent from "./sidebar-content.js"
import ConfirmButton from "./confirm-buttton.js";
import InstructionList from "./instruction-list.js";
import Alerter from "./alerter.js";

class InstructionRecord{

    constructor(_instruction,_inspector,_index){
        this.record = document.createElement("li");
        this.name = document.createElement("button");
        this.removeButton  = new ConfirmButton()
        this.upButton= document.createElement("button");
        this.downButton=document.createElement("button")

        this.buildRecord();
        this.attachCallbacks(_inspector,_index);
        this.populateRecord(_instruction);

    }

    buildRecord(){
        this.record.classList.add("instr-entry");

        this.record.appendChild(this.name);
        this.record.appendChild( this.removeButton.getHTMLElement());
        this.record.appendChild(this.upButton);
        this.record.appendChild(this.downButton);

        
        this.name.classList.add("instr-name");
        this.upButton.classList.add("custom-btn");
        this.downButton.classList.add("custom-btn");
    }

    populateRecord(_instruction){
        this.name.innerHTML = _instruction.name;
        this.removeButton.getHTMLElement().innerHTML="Usuń";
        this.upButton.innerHTML = "▲";
        this.downButton.innerHTML = "▼";


    }

    attachCallbacks(_inspector,_index){
        this.upButton.onclick = ()=>{_inspector.onUpButton(_index)};
        this.downButton.onclick = ()=>{_inspector.onDownButton(_index)};
        this.name.onclick=()=>(_inspector.onRecordClicked(_index));
        this.removeButton.addOnClickHandler(()=>{_inspector.onDeleteButton(_index)})
    }

    getHTMLElement(){
        return this.record;
    }


}



export default class InstructionInspector extends SidebarContent{
    constructor(_instrList){
        super();
        this.wrpper;
        this.heading;
        this.instructionList =_instrList;
        this.recordList= []
        this.onInstructionSelectedCallbacks=[];


        

        this.build(_instrList);

        this.addCallbacks();
        


    }

    focus(){
        this.heading.focus();
    }


    addInstructionSelectedCallback(_funk){
        this.onInstructionSelectedCallbacks.push(_funk);

    }
    selectInstruction(_instruction){
        for (let index = 0; index < this.onInstructionSelectedCallbacks.length; index++) {
            const callback = this.onInstructionSelectedCallbacks[index];
            callback(_instruction);
        }
    }



    build(_instructionList){
        this.wrpper=document.createElement("div");
        this.heading = document.createElement("h3");
        this.instructionListElement = document.createElement("ul");
        this.addInstructionButton = document.createElement("button");

        this.createInstructionElments(_instructionList,this.instructionListElement);


        this.wrpper.classList.add("instr-inspector");

        this.instructionListElement.classList.add("instr-list");


        this.addInstructionButton.innerHTML="Nowy Rozkaz";
        this.addInstructionButton.classList.add("custom-btn");

        this.heading.setAttribute("tabindex",-1)
        this.heading.innerHTML = "Lista Rozkazów"

        this.wrpper.appendChild(this.heading);
        this.wrpper.appendChild(this.addInstructionButton);
        this.wrpper.appendChild(this.instructionListElement);


        this.instructionList.addOnInstructionDeletedCallback((_instrname,_index)=>{
            this.onDeleteUpdate(_instrname,_index);
        })

        this.instructionList.addOnInstuctionChangedCallback(
            (_oldName,_newName,_index)=>{
                this.onInstructionUpdate(_oldName,_newName,_index)
            });
        
    }

    addCallbacks(){
        this.addInstructionButton.addEventListener("click",()=>{
            this.onAddButton();
        })
    }

    onUpButton(_index){
        if(_index==0)return;

        this.instructionList.swap(_index,_index-1);

        this.recordList[_index].populateRecord( this.instructionList.getInstruction(_index))
        this.recordList[_index-1].populateRecord(this.instructionList.getInstruction(_index-1))

        this.recordList[_index-1].upButton.focus();

        
    }

    onDownButton(_index){
        if(_index == this.instructionList.length()-1)return;


        this.instructionList.swap(_index,_index+1);

        this.recordList[_index].populateRecord( this.instructionList.getInstruction(_index))
        this.recordList[_index+1].populateRecord(this.instructionList.getInstruction(_index+1))

        this.recordList[_index+1].downButton.focus();

    }


    onRecordClicked(_index){
        this.selectInstruction(this.instructionList.getInstruction(_index));
    }


    onDeleteButton(_index){
        this.instructionList.removeInstruction(_index);
        

    }

    onDeleteUpdate(_instr,_index){
        this.recordList.splice(-1)
        this.instructionListElement.removeChild(this.instructionListElement.lastChild);

        for (let i = 0; i < this.recordList.length; i++) {
            const record = this.recordList[i];
            record.populateRecord(this.instructionList.getInstruction(i));
            
        }
    } 

    onInstructionUpdate(_oldName,_newName,_index){
        this.recordList[_index].populateRecord(this.instructionList.getInstruction(_index));
    }


    onAddButton(){
        const instr = this.instructionList.createEmptyInstruction();
        this.instructionList.addInstruction(instr);


        let record = new InstructionRecord(instr,this, this.instructionList.length()-1);
        this.recordList.push(record);
        this.instructionListElement.appendChild(record.getHTMLElement());

        
        this.selectInstruction(instr);

    }
    


    createInstructionElments(_instructionList,_parentDiv){
        
        for (let index = 0; index < _instructionList.length(); index++) {
            const instruction = _instructionList.getInstruction(index);

            let record = new InstructionRecord(instruction,this,index);
            this.recordList.push(record);
            _parentDiv.appendChild(record.getHTMLElement());
        }
    }


    getHTMLElement(){
        return this.wrpper;
    }

}

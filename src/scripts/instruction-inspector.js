
import SidebarContent from "./sidebar-content.js"
import ConfirmButtonView from "./confirm-buttton-view.js";
import InstructionList from "./instruction-list.js";
import Alerter from "./alerter.js";
import Translator from "./translator.js";

export class InstructionRecord{

    constructor(_instruction,_inspector,_index){
        this.record = document.createElement("li");
        this.name = document.createElement("button");
        this.removeButton  = new ConfirmButtonView()
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
        this.name.innerText = _instruction.name;
        this.removeButton.getHTMLElement().innerText=Translator.getTranslation("_delete","Delete");
        this.upButton.innerText = "▲";
        this.downButton.innerText = "▼";


    }

    attachCallbacks(_inspector,_index){
        this.upButton.onclick = ()=>{_inspector.onUpButton(_index)};
        this.downButton.onclick = ()=>{_inspector.onDownButton(_index)};
        this.name.onclick=()=>(_inspector.onRecordClicked(_index));
        this.removeButton.addOnClickHandler(()=>{_inspector.onDeleteButton(_index)})
   
        this.record.addEventListener("keydown",(ev)=>{_inspector.onNavigation(ev,this)})
   
   
    }

    getHTMLElement(){
        return this.record;
    }

    addMarker(){
        
        this.record.classList.add("instr-selected");
    }
    removeMarker(){
        this.record.classList.remove("instr-selected");
    }


}



export default class InstructionInspector extends SidebarContent{
    constructor(_instrList,_Machine){
        super();
        this.wrpper;
        this.heading;
        this.instructionList =_instrList;
        this.recordList= []
        this.onInstructionSelectedCallbacks=[];


        

        this.build(_instrList);

        this.addCallbacks(_Machine);
        


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
        this.heading = document.createElement("h1");
        this.instructionListElement = document.createElement("ul");
        this.addInstructionButton = document.createElement("button");

        this.createInstructionElments(_instructionList,this.instructionListElement);


        this.wrpper.classList.add("instr-inspector");
        this.wrpper.classList.add("generic-inspector");

        this.instructionListElement.classList.add("instr-list");


        this.addInstructionButton.innerText=Translator.getTranslation("_new_instruction","New Instruction");
        this.addInstructionButton.classList.add("custom-btn");

        this.heading.setAttribute("tabindex",-1)
        this.heading.innerText = Translator.getTranslation("_instruction_list","Instruction List")

        this.wrpper.appendChild(this.heading);
        this.wrpper.appendChild(this.addInstructionButton);
        this.wrpper.appendChild(this.instructionListElement);


        this.instructionList.addOnInstructionDeletedCallback((_instrname,_index)=>{
            this.onDeleteUpdate(_instrname,_index);
        })

        this.instructionList.addOnInstuctionChangedCallback(
            (_oldName,_newName,_index)=>{
                this.onInstructionUpdate(_oldName,_newName,_index)
            }
        );

        this.instructionList.addOnInstructionListChangedCallbacks(
            (_list)=>{
                this.onListUpdate(_list);
            }
        );
        
    }

    addCallbacks(_Machine){
        this.addInstructionButton.addEventListener("click",()=>{
            this.onAddButton();
        })


        this.prevMarker = undefined;
        _Machine.I_register.addOnUpdateCallback((_register)=>{
            const currentIndex = _Machine.settings.getOpcode(_register.getValue());
            
            this.onIRegisterUpdate(currentIndex);
        })


    }

    onIRegisterUpdate(_opCode){

        const prev  =  this.recordList[this.prevMarker];
        if(prev!==undefined)prev.removeMarker();

        if(_opCode<this.recordList.length){
            this.recordList[_opCode].addMarker()
            
        }else{
            _opCode=undefined;
        }

        this.prevMarker=_opCode;
    }

    onNavigation(ev,record){

        //Left
        if(ev.keyCode===37){
            if( ev.target.previousSibling){
                ev.preventDefault();
                ev.target.previousSibling.focus();
            }else{
                record.record.lastChild.focus();
            }
            return;
        }

        //Right
        if(ev.keyCode===39){
            if( ev.target.nextSibling){
                ev.preventDefault();
                ev.target.nextSibling.focus();
            }else{
                record.record.firstChild.focus();
            }
            return;
        }
        

        const index =[...ev.target.parentNode.children].indexOf(ev.target);
    
        //Up
        if(ev.keyCode===38){
            if( record.record.previousSibling){
                ev.preventDefault();
                record.record.previousSibling.children[index].focus();
            }else{
                this.instructionListElement.lastChild.children[index].focus();
            }
            return;
        }

        //Down
        if(ev.keyCode===40){
            if( record.record.nextSibling){
                ev.preventDefault();
                record.record.nextSibling.children[index].focus();
            }else{
                this.instructionListElement.firstChild.children[index].focus();
            }
            return;
        }
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

    onListUpdate(_instructionList){
        this.recordList=[];
        this.instructionListElement.innerHTML="";
        this.createInstructionElments(_instructionList,this.instructionListElement);
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

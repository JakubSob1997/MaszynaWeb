

class InstructionRecord{

    constructor(_instruction,_inspector,_index){
        this.record = document.createElement("li");
        this.name = document.createElement("div");
        this.removeButton = document.createElement("div")
        this.upButton= document.createElement("div");
        this.downButton=document.createElement("div")



        this.buildRecord();
        this.attachCallbacks(_inspector,_index);
        this.populateRecord(_instruction);

    }

    buildRecord(){
        this.record.classList.add("instr-entry");

        this.record.appendChild(this.name);
        this.record.appendChild(this.removeButton);
        this.record.appendChild(this.upButton);
        this.record.appendChild(this.downButton);


        this.removeButton.classList.add("custom-btn")
        this.name.classList.add("instr-name");
        this.upButton.classList.add("custom-btn");
        this.downButton.classList.add("custom-btn");
    }

    populateRecord(_instruction){
        this.name.innerHTML = _instruction.name;
        this.removeButton.innerHTML = "Delete";
        this.upButton.innerHTML = "▲";
        this.downButton.innerHTML = "▼";

    }

    attachCallbacks(_inspector,_index){
        this.upButton.onclick = ()=>{_inspector.onUpButton(_index)};
        this.downButton.onclick = ()=>{_inspector.onDownButton(_index)};
        this.name.onclick=()=>(_inspector.onRecordClicked(_index));
        this.removeButton.onclick=()=>{_inspector.onDeleteButton(_index)};
    }

    getHTMLElement(){
        return this.record;
    }


}



class InstructionInspector{
    constructor(_instructionList){

        this.wrpper;
        this.instructionList =_instructionList;;
        this.recordList= []
        this.onInstructionSelectedCallbacks=[];


        this.build(_instructionList);

        this.addCallbacks();


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
        this.instructionListElement = document.createElement("ul");
        this.addInstructionButton = document.createElement("button");
        this.loadDefaultButton=document.createElement("button");
        this.createInstructionElments(_instructionList,this.instructionListElement);

        this.instructionListElement.classList.add("instr-list");


        this.addInstructionButton.innerHTML="Add";
        this.loadDefaultButton.innerHTML="Load Default";

        this.wrpper.appendChild(this.loadDefaultButton);
        this.wrpper.appendChild(this.instructionListElement);
        this.wrpper.appendChild(this.addInstructionButton);
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

        
    }

    onDownButton(_index){
        if(_index == this.instructionList.length()-1)return;


        this.instructionList.swap(_index,_index+1);

        this.recordList[_index].populateRecord( this.instructionList.getInstruction(_index))
        this.recordList[_index+1].populateRecord(this.instructionList.getInstruction(_index+1))

    }


    onRecordClicked(_index){
        this.selectInstruction(this.instructionList.getInstruction(_index));
    }


    onDeleteButton(_index){
        this.instructionList.removeInstruction(_index);
        this.recordList.splice(-1)
        this.instructionListElement.removeChild(this.instructionListElement.lastChild);

        for (let i = 0; i < this.recordList.length; i++) {
            const record = this.recordList[i];
            record.populateRecord(this.instructionList.getInstruction(i));
            
        }

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

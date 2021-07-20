

class InstructionRecord{

    constructor(_instruction,_inspector,_index){
        this.record = document.createElement("li");
        this.name = document.createElement("div");
        this.removeButton = document.createElement("button")
        this.upDownButtons = document.createElement("div");
        this.upButton= document.createElement("button");
        this.downButton=document.createElement("button")

        this.buildRecord();
        this.attachCallbacks(_inspector,_index);
        this.populateRecord(_instruction);

    }

    buildRecord(){
        this.record.appendChild(this.name);
        this.record.appendChild(this.removeButton);
        this.record.appendChild(this.upDownButtons);
        this.upDownButtons.appendChild(this.upButton);
        this.upDownButtons.appendChild(this.downButton);
    }

    populateRecord(_instruction){
        this.name.innerHTML = _instruction.name;
        this.removeButton.innerHTML = "delete";
        this.upButton.innerHTML = "up";
        this.downButton.innerHTML = "down";

    }

    attachCallbacks(_inspector,_index){
        this.upButton.onclick = ()=>{_inspector.onUpButton(_index)};
        this.downButton.onclick = ()=>{_inspector.onDownButton(_index)};
        this.record.onclick=()=>(_inspector.onRecordClicked(_index));
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


        const elee = document.getElementById("instr-list-test");
        this.build(_instructionList);
        elee.appendChild(this.wrpper);


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

        this.addInstructionButton.innerHTML="Add";
        this.loadDefaultButton.innerHTML="Load Default";

        this.wrpper.appendChild(this.loadDefaultButton);
        this.wrpper.appendChild(this.instructionListElement);
        this.wrpper.appendChild(this.addInstructionButton);
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



















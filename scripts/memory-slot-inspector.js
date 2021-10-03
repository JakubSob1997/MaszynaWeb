

import ValueView from "./value-view.js";

export default class MemorySlotInspector{
    constructor(_memory,_valueDisplayer){

        this.memmory=_memory;
        this.currentIndex=0;

        this.wrapper;
        this.label;
        this.valueView;
        

        this.build(_valueDisplayer);
        this.addCallbacks();


        this.memmory.addOnValueChangedCallback((_mem,_index)=>{
            if(_index==this.currentIndex){
                this.valueView.populateWord(this.memmory.getValue(_index));
            }
            
        })


    }

    focus(){
        this.label.focus();
    }

    build(_valueDisplayer){

        
        this.valueView = new ValueView(_valueDisplayer);
        this.wrapper = document.createElement("div");
        this.label = document.createElement("h3");
        

        this.label.setAttribute("tabindex",0)

        this.currentIndex=0;

        this.wrapper.appendChild(this.label);
        this.wrapper.appendChild(this.valueView.getHTMLElement());

    }

    populate(_memoryIndex){
        this.label.innerText="Pamięć: "+"["+_memoryIndex.toString(10)+"]";
        this.valueView.populateWord(this.memmory.getValue(_memoryIndex));
    }

    getHTMLElement(){
        return this.wrapper;
    }

    selectMemorySlot(_index){
        this.currentIndex=_index;
        this.populate(_index)
    }

    addCallbacks(){
        this.valueView.setOnPlusOneButton(()=>{this.onPlusOneButton();});
        this.valueView.setOnMinusOneButton(()=>{this.onMinusOneButon();});
        this.valueView.setOnSetZeroButton(()=>{ this.onSetZeroButton();});
        this.valueView.setOnWriteButton(()=>{this.onValueInput();});
    }

    onPlusOneButton(){
        this.memmory.write(this.currentIndex, this.memmory.read(this.currentIndex)+1);
    }

    onMinusOneButon(){
        this.memmory.write(this.currentIndex, this.memmory.read(this.currentIndex)-1);

    }

    onSetZeroButton(){
        this.memmory.write(this.currentIndex,0);
    }

    onValueInput(){
        const intVal = this.valueView.getValue();
            if(isNaN(intVal)==false){
                this.memmory.write(this.currentIndex,intVal);
            }
    }



}





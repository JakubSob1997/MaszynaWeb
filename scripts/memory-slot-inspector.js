

import Translator from "./translator.js";
import ValueView from "./value-view.js";

export default class MemorySlotInspector{
    constructor(_memory,_valueDisplayer,_variablePreview){
        
        this.memmory=_memory;
        this.currentIndex=0;

        this.wrapper;
        this.label;
        this.valueView;
        
        

        this.build(_valueDisplayer);
        this.addCallbacks(_variablePreview);


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
        this.label = document.createElement("h1");
        this.previewButton = document.createElement("button");
        

        this.label.setAttribute("tabindex",0)
        this.currentIndex=0;

        this.wrapper.classList.add("generic-inspector"); 
        this.previewButton.classList.add("custom-btn");
        this.previewButton.textContent=Translator.getTranslation("_preview","Preview");

        this.wrapper.appendChild(this.label);
        this.wrapper.appendChild(this.valueView.getHTMLElement());
        this.wrapper.appendChild(this.previewButton)


    }

    populate(_memoryIndex){//_memoryIndex.toString(10)
        this.label.innerText=Translator.getTranslation("_memory_header","Memory [@0]",[_memoryIndex.toString(10)])
        this.valueView.populateWord(this.memmory.getValue(_memoryIndex));
    }

    getHTMLElement(){
        return this.wrapper;
    }

    selectMemorySlot(_index){
        this.currentIndex=_index;
        this.populate(_index)
    }

    addCallbacks(_variablePreview){
        this.valueView.setOnPlusOneButton(()=>{this.onPlusOneButton();});
        this.valueView.setOnMinusOneButton(()=>{this.onMinusOneButon();});
        this.valueView.setOnSetZeroButton(()=>{ this.onSetZeroButton();});
        this.valueView.setOnWriteButton(()=>{this.onValueInput();});
    
        this.previewButton.addEventListener("click",()=>{
            _variablePreview.memory.toggleMemorySlot(this.currentIndex);
        })
    }

    onPlusOneButton(){
        this.memmory.setValue(this.currentIndex, this.memmory.read(this.currentIndex)+1);
    }

    onMinusOneButon(){
        this.memmory.setValue(this.currentIndex, this.memmory.read(this.currentIndex)-1);

    }

    onSetZeroButton(){
        this.memmory.setValue(this.currentIndex,0);
    }

    onValueInput(){
        const intVal = this.valueView.getValue();
            if(isNaN(intVal)==false){
                this.memmory.setValue(this.currentIndex,intVal);
            }
    }



}





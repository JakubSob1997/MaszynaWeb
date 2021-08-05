
import { ValueDisplayEnum } from "./enums.js";

export default class ValueView{
    constructor(_valueDisplayer){

        this.valueDisplayer = _valueDisplayer;


        this.mainWrapper=document.createElement("div");
        this.valueField=document.createElement("input");
        this.buttonWrapper=document.createElement("div");
        this.writeButton=document.createElement("button");
        this.plusOneButton=document.createElement("button");
        this.minusOneButton=document.createElement("button");
        this.setZeroButton=document.createElement("button");
        this.build();
    }

    setOnWriteButton(_funk){
        this.writeButton.addEventListener("click",_funk);
    }
    setOnPlusOneButton(_funk){
        this.plusOneButton.onclick=_funk;
    }
    setOnMinusOneButton(_funk){
        this.minusOneButton.onclick=_funk;
    }
    setOnSetZeroButton(_funk){
        this.setZeroButton.onclick=_funk;
    }

    getValue(){
        if(this.valueDisplayer==undefined){
            return parseInt(this.valueField.value,10);
        }else{
            console.log( this.valueDisplayer.stringToValue(this.valueField.value));
            return this.valueDisplayer.stringToValue(this.valueField.value);
            
        }
        
    }



    build(){
        this.mainWrapper.appendChild(this.valueField);
        this.mainWrapper.appendChild(this.writeButton);
        this.mainWrapper.appendChild(this.plusOneButton);
        this.mainWrapper.appendChild(this.minusOneButton);
        this.mainWrapper.appendChild(this.setZeroButton);

        this.writeButton.innerHTML="Pisz";
        this.plusOneButton.innerHTML="+1";
        this.minusOneButton.innerHTML="-1";
        this.setZeroButton.innerHTML="0";

        this.writeButton.classList.add("custom-btn");
        this.plusOneButton.classList.add("custom-btn");
        this.minusOneButton.classList.add("custom-btn");
        this.setZeroButton.classList.add("custom-btn");

        this.writeButton.addEventListener("click",()=>{this.valueField.focus();});

    }


    populateRegister(_reg){
        if(this.valueDisplayer===undefined){
            this.valueField.value=_reg.getValue().toString(10);
        }else{
            this.valueField.value=this.valueDisplayer.registerToString(_reg)
        }
    }

    populateWord(_value){
        if(this.valueDisplayer===undefined){
            this.valueField.value=_value.toString(10);
        }else{
            this.valueField.value=  this.valueDisplayer.wordToString(_value,ValueDisplayEnum.UnsignedDecimal)
        }
    }

    getHTMLElement(){
        return this.mainWrapper;
    }
}



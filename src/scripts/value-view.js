
import { ValueDisplayEnum } from "./enums.js";
import Translator from "./translator.js";

export default class ValueView{
    constructor(_valueDisplayer){
        this.lockInput = false;

        this.valueDisplayer = _valueDisplayer;

        this.submitFunks=[];


        this.mainWrapper=document.createElement("div");
        this.valueField=document.createElement("input");
        this.buttonWrapper=document.createElement("div");
        this.writeButton=document.createElement("button");
        this.plusOneButton=document.createElement("button");
        this.minusOneButton=document.createElement("button");
        this.setZeroButton=document.createElement("button");
        this.build();
    }

    onSubmit(e){
        this.submitFunks.forEach(funk => {
            funk(e);
        });
    }

    setOnWriteButton(_funk){
        this.submitFunks.push(_funk)
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
            return this.valueDisplayer.parseInput(this.valueField.value);
            
        }
        
    }



    build(){
        this.mainWrapper.appendChild(this.valueField);
        this.mainWrapper.appendChild(this.writeButton);
        
        this.buttonWrapper.appendChild(this.minusOneButton);
        this.buttonWrapper.appendChild(this.setZeroButton);
        this.buttonWrapper.appendChild(this.plusOneButton);
        this.mainWrapper.appendChild(this.buttonWrapper);


        this.writeButton.innerText=Translator.getTranslation("_write","Write");
        this.plusOneButton.innerText="+1";
        this.minusOneButton.innerText="-1";
        this.setZeroButton.innerText="0";

        
        this.valueField.style.height="2.5em"
        this.valueField.style.width="10em"

        this.mainWrapper.style.whiteSpace="nowrap";
        this.buttonWrapper.style.whiteSpace="nowrap";

        this.mainWrapper.classList.add("generic-inspector")
        this.buttonWrapper.classList.add("generic-inspector")
        this.writeButton.classList.add("custom-btn");
        this.plusOneButton.classList.add("custom-btn");
        this.minusOneButton.classList.add("custom-btn");
        this.setZeroButton.classList.add("custom-btn");

        this.writeButton.addEventListener("click",(e)=>{
            this.onSubmit(e);

        });

        this.valueField.addEventListener("keydown",(e)=>{

            if (e.keyCode === 13) {
                e.preventDefault();
                this.onSubmit(e);
                this.valueField.blur();
              }
           
        });


        this.valueField.addEventListener("focus",()=>{
            this.lockInput = true;
        })
        this.valueField.addEventListener("blur",()=>{
            this.lockInput = false;
        })

    }


    populateRegister(_reg){

        if(this.lockInput===false){
            if(this.valueDisplayer===undefined){
                this.valueField.value=_reg.getValue().toString(10);
            }else{
                this.valueField.value=this.valueDisplayer.registerToString(_reg)
            }
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



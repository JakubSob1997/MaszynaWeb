import Alerter from "./alerter.js";
import { AlertStyleEnum } from "./enums.js";
import Translator from "./translator.js";




export default class CycleTimerView{

    constructor(_cycleTimerDevice){
        this.wrapper;
        this.heading;
        this.content;
        this.cyclesInput;
        this.stateLabel;
        this.setButton;

        this.domUpdatedFlag=false;
        this.build(_cycleTimerDevice);
        this.addCallbacks(_cycleTimerDevice)
    }

    build(_cycleTimerDevice){
        

        this.wrapper= document.createElement("div");
        this.heading =document.createElement("h3");
        this.content=document.createElement("div");
        
        this.stateWrapper = document.createElement("div");
        this.stateLabel=document.createElement("span");
        this.stateValue = document.createElement("span");

        this.inputWrapper=document.createElement("div");
        const id = "_cycles_timer_wait_input";
        this.inputLabel=document.createElement("label")
        this.cyclesInput= document.createElement("input");
        this.setButton=document.createElement("button");


        this.heading.innerText=Translator.getTranslation("_cycle_timer","Cycle Timer");
       
        this.stateValue.innerText = this.countdownToDisplay(_cycleTimerDevice.state)
        this.stateLabel.innerText=Translator.getTranslation("_countdown","Countdown: ")
       
       
        this.inputLabel.innerText = Translator.getTranslation("_cycles_to_wait","Cycles to wait:")
        this.cyclesInput.value=(_cycleTimerDevice.cyclesToWait);
        this.setButton.innerText=Translator.getTranslation("_set","Set");


        this.wrapper.classList.add("generic-inspector");
        this.stateWrapper.classList.add("generic-inspector");
        this.inputWrapper.classList.add("generic-inspector");

        this.setButton.classList.add("custom-btn");


        this.cyclesInput.type="number";
        this.cyclesInput.id=id;
        this.inputLabel.setAttribute("for",id);
        

        this.stateWrapper.appendChild(this.stateLabel);
        this.stateWrapper.appendChild(this.stateValue);

        this.inputWrapper.appendChild(this.inputLabel)
        this.inputWrapper.appendChild(this.cyclesInput);
        this.inputWrapper.appendChild(this.setButton);
        
        this.content.appendChild(this.stateWrapper)
        this.content.appendChild(this.inputWrapper)

        this.wrapper.appendChild(this.heading);
        this.wrapper.appendChild(this.content);

        

    }

    addCallbacks(_device){
        _device.onStateChange = (state)=>{

            if(this.domUpdatedFlag===false){
                this.domUpdatedFlag=true;   
                requestAnimationFrame(()=>{
                    this.stateValue.innerText = this.countdownToDisplay(_device.state)
                    this.domUpdatedFlag=false;
                },0)
            }


            
        }

        this.setButton.addEventListener("click",(ev)=>{
            this.setCyclesToWait(_device);
        })

        this.cyclesInput.addEventListener("keydown",(ev)=>{
            if(ev.keyCode===13||ev.keyCode===32){
                this.setCyclesToWait(_device);
            }
        })


    }

    countdownToDisplay(val){
        const int = parseInt(val);

        if(isNaN(int)){
            return "Err"
        }

        if(int<0){
            return Translator.getTranslation("_done","Done")
        }

        return val;
    }

    setCyclesToWait(_device){

        const int =parseInt(this.cyclesInput.value);

        if(isNaN(int)){
            Alerter.sendMessage(`Input is not a number!`,AlertStyleEnum.InputError)
        }else{
            Alerter.sendMessage(`${this.heading.innerText}: ${this.cyclesInput.value}`,AlertStyleEnum.InputSucces)
            _device.cyclesToWait=this.cyclesInput.value
        }

        
    }


    getHTMLElement(){
        return this.wrapper;
    }

}



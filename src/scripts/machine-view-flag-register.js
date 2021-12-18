
import MachineViewRegister from "./machine-vew-register.js";

import {MatchRegisterWidthEnum} from "./enums.js";






export default class MachineViewFlagRegister extends MachineViewRegister{


    constructor(_MV,_flagRegister){
        super(_MV,_flagRegister);

        this.busMatchRule = MatchRegisterWidthEnum.DontMatch;

    }

    display(){
        const regName = this.register.name.toUpperCase();
        const formatedValue = this.machineView.valueDisplayer.registerToString(this.register)

        this.element.innerText=regName+": "+formatedValue;

        if(this.register.wasWriten){
            this.element.classList.add("reg-selected");
        }else{
            this.element.classList.remove("reg-selected");
        }

        const myExtFlag = this.register.getExtention();
        const allExtFlags = this.machineView.getCurentExtentions()
        
        if((myExtFlag &allExtFlags)===0){
            this.element.classList.add("reg-hidden");
            this.element.disabled=true;
        }else{
            this.element.classList.remove("reg-hidden");
            this.element.disabled=false;
        }
    }




}












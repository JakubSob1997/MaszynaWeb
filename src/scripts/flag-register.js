import { ExtnensionFlags, MatchRegisterWidthEnum } from "./enums.js";
import MachineComponent from "./machine-component.js";
import Register from "./register.js";

export default class FlagRegister extends Register{
    constructor(){

        super("f",ExtnensionFlags.Flags);
        this.flags = {}

        this.busMatchRule = MatchRegisterWidthEnum.DontMatch;
    }

    addFlag(_conditionFlag){
        this.flags[_conditionFlag.bit]= _conditionFlag;
    }

    machineUpdate(){

        for (const bit in this.flags) {
            if (Object.hasOwnProperty.call(this.flags, bit)) {
                const {name,isFlagActive} = this.flags[bit];
                const mask =  1<<bit;

                if(isFlagActive()){
                    this.value |= mask;
                }else{
                    this.value &= (~mask);
                }

            }
        }

        
        super.update.call(this);
    }



}






























import { ExtnensionFlags,ExtentionPresets } from "./enums.js";
import Translator from "./translator.js";


export default class MachineExtensionData{

    constructor(_flags){
        if(_flags===undefined){
            _flags= ExtentionPresets.W;
        };

        this.BusConnection;
        this.AK_Increment;
        this.ALU_Logic;
        this.ALU_ExtendedMath;
        this.Stack;
        this.X_Register;
        this.Y_Register;
        this.Interupt;
        this.InputOutput;
        this.Flags;
        this.T_Register;

        this.setProperties(_flags);


    }

    toString(){
        let result="";
        if(this.BusConnection) result+=`${Translator.getTranslation("_module_short_buscon","Connection")}, `
        if(this.AK_Increment) result+=`${Translator.getTranslation("_module_short_incdec","Incrementation")}, `
        if(this.ALU_Logic) result+=`${Translator.getTranslation("_module_short_logic","Logic")}, `
        if(this.ALU_ExtendedMath) result+=`${Translator.getTranslation("_module_short_arythm","Arythmetic")}, `
        if(this.Stack) result+=`${Translator.getTranslation("_module_short_stack","Stack")}, `
        if(this.X_Register) result+=`${Translator.getTranslation("_module_short_regx","X")}, `
        if(this.Y_Register) result+=`${Translator.getTranslation("_module_short_regy","Y")}, `
        if(this.Interupt) result+=`${Translator.getTranslation("_module_short_int","Interupts")}, `
        if(this.InputOutput) result+=`${Translator.getTranslation("_module_short_io","I/O")}, `
        if(this.Flags) result+=`${Translator.getTranslation("_module_short_flags","Flags")}, `
        if(this.T_Register) result+=`${Translator.getTranslation("_module_short_regt","T")}, `

        if(result!=""){
            result=result.slice(0,result.length-2);
        }
        return result;
        
    }



    setProperties(_flags){
        this.BusConnection = (_flags&ExtnensionFlags.BusConnection)!=0;
        this.AK_Increment = (_flags&ExtnensionFlags.AK_Increment)!=0;
        this.ALU_Logic = (_flags&ExtnensionFlags.ALU_Logic)!=0;
        this.ALU_ExtendedMath =( _flags&ExtnensionFlags.ALU_ExtendedMath)!=0;
        this.Stack = (_flags&ExtnensionFlags.Stack)!=0;
        this.X_Register = (_flags&ExtnensionFlags.X_Register)!=0;
        this.Y_Register = (_flags&ExtnensionFlags.Y_Register)!=0;
        this.Interupt = (_flags&ExtnensionFlags.Interupt)!=0;
        this.InputOutput = (_flags&ExtnensionFlags.InputOutput)!=0;
        this.Flags = (_flags&ExtnensionFlags.Flags)!=0;
        this.T_Register = (_flags&ExtnensionFlags.T_Register)!=0;
    }

    getFlags(){
        let flag = ExtnensionFlags.Base;

        flag|=this.BusConnection ?ExtnensionFlags.BusConnection:0;
        flag|=this.AK_Increment ?ExtnensionFlags.AK_Increment:0;
        flag|=this.ALU_Logic ?ExtnensionFlags.ALU_Logic:0;
        flag|=this.ALU_ExtendedMath ?ExtnensionFlags.ALU_ExtendedMath:0;
        flag|=this.Stack ?ExtnensionFlags.Stack:0;
        flag|=this.X_Register ?ExtnensionFlags.X_Register:0;
        flag|=this.Y_Register ?ExtnensionFlags.Y_Register:0;
        flag|=this.Interupt ?ExtnensionFlags.Interupt:0;
        flag|=this.InputOutput ?ExtnensionFlags.InputOutput:0;
        flag|=this.Flags ?ExtnensionFlags.Flags:0;
        flag|=this.T_Register ?ExtnensionFlags.T_Register:0;
        

        return flag;



    }






}












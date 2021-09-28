

import { ExtnensionFlags,ExtentionPresets } from "./enums.js";


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

        this.setProperties(_flags);


    }

    toString(){
        let result="";
        if(this.BusConnection) result+="Połączenie, "
        if(this.AK_Increment) result+="Inkrementacja, "
        if(this.BusConnection) result+="Logika, "
        if(this.BusConnection) result+="Arytmetyka, "
        if(this.BusConnection) result+="Stos, "
        if(this.BusConnection) result+="X, "
        if(this.BusConnection) result+="Y, "
        if(this.BusConnection) result+="Przerwania, "
        if(this.BusConnection) result+="We/Wy, "
        if(this.BusConnection) result+="Flagi, "

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

        return flag;



    }






}












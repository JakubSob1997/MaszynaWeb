

import { ValueDisplayEnum } from "./enums.js";

export default class ValueDisplayer{

    constructor(_settings,_instructionList){
        this.settings = _settings;
        this.instructionList = _instructionList;
    }

    getSignBit(_value,_bitWidth){
        return _value & 1<< (_bitWidth-1);
    }


    toSignedDecimal(_value,_bitWidth,_bitmask){
        if(this.getSignBit(_value,_bitWidth)==0){
            return _value.toString(10);
        }else{
            let neg = ((~_value)+1)&_bitmask;
            return "-"+neg.toString(10);
        }
    }


    toBinary(_value,_bitWidth,_bitmask){
        const zero="0";
        let output=_value.toString(2);
        output="%"+zero.repeat(_bitWidth-output.length)+output;
        return output;
        
    }


    toOpCodeArgument(_value,_bitWidth,_bitmask){
        /*
        if((this.settings.codeMask&_bitmask) == 0){
            return _value.toString(10);
        }*/

        const opcode = this.settings.getOpcode(_value)
        let code;
        let arg;
        if(this.instructionList.hasInstruction(opcode)){
            code = this.instructionList.getInstruction(opcode).name;
        }else{
            code="???"
        }

        arg = (_value&this.settings.adressMask).toString(10);

        return code+" "+arg;

    }

    registerToString(_register){
        return this.valueToString(
            _register.getValue(),
            _register.display,
            _register.width,
            _register.bitmask
        )
    }


    wordToString(_value,_displayMode){
        return this.valueToString(
            _value,
            _displayMode,
            this.settings.getWordWidth(),
            this.settings.getWordMask()
            )
    }


    stringToValue(_string,_bitmask){

        let trimed = _string.trim();
        console.log(trimed);
        let output = NaN;
        if(trimed[0]=="%"){
            output =parseInt(trimed.substring(1,trimed.length),2);
            console.log("%"+"output");
            return output;
        }
        if(trimed[0]=="#"){

            output=parseInt(trimed.substring(1,trimed.length),16);
            return output;
        }
        output = parseInt(trimed,10);
        return output;
    }


    valueToString(_value,_displayMode,_bitWidth,_bitmask){


        switch (_displayMode) {
            case ValueDisplayEnum.UnsignedDecimal:
                return _value.toString(10);
            case ValueDisplayEnum.SignedDecimal:
                return this.toSignedDecimal(_value,_bitWidth,_bitmask);
            case ValueDisplayEnum.Binary:
                return this.toBinary(_value,_bitWidth,_bitmask);
            case ValueDisplayEnum.HexaDecimal:
                return "#"+_value.toString(16);
            case ValueDisplayEnum.OpCodeArgument:
                return this.toOpCodeArgument(_value,_bitWidth,_bitmask);
            default:
                return "err";
        }
    }
    
}

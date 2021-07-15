



class ValueDisplayer{

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
            console.log(_bitmask);
            let neg = ((~_value)+1)&_bitmask;
            return "-"+neg.toString(10);
        }
    }


    toOpCodeArgument(_value,_bitWidth,_bitmask){
        if(this.settings.codeMask&&_bitmask == 0){
            return _value.toString(10);
        }

        const opcode = this.settings.getOpcode(_value)
        let code;
        let arg;
        if(this.instructionList.hasInstruction(opcode)){
            console.log(this.instructionList.getInstructionIndex(opcode));
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


    valueToString(_value,_displayMode,_bitWidth,_bitmask){


        switch (_displayMode) {
            case ValueDisplayEnum.UnsignedDecimal:
                return _value.toString(10);
            case ValueDisplayEnum.SignedDecimal:
                return this.toSignedDecimal(_value,_bitWidth,_bitmask);
            case ValueDisplayEnum.Binary:
                return _value.toString(2);
            case ValueDisplayEnum.HexaDecimal:
                return _value.toString(16);
            case ValueDisplayEnum.OpCodeArgument:
                return this.toOpCodeArgument(_value,_bitWidth,_bitmask);
            default:
                return "err";
        }
    }
    
}
























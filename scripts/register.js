



class  Register {




    constructor(){
        this.display = RegisterDisplayEnum.UnsignedDecimal;
        this.setBitWidth(8);
        this.value = 0;

    }


    setBitWidth(newWidth){
        this.width= newWidth;
        this.bitmask=this.getBitmask();
    }

    getBitWidth(){
        return this.width;
    }


    setValue(newValue){
        this.value = newValue & this.bitmask;
    }

    getValue(){
        return this.value & this.bitmask;
    }

    getBitmask(){
        let width  = this.width;
        let mask =0;
        while(width>0){
            mask = mask<<1;
            mask|=1;
            width--;
        }
        return mask;

    }


    getSignBit(){
        return this.value & 1<< (this.width-1);
    }


    toSignedDecimal(){
        if(this.getSignBit()==0){
            return this.value.toString(10);
        }else{

            let neg = ((~this.value)+1)&this.bitmask;

            return "-"+neg.toString(10);



        }
    }


    getDisplayText(){

        switch (this.display) {
            case RegisterDisplayEnum.UnsignedDecimal:
                return this.value.toString(10);
            case RegisterDisplayEnum.SignedDecimal:
                return this.toSignedDecimal();
            case RegisterDisplayEnum.Binary:
                return this.value.toString(2);
            case RegisterDisplayEnum.HexaDecimal:
                return this.value.toString(16);
            default:
                return "err";

        }

        
    }



}
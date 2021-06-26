



class  Register {


    constructor(_name){
        this.name = _name;
        this.display = RegisterDisplayEnum.UnsignedDecimal;
        this.busMatch = MatchRegisterWidthEnum.ToWord;
        this.setBitWidth(8);
        this.value = 0;
        this.wasWriten=false;
        this.onUpdateCallbacks = [];
    }


    setDisplay(_displayEnum){
        this.display = _displayEnum;
        update();
    }

    resetState(){
        this.wasWriten=false;
    }

    write(_value){
        if(this.wasWriten==true){
            Alerter.alert("Register: " + this.name +" was alredy writen into.");
        }else{
            this.wasWriten = true;
            this.setValue(_value);
        }
    }

    addOnUpdateCallback(_funk){
        this.onUpdateCallbacks.push(_funk);
    }

    update(){
        this.onUpdateCallbacks.forEach(element => {
            element(this);
        });
    }


    setBitWidth(newWidth){
        this.width= newWidth;
        this.bitmask=this.getBitmask();
        update();
    }

    getBitWidth(){
        return this.width;
    }


    setValue(newValue){
        this.value = newValue & this.bitmask;
        update();
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
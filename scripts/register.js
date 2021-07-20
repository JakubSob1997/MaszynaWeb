



class  Register extends MachineComponent {


    constructor(_name,_extention){
        super();

        this.name = _name;
        this.display = ValueDisplayEnum.UnsignedDecimal;
        this.busMatchRule = MatchRegisterWidthEnum.ToWord;

        this.width=0;
        this.bitmask=0;
        this.setBitWidth(8);
        this.value = 0;
        this.wasWriten=false;
        this.onUpdateCallbacks = [];
        this.extention = _extention?? ExtnensionFlags.Base;
    }

    getExtention(){
        return this.extention;
    }


    setDisplay(_displayEnum){
        this.display = _displayEnum;
        this.update();
    }


    setDefault(){
        this.wasWriten=false;
        this.setValue(0);
    }

    resetState(){
        this.wasWriten=false;
        this.update();
    }

    onBusWidthChanged(_settings){

        
        switch (this.busMatchRule) {
            case MatchRegisterWidthEnum.ToAdress:
                this.setBitWidth(_settings.adressWidth);
                break;
            case MatchRegisterWidthEnum.ToCode:
                this.setBitWidth(_settings.codeWidth);
                break;
            case MatchRegisterWidthEnum.ToWord:
                this.setBitWidth(_settings.codeWidth+_settings.adressWidth);
                break;
            case MatchRegisterWidthEnum.DontMatch:
                break;
            default:
                break;
             
        }
        this.update();   

    }

    getSignBit(){
        return this.value & 1<< (this.width-1);
    }

    write(_value){
        if(this.wasWriten==true){
            Alerter.alert("Register: " + this.name +" was alredy writen into.");
        }else{
            this.wasWriten = true;
            this.setValue(_value);
        }
    }

    writeFromBus(_bus){
        if(_bus.hasValue()){
            this.write(_bus.getValue());
        }else{
            Alerter.alert("No Value On Bus");
        }
    }


    addOnUpdateCallback(_funk){
        this.onUpdateCallbacks.push(_funk);
    }


    update(){
        
        if(this.onUpdateCallbacks===undefined==false){
            this.onUpdateCallbacks.forEach(funk => {
                funk(this);
            });
        }

        
        
    }


    setBitWidth(newWidth){
        this.width= newWidth;
        this.bitmask=this.getBitmask();
        this.update();
    }

    getBitWidth(){
        return this.width;
    }


    setValue(newValue){
        this.value = newValue & this.bitmask;
        this.update();
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


    


    toSignedDecimal(){
        if(this.getSignBit()==0){
            return this.value.toString(10);
        }else{

            let neg = ((~this.value)+1)&this.bitmask;

            return "-"+neg.toString(10);



        }
    }


}
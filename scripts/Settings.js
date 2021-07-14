


class SettingsSerializer{
    constructor(_codeWidth,_adressWidth,_extentionFlags){
        this.codeWidth=_codeWidth;
        this.adressWidth=_adressWidth;
        this.extentionFlags = _extentionFlags;
    }

    static getDefault(){
        return new SettingsSerializer(3,5,ExtnensionFlags.W);
    }

    static getSerializer(_settings){
        return new SettingsSerializer(_settings.codeWidth,_settings.adressWidth,_settings.extentionFlags);
    }
}




class Settings{
    constructor(){
        this.codeWidth=3;
        this.adressWidth=5;
        this.extentionFlags  = ExtnensionFlags.W;



        this.onBusWidthChanged = function(_settings){};

        this.codeMask=0b11100000;
        this.adressMask==0b11111;
    }


    setupValues(_settingsSerializer){
        this.setBusWidth(_settingsSerializer.codeWidth,_settingsSerializer.adressWidth);
        this.setExtentionFlags(_settingsSerializer.extentionFlags);
    
    }

    setExtentionFlags(_flags){
        this.extentionFlags  = _flags;
    }



    getWordMask(){
        return this.codeMask|this.adressMask;
    }


    setBusWidth(_codeWidth,_adressWidth){

        this.codeWidth=_codeWidth;
        this.adressWidth=_adressWidth;


        let i =_codeWidth;
        this.codeMask=0;
        while(i>0){
            this.codeMask=this.codeMask<<1;
            this.codeMask|=1;
            i--;
        }
        this.codeMask=this.codeMask<<_adressWidth;

        i = _adressWidth;
        this.adressMask=0;
        while(i>0){
            this.adressMask=this.adressMask<<1;
            this.adressMask|=1;
            i--;
        }
        this.onBusWidthChanged(this);
    }



    getOpcode(_value){

        const masked = (_value&this.codeMask)
        return masked>>this.adressWidth;

    }






}
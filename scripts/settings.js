
import { ExtentionPresets } from "./enums.js";
import Terminator from "./terminator.js";



export class SettingsSerializer{
    constructor(_codeWidth,_adressWidth,_extentionFlags,_intAdressList){
        this.codeWidth=_codeWidth;
        this.adressWidth=_adressWidth;
        this.extentionFlags = _extentionFlags;
        this.intAdressList = _intAdressList;
    }

    static getDefault(){
        return new SettingsSerializer(
            4,
            5,
            ExtentionPresets.EW,
            [1,2,3,4]
            );
    }

    static getSerializer(_settings){
        return new SettingsSerializer(_settings.codeWidth,_settings.adressWidth,_settings.extentionFlags);
    }
}




export default class Settings{

    static MinCodeWidth = 2;
    static MinAddresWidth=4;
    static MaxCodeWidth  = 8;
    static MaxAddresWidth =12;

    constructor(){
        this.codeWidth=3;
        this.adressWidth=5;
        this.extentionFlags  = ExtentionPresets.W;
        this.intAdressList=[1,2,3,4];


        this.onBusWidthChangedCalbacks =[];
        this.codeMask=0b11100000;
        this.adressMask==0b11111;
    }


    addOnBusWidthChangedListener(_funk){
        this.onBusWidthChangedCalbacks.push(_funk);

    }

    invokeOnBusWidthChanged(){
        this.onBusWidthChangedCalbacks.forEach(_funk => {
            _funk(this);
        });
    }




    setupValues(_settingsSerializer){
        this.setBusWidth(_settingsSerializer.codeWidth,_settingsSerializer.adressWidth);
        this.setExtentionFlags(_settingsSerializer.extentionFlags);
        this.intAdressList = _settingsSerializer.intAdressList;
    }

    setExtentionFlags(_flags){
        this.extentionFlags  = _flags;
    }



    getWordMask(){
        return this.codeMask|this.adressMask;
    }
    getWordWidth(){
        return this.codeWidth+this.adressWidth;
    }


    setBusWidth(_codeWidth,_adressWidth){

        //Clamp
        _codeWidth =Math.min(Math.max(_codeWidth,Settings.MinCodeWidth),Settings.MaxCodeWidth)
        _adressWidth = Math.min(Math.max(_adressWidth,Settings.MinAddresWidth),Settings.MaxAddresWidth)


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

        Terminator.terminate();
        this.invokeOnBusWidthChanged();
    }



    getOpcode(_value){
        const masked = (_value&this.codeMask)
        return masked>>this.adressWidth;
    }


}

import { ExtentionPresets } from "./enums.js";
import SerializerBase from "./serializer-base.js";

export default class SettingsSerializer extends SerializerBase{
    constructor(_codeWidth,_adressWidth,_extentionFlags,_intAdressList){

        super();

        this.codeWidth=_codeWidth;
        this.adressWidth=_adressWidth;
        this.extentionFlags = _extentionFlags;
        this.intAdressList = _intAdressList;
    }

    getDefault(){
        SettingsSerializer.getDefault();
    }

    getKeyName(){
        return "settings";
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




export class BusWidthSettingSerializer extends SerializerBase{

    constructor(_codeWidth,_adressWidth){
        super();
        this.codeWidth = _codeWidth;
        this.adressWidth = _adressWidth;
    }

    static getDefault(){
        return new BusWidthSettingSerializer(3,5);
    }
    getDefault(){
        return BusWidthSettingSerializer.getDefault();
    }

    getKeyName(){
        return "busWidth"
    }
}



console.log(BusWidthSettingSerializer);
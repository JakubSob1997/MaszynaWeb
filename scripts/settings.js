
import { ExtentionPresets } from "./enums.js";
import Terminator from "./terminator.js";
import SettingsSerializer from "./settings-serializer.js";
import MachineExtensionData from "./machine-extension-data.js";




export default class Settings{

    static MinCodeWidth = 0;
    static MinAddresWidth=0;
    static MaxCodeWidth  = 8;
    static MaxAddresWidth =12;

    constructor(){
        this.codeWidth=3;
        this.adressWidth=5;
        this.extentionFlags  = ExtentionPresets.W;
        this.intAdressList=[1,2,3,4];


        this.onBusWidthChangedCallbacks =[];
        this.onExtensionFlagsChangedCallbacks=[];
        this.onSettingsChangedCallbacks=[];


        this.codeMask=0b11100000;
        this.adressMask==0b11111;

        this.serializer = null; //:SeralizerBase
    }

    save(){
        if(this.serializer!=null){
            this.serializer.saveToLocalStorage();
        }
    }


    addOnBusWidthChangedListener(_funk){
        this.onBusWidthChangedCallbacks.push(_funk);

    }

    invokeOnBusWidthChanged(){
        this.onBusWidthChangedCallbacks.forEach(_funk => {
            _funk(this);
        });
        this.invokeSettingsChanged();
    }


    addOnExtensionFlagsChangedListener(_funk){
        this.onExtensionFlagsChangedCallbacks.push(_funk);
    }

    invokeExtensionFlagsChanged(){
        this.onExtensionFlagsChangedCallbacks.forEach(_funk=>{
            _funk(this);
        })
        this.invokeSettingsChanged();
    }

    addOnSettingsChangedListener(_funk){
        this.onSettingsChangedCallbacks.push(_funk);
    }

    invokeSettingsChanged(){
        this.onSettingsChangedCallbacks.forEach(_funk=>{
            _funk(this);
        })
    }


    

    setupValues(_setingsData){

        if(_setingsData.hasOwnProperty("codeWidth")&&_setingsData.hasOwnProperty("adressWidth")){
            this.setBusWidth(_setingsData.codeWidth,_setingsData.adressWidth);
        }

        if(_setingsData.hasOwnProperty("extensionData")){
            //console.log(_setingsData.extensionData);
            const flags =MachineExtensionData.prototype.getFlags.call(_setingsData.extensionData)
            this.setExtentionFlags(flags);
        }
        
        if(_setingsData.hasOwnProperty("intAdressList")){
            this.intAdressList = _setingsData.intAdressList;
        }
        
    }

    getDataObject(){
        return new SettingsData(
            this.codeWidth,
            this.adressWidth,
            this.extentionFlags,
            this.intAdressList
        )
    }

    setExtentionFlags(_flags){
        this.extentionFlags  = _flags;
        this.save();
        this.invokeExtensionFlagsChanged();
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
        this.save();
        this.invokeOnBusWidthChanged();
    }



    getOpcode(_value){
        const masked = (_value&this.codeMask)
        return masked>>this.adressWidth;
    }


}


export class SettingsData{

    constructor(_codeWidth,_adressWidth,_extentionFlags,_intAdressList){
        this.codeWidth=_codeWidth;
        this.adressWidth=_adressWidth;
        this.extensionData = new MachineExtensionData(_extentionFlags);
        this.intAdressList = _intAdressList;
    }


    static getDefault(){
        return new SettingsData(
            4,
            5,
            ExtentionPresets.W,
            [1,2,3,4]
            );
    }
    
}



import { ExtentionPresets,ExecutionMode, AlertStyleEnum } from "./enums.js";
import Terminator from "./terminator.js";
import SettingsSerializer from "./settings-serializer.js";
import MachineExtensionData from "./machine-extension-data.js";
import Alerter from "./alerter.js";
import Translator from "./translator.js";




export default class Settings{

    static MinCodeWidth = 0;
    static MinAddresWidth=0;
    static MaxCodeWidth  = 8;
    static MaxAddresWidth =12;

    static MinCyclesBeetwenUpdate=1;
    static MaxCyclesBeetwenUpdate=9999999;

    constructor(){
        this.codeWidth=3;
        this.adressWidth=5;
        this.extentionFlags  = ExtentionPresets.W;
        this.intAdressList=[1,2,3,4];

        this.cyclesBeetwenUpdate=1000;
        this.executionMode = ExecutionMode.Cycle;


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
    }


    addOnExtensionFlagsChangedListener(_funk){
        this.onExtensionFlagsChangedCallbacks.push(_funk);
    }

    invokeExtensionFlagsChanged(){
        this.onExtensionFlagsChangedCallbacks.forEach(_funk=>{
            _funk(this);
        })
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
            try {
                const flags= MachineExtensionData.prototype.getFlags.call(_setingsData.extensionData)
                this.setExtentionFlags(flags);
            } catch (error) {
                Alerter.sendMessage(error.message,AlertStyleEnum.InputError);
            }
            
           
        }
        
        if(_setingsData.hasOwnProperty("intAdressList")){
            this.intAdressList = _setingsData.intAdressList;
        }

        if(_setingsData.hasOwnProperty("executionMode")){
            this.executionMode=_setingsData.executionMode;
        }

        if(_setingsData.hasOwnProperty("cyclesBeetwenUpdate")){
            this.cyclesBeetwenUpdate=_setingsData.cyclesBeetwenUpdate;
        }

        this.save();
        this.invokeSettingsChanged();
    }

    getDataObject(){
        return new SettingsData(
            this.codeWidth,
            this.adressWidth,
            this.extentionFlags,
            this.intAdressList,
            //this.executionMode,
            //this.cyclesBeetwenUpdate,
        )
    }

    setExtentionFlags(_flags){
        this.extentionFlags  = _flags;
        //Terminator.terminate();
        this.save();
        this.invokeExtensionFlagsChanged();
    }



    getWordMask(){
        return this.codeMask|this.adressMask;
    }
    getWordWidth(){
        return this.codeWidth+this.adressWidth;
    }


    setInteruptAddreses(_intArray){
        if(Array.isArray(_intArray)==false||_intArray.length<4){
            throw Error(Translator.getTranslation("_input_err_too_few_ints","Expected array with 4 interupt addreses"))
        }
        //validae
        for (let i = 0; i < 4; i++) {
            const v = _intArray[i];
            if(isNaN(v)||v<0){
                throw Error(Translator.getTranslation("_input_err_invalid_data","Invalid input data."))
            }
        }

        for (let i = 0; i < 4; i++) {
            this.intAdressList[i] = _intArray[i];

        }

    }


    setBusWidth(_codeWidth,_adressWidth){


        if (isNaN(_codeWidth)||isNaN(_adressWidth)){
            throw Error(Translator.getTranslation("_input_err_invalid_data","Invalid input data."))
        }

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

    setExecutionMode(_newMode){
        this.executionMode=_newMode;
        this.save();
        this.invokeSettingsChanged();
    }

    setPerformanceSettings( _cyclesBeetwen){

        if(isNaN(_cyclesBeetwen)){
            throw(new Error(Translator.getTranslation("_input_err_invalid_data","Invalid input data.")))
        }

        _cyclesBeetwen = Math.min(Math.max(_cyclesBeetwen,Settings.MinCyclesBeetwenUpdate),Settings.MaxCyclesBeetwenUpdate)

        this.cyclesBeetwenUpdate=_cyclesBeetwen;

        this.save();
        this.invokeSettingsChanged();

    }



    getOpcode(_value){
        const masked = (_value&this.codeMask)
        return masked>>this.adressWidth;
    }


}


export class SettingsData{



    constructor(_codeWidth,_adressWidth,_extentionFlags,_intAdressList,_executionMode,_cyclesBeetwen){
        this.codeWidth=_codeWidth;
        this.adressWidth=_adressWidth;
        this.extensionData = new MachineExtensionData(_extentionFlags);
        this.intAdressList = _intAdressList;
        if(_executionMode)this.executionMode = _executionMode;
        if(_cyclesBeetwen) this.cyclesBeetwenUpdate=_cyclesBeetwen;
    }


    static getDefault(){
        return new SettingsData(
            3,
            5,
            ExtentionPresets.W,
            [1,2,3,4],
            ExecutionMode.Cycle,
            1000
            );
    }
    
}



import MachineComponent from "./machine-component.js";
import Alerter from "./alerter.js"
import Translator from "./translator.js";


export default class Mamory extends MachineComponent{

    constructor(_settings){

        super();


        const arrayLength = 1<<(_settings.adressWidth);

        this.settings = _settings;
        this.values= new Array(arrayLength);
        this.activeFlag = false;

        for (let index = 0; index < this.values.length; index++) {
            this.values[index]=0;
            
        }

        this.onValueChangedCalbacks = [];
        this.onMemoryChangedCallbacks=[];
        this.onResizedCallbacks={};

    }

    resetState(){
        this.activeFlag = false;
    }

    length(){
        return this.values.length;
    }

    getValue(_adress){
        return this.values[_adress];
    }
    setValue(_adress,_value){


        if(_adress>= this.values.length||_adress<0){
            Alerter.alert(Translator.getTranslation(
                "_alert_memory_out_of_bounds",
                "Address is out of memory bounds!"
            ));
        }else{
            this.values[_adress] =_value&this.settings.getWordMask();
            this.valueChanged(_adress);
        }
    }

    addOnValueChangedCallback(_funk){
        this.onValueChangedCalbacks.push(_funk);
    }

    valueChanged(_index){
        this.onValueChangedCalbacks.forEach(funk => {
            funk(this,_index);
        });
    }

    addOnMemoryChangedCallback(_funk){
        this.onMemoryChangedCallbacks.push(_funk);
    }

    meomoryChanged(){

        this.onMemoryChangedCallbacks.forEach(funk => {
            funk(this);
        });

    }



    setDefault(){
        for (let index = 0; index < this.values.length; index++) {
            this.values[index]=0;
            
        }
    }

    onBusWidthChanged(_settings){
        this.resize(_settings.adressWidth,_settings.getWordMask());
    }


    resize(_adressWidth,_wordMask){

        const arrayLength = 1<<(_adressWidth);
        let tmp = new Array(arrayLength);

        if(_wordMask==null){
            _wordMask=-1;
        }


        for (let index = 0; index < tmp.length; index++) {
            tmp[index]=0;
            
        }

        for (let index = 0; index < this.values.length; index++) {

            if(index >= tmp.length){
                break;
            }

            tmp[index] = (this.values[index])&_wordMask;
            
        }
        delete this.values;
        this.values = tmp;
        this.meomoryChanged();

    }


    read(_adress){
        if(this.activeFlag){
            Alerter.alert(Translator.getTranslation(
                "_alert_memory_active",
                "Memory is active already!"
            ))
        }
        this.activeFlag=true;
        
        return this.getValue(_adress);

    }

    write(_adress,_value){

        if(this.activeFlag){
            Alerter.alert(Translator.getTranslation(
                "_alert_memory_active",
                "Memory is active already!"
            ))
        }
        this.activeFlag=true;


        this.setValue(_adress,_value);

    }

    loadMemory(_newValues){
        for (let index = 0; index < _newValues.length; index++) {
            const element = _newValues[index];
            
            if(index>=this.values.length){
                break;
            }

            this.values[index] = element;

        }
        this.meomoryChanged();
    }


}
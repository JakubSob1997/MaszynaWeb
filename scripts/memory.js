
import MachineComponent from "./machine-component.js";
import Alerter from "./alerter.js"


export default class Mamory extends MachineComponent{

    constructor(_settings){

        super();


        const arrayLength = 1<<(_settings.adressWidth);

        this.settings = _settings;
        this.values= new Array(arrayLength);

        for (let index = 0; index < this.values.length; index++) {
            this.values[index]=0;
            
        }

        this.onValueChangedCalbacks = [];
        this.onMemoryChangedCallbacks=[];
        this.onResizedCallbacks={};

    }


    length(){
        return this.values.length;
    }

    getValue(_adress){
        return this.values[_adress];
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
        this.resize(_settings.adressWidth);
    }


    resize(_adressWidth){

        const arrayLength = 1<<(_adressWidth);
        let tmp = new Array(arrayLength);


        for (let index = 0; index < tmp.length; index++) {
            tmp[index]=0;
            
        }

        for (let index = 0; index < this.values.length; index++) {

            if(index >= tmp.length){
                break;
            }

            tmp[index] = this.values[index];
            
        }
        delete this.values;
        this.values = tmp;
        this.meomoryChanged();

    }


    read(_adress){
        //console.log(this.values);
        if(_adress>= this.values.length||_adress<0){
            Alerter.alert("Memory out of bounds.");
        }else{
            return this.values[_adress]&this.settings.getWordMask();
        }
    }

    write(_adress,_value){
        if(_adress>= this.values.length||_adress<0){
            Alerter.alert("Memory out of bounds.");
        }else{
            this.values[_adress] =_value&this.settings.getWordMask();
            this.valueChanged(_adress);
        }
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
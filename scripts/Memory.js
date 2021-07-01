




class Mamory extends MachineComponent{

    constructor(_adressWidth){

        super();

        const arrayLength = 1<<(_adressWidth);

        this.values= new Array(arrayLength);

        for (let index = 0; index < this.values.length; index++) {
            this.values[index]=0;
            
        }

        console.log(this.values);

    }

    setDefault(){
        for (let index = 0; index < this.values.length; index++) {
            this.values[index]=0;
            
        }
    }

    resetState(){

    }


    resize(_adressWidth){

        arrayLength = 1<<(_adressWidth);
        tmp = new Array(arrayLength);


        for (let index = 0; index < tmp.length; index++) {
            values[index]=0;
            
        }

        for (let index = 0; index < this.values.length; index++) {

            if(index >= tmp.length){
                break;
            }

            tmp[index] = this.values[index];
            
        }
        delete this.values;
        this.values = tmp;


    }


    read(_adress){
        //console.log(this.values);
        if(_adress>= this.values.length||_adress<0){
            Alerter.alert("Memory out of bounds.");
        }else{
            return this.values[_adress];
        }
    }

    write(_adress,_value){
        if(_adress>= this.values.length||_adress<0){
            Alerter.alert("Memory out of bounds.");
        }else{
            this.values[_adress] =_value;
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
    }


}





class Mamory{

    constructor(_adressWidth){
        const arrayLength = 1<<(_adressWidth);
        this.values= new Array(arrayLength);
    }

    resetState(){

    }


    resize(_adressWidth){

        arrayLength = 1<<(_adressWidth);
        tmp = new Array(arrayLength);

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
        if(_adress>= this.values||_adress<0){
            Alerter.alert("Memory out of bounds.");
            return 0;
        }else{
            return this.values[_adress];
        }
    }

    write(_adress,_value){
        if(_adress>= this.values||_adress<0){
            Alerter.alert("Memory out of bounds.");
        }else{
            this.values[_adress] =_value;
        }
    }




}
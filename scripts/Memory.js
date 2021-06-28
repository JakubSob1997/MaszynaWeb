




class Mamory{

    constructor(_adressWidth){
        const arrayLength = 1<<(_adressWidth);

        this.values= new Array(arrayLength);
        console.log(this.values);

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
        //console.log(this.values);
        if(_adress>= this.values.length||_adress<0){
            Alerter.alert("Memory out of bounds.");
        }else{
            console.log(_adress+this.values[_adress]);
            return this.values[_adress];
        }
    }

    write(_adress,_value){
        if(_adress>= this.values.length||_adress<0){
            Alerter.alert("Memory out of bounds.");
        }else{
            this.values[_adress] =_value;
        }
        console.log(this.values);
    }




}
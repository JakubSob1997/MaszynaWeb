
/*
    Abstract prototype 
*/

export default class IODriver{


    

    write(){
        console.log("(write to device)overide me")
        return 0;
    }

    read(_value){
        console.log("(read from device)overide me")
        //this.something = _value;
    }

    confirm(){
        console.log("(io operation performed succesfuly)overide me")
        //this.flag = true
    }


}


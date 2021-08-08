


export default class IODriver{


    getDevice(_adress){
        console.log("overide me")
        return null;
    }

    init(_adress){
        console.log("overide me")
        let device = this.getDevice(_adress);
        if(device==null){
            console.log("no device under adress me")
            return;
        }
        device.start(this);
        //this.flag=0
    }

    write(){
        console.log("overide me")
        return 0;
    }

    read(_value){
        console.log("overide me")
        //this.something = _value;
    }

    confirm(){
        console.log("overide me")
        //this.flag = 1
    }


}


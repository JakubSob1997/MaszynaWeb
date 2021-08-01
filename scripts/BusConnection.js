


class BusConnection extends MachineComponent{
    constructor(){
        super();

        this.referenceRegister=null;
        this.connectedBusses = [];
        
        this.hasConnection=false;
        this.onUpdateCallbacks = [];


    }

    resetState(){
        this.connectedBusses=[];
        this.referenceRegister=null;
        this.hasConnection=false;
    }

    getExtention(){return ExtnensionFlags.BusConnection}

    addBusToConnection(_bus){
        this.connectedBusses.push(_bus);
    }

    addOnUpdateCallback(_funk){
        this.onUpdateCallbacks.push(_funk);
    }

    update(){
        if(this.onUpdateCallbacks!=null){
            this.onUpdateCallbacks.forEach(element => {
                element(this);
            });
        }
        
    }

    linkBusses(){

        this.referenceRegister = null;
        for (let i = 0; i < this.connectedBusses.length; i++) {
            const bus = this.connectedBusses[i];
            if(bus.referenceRegister!=null){
                if( this.referenceRegister==null){
                    this.referenceRegister=bus.referenceRegister;
                }else{
                    Alerter.alert("Both connected busses active");
                    return;
                }
            }
        }

        this.hasConnection = this.referenceRegister!=null;
        this.update(this);

        for (let i = 0; i < this.connectedBusses.length; i++) {
            const bus = this.connectedBusses[i];
            if(bus.referenceRegister==null){
                bus.setSourceRegister(this.referenceRegister);
            }
            
        }


  

    }



    hasValue(){
        return  this.hasConnection;
    }



    
}










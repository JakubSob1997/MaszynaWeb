

import MachineComponent from "./machine-component.js";
import Alerter from "./alerter.js"
import { ExtnensionFlags } from "./enums.js";

export default class BusConnection extends MachineComponent{
    constructor(_busArray){
        super();

        this.referenceRegister=null;
        this.connectedBusses = _busArray;
        
        this.hasConnection=false;
        this.onUpdateCallbacks = [];
        this.isaActive=false;
        this.busMask=0;;

    }

    resetState(){
        this.referenceRegister=null;
        this.hasConnection=false;
        this.isaActive=false;
        this.busMask=0;
    }

    getExtention(){return ExtnensionFlags.BusConnection}

    activateConnection(){
        this.isaActive=true;
    }

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

        if(this.isaActive==false){
            this.update(this);
            return;
        }

        this.referenceRegister = null;
        for (let i = 0; i < this.connectedBusses.length; i++) {
            const bus = this.connectedBusses[i];
            if(bus.referenceRegister!=null){
                if( this.referenceRegister==null){
                    this.referenceRegister=bus.referenceRegister;
                    this.busMask=bus.busMask;
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
                bus.setTmpMask(this.busMask);
            }
            
        }


  

    }



    hasValue(){
        return  this.hasConnection;
    }



    
}










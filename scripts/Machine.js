




class Machine{


    constructor(){
        this.manualControll=false;


        this.singnalDictionary={};
        this.slectedImpulseSignals={};
        this.selectedLongSignals={};

        this.machineComponents=[];
        this.buses=[];

        this.controllUnit={};

        this.instructionList;
        this.settings;

    }



    addSignalToDictioanry(_signal){
        this.singnalDictionary[_signal.name] = _signal;
    }

    hasSignal(_signalName){
        return this.singnalDictionary.hasOwnProperty(_signalName);
    }

    selectSignal(_signalName){

        if(this.singnalDictionary.hasOwnProperty(_signalName)){
            let signal= this.singnalDictionary[_signalName];
            if(signal.isImpulse){
                this.slectedImpulseSignals[_signalName] =signal;
            }else{
                this.selectedLongSignals[_signalName] =signal;
            }
            signal.update();
        }else{
            Alerter.alert("Undefined signal "+ _signalName);
        }

    }

    deSelectSignal(_signalName){

        if(this.singnalDictionary.hasOwnProperty(_signalName)){
            let signal= this.singnalDictionary[_signalName];
            if(signal.isImpulse){
                delete this.slectedImpulseSignals[_signalName];
            }else{
                delete this.selectedLongSignals[_signalName];
            }
            signal.update();
        }else{
            Alerter.alert("Undefined signal "+ _signalName);
        }

    }

    isSignalSelected(_signalName){
        if(this.singnalDictionary.hasOwnProperty(_signalName)){
            let signal= this.singnalDictionary[_signalName];
            if(signal.isImpulse){
                return this.slectedImpulseSignals.hasOwnProperty(_signalName);
            }else{
                return this.selectedLongSignals.hasOwnProperty(_signalName);
            }
        }else{
            //Alerter.alert("Undefined signal "+ _signalName);
            return false;
        }
    }


    clearSignals(){


        for(const signal in this.selectedLongSignals){
            let sig = this.selectedLongSignals[signal];
            delete this.selectedLongSignals[signal];
            sig.update();

        }

        for(const signal in this.slectedImpulseSignals){
            let sig = this.slectedImpulseSignals[signal];
            delete this.slectedImpulseSignals[signal];
            sig.update();
        }
        
        this.selectedLongSignals={};
        this.slectedImpulseSignals={};
    }

    selectSignals(_signalNames){
        _signalNames.forEach(signal => {
            this.selectSignal(signal);
        });
    }

    setComponentsDefault(){
        this.machineComponents.forEach(element => {
            element.setDefault();
        });
    }

    onBusWidthChanged(_settings){
        this.machineComponents.forEach(element => {
            element.onBusWidthChanged(_settings);
        });
    }
    
    doCycle(){

        this.machineComponents.forEach(element => {
            element.resetState();
        });
        

        if(this.manualControll==false){
            this.clearSignals();
            this.controllUnit.selectSinalsForCycle(this,this.instructionList,this.settings);
        }


        for(const signal in this.selectedLongSignals){
            this.selectedLongSignals[signal].onSignal(this);

        }

        this.buses.forEach(bus=>{
            bus.bufferValueForInpulse();
        });

        for(const signal in this.slectedImpulseSignals){
            this.slectedImpulseSignals[signal].onSignal(this);
            
        }
    }


    doInstruction(){
        if(this.manualControll == true){
            return;
        }

        do {
            this.doCycle();
        } while (this.controllUnit.nextInstructionFlag==false);

    }

}
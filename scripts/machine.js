

import Alerter from "./alerter.js";
import { AlertStyleEnum } from "./enums.js";
import InstructionList from "./instruction-list.js";
import Terminator from "./terminator.js";


async function runCycleNonBlocking(_exitCondition,_Machine,_delay){
    _Machine.doCycle();
    if(_exitCondition(_Machine)==false){
        setTimeout(()=>{runCycleNonBlocking(_exitCondition,_Machine,_delay);},_delay); 
    }
    
}

async function runSingleInstructionAsync(_Machine){

}

export function runMachineNonBlocking(_Machine){
    _Machine.wasTerminated=false;


    /*
    while(_Machine.wasTerminated==false){
        _Machine.doCycle();
    }

    */
    
    runCycleNonBlocking((_M)=>{
        return _M.wasTerminated==true;
    },_Machine,0);
    
}








export default class Machine{


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

        this.onManualToggleCallbacks = [];
        this.wasTerminated=false;


        if(Terminator!=null){
            Terminator.addTerminable(this);
        }

    }

    onTerminate(){
        if(this.wasTerminated==false){
            Alerter.sendMessage("Maszyna została zatrzymana!",AlertStyleEnum.ExecutionFlow)
            this.wasTerminated=true;
        }
    }



    resetInternalState(){
        this.clearSignals();
        this.resetComponetsState();
        this.updateComponents();
        this.controllUnit.setDefault();
    }

    addOnManualToggleCallback(_funk){
        this.onManualToggleCallbacks.push(_funk);
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

    selectSignalManual(_siganlName){
        this.selectSignal(_siganlName);
    }
    deSelectSignalManual(_siganlName){
        this.deSelectSignal(_siganlName)
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
    


    resetComponetsState(){
        this.machineComponents.forEach(element => {
            element.resetState();
        });
    }
    updateComponents(){
        this.machineComponents.forEach(element => {
            element.update();
        });
    }

    doCycle(){

        this.resetComponetsState();
        

        if(this.manualControll==false){
            this.clearSignals();
            this.controllUnit.selectSinalsForCycle(this,this.instructionList,this.settings);
        }


        for(const signal in this.selectedLongSignals){
            this.selectedLongSignals[signal].onSignal(this);

        }

        if(this.AS_bus!=undefined){
            this.AS_bus.linkBusses();
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


    setSettings(_settingsSerializer){
        this.settings.setupValues(_settingsSerializer);
    }
    setInstructionList(_instructionListSerializer){
        if(this.instructionList==undefined){
            this.instructionList=new InstructionList()
        }
        this.instructionList.setupValues(_instructionListSerializer);
        console.log(this.instructionList);
    }


    toggleManualMode(){
        
        
        this.resetInternalState();

        this.manualControll= !this.manualControll;

        this.onManualToggleCallbacks.forEach(funk => {
            funk(this.manualControll);
        });

        return this.manualControll;
    }

}
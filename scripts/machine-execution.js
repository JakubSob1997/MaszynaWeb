
import { ExecutionMode } from "./enums.js";



export function runMachine(_Machine){

    _Machine.wasTerminated=false;
    for (let i = 0; i < _Machine.settings.pseudoThreads; i++) {
        setTimeout(()=>{runMachineBySetting(_Machine),0});
    }

    
}

export function runSingleInstruction(_Machine){

}

export function runCycle(_Machine){
    _Machine.doCycle();
}



function runMachineBySetting(_M){

    const mode = _M.settings.executionMode;

    if(mode  === ExecutionMode.Cycle){

        if(_M.wasTerminated==true)return;
        _M.doCycle();

    }else if(mode===ExecutionMode.Instruction){

        let cyclesRemaining = _M.settings.cyclesBeetwenUpdate;
        do {
            if(_M.wasTerminated==true)return;
            _M.doCycle();
            cyclesRemaining--;
        } while (_M.isNewInstruction()===false ||cyclesRemaining>0);


    }else if(mode===ExecutionMode.Program){
        let cyclesRemaining = _M.settings.cyclesBeetwenUpdate;
        console.log(cyclesRemaining);
        do {
            if(_M.wasTerminated==true)return;
            _M.doCycle();
            cyclesRemaining--;
        } while (cyclesRemaining>0);

    }
    setTimeout(()=>{runMachineBySetting(_M);},0); 
}



function runMachineBlocking(_Machine){
    _Machine.wasTerminated=false;
      
    while(_Machine.wasTerminated==false){
        _Machine.doCycle();
    }
    
}

function runMachineNonBlocking(_Machine){
    _Machine.wasTerminated=false;

    runCycleNonBlocking((_M)=>{
        return _M.wasTerminated==true;
    },_Machine,0);
    
}


function runCycleNonBlocking(_exitCondition,_Machine,_delay){
    if(_exitCondition(_Machine)==true)return;
    _Machine.doCycle();
    setTimeout(()=>{runCycleNonBlocking(_exitCondition,_Machine,_delay);},_delay); 

    
}





















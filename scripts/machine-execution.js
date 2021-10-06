
import { ExecutionMode } from "./enums.js";
import Terminator from "./terminator.js";



export function runMachine(_Machine){

    if(_Machine.isRunning()==false){
        _Machine.startMachine();
        setTimeout(()=>{runMachineBySetting(_Machine),0});
    }
    

    
}

export function runSingleInstruction(_Machine){

    if(_Machine.isRunning()==false){
        _Machine.startMachine();
        runInstructionNonBlocking(_Machine);
    }
    
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
            console.log(_M.isNewInstruction())
        } while (_M.isNewInstruction()===false &&cyclesRemaining>0);


    }else if(mode===ExecutionMode.Program){
        let cyclesRemaining = _M.settings.cyclesBeetwenUpdate;
        do {
            if(_M.wasTerminated==true)return;
            _M.doCycle();
            cyclesRemaining--;
        } while (cyclesRemaining>0);

    }
    setTimeout(()=>{runMachineBySetting(_M);},0); 
}


function runInstructionNonBlocking(_M){

    const mode = _M.settings.executionMode;

    if(mode  === ExecutionMode.Cycle){

        if(_M.wasTerminated==true)return;
        _M.doCycle();
        if(_M.isNewInstruction()){
            _M.stopMachine();
        }

    }else if(mode===ExecutionMode.Instruction||mode===ExecutionMode.Program){

        let cyclesRemaining = _M.settings.cyclesBeetwenUpdate;
        do {
            if(_M.wasTerminated==true)return;
            _M.doCycle();
            if(_M.isNewInstruction()){
                _M.stopMachine();
            }
            cyclesRemaining--;
        } while (cyclesRemaining>0);


    }
    setTimeout(()=>{runInstructionNonBlocking(_M);},0); 
}



















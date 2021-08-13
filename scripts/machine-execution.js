




export function runMachine(_Machine){
    runMachineNonBlocking(_Machine);
}

export function runSingleInstruction(_Machine){

}

export function runCycle(_Machine){

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

function runSingleInstructionAsync(_Machine){

}




















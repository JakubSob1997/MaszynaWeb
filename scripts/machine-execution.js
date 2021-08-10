




export function runMachine(_Machine){
    runMachineNonBlocking(_Machine);
}









function runCycleNonBlocking(_exitCondition,_Machine,_delay){
    _Machine.doCycle();
    if(_exitCondition(_Machine)==false){
        setTimeout(()=>{runCycleNonBlocking(_exitCondition,_Machine,_delay);},_delay); 
    }
    
}

function runSingleInstructionAsync(_Machine){

}



function runMachineNonBlocking(_Machine){
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





















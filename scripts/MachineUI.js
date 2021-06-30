
//NWD
//Labels
let a=14;
let b=15;
let stop = 12;
let aMinusB = 0;
let bMinusA = 6;


MEM.values[0]=(0b011<<5)+a; //aMinusB: POB a
MEM.values[1]=(0b010<<5)+b; // ODE b
MEM.values[2]=(0b111<<5)+stop; // SOZ koniec
MEM.values[3]=(0b110<<5)+bMinusA; // SOM bMinusA
MEM.values[4]=(0b100<<5)+a;//LAD a
MEM.values[5]=(0b101<<5)+aMinusB+1; // SOB aMinusB+1

MEM.values[6]=(0b011<<5)+b; //bMinusA: POB b
MEM.values[7]=(0b010<<5)+a; // ODE a
MEM.values[8]=(0b111<<5)+stop; // SOZ koniec
MEM.values[9]=(0b110<<5)+aMinusB; // SOM bMinusA
MEM.values[10]=(0b100<<5)+b;//LAD b
MEM.values[11]=(0b101<<5)+bMinusA+1; // SOB aMinusB+1

MEM.values[12]=(0b011<<5)+a;//POB a
MEM.values[13]=0; //STP 0 

MEM.values[14]=23; //a:RST 15
MEM.values[15]=69; //b: RST 9




var codeTextArea = document.getElementById("code-textarea");
var loadCodeButton = document.getElementById("load-code-button");
//codeTextArea.value="";

loadCodeButton.onclick = ()=>{
    console.log(codeTextArea.value);
}




var visuals =[];

function resetVisuals(){
    visuals.registers.forEach(register => {
        if(register!=null){
            register.classList.remove("register-selected");
        }
    });
}


let nextCycleButton = document.getElementById("next-cycle-button");

nextCycleButton.onclick=function(){

    
    resetVisuals();
    Machine.doCycle();
    
}
    



var AK_Reg_UI = document.getElementById("ak-register");
var S_Reg_UI = document.getElementById("s-register");
var A_Reg_UI = document.getElementById("a-register");
var L_Reg_UI = document.getElementById("l-register");
var I_Reg_UI = document.getElementById("i-register");

visuals.registers = [AK_Reg_UI,S_Reg_UI,A_Reg_UI,L_Reg_UI,I_Reg_UI]



var A_bus_UI = document.getElementById("a-bus");
var S_bus_UI = document.getElementById("s-bus");

function busUpdate(_bus,_busUI){
    if(_bus.hasValue()){
        _busUI.classList.add("bus-selected");
    }else{
        _busUI.classList.remove("bus-selected");
    }
}

S_bus.addOnUpdateCallback(_bus=>{busUpdate(_bus,S_bus_UI)});
A_bus.addOnUpdateCallback(_bus=>{busUpdate(_bus,A_bus_UI)});


function displayRegister(_register,_registerUI){
    _registerUI.innerHTML=_register.getDisplayText();
    if(_register.wasWriten){
        _registerUI.classList.add("register-selected");
    }else{
        _registerUI.classList.remove("register-selected");
    }
}


AK_register.addOnUpdateCallback(
    _register=>{displayRegister(_register,AK_Reg_UI);}
)
S_register.addOnUpdateCallback(
    _register=>{displayRegister(_register,S_Reg_UI);}
)
A_register.addOnUpdateCallback(
    _register=>{displayRegister(_register,A_Reg_UI);}
)
L_register.addOnUpdateCallback(
    _register=>{displayRegister(_register,L_Reg_UI);}
)
I_register.addOnUpdateCallback(
    _register=>{displayRegister(_register,I_Reg_UI);}
)



var signalUIs = document.getElementsByClassName("signal");

visuals.signals = signalUIs;



for(let signalUI of signalUIs){
    signalUI.onclick =()=>{
        let id = signalUI.id;
        if(Machine.isSignalSelected(id)){
            Machine.deSelectSignal(id);
        }else{
            Machine.selectSignal(id);
        }
    };
}


function signalVisualCallback(_signal){
    const signalUI = document.getElementById(_signal.name);
    if(signalUI==null){
        return;
    }

    if(Machine.isSignalSelected(_signal.name)){
            
        signalUI.classList.add("signal-selected");
    }else{
        signalUI.classList.remove("signal-selected");
    }


}

for(const signal in singnalDictionary){
    singnalDictionary[signal].addOnUpdateCallback(signalVisualCallback);

}



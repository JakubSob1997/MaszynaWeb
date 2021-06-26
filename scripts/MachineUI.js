


var nextCycleButton = document.getElementById("next-cycle-button");
nextCycleButton.onclick(
    function(){
        Machine.doCycle();
    }
)



var AK_Reg_UI = document.getElementById("ak-register");
var S_Reg_UI = document.getElementById("s-register");
var A_Reg_UI = document.getElementById("a-register");
var L_Reg_UI = document.getElementById("l-register");
var I_Reg_UI = document.getElementById("i-register");


var displayRegister = function(_register,_registerUI){
    _registerUI.innerHTML=_register.getDisplayText();
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























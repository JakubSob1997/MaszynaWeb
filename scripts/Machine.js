

var settings = new Settings();

var MEM = new Mamory(settings.adressWidth);

var S_bus = new Bus();
var A_bus = new Bus();

var AK_register= new Register("AK");
var S_register = new Register("S");
var A_register = new Register("A");
var L_register = new Register("L");
var I_register = new Register("I");

var JAL = new ArythmeticLogicUnit(AK_register);

var MachineComponents = [
    S_bus,
    JAL,
    AK_register,
    S_register,
    A_register,
    L_register,
    I_register,
    MEM,

];
  
var Buses = [
    S_bus,
    A_bus
];



var singnalDictionary = {
    addSignal: function(_signal){
        this[_signal.name] = _signal;
    }
}


var selectedLongSignals = [];
var slectedImpulseSignals =[];

var Machine = {
    selectSignal: function(_signalName){

        if(singnalDictionary.hasOwnProperty(_signalName)){
            let signal= singnalDictionary[_signalName];
            if(signal.isImpulse){
                slectedImpulseSignals[_signalName] =signal;
            }else{
                selectedLongSignals[_signalName] =signal;
            }
        }else{
            Alerter.alert("Undefined signal "+ _signalName);
        }

    },

    deSelectSitnal: function(_signalName){

        if(singnalDictionary.hasOwnProperty(_signalName)){
            let signal= singnalDictionary[_signalName];
            if(signal.isImpulse){
                delete slectedImpulseSignals[_signalName];
            }else{
                delete selectedLongSignals[_signalName];
            }
        }else{
            Alerter.alert("Undefined signal "+ _signalName);
        }

    },



    isSignalSelected: function(_signalName){
        if(singnalDictionary.hasOwnProperty(_signalName)){
            let signal= singnalDictionary[_signalName];
            if(signal.isImpulse){
                return slectedImpulseSignals.hasOwnProperty(_signalName);
            }else{
                return selectedLongSignals.hasOwnProperty(_signalName);
            }
        }else{
            Alerter.alert("Undefined signal "+ _signalName);
            return false;
        }
    },


    doCycle : function(){
        MachineComponents.forEach(element => {
            element.resetState();
        });

        selectedLongSignals.entries.forEach(([name,signal])=>{
            signal.onSignal();
        });

        Buses.forEach(bus=>{
            bus.bufferValueForInpulse();
        });

        selectedLongSignals.entries.forEach(([name,signal])=>{
            signal.onSignal();
        });

    }

    
};




{
//Memory signals

const wea = new Signal(
    "wea",
    true,
    ()=>{A_register.write(A_bus.getValue()) ;}
)

const czyt = new Signal(
    "czyt",
    false,
    ()=>{S_register.write(MEM.read(A_register.getValue)) ;}
)

const pisz = new Signal(
    "pisz",
    false,
    ()=>{MEM.write(A_register.getValue(),S_register.getValue());}
)

const wes = new Signal(
    "wes",
    true,
    ()=>{S_register.write(S_bus.getCurrentValue()); }
)
const wys = new Signal(
    "wys",
    false,
    ()=>{S_bus.setSourceRegister(S_register)}
)


singnalDictionary.addSignal(wea);
singnalDictionary.addSignal(czyt)
singnalDictionary.addSignal(pisz)

singnalDictionary.addSignal(wes);
singnalDictionary.addSignal(wys);
}


{
//JA: signals
const weja = new Signal(
    "weja",
    false,
    ()=>{JAL.BusReference = S_bus;}
)

const przep = new Signal(
    "przep",
    false,
    ()=>{JAL.SetOperation(JALOperationEnum.PRZEP);}
)
const dod = new Signal(
    "dod",
    false,
    ()=>{JAL.SetOperation(JALOperationEnum.DOD);}
)
const ode = new Signal(
    "ode",
    false,
    ()=>{JAL.SetOperation(JALOperationEnum.ODE);}
)

const weak = new Signal(
    "weak",
    true,
    ()=>{JAL.writeOperation();}
)
const wyak = new Signal(
    "wyak",
    false,
    ()=>{S_bus.setSourceRegister(AK_register);}
)

singnalDictionary.addSignal(weja);

singnalDictionary.addSignal(przep);
singnalDictionary.addSignal(dod);
singnalDictionary.addSignal(ode);

singnalDictionary.addSignal(weak);
singnalDictionary.addSignal(wyak);
}

{
//Counter Signals
const wei = new Signal(
    "wei",
    true,
    ()=>{L_register.write(A_bus.getValue())}
)
const wyi = new Signal(
    "wyi",
    false,
    ()=>{A_bus.setSourceRegister(L_register);}
)
const il = new Signal(
    "il",
    true,
    ()=>{L_register.write(L_register.getValue()+1);}
)
singnalDictionary.addSignal(wei);
singnalDictionary.addSignal(wyi);
singnalDictionary.addSignal(il);
}


{
//Instruction signals
const wei = new Signal(
    "wei",
    true,
    ()=>{I_register.write(S_bus.getValue());}
)
const wyad = new Signal(
    "wyad",
    false,
    ()=>{A_bus.setSourceRegister(I_register);}
)
const stop = new Signal(
    "stop",
    false,
    ()=>{Alerter.alert("Define Stop Signal");}
)

singnalDictionary.addSignal(wei);
singnalDictionary.addSignal(wyad);
singnalDictionary.addSignal(stop);

}


console.log(singnalDictionary["wes"]);
console.log(singnalDictionary["wys"]);










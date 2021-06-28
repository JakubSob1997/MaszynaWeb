

var settings = new Settings();

var MEM = new Mamory(settings.adressWidth);

var S_bus = new Bus();
var A_bus = new Bus();

var AK_register= new Register("AK");
AK_register.display = 2;
AK_register.setBitWidth(4);
var S_register = new Register("S");
var A_register = new Register("A");
var L_register = new Register("L");
var I_register = new Register("I");

var JAL = new ArythmeticLogicUnit(AK_register);

var MachineComponents = [
    S_bus,
    A_bus,
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





var singnalDictionary ={}
addSignalToDictioanry= function(_signal){
    singnalDictionary[_signal.name] = _signal;
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

    deSelectSignal: function(_signalName){

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
        

        for(const signal in selectedLongSignals){
            selectedLongSignals[signal].onSignal();

        }

        Buses.forEach(bus=>{
            bus.bufferValueForInpulse();
        });

        for(const signal in slectedImpulseSignals){
            slectedImpulseSignals[signal].onSignal();
            
        }


    }

    
};




{
//Memory signals

const wea = new Signal(
    "wea",
    true,
    ()=>{A_register.writeFromBus(A_bus) ;}
)

const czyt = new Signal(
    "czyt",
    false,
    ()=>{S_register.write(MEM.read(A_register.getValue())) ;}
)

const pisz = new Signal(
    "pisz",
    false,
    ()=>{MEM.write(A_register.getValue(),S_register.getValue());}
)

const wes = new Signal(
    "wes",
    true,
    ()=>{S_register.writeFromBus(S_bus); }
)
const wys = new Signal(
    "wys",
    false,
    function(){S_bus.setSourceRegister(S_register)}
)


addSignalToDictioanry(wea);
addSignalToDictioanry(czyt)
addSignalToDictioanry(pisz)

addSignalToDictioanry(wes);
addSignalToDictioanry(wys);
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

addSignalToDictioanry(weja);

addSignalToDictioanry(przep);
addSignalToDictioanry(dod);
addSignalToDictioanry(ode);

addSignalToDictioanry(weak);
addSignalToDictioanry(wyak);



const iak = new Signal(
    "iak",
    true,
    function(){AK_register.write(AK_register.getValue()+1)}
)


const dak = new Signal(
    "dak",
    true,
    function(){AK_register.write(AK_register.getValue()-1)}
)
addSignalToDictioanry(iak);
addSignalToDictioanry(dak);


}

{
//Counter Signals
const wel = new Signal(
    "wel",
    true,
    ()=>{L_register.writeFromBus(A_bus)}
)
const wyl = new Signal(
    "wyl",
    false,
    ()=>{A_bus.setSourceRegister(L_register);}
)
const il = new Signal(
    "il",
    true,
    ()=>{L_register.write(L_register.getValue()+1);}
)
addSignalToDictioanry(wel);
addSignalToDictioanry(wyl);
addSignalToDictioanry(il);
}


{
//Instruction signals
const wei = new Signal(
    "wei",
    true,
    ()=>{I_register.writeFromBus(S_bus);}
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

addSignalToDictioanry(wei);
addSignalToDictioanry(wyad);
addSignalToDictioanry(stop);

}


console.log(singnalDictionary["wes"]);
console.log(singnalDictionary["wys"]);












var settings = new Settings();
//Instructions


let STP_inst = new Instruction("STP");
STP_inst.cycles[0] =new InstrCycle(["czyt","wys","wei","il"]);
STP_inst.cycles[1]=new InstrCycle(["stop"]);

let DOD_inst = new Instruction("DOD");
DOD_inst.cycles[0]=new InstrCycle(["czyt","wys","wei","il"]);
DOD_inst.cycles[1]=new InstrCycle(["wyad","wea"]);
DOD_inst.cycles[2]=new InstrCycle(["wyl","wea","czyt","wys","weja","dod","weak"]);

let ODE_inst = new Instruction("ODE");
ODE_inst.cycles[0]=new InstrCycle(["czyt","wys","wei","il"]);
ODE_inst.cycles[1]=new InstrCycle(["wyad","wea"]);
ODE_inst.cycles[2]=new InstrCycle(["wyl","wea","czyt","wys","weja","ode","weak"]);

let POB_inst = new Instruction("POB");
POB_inst.cycles[0]=new InstrCycle(["czyt","wys","wei","il"]);
POB_inst.cycles[1]=new InstrCycle(["wyad","wea"]);
POB_inst.cycles[2]=new InstrCycle(["wyl","wea","czyt","wys","weja","przep","weak"]);


let LAD_inst = new Instruction("LAD");
LAD_inst.cycles[0]=new InstrCycle(["czyt","wys","wei","il"]);
LAD_inst.cycles[1]=new InstrCycle(["wyad","wea","wyak","wes"]);
LAD_inst.cycles[2]=new InstrCycle(["pisz","wyl","wea"]);

let SOB_inst = new Instruction("SOB");
SOB_inst.cycles[0]=new InstrCycle(["czyt","wys","wei","il"]);
SOB_inst.cycles[1]=new InstrCycle(["wyad","wel","wea"]);


let SOM_inst =  new Instruction("SOM");
SOM_inst.cycles[0]=new InstrCycle(["czyt","wys","wei","il"]);
SOM_inst.cycles[1]=new InstrCycle(["wyl","wea"])
SOM_inst.cycles[1].isFinal=true;
SOM_inst.cycles[1].branchCondtions = [new BranchCondition("Z",2)];
SOM_inst.cycles[2]=new InstrCycle(["wyad","wea","wel"]);

let SOZ_inst =  new Instruction("SOZ");
SOZ_inst.cycles[0]=new InstrCycle(["czyt","wys","wei","il"]);
SOZ_inst.cycles[1]=new InstrCycle(["wyl","wea"])
SOZ_inst.cycles[1].isFinal=true;
SOZ_inst.cycles[1].branchCondtions = [new BranchCondition("ZAK",2)];
SOZ_inst.cycles[2]=new InstrCycle(["wyad","wea","wel"]);



let instrArray=[];
instrArray.push(STP_inst); //000
instrArray.push(DOD_inst); //001
instrArray.push(ODE_inst); //010
instrArray.push(POB_inst); //011
instrArray.push(LAD_inst); //100
instrArray.push(SOB_inst); //101
instrArray.push(SOM_inst); //110
instrArray.push(SOZ_inst); //111


instructionList=new InstructionList(instrArray);



var MEM = new Mamory(settings.adressWidth);



var S_bus = new Bus();
var A_bus = new Bus();

var AK_register= new Register("AK");
var S_register = new Register("S");
var A_register = new Register("A");
var L_register = new Register("L");
var I_register = new Register("I");

AK_register.display = RegisterDisplayEnum.SignedDecimal;


AK_register.busMatchRule = MatchRegisterWidthEnum.ToWord;
S_register.busMatchRule = MatchRegisterWidthEnum.ToWord;
A_register.busMatchRule = MatchRegisterWidthEnum.ToAdress;
L_register.busMatchRule = MatchRegisterWidthEnum.ToAdress;
I_register.busMatchRule = MatchRegisterWidthEnum.ToWord;




var JAL = new ArythmeticLogicUnit(AK_register);
var flagUnit = new FlagsUnit(AK_register);
var CntrlUnit = new ControllUnit(I_register,flagUnit);




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


settings.onBusWidthChanged = function(_settings){
    MachineComponents.forEach(element => {
        element.onBusWidthChanged(_settings);
    });
}


settings.setBusWidth(3,5);



var singnalDictionary ={}
addSignalToDictioanry= function(_signal){
    singnalDictionary[_signal.name] = _signal;
}


var selectedLongSignals = [];
var slectedImpulseSignals =[];






var Machine = {

    manualControll: false,




    selectSignal: function(_signalName){

        if(singnalDictionary.hasOwnProperty(_signalName)){
            let signal= singnalDictionary[_signalName];
            if(signal.isImpulse){
                slectedImpulseSignals[_signalName] =signal;
            }else{
                selectedLongSignals[_signalName] =signal;
            }
            signal.update();
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
            signal.update();
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


    clearSignals: function(){


        for(const signal in selectedLongSignals){
            let sig = selectedLongSignals[signal];
            delete selectedLongSignals[signal];
            sig.update();

        }

        for(const signal in slectedImpulseSignals){
            let sig = slectedImpulseSignals[signal];
            delete slectedImpulseSignals[signal];
            sig.update();
        }
        
        selectedLongSignals=[];
        slectedImpulseSignals=[];
    },

    selectSignals: function(_signalNames){
        _signalNames.forEach(signal => {
            this.selectSignal(signal);
        });
    },

    setComponentsDefault: function(){
        MachineComponents.forEach(element => {
            element.setDefault();
        });
    },
    
    doCycle : function(){

        MachineComponents.forEach(element => {
            element.resetState();
        });
        

        if(this.manualControll==false){
            this.clearSignals();
            CntrlUnit.doCycle(this,this.instructionList,settings);
        }


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


Machine.settings = settings;
Machine.instructionList = instructionList;


//Flags

// AK==0
flagUnit.addFlag(
    new ConditionFlag("ZAK",
        (_flagUnit)=>{
            return _flagUnit.AK_register.getValue()==0;
        }
    )
)

// AK sign bit is 1
flagUnit.addFlag(
 new ConditionFlag("Z",
    (_flagUnit)=>{
        return _flagUnit.AK_register.getSignBit()!=0;
    }
 )
)





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
    ()=>{Alerter.alert("Program Is Stoped");}
)

addSignalToDictioanry(wei);
addSignalToDictioanry(wyad);
addSignalToDictioanry(stop);

}












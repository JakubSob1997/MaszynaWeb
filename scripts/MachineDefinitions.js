

M=new Machine();
buildMachine(M);

M.settings.setBusWidth(4,6);
console.log(M);

//Instructions


function getDefaultInstructionList(){
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


    return new InstructionList(instrArray);
}



function setupFlagUnit(_flagUnit){
    

    //Flags
    // AK==0
    _flagUnit.addFlag(
        new ConditionFlag("ZAK",
            (_Machine)=>{
                return _Machine.AK_register.getValue()==0;
            }
        )
    )

    // AK sign bit is 1
    _flagUnit.addFlag(
        new ConditionFlag("Z",
            (_Machine)=>{
                return _Machine.AK_register.getSignBit()!=0;
            }
        )
    )
}


function buildMachine(_Machine){


    let S_bus = new Bus();
    let A_bus = new Bus();
    _Machine.S_bus=S_bus;
    _Machine.A_bus=A_bus;

    let MEM = new Mamory(0);
    _Machine.MEM = MEM;

    let AK_register= new Register("AK");
    let S_register = new Register("S");
    let A_register = new Register("A");
    let L_register = new Register("L");
    let I_register = new Register("I");

   


    AK_register.display = RegisterDisplayEnum.SignedDecimal;


    AK_register.busMatchRule = MatchRegisterWidthEnum.ToWord;
    S_register.busMatchRule = MatchRegisterWidthEnum.ToWord;
    A_register.busMatchRule = MatchRegisterWidthEnum.ToAdress;
    L_register.busMatchRule = MatchRegisterWidthEnum.ToAdress;
    I_register.busMatchRule = MatchRegisterWidthEnum.ToWord;

    _Machine.AK_register=AK_register;
    _Machine.S_register=S_register;
    _Machine.A_register=A_register;
    _Machine.L_register=L_register;
    _Machine.I_register=I_register;

    let JAL = new ArythmeticLogicUnit(AK_register);
    let flagUnit = new FlagsUnit(AK_register);
    setupFlagUnit(flagUnit);

    let CntrlUnit = new ControllUnit(I_register,flagUnit);


    _Machine.controllUnit=CntrlUnit;
    _Machine.JAL=JAL
    _Machine.flagUnit=flagUnit;
        
    let machineComponents = [
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
    _Machine.machineComponents= machineComponents;

    
    let buses = [
        S_bus,
        A_bus
    ];

    _Machine.buses = buses;
    
    _Machine.settings = new Settings();
    _Machine.settings.onBusWidthChanged =(_set)=>{ _Machine.onBusWidthChanged(_set)};
    
    _Machine.settings.setBusWidth(3,5);


    _Machine.instructionList=getDefaultInstructionList();

    addAllSignals(_Machine);

}



function addAllSignals(_Machine){
    addMemorySignals(_Machine);
    addJALSignals(_Machine);
    addJALExcrementSignals(_Machine);
    addCounterSignals(_Machine);
    addInstructionSignals(_Machine);
}



function addMemorySignals(_Machine){
        
    //Memory signals

    const wea = new Signal(
        "wea",
        true,
        (_M)=>{_M.A_register.writeFromBus(_M.A_bus) ;}
    )

    const czyt = new Signal(
        "czyt",
        false,
        (_M)=>{_M.S_register.write(_M.MEM.read(_M.A_register.getValue())) ;}
    )

    const pisz = new Signal(
        "pisz",
        false,
        (_M)=>{_M.MEM.write(_M.A_register.getValue(),_M.S_register.getValue());}
    )

    const wes = new Signal(
        "wes",
        true,
        (_M)=>{_M.S_register.writeFromBus(_M.S_bus); }
    )
    const wys = new Signal(
        "wys",
        false,
        function(_M){_M.S_bus.setSourceRegister(_M.S_register)}
    )


    _Machine.addSignalToDictioanry(wea);
    _Machine.addSignalToDictioanry(czyt)
    _Machine.addSignalToDictioanry(pisz)

    _Machine.addSignalToDictioanry(wes);
    _Machine.addSignalToDictioanry(wys);
}

function addJALSignals(_Machine){
    

//JA: signals
const weja = new Signal(
    "weja",
    false,
    (_M)=>{_M.JAL.BusReference = _M.S_bus;}
)

const przep = new Signal(
    "przep",
    false,
    (_M)=>{_M.JAL.SetOperation(JALOperationEnum.PRZEP);}
)
const dod = new Signal(
    "dod",
    false,
    (_M)=>{_M.JAL.SetOperation(JALOperationEnum.DOD);}
)
const ode = new Signal(
    "ode",
    false,
    (_M)=>{_M.JAL.SetOperation(JALOperationEnum.ODE);}
)

const weak = new Signal(
    "weak",
    true,
    (_M)=>{_M.JAL.writeOperation();}
)
const wyak = new Signal(
    "wyak",
    false,
    (_M)=>{_M.S_bus.setSourceRegister(_M.AK_register);}
)

_Machine.addSignalToDictioanry(weja);

_Machine.addSignalToDictioanry(przep);
_Machine.addSignalToDictioanry(dod);
_Machine.addSignalToDictioanry(ode);

_Machine.addSignalToDictioanry(weak);
_Machine.addSignalToDictioanry(wyak);
}

function addJALExcrementSignals(_Machine){
    const iak = new Signal(
        "iak",
        true,
        function(_M){_M.AK_register.write(_M.AK_register.getValue()+1)}
    )
    
    
    const dak = new Signal(
        "dak",
        true,
        function(_M){_M.AK_register.write(_M.AK_register.getValue()-1)}
    )
    _Machine.addSignalToDictioanry(iak);
    _Machine.addSignalToDictioanry(dak);
}

function addCounterSignals(_Machine){
    //Counter Signals
    const wel = new Signal(
        "wel",
        true,
        (_M)=>{_M.L_register.writeFromBus(_M.A_bus)}
    )
    const wyl = new Signal(
        "wyl",
        false,
        (_M)=>{_M.A_bus.setSourceRegister(_M.L_register);}
    )
    const il = new Signal(
        "il",
        true,
        (_M)=>{_M.L_register.write(_M.L_register.getValue()+1);}
    )
    _Machine.addSignalToDictioanry(wel);
    _Machine.addSignalToDictioanry(wyl);
    _Machine.addSignalToDictioanry(il);
}


function addInstructionSignals(_Machine){
    //Instruction signals
    const wei = new Signal(
        "wei",
        true,
        (_M)=>{_M.I_register.writeFromBus(_M.S_bus);}
    )
    const wyad = new Signal(
        "wyad",
        false,
        (_M)=>{_M.A_bus.setSourceRegister(_M.I_register);}
    )
    const stop = new Signal(
        "stop",
        false,
        (_M)=>{Alerter.alert("Program Is Stoped");}
    )

    _Machine.addSignalToDictioanry(wei);
    _Machine.addSignalToDictioanry(wyad);
    _Machine.addSignalToDictioanry(stop);
}

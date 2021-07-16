




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

    // RP!=0
    _flagUnit.addFlag(
        new ConditionFlag("INT",
            (_Machine)=>{
                return _Machine.RP_register.getValue()!=0;
            }
        )
    )

}


function buildMachine(_Machine){


    _Machine.settings = new Settings();
    _Machine.settings.onBusWidthChanged =(_set)=>{ _Machine.onBusWidthChanged(_set)};
    


    let S_bus = new Bus();
    let A_bus = new Bus();
    _Machine.S_bus=S_bus;
    _Machine.A_bus=A_bus;

    let MEM = new Mamory(0);
    _Machine.MEM = MEM;


    //Init registers
    let AK_register= new Register("ak");
    let S_register = new Register("s");
    let A_register = new Register("a");
    let L_register = new Register("l");
    let I_register = new Register("i");

    let WS_register=new Register("ws",ExtnensionFlags.Stack);

    let X_register =new Register("x" , ExtnensionFlags.X_Register);
    let Y_register=new Register("y",ExtnensionFlags.Y_Register);

    let RZ_register = new Register("rz",ExtnensionFlags.Interupt);
    let RM_register = new Register("rm",ExtnensionFlags.Interupt);
    let RP_register=new Register("rp",ExtnensionFlags.Interupt);
    let AP_register=new Register("ap",ExtnensionFlags.Interupt);


    
    //Set default display
    AK_register.display = ValueDisplayEnum.SignedDecimal;
    I_register.display = ValueDisplayEnum.OpCodeArgument;
    RZ_register.display = ValueDisplayEnum.Binary;
    RP_register.display=   ValueDisplayEnum.Binary;
    RM_register.display = ValueDisplayEnum.Binary;


    //Set bus match rule and bus width
    AK_register.busMatchRule = MatchRegisterWidthEnum.ToWord;
    S_register.busMatchRule = MatchRegisterWidthEnum.ToWord;
    A_register.busMatchRule = MatchRegisterWidthEnum.ToAdress;
    L_register.busMatchRule = MatchRegisterWidthEnum.ToAdress;
    I_register.busMatchRule = MatchRegisterWidthEnum.ToWord;

    WS_register.busMatchRule=MatchRegisterWidthEnum.ToAdress;
    X_register.busMatchRule=MatchRegisterWidthEnum.ToWord;
    Y_register.busMatchRule=MatchRegisterWidthEnum.ToWord;

    RZ_register.busMatchRule = MatchRegisterWidthEnum.DontMatch;
    RZ_register.setBitWidth(4);
    RM_register.busMatchRule = MatchRegisterWidthEnum.DontMatch;
    RM_register.setBitWidth(4);
    RZ_register.busMatchRule = MatchRegisterWidthEnum.DontMatch;
    RZ_register.setBitWidth(4);
    RP_register.busMatchRule = MatchRegisterWidthEnum.DontMatch;
    RP_register.setBitWidth(4);
    AP_register.busMatchRule = MatchRegisterWidthEnum.ToAdress;

    //Set registers
    _Machine.AK_register=AK_register;
    _Machine.S_register=S_register;
    _Machine.A_register=A_register;
    _Machine.L_register=L_register;
    _Machine.I_register=I_register;
    
    _Machine.WS_register=WS_register;
    _Machine.X_register=X_register;
    _Machine.Y_register=Y_register;

    _Machine.RZ_register=RZ_register;
    _Machine.RM_register=RM_register;
    _Machine.RP_register=RP_register;
    _Machine.AP_register=AP_register;

    //Define Units
    let JAL = new ArythmeticLogicUnit(AK_register);
    let flagUnit = new FlagsUnit(AK_register);
    setupFlagUnit(flagUnit);
    let CntrlUnit = new ControllUnit(I_register,flagUnit);
    let InteruptUnt = new InteruptUnit(RZ_register,RM_register,RP_register,AP_register,_Machine.settings);


    _Machine.controllUnit=CntrlUnit;
    _Machine.JAL=JAL
    _Machine.flagUnit=flagUnit;
    _Machine.interuptUnit = InteruptUnt;
        
    let machineComponents = [
        JAL,
        MEM,
        InteruptUnt,

        S_bus,
        A_bus,
        
        AK_register,
        S_register,
        A_register,
        L_register,
        I_register,
        WS_register,
        X_register,
        Y_register,
        RZ_register,
        RM_register,
        RP_register,
        AP_register,
    ];
    _Machine.machineComponents= machineComponents;


    let registers = [
        AK_register,
        S_register,
        A_register,
        L_register,
        I_register,
        WS_register,
        X_register,
        Y_register,
        RZ_register,
        RM_register,
        RP_register,
        AP_register,
    ];

    _Machine.registers= registers;


    let buses = [
        S_bus,
        A_bus
    ];
    _Machine.buses = buses;
    
    
    _Machine.settings.setBusWidth(3,5);


    _Machine.instructionList=InstructionList.getDefaultInstructionList();

    addAllSignals(_Machine);

}



function addAllSignals(_Machine){
    addMemorySignals(_Machine);
    addJALSignals(_Machine);
    addCounterSignals(_Machine);
    addInstructionSignals(_Machine);

    addAK_IncrementSignals(_Machine);
    addJAL_LogicSignals(_Machine);
    addJAL_ExtendedMathSignals(_Machine);
    addStackSingals(_Machine);
    addX_RegisterSignals(_Machine);
    addY_RegisterSignals(_Machine);
    addInteruptSignals(_Machine);
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
        (_M)=>{_M.S_bus.setSourceRegister(_M.S_register)}
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



function addAK_IncrementSignals(_Machine){
    const iak = new Signal(
        "iak",
        true,
        (_M)=>{_M.AK_register.write(_M.AK_register.getValue()+1);},
        ExtnensionFlags.AK_Increment
    )
    
    
    const dak = new Signal(
        "dak",
        true,
        (_M)=>{_M.AK_register.write(_M.AK_register.getValue()-1);},
        ExtnensionFlags.AK_Increment
    )
    _Machine.addSignalToDictioanry(iak);
    _Machine.addSignalToDictioanry(dak);
}

function addJAL_LogicSignals(_Machine){
    const neg = new Signal(
        "neg",
        false,
        (_M)=>{_M.JAL.SetOperation(JALOperationEnum.NEG);},
        ExtnensionFlags.JAL_Logic
    )
    
    
    const lub = new Signal(
        "lub",
        false,
        (_M)=>{_M.JAL.SetOperation(JALOperationEnum.LUB);},
        ExtnensionFlags.JAL_Logic
    )

    const i = new Signal(
        "i",
        false,
        (_M)=>{_M.JAL.SetOperation(JALOperationEnum.I);},
        ExtnensionFlags.JAL_Logic
    )

    _Machine.addSignalToDictioanry(neg);
    _Machine.addSignalToDictioanry(lub);
    _Machine.addSignalToDictioanry(i);


}

function addJAL_ExtendedMathSignals(_Machine){
    const mno = new Signal(
        "mno",
        false,
        (_M)=>{_M.JAL.SetOperation(JALOperationEnum.MNO);},
        ExtnensionFlags.JAL_ExtendedMath
    )
    
    
    const dziel = new Signal(
        "dziel",
        false,
        (_M)=>{_M.JAL.SetOperation(JALOperationEnum.DZIEL);},
        ExtnensionFlags.JAL_ExtendedMath
    )

    const shr = new Signal(
        "shr",
        false,
        (_M)=>{_M.JAL.SetOperation(JALOperationEnum.SHR);},
        ExtnensionFlags.JAL_ExtendedMath
    )

    _Machine.addSignalToDictioanry(mno);
    _Machine.addSignalToDictioanry(dziel);
    _Machine.addSignalToDictioanry(shr);


}

function addStackSingals(_Machine){
    const wyls = new Signal(
        "wyls",
        false,
        (_M)=>{_M.S_bus.setSourceRegister(_M.L_register);},
        ExtnensionFlags.Stack
    )

    const iws = new Signal(
        "iws",
        true,
        (_M)=>{_M.WS_register.write(_M.WS_register.getValue()+1);},
        ExtnensionFlags.Stack
    )
    
    
    const dws = new Signal(
        "dws",
        true,
        (_M)=>{_M.WS_register.write(_M.WS_register.getValue()-1);},
        ExtnensionFlags.Stack
    )

    const wyws = new Signal(
        "wyws",
        false,
        (_M)=>{_M.A_bus.setSourceRegister(_M.WS_register);},
        ExtnensionFlags.Stack
    )

    const wews = new Signal(
        "wews",
        true,
        (_M)=>{_M.WS_register.writeFromBus(_M.A_bus) ;},
        ExtnensionFlags.Stack
    )


    _Machine.addSignalToDictioanry(wyls);
    _Machine.addSignalToDictioanry(iws);
    _Machine.addSignalToDictioanry(dws);
    _Machine.addSignalToDictioanry(wyws);
    _Machine.addSignalToDictioanry(wews);
}

function addX_RegisterSignals(_Machine){
    const wyx = new Signal(
        "wyx",
        false,
        (_M)=>{_M.S_bus.setSourceRegister(_M.X_register);},
        ExtnensionFlags.X_Register
    )

    const wex = new Signal(
        "wex",
        true,
        (_M)=>{_M.X_register.writeFromBus(_M.S_bus) ;},
        ExtnensionFlags.X_Register
    )
    _Machine.addSignalToDictioanry(wyx);
    _Machine.addSignalToDictioanry(wex);

}

function addY_RegisterSignals(_Machine){
    const wyy = new Signal(
        "wyy",
        false,
        (_M)=>{_M.S_bus.setSourceRegister(_M.Y_register);},
        ExtnensionFlags.Y_Register
    )

    const wey = new Signal(
        "wey",
        true,
        (_M)=>{_M.Y_register.writeFromBus(_M.S_bus) ;},
        ExtnensionFlags.Y_Register
    )
    _Machine.addSignalToDictioanry(wyy);
    _Machine.addSignalToDictioanry(wey);

}

function addInteruptSignals(_Machine){
    const wyrm = new Signal(
        "wyrm",
        false,
        (_M)=>{_M.A_bus.setSourceRegister(_M.RM_register);},
        ExtnensionFlags.Interupt
    )

    const werm = new Signal(
        "werm",
        true,
        (_M)=>{_M.RM_register.writeFromBus(_M.A_bus);},
        ExtnensionFlags.Interupt
    )

    const wyap = new Signal(
        "wyap",
        false,
        (_M)=>{_M.A_bus.setSourceRegister(_M.AP_register);},
        ExtnensionFlags.Interupt
    )
    
    const eni = new Signal(
        "eni",
        true,
        (_M)=>{_M.interuptUnit.doEni();},
        ExtnensionFlags.Interupt
    )

    const rint = new Signal(
        "rint",
        true,
        (_M)=>{_M.interuptUnit.doRint();},
        ExtnensionFlags.Interupt
    )


    _Machine.addSignalToDictioanry(wyrm);
    _Machine.addSignalToDictioanry(werm);
    _Machine.addSignalToDictioanry(wyap);
    _Machine.addSignalToDictioanry(eni);
    _Machine.addSignalToDictioanry(rint);

}
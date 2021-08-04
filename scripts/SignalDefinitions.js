
function addAllSignals(_Machine){
    addMemorySignals(_Machine);
    addJALSignals(_Machine);
    addCounterSignals(_Machine);
    addInstructionSignals(_Machine);

    add_BusConnectionSignals(_Machine);
    addAK_IncrementSignals(_Machine);
    addJAL_LogicSignals(_Machine);
    addJAL_ExtendedMathSignals(_Machine);
    addStackSingals(_Machine);
    addX_RegisterSignals(_Machine);
    addY_RegisterSignals(_Machine);
    addInteruptSignals(_Machine);
    addInputOutputSignals(_Machine);
}



function addMemorySignals(_Machine){
        
    //Memory signals

    const wea = new Signal(
        "wea",
        true,
        (_M)=>{_M.A_register.writeFromBus(_M.A_bus) ;},
        ExtnensionFlags.Base,
        SignalOrientation.Left

    )

    const czyt = new Signal(
        "czyt",
        false,
        (_M)=>{_M.S_register.write(_M.MEM.read(_M.A_register.getValue())) ;},
        ExtnensionFlags.Base,
        SignalOrientation.Left
    )

    const pisz = new Signal(
        "pisz",
        false,
        (_M)=>{_M.MEM.write(_M.A_register.getValue(),_M.S_register.getValue());},
        ExtnensionFlags.Base,
        SignalOrientation.Left
    )

    const wes = new Signal(
        "wes",
        true,
        (_M)=>{_M.S_register.writeFromBus(_M.S_bus); },
        ExtnensionFlags.Base,
        SignalOrientation.Left
    )
    const wys = new Signal(
        "wys",
        false,
        (_M)=>{_M.S_bus.setSourceRegister(_M.S_register)},
        ExtnensionFlags.Base,
        SignalOrientation.Right
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
    (_M)=>{_M.JAL.BusReference = _M.S_bus;},
    ExtnensionFlags.Base,
    SignalOrientation.Right
)

const przep = new Signal(
    "przep",
    false,
    (_M)=>{_M.JAL.SetOperation(JALOperationEnum.PRZEP);},
    ExtnensionFlags.Base,
    SignalOrientation.Right
)
const dod = new Signal(
    "dod",
    false,
    (_M)=>{_M.JAL.SetOperation(JALOperationEnum.DOD);},
    ExtnensionFlags.Base,
    SignalOrientation.Right
)
const ode = new Signal(
    "ode",
    false,
    (_M)=>{_M.JAL.SetOperation(JALOperationEnum.ODE);},
    ExtnensionFlags.Base,
    SignalOrientation.Right
)

const weak = new Signal(
    "weak",
    true,
    (_M)=>{_M.JAL.writeOperation();},
    ExtnensionFlags.Base,
    SignalOrientation.Right
)
const wyak = new Signal(
    "wyak",
    false,
    (_M)=>{_M.S_bus.setSourceRegister(_M.AK_register);},
    ExtnensionFlags.Base,
    SignalOrientation.Left
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
        (_M)=>{_M.L_register.writeFromBus(_M.A_bus)},
        ExtnensionFlags.Base,
        SignalOrientation.Left
    )
    const wyl = new Signal(
        "wyl",
        false,
        (_M)=>{_M.A_bus.setSourceRegister(_M.L_register);},
        ExtnensionFlags.Base,
        SignalOrientation.Right
    )
    const il = new Signal(
        "il",
        true,
        (_M)=>{_M.L_register.write(_M.L_register.getValue()+1);},
        ExtnensionFlags.Base,
        SignalOrientation.Right
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
        (_M)=>{_M.I_register.writeFromBus(_M.S_bus);},
        ExtnensionFlags.Base,
        SignalOrientation.Right
    )
    const wyad = new Signal(
        "wyad",
        false,
        (_M)=>{_M.A_bus.setSourceRegister(_M.I_register);},
        ExtnensionFlags.Base,
        SignalOrientation.Right
    )
    const stop = new Signal(
        "stop",
        false,
        (_M)=>{Alerter.alert("Program Is Stoped");},
        ExtnensionFlags.Base,
        SignalOrientation.None
    )

    _Machine.addSignalToDictioanry(wei);
    _Machine.addSignalToDictioanry(wyad);
    _Machine.addSignalToDictioanry(stop);
}



function add_BusConnectionSignals(_Machine){
    const as = new Signal(
        "as",
        false,
        (_M)=>{
            _M.AS_bus.activateConnection();
        },
        ExtnensionFlags.BusConnection,
        SignalOrientation.Left
    )

    _Machine.addSignalToDictioanry(as);
}


function addAK_IncrementSignals(_Machine){
    const iak = new Signal(
        "iak",
        true,
        (_M)=>{_M.AK_register.write(_M.AK_register.getValue()+1);},
        ExtnensionFlags.AK_Increment,
        SignalOrientation.Right
    )
    
    
    const dak = new Signal(
        "dak",
        true,
        (_M)=>{_M.AK_register.write(_M.AK_register.getValue()-1);},
        ExtnensionFlags.AK_Increment,
        SignalOrientation.Left
    )
    _Machine.addSignalToDictioanry(iak);
    _Machine.addSignalToDictioanry(dak);
}

function addJAL_LogicSignals(_Machine){
    const neg = new Signal(
        "neg",
        false,
        (_M)=>{_M.JAL.SetOperation(JALOperationEnum.NEG);},
        ExtnensionFlags.JAL_Logic,
        SignalOrientation.Left
    )
    
    
    const lub = new Signal(
        "lub",
        false,
        (_M)=>{_M.JAL.SetOperation(JALOperationEnum.LUB);},
        ExtnensionFlags.JAL_Logic,
        SignalOrientation.Left
    )

    const i = new Signal(
        "i",
        false,
        (_M)=>{_M.JAL.SetOperation(JALOperationEnum.I);},
        ExtnensionFlags.JAL_Logic,
        SignalOrientation.Left
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
        ExtnensionFlags.JAL_ExtendedMath,
        SignalOrientation.Right
    )
    
    
    const dziel = new Signal(
        "dziel",
        false,
        (_M)=>{_M.JAL.SetOperation(JALOperationEnum.DZIEL);},
        ExtnensionFlags.JAL_ExtendedMath,
        SignalOrientation.Right
    )

    const shr = new Signal(
        "shr",
        false,
        (_M)=>{_M.JAL.SetOperation(JALOperationEnum.SHR);},
        ExtnensionFlags.JAL_ExtendedMath,
        SignalOrientation.Right
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
        ExtnensionFlags.Stack,
        SignalOrientation.Left
    )

    const iws = new Signal(
        "iws",
        true,
        (_M)=>{_M.WS_register.write(_M.WS_register.getValue()+1);},
        ExtnensionFlags.Stack,
        SignalOrientation.Right
    )
    
    
    const dws = new Signal(
        "dws",
        true,
        (_M)=>{_M.WS_register.write(_M.WS_register.getValue()-1);},
        ExtnensionFlags.Stack,
        SignalOrientation.Left
    )

    const wyws = new Signal(
        "wyws",
        false,
        (_M)=>{_M.A_bus.setSourceRegister(_M.WS_register);},
        ExtnensionFlags.Stack,
        SignalOrientation.Right
    )

    const wews = new Signal(
        "wews",
        true,
        (_M)=>{_M.WS_register.writeFromBus(_M.A_bus) ;},
        ExtnensionFlags.Stack,
        SignalOrientation.Left
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
        ExtnensionFlags.X_Register,
        SignalOrientation.Right
    )

    const wex = new Signal(
        "wex",
        true,
        (_M)=>{_M.X_register.writeFromBus(_M.S_bus) ;},
        ExtnensionFlags.X_Register,
        SignalOrientation.Left
    )
    _Machine.addSignalToDictioanry(wyx);
    _Machine.addSignalToDictioanry(wex);

}

function addY_RegisterSignals(_Machine){
    const wyy = new Signal(
        "wyy",
        false,
        (_M)=>{_M.S_bus.setSourceRegister(_M.Y_register);},
        ExtnensionFlags.Y_Register,
        SignalOrientation.Right
    )

    const wey = new Signal(
        "wey",
        true,
        (_M)=>{_M.Y_register.writeFromBus(_M.S_bus) ;},
        ExtnensionFlags.Y_Register,
        SignalOrientation.Left
    )
    _Machine.addSignalToDictioanry(wyy);
    _Machine.addSignalToDictioanry(wey);

}

function addInteruptSignals(_Machine){
    const wyrm = new Signal(
        "wyrm",
        false,
        (_M)=>{_M.A_bus.setSourceRegister(_M.RM_register);},
        ExtnensionFlags.Interupt,
        SignalOrientation.Right
    )

    const werm = new Signal(
        "werm",
        true,
        (_M)=>{_M.RM_register.writeFromBus(_M.A_bus);},
        ExtnensionFlags.Interupt,
        SignalOrientation.Left
    )

    const wyap = new Signal(
        "wyap",
        false,
        (_M)=>{_M.A_bus.setSourceRegister(_M.AP_register);},
        ExtnensionFlags.Interupt,
        SignalOrientation.Right
    )
    
    const eni = new Signal(
        "eni",
        true,
        (_M)=>{_M.interuptUnit.doEni();},
        ExtnensionFlags.Interupt,
        SignalOrientation.None
    )

    const rint = new Signal(
        "rint",
        true,
        (_M)=>{_M.interuptUnit.doRint();},
        ExtnensionFlags.Interupt,
        SignalOrientation.None
    )


    _Machine.addSignalToDictioanry(wyrm);
    _Machine.addSignalToDictioanry(werm);
    _Machine.addSignalToDictioanry(wyap);
    _Machine.addSignalToDictioanry(eni);
    _Machine.addSignalToDictioanry(rint);

}

function addInputOutputSignals(_Machine){
    const wyrb = new Signal(
        "wyrb",
        false,
        (_M)=>{_M.S_bus.setSourceRegister(_M.RB_register);},
        ExtnensionFlags.InputOutput,
        SignalOrientation.Right
    )

    const werb = new Signal(
        "werb",
        true,
        (_M)=>{_M.RB_register.writeFromBus(_M.S_bus);},
        ExtnensionFlags.InputOutput,
        SignalOrientation.Left
    )

    const wyg = new Signal(
        "wyg",
        false,
        (_M)=>{_M.S_bus.setSourceRegister(_M.G_register);},
        ExtnensionFlags.InputOutput,
        SignalOrientation.Right
    )

    const start = new Signal(
        "start",
        true,
        (_M)=>{_M.inputOutputUnit.doStart();},
        ExtnensionFlags.InputOutput,
        SignalOrientation.Left
    )

    _Machine.addSignalToDictioanry(wyrb);
    _Machine.addSignalToDictioanry(werb);
    _Machine.addSignalToDictioanry(wyg);
    _Machine.addSignalToDictioanry(start);
    
}
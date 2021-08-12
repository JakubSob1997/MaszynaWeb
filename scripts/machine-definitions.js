
import Settings from "./settings.js"
import Bus from "./bus.js";
import BusConnection from "./bus-connection.js"
import Mamory from "./memory.js";
import Register from "./register.js";
import { ValueDisplayEnum,MatchRegisterWidthEnum,ExtnensionFlags } from "./enums.js";
import ArythmeticLogicUnit from "./arythmetic-logicUnit.js";
import FlagsUnit, {ConditionFlag} from "./condition-flags.js";
import ControllUnit from "./controll-unit.js";
import InteruptUnit from "./interupt-unit.js";
import IOUnit from "./io-unit.js";
import InstructionList from "./instruction-list.js"
import addAllSignals from "./signal-definitions.js";
import buildIODevices from "./io-definitions.js";
import buildInteruptDevices from "./interupt-definitions.js";

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


export default function buildMachine(_Machine){


    _Machine.settings = new Settings();
    _Machine.settings.addOnBusWidthChangedListener((_set)=>
    { 
        _Machine.onBusWidthChanged(_set);
    });
    
    

    let S_bus = new Bus(MatchRegisterWidthEnum.ToWord);
    let A_bus = new Bus(MatchRegisterWidthEnum.ToAdress);
    _Machine.S_bus=S_bus;
    _Machine.A_bus=A_bus;


    let AS_bus = new BusConnection([S_bus,A_bus]);
    _Machine.AS_bus=AS_bus;

    let MEM = new Mamory(_Machine.settings);
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

    let RB_register=new Register("rb",ExtnensionFlags.InputOutput);
    let G_register=new Register("g",ExtnensionFlags.InputOutput);
    
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

    RB_register.busMatchRule-MatchRegisterWidthEnum.ToWord;
    G_register.busMatchRule=MatchRegisterWidthEnum.DontMatch;
    G_register.setBitWidth(1);

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

    _Machine.RB_register=RB_register;
    _Machine.G_register=G_register;

    //Define Units
    let JAL = new ArythmeticLogicUnit(AK_register);
    let flagUnit = new FlagsUnit(AK_register);
    setupFlagUnit(flagUnit);
    let CntrlUnit = new ControllUnit(I_register,flagUnit);
    let InteruptUnt = new InteruptUnit(RZ_register,RM_register,RP_register,AP_register,_Machine.settings);
    let _IOUnit = new IOUnit(RB_register,G_register,I_register);


    //IO
    
    let IODevices   = buildIODevices(_IOUnit);
    _Machine.IODevices=IODevices;


    let InteruptDevices = buildInteruptDevices(InteruptUnt);
    _Machine.InteruptDevices = InteruptDevices;






    _Machine.controllUnit=CntrlUnit;
    _Machine.JAL=JAL
    _Machine.flagUnit=flagUnit;
    _Machine.interuptUnit = InteruptUnt;
    _Machine.IOUnit = _IOUnit;
        
    let machineComponents = [
        JAL,
        MEM,
        InteruptUnt,
        CntrlUnit,
        _IOUnit,

        S_bus,
        A_bus,
        AS_bus,
        
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
        RB_register,
        G_register,
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
        RB_register,
        G_register,
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



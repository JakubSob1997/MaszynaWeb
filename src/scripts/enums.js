

export const  ValueDisplayEnum = {
    "UnsignedDecimal":1,
    "SignedDecimal":2,
    "Binary":3,
    "HexaDecimal":4,
    "OpCodeArgument":5,
}
Object.freeze(ValueDisplayEnum);

export const  MatchRegisterWidthEnum = {
    "ToAdress":1,
    "ToCode":2,
    "ToWord":3,
    "DontMatch":4,
}
Object.freeze(MatchRegisterWidthEnum);



export const ALUOperationEnum = {
    Unselected:0,
    PRZEP:1,  //write
    DOD:2,    //add
    ODE:3,    //substract
    NEG:4,    //logical not
    LUB:5,    //logical or
    I:6,      //logical and
    MNO:7,    //multiply
    DZIEL:8,  //divide
    SHR:9,    //bitshift 1 right
    MOD:10,   //modulo
}
Object.freeze(ALUOperationEnum);



export const ExtnensionFlags = {
    Base:1<<0,
    BusConnection:1<<1,
    AK_Increment:1<<2,
    ALU_Logic:1<<3,
    ALU_ExtendedMath:1<<4,
    Stack:1<<5,
    X_Register:1<<6,
    Y_Register:1<<7,
    Interupt:1<<8,
    InputOutput:1<<9,
    Flags:1<<10,
    T_Register:1<<11,


}
Object.freeze(ExtnensionFlags);


export const IOModuleFlags={
    Base:1<<0,
    ConsoleExteneded:1<<1,
    Notificatior:1<<2,
    RNG:1<<3,
    Timer1:1<<4,
    Timer2:1<<5,

}
Object.freeze(IOModuleFlags);

export const ExtentionPresets = {
    "W":0b1,
    "W+":0b11,
    "L":0b11111111,
    "EW":0b11111111111,
}


export const SignalOrientation ={
    "None" : 1,
    "Left" : 2,
    "Right": 3,
}
Object.freeze(SignalOrientation);



export const AlertStyleEnum={
    Warning:"alert-warning",
    SyntaxError:"alert-syntax-error",
    Succes:"alert-succes",
    Large:"alert-large",
    Machine:"alert-machine-response",
    ExecutionFlow:"alert-execution",
    UnhandledException:"alert-unhandled-exception",
    InputSucces:"alert-execution",//"alert-input-succes",
    InputError:"alert-syntax-error",//"alert-input-error"
}
Object.freeze(AlertStyleEnum);


export const InteruptEnum={
    None:0,
    INT1:0b1000,
    INT2:0b0100,
    INT3:0b0010,
    INT4:0b0001,
}
Object.freeze(InteruptEnum)


export const ExecutionMode ={
    Cycle:1,
    Instruction:2,
    Program:3,
}
Object.freeze(ExecutionMode)
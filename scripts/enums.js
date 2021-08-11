

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

export const JALOperationEnum = {
    "Unselected":0,
    "PRZEP":1,
    "DOD":2,
    "ODE":3,
    "NEG":4,
    "LUB":5,
    "I":6,
    "MNO":7,
    "DZIEL":8,
    "SHR":9,
}
Object.freeze(JALOperationEnum);



export const ExtnensionFlags = {
    "Base":1<<0,
    "BusConnection" :1<<1,
    "AK_Increment":1<<2,
    "JAL_Logic":1<<3,
    "JAL_ExtendedMath":1<<4,
    "Stack":1<<5,
    "X_Register":1<<6,
    "Y_Register":1<<7,
    "Interupt":1<<8,
    "InputOutput":1<<9,
    "Flags":1<<10,


}
Object.freeze(ExtnensionFlags);

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
    InputError:"alert-input-error"
}
Object.freeze(AlertStyleEnum);


export const InteruptEnum={
    INT1:0b1000,
    INT2:0b0100,
    INT3:0b0010,
    INT4:0b0001,
}
Object.freeze(InteruptEnum)
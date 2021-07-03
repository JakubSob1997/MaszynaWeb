

const RegisterDisplayEnum = {
    "UnsignedDecimal":1,
    "SignedDecimal":2,
    "Binary":3,
    "HexaDecimal":4,
    "OpCodeArgument":5,
}
Object.freeze(RegisterDisplayEnum);

const MatchRegisterWidthEnum = {
    "ToAdress":1,
    "ToCode":2,
    "ToWord":3,
    "DontMatch":4,
}
Object.freeze(MatchRegisterWidthEnum);

const JALOperationEnum = {
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



const ExtnensionFlags = {
    "BusConnection" :1<<0,
    "AK_Increment":1<<1,
    "JAL_Logic":1<<2,
    "JAL_ExtendedMath":1<<3,
    "Stack":1<<4,
    "X_Register":1<<5,
    "Y_Register":1<<6,
    "Interupt":1<<7,
    "IputOutput":1<<8,
    "Flags":1<<9,

    "W":0,
    "W+":0b1,
    "L":0b1111111,
    "EW":0b1111111111,


}
Object.freeze(ExtnensionFlags);









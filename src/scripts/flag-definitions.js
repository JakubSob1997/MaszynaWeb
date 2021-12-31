export class ConditionFlag{
    constructor(_name,_bit,_flagCheckFunk){
        this.name = _name;
        this.bit=_bit;
        this.isFlagActive = _flagCheckFunk;
    }
}



export default function setupFlags(_Machine,_flagUnit,_flagRegister ){
    
    const flags = [
        new ConditionFlag("DALEJ",undefined,
            ()=>{
                return true;
            }
        ),
        new ConditionFlag("ZAK",0,
            ()=>{
                return _Machine.AK_register.getValue()==0;
            }
        ),
        new ConditionFlag("Z",1,
            ()=>{
                return _Machine.AK_register.getSignBit()!=0;
            }
        ),
        new ConditionFlag("INT",2,
            ()=>{
                return _Machine.RP_register.getValue()!=0;
            }
        ),
        

    ]

    flags.forEach((flag)=>{
        _flagUnit.addFlag(flag);
        if(flag.bit!==undefined){
            _flagRegister.addFlag(flag);
        }
    })

    _flagRegister.setBitWidth(Object.keys(_flagRegister.flags).length)

    _Machine.addOnCycleDoneForceCallback((_M)=>{
        _flagRegister.machineUpdate();
    })


}

import { ExtnensionFlags } from "./enums.js"

export default class MachineComponent{

    setDefault(){}
    update(){}
    resetState(){}//Resets state beetwen cycles
    onBusWidthChanged(_settings){}
    getExtention(){return ExtnensionFlags.Base}

}


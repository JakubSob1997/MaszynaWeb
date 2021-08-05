
import { ExtnensionFlags } from "./enums.js"

export default class MachineComponent{

    setDefault(){}
    update(){}
    resetState(){}
    onBusWidthChanged(_settings){}
    getExtention(){return ExtnensionFlags.Base}

}


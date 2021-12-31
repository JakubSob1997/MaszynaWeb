




import MachineComponent from "./machine-component.js";




export default class InteruptUnit extends MachineComponent/* extends InteruptDriver*/ {

    constructor(_RZreg, _RMreg, _RPreg, _APreg, _settings) {
        super()

        this.RZregister = _RZreg;
        this.RMregister = _RMreg;
        this.APregister = _APreg;
        this.RPregister = _RPreg;
        this.settings = _settings;

        this.interuptDriver = this;

        /*
        this.interuptDriver={
            handleInterupt(device){
                console.log(device.interuptVactor.toString(2));
            }
        }
        */

    }


    doEni() {

        let intVactor = this.RZregister.getValue();
        intVactor &= ~(this.RMregister.getValue());
        if (intVactor == 0) {
            
            return;
        }

        let priorityBit = 1 << (this.RZregister.width - 1);
        let interuptIndex = 0;

        while (priorityBit != 0) {
            if ((intVactor & priorityBit) != 0) {
                this.RPregister.write(intVactor & priorityBit);
                this.APregister.write(this.settings.intAdressList[interuptIndex]);
                return;
            }

            priorityBit = (priorityBit >> 1);
            interuptIndex++;
        }
       
    }

    doRint() {
        this.RZregister.write(this.RZregister.getValue() & ~this.RPregister.getValue())
        this.APregister.write(0);
        this.RPregister.write(0);
    }



    handleInterupt(_interuptDevice){
        if(this.interuptDriver===this){
            this.onInterupt(_interuptDevice);
        }else{
            this.interuptDriver.handleInterupt(_interuptDevice);
        }
    }

    onInterupt(_interuptDevice){
        const vector =_interuptDevice.getInteruptVector();
        this.RZregister.setValue(this.RZregister.getValue()|vector);

    }


}





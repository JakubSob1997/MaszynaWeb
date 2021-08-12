




import MachineComponent from "./machine-component.js";




export default class InteruptUnit extends MachineComponent {

    constructor(_RZreg, _RMreg, _RPreg, _APreg, _settings) {
        super()

        this.RZregister = _RZreg;
        this.RMregister = _RMreg;
        this.APregister = _APreg;
        this.RPregister = _RPreg;
        this.settings = _settings;

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


}





import InteruptDevice from "./interupt-device.js";
import { InteruptEnum } from "./enums.js";
import Translator from "./translator.js";




export default function buildInteruptDevices(_interuptDriver){


    let interuptDevices = {};

    let button1 = new InteruptDevice(_interuptDriver);
    let button2 = new InteruptDevice(_interuptDriver);
    let button3 = new InteruptDevice(_interuptDriver);
    let button4 = new InteruptDevice(_interuptDriver);

    button1.description = Translator.getTranslation("_int_button","Interrupt Button @0",[1])
    button2.description = Translator.getTranslation("_int_button","Interrupt Button @0",[2])
    button3.description = Translator.getTranslation("_int_button","Interrupt Button @0",[3])
    button4.description = Translator.getTranslation("_int_button","Interrupt Button @0",[4])

    button1.interuptVactor = InteruptEnum.INT1;
    button2.interuptVactor = InteruptEnum.INT2;
    button3.interuptVactor = InteruptEnum.INT3;
    button4.interuptVactor = InteruptEnum.INT4;

    button1.canChangeVactor=false;
    button2.canChangeVactor=false;
    button3.canChangeVactor=false;
    button4.canChangeVactor=false;

    interuptDevices.button1=button1;
    interuptDevices.button2=button2;
    interuptDevices.button3=button3;
    interuptDevices.button4=button4;

    return interuptDevices;


}









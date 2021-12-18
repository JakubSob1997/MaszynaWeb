
import CustomCodemMirror from "./custom-codemirror.js";



export default class InstructionCodeMirror extends CustomCodemMirror{
    constructor(_parent){

        const settings={
            mode:"inst"
        }

       super(_parent,settings);
    }



}

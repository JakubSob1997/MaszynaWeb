

import CustomCodemMirror from "./custom-codemirror.js";


export default class AssemblyCodeMirror extends CustomCodemMirror{
   
    constructor(_parent){

        const settings={
            mode:"prog"
        }

        super(_parent,settings);

    }

}

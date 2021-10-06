

import CustomCodemMirror from "./custom-codemirror.js";


export default class AssemblyCodeMirror extends CustomCodemMirror{
   
    constructor(_parent){
        super(_parent);

        this.cm.on("focus",()=>{
            console.log(this.cm.getCursor())
        })
    }

}

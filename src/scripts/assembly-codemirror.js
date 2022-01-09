

import CustomCodemMirror from "./custom-codemirror.js";
import { ExecutionContext } from "./machine-execution.js";



export default class AssemblyCodeMirror extends CustomCodemMirror{
   
    constructor(_parent){

        const settings={
            mode:"prog",
            gutters: ["CodeMirror-linenumbers", "breakpoints"],
            styleActiveLine: true,
            styleActiveSelected: true,
        }

        super(_parent,settings);



        this.cm.on("gutterClick", (cm, n) =>{
            var info = cm.lineInfo(n);

            this.onGutterClick(!info.gutterMarkers,n );

            cm.setGutterMarker(n, "breakpoints", info.gutterMarkers ? null : this.makeMarker());
            
        }); 
          
        this.onGutterClick =function(_bool,_line){console.log(`overide me ${_bool} - ${_line}`)};
    
        this.highlightIndex=-1;
    
    }


    highlightLine(_index){

        
        if(this.highlightIndex>=0){
           
            //this.cm.removeLineClass( this.highlightIndex,"background");
            this.clearHiglight();
        }

        if(_index>=0){
            this.cm.addLineClass(_index,"background","custom-cm-highlight")
        }
        this.highlightIndex=_index;

    }

    clearHiglight(){
        const count = this.cm.lineCount();
        
        for (let i = 0; i < count; i++) {
            this.cm.removeLineClass( i,"background");

        }
    }

    fixMarkers(_breakPoints){
        if(!_breakPoints)_breakPoints={}
        for (let i = 0; i < this.cm.lineCount(); i++) {
            if(Object.hasOwnProperty.call(_breakPoints,i)){
                this.cm.setGutterMarker(i, "breakpoints",  this.makeMarker());
            } else{
                this.cm.setGutterMarker(i, "breakpoints",  null );
            }     
        }
    }


    makeMarker() {
        var marker = document.createElement("div");
        marker.style.color = "#f04941";
        marker.style.width="50px";
        marker.style.fontSize="115%";
        marker.style.position="relative";
        marker.style.top="-4px";
        marker.style.left="4px";
        marker.innerHTML = "●";
        return marker;
      }

}

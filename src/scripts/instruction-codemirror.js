
import CustomCodemMirror from "./custom-codemirror.js";



export default class InstructionCodeMirror extends CustomCodemMirror{
    constructor(_parent){

        const settings={
            mode:"inst",
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
    
        this.highlightStart=-1;
        this.highlightEnd=-1;
    
    }


    highlightArea(_start,_end){

        
        if(this.highlightStart>=0||this.highlightEnd>=0){
           
            this.clearAll()
        }



        if(_start>=0&&_end>=0){
            for (let i = _start; i <= _end; i++) {
                this.cm.addLineClass(i,"background","custom-cm-highlight")
    
            }
        }


        this.highlightStart=_start;
        this.highlightEnd=_end;

    }

    clearCurrentArea(){
        const count = this.cm.lineCount();
        
        for (let i = this.highlightStart; i <= this.highlightEnd; i++) {
            this.cm.removeLineClass( i,"background");

        }
    }
    clearAll(){
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
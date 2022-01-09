import Translator from "./translator.js";
import CodeMirror from "codemirror";



export default class CustomCodemMirror{

    constructor(_parent,_settings){

        
        this.focusLabel = document.createElement("div");
        this.focusLabel.innerText = Translator.getTranslation("_code_mirror_label","Press the \"Esc\" key to leave editor focus.")
        this.focusLabel.classList.add("visibility-hidden");
        this.focusLabel.classList.add("info-tip");
        _parent.appendChild(this.focusLabel);

        this.cm = CodeMirror(_parent,{
            lineNumbers:true,
            firstLineNumber:0,
            theme:"darcula",
            ..._settings

        });

        


        this.cm.setOption("extraKeys",{
            Esc: (cm)=>{
                cm.display.input.blur();
            }
        })
        this.cm.refresh();
        this.cm.setSize(null,"60vh");
        this.cm.on("blur",(update)=>{
            this.focusLabel.classList.add("visibility-hidden");
            
        
        })

        this.cm.on("focus",(update)=>{
            this.focusLabel.classList.remove("visibility-hidden");
            
        
        })
        


    }

    getHTMLElement(){
        return this.cm;
    }

}


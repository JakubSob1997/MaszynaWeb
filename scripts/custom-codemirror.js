



export default class CustomCodemMirror{

    constructor(_parent){

        this.cm = CodeMirror(_parent,{
            lineNumbers:true,
            firstLineNumber:0,
            theme:"darcula"

        });



        this.cm.setOption("extraKeys",{
            Esc: (cm)=>{
                cm.display.input.blur();
            }
        })

        
        


        this.cm.refresh();
        this.cm.setSize(null,"60vh");

        
        
        this.focusLabel = document.createElement("div");
        this.focusLabel.innerText = "*Naciśnij klawisz \"Esc\" by wyjść z edytora."
        this.focusLabel.classList.add("display-none");
        this.focusLabel.classList.add("info-tip");
        _parent.appendChild(this.focusLabel);


        this.cm.on("blur",(update)=>{
            this.focusLabel.classList.add("display-none");
            
        
        })

        this.cm.on("focus",(update)=>{
            this.focusLabel.classList.remove("display-none");
            
        
        })
        


    }

    getHTMLElement(){
        return this.cm;
    }

}







export default class InstructionCodeMirror{
    constructor(_parent){
        this.cm = CodeMirror(_parent,{
            lineNumbers:true,
            firstLineNumber:0,
            theme:"darcula"

        });

        this.cm.refresh();
        this.cm.setSize(null,"60vh");
    }

    getHTMLElement(){
        return this.cm;
    }



}

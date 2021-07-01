


class LineOfCode{
    constructor(_code,_originalIndex){
        this.code=_code;
        this.ogIndex=_originalIndex;
    }
}


class AssemblyParserError{
    constructor(_erroerMessage,_line){
        this.message = _erroerMessage;
        this.line = _line;
    }

    toString(){
        return(this.message+ " at line: "+this.line.toString());
    }
}




class AssemblyParser{
    constructor(_assemblyCode,_settings,_instructionList){

        //this.sourceCode = _assemblyCode;

        this.lines = [];
        this.codeLines =[];

        this.labels = {};
        this.values=[];


        this.parseSuccesful = false;

        try {
            this.splitIntoLines(_assemblyCode);
            this.removeComentsFromCodeLines();
            this.removeEmptyCodeLines();
            this.extractLabels();
            this.removeEmptyCodeLines();
            this.reindexLabelsFromOGspaceToCodeSpace();

            this.parseSuccesful=true;
        } catch (error) {
            this.parseSuccesful=false;
            console.log(error.toString());
        }
        

    }


    splitIntoLines(_assemblyCode){
        this.lines=_assemblyCode.split(/\r?\n/)
        
        for (let index = 0; index < this.lines.length; index++) {
            const element = this.lines[index];
            this.codeLines.push(new LineOfCode(element,index));
        }


    }



    removeEmptyCodeLines(){
        for (let index = this.codeLines.length-1; index >=0 ; index--) {
            const line = this.codeLines[index].code;
            
            let tmp=line.replaceAll(/\s/g,"");
            if(tmp===""){
                this.codeLines.splice(index,1);
            }
            
        }
    }


    removeComentsFromCodeLines(){
        for (let index = 0; index < this.codeLines.length; index++) {
            const line = this.codeLines[index].code;
            this.codeLines[index].code = this.removeComentFromLine(line);
        }
    }



    removeComentFromLine(_line){
        return _line.split(/(\/\/|;)/)[0];
    }

    extractLabels(){
        for (let index = 0; index < this.codeLines.length; index++) {

            const ogIndex = this.codeLines[index].ogIndex;
            const line = this.codeLines[index].code;
            
            const match= line.match(/:/g);
            const matchCount =match==null?0:match.length;
            if(matchCount>=2){
                throw(new AssemblyParserError("Multiple : symbols in a single line",ogIndex))
            }

            if(matchCount==1){
                let colonSplit = line.split(/:/);

                let labalSide = colonSplit[0];
                let codeSide=colonSplit[1];

                labalSide=labalSide.replaceAll(/\s+/g,' ');
                let newLabels = labalSide.split(/\s/);

                if(newLabels[0]==""){
                    throw(new AssemblyParserError("No labels defined before : symbol",ogIndex))
                }

                for (let index = 0; index < newLabels.length; index++) {
                    const element = newLabels[index];
                    this.labels[element]= ogIndex;
                }

                this.codeLines[index].code=codeSide;
            }



        }
    }


    getOgToCodeArray(){
        let OgToCodeArray=[];

        let i0,i1;

        for (i0=0,i1=1; i1 < this.codeLines.length; i0++,i1++) {
            
            let low = this.codeLines[i0].ogIndex;
            let high = this.codeLines[i1].ogIndex;

            for(let i = low;i<high;i++){
                if(this.codeLines[i0].ogIndex===i){
                    OgToCodeArray[i]=i0;
                }else{
                    OgToCodeArray[i]=i1;
                }
                
            }
            
            
        }

        OgToCodeArray[this.codeLines[this.codeLines.length-1].ogIndex]=this.codeLines.length-1
        return OgToCodeArray;

    }




    reindexLabelsFromOGspaceToCodeSpace(){
        let ogToCodeArray = this.getOgToCodeArray()

        for (const label in this.labels) {
            if (Object.hasOwnProperty.call(this.labels, label)) {
                this.labels[label] =ogToCodeArray[this.labels[label]];
                
            }
        }
    }



    decodeCodelinesIntoValudes(){
        for (let index = 0; index < codeLines.length; index++) {
            const code = codeLines[index].code;
            const ogIndex = this.codeLines.ogIndex;


            


            
        }
    }


}





















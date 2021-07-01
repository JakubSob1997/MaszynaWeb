


class LineOfCode{
    constructor(_code,_originalIndex){
        this.code=_code;
        this.ogLine=_originalIndex;
    }
}


class Word{
    constructor(_value,_originalLine){
        this.value = _value;
        this.ogIndex=_originalLine;
    }
}


class AssemblyInstruction{
    constructor(_opcode,_argumets,_ogIndex){
        this.code=_opcode;
        this.args = _argumets;
        this.ogIndex=_ogIndex;
    }
}


class AssemblyParserError{
    constructor(_erroerMessage,_word){
        this.message = _erroerMessage;
        this.word = _word;
    }

    toString(){
        return(this.message+ +" - "+this.word.value+" at line: "+this.word.ogIndex.toString());
    }
}


class AssemblyMapperError{
    constructor(_erroerMessage,_instr){
        this.message = _erroerMessage;
        this.instruction = _instr;
    }

    toString(){
        return (this.message +
            ": "+this.instruction.code+
            " arg: "+this.instruction.args.join(" ")+
            " at line:"+this.instruction.ogIndex );
    }
}




class AssemblyParser{

    static meomryStrings = ["RST","RPA"];

    constructor(_assemblyCode,_settings,_instructionList){

        this.sourceCode = _assemblyCode;

        this.lines = [];
        this.codeLines =[];


        this.words=[];
        this.labels = {};
        this.instructions = [];
        this.values=[];

        
        this.parseSuccesful = false;
        try {
            let codeWithNoComents = this.removeComents(_assemblyCode);
            this.splitIntoWords(codeWithNoComents);
            this.parseWords(_instructionList);
            this.calculateValues(_instructionList,_settings);

        
            
            //this.splitIntoWords(codeWithNoComents);

            this.parseSuccesful=true;
        } catch (error) {
            this.parseSuccesful=false;
            console.log(error.toString());
        }
        

    }

    removeComentFromLine(_line){
        return _line.split(/(\/\/|;)/)[0];
    }


    removeComents(_assemblyCode){


        let lines=_assemblyCode.split(/\r?\n/);
        

        for (let index = 0; index < lines.length; index++) {
            const line = lines[index];
            lines[index] = this.removeComentFromLine(line);
        }
        return lines.join("\n");
    }


    splitIntoWords(_assemblyCode){

        let lines=_assemblyCode.split(/\r?\n/);
        
        for (let l = 0; l < lines.length; l++) {
            const element = lines[l];

            let formatedLine=element.replaceAll(/\s+/g," ");
            let newWords = formatedLine.split(/\s/);

            for (let w = 0; w < newWords.length; w++) {
                if(newWords[w]!=""){
                    this.words.push( new Word(newWords[w],l));
                }
                
                
            }


        }


    }


    isLabel(_word){
        return _word.charAt(_word.length - 1)==":";
    }

    parseWords(_instructionList){

        let instrCounter = 0;
        for (let index = 0; index < this.words.length; index++) {
            const word = this.words[index];
            const wordValue = this.words[index].value;
            const wordOgIndex = this.words[index].ogIndex;
            
            if(this.isLabel(wordValue)){
                if(this.labels.hasOwnProperty(wordValue)){
                    throw new AssemblyParserError("Label redefitiniton",word);
                }else{
                    this.labels[wordValue]=instrCounter;
                continue;
                }
                
            }


            if(_instructionList.hasInstruction(wordValue)){
                
                const instr =  _instructionList.getInstruction(wordValue);
                let args = [];
                for (let argi = 0; argi < instr.argCount; argi++) {
                    index++;
                    if(index>=this.words.length){
                        throw new AssemblyParserError("Expected argument after "+instr.name+": ",word);
                    }
                    if(this.isLabel(this.words[index].value)){
                        throw new AssemblyParserError("Expected argument after "+instr.name+": ",word);
                    }

                    args.push( this.words[index].value);
                    
                }


                this.instructions[instrCounter]= 
                    new AssemblyInstruction(wordValue,args,wordOgIndex);

                    instrCounter++;
                continue;

            }

            if(word.value=="RPA"){
                this.instructions[instrCounter]= 
                    new AssemblyInstruction("RPA",[],wordOgIndex);
                instrCounter++;
                continue;
            }

            if(word.value=="RST"){
                index++;
                

                if(index < this.words.length){
                    if(this.isLabel(this.words[index].value)){
                        throw new AssemblyParserError("Expected argument after RST: ",word)
                    }


                    this.instructions[instrCounter]= 
                    new AssemblyInstruction("RST",[this.words[index].value],wordOgIndex);
                }else{
                    throw new AssemblyParserError("Expected argument after RST: ",word)
                }
                instrCounter++;
                continue;
            }



            throw new AssemblyParserError("Expected instruction or label",word);


        }
    }


    cleanLabels(){
        for (let index = 0; index < this.labels.length; index++) {
            this.labels[index] = this.labels[index].slice(0,this.labels[index].length-1);
            
        }
    }


    calculateValues(_instructionList,_settings){
        for (let index = 0; index < this.instructions.length; index++) {
            const instr = this.instructions[index];
            
            if(instr.code == "RPA"){
                this.values[index] =0;
                continue;
            }


            if(instr.code == "RST"){

                let parsedArg =parseInt(instr.args[0]);
                if(isNaN(parsedArg)){
                    throw AssemblyMapperError("Argument is not an integer:",instr);
                }

                this.values[index]  = parsedArg;
                continue;
            }



            

            let opcode = _instructionList.getInstructionIndex(instr.code);
            const instructionRefrence= _instructionList.getInstruction(opcode);

            opcode=opcode<<_settings.adressWidth;
            opcode=opcode&_settings.codeMask;

            if(instructionRefrence.argCount==0){
                this.values[index]=opcode;
            }else if(instructionRefrence.argCount==1){
                
                let argVal;

                if(this.labels.hasOwnProperty(instr.args[0]+":")){
                    argVal = this.labels[instr.args[0]+":"];

                }else{
                    argVal = parseInt(instr.args[0]);

                    if(isNaN(argVal)){
                        throw new AssemblyMapperError("Argument is not an adress or label:",instr);
                    }
                }
                argVal=argVal&_settings.adressMask;
                
                this.values[index] = opcode|argVal;
            }
            
        }
    }





    removeComentsFromCodeLines(){
        for (let index = 0; index < this.codeLines.length; index++) {
            const line = this.codeLines[index].code;
            this.codeLines[index].code = this.removeComentFromLine(line);
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





















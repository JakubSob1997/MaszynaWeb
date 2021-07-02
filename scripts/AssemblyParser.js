



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


    constructor(_assemblyCode,_settings,_instructionList){

        this.sourceCode = _assemblyCode;

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

                let slicedLabel = wordValue.slice(0,wordValue.length-1);

                if(this.labels.hasOwnProperty(slicedLabel)){
                    throw new AssemblyParserError("Label redefitiniton",word);
                }else{
                    this.labels[slicedLabel]=instrCounter;
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


    parseArg(_arg){

        let argVal = NaN;

        if(this.labels.hasOwnProperty(_arg)){
            argVal = this.labels[_arg];

        }else{
            argVal = parseInt(_arg);
        }


        return argVal;
    }


    calculateValues(_instructionList,_settings){
        for (let index = 0; index < this.instructions.length; index++) {
            const instr = this.instructions[index];
            
            if(instr.code == "RPA"){
                this.values[index] =0;
                continue;
            }


            if(instr.code == "RST"){

                let parsedArg =this.parseArg(instr.args[0]);
                if(isNaN(parsedArg)){
                    throw AssemblyMapperError("Argument is not an integer or label:",instr);
                }

                this.values[index]  = parsedArg &_settings.getWordMask();
                continue;
            }



            

            let opcode = _instructionList.getInstructionIndex(instr.code);
            const instructionRefrence= _instructionList.getInstruction(opcode);

            opcode=opcode<<_settings.adressWidth;
            opcode=opcode&_settings.codeMask;

            if(instructionRefrence.argCount==0){
                this.values[index]=opcode;
            }else if(instructionRefrence.argCount==1){
                
                let argVal =this.parseArg(instr.args[0]);


                if(isNaN(argVal)){
                    throw new AssemblyMapperError("Argument is not an adress or label:",instr);
                }

                argVal=argVal&_settings.adressMask;
                
                this.values[index] = opcode|argVal;
            }
            
        }
    }


}





















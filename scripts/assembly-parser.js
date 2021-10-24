import Translator from "./translator.js";




class Word{
    constructor(_value,_originalLine,_ogColumn){
        this.value = _value;
        this.ogLine=_originalLine;
        this.ogColumn=_ogColumn
    }
}


class AssemblyLabel{
    constructor(_name,_instrIndex){
        this.name =_name;
        this.instrIndex = _instrIndex;
        this.refrences = [];
    }
}

class AssemblyInstruction{
    constructor(_opcode,_argumets,_ogLine,_ogColumn){
        this.code=_opcode.toUpperCase();
        this.args = _argumets;
        this.ogLine=_ogLine;
        this.ogColumn=_ogColumn
        this.addres;
    }
}


class AssemblyParserError{
    constructor(_erroerMessage,_word){
        this.message = _erroerMessage;
        this.word = _word;
    }

    toString(){

        return Translator.getTranslation(
            "_assembly_parser_error_format",
            "@0 - @1 Line: @2 Character: @3",
            [
                this.message,
                this.word.value,
                this.word.ogLine,
                this.word.ogColumn
            ]
        );

    }
}


class AssemblyMapperError{
    constructor(_erroerMessage,_instr){
        this.message = _erroerMessage;
        this.instruction = _instr;
    }

    toString(){

        return Translator.getTranslation(
            "_assembly_mapper_error_format",
            "@0 Instruction: @1 Argument: @2 Line: @3 Character: @4",
            [
                this.message,
                this.instruction.code,
                this.instruction.args.join(" "),
                this.instruction.ogLine,
                this.instruction.ogColumn
            ]
            );

    }
}




export default class AssemblyParser{


    constructor(_assemblyCode,_settings,_instructionList,_valueDisplayer){

        this.sourceCode = _assemblyCode;

        this.words=[];
        this.labels = {};
        this.instructions = [];
        this.values=[];
        this.valueDisplayer=_valueDisplayer;

        
        this.parseSuccesful = false;
        this.parseSuccesful=true;

        try {
            let codeWithNoComents = this.removeComents(_assemblyCode);
            this.splitIntoWords(codeWithNoComents);
            this.parseWords(_instructionList);
            this.calculateValues(_instructionList,_settings);
        } catch (error) {
            this.parseSuccesful=false;
            this.errorMessage = error.toString();
        }
        

    }
    dispose(){
        delete this.words;
        delete this.labels;
        delete this.instructions;
        delete this.values;
    }

    getInstructionByPositon(_line,_ch){
        if(this.parseSuccesful===false){
            return null
        }

        let closest;
        for (let i = 0; i < this.instructions.length; i++) {
            
            const instr = this.instructions[i];
            
            if(closest==null||instr.ogLine<_line||(instr.ogLine===_line&&instr.ogColumn<_ch)){
                
                closest=instr;
            }
            
        }
        
        return closest;
    }


    removeComentFromLine(_line){
        return _line.split(/(\/\/)/)[0];
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
            const line = lines[l];

            let formatedLine=line.replaceAll(/\s+/g," ");
            let newWords = formatedLine.split(/\s/);
            let fromIndex = 0;


            for (let w = 0; w < newWords.length; w++) {
                const word = newWords[w];
                if(word!=""){
                    
                    const matchIndex =  line.indexOf(word,fromIndex);
                    fromIndex = matchIndex+word.length;
                    
                    this.words.push( new Word(newWords[w],l,matchIndex));
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
            const wordOgLine = this.words[index].ogLine;
            const wordOgColumn = this.words[index].ogColumn;
            
            if(this.isLabel(wordValue)){

                let slicedLabel = wordValue.slice(0,wordValue.length-1);

                if(this.labels.hasOwnProperty(slicedLabel)){
                    throw new AssemblyParserError(
                        Translator.getTranslation("_asm_err_label_redefinition",
                            "Label redefinition."),
                        word);
                }else{
                    if(isNaN(this.valueDisplayer.stringToValue(slicedLabel))){
                        this.labels[slicedLabel]=new AssemblyLabel(slicedLabel,instrCounter);
                    }else{
                        throw new AssemblyParserError(
                            Translator.getTranslation("_asm_err_label_not_number",
                                "Label can't be a number"),
                            word);
                    }
                   
                continue;
                }
                
            }

            

            if(_instructionList.hasInstruction(wordValue)){
                
                const instr =  _instructionList.getInstruction(wordValue);
                let args = [];
                for (let argi = 0; argi < instr.argCount; argi++) {
                    index++;
                    if(index>=this.words.length){
                        throw new AssemblyParserError(Translator.getTranslation("_asm_err_expected_argument","Expected argument.") ,word);
                    }
                    if(this.isLabel(this.words[index].value)){
                        throw new AssemblyParserError(Translator.getTranslation("_asm_err_expected_argument","Expected argument."),word);
                    }

                    args.push( this.words[index].value);
                    
                }


                this.instructions[instrCounter]= 
                    new AssemblyInstruction(wordValue,args,wordOgLine,wordOgColumn);

                    instrCounter++;
                continue;

            }

            if(word.value.toUpperCase()==="RPA"){
                this.instructions[instrCounter]= 
                    new AssemblyInstruction("RPA",[],wordOgLine,wordOgColumn);
                instrCounter++;
                continue;
            }

            if(word.value.toUpperCase()==="RST"||word.value.toUpperCase()==="RTB"){
                index++;
                

                if(index < this.words.length){
                    if(this.isLabel(this.words[index].value)){
                        throw new AssemblyParserError(Translator.getTranslation("_asm_err_expected_argument","Expected argument."),word)
                    }


                    this.instructions[instrCounter]= 
                    new AssemblyInstruction(word.value,[this.words[index].value],wordOgLine,wordOgColumn);
                }else{
                    throw new AssemblyParserError(Translator.getTranslation("_asm_err_expected_argument","Expected argument."),word)
                }
                instrCounter++;
                continue;
            }



            throw new AssemblyParserError(Translator.getTranslation("_asm_err_expected_instr_label","Expected insturction or label."),word);


        }
    }



    parseArg(_arg,_argAddres){

        let argVal = NaN;

        if(this.labels.hasOwnProperty(_arg)){
            this.labels[_arg].refrences.push(_argAddres);
            return 0;

        }else{
            if(this.valueDisplayer!=null){
                argVal = this.valueDisplayer.stringToValue(_arg)
            }else{
                argVal = parseInt(_arg);
            }
            
        }


        return argVal;
    }


    calculateValues(_instructionList,_settings){
        let addres = 0;
        for (let index = 0; index < this.instructions.length; index++) {
            const instr = this.instructions[index];
            
            if(instr.code === "RPA"){

                instr.addres=addres;
                this.values[addres] =0;
                addres++;
                continue;
            }


            if(instr.code === "RST"){

                let parsedArg =this.parseArg(instr.args[0],addres);
                if(isNaN(parsedArg)){
                    throw new AssemblyMapperError(Translator.getTranslation("_asm_err_invalid_arg","Argument: @0 is not an value or label.",[instr.args[0]]),instr);
                }

                instr.addres=addres;
                this.values[addres]  = parsedArg &_settings.getWordMask();
                addres++;
                continue;
            }

            if(instr.code==="RTB"){
                let parsedArg =this.parseArg(instr.args[0],addres);
                
                if(isNaN(parsedArg)||parsedArg<=0){
                    throw new AssemblyMapperError(Translator.getTranslation("_asm_err_not_positive","Argument: @0 is not a positive integer.",[instr.args[0]]),instr);
                }
                instr.addres=addres;
                for (let i = 0; i < parsedArg; i++) {
                    this.values[addres]  = 0;
                    addres++;      
                }
                continue;
            }



            

            let opcode = _instructionList.getInstructionIndex(instr.code);
            const instructionRefrence= _instructionList.getInstruction(opcode);

            opcode=opcode<<_settings.adressWidth;
            opcode=opcode&_settings.codeMask;

            if(instructionRefrence.argCount==0){
                instr.addres=addres;
                this.values[addres]=opcode;
                addres++;
            }else if(instructionRefrence.argCount>=1){
                
                let argVal =this.parseArg(instr.args[0],addres);


                if(isNaN(argVal)){
                    throw new AssemblyMapperError(Translator.getTranslation("_asm_err_invalid_arg","Argument: @0 is not an value or label.",[instr.args[0]]),instr);
                }

                argVal=argVal&_settings.adressMask;
                
                instr.addres=addres;
                this.values[addres] = opcode|argVal;
                addres++;
            }

            if(instructionRefrence.argCount>1){
                for (let i = 1; i < instr.args.length; i++) {
                    const arg = instr.args[i];
                    const parsedArg= this.parseArg(instr.args[i],addres);
                    if(isNaN(parsedArg)){
                        throw new AssemblyMapperError(Translator.getTranslation("_asm_err_invalid_arg","Argument: @0 is not an value or label.",[arg]),instr);
                    }

                    this.values[addres] =parsedArg;
                    addres++;
                }
            }
        }


        for (const name in this.labels) {
            if (Object.hasOwnProperty.call(this.labels, name)) {
                const label = this.labels[name];
                const addr  = this.instructions[label.instrIndex].addres;

                for (let r = 0; r < label.refrences.length; r++) {
                    const ref = label.refrences[r];
                    const val =  addr&_settings.adressMask;
                    this.values[ref] =this.values[ref]|val;
                }
            }
        }


    }
}




           
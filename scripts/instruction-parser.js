
import Instruction,{InstrCycle,BranchCondition} from "./instruction.js";



class InstructionLine{
    constructor(_words,_instrIndex){
        this.words = _words;
        this.instrIndex = _instrIndex;

        this.label=null;
        this.isFinal=false;
        this.isBranchPlaceholder=false;
        this.signals=null;

        this.warning;

        this.parseSuccesful=this.parseIntructionLine(_words);
    }

    
    isLabel(_string){
        return _string[0]=="@";
    }

    parseIntructionLine(_words){
        let startIndex=0;
        let endIndex=_words.length;

        if(this.isLabel(_words[0])){
            this.label = _words[0];
            startIndex++;
        }else{
            this.label=null;
        }

        if(_words[_words.length-1].toUpperCase()=="KONIEC"){
            this.isFinal=true;
            endIndex--;
        }else{
            this.isFinal=false;
        }

        if(endIndex - startIndex <=0){
            this.signals=[]
        }else{
            this.signals = _words.slice(startIndex,endIndex);
        }

       
        return true;
    }

}

class BranchLine{
    constructor(_words,_instrIndex){
       // this.words = _words;
        this.instrIndex=_instrIndex;
        this.warning =null;
        this.negate=false;
        this.flagName=null;
        this.label=null;

        this.parseSuccesful= this.parseBranch(_words);
    }


    logWarning(_string){
        this.warning=_string;
    }

    parseBranch(_words){

        if(_words.length<3){return false;}


        let wordIndex = 0;
        if(_words[wordIndex].toUpperCase()!="JEZELI"){
            this.logWarning("Invalid branch statment")
            return false;
        }
        wordIndex++;


        if(_words[wordIndex]=="NIE"){
            if(_words.length!=4){
                this.logWarning("Invalid branch statment")
                return false;
            }
            this.negate=true;
            wordIndex++;

        }else{
            if(_words.length!=3){
                this.logWarning("Invalid branch statment")
                return false;
            }

            this.negate=false;
        }

        this.flagName=_words[wordIndex];
        wordIndex++;


        this.label=_words[wordIndex];
        wordIndex++;

        return true;
    }

}

class SettingsLine{
    constructor(_words){
        this.words = _words;
        this.noArgs=false;
        this.name=null;

        this.parseSuccesful=true;
        this.warning=null;

        this.parse(_words);

    }

    logWarning(_string){
       this.warning=_string;
    }

    parse(_words){
        if(_words[0].toUpperCase()=="BEZARG"){
            this.noArgs=true;
        }

        if(_words[0].toUpperCase()=="ROZKAZ"){
            if(_words.length==2){
                this.name=_words[1].toUpperCase();
            }else{
                this.logWarning("Expected instruction name after: "+ _words[0])
            }
        }
    }


    applyNoArgs(_instr){
        _instr.argCount=0;
    }

    applyName(_instr,_name){
        _instr.name=_name;
    }

    applySetting(_instruction){
        if(this.noArgs===true){
            this.applyNoArgs(_instruction);
        }

        if(this.name!=null){
            this.applyName(_instruction,this.name);
        }
    }

}

class InstructionLabel{
    constructor(_labelName,_instrIndex){
        this.name=_labelName;
        this.index=_instrIndex;
    }
}


export default class InstrcutionParser{

    constructor(_sourceCode){
        this.source= _sourceCode;
        this.wordLines=[];


        this.settingLines=[];
        this.branchLines=[];
        this.instructionLines=[];

        this.labels={};

        this.parseSuccesful = false;
        this.errorList=[];


        const comentless = this.removeComents(_sourceCode);
        this.splitIntoLines(comentless);
        this.parseLines();

    }


    validateSettings(){
        let expectedName = null;
        for (let i = 0; i < this.settingLines.length; i++) {
            const setting = this.settingLines[i];
            expectedName = setting.name ?? expectedName;
            if(setting.parseSuccesful==false){
                this.parseSuccesful=false;
            }

            
        }
        if(expectedName==null){
            this.errorList.push("Expected: ROZKAZ (name)");
            this.parseSuccesful=false;
        }

        for (let i = 0; i < this.settingLines.length; i++) {
            const setting = this.settingLines[i];
            if(setting.warning!=null){
                this.errorList.push(setting.warning)
            }
        }

    }

    validateBranches(_flagDictionary){
        for (let i = 0; i < this.branchLines.length; i++) {
            const branch = this.branchLines[i];

            
            if(branch.warning!=null){
                this.errorList.push(branch.warning);
            }
            
            if(branch.parseSuccesful==false){
                this.parseSuccesful=false;
                continue;
            }

            if(this.labels.hasOwnProperty(branch.label)==false){
                this.parseSuccesful=false;
                this.errorList.push("Undefined label: "+branch.label);
            }

            if(_flagDictionary.hasOwnProperty(branch.flagName)==false){
                this.parseSuccesful=false;
                this.errorList.push("Undefined flag: "+branch.flagName);
            }
            

        }
    }

    validateSignals(_signalDictionary){
        for (let i = 0; i < this.instructionLines.length; i++) {
            const line = this.instructionLines[i];

            for (let j = 0; j < line.signals.length; j++) {
                const signal = line.signals[j];
                if(_signalDictionary.hasOwnProperty(signal)==false){
                    this.parseSuccesful=false;
                    this.errorList.push("Undefined signal: "+ signal);
                }
            }
            
        }
    }

    validate(_Machine){
        this.parseSuccesful=true;
        this.validateSettings();
        this.validateBranches(_Machine.flagUnit.conditionFlags);
        this.validateSignals(_Machine.singnalDictionary)
        return this.parseSuccesful;
    }


    removeComentFromLine(_line){
        return _line.split(/(\/\/)/)[0];
        
    }


    removeComents(_code){


        let lines=_code.split(/\r?\n/);
        

        for (let index = 0; index < lines.length; index++) {
            const line = lines[index];
            lines[index] = this.removeComentFromLine(line);
        }
        return lines.join("\n");
    }

    splitIntoLines(_code){


        let newLines = _code.split(/;/);

        for (let index = 0; index < newLines.length; index++) {
            const element = newLines[index];
            let formatedLine=element.replaceAll(/\s+/g," ");
            let newWords = formatedLine.split(/\s/);

            
            let wordArr=[];
            for (let w = 0; w < newWords.length; w++) {
                const word = newWords[w];
                if(word!=""){
                    wordArr.push(word);
                }
            }

            if(wordArr.length>0){
                this.wordLines.push(wordArr);
            }
           
        }



        


    }

    isBranchLine(_wordArry){
        return _wordArry[0].toUpperCase()=="JEZELI";
    }

    isSettingsLine(_wordArry){

        const word = _wordArry[0].toUpperCase();

        if(word == "ROZKAZ"){
            return true;
        }

        if(word=="BEZARG"){
            return true;
        }
        return false;
    }

    hasLabel(_wordArry){
        return this.isLabel(_wordArry[0]);
    }

    isLabel(_string){
        return _string[0]=="@";
    }


    parseLine(_wordArry,_nextInstrIndex){

        if(this.isSettingsLine(_wordArry)){
            this.settingLines.push(new SettingsLine(_wordArry));
            return _nextInstrIndex;
        }

        if(this.isBranchLine(_wordArry)){
            this.branchLines.push(new BranchLine(_wordArry,_nextInstrIndex))
            return _nextInstrIndex;
        }

        if(this.isLabel(_wordArry[0])){
            this.labels[_wordArry[0]]=new InstructionLabel(_wordArry[0],_nextInstrIndex);
        }

        this.instructionLines.push(new InstructionLine(_wordArry,_nextInstrIndex));
        return _nextInstrIndex+1;
    }

    parseLines(){
        let nextInstrIndex=0;
        for (let index = 0; index < this.wordLines.length; index++) {
            const element = this.wordLines[index];
            nextInstrIndex= this.parseLine(element,nextInstrIndex);
        }
    }

    toInstruction(){
        let instruction = new Instruction(null)
        instruction.source=this.source;

        for (let index = 0; index < this.settingLines.length; index++) {
            const setting = this.settingLines[index];

            setting.applySetting(instruction);
            
        }



        for (let index = 0; index < this.instructionLines.length; index++) {
            const line = this.instructionLines[index];
            instruction.cycles[index]= new InstrCycle(line.signals);
            instruction.cycles[index].isFinal=line.isFinal;
            
        }

        for (let index = 0; index < this.branchLines.length; index++) {
            const branchLine = this.branchLines[index];
            const label =  this.labels[branchLine.label];

            if(label===undefined){
                return null;
            }

            let targetIndex = this.labels[branchLine.label].index;

            
            instruction.cycles[branchLine.instrIndex].branchCondtions.push(
                new BranchCondition(
                    branchLine.flagName,
                    targetIndex,
                    branchLine.negate
                    )
            )
               
            
        }

        return instruction;
    }

}



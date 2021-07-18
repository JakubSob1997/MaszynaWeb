


class InstructionLine{


}


class InstrcutionParser{

    constructor(_sourceCode){
        this.source= _sourceCode;

        this.textlines = this.splitIntoLines(_sourceCode);
        


    }


    splitIntoLines(_code){
        let lines=_code.split(/;/);
        
        for (let l = 0; l < lines.length; l++) {
            const element = lines[l];

            let formatedLine=element.replaceAll(/\s+/g," ");
            let newWords = formatedLine.split(/\s/);

            for (let w = 0; w < newWords.length; w++) {
                if(newWords[w]!=""){
                    this.words.push( new Word(newWords[w].toUpperCase(),l));
                }
                
                
            }


        }


    }

}



















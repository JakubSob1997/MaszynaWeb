

const Translator = {
    translations: {},
    language: "en",
    debugFlag:true,
    setLanguage:function(_lang){
        localStorage.setItem("lang",_lang);
    },
    getLanguage:function(){

        const stashed = localStorage.getItem("lang");
        if(stashed!=null){
            return stashed
        }else{
            return"en"
        }

    },

    getDebug(_key,_arguments){
        let output =_key;
        if(_arguments!=null){
            for (let i = 0; i < _arguments.length; i++) {
                const arg = _arguments[i];
                output+="_"+i+":"+arg;
            }
        }
        
        return output;
    },

    
    getTranslation(_key,_defaultText,_arguments){


        if(this.language==="DEBUG"){
            return this.getDebug(_key,_arguments)
        }

        let baseText;

        if(this.translations.hasOwnProperty(_key)&&this.translations[_key].hasOwnProperty(this.language)){
            baseText= this.translations[_key][this.language];
        }else{
            if(this.debugFlag&&this.language!="DEFAULT"){
                return this.getDebug(this.language+_key,_arguments)
            }else{
                if(_defaultText===null){
                    return this.getDebug(_key,_arguments);
                }
                baseText=_defaultText;
            }
            
        }

        let returnText;
        if(_arguments!=null){
                
            returnText=baseText;
            //Using improbable replace hash to weed out false positives
            const replaceHash = "_-#$%@%$#-_"

            for (let i = 0; i < _arguments.length; i++) {
                const index =i.toString()
                const match = "@"+index;
                const replace = replaceHash+index;

                returnText = returnText.replace(match,replace);
            }

            for (let i = 0; i < _arguments.length; i++) {
                const arg = _arguments[i];
                const index =i.toString()
                const match = replaceHash+index;
                const replace = arg;

                returnText = returnText.replace(match,replace);
            }



        }else{
            returnText=baseText;
        }
        
        return returnText;
        
    }
    
}
export default Translator;




























const Translator = {
    translations: {},
    language: "en",
    debugFlag:false,
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
                const arg = _arguments[index];
                output+="-"+i+":"+arg;
            }
        }
        
        return output;
    },

    getTranslation(_key,_defaultText,_arguments){


        if(this.language==="DEBUG"){
            return this.getDebug(_key,_arguments)
        }

        console.log(this.translations);
        let baseText;

        if(this.translations.hasOwnProperty(_key)&&this.translations[_key].hasOwnProperty(this.language)){
            baseText= this.translations[_key][this.language];
        }else{
            if(this.debugFlag){
                return this.getDebug(this.language+_key,_arguments)
            }else{
                baseText=_defaultText;
            }
            
        }

        let returnText;
        if(_arguments!=null){
            for (let i = 0; i < _arguments.length; i++) {
                const arg = _arguments[i];
                
            }
        }else{
            returnText=baseText;
        }
        
        return returnText;
        
    }
    
}
export default Translator;


























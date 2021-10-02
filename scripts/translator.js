

const Translator = {
    translations: {},
    language: "en",
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


    getTranslation(_key,_defaultText,_arguments){


        if(this.language==="DEBUG"){
            let output =_key;
            if(_arguments!=null){
                for (let i = 0; i < _arguments.length; i++) {
                    const arg = _arguments[index];
                    output+="-"+i+":"+arg;
                }
            }
            
            return output;
        }

        console.log(this.translations);
        let baseText;

        if(this.translations.hasOwnProperty(_key)&&this.translations[_key].hasOwnProperty(this.language)){
            baseText= this.translations[_key][this.language];
        }else{
            baseText=_defaultText;
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


























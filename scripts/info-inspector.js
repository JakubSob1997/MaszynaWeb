import SidebarContent from "./sidebar-content.js";
import Translator from "./translator.js"

export class InfoEntry{
    constructor(_inspector,_content,_title){
        this.inspector = _inspector;
        this.wrapper = document.createElement("div");
        this.header=document.createElement("h2");
        this.content=document.createElement("main");

        this.wrapper.classList.add("info-inspector-entry");

        this.header.innerText=_title;
        this.content.innerHTML=_content;
        this.header.tabIndex=0;

        if(_title!=null){
            this.wrapper.appendChild(this.header);
        }

        this.content.querySelectorAll("span[data-key]").forEach((ele)=>{

            ele.addEventListener("click",(e)=>{
                this.keySpanCliicked(ele.getAttribute("data-key"));
            })
        })
        
        this.wrapper.appendChild(this.content);
    }

    focus(){
        this.header.focus();

    }

    keySpanCliicked(_key){
        this.inspector.focusOnKey(_key)
    }

    getHTMLElement(){
        return this.wrapper;
    }
}


export default class InfoInspector extends SidebarContent{
    constructor(){
        super();

        this.wrapper;
        this.header;
        this.entries;
    
        this.build()
    }
    focus(){
        this.header.focus();
    }

    build(){
        this.wrapper = document.createElement("div");
        this.header = document.createElement("h1")
        this.content = document.createElement("div");

        this.header.innerHTML="Info"

        this.wrapper.classList.add("generic-inspector");
        this.content.classList.add("info-inspector-content");

        this.header.setAttribute("tabindex",-1);

        this.pullEntries(this.content);

        this.wrapper.appendChild(this.header);
        this.wrapper.appendChild(this.content);
    }

    focusOnKey(_key){
        if(this.entries.hasOwnProperty(_key)){
            this.entries[_key].focus();
        }
    }
    pullEntries(_parent){
        const templateEntries = document.querySelectorAll("template.info-entry");

        /**
         * Map
         * {
         *  key:{
         *      lang1:entry1,
         *      lang2:entry2
         *      }
         * }
         */
        let keyEntryMap = new Map();

        /**
         * Default
         * {
         *  key:entry
         * }
         */
        let deufaultEntries = {}
        


        templateEntries.forEach(entry => {


            const key= entry.getAttribute("data-key");
            let lang = entry.getAttribute("lang");

            if(entry.hasAttribute("data-default")){
                if(key!=null){
                    deufaultEntries[key]=entry;
                }
            }
            if(lang===null){
                lang="_"
            }

            if(key!=null){
                if(keyEntryMap.has(key)){
                    keyEntryMap.get(key)[lang]=entry;
                }else{
                    const obj = {}
                    obj[lang]=entry;
                    keyEntryMap.set(key,obj)
                }
            }
        });


        const currentLanguge = Translator.getLanguage();

        this.entries={};
        for (const key of keyEntryMap.keys()) {
            let entryToAppend=null;
            const entryTranslations = keyEntryMap.get(key)
            
            if(entryTranslations.hasOwnProperty(currentLanguge)){
                entryToAppend=entryTranslations[currentLanguge];
            }

            if(entryToAppend==null){
                if(deufaultEntries.hasOwnProperty(key)){
                    entryToAppend=deufaultEntries[key];
                }
            }

            if(entryToAppend!=null){

                const entry =new InfoEntry(this,entryToAppend.innerHTML,entryToAppend.getAttribute("data-title"));
                this.entries[key]=(entry);
                _parent.appendChild(entry.getHTMLElement());
            }
     
        }


    }

    getHTMLElement(){
        return this.wrapper;
    }
    
}
















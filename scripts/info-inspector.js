import SidebarContent from "./sidebar-content.js";
import Translator from "./translator.js"

export class InfoEntry{
    constructor(_content,_title){
        this.wrapper = document.createElement("div");
        this.header=document.createElement("h4");
        this.content=document.createElement("main");

        this.wrapper.classList.add("info-inspector-entry");

        this.header.innerText=_title;
        this.content.innerHTML=_content;
        this.header.tabIndex=0;

        if(_title!=null){
            this.wrapper.appendChild(this.header);
        }
        
        this.wrapper.appendChild(this.content);
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
        this.header = document.createElement("h3")
        this.content = document.createElement("div");

        this.header.innerHTML="Info"

        this.wrapper.classList.add("generic-inspector");
        this.content.classList.add("info-inspector-content");

        this.header.setAttribute("tabindex",-1);

        this.pullEntries(this.content);

        this.wrapper.appendChild(this.header);
        this.wrapper.appendChild(this.content);
    }


    pullEntries(_parent){
        const templateEntries = document.getElementsByClassName("info-entry");
        this.entries=[];

        for (let i = 0; i < templateEntries.length; i++) {
            const template = templateEntries[i];
            if(template.lang===Translator.getLanguage()){
                const entry =new InfoEntry(template.innerHTML,template.getAttribute("data-title"));
                this.entries.push(entry);
                _parent.appendChild(entry.getHTMLElement());
            }
            
        }


    }





    getHTMLElement(){
        return this.wrapper;
    }
    
}
















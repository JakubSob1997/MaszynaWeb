import Alerter from "./alerter.js";
import { AlertStyleEnum } from "./enums.js";
import FileViewBase from "./file-view-base.js";
import Translator from "./translator.js";





export default class FileFetchView extends FileViewBase{
    constructor(_fileInspector){
        
        super(_fileInspector,Translator.getTranslation("_presets","Presets"))

        this.entries;

        this.build();

        this.fetchListing();
    }

    setEntriesActive(_bool){

        for (const key in this.entries) {
            if (Object.hasOwnProperty.call(this.entries, key)) {
                const entry = this.entries[key];
                if(_bool){
                    entry.removeAttribute("disabled");
                }else{
                    entry.setAttribute("disabled",true);
                    
                }
                
            }
        }
    }


    fetchPreset(_fileName){
        this.setEntriesActive(false);

        fetch("./presets/"+_fileName)
            .then(res=>res.json())
            .then(data=>{
                data.fileName=_fileName;
                this.recievedPreset(data)
            })
            .catch((e)=>{
                Alerter.sendMessage(Translator.getTranslation("_message_fail_load_preset","Failed to load \"@0\" preset.",[_fileName]),AlertStyleEnum.InputError);
            })
            .finally(()=>{
                this.setEntriesActive(true);
            })
        
    }


    fetchListing(){
        this.refreshButton.setAttribute("disabled",true);
        fetch("presets.json")
            .then(res=>res.json())
            .then(data=>this.setupEntries(data))
            .catch(()=>{
                Alerter.sendMessage(Translator.getTranslation("_message_fail_load_preset_list","Failed to load the preset list."),AlertStyleEnum.InputError)
            })
            .finally(()=>{
                this.refreshButton.removeAttribute("disabled");
            })
    
        
    
    }


    recievedPreset(_data){
        this.pickObject(_data);
    }

    setupEntries(_nameList){
        this.presetListElement.innerHTML="";
        this.entries = {};
        _nameList.forEach(_name => {
            
            this.setupEntry(_name,this.presetListElement);
        });
    }

    setupEntry(_fileName,_parentElement){
        let entry = document.createElement("button");
        entry.innerText=_fileName;
        entry.classList.add("file-entry");
        

        entry.addEventListener("click",()=>{
            this.fetchPreset(_fileName);
        })

        this.entries[_fileName] = entry;
        _parentElement.appendChild(entry);
    }


    build(){
        
        this.refreshButton = document.createElement("button");
        this.presetListElement = document.createElement("div");

        this.refreshButton.innerText = Translator.getTranslation("_refresh","Refresh");
        this.refreshButton.classList.add("custom-btn");

        this.content.appendChild(this.refreshButton);
        this.content.appendChild(this.presetListElement);

        this.refreshButton.addEventListener("click",()=>{
            this.presetListElement.innerHTML="";
            this.fetchListing();
        })
    }

    getHTMLElement(){
        return this.wrapper;
    }

}
import Alerter from "./alerter.js";
import { AlertStyleEnum } from "./enums.js";
import FileViewBase from "./file-view-base.js";





export default class FileFetchView extends FileViewBase{
    constructor(_fileInspector){
        
        super(_fileInspector,"Presety")

        this.build();

        this.fetchListing();
    }


    fetchPreset(_fileName){
        fetch("./presets/"+_fileName)
            .then(res=>res.json())
            .then(data=>{
                data.fileName=_fileName;
                this.recievedPreset(data)
            })
            .catch((e)=>{
                Alerter.sendMessage("Wczytanie presetu \""+_fileName+"\" się nie powiodło.",AlertStyleEnum.InputError)
            })
        
    }


    fetchListing(){
        fetch("presets.json")
            .then(res=>res.json())
            .then(data=>this.setupEntries(data))
            .catch(()=>{
                Alerter.sendMessage("Wczytanie listy presetów się nie powiodło.",AlertStyleEnum.InputError)
            })
    
        
    
    }


    recievedPreset(_data){
        this.pickObject(_data);
    }

    setupEntries(_nameList){
        this.presetListElement.innerHTML="";

        _nameList.forEach(_name => {
            this.setupEntry(_name,this.presetListElement);
        });
    }

    setupEntry(_fileName,_parentElement){
        let entry = document.createElement("button");
        entry.innerHTML=_fileName;
        entry.classList.add("file-entry");

        entry.addEventListener("click",()=>{
            this.fetchPreset(_fileName);
        })

        _parentElement.appendChild(entry);
    }


    build(){
        
        this.refreshButton = document.createElement("button");
        this.presetListElement = document.createElement("div");

        this.refreshButton.innerHTML = "Odśwież";
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
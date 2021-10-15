


import SidebarContent from "./sidebar-content.js";
import FileExportView from "./file-export-view.js";
import FileImportView from "./file-import-view.js";
import FileDefaultView from "./file-default-view.js";
import FileFetchView from "./file-fetch-view.js";
import FilePreviewView from "./file-prreview.js";
import Translator from "./translator.js";

export default class FileSInspector extends SidebarContent{
    constructor(){
        super();

        this.wrapper;
        this.header;


        this.fileImportView;
        this.fileExportView;
        

        this.build()
    }
    focus(){
        this.header.focus();
    }

    build(){
        this.wrapper = document.createElement("div");
        this.header = document.createElement("h1")


        this.content = document.createElement("div");
        this.FilePreviewView = new FilePreviewView();
        this.fileDefaultView = new FileDefaultView(this);
        this.fileImportView=new FileImportView(this);
        this.fileExportView=new FileExportView(this);
        this.FileFetchView = new FileFetchView(this);


        this.header.innerText=Translator.getTranslation("_file","File");



        this.wrapper.classList.add("generic-inspector");
        this.content.classList.add("file-inspector-content");

        this.header.setAttribute("tabindex",-1);

        this.content.appendChild(this.fileExportView.getHTMLElement());
        this.content.appendChild(this.FilePreviewView.getHTMLElement());
        
        this.content.appendChild(this.fileImportView.getHTMLElement());
        this.content.appendChild(this.FileFetchView.getHTMLElement());
        this.content.appendChild(this.fileDefaultView.getHTMLElement());
        
        this.wrapper.appendChild(this.header);
        this.wrapper.appendChild(this.content);
    }

    previewObj(_obj){
        this.FilePreviewView.preview(_obj);
    }


    getHTMLElement(){
        return this.wrapper;
    }
    
}




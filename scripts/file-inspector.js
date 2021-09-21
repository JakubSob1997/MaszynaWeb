


import SidebarContent from "./sidebar-content.js";
import FileExportView from "./file-export-view.js";
import FileImportView from "./file-import-view.js";
import FileDefaultView from "./file-default-view.js";

export default class FileSInspector extends SidebarContent{
    constructor(){
        super();

        this.wrapper;
        this.header;


        this.fileImportView;
        this.fileExportView;
        

        this.build()
        this.addCallbacks();
    }
    focus(){
        this.header.focus();
    }

    build(){
        this.wrapper = document.createElement("div");
        this.header = document.createElement("h3")


        this.content = document.createElement("div");
        this.fileDefaultView = new FileDefaultView();
        this.fileImportView=new FileImportView();
        this.fileExportView=new FileExportView();


        this.header.innerHTML="Plik"



        this.wrapper.classList.add("generic-inspector");

        this.header.setAttribute("tabindex",-1);

        
        this.content.appendChild(this.fileExportView.getHTMLElement());
        this.content.appendChild(this.fileImportView.getHTMLElement());
        this.content.appendChild(this.fileDefaultView.getHTMLElement());
        this.wrapper.appendChild(this.header);
        this.wrapper.appendChild(this.content);
    }

    addCallbacks(){

    }


    getHTMLElement(){
        return this.wrapper;
    }
    
}




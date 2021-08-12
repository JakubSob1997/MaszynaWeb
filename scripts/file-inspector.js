


import SidebarContent from "./sidebar-content.js";
import FileExportView from "./file-export-view.js";
import FileImportView from "./file-import-view.js";

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

        this.navigation = document.createElement("div");
        this.importButton = document.createElement("button");
        this.exportButton = document.createElement("button");

        this.content = document.createElement("div");
        this.fileImportView=new FileImportView();
        this.fileExportView=new FileExportView();


        this.header.innerHTML="Plik"
        this.importButton.innerHTML="Import";
        this.exportButton.innerHTML="Export"


        this.wrapper.classList.add("generic-inspector");
        this.importButton.classList.add("custom-btn");
        this.exportButton.classList.add("custom-btn");

        this.header.setAttribute("tabindex",-1);

        this.navigation.appendChild(this.importButton);
        this.navigation.appendChild(this.exportButton);

        this.content.appendChild(this.fileImportView.getHTMLElement());

        this.wrapper.appendChild(this.header);
        this.wrapper.appendChild(this.navigation);
        this.wrapper.appendChild(this.content);
    }

    addCallbacks(){
        this.importButton.addEventListener("click",()=>{
            this.content.innerHTML="";
            this.content.appendChild(this.fileImportView.getHTMLElement());
        });

        this.exportButton.addEventListener("click",()=>{
            this.content.innerHTML="";
            this.content.appendChild(this.fileExportView.getHTMLElement());
        })
    }


    getHTMLElement(){
        return this.wrapper;
    }
    
}




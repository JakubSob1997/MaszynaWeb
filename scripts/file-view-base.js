



export default class FileViewBase{

    constructor(_fileInspector,_headerName){
        this.wrapper = document.createElement("div");
        this.header = document.createElement("h4")
        this.content = document.createElement("div");

        this.header.classList.add("file-view-header");
        this.wrapper.classList.add("file-view-wrapper");

        this.header.innerText = _headerName;

        this.wrapper.appendChild(this.header);
        this.wrapper.appendChild(this.content);

        this.fileInspector = _fileInspector;
    }


    pickObject(_presetObject){
        this.fileInspector.previewObj(_presetObject);
    }




    getHTMLElement(){
        return this.wrapper;
    }

}








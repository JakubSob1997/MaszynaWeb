





export default class FileExportView{

    constructor(){
        this.wrapper;
        this.build();
    }

    build(){
        this.wrapper=document.createElement("div");

        this.wrapper.innerHTML="export W.I.P";

    }

    getHTMLElement(){
        return this.wrapper;
    }


}















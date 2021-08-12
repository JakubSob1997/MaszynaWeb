





export default class FileImportView{

    constructor(){
        this.wrapper;
        this.build();
    }

    build(){
        this.wrapper=document.createElement("div");
        this.wrapper.innerHTML="import W.I.P";

    }

    getHTMLElement(){
        return this.wrapper;
    }


}





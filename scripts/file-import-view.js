





export default class FileImportView{

    constructor(){
        this.wrapper;
        this.build();
    }

    build(){
        this.wrapper=document.createElement("div");

        this.header=document.createElement("h4");
        this.localButton=document.createElement("input");
        this.localButton.type="file"

        this.header.innerHTML="Impport";

        this.wrapper.appendChild(this.header);
        this.wrapper.appendChild(this.localButton);


        this.localButton.oninput=()=>{
            console.log(this.localButton.value)
        }

    }

    getHTMLElement(){
        return this.wrapper;
    }


}





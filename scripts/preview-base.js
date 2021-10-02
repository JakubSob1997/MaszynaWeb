import MachineExtensionData from "./machine-extension-data.js";


export default class PreviewBase{
    constructor(_headerName){
        this.wrapper = document.createElement("div");
        this.header=document.createElement("h5");
        this.content = document.createElement("div");

        this.header.classList.add("prview-entry-header")

        this.header.innerHTML=_headerName;
        this.wrapper.appendChild(this.header);
        this.wrapper.appendChild(this.content);

    }


    fillPreview(_obj){

    }

    getHTMLElemet(){
        return this.wrapper;
    }

}


export class PreviewFileName extends PreviewBase{

    constructor(){
        super("Nazwa Pliku");
    }

    fillPreview(_obj){
        
        if(_obj.hasOwnProperty("fileName")){
            this.content.innerHTML=_obj.fileName;
            this.wrapper.classList.remove("display-none");
        }else{
            this.wrapper.classList.add("display-none");
        }
    }
}


export class PreviewInstructionList extends PreviewBase{

    constructor(){
        super("Lista Instrukcji");
    }

    fillPreview(_obj){
        
        
        if(_obj.hasOwnProperty("instructionList")){
            const dataArr = _obj.instructionList.instructionDataArray;
            let result = "";

            
            dataArr.forEach(data => {
                result += ", "+data.name;
            });

            this.content.innerHTML=result.slice(2);
            this.wrapper.classList.remove("display-none");
        }else{
            this.wrapper.classList.add("display-none");
        }

    }
}

export class PreviewProgram extends PreviewBase{

    constructor(){
        super("Program")
    }

    fillPreview(_obj){
        if(_obj.hasOwnProperty("program")){
            let result = _obj.program;


            
            if(result.length>150){
                result = result.slice(0,147)+"...";
            }
            if(result==""){result=" ";}
            this.content.innerHTML=result;
            this.wrapper.classList.remove("display-none");
        }else{
            this.wrapper.classList.add("display-none");
        }
    }
}

export class PreviewExtensions extends PreviewBase{

    constructor(){
        super("Moduły")
    }

    fillPreview(_obj){

        if(_obj.hasOwnProperty("settings")&&_obj.settings.hasOwnProperty("extensionData")){
            const data = _obj.settings.extensionData;
            console.log(data);

            let result =MachineExtensionData.prototype.toString.call(data)
            
            if(result==""){result=" ";}
            this.content.innerHTML=result;
            this.wrapper.classList.remove("display-none");
        }else{
            this.wrapper.classList.add("display-none");
        }

    }


}




















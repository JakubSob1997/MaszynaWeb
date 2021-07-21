



class AssemblyEditor{
    constructor(_machine){
        this.wrapper = document.createElement("div");
        this.title=document.createElement("h1");
        this.textArea =document.createElement("textarea");
        this.loadButton = document.createElement("button");
        this.copyButton = document.createElement("button");
        this.warningArea = document.createElement("div");

        this.M = _machine;

        this.build();

        this.addCallbacks();

        let editor = document.getElementById("assembly-editor");
        editor.appendChild(this.getHTMLElment());

        this.load();

    }

    getHTMLElment(){
        return this.wrapper;
    }


    build(){
        this.wrapper.appendChild(this.title);
        this.wrapper.appendChild(this.textArea);
        this.loadButton.innerHTML="Ładuj";
        this.wrapper.appendChild(this.loadButton);
        this.wrapper.appendChild(this.warningArea);
    }

    addCallbacks(){
        this.loadButton.onclick = ()=>{this.onLoadButton();};
    }

    save(){
        localStorage.setItem("codeTextArea",this.textArea.value);
    }

    load(){
        this.textArea.value=localStorage.getItem("codeTextArea");
    }


    onInput(){
        this.save();
    }

    onLoadButton(){
        
    
        this.parser = new AssemblyParser(this.textArea.value,this.M.settings,this.M.instructionList);
        if( this.parser.parseSuccesful){
            this.M.setComponentsDefault();
            this.M.MEM.loadMemory( this.parser.values);
            this.warningArea.innerHTML ="Succes";
        }else{
            this.warningArea.innerHTML =  this.parser.errorMessage;
        }

    }

}




import SettingView from "./settings-view.js";



export default  class PerofrmanceSetting extends SettingView{

    constructor(){
        super("Wydajność");

        this.build();
    }


    build(){
        this.pseudoThreadsDiv = document.createElement("div");
        this.pseudoThreadsInput = document.createElement("input");
        this.pseudoThreadsLabel=document.createElement("label");

        this.pseudoThreadsInput.type="number";
        this.pseudoThreadsLabel.innerHTML="Ilość Pseudo Wątków";

        

        this.pseudoThreadsDiv.appendChild(this.pseudoThreadsInput);
        this.pseudoThreadsDiv.appendChild(this.pseudoThreadsLabel);

        this.content.appendChild(this.pseudoThreadsDiv);


    }

}
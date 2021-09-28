

import SettingView from "./settings-view.js";



export default  class PerofrmanceSetting extends SettingView{

    constructor(){
        super("Wydajność");

        this.build();
    }


    build(){

        //Pseudo threads
        this.pseudoThreadsDiv = document.createElement("div");
        this.pseudoThreadsInput = document.createElement("input");
        this.pseudoThreadsLabel=document.createElement("label");

        this.pseudoThreadsInput.type="number";
        this.pseudoThreadsLabel.innerHTML="Ilość Pseudo Wątków";

        

        this.pseudoThreadsDiv.appendChild(this.pseudoThreadsInput);
        this.pseudoThreadsDiv.appendChild(this.pseudoThreadsLabel);


        //Max cycles

        this.maxCyclesDiv = document.createElement("div");
        this.pmaxCyclesInput = document.createElement("input");
        this.maxCyclesLabel = document.createElement("label");

        this.pmaxCyclesInput.type="number";
        this.maxCyclesLabel.innerHTML="Ilość cyklów między odświeżeniami";

        this.maxCyclesDiv.appendChild(this.pmaxCyclesInput);
        this.maxCyclesDiv.appendChild(this.maxCyclesLabel);





        this.content.appendChild(this.pseudoThreadsDiv);
        this.content.appendChild(this.maxCyclesDiv);


    }

}
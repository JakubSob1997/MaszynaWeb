

import SettingView from "./settings-view.js";



export default  class PerofrmanceSetting extends SettingView{

    constructor(_Settings){
        super("Wydajność");

        this.settings= _Settings;

        this.build();

        this.setupFields(_Settings);

        this.settings.addOnSettingsChangedListener((_s)=>{
            this.setupFields(_s);
        })
    }


    setupFields(_settings){
        this.pseudoThreadsInput.value=_settings.pseudoThreads;
        this.cyclesBeetwenInput.value=_settings.cyclesBeetwenUpdate;
    }

    submitSettings(){

        const pseudoThreadsVal = parseInt(this.pseudoThreadsInput.value)
        const cyclesBeetwenVal = parseInt(this.cyclesBeetwenInput.value)


        this.settings.setPerformanceSettings(pseudoThreadsVal,cyclesBeetwenVal)
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

        this.cyclesBeetwenDiv = document.createElement("div");
        this.cyclesBeetwenInput = document.createElement("input");
        this.cyclesBeetwenLabel = document.createElement("label");

        this.cyclesBeetwenInput.type="number";
        this.cyclesBeetwenLabel.innerHTML="Ilość cyklów między odświeżeniami";

        this.cyclesBeetwenDiv.appendChild(this.cyclesBeetwenInput);
        this.cyclesBeetwenDiv.appendChild(this.cyclesBeetwenLabel);


        this.confirmButton = document.createElement("button");
        this.confirmButton.innerHTML="Ustaw";
        this.confirmButton.classList.add("custom-btn");

        this.confirmButton.addEventListener("click",()=>{
            this.submitSettings();
        })


        this.content.appendChild(this.pseudoThreadsDiv);
        this.content.appendChild(this.cyclesBeetwenDiv);
        this.content.appendChild(this.confirmButton);


    }

}
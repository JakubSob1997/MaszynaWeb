


import MachineExtensionData from "./machine-extension-data.js";
import SettingView from "./settings-view.js";



export default class MachineExtensionSetting extends SettingView{
    constructor(_Settings){
        super("Wybór modółów maszyny W");

        this.exstensionData = new MachineExtensionData(_Settings.extentionFlags);

        
        this.build();
        


        this.settings=_Settings;

        _Settings.addOnSettingsChangedListener((_s)=>{
            this.setChecks(_s.extentionFlags);
        })

        this.setChecks(this.settings.extentionFlags);


    }

    //Returns checkbox element
    generateFlagEntry(_name,_value,_parent){
        let wrapper = document.createElement("div");
        let checkBox = document.createElement("input");
        let label = document.createElement("div");

        label.innerHTML=_name;
        checkBox.type="checkbox";

        checkBox.value=_value;

        wrapper.classList.add("setting-exstension-entry");
        checkBox.classList.add("setting-checkbox");



        wrapper.appendChild(checkBox);
        wrapper.appendChild(label);
        
        _parent.appendChild(wrapper);

        return checkBox;
    }


    build(){
        
        this.keyCheckboxDict = {};
        this.checkEntryParrent = document.createElement("div");
        this.checkEntryParrent.classList.add("setting-checkbox-list")



        this.keyCheckboxDict.BusConnection = this.generateFlagEntry("Połączenie Magistralowe",this.exstensionData.BusConnection,this.checkEntryParrent);
        this.keyCheckboxDict.AK_Increment = this.generateFlagEntry("Inkrementacja i Dekrementacja Akumulatora",this.exstensionData.AK_Increment,this.checkEntryParrent);
        this.keyCheckboxDict.ALU_Logic = this.generateFlagEntry("Operacje logiczne w JAL",this.exstensionData.ALU_Logic,this.checkEntryParrent);
        this.keyCheckboxDict.ALU_ExtendedMath = this.generateFlagEntry("Rozszerzone Operacje Arytmetyczne w JAL",this.exstensionData.ALU_ExtendedMath,this.checkEntryParrent);
        this.keyCheckboxDict.Stack = this.generateFlagEntry("Obsługa Stosu",this.exstensionData.Stack,this.checkEntryParrent);
        this.keyCheckboxDict.X_Register = this.generateFlagEntry("Rejestr X",this.exstensionData.X_Register,this.checkEntryParrent);
        this.keyCheckboxDict.Y_Register = this.generateFlagEntry("Rejestr Y",this.exstensionData.Y_Register,this.checkEntryParrent);
        this.keyCheckboxDict.Interupt = this.generateFlagEntry("Przerwania",this.exstensionData.Interupt,this.checkEntryParrent);
        this.keyCheckboxDict.InputOutput = this.generateFlagEntry("Wejście/Wyjście",this.exstensionData.InputOutput,this.checkEntryParrent);
        this.keyCheckboxDict.Flags = this.generateFlagEntry("Dodatkowe Znaczniki",this.exstensionData.Flags,this.checkEntryParrent);


        this.content.appendChild(this.checkEntryParrent);



        for (const key in this.keyCheckboxDict) {
            if (Object.hasOwnProperty.call(this.keyCheckboxDict, key)) {
                const checkbox = this.keyCheckboxDict[key];

                checkbox.addEventListener("input",(e)=>{
                    this.onCheckChanged();
                })
            }
        }

    }

    onCheckChanged(){
        for (const key in this.keyCheckboxDict) {
            if (Object.hasOwnProperty.call(this.keyCheckboxDict, key)) {
                const checkbox = this.keyCheckboxDict[key];
                this.exstensionData[key]=checkbox.checked;
            }
        }


        this.settings.setExtentionFlags( this.exstensionData.getFlags());
    }

    setChecks(_flags){

        this.exstensionData.setProperties(_flags)

        for (const key in this.keyCheckboxDict) {
            if (Object.hasOwnProperty.call(this.keyCheckboxDict, key)) {
                const checkbox = this.keyCheckboxDict[key];
                checkbox.checked=this.exstensionData[key];
            }
        }
    }

    
}




import { ExtnensionFlags } from "./enums.js";
import MachineExtensionData from "./machine-extension-data.js";
import SettingView from "./settings-view.js";



export default class MachineExtensionSetting extends SettingView{
    constructor(_Settings){
        super("Wybór modółów maszyny W");

        this.exstensionData = new MachineExtensionData(_Settings.extentionFlags);

        
        this.build();
        


        this.settings=_Settings;

        _Settings.addOnExtensionFlagsChangedListener((_s)=>{
            this.setChecks(_s.extentionFlags);
        })

        this.setChecks(this.settings.extentionFlags);


    }

    //Returns checkbox element
    generateFlagEntry(_name,_value,_parent,_flag){
        let wrapper = document.createElement("div");
        let checkBox = document.createElement("input");
        let label = document.createElement("label");

        const id = "machine-extension-checkbox-"+_flag;

        label.innerText=_name;
        label.setAttribute("for",id)
        checkBox.type="checkbox";
        checkBox.value=_value;
        checkBox.id=id;

        wrapper.classList.add("setting-exstension-entry");
        checkBox.classList.add("setting-checkbox");

        checkBox.addEventListener("keydown",(e)=>{
            if(e.keyCode==13){
                checkBox.click();
            }
        })

        wrapper.appendChild(checkBox);
        wrapper.appendChild(label);
        
        _parent.appendChild(wrapper);

        return checkBox;
    }


    build(){
        
        this.keyCheckboxDict = {};
        this.checkEntryParrent = document.createElement("div");
        this.checkEntryParrent.classList.add("setting-checkbox-list")



        this.keyCheckboxDict.BusConnection = this.generateFlagEntry("Połączenie Magistralowe",this.exstensionData.BusConnection,this.checkEntryParrent,ExtnensionFlags.BusConnection);
        this.keyCheckboxDict.AK_Increment = this.generateFlagEntry("Inkrementacja i Dekrementacja Akumulatora",this.exstensionData.AK_Increment,this.checkEntryParrent,ExtnensionFlags.AK_Increment);
        this.keyCheckboxDict.ALU_Logic = this.generateFlagEntry("Operacje logiczne w JAL",this.exstensionData.ALU_Logic,this.checkEntryParrent,ExtnensionFlags.ALU_Logic);
        this.keyCheckboxDict.ALU_ExtendedMath = this.generateFlagEntry("Rozszerzone Operacje Arytmetyczne w JAL",this.exstensionData.ALU_ExtendedMath,this.checkEntryParrent,ExtnensionFlags.ALU_ExtendedMath);
        this.keyCheckboxDict.Stack = this.generateFlagEntry("Obsługa Stosu",this.exstensionData.Stack,this.checkEntryParrent,ExtnensionFlags.Stack);
        this.keyCheckboxDict.X_Register = this.generateFlagEntry("Rejestr X",this.exstensionData.X_Register,this.checkEntryParrent,ExtnensionFlags.X_Register);
        this.keyCheckboxDict.Y_Register = this.generateFlagEntry("Rejestr Y",this.exstensionData.Y_Register,this.checkEntryParrent,ExtnensionFlags.Y_Register);
        this.keyCheckboxDict.Interupt = this.generateFlagEntry("Przerwania",this.exstensionData.Interupt,this.checkEntryParrent,ExtnensionFlags.Interupt);
        this.keyCheckboxDict.InputOutput = this.generateFlagEntry("Wejście/Wyjście",this.exstensionData.InputOutput,this.checkEntryParrent,ExtnensionFlags.InputOutput);
        this.keyCheckboxDict.Flags = this.generateFlagEntry("Dodatkowe Znaczniki",this.exstensionData.Flags,this.checkEntryParrent,ExtnensionFlags.Flags);


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

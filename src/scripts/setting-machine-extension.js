


import { ExtnensionFlags } from "./enums.js";
import MachineExtensionData from "./machine-extension-data.js";
import SettingView from "./settings-view.js";
import Translator from "./translator.js";



export default class MachineExtensionSetting extends SettingView{
    constructor(_Settings){
        super(Translator.getTranslation("_machine_exstension","Machine W modules"));

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



        this.keyCheckboxDict.BusConnection = this.generateFlagEntry(Translator.getTranslation("_module_desc_buscon","Bus Connection"),
            this.exstensionData.BusConnection,this.checkEntryParrent,ExtnensionFlags.BusConnection);

        this.keyCheckboxDict.AK_Increment = this.generateFlagEntry(Translator.getTranslation("_module_desc_incdec","Accumulator Incrementation/Decrementation"),
            this.exstensionData.AK_Increment,this.checkEntryParrent,ExtnensionFlags.AK_Increment);

        this.keyCheckboxDict.ALU_Logic = this.generateFlagEntry(Translator.getTranslation("_module_desc_logic","ALU Logic Opertions"),
            this.exstensionData.ALU_Logic,this.checkEntryParrent,ExtnensionFlags.ALU_Logic);

        this.keyCheckboxDict.ALU_ExtendedMath = this.generateFlagEntry(Translator.getTranslation("_module_desc_arythm","ALU Extra Arythmetic Opertions"),
            this.exstensionData.ALU_ExtendedMath,this.checkEntryParrent,ExtnensionFlags.ALU_ExtendedMath);

        this.keyCheckboxDict.Stack = this.generateFlagEntry(Translator.getTranslation("_module_desc_stack","Stack Module"),
            this.exstensionData.Stack,this.checkEntryParrent,ExtnensionFlags.Stack);

        this.keyCheckboxDict.X_Register = this.generateFlagEntry(Translator.getTranslation("_module_desc_regx","X Register"),
            this.exstensionData.X_Register,this.checkEntryParrent,ExtnensionFlags.X_Register);

        this.keyCheckboxDict.Y_Register = this.generateFlagEntry(Translator.getTranslation("_module_desc_regy","Y Register"),
            this.exstensionData.Y_Register,this.checkEntryParrent,ExtnensionFlags.Y_Register);

        this.keyCheckboxDict.Interupt = this.generateFlagEntry(Translator.getTranslation("_module_desc_int","Interupts"),
            this.exstensionData.Interupt,this.checkEntryParrent,ExtnensionFlags.Interupt);

        this.keyCheckboxDict.InputOutput = this.generateFlagEntry(Translator.getTranslation("_module_desc_io","Input/Output"),
            this.exstensionData.InputOutput,this.checkEntryParrent,ExtnensionFlags.InputOutput);

        this.keyCheckboxDict.Flags = this.generateFlagEntry(Translator.getTranslation("_module_desc_flags","Extra Flags"),
            this.exstensionData.Flags,this.checkEntryParrent,ExtnensionFlags.Flags);
        
        this.keyCheckboxDict.T_Register = this.generateFlagEntry(Translator.getTranslation("_module_desc_regt","T Register"),
            this.exstensionData.T_Register,this.checkEntryParrent,ExtnensionFlags.T_Register);


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

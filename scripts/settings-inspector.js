

import SidebarContent from "./sidebar-content.js";
import InteruptAddresSetting from "./setting-interupt-addres.js"

import BusWidthSettingView  from "./setting-bus-width.js";
import MachineExtensionSetting from "./setting-machine-extension.js";
import ExecutionModeSetting from "./setting-execution-mode.js";
import PerofrmanceSetting from "./setting-performance.js"
import LanguageSetting from "./setting-language.js";
import Translator from "./translator.js";

export default class SettingsInspector extends SidebarContent{
    constructor(_Machine){
        super();

        this.wrapper;
        this.header;


        
        
        this.build(_Machine)
    }
    focus(){
        this.header.focus();
    }

    build(_Machine){
        this.wrapper = document.createElement("div");
        this.header = document.createElement("h3");
        this.settingList = document.createElement("div");

        this.header.setAttribute("tabindex",-1);

        this.header.innerText=Translator.getTranslation("_settings","Settings");
        this.settingList.classList.add("settings-list");
        this.wrapper.classList.add("generic-inspector");

        this.languageSetting = new LanguageSetting();
        this.simulationLevelSetting = new ExecutionModeSetting(_Machine.settings);
        this.busWidthSetting = new BusWidthSettingView(_Machine.settings);
        this.extnesionPickerSetting = new MachineExtensionSetting(_Machine.settings);
        this.intAdressSetting=new InteruptAddresSetting(_Machine.settings);
        this.perofrmanceSetting = new PerofrmanceSetting(_Machine.settings);

    
        this.settingList.appendChild(this.languageSetting.wrapper);
        this.settingList.appendChild(this.simulationLevelSetting.wrapper)
        this.settingList.appendChild(this.busWidthSetting.wrapper);
        this.settingList.appendChild(this.extnesionPickerSetting.wrapper);
        this.settingList.appendChild(this.intAdressSetting.wrapper);
        this.settingList.appendChild(this.perofrmanceSetting.wrapper);

        this.wrapper.appendChild(this.header);
        this.wrapper.appendChild(this.settingList);
        
    }


    getHTMLElement(){
        return this.wrapper;
    }
    
}

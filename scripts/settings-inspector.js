

import SidebarContent from "./sidebar-content.js";
import { 
    SimolationLevelSetting,
    ExtensionPickerSetting,
    InteruptAdressSetting,
    IOInteruptSetting,
    PerofrmanceSetting,
} from "./settings-view.js";

import BusWidthSettingView  from "./setting-bus-width.js";
import MachineExtensionSetting from "./setting-machine-extension.js";


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

        this.header.innerHTML="Ustawienia"
        this.settingList.classList.add("settings-list");
        this.wrapper.classList.add("generic-inspector");

        this.simulationLevelSetting = new SimolationLevelSetting();
        this.busWidthSetting = new BusWidthSettingView(_Machine.settings);
        this.extnesionPickerSetting = new MachineExtensionSetting();
        this.intAdressSetting=new InteruptAdressSetting();
        this.ioInteruptSetting = new IOInteruptSetting();
        this.perofrmanceSetting = new PerofrmanceSetting();

    
        this.settingList.appendChild(this.simulationLevelSetting.wrapper)
        this.settingList.appendChild(this.busWidthSetting.wrapper);
        this.settingList.appendChild(this.extnesionPickerSetting.wrapper);
        this.settingList.appendChild(this.intAdressSetting.wrapper)
        this.settingList.appendChild(this.ioInteruptSetting.wrapper)
        this.settingList.appendChild(this.perofrmanceSetting.wrapper);

        this.wrapper.appendChild(this.header);
        this.wrapper.appendChild(this.settingList);
        
    }


    getHTMLElement(){
        return this.wrapper;
    }
    
}

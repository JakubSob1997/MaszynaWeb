

import SidebarContent from "./sidebar-content.js";

export default class SettingsInspector extends SidebarContent{
    constructor(_Machine){
        super();

        this.wrapper;
        this.header;


        
        
        this.build()
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
        this.busWidthSetting = new BusWidthSetting();
        this.extnetionPickerSetting = new ExtnetionPickerSetting();
        this.intAdressSetting=new InteruptAdressSetting();
        this.ioInteruptSetting = new IOInteruptSetting();
        this.perofrmanceSetting = new PerofrmanceSetting();

    
        this.settingList.appendChild(this.simulationLevelSetting.wrapper)
        this.settingList.appendChild(this.busWidthSetting.wrapper);
        this.settingList.appendChild(this.extnetionPickerSetting.wrapper);
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

class SettingView{
    constructor(_name){
        this.wrapper=document.createElement("div");
        this.header=document.createElement("h4");
        this.content = document.createElement("div");

        this.wrapper.classList.add("generic-setting");
        this.header.classList.add("generic-setting-header");
        this.content.classList.add("generic-setting-content");


        this.header.innerHTML = _name;

        this.wrapper.appendChild(this.header);
        this.wrapper.appendChild(this.content);
    }

    getHTMLElement(){
        return this.wrapper;
    }
}

class SimolationLevelSetting extends SettingView{

    constructor(){
        super("Poziom śledzenia");
    }

}




class ExtnetionPickerSetting extends SettingView{
    constructor(){
        super("Wybór modółów maszyny W");
    }

    
}


class BusWidthSetting extends SettingView{

    constructor(){
        super("Szerokość magistral");
    }

}




class InteruptAdressSetting extends SettingView{

    constructor(){
        super("Adresy przerwań");
    }

}

class IOInteruptSetting extends SettingView{
    constructor(){
        super("Przerwania We/Wy")
    }
}



class PerofrmanceSetting extends SettingView{

    constructor(){
        super("Wydajność");

        
    }

}




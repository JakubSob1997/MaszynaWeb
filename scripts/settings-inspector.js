

import SidebarContent from "./sidebar-content.js";

export default class SettingsInspector extends SidebarContent{
    constructor(){
        super();

        this.wrapper;
        this.header;


        
        
        this.build()
    }
    focus(){
        this.header.focus();
    }

    build(){
        this.wrapper = document.createElement("div");
        this.header = document.createElement("h3");
        this.settingList = document.createElement("div");

        this.header.setAttribute("tabindex",-1);

        this.header.innerHTML="Ustawienia"
        this.settingList.classList.add("settings-list");
        this.wrapper.classList.add("generic-inspector");


        this.busWidthSetting = new BusWidthSetting();
        this.extnetionPickerSetting = new ExtnetionPickerSetting();



        this.settingList.appendChild(this.busWidthSetting.wrapper);
        this.settingList.appendChild(this.extnetionPickerSetting.wrapper);

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

        this.wrapper.classList.add("generic-setting");
        this.header.classList.add("generic-setting-header");

        this.header.innerHTML = _name;

        this.wrapper.appendChild(this.header);
    }

    getHTMLElement(){
        return this.wrapper;
    }
}


class ExtnetionPickerSetting extends SettingView{
    constructor(_Settings){
        super("Wybór modółów maszyny W");
    }

    
}


class BusWidthSetting extends SettingView{

    constructor(_name){
        super("Szerokość magistral");
    }

}











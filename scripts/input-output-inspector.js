

import SidebarContent from "./sidebar-content.js";




export default class InputOutputInspector extends SidebarContent{
    constructor(_Machine){
        super();

        this.wrapper;
        this.header;
        this.deviceList;
        this.deviceArea;
        this.build(_Machine)
    }
    focus(){
        this.header.focus();
    }


    buildDeviceRecord(_device,_adress){
        let wrapper =  document.createElement("li");
        let adressEle = document.createElement("div");
        let descriptionEle = document.createElement("div");

        adressEle.innerHTML=_adress;
        descriptionEle.innerHTML=_device.getDescription();

        wrapper.appendChild(adressEle);
        wrapper.appendChild(descriptionEle);
        return wrapper;
    }

    populateDeviceLIst(_Machine){

        this.deviceList.innerHTML="";
        const devices = _Machine.inputOutputUnit.devices;
        for (const adress in devices) {
            if (Object.hasOwnProperty.call(devices, adress)) {
                const device = devices[adress];
                this.deviceList.appendChild(this.buildDeviceRecord(device,adress));
            }
        }
    }

    build(_Machine){
        this.wrapper = document.createElement("div");
        this.header = document.createElement("h3")
        this.deviceList=document.createElement("ul");

        this.populateDeviceLIst(_Machine)

        this.header.innerHTML="Wejście / Wyjście"

        this.header.setAttribute("tabindex",-1);

        this.wrapper.appendChild(this.header);
        this.wrapper.appendChild(this.deviceList);
    }


    getHTMLElement(){
        return this.wrapper;
    }
    



}









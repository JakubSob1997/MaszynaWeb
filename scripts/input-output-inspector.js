

import SidebarContent from "./sidebar-content.js";




export default class InputOutputInspector extends SidebarContent{
    constructor(_Machine){
        super();

        this.wrapper;
        this.header;

        this.showListButton;
        this.showConsoleButton;


        this.displayArea;

        this.deviceList;
        
        this.build(_Machine)
    }
    focus(){
        this.header.focus();
    }


    buildDeviceListHeading(){
        let wrapper =  document.createElement("li");
        let adressEle = document.createElement("div");
        let descriptionEle = document.createElement("div");

        this.showListButton;
        this.showConsoleButton;

        adressEle.innerHTML="Adres";
        descriptionEle.innerHTML="Opis";

        wrapper.classList.add("device-entry");

        wrapper.appendChild(adressEle);
        wrapper.appendChild(descriptionEle);
        return wrapper;
    }

    buildDeviceRecord(_device,_adress){
        let wrapper =  document.createElement("li");
        let adressEle = document.createElement("div");
        let descriptionEle = document.createElement("div");

        adressEle.innerHTML=_adress;
        descriptionEle.innerHTML=_device.getDescription();

        wrapper.classList.add("device-entry");

        wrapper.appendChild(adressEle);
        wrapper.appendChild(descriptionEle);
        return wrapper;
    }


    populateDeviceLIst(_Machine){

        this.deviceList.innerHTML="";
        this.deviceList.appendChild(this.buildDeviceListHeading())
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

        this.showListButton =document.createElement("button");
        this.showConsoleButton=document.createElement("button");

        

        this.header.innerHTML="Wejście / Wyjście"
        this.showListButton.innerHTML="Lista";
        this.showConsoleButton.innerHTML="Konsola";
        this.populateDeviceLIst(_Machine)
        
        

        this.header.setAttribute("tabindex",-1);

        this.wrapper.classList.add("generic-inspector")
        this.deviceList.classList.add("device-list");
        this.showListButton.classList.add("custom-btn");
        this.showConsoleButton.classList.add("custom-btn");


        


        this.wrapper.appendChild(this.header);
        this.wrapper.appendChild(this.showListButton);
        this.wrapper.appendChild(this.showConsoleButton)
        this.wrapper.appendChild(this.deviceList);
    }


    getHTMLElement(){
        return this.wrapper;
    }
    



}









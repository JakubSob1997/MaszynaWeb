

import SidebarContent from "./sidebar-content.js";

import ConsoleView from "./console-view.js";


export default class IOInspector extends SidebarContent{
    constructor(_IOUnit,_IODevices){
        super();

        this.wrapper;
        this.header;

        this.showListButton;
        this.showConsoleButton;


        this.displayArea;

        this.deviceListWrapper;
        this.deviceListLabel;
        this.deviceList;
        this.consoleView;
        
        this.build(_IOUnit,_IODevices)
    }
    focus(){
        this.header.focus();
    }

    build(_IOUnit,_IODevices){
        this.wrapper = document.createElement("div");
        this.header = document.createElement("h3");
        this.displayArea = document.createElement("div");
        this.deviceList=document.createElement("ul");
        this.deviceListWrapper=document.createElement("div");
        this.deviceListLabel=document.createElement("h4");
        this.consoleView = new ConsoleView(_IODevices.consoleDevice);


        this.showListButton =document.createElement("button");
        this.showConsoleButton=document.createElement("button");

        

        this.header.innerHTML="Wejście / Wyjście"
        this.showListButton.innerHTML="Lista";
        this.showConsoleButton.innerHTML="Konsola";
        this.deviceListLabel.innerHTML="Lista urządzeń We/Wy"
        this.populateDeviceLIst(_IOUnit)
        
        

        this.header.setAttribute("tabindex",-1);

        this.wrapper.classList.add("generic-inspector")
        this.deviceList.classList.add("device-list");
        this.showListButton.classList.add("custom-btn");
        this.showConsoleButton.classList.add("custom-btn");


        this.deviceListWrapper.appendChild(this.deviceListLabel);
        this.deviceListWrapper.appendChild(this.deviceList);
        this.displayArea.appendChild(this.deviceListWrapper);

        this.wrapper.appendChild(this.header);
        this.wrapper.appendChild(this.showListButton);
        this.wrapper.appendChild(this.showConsoleButton)
        this.wrapper.appendChild(this.displayArea);
        

        this.addCallbacks();
    }

    addCallbacks(){
        
        this.showListButton.addEventListener("click",()=>{
            this.displayArea.innerHTML="";
            this.displayArea.appendChild(this.deviceListWrapper);
        })

        this.showConsoleButton.addEventListener("click",()=>{
            this.displayArea.innerHTML="";
            this.displayArea.appendChild(this.consoleView.getHTMLElement());
        })
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


    populateDeviceLIst(_IOUnit){

        this.deviceList.innerHTML="";
        this.deviceList.appendChild(this.buildDeviceListHeading())
        const devices = _IOUnit.devices;
        for (const adress in devices) {
            if (Object.hasOwnProperty.call(devices, adress)) {
                const device = devices[adress];
                this.deviceList.appendChild(this.buildDeviceRecord(device,adress));
            }
        }
    }

    


    getHTMLElement(){
        return this.wrapper;
    }
    



}









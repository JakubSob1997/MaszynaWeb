

import SidebarContent from "./sidebar-content.js";

import ConsoleView from "./console-view.js";
import IODeviceListView from "./io-device-list-view.js"
import InteruptDeviceListView from "./interupt-device-list-view.js";
import Translator from "./translator.js";
import CycleTimerView from "./cycle-timer-view.js";


export default class IOInspector extends SidebarContent{
    constructor(_Machine){
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
        


        this.build(_Machine.IOUnit,_Machine.InteruptDevices,_Machine.Devices)
    }
    focus(){
        this.header.focus();
    }

    build(_IOUnit,_IntDevices,_Devices){
        this.wrapper = document.createElement("div");
        this.header = document.createElement("h1");
        this.displayArea = document.createElement("div");


        this.deviceListWrapper=document.createElement("div");
        this.ioDeviceListLabel=document.createElement("h3");
        this.ioDeviceList=new IODeviceListView(_IOUnit.devices);

        this.intListWrapper=document.createElement("div");
        this.intDeviceListLabel=document.createElement("h3");
        this.interuptDeviceList = new InteruptDeviceListView(_IntDevices)

        
        
        

        this.consoleView = new ConsoleView(_Devices.consoleDevice);
        this.cycleTimerView =new CycleTimerView(_Devices.cycleTimerDevice)

        this.showListButton =document.createElement("button");
        this.showConsoleButton=document.createElement("button");

        

        this.header.innerText=Translator.getTranslation("_input_output","Input/Output")
        this.ioDeviceListLabel.innerText=Translator.getTranslation("_io_list","I/O Device list")
        this.intDeviceListLabel.innerHTML=Translator.getTranslation("_int_list","Interupt Device List")
        

        this.header.setAttribute("tabindex",-1);

        this.wrapper.classList.add("generic-inspector")
        this.deviceListWrapper.classList.add("io-inspector-entry")
        this.intListWrapper.classList.add("io-inspector-entry")


        this.deviceListWrapper.appendChild(this.ioDeviceListLabel);
        this.deviceListWrapper.appendChild(this.ioDeviceList.getHTMLElement());
        
        this.intListWrapper.appendChild(this.intDeviceListLabel);
        this.intListWrapper.appendChild(this.interuptDeviceList.getHTMLElement());


        this.displayArea.appendChild(this.deviceListWrapper);
        this.displayArea.appendChild(this.intListWrapper)
        this.displayArea.appendChild(this.consoleView.getHTMLElement());
        this.displayArea.appendChild( this.cycleTimerView.getHTMLElement());
        this.wrapper.appendChild(this.header);
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


    


    getHTMLElement(){
        return this.wrapper;
    }
    



}









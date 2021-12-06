import Translator from "./translator.js";
import { InteruptEnum } from "./enums.js";




export default class InteruptDeviceListView{

    constructor(_ioDeviceList){
        this.deviceList;
        this.build(_ioDeviceList);
    }

    buildSellect(_device){
        const select= document.createElement("select");

        const option_none = document.createElement("option");
        const option_INT4 = document.createElement("option");
        const option_INT3 = document.createElement("option");
        const option_INT2 = document.createElement("option");
        const option_INT1 = document.createElement("option");


        option_none.innerText = Translator.getTranslation("_none","None");
        option_INT4.innerText = Translator.getTranslation("_int","INT@0",[4]);
        option_INT3.innerText = Translator.getTranslation("_int","INT@0",[3]);
        option_INT2.innerText = Translator.getTranslation("_int","INT@0",[2]);
        option_INT1.innerText = Translator.getTranslation("_int","INT@0",[1]);

        option_none.value=InteruptEnum.None;
        option_INT4.value=InteruptEnum.INT4;
        option_INT3.value=InteruptEnum.INT3;
        option_INT2.value=InteruptEnum.INT2;
        option_INT1.value=InteruptEnum.INT1;


        select.appendChild(option_none);
        select.appendChild(option_INT1);
        select.appendChild(option_INT2);
        select.appendChild(option_INT3);
        select.appendChild(option_INT4);
        
        
        

        select.value=_device.getInteruptVector();


        select.addEventListener("change",()=>{
            _device.interuptVactor=select.value;
        })
        return select;

    }


    buildHeading(){
        let wrapper =  document.createElement("li");
        let adressEle = document.createElement("div");
        let descriptionEle = document.createElement("div");

        adressEle.innerText=Translator.getTranslation("_interrupt","Interupt");
        descriptionEle.innerText=Translator.getTranslation("_description","Description")

        wrapper.classList.add("io-device-entry");

        wrapper.appendChild(adressEle);
        wrapper.appendChild(descriptionEle);
        return wrapper;
    }

    buildRecord(_device){
        let wrapper =  document.createElement("li");
        let vectorELe = this.buildSellect(_device);
        let descriptionEle = document.createElement("div");

        descriptionEle.innerText=_device.getDescription();

        wrapper.classList.add("io-device-entry");

        wrapper.appendChild(vectorELe);
        wrapper.appendChild(descriptionEle);
        return wrapper;
    }

    populateDeviceLIst(_ioDeviceLIst){

        this.deviceList.innerHTML="";
        this.deviceList.appendChild(this.buildHeading())
        const devices = _ioDeviceLIst;
        for (const adress in devices) {
            if (Object.hasOwnProperty.call(devices, adress)) {
                const device = devices[adress];
                this.deviceList.appendChild(this.buildRecord(device,adress));
            }
        }
    }

    build(_ioDeviceLIst){
        this.deviceList=document.createElement("ul");
        this.populateDeviceLIst(_ioDeviceLIst);
        this.deviceList.classList.add("io-device-list");
    }


    getHTMLElement(){
        return this.deviceList;
    }


}





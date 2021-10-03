




export default class InteruptDeviceListView{

    constructor(_ioDeviceList){
        this.deviceList;
        this.build(_ioDeviceList);
    }


    buildHeading(){
        let wrapper =  document.createElement("li");
        let adressEle = document.createElement("div");
        let descriptionEle = document.createElement("div");

        adressEle.innerText="Wektor";
        descriptionEle.innerText="Opis";

        wrapper.classList.add("io-device-entry");

        wrapper.appendChild(adressEle);
        wrapper.appendChild(descriptionEle);
        return wrapper;
    }

    buildRecord(_device,_adress){
        let wrapper =  document.createElement("li");
        let adressEle = document.createElement("div");
        let descriptionEle = document.createElement("div");

        adressEle.innerText=_adress;
        descriptionEle.innerText=_device.getDescription();

        wrapper.classList.add("io-device-entry");

        wrapper.appendChild(adressEle);
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





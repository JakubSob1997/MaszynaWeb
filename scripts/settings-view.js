import Alerter from "./alerter.js";
import { AlertStyleEnum } from "./enums.js";
import Settings from "./settings.js";




export default class SettingView{
    constructor(_name){
        this.wrapper=document.createElement("div");
        this.header=document.createElement("h4");
        this.content = document.createElement("div");

        this.wrapper.classList.add("generic-setting");
        this.header.classList.add("generic-setting-header");
        this.content.classList.add("generic-setting-content");


        this.header.innerText = _name;

        this.wrapper.appendChild(this.header);
        this.wrapper.appendChild(this.content);
    }


    getHTMLElement(){
        return this.wrapper;
    }
}













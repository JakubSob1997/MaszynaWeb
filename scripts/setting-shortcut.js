import SettingView from "./settings-view.js";
import Translator from "./translator.js";
import ShortcutManager from "./shortcut-manager.js";
import { ShortcutData } from "./shortcut.js";


export class ShortcutSettingEntery{

    constructor(_shortcut){
        this.shortcut=_shortcut;

        this.wrapper = document.createElement("li");
        this.description = document.createElement("span");
        this.bind = document.createElement("span");

        this.description.innerText = _shortcut.description;
    
        this.bind.innerText = ShortcutData.prototype.toReadableString.call(_shortcut.binded);

        this.wrapper.appendChild(this.description);
        this.wrapper.appendChild( this.bind);


    }



}



export default class ShortcutSetting extends SettingView{

    
    constructor(){
        super(Translator.getTranslation("_keyboard_shortcuts","Keyboard Shortcuts"))
   
        this.entries=[]
        setTimeout(()=>{
            this.build();
        })

    }


    build(){

        this.list = document.createElement("ul");
        


        ShortcutManager.shortcuts.forEach((v)=>{
            const entry  = new ShortcutSettingEntery(v);
            this.entries.push(entry);
            this.list.appendChild(entry.wrapper);
        })

        this.content.appendChild(this.list);
    }


}










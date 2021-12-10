

const invalidBinds = new Set(
    [
        32,//space
        13,//enter
        16,//shift
        17,//ctrl
        18,//alt
    ]
    )
export class ShortcutData{

    keyCode;
    shift;
    ctrl;
    alt;

    constructor(_keycode,_shift,_ctrl,_alt){
        this.keyCode=_keycode;
        this.shift=!!_shift;
        this.ctrl=!!_ctrl;
        this.alt=!!_alt;
    }


    checkEvent(ev){

        if(this.keyCode!==ev.keyCode)return false;
        if(this.shift!==ev.shiftKey)return false;
        if(this.ctrl!==ev.ctrlKey)return false;
        if(this.alt!==ev.altKey)return false;
        return true;

    }

    toReadableString(){
        return `${this.alt?"ALT+":""}${this.ctrl?"CTRL+":""}${this.shift?"SHIFT+":""}${String.fromCharCode(this.keyCode)}`;
    }


    static getDataFromEvent(ev){
        if(invalidBinds.has(ev.keyCode)){
            return null;
        }else{
            return new ShortcutData(ev.keyCode,ev.shiftKey,ev.ctrlKey,ev.altKey)
        }
    }



}



export default class Shorutcut{


    name;
    description;
    funk;
    defaults;
    binded;

    constructor(_name,_description,_funk,_defKeycode,_defShift,_defCtrl,_defAlt){
        this.name=_name;
        this.description=_description;
        this.funk=_funk;
        this.defaults = new ShortcutData(_defKeycode,!!_defShift,!!_defCtrl,!!_defAlt);
    
        this.loadFromStorage();    
    
    }

    getStorageKey(){
        return `_shortcut_${this.name}`;
    }

    loadFromStorage(){
        const json = localStorage.getItem(this.getStorageKey())
        if(json){
            const obj  =JSON.parse(json);
            this.binded= obj;
        }else{
            this.binded = {...this.defaults};
            
        }
    }

    overideBinds(_shortcutData){
        
        localStorage.setItem(this.getStorageKey(),JSON.stringify(_shortcutData))
        this.binded = _shortcutData;
    }

    resetBinds(){
        localStorage.clear(this.getStorageKey());
        this.binded = {...this.defaults};
    }





    tryRun(ev){
        if(ShortcutData.prototype.checkEvent.call(this.binded,ev)){
            this.funk();
            return true;
        }
        return false;
    }
    


}











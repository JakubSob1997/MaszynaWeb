





class ShortcutManagerSingleton{

    constructor(){
        this.shortcuts = [];
    
        window.addEventListener("keydown",(ev)=>{
            this.shortcuts.forEach((s)=>{
                
                s.tryRun(ev);
            })
        })
    }


    addShortcut(_shortcut){
        this.shortcuts.push(_shortcut);
    }

    


}

const ShortcutManager = new ShortcutManagerSingleton();
export default ShortcutManager;











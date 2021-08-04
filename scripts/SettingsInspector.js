



class SettingsInspector extends SidebarContent{
    constructor(){
        super();

        this.wrapper;
        this.header;
        this.build()
    }
    focus(){
        this.header.focus();
    }

    build(){
        this.wrapper = document.createElement("div");
        this.header = document.createElement("h3")

        this.header.innerHTML="Ustawienia"

        this.header.setAttribute("tabindex",-1);

        this.wrapper.appendChild(this.header);
    }


    getHTMLElement(){
        return this.wrapper;
    }
    
}















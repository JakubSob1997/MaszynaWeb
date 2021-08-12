






import MachineViewElement from "./machine-view-element.js";


export default class MachineViewMemory extends MachineViewElement{


    constructor(_machineView,_memory){
        
        
        super(_machineView);


        this.memory = _memory;

        this.element;
        this.build(_machineView,_memory);
        

        this.display();


    }

    build(_machineView,_register){
        this.element = document.createElement("div");
    }

    display(){
        

    }

    getHTMLElement(){
        return this.element;
    }

}













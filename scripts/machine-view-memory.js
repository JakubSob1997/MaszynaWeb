






import MachineViewElement from "./machine-view-element.js";


export default class MachineViewMemory extends MachineViewElement{


    constructor(_machineView,_memory){
        
        
        super(_machineView);


        this.memory = _memory;

        this.element;
        this.build(_machineView,_memory);
        

        this.display();


    }

    build(_machineView,_memory){
        this.element  = document.createElement("div")
        this.element.classList.add("mem");
        this.element.setAttribute("tabindex","0");
    }





    addClabacks(){
        _memory.addOnValueChangedCallback((_mem,_adr)=>{
            element.children[_adr].innerHTML=this.displayMemoryEntry(_mem,_adr);
        });

        _memory.addOnMemoryChangedCallback((_mem)=>{
            for (let index = 0; index < element.children.length; index++) {
                const child = element.children[index];
                child.innerHTML=this.displayMemoryEntry(_mem,index);
            }
            
        });
    }

    display(){
        

    }

    getHTMLElement(){
        return this.element;
    }

}



export class MachineViewMemoryEntry{
    constructor(_machineView,_memory,_addres){
        
        
        super(_machineView);


        this.addres = _addres;

        this.element;
        this.build(_machineView,_addres);
        

        this.display();


    }

    build(_machineView,_register){
        this.element  = document.createElement("div")
        this.element.classList.add("mem");
    }

    display(){
        

    }

    getHTMLElement(){
        return this.element;
    }
}









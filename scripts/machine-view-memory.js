






import MachineViewElement from "./machine-view-element.js";
import { ValueDisplayEnum } from "./enums.js";


export default class MachineViewMemory extends MachineViewElement{


    constructor(_machineView,_memory){
        
        
        super(_machineView);


        this.memory = _memory;

        this.element;
        this.entries = [];
        this.highlightIndex=0;

        this.build(_machineView,_memory);
        
        this.display();
        

        this.addCallbacks()

    }

    setNewHighlight(_adress){
        this.entries[this.highlightIndex]?.setHighlight(false);
        this.entries[_adress]?.setHighlight(true);
        this.highlightIndex = _adress;
    }

    build(_machineView,_memory){
        this.element  = document.createElement("div")
        this.element.classList.add("mem");
        this.element.setAttribute("tabindex","0");
        this.populate();
    }

    clear(){
        this.entries=[]
        this.element.innerHTML=""
    }

    populate(){
        

        for (let adr = 0; adr < this.memory.length(); adr++) {
            let entry = new MachineViewMemoryEntry(this.machineView,this.memory,adr);
            this.entries.push(entry);
            this.element.appendChild(entry.getHTMLElement());
        }
    }



    addCallbacks(){
        this.memory.addOnValueChangedCallback((_mem,_adr)=>{
            this.entries[_adr].display();
        });

        this.memory.addOnMemoryChangedCallback((_mem)=>{

            

            if(_mem.length()!=this.entries.length){
                this.clear();
                this.populate();
            }else{
                this.entries.forEach(entry => {
                    entry.display();
                });
            }

        });

        this.element.addEventListener("click",(e)=>{
            const adressString  =e.target.getAttribute("data-mem-adress");
            if(adressString!=null){
                const adressInt =parseInt(adressString);
                this.machineView.selectMemorySlot(adressInt);
            }
        })

        this.machineView.M.A_register.addOnUpdateCallback(_reg=>{
            const adr = _reg.getValue();
            this.setNewHighlight(adr);
        
        })
    }

    display(){
        

    }

    getHTMLElement(){
        return this.element;
    }

}



export class MachineViewMemoryEntry extends MachineViewElement{
    constructor(_machineView,_memory,_addres){
        
        
        super(_machineView);


        this.addres = _addres;
        this.memory = _memory

        this.element;
        this.build(_machineView,_addres);
        

        this.display();


    }

    build(_machineView,_register){
        this.element  = document.createElement("div")
        //this.adrElement = document.createElement("span");
        //this.valElement = document.createElement("span")
        //this.codeElement = document.createElement("span")


        this.element.classList.add("mem-entry");
        this.element.setAttribute("data-mem-adress",this.addres.toString());

        this.display();
        
    }

    setHighlight(_bool){
        if(_bool){
            this.element.classList.add("mem-entry-selected");
        }else{
            this.element.classList.remove("mem-entry-selected");
        }
    }

    display(){
        const valueDisplayer = this.machineView.valueDisplayer;
        const val = this.memory.getValue(this.addres);

        const decimal =valueDisplayer.wordToString(val,ValueDisplayEnum.UnsignedDecimal);
        const code =valueDisplayer.wordToString(val,ValueDisplayEnum.OpCodeArgument);

        this.element.innerText=this.addres+": "+decimal+" "+code;
    }

    getHTMLElement(){
        return this.element;
    }
}









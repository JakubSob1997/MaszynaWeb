






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
        this.element  = document.createElement("pre")
        //this.adrElement = document.createElement("span");
        //this.valElement = document.createElement("span")
        //this.codeElement = document.createElement("span")

        //this.element.appendChild(this.adrElement);
        //this.element.appendChild(this.valElement);
        //this.element.appendChild(this.codeElement);

        this.element.classList.add("mem-entry");
        //this.adrElement.classList.add("mem-entry-addres");
        //this.valElement.classList.add("mem-entry-value");
        //this.codeElement.classList.add("mem-entry-code");

        this.element.setAttribute("data-mem-adress",this.addres.toString());
        //this.adrElement.setAttribute("data-mem-adress",this.addres.toString());
        //this.valElement.setAttribute("data-mem-adress",this.addres.toString());
        //this.codeElement.setAttribute("data-mem-adress",this.addres.toString());

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

        let addresStr = this.addres+":";
        let decimal =valueDisplayer.wordToString(val,ValueDisplayEnum.UnsignedDecimal);
        let code =valueDisplayer.wordToString(val,ValueDisplayEnum.OpCodeArgument);


        //this.adrElement.textContent=this.addres+":";
        //this.valElement.textContent=decimal;
        //this.codeElement.textContent=code;
        
        if(addresStr.length<5){
            addresStr+="&nbsp;".repeat(5-addresStr.length);
        }
        if(decimal.length<5){
            decimal+="&nbsp;".repeat(5-decimal.length);
        }

       
        this.element.innerHTML=addresStr+decimal+code;
    }

    getHTMLElement(){
        return this.element;
    }
}









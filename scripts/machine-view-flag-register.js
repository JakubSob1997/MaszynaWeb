import MachineViewElement from "./machine-view-element.js"









export default class MachineViewFlagRegister extends MachineViewElement{


    constructor(_MV,_flagRegister){
        super(_MV);


        this.flagRegister = _flagRegister;

        this.build(_MV,_flagRegister);
        this.display();
    }


    build(_machineView,_flagRegister){
        this.element  = document.createElement("button")

        this.element.classList.add("reg");
        
        /*
        _flagRegister.addOnUpdateCallback(_reg=>{
             this.display();
            }
        );
            */

        this.element.addEventListener("click" ,()=>{
           // _machineView.selectRegister(_register);
        });

    }



    display(){
        const formatedValue = this.flagRegister.getTextContent();

        this.element.textContent="F: "+formatedValue;

        /*
        if(this._flagRegister.wasWriten){
            this.element.classList.add("reg-selected");
        }else{
            this.element.classList.remove("reg-selected");
        }*/

        const myExtFlag = this.flagRegister.getExtention();
        const allExtFlags = this.machineView.getCurentExtentions()
        
        if((myExtFlag &allExtFlags)===0){
            this.element.classList.add("reg-hidden");
            this.element.disabled=true;
        }else{
            this.element.classList.remove("reg-hidden");
            this.element.disabled=false;
        }
        

    }

    getHTMLElement(){
        return this.element;
    }


}












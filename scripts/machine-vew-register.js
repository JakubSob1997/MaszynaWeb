


import MachineViewElement from "./machine-view-element.js";


export default class MachineViewRegister extends MachineViewElement{


    constructor(_machineView,_register){
        
        
        super(_machineView);


        this.register = _register;

        this.element;
        this.build(_machineView,_register);
        

        this.display();


    }

    build(_machineView,_register){
        this.element  = document.createElement("button")

        this.element.classList.add("reg");
        
        
        _register.addOnUpdateCallback(_reg=>{
             this.display();
            }
        );


        this.element.addEventListener("click" ,()=>{
            _machineView.selectRegister(_register);
        });

    }



    display(){
        const regName = this.register.name.toUpperCase();
        const formatedValue = this.machineView.valueDisplayer.registerToString(this.register)

        this.element.innerHTML=regName+": "+formatedValue;

        if(this.register.wasWriten){
            this.element.classList.add("reg-selected");
        }else{
            this.element.classList.remove("reg-selected");
        }

        const myExtFlag = this.register.getExtention();
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





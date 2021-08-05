
import SidebarContent from "./sidebar-content.js";
import ValueView from "./value-view.js"
import { ValueDisplayEnum } from "./enums.js";

export default class RegisterInspector extends SidebarContent{

    constructor(_valueDisplayer){

        super();

        this.wrapper = document.createElement("div");

        this.registerName =document.createElement("h3");

        this.valueView = new ValueView(_valueDisplayer);


        this.displaySelect=document.createElement("select");
        this.unsignedDecimal=document.createElement("option");
        this.signedDecimal=document.createElement("option");
        this.binary=document.createElement("option");
        this.hexaDecimal=document.createElement("option");
        this.instruction=document.createElement("option");


        this.pastRegisters={};
        this.currentRegister=null;
        
        this.build();
        this.addCallbacks();

    }
    focus(){
        this.registerName.focus();
    }

    build(){

        this.registerName.setAttribute("tabindex",-1);

        this.wrapper.appendChild(this.registerName);
        const valueEle =this.valueView.getHTMLElement();
        this.wrapper.appendChild(valueEle);
        this.wrapper.appendChild(this.displaySelect);


        

        this.unsignedDecimal.innerHTML = "Dziesiętny Bez Znaku"
        this.unsignedDecimal.value=ValueDisplayEnum.UnsignedDecimal;
        this.displaySelect.appendChild(this.unsignedDecimal);

        this.signedDecimal.innerHTML = "Dziesiętny Ze Zankiem";;
        this.signedDecimal.value=ValueDisplayEnum.SignedDecimal;
        this.displaySelect.appendChild(this.signedDecimal);

        this.binary.innerHTML = "Biinarny";
        this.binary.value=ValueDisplayEnum.Binary;
        this.displaySelect.appendChild(this.binary);

        this.hexaDecimal.innerHTML = "Heksadecymalny";
        this.hexaDecimal.value=ValueDisplayEnum.HexaDecimal;
        this.displaySelect.appendChild(this.hexaDecimal);

        this.instruction.innerHTML = "Instrukcja";
        this.instruction.value=ValueDisplayEnum.OpCodeArgument;
        this.displaySelect.appendChild(this.instruction);        

    }

    addCallbacks(){
        this.valueView.setOnPlusOneButton(()=>{this.onPlusOneButton();});
        this.valueView.setOnMinusOneButton(()=>{this.onMinusOneButon();});
        this.valueView.setOnSetZeroButton(()=>{ this.onSetZeroButton();});
        this.valueView.setOnWriteButton(()=>{this.onValueInput();});
        this.displaySelect.oninput=()=>{this.onDisplaySelect();};
    }

    onPlusOneButton(){
        this.currentRegister.setValue(this.currentRegister.getValue()+1);
        this.currentRegister.update();
    }

    onMinusOneButon(){
        this.currentRegister.setValue(this.currentRegister.getValue()-1);
        this.currentRegister.update();

    }

    onSetZeroButton(){
        this.currentRegister.setValue(0);
        this.currentRegister.update();
    }

    onValueInput(){
        const intVal = this.valueView.getValue();
            if(isNaN(intVal)==false){
                this.currentRegister.setValue(intVal);
                this.currentRegister.update();
            }
    }

    onDisplaySelect(){
        console.log(this.displaySelect);
        const display = parseInt(this.displaySelect.value,10);
        this.currentRegister.setDisplay(display);
    }

    selectRegister(_register){

        this.populateInspector(_register);
        this.currentRegister=_register;

        console.log(this.pastRegisters);

        if(this.pastRegisters.hasOwnProperty(_register.name)==false){
            this.pastRegisters[_register.name]=_register;

            _register.addOnUpdateCallback((_reg)=>{
                if(_reg==this.currentRegister){
                    this.populateInspector(_reg);
                }
            });

        }
    }


    populateInspector(_register){
        this.registerName.innerHTML="Rejestr: "+_register.name.toUpperCase();
        this.valueView.populateRegister(_register);

        this.displaySelect.value = _register.display;
        
    }




    getHTMLElement(){
        return this.wrapper;
    }
        


}
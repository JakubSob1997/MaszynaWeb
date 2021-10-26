
import SidebarContent from "./sidebar-content.js";
import ValueView from "./value-view.js"
import { ValueDisplayEnum } from "./enums.js";
import Translator from "./translator.js";

export default class RegisterInspector extends SidebarContent{

    constructor(_valueDisplayer,_variablePreview){

        super();

        this.wrapper = document.createElement("div");

        this.registerName =document.createElement("h1");

        this.valueView = new ValueView(_valueDisplayer);


        


        this.pastRegisters={};
        this.currentRegister=null;
        
        this.build();
        this.addCallbacks(_variablePreview);

    }
    focus(){
        this.registerName.focus();
    }

    build(){

        this.registerName.setAttribute("tabindex",-1);

        this.wrapper.appendChild(this.registerName);
        const valueEle =this.valueView.getHTMLElement();
        this.wrapper.appendChild(valueEle);

        this.wrapper.classList.add("generic-inspector"); 

        this.displaySelect=document.createElement("select");
        this.unsignedDecimal=document.createElement("option");
        this.signedDecimal=document.createElement("option");
        this.binary=document.createElement("option");
        this.hexaDecimal=document.createElement("option");
        this.instruction=document.createElement("option");


        this.unsignedDecimal.innerText = Translator.getTranslation("_display_unsigned","Unsigned Decimal")
        this.unsignedDecimal.value=ValueDisplayEnum.UnsignedDecimal;
        this.displaySelect.appendChild(this.unsignedDecimal);

        this.signedDecimal.innerText = Translator.getTranslation("_display_signed","Dziesiętny Ze Znakiem")
        this.signedDecimal.value=ValueDisplayEnum.SignedDecimal;
        this.displaySelect.appendChild(this.signedDecimal);

        this.binary.innerText = Translator.getTranslation("_display_binary","Binary");
        this.binary.value=ValueDisplayEnum.Binary;
        this.displaySelect.appendChild(this.binary);

        this.hexaDecimal.innerText = Translator.getTranslation("_display_hexadecimal","Hexadecimal");
        this.hexaDecimal.value=ValueDisplayEnum.HexaDecimal;
        this.displaySelect.appendChild(this.hexaDecimal);

        this.instruction.innerText = Translator.getTranslation("_display_instruction","Instruction");
        this.instruction.value=ValueDisplayEnum.OpCodeArgument;
        this.displaySelect.appendChild(this.instruction);        



        this.previewButton = document.createElement("button");
        this.previewButton.classList.add("custom-btn");
        this.previewButton.textContent="Preview";
        this.previewButton.style.display="block";
        

        this.wrapper.appendChild(this.displaySelect);

        this.wrapper.appendChild(this.previewButton);
    }

    addCallbacks(_variablePreview){
        this.valueView.setOnPlusOneButton(()=>{this.onPlusOneButton();});
        this.valueView.setOnMinusOneButton(()=>{this.onMinusOneButon();});
        this.valueView.setOnSetZeroButton(()=>{ this.onSetZeroButton();});
        this.valueView.setOnWriteButton(()=>{this.onValueInput();});
        this.displaySelect.oninput=()=>{this.onDisplaySelect();};
   
        this.previewButton.addEventListener("click",()=>{
            _variablePreview.registers.toggleRegister(this.currentRegister);
        });
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
        const display = parseInt(this.displaySelect.value,10);
        this.currentRegister.setDisplay(display);
    }

    selectRegister(_register){

        this.populateInspector(_register);
        this.currentRegister=_register;



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
        this.registerName.innerText=Translator.getTranslation("_register_header","Register: @0",[_register.name.toUpperCase()]);
        this.valueView.populateRegister(_register);

        this.displaySelect.value = _register.display;
        
    }




    getHTMLElement(){
        return this.wrapper;
    }
        


}
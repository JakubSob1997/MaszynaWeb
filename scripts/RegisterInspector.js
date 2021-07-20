


class RegisterInspector{

    constructor(){

        this.wrapper = document.createElement("div");

        this.registerName =document.createElement("div");

        this.vlaueWrapper = document.createElement("div");
        this.valueField=document.createElement("input");
        this.plusOneButton=document.createElement("button");
        this.minusOneButton=document.createElement("button");
        this.setZeroButton=document.createElement("button");


        this.displaySelect=document.createElement("select");
        this.unsignedDecimal=document.createElement("option");
        this.signedDecimal=document.createElement("option");
        this.binary=document.createElement("option");
        this.hexaDecimal=document.createElement("option");
        this.instruction=document.createElement("option");


        this.pastRegisters={};
        this.currentRegister=null;
        this.valueDisplayer = undefined;
        
        this.build();
        this.addCallbacks();


        const ele = document.getElementById("register-inspector");
        ele.appendChild(this.getHTMLElement());


    }

    build(){
        this.wrapper.appendChild(this.registerName);
        this.wrapper.appendChild(this.vlaueWrapper);
        this.wrapper.appendChild(this.displaySelect);

        this.vlaueWrapper.appendChild(this.valueField);
        this.plusOneButton.innerHTML="+1";
        this.vlaueWrapper.appendChild(this.plusOneButton);
        this.minusOneButton.innerHTML="-1";
        this.vlaueWrapper.appendChild(this.minusOneButton);
        this.setZeroButton.innerHTML="0"
        this.vlaueWrapper.appendChild(this.setZeroButton);

        this.displaySelect.appendChild(this.unsignedDecimal);
        this.displaySelect.appendChild(this.signedDecimal);
        this.displaySelect.appendChild(this.binary);
        this.displaySelect.appendChild(this.hexaDecimal);
        this.displaySelect.appendChild(this.instruction);        

    }

    addCallbacks(){
        this.plusOneButton.onclick=()=>{this.onPlusOneButton();};
        this.minusOneButton.onclick=()=>{this.onMinusOneButon();};
        this.setZeroButton.onclick=()=>{ this.onSetZeroButton();};
        this.valueField.oninput=()=>{this.onValueInput();};
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
        if(this.valueDisplayer===undefined){
            const stringVal = this.valueField.value;
            const intVal = parseInt(stringVal,10);
            if(intVal !=NaN){
                this.currentRegister.setValue(intVal);
                this.currentRegister.update();
            }
        }
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
        this.registerName.innerHTML=_register.name;
        if(this.valueDisplayer===undefined){
            this.valueField.value=_register.getValue();
        }
        
    }




    getHTMLElement(){
        return this.wrapper;
    }
        


}






class MachineView{

    constructor(_Machine , _settingsSerializer,_instructionListSerializer){

        this.M =  _Machine;

        if(_settingsSerializer==null){
            _settingsSerializer= SettingsSerializer.getDefault();
        }
        if(_instructionListSerializer ==null){
            _instructionListSerializer = InstructionListSerializer.getDefault();
        }
        this.M.setSettings(_settingsSerializer);
        this.M.setInstructionList(_instructionListSerializer);


        this.registerViews = [];
        this.signalViews=[];
        this.busViews =[];
        this.jalView=null;


    }


    setupMachine(){
        this.setupRegisterViews(this.M.registers);
        this.setupSignalViews(this.M.singnalDictionary);
    }



    createRegisterElement(_register){
        let element  = document.createElement("div")
        element.classList.add("reg");
        element.innerHTML=_register.getDisplayText();


        _register.addOnUpdateCallback(_reg=>{
                element.innerHTML=_reg.getDisplayText();
                if(_reg.wasWriten){
                    element.classList.add("register-selected");
                }else{
                    element.classList.remove("register-selected");
                }
            }
        );
        return element;
    }

    
    createSignalElement(_signal){
        let element  = document.createElement("div")
        element.classList.add("sig");
        element.innerHTML=_signal.name;



        _signal.addOnUpdateCallback(_sig=>{

            if((this.M.settings.extentionFlags & _sig.extention) === 0 ){
                element.classList.add("sig-hidden");
            }else{
                element.classList.remove("sig-hidden");
            }

            if(this.M.isSignalSelected(_signal.name)){
            
                element.classList.add("signal-selected");
            }else{
                element.classList.remove("signal-selected");
            }

            
            
            
        });
        
        _signal.update();

        console.log(_signal.onUpdateCallbacks);
        return element;
    }



    setupRegisterViews(_registers){
        _registers.forEach(reg => {
            let regWrappers = document.getElementsByClassName(reg.name+"-r");
            
            for (let i = 0; i < regWrappers.length; i++) {
                const wrapper = regWrappers[i];
                const regView = this.createRegisterElement(reg);
                
                this.registerViews.push(regView);
                wrapper.appendChild(regView);
                
            }   
        });
    }





    setupSignalViews(_signalDict){
        for (const signalName in _signalDict) {
            if (Object.hasOwnProperty.call(_signalDict, signalName)) {
                const signal = _signalDict[signalName];
                
                let signalWrappers = document.getElementsByClassName(signalName+"-s");
                
                for (let i = 0; i < signalWrappers.length; i++) {
                    const wrapper = signalWrappers[i];
                    const sigView = this.createSignalElement(signal);

                    this.signalViews.push(sigView);
                    wrapper.appendChild(sigView);
                    
                } 


            }
        }
    }





}









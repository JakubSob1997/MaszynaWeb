


import SidebarContent from "./sidebar-content.js";
import ConfirmButtonView from "./confirm-buttton-view.js";
import InstrcutionParser from "./instruction-parser.js";
import Alerter from "./alerter.js";
import { AlertStyleEnum } from "./enums.js";
import InstructionChangesCache from "./instruction-changes-cache.js"
import InstructionCodeMirror from "./instruction-codemirror.js";
import Translator from "./translator.js";

export default class InstructionEditor extends SidebarContent{

    constructor(_Machine,_parentContainer){

        super();


        this.hackParentContainer = _parentContainer;

        this.wrapper;
        this.header;
        this.codeMirror;
        this.saveButon ;
        this.deleteButon;

        this.changesChache =  new InstructionChangesCache();
        this.M = _Machine;

        this.buildEditor();
        this.addCallbacks(_Machine);
        this.instrName;

        this.instructionList = _Machine.instructionList;

    }

    focus(){
        this.codeMirror.cm.refresh();
        this.header.focus();
    }

    buildEditor(){

        this.wrapper= document.createElement("div");
        this.header = document.createElement("h1");
        this.cmWrappr = document.createElement("div");
        this.codeMirror = new InstructionCodeMirror(this.cmWrappr)
        this.saveButon = document.createElement("button");
        this.deleteButon= new ConfirmButtonView();
        this.cancelButton = new ConfirmButtonView();

        this.header.setAttribute("tabindex",-1);


        this.wrapper.appendChild(this.header);
        this.wrapper.appendChild(this.cmWrappr);
        this.wrapper.appendChild(this.saveButon);
        this.wrapper.appendChild(this.deleteButon.getHTMLElement());
        this.wrapper.appendChild(this.cancelButton.getHTMLElement());
        
        this.header.innerText="inst"     
        this.saveButon.innerText=Translator.getTranslation("_save_instruction","Save")
        this.deleteButon.getHTMLElement().innerText=Translator.getTranslation("_delete","Delete");
        this.cancelButton.getHTMLElement().innerText=Translator.getTranslation("_cancel","Cancel");

        this.wrapper.classList.add("generic-inspector")
        this.saveButon.classList.add("custom-btn");        
        

        

        
    }




    showDirty(_isDirty){    

        const headerText =Translator.getTranslation("_instruction_header","Instruction: @0",[this.instrName])

        if(_isDirty){
            this.header.innerText="*"+headerText;
            this.cancelButton.getHTMLElement().classList.remove("display-none");
        }else{
            this.header.innerText=headerText;
            this.cancelButton.getHTMLElement().classList.add("display-none");
        }
    }

    updateHighlight(){

        const currentCode =this.M.getCurrentInstruction()
        const cycle = this.M.getCurrentCycle()
        const currentInstr  =this.instructionList.getInstruction(currentCode);
        const curentName = currentInstr?.name;

        

        if(curentName===this.instrName){

            const start = currentInstr.cycles[cycle]?.ogStart;
            const end = currentInstr.cycles[cycle]?.ogEnd;

            if(start!==undefined &&end!==undefined){
                this.codeMirror.highlightArea(start,end)
            }else{
                this.codeMirror.clearAll();
            }
            
        }else{
            this.codeMirror.clearAll();
        }

        this.codeMirror
    }

    populateEditor(_instruction){

        this.instrName=_instruction.name;
        const name= this.instrName


        if(this.changesChache.isDirty(name)){
            this.codeMirror.cm.setValue(this.changesChache.getCache(name));
            this.codeMirror.cm.clearHistory();
            this.showDirty(true);
        }else{
            this.codeMirror.cm.setValue(_instruction.source)
            this.codeMirror.cm.clearHistory();
            this.showDirty(false);
            this.changesChache.clearCache(name);
        }

        
        this.updateHighlight();
        

    }

    onInstrDeleted(_name,_index){
        this.changesChache.clearCache(_name);
        if(_name===this.instrName){
            this.hackParentContainer.hideContent(this);
        }
    }

    onInstrChanged(_old,_new,_index,_list){
        this.changesChache.clearCache(_old);
        if(_old===this.instrName){
            this.populateEditor(_list.getInstruction(_index));
        }
    }

    onInstrListChanged(list){
        this.changesChache.clearAll();
        this.hackParentContainer.hideContent(this);
    }

    addCallbacks(_Machine){
        

        if( _Machine!=null ){

            this.deleteButon.addOnClickHandler((e)=>{
                _Machine.instructionList.removeInstruction(this.instrName);
            })

            _Machine.instructionList.addOnInstructionDeletedCallback((_name,_index)=>{
                this.onInstrDeleted(_name,_index);
            })

            _Machine.instructionList.addOnInstuctionChangedCallback(
                (_old,_new,_index)=>{
                    this.onInstrChanged(_old,_new,_index,_Machine.instructionList);
                }
            )
            _Machine.instructionList.addOnInstructionListChangedCallbacks(
                ()=>{
                    this.onInstrListChanged();
                }
            )

            _Machine.I_register.addOnUpdateCallback(()=>{
                this.updateHighlight();
            })

            _Machine.T_register.addOnUpdateCallback(()=>{
                this.updateHighlight();
            })



            this.codeMirror.cm.on("change",(update)=>{
                this.changesChache.setCache(this.instrName,this.codeMirror.cm.getValue());
                this.showDirty(true);
                
            
            })
            


            this.cancelButton.addOnClickHandler((e)=>{
                this.changesChache.clearCache(this.instrName);
                this.populateEditor(this.instructionList.getInstruction(this.instrName));

            })


            this.saveButon.onclick = ()=>{
                const parser = new InstrcutionParser(this.codeMirror.cm.getValue());
                parser.validate(_Machine);

                console.log(parser);

                if(parser.parseSuccesful===true){

                    const instr = parser.toInstruction();//instr.name+
                    console.log(instr);
                    




                    if(_Machine.instructionList.updateInstruction(this.instrName,instr)){
                        Alerter.sendMessage(Translator.getTranslation("_message_instruction_loaded","Instruction @0 was saved succesfully!",[instr.name]),AlertStyleEnum.Succes);
                    }else{
                        Alerter.sendMessage(Translator.getTranslation("_message_instrucion_exsists","Instruction @0 already exsists in instruction list!",[instr.name]),AlertStyleEnum.SyntaxError);
                    }
                    
                }else{
                    parser.errorList.forEach(error => {
                        Alerter.sendMessage(error,AlertStyleEnum.SyntaxError);
                    });
                }

                

            }




        }


       
    }

    getHTMLElement(){
        return this.wrapper;
    }

}




import SidebarContent from "./sidebar-content.js";
import ConfirmButtonView from "./confirm-buttton-view.js";
import InstrcutionParser from "./instruction-parser.js";
import Alerter from "./alerter.js";
import { AlertStyleEnum } from "./enums.js";
import InstructionChangesCache from "./instruction-changes-cache.js"
import InstructionCodeMirror from "./instruction-codemirror.js";

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
        this.header = document.createElement("h3");
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
        
        this.header.innerHTML="inst"     
        this.saveButon.innerHTML="Zapisz"
        this.deleteButon.getHTMLElement().innerHTML="Usuń";
        this.cancelButton.getHTMLElement().innerHTML="Cofnij";

        this.wrapper.classList.add("generic-inspector")
        this.saveButon.classList.add("custom-btn");        
        

        

        
    }




    showDirty(_isDirty){    

        if(_isDirty){
            this.header.innerHTML="*Rozkaz: "+this.instrName;
            this.cancelButton.getHTMLElement().classList.remove("display-none");
        }else{
            this.header.innerHTML="Rozkaz: "+this.instrName;
            this.cancelButton.getHTMLElement().classList.add("display-none");
        }
    }

    populateEditor(_instruction){

        this.instrName=_instruction.name;
        const name= this.instrName


        if(this.changesChache.isDirty(name)){
            this.codeMirror.cm.setValue(this.changesChache.getCache(name));
            this.showDirty(true);
        }else{
            this.codeMirror.cm.setValue(_instruction.source)
            this.showDirty(false);
            this.changesChache.clearCache(name);
        }

        

        

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



                if(parser.parseSuccesful==true){

                    const instr = parser.toInstruction();
                    if(_Machine.instructionList.updateInstruction(this.instrName,instr)){
                        Alerter.sendMessage("Rozkaz "+instr.name+" został poprawnie zapisany!",AlertStyleEnum.Succes);
                    }else{
                        Alerter.sendMessage("Już istnieje rozkaz "+instr.name+" w liście instrukcji!",AlertStyleEnum.SyntaxError);
                    }
                    
                }else{
                    parser.errorList.forEach(error => {
                        Alerter.sendMessage(error,AlertStyleEnum.SyntaxError);
                    });
                }

                

                //console.log(parser);
            }




        }


       
    }

    getHTMLElement(){
        return this.wrapper;
    }

}

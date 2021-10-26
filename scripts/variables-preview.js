import { MatchRegisterWidthEnum, ValueDisplayEnum } from "./enums.js";
import Translator from "./translator.js";








export default class VariablesPreview{

    constructor(_valueDisplayer,_mem){
        this.build(_valueDisplayer,_mem);
    }

    build(_valueDisplayer,_mem){

        this.wrapper =document.createElement("div");
        this.header = document.createElement("h2");
        this.content = document.createElement("div");

        this.registers = new RegisterPreviews(_valueDisplayer);
        this.memory=new MemoryPreviews(_valueDisplayer,_mem);


        this.content.appendChild(this.registers.getHTMLElemnt());
        this.content.appendChild(this.memory.getHTMLElemnt());

        this.wrapper.appendChild(this.header);
        this.wrapper.appendChild(this.content);
        

    }

    clearAll(){
        this.registers.clearPreviews();
        this.memory.clearPreviews();
    }

    getHTMLElemnt(){
        return this.wrapper;
    }

}

class PreviewEntry{
    constructor(){
        this.build();
    }

    build(){
        this.wrapper = document.createElement("dl");
        this.name= document.createElement("dt");
        this.value=document.createElement("dd");

        this.wrapper.appendChild(this.name);
        this.wrapper.appendChild(this.value);
    }

    setValues(){
        console.log("overide me");
    }

    getId(){
        console.log("overide me");
        return null;
    }

    getHTMLElemnt(){
        return this.wrapper;
    }
}



class Previews {
    constructor(_header){


        this.previews={};
        this.build(_header)

    }

    build(_header){
        this.wrapper=document.createElement("div");
        this.header = document.createElement("h3");
        this.list = document.createElement("dl");
    
    
        this.header.textContent = _header;


        this.wrapper.appendChild(this.header);
        this.wrapper.appendChild(this.list);

    }

    clearPreviews(){
        delete this.previews;
        this.previews= {};

        this.buildList();
    }

    hasPreview(_id){
        return this.previews.hasOwnProperty(_id);
    }

    addPreview(_preview,_forceRebuild){
        
        this.previews[_preview.getId()] = _preview;
        
        if(_forceRebuild)this.buildList();
        
    }

    removePreview(_preview,_forceRebuild){
        
        delete this.previews[_preview.getId()];
        if(_forceRebuild)this.buildList();
    }

    buildList(){
        this.list.innerHTML="";

        for (const key in this.previews) {
            if (Object.hasOwnProperty.call(this.previews, key)) {
                
                const preview = this.previews[key];
                preview.setValues();
                this.list.appendChild(preview.getHTMLElemnt());

            }
        }
    }

    getHTMLElemnt(){
        return this.wrapper;
    }
}



class RegisterPreviewEntry extends PreviewEntry{
    constructor(_register,_valueDisplayer){
        super();
        this.valueDisplayer=_valueDisplayer;
        this.register=_register;


        _register.addOnUpdateCallback((_r)=>{
            this.setValues();

        });
    }


    setValues(){
        this.name.textContent = this.register.name.toUpperCase();
        this.value.textContent = this.valueDisplayer.registerToString(this.register);
    }

    getId(){
        return this.register.name;
    }


}
class RegisterPreviews extends Previews{
    constructor(_valueDisplayer){
        super(Translator.getTranslation("_registers","Registers"));
        this.valueDisplayer = _valueDisplayer;
    }

    toggleRegister(_register){
        let preview  = new RegisterPreviewEntry(_register,this.valueDisplayer);

        
        if(this.hasPreview(preview.getId())==false){
            
            this.addPreview(preview,true);
        }else{
            
            this.removePreview(preview,true);
        }
    }

}




class MemoryPreviewEntry extends PreviewEntry{
    constructor(_valueDisplayer,_addres,_value,_label){

        super();
        this.valueDisplayer=_valueDisplayer;
        this.addres=_addres;
        this.cachedValue=_value;
        this.label =_label;
        
    }

    setValues(){
        this.name.textContent = (this.label?this.label:"")+` [${this.addres}]`;
        
        const decimal = this.valueDisplayer.wordToString(this.cachedValue,ValueDisplayEnum.UnsignedDecimal);
        const instr = this.valueDisplayer.wordToString(this.cachedValue,ValueDisplayEnum.OpCodeArgument);
        
        this.value.textContent = `${decimal} (${instr})`;
            

    }

    getId(){
        return this.addres;
    }

}

class MemoryPreviews extends Previews{
    constructor(_valueDisplayer,_mem){
        super(Translator.getTranslation("_memory","Memory"));
        this.valueDisplayer = _valueDisplayer;
        this.mem=_mem;

        this.mem.addOnValueChangedCallback((_mem,_addres)=>{
            if(this.hasPreview(_addres)){
                const preview=this.previews[_addres];
                preview.cachedValue=_mem.getValue(_addres);
                preview.setValues();
            }
        })

        this.mem.addOnMemoryChangedCallback((_mem)=>{
            let rebuildFlag = false;
            for (const key in this.previews) {
                if (Object.hasOwnProperty.call(this.previews, key)) {
                    const preview = this.previews[key];
                    const addres = preview.addres;
                    
                    if(_mem.length()<=addres){
                        
                        delete this.previews[key];
                        rebuildFlag=true;

                    }else{
                        preview.cachedValue=_mem.getValue(addres);
                        preview.setValues();
                    }
                }
            }
            if(rebuildFlag){
                this.buildList();
            }
        })

    }


    addMemorySlot(_addres,_label){
        if(_addres<this.mem.length()){
            const entry = new MemoryPreviewEntry(this.valueDisplayer,_addres,this.mem.getValue(_addres),_label);
        this.addPreview(entry,false);
        }
        

    }

    toggleMemorySlot(_addres){
        const entry = new MemoryPreviewEntry(this.valueDisplayer,_addres,this.mem.getValue(_addres));
        if(this.hasPreview(entry.getId())==false){
            
            this.addPreview(entry,true);
        }else{
            
            this.removePreview(entry,true);
        }
    }
}












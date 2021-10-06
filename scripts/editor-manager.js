
import AssemblyEditor from "./assembly-editor.js"
import InstructionEditor from "./instruction-editor.js";
import LayoutMediator from "./layout-mediator.js";

export default class EditorManager{

    constructor(_Element,_Machine,_MachineView){


        this.editorElement = _Element;
        this.currentEditor =null;

        this.assemblyEditor = new AssemblyEditor(_Machine,_MachineView.valueDisplayer);
        this.instructionEditor = new InstructionEditor(_Machine,this);

        this.editorElement.appendChild(this.assemblyEditor.getHTMLElement());
        this.assemblyEditor.refresh();

    }

    selectCurrentEditor(_editor){
        if(this.currentEditor !=_editor){
            this.editorElement.innerHTML="";
            this.currentEditor=_editor;
            this.editorElement.appendChild(_editor.getHTMLElement());
            
        }
        LayoutMediator.showLeftPanel();
        _editor.focus();   
    }


    drawEditorForAssembly(){
        this.selectCurrentEditor(this.assemblyEditor);
    }

    drawEditorForInstruction(_instruction){
        this.instructionEditor.populateEditor(_instruction);
        this.selectCurrentEditor(this.instructionEditor);
    }

    hideContent(_conetentToHide){
        if(this.currentEditor ===_conetentToHide){
            this.getHTMLElement().innerHTML="";
            this.currentEditor = null;
            LayoutMediator.hideLeftPanel();
        }
    }

    getHTMLElement(){
        return this.editorElement;
    }
}


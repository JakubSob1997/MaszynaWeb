
import AssemblyEditor from "./assembly-editor.js"
import InstructionEditor from "./instruction-editor.js";

export default class EditorManager{

    constructor(_Element,_Machine,_MachineView){


        this.editorElement = _Element;
        this.currentEditor =null;

        this.assemblyEditor = new AssemblyEditor(_Machine);
        this.instructionEditor = new InstructionEditor(_Machine.instructionList);

        this.editorElement.appendChild(this.assemblyEditor.getHTMLElement());

    }

    selectCurrentEditor(_editor){
        if(this.currentEditor !=_editor){
            this.editorElement.innerHTML="";
            this.currentEditor=_editor;
            this.editorElement.appendChild(_editor.getHTMLElement());
            
        }

        _editor.focus();   
    }


    drawEditorForAssembly(){
        this.selectCurrentEditor(this.assemblyEditor);
    }

    drawEditorForInstruction(_instruction){
        this.instructionEditor.populateEditor(_instruction);
        this.selectCurrentEditor(this.instructionEditor);
    }
}









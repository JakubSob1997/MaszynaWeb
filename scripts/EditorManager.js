

class EditorManager{

    constructor(_Element,_Machine,_MachineView){


        this.editorElement = _Element;
        this.currentEditor =null;

        this.assemblyEditor = new AssemblyEditor(_Machine);
        this.instructionEditor = new InstructionEditor();


        editorElement.appendChild(this.assemblyEditor.getHTMLElement());

    }

    selectCurrentEditor(_editor){
        if(this.currentEditor !=_editor){
            this.editorElement.innerHTML="";
            this.currentEditor=_editor;
            console.log(_editor.getHTMLElement);
            this.editorElement.appendChild(_editor.getHTMLElement());
        }

        
    }


    drawEditorForAssembly(){
        this.selectCurrentEditor(this.assemblyEditor);
    }

    drawEditorForInstruction(_instruction){
        this.instructionEditor.populateEditor(_instruction);
        this.selectCurrentEditor(this.instructionEditor);
    }
}










import MachineViewElement from "./machine-view-element.js";


export default class NachineViewArrow extends MachineViewElement{

    constructor(_mv,_signalName,_type){
        super(_mv);
        this.signalName=_signalName;
        this.type=_type;

        this.build();
    }

    static extractDataFromClasname(_mv,_className){


        const splited = _className.split("-arrow-");

        if(splited.length>1){
            const sig=splited[0];
            const type=splited[1];

            return new NachineViewArrow(_mv,sig,type);

        }

        return null;

    }


    build(){
        this.body = document.createElement("div");
        this.body.classList.add("arrow-body");
        this.body.classList.add("arrow-body-"+this.type);

        this.head = document.createElement("div");
        this.head.classList.add("arrow-head");
        this.head.classList.add("arrow-head-"+this.type);


        this.body.appendChild(this.head);


    }

    subscribeSignal(_sig){
        this.signal = _sig;

        this.machineView.M.addOnCycleDoneCallback((_M)=>{
            if(_M.isSignalSelected(this.signalName)){
                this.body.classList.add("arrow-selected");
                this.head.classList.add("arrow-selected");
            }else{
                this.body.classList.remove("arrow-selected");
                this.head.classList.remove("arrow-selected");
            }
        })

    }
    

    display(){
        const allExtentions = this.machineView.M.settings.extentionFlags;
        const myExtention =this.signal.getExtention();

        if(( allExtentions&myExtention ) == 0 ){
            this.body.classList.add("arrow-body-hidden");
            this.head.classList.add("arrow-head-hidden");
        }else{
            this.body.classList.remove("arrow-body-hidden");
            this.head.classList.remove("arrow-head-hidden");
        }
    }

    getHTMLElement(){
        return this.body;
    }
    
}













import MachineViewElement from "./machine-view-element.js";


export default class NachineViewArrow extends MachineViewElement{

    constructor(_mv,_signal,_type){
        super(_mv);
        this.signal=_signal;
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
    }
    
    getHTMLElement(){
        return this.body;
    }
    
}












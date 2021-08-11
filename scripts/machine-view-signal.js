






import MachineViewElement from "./machine-view-element.js";


export default class MachineViewSignal extends MachineViewElement{


    constructor(_machineView,_signal){
        
        
        super(_machineView);


        this.signal = _signal;

        this.element;
        this.build(_machineView,_signal);
        

        this.display();


    }

    build(_machineView,_signal){
        

    }

    display(){
        
        

    }

    getHTMLElement(){
        return this.element;
    }

}





import MachineViewElement from "./machine-view-element.js";







export default class MachineViewBus extends MachineViewElement{
    constructor(_machineView,_bus,_isVertical){
        super(_machineView);

        this.bus = _bus;

        this.element;
        this.build(_machineView,_bus,_isVertical);

        this.display();


    }


    build(_machineView,_bus,_isVertical){

        this.element  = document.createElement("div")


        if(_isVertical){
            this.element.classList.add("bus-vert");
        }else{
            
            this.element.classList.add("bus-hor");
        }


        this.display();
        _bus.addOnUpdateCallback((_b)=>{
            this.display();
        })
    }


    display(){



        if(this.bus.hasValue()){
            this.element.classList.add("bus-selected");
        }else{
            
            this.element.classList.remove("bus-selected");
        }
    }

    getHTMLElement(){
        return this.element;
    }

}







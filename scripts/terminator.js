
/*
    1 Singleton - Terminator
    1 Goal - Terminator.terminate();

    It is used to turn of machine execution at any point of the code
*/


let Terminator ={

    terminables:[],

    terminate:function(){
        this.terminables.forEach(terminable => {
            terminable.onTerminate();
        });
    },


    addTerminable:function(_ITerminable){
        this.terminables.push(_ITerminable);
    },

}

export default Terminator;

export class ITerminable{

    constructor(){

    }

    onTerminate(){
        console.log("I am terminated(overide)");
    }


}

















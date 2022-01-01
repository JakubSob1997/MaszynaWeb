
/*
    1 Singleton - Terminator
    1 Goal - Terminator.terminate();

    It is used to turn of machine execution at any point of the code
*/


const Terminator ={

    terminables:[],

    terminate(){
        this.terminables.forEach(terminable => {
            terminable.onTerminate();
        });
    },


    addTerminable(_ITerminable){
        this.terminables.push(_ITerminable);
    },

}

export default Terminator;

export class ITerminable{


    onTerminate(){
        console.log("I am terminated(overide)");
    }


}

















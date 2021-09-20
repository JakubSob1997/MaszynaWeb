



import InstructionData from "./instruction-data.js";



export default class InstructionListData {
    constructor(_instrDataArray){

        
        this.intructionDataArray = _instrDataArray;
    }

    static getDefault(){


        const STP  = new InstructionData(
            "STP",
            "ROZKAZ STP;\n"+
            "BEZARG;\n"+
            "czyt wys wei il;\n"+
            "stop;\n"
        )
           
        
        const DOD = new InstructionData(
            "DOD", 
            "ROZKAZ DOD;\n"+
            "czyt wys wei il;\n"+
            "wyad wea;\n"+
            "wyl wea czyt wys weja dod weak;\n"
        )

        const ODE = new InstructionData(
            "ODE",
            "ROZKAZ ODE;\n"+
            "czyt wys wei il;\n"+
            "wyad wea;\n"+
            "wyl wea czyt wys weja ode weak;\n"
        )
        const POB = new InstructionData(
            "POB",
            "ROZKAZ POB;\n"+
            "czyt wys wei il;\n"+
            "wyad wea;\n"+
            "wyl wea czyt wys weja przep weak;\n"
        )
        const LAD =new InstructionData(
            "LAD",
            "ROZKAZ LAD;\n"+
            "czyt wys wei il;\n"+
            "wyad wea wyak wes;\n"+
            "pisz wyl wea;\n"
        )

        const SOB=new InstructionData(
            "SOB",
            "ROZKAZ SOB;\n"+
            "czyt wys wei il;\n"+
            "wyad wea wel;\n"
        )
        const SOM=new InstructionData(
            "SOM",
            "ROZKAZ SOM;\n"+
            "czyt wys wei il;\n"+
            "JEZELI Z @skok;\n"+
            "wyl wea KONIEC;\n"+
            "@skok wyad wea wel;\n"
        )

        const SOZ=new InstructionData(
            "SOZ",
            "ROZKAZ SOZ;\n"+
            "czyt wys wei il;\n"+
            "JEZELI ZAK @skok;\n"+
            "wyl wea KONIEC;\n"+
            "@skok wyad wea wel;\n"
        )

        const IN =new InstructionData(
            "IN",
            "ROZKAZ IN;\n"+
            "czyt wys wei il;\n"+
            "wyak weja ode weak start;\n"+
            "@wait wyg weja ode weak;\n"+
            "JEzELI Z TO @done GDY NIE @wait;\n"+
            "@done wyrb weja przep weak wyl wea;"
        )


        const OUT  = new InstructionData(
            "OUT",
            "ROZKAZ OUT;\n"+
            "czyt wys wei il;\n"+
            "wyak werb wes weja ode weak start;\n"+
            "@wait wyg weja ode weak;\n"+
            "Jezeli z to @done gdy nie @wait;\n"+
            "@done wys weja przep weak wyl wea;"
        )
        const intrDatas = [STP,DOD,ODE,POB,LAD,SOB,SOM,SOZ,IN,OUT];
        
        return new InstructionListData(intrDatas)
    }


}



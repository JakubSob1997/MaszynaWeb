



import InstructionData from "./instruction-data.js";



export default class InstructionListData {
    constructor(_instrDataArray){

        
        this.instructionDataArray = _instrDataArray;
    }

    static getDefault(){


        const STP  = new InstructionData(
            "STP",
            "// Stops the program execution\n"+
            "// Zatrzymuje działanie programu\n"+
            "ROZKAZ STP;\n"+
            "ARGUMENTY 0;\n"+
            "czyt wys wei il;\n"+
            "stop;\n"
        )
           
        
        const DOD = new InstructionData(
            "DOD", 
            "// Adds value from Memory[AD] to AK\n"+
            "// Dodaje wartość z Pemięci[AD] do AK\n"+
            "ROZKAZ DOD;\n"+
            "czyt wys wei il;\n"+
            "wyad wea;\n"+
            "wyl wea czyt wys weja dod weak;\n"
        )

        const ODE = new InstructionData(
            "ODE",
            "// Substracts value from Memory[AD] to AK\n"+
            "// Odejmuje wartość z Pemięci[AD] do AK\n"+
            "ROZKAZ ODE;\n"+
            "czyt wys wei il;\n"+
            "wyad wea;\n"+
            "wyl wea czyt wys weja ode weak;\n"
        )
        const POB = new InstructionData(
            "POB",
            "// Reads value from Memory[AD] to AK\n"+
            "// Pobiera wartość z Pemięci[AD] do AK\n"+
            "ROZKAZ POB;\n"+
            "czyt wys wei il;\n"+
            "wyad wea;\n"+
            "wyl wea czyt wys weja przep weak;\n"
        )
        const LAD =new InstructionData(
            "LAD",
            "// Loads value from AK into the Memory[AD] \n"+
            "// Ładuje wartość z AK do Pemięci[AD]\n"+
            "ROZKAZ LAD;\n"+
            "czyt wys wei il;\n"+
            "wyad wea wyak wes;\n"+
            "pisz wyl wea;\n"
        )

        const SOB=new InstructionData(
            "SOB",
            "// Unconditional jump to AD addres \n"+
            "// Skok bezwarunkowy do adresu AD\n"+
            "ROZKAZ SOB;\n"+
            "czyt wys wei il;\n"+
            "wyad wea wel;\n"
        )
        const SOM=new InstructionData(
            "SOM",
            "// Jump when AK<0 to AD addres \n"+
            "// Skok gdu AK<0 do adresu AD\n"+
            "ROZKAZ SOM;\n"+
            "czyt wys wei il;\n"+
            "JEZELI Z @skok;\n"+
            "wyl wea KONIEC;\n"+
            "@skok wyad wea wel;\n"
        )

        const SOZ=new InstructionData(
            "SOZ",
            "// Jump when AK==0 to AD addres \n"+
            "// Skok gdu AK==0 do adresu AD\n"+
            "ROZKAZ SOZ;\n"+
            "czyt wys wei il;\n"+
            "JEZELI ZAK @skok;\n"+
            "wyl wea KONIEC;\n"+
            "@skok wyad wea wel;\n"
        )

        /*
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
        */
        const intrDatas = [STP,DOD,ODE,POB,LAD,SOB,SOM,SOZ/*,IN,OUT*/];

        return new InstructionListData(intrDatas)
    }


}



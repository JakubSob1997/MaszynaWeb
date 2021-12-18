import addAssemblyFontColoring from "./scripts/assembly-color-model.js";
import addInstructionFontColoring from "./scripts/instruction-color-model.js";
import setupLayout from "./scripts/layout.js";
import runMain from "./scripts/main.js"


addInstructionFontColoring();
addAssemblyFontColoring();
setupLayout();

runMain();

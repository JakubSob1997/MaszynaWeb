

import AssemblyColorContext from "./assembly-color-context.js";
import CodeMirror from "codemirror";


export default function addAssemblyFontColoring(){



(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
  mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
  define(["../../lib/codemirror"], mod);
  else // Plain browser env
  mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

CodeMirror.defineMode('prog', function(_config, parserConfig) {



  var types = /^(rst|rpa|rtb)$/i;
  var numbers = /^(#[\da-f]+|%[01]+|\-?\d+)$/i;

  return {
    startState: function() {
      return {
      };
    },
    token: function(stream, state) {

      function isLastWordCharacter(stream,state){

        if(stream.eol())return true;
        if( stream.peek().match(/\s/))return true;
        if(stream.eat("/")){
          const check = stream.peek()==="/";
          stream.backUp(1);
          if(check)return true;
        }
        return false;
      }


      if(stream.eatSpace()){
        return null;
      }


      if(stream.eat("/")){
        const check = stream.peek()==="/";
       
        if(check){ 
          stream.skipToEnd();
          return "comment";
        }

        stream.backUp(1);
      }



      
      while(isLastWordCharacter(stream,state)===false){
        stream.next();
      }
      let word  = stream.current();
      if(word.match(types)){
        return "keyword";
      }

      if(AssemblyColorContext.instructionList!=null){
        if(AssemblyColorContext.instructionList.hasInstruction(word)){
          return "type";
        }
      }
      

      if(word.match(numbers)){
        return "number";
      }


      if(word.slice(-1)===":"){
        return "variable-3";
      }
      
      
      return null;
    }
  };
});


});

}

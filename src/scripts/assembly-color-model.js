

import AssemblyColorContext from "./assembly-color-context.js";



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

  // if (ez80) {
  //   keywords1 = /^(exx?|(ld|cp)([di]r?)?|[lp]ea|pop|push|ad[cd]|cpl|daa|dec|inc|neg|sbc|sub|and|bit|[cs]cf|x?or|res|set|r[lr]c?a?|r[lr]d|s[lr]a|srl|djnz|nop|[de]i|halt|im|in([di]mr?|ir?|irx|2r?)|ot(dmr?|[id]rx|imr?)|out(0?|[di]r?|[di]2r?)|tst(io)?|slp)(\.([sl]?i)?[sl])?\b/i;
  //   keywords2 = /^(((call|j[pr]|rst|ret[in]?)(\.([sl]?i)?[sl])?)|(rs|st)mix)\b/i;
  // } else {
  //   keywords1 = /^(exx?|(ld|cp|in)([di]r?)?|pop|push|ad[cd]|cpl|daa|dec|inc|neg|sbc|sub|and|bit|[cs]cf|x?or|res|set|r[lr]c?a?|r[lr]d|s[lr]a|srl|djnz|nop|rst|[de]i|halt|im|ot[di]r|out[di]?)\b/i;
  //   keywords2 = /^(call|j[pr]|ret[in]?|b_?(call|jump))\b/i;
  // }

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

/*
CodeMirror.defineMIME("text/x-z80", "z80");
CodeMirror.defineMIME("text/x-ez80", { name: "z80", ez80: true });
*/
});

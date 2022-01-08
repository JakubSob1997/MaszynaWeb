import InstructionColorContext from "./instruction-color-context.js";
import CodeMirror from "codemirror";

export default function addInstructionFontColoring(){


(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
  mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
  define(["../../lib/codemirror"], mod);
  else // Plain browser env
  mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

CodeMirror.defineMode('inst', function(_config, parserConfig) {

  // if (ez80) {
  //   keywords1 = /^(exx?|(ld|cp)([di]r?)?|[lp]ea|pop|push|ad[cd]|cpl|daa|dec|inc|neg|sbc|sub|and|bit|[cs]cf|x?or|res|set|r[lr]c?a?|r[lr]d|s[lr]a|srl|djnz|nop|[de]i|halt|im|in([di]mr?|ir?|irx|2r?)|ot(dmr?|[id]rx|imr?)|out(0?|[di]r?|[di]2r?)|tst(io)?|slp)(\.([sl]?i)?[sl])?\b/i;
  //   keywords2 = /^(((call|j[pr]|rst|ret[in]?)(\.([sl]?i)?[sl])?)|(rs|st)mix)\b/i;
  // } else {
  //   keywords1 = /^(exx?|(ld|cp|in)([di]r?)?|pop|push|ad[cd]|cpl|daa|dec|inc|neg|sbc|sub|and|bit|[cs]cf|x?or|res|set|r[lr]c?a?|r[lr]d|s[lr]a|srl|djnz|nop|rst|[de]i|halt|im|ot[di]r|out[di]?)\b/i;
  //   keywords2 = /^(call|j[pr]|ret[in]?|b_?(call|jump))\b/i;
  // }

  var types = /^(rst|rpa|rtb)$/i;
  var numbers = /^(#[\da-f]+|%[01]+|\d+d?)$/i;

  return {
    startState: function() {
        
        //statmentType:
        //0: signals
        //1: JEZELI 
        //2: JEZELI NIE 
        //3: JEZELI TO
        //4: DALEJ
        //5: KONIEC
        //6: ROZKAZ
        //7: ARGUMENTY

    
      return {
        statmentType:0,
        index:-1.
      };
    },
    token: function(stream, state) {

      function isLastWordCharacter(stream,state){

        if(stream.eol())return true;
        if( stream.peek().match(/\s/))return true;
        if(stream.eat(";")){
            stream.backUp(1);
            return true;
        }
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


      if(stream.eat(";")){

        let isError = false;
        if(state.statmentType===1&&state.index<2)isError=true;
        if(state.statmentType===2&&state.index<3)isError=true;
        if(state.statmentType===3&&state.index<6)isError=true;
        if(state.statmentType===4&&state.index<1)isError=true;
        if(state.statmentType===6&&state.index<1)isError=true;
        if(state.statmentType===7&&state.index<1)isError=true;

        state.statmentType=0;
        state.index=-1;

        return isError?"error":null;
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
      state.index++;

    
      if(word.match(types)){
        return "type";
      }


    if(word.slice(0,1)==="@"){

        let isError = true;

        if(state.statmentType===0&&state.index ===0)isError=false;
        if(state.statmentType===1&&state.index ===2)isError=false;
        if(state.statmentType===2&&state.index ===3)isError=false;
        if(state.statmentType===3&&state.index ===3)isError=false;
        if(state.statmentType===3&&state.index ===6)isError=false;
        if(state.statmentType===4&&state.index ===1)isError=false;
        return isError?"error":"variable-3";
      }

      if(word.toUpperCase()==="ROZKAZ"){
        if(state.statmentType===0&&state.index===0){
            state.statmentType=6;
            return "def";
        }else{
            return "error"
        }
      }

      if(word.toUpperCase()==="ARGUMENTY"){
        if(state.statmentType===0&&state.index===0){
            state.statmentType=7;
            return "def";
        }else{
            return "error"
        }
      }

      if(word.toUpperCase()==="JEZELI"){
        if(state.statmentType===0){
            state.statmentType=1;
            state.index=0;
            return "keyword";
        }else{
            return "error"
        }
      }

      if(word.toUpperCase()==="DALEJ"){
        if(state.statmentType===0){
            state.statmentType=4;
            state.index=0;
            return "keyword";
        }else{
            return "error"
        }
      }

      if(word.toUpperCase()==="KONIEC"){
        if(state.statmentType===0){
            state.statmentType=5;
            state.index=0;
            return "keyword";
        }else{
            return "error"
        }
      }


      if(word.toUpperCase()==="TO"){
        if(state.statmentType===1&&state.index===2){
            state.statmentType=3;
            return "keyword";
        }else{
            return "error"
        }
      }

      if(word.toUpperCase()==="GDY"){
        if(state.statmentType===3&&state.index===4){
            return "keyword";
        }else{
            return "error"
        }
      }

      if(word.toUpperCase()==="NIE"){
        if(state.statmentType===1&&state.index===1){
            state.statmentType=2;
            return "keyword";
        }else if(state.statmentType===3&&state.index===5){
            return "keyword";
        }else{
            return "error"
        }
      }


      
      
      
      if(state.statmentType===6&&state.index===1){
          return "type"
      }

      if(state.statmentType===7&&state.index===1){
        const parsed = parseInt(word);
        if(isNaN(parsed)|| parsed<0){
            return "error";
        }else{
            return "number";
        }
        
      }

      if(InstructionColorContext.signalDictionary.hasOwnProperty(word.toLowerCase()) ){
        if(state.statmentType===0){
            return "variable-2";
        }else{
            return "error"
        }
      }

      if(InstructionColorContext.flagsDictionary.hasOwnProperty(word.toUpperCase())){
            let isError = true;
            if(state.statmentType===1&&state.index===1)isError=false;
            if(state.statmentType===2&&state.index===2)isError=false;
            if(state.statmentType===3&&state.index===1)isError=false;


            return isError?"error":"property";
        }

      return "error";
    }
  };
});

/*
CodeMirror.defineMIME("text/x-z80", "z80");
CodeMirror.defineMIME("text/x-ez80", { name: "z80", ez80: true });
*/
});
}

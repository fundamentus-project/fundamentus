import{C as a}from"./index.b0c463e5.entry.js";import{s as k}from"./simple-8e6c7a47.js";function x(n,o){for(var e=0;e<o.length;e++){const t=o[e];if(typeof t!="string"&&!Array.isArray(t)){for(const r in t)if(r!=="default"&&!(r in n)){const s=Object.getOwnPropertyDescriptor(t,r);s&&Object.defineProperty(n,r,s.get?s:{enumerable:!0,get:()=>t[r]})}}}return Object.freeze(Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}))}var g={};(function(n,o){(function(e){e(a(),k)})(function(e){e.defineSimpleMode("factor",{start:[{regex:/#?!.*/,token:"comment"},{regex:/"""/,token:"string",next:"string3"},{regex:/(STRING:)(\s)/,token:["keyword",null],next:"string2"},{regex:/\S*?"/,token:"string",next:"string"},{regex:/(?:0x[\d,a-f]+)|(?:0o[0-7]+)|(?:0b[0,1]+)|(?:\-?\d+.?\d*)(?=\s)/,token:"number"},{regex:/((?:GENERIC)|\:?\:)(\s+)(\S+)(\s+)(\()/,token:["keyword",null,"def",null,"bracket"],next:"stack"},{regex:/(M\:)(\s+)(\S+)(\s+)(\S+)/,token:["keyword",null,"def",null,"tag"]},{regex:/USING\:/,token:"keyword",next:"vocabulary"},{regex:/(USE\:|IN\:)(\s+)(\S+)(?=\s|$)/,token:["keyword",null,"tag"]},{regex:/(\S+\:)(\s+)(\S+)(?=\s|$)/,token:["keyword",null,"def"]},{regex:/(?:;|\\|t|f|if|loop|while|until|do|PRIVATE>|<PRIVATE|\.|\S*\[|\]|\S*\{|\})(?=\s|$)/,token:"keyword"},{regex:/\S+[\)>\.\*\?]+(?=\s|$)/,token:"builtin"},{regex:/[\)><]+\S+(?=\s|$)/,token:"builtin"},{regex:/(?:[\+\-\=\/\*<>])(?=\s|$)/,token:"keyword"},{regex:/\S+/,token:"variable"},{regex:/\s+|./,token:null}],vocabulary:[{regex:/;/,token:"keyword",next:"start"},{regex:/\S+/,token:"tag"},{regex:/\s+|./,token:null}],string:[{regex:/(?:[^\\]|\\.)*?"/,token:"string",next:"start"},{regex:/.*/,token:"string"}],string2:[{regex:/^;/,token:"keyword",next:"start"},{regex:/.*/,token:"string"}],string3:[{regex:/(?:[^\\]|\\.)*?"""/,token:"string",next:"start"},{regex:/.*/,token:"string"}],stack:[{regex:/\)/,token:"bracket",next:"start"},{regex:/--/,token:"bracket"},{regex:/\S+/,token:"meta"},{regex:/\s+|./,token:null}],meta:{dontIndentStates:["start","vocabulary","string","string3","stack"],lineComment:"!"}}),e.defineMIME("text/x-factor","factor")})})();const f=x({__proto__:null,default:g},[g]);export{f};

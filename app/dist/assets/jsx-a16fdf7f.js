import{C as w,E as x}from"./index.b0c463e5.entry.js";import{a as S}from"./javascript-6ee0cbfd.js";function E(l,v){for(var r=0;r<v.length;r++){const o=v[r];if(typeof o!="string"&&!Array.isArray(o)){for(const u in o)if(u!=="default"&&!(u in l)){const i=Object.getOwnPropertyDescriptor(o,u);i&&Object.defineProperty(l,u,i.get?i:{enumerable:!0,get:()=>o[u]})}}}return Object.freeze(Object.defineProperty(l,Symbol.toStringTag,{value:"Module"}))}var m={};(function(l,v){(function(r){r(w(),x(),S)})(function(r){function o(i,c,s,a){this.state=i,this.mode=c,this.depth=s,this.prev=a}function u(i){return new o(r.copyState(i.mode,i.state),i.mode,i.depth,i.prev&&u(i.prev))}r.defineMode("jsx",function(i,c){var s=r.getMode(i,{name:"xml",allowMissing:!0,multilineTagIndentPastTag:!1,allowMissingTagName:!0}),a=r.getMode(i,c&&c.base||"javascript");function j(e){var n=e.tagName;e.tagName=null;var t=s.indent(e,"","");return e.tagName=n,t}function g(e,n){return n.context.mode==s?y(e,n,n.context):b(e,n,n.context)}function y(e,n,t){if(t.depth==2)return e.match(/^.*?\*\//)?t.depth=1:e.skipToEnd(),"comment";if(e.peek()=="{"){s.skipAttribute(t.state);var f=j(t.state),p=t.state.context;if(p&&e.match(/^[^>]*>\s*$/,!1)){for(;p.prev&&!p.startOfLine;)p=p.prev;p.startOfLine?f-=i.indentUnit:t.prev.state.lexical&&(f=t.prev.state.lexical.indented)}else t.depth==1&&(f+=i.indentUnit);return n.context=new o(r.startState(a,f),a,0,n.context),null}if(t.depth==1){if(e.peek()=="<")return s.skipAttribute(t.state),n.context=new o(r.startState(s,j(t.state)),s,0,n.context),null;if(e.match("//"))return e.skipToEnd(),"comment";if(e.match("/*"))return t.depth=2,g(e,n)}var h=s.token(e,t.state),d=e.current(),k;return/\btag\b/.test(h)?/>$/.test(d)?t.state.context?t.depth=0:n.context=n.context.prev:/^</.test(d)&&(t.depth=1):!h&&(k=d.indexOf("{"))>-1&&e.backUp(d.length-k),h}function b(e,n,t){if(e.peek()=="<"&&a.expressionAllowed(e,t.state))return n.context=new o(r.startState(s,a.indent(t.state,"","")),s,0,n.context),a.skipExpression(t.state),null;var f=a.token(e,t.state);if(!f&&t.depth!=null){var p=e.current();p=="{"?t.depth++:p=="}"&&--t.depth==0&&(n.context=n.context.prev)}return f}return{startState:function(){return{context:new o(r.startState(a),a)}},copyState:function(e){return{context:u(e.context)}},token:g,indent:function(e,n,t){return e.context.mode.indent(e.context.state,n,t)},innerMode:function(e){return e.context}}},"xml","javascript"),r.defineMIME("text/jsx","jsx"),r.defineMIME("text/typescript-jsx",{name:"jsx",base:{name:"javascript",typescript:!0}})})})();const N=E({__proto__:null,default:m},[m]);export{N as j};

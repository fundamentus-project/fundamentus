import{C as q,E as I}from"./index.b0c463e5.entry.js";import{a as P}from"./javascript-6ee0cbfd.js";import{a as F}from"./css-edb2a245.js";var M={},y;function V(){return y||(y=1,function(H,U){(function(i){i(q(),I(),P,F)})(function(i){var k={script:[["lang",/(javascript|babel)/i,"javascript"],["type",/^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i,"javascript"],["type",/./,"text/plain"],[null,null,"javascript"]],style:[["lang",/^css$/i,"css"],["type",/^(text\/)?(x-)?(stylesheet|css)$/i,"css"],["type",/./,"text/plain"],[null,null,"css"]]};function $(n,l,a){var c=n.current(),o=c.search(l);return o>-1?n.backUp(c.length-o):c.match(/<\/?$/)&&(n.backUp(c.length),n.match(l,!1)||n.match(c)),a}var d={};function b(n){var l=d[n];return l||(d[n]=new RegExp("\\s+"+n+`\\s*=\\s*('|")?([^'"]+)('|")?\\s*`))}function j(n,l){var a=n.match(b(l));return a?/^\s*(.*?)\s*$/.exec(a[2])[1]:""}function p(n,l){return new RegExp((l?"^":"")+"</\\s*"+n+"\\s*>","i")}function v(n,l){for(var a in n)for(var c=l[a]||(l[a]=[]),o=n[a],r=o.length-1;r>=0;r--)c.unshift(o[r])}function E(n,l){for(var a=0;a<n.length;a++){var c=n[a];if(!c[0]||c[1].test(j(l,c[0])))return c[2]}}i.defineMode("htmlmixed",function(n,l){var a=i.getMode(n,{name:"xml",htmlMode:!0,multilineTagIndentFactor:l.multilineTagIndentFactor,multilineTagIndentPastTag:l.multilineTagIndentPastTag,allowMissingTagName:l.allowMissingTagName}),c={},o=l&&l.tags,r=l&&l.scriptTypes;if(v(k,c),o&&v(o,c),r)for(var f=r.length-1;f>=0;f--)c.script.unshift(["type",r[f].matches,r[f].mode]);function S(t,e){var u=a.token(t,e.htmlState),x=/\btag\b/.test(u),h;if(x&&!/[<>\s\/]/.test(t.current())&&(h=e.htmlState.tagName&&e.htmlState.tagName.toLowerCase())&&c.hasOwnProperty(h))e.inTag=h+" ";else if(e.inTag&&x&&/>$/.test(t.current())){var g=/^([\S]+) (.*)/.exec(e.inTag);e.inTag=null;var w=t.current()==">"&&E(c[g[1]],g[2]),T=i.getMode(n,w),R=p(g[1],!0),N=p(g[1],!1);e.token=function(s,m){return s.match(R,!1)?(m.token=S,m.localState=m.localMode=null,null):$(s,N,m.localMode.token(s,m.localState))},e.localMode=T,e.localState=i.startState(T,a.indent(e.htmlState,"",""))}else e.inTag&&(e.inTag+=t.current(),t.eol()&&(e.inTag+=" "));return u}return{startState:function(){var t=i.startState(a);return{token:S,inTag:null,localMode:null,localState:null,htmlState:t}},copyState:function(t){var e;return t.localState&&(e=i.copyState(t.localMode,t.localState)),{token:t.token,inTag:t.inTag,localMode:t.localMode,localState:e,htmlState:i.copyState(a,t.htmlState)}},token:function(t,e){return e.token(t,e)},indent:function(t,e,u){return!t.localMode||/^\s*<\//.test(e)?a.indent(t.htmlState,e,u):t.localMode.indent?t.localMode.indent(t.localState,e,u):i.Pass},innerMode:function(t){return{state:t.localState||t.htmlState,mode:t.localMode||a}}}},"xml","javascript","css"),i.defineMIME("text/html","htmlmixed")})}()),M}export{V as r};

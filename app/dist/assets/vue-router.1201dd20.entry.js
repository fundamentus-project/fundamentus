import{j as H,c as L,u as X,s as ct,h as at,aX as ut,aW as lt,d as qe,P as ze,y as Ue,p as ae,r as ft,w as ht,l as dt}from"./runtime-core.esm-bundler-b81764e2.js";/*!
  * vue-router v4.1.6
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */const z=typeof window<"u";function Ke(e){return e.__esModule||e[Symbol.toStringTag]==="Module"}const S=Object.assign;function ue(e,t){const n={};for(const r in t){const o=t[r];n[r]=N(o)?o.map(e):e(o)}return n}const Y=()=>{},N=Array.isArray,pt=/\/$/,mt=e=>e.replace(pt,"");function le(e,t,n="/"){let r,o={},a="",p="";const h=t.indexOf("#");let c=t.indexOf("?");return h<c&&h>=0&&(c=-1),c>-1&&(r=t.slice(0,c),a=t.slice(c+1,h>-1?h:t.length),o=e(a)),h>-1&&(r=r||t.slice(0,h),p=t.slice(h,t.length)),r=Rt(r??t,n),{fullPath:r+(a&&"?")+a+p,path:r,query:o,hash:p}}function gt(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}function ke(e,t){return!t||!e.toLowerCase().startsWith(t.toLowerCase())?e:e.slice(t.length)||"/"}function vt(e,t,n){const r=t.matched.length-1,o=n.matched.length-1;return r>-1&&r===o&&U(t.matched[r],n.matched[o])&&Ve(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}function U(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function Ve(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const n in e)if(!yt(e[n],t[n]))return!1;return!0}function yt(e,t){return N(e)?be(e,t):N(t)?be(t,e):e===t}function be(e,t){return N(t)?e.length===t.length&&e.every((n,r)=>n===t[r]):e.length===1&&e[0]===t}function Rt(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),r=e.split("/");let o=n.length-1,a,p;for(a=0;a<r.length;a++)if(p=r[a],p!==".")if(p==="..")o>1&&o--;else break;return n.slice(0,o).join("/")+"/"+r.slice(a-(a===r.length?1:0)).join("/")}var K;(function(e){e.pop="pop",e.push="push"})(K||(K={}));var G;(function(e){e.back="back",e.forward="forward",e.unknown=""})(G||(G={}));const fe="";function De(e){if(!e)if(z){const t=document.querySelector("base");e=t&&t.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return e[0]!=="/"&&e[0]!=="#"&&(e="/"+e),mt(e)}const Et=/^[^#]+#/;function Qe(e,t){return e.replace(Et,"#")+t}function Pt(e,t){const n=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return{behavior:t.behavior,left:r.left-n.left-(t.left||0),top:r.top-n.top-(t.top||0)}}const ee=()=>({left:window.pageXOffset,top:window.pageYOffset});function wt(e){let t;if("el"in e){const n=e.el,r=typeof n=="string"&&n.startsWith("#"),o=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!o)return;t=Pt(o,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left!=null?t.left:window.pageXOffset,t.top!=null?t.top:window.pageYOffset)}function Ae(e,t){return(history.state?history.state.position-t:-1)+e}const de=new Map;function St(e,t){de.set(e,t)}function Ct(e){const t=de.get(e);return de.delete(e),t}let kt=()=>location.protocol+"//"+location.host;function Fe(e,t){const{pathname:n,search:r,hash:o}=t,a=e.indexOf("#");if(a>-1){let h=o.includes(e.slice(a))?e.slice(a).length:1,c=o.slice(h);return c[0]!=="/"&&(c="/"+c),ke(c,"")}return ke(n,e)+r+o}function bt(e,t,n,r){let o=[],a=[],p=null;const h=({state:f})=>{const g=Fe(e,location),R=n.value,b=t.value;let k=0;if(f){if(n.value=g,t.value=f,p&&p===R){p=null;return}k=b?f.position-b.position:0}else r(g);o.forEach(E=>{E(n.value,R,{delta:k,type:K.pop,direction:k?k>0?G.forward:G.back:G.unknown})})};function c(){p=n.value}function l(f){o.push(f);const g=()=>{const R=o.indexOf(f);R>-1&&o.splice(R,1)};return a.push(g),g}function s(){const{history:f}=window;f.state&&f.replaceState(S({},f.state,{scroll:ee()}),"")}function u(){for(const f of a)f();a=[],window.removeEventListener("popstate",h),window.removeEventListener("beforeunload",s)}return window.addEventListener("popstate",h),window.addEventListener("beforeunload",s),{pauseListeners:c,listen:l,destroy:u}}function Oe(e,t,n,r=!1,o=!1){return{back:e,current:t,forward:n,replaced:r,position:window.history.length,scroll:o?ee():null}}function At(e){const{history:t,location:n}=window,r={value:Fe(e,n)},o={value:t.state};o.value||a(r.value,{back:null,current:r.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0);function a(c,l,s){const u=e.indexOf("#"),f=u>-1?(n.host&&document.querySelector("base")?e:e.slice(u))+c:kt()+e+c;try{t[s?"replaceState":"pushState"](l,"",f),o.value=l}catch(g){console.error(g),n[s?"replace":"assign"](f)}}function p(c,l){const s=S({},t.state,Oe(o.value.back,c,o.value.forward,!0),l,{position:o.value.position});a(c,s,!0),r.value=c}function h(c,l){const s=S({},o.value,t.state,{forward:c,scroll:ee()});a(s.current,s,!0);const u=S({},Oe(r.value,c,null),{position:s.position+1},l);a(c,u,!1),r.value=c}return{location:r,state:o,push:h,replace:p}}function Ot(e){e=De(e);const t=At(e),n=bt(e,t.state,t.location,t.replace);function r(a,p=!0){p||n.pauseListeners(),history.go(a)}const o=S({location:"",base:e,go:r,createHref:Qe.bind(null,e)},t,n);return Object.defineProperty(o,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(o,"state",{enumerable:!0,get:()=>t.state.value}),o}function pn(e=""){let t=[],n=[fe],r=0;e=De(e);function o(h){r++,r===n.length||n.splice(r),n.push(h)}function a(h,c,{direction:l,delta:s}){const u={direction:l,delta:s,type:K.pop};for(const f of t)f(h,c,u)}const p={location:fe,state:{},base:e,createHref:Qe.bind(null,e),replace(h){n.splice(r--,1),o(h)},push(h,c){o(h)},listen(h){return t.push(h),()=>{const c=t.indexOf(h);c>-1&&t.splice(c,1)}},destroy(){t=[],n=[fe],r=0},go(h,c=!0){const l=this.location,s=h<0?G.back:G.forward;r=Math.max(0,Math.min(r+h,n.length-1)),c&&a(this.location,l,{direction:s,delta:h})}};return Object.defineProperty(p,"location",{enumerable:!0,get:()=>n[r]}),p}function mn(e){return e=location.host?e||location.pathname+location.search:"",e.includes("#")||(e+="#"),Ot(e)}function _t(e){return typeof e=="string"||e&&typeof e=="object"}function We(e){return typeof e=="string"||typeof e=="symbol"}const $={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},Xe=Symbol("");var _e;(function(e){e[e.aborted=4]="aborted",e[e.cancelled=8]="cancelled",e[e.duplicated=16]="duplicated"})(_e||(_e={}));function V(e,t){return S(new Error,{type:e,[Xe]:!0},t)}function j(e,t){return e instanceof Error&&Xe in e&&(t==null||!!(e.type&t))}const xe="[^/]+?",xt={sensitive:!1,strict:!1,start:!0,end:!0},Mt=/[.+*?^${}()[\]/\\]/g;function Lt(e,t){const n=S({},xt,t),r=[];let o=n.start?"^":"";const a=[];for(const l of e){const s=l.length?[]:[90];n.strict&&!l.length&&(o+="/");for(let u=0;u<l.length;u++){const f=l[u];let g=40+(n.sensitive?.25:0);if(f.type===0)u||(o+="/"),o+=f.value.replace(Mt,"\\$&"),g+=40;else if(f.type===1){const{value:R,repeatable:b,optional:k,regexp:E}=f;a.push({name:R,repeatable:b,optional:k});const w=E||xe;if(w!==xe){g+=10;try{new RegExp(`(${w})`)}catch(M){throw new Error(`Invalid custom RegExp for param "${R}" (${w}): `+M.message)}}let _=b?`((?:${w})(?:/(?:${w}))*)`:`(${w})`;u||(_=k&&l.length<2?`(?:/${_})`:"/"+_),k&&(_+="?"),o+=_,g+=20,k&&(g+=-8),b&&(g+=-20),w===".*"&&(g+=-50)}s.push(g)}r.push(s)}if(n.strict&&n.end){const l=r.length-1;r[l][r[l].length-1]+=.7000000000000001}n.strict||(o+="/?"),n.end?o+="$":n.strict&&(o+="(?:/|$)");const p=new RegExp(o,n.sensitive?"":"i");function h(l){const s=l.match(p),u={};if(!s)return null;for(let f=1;f<s.length;f++){const g=s[f]||"",R=a[f-1];u[R.name]=g&&R.repeatable?g.split("/"):g}return u}function c(l){let s="",u=!1;for(const f of e){(!u||!s.endsWith("/"))&&(s+="/"),u=!1;for(const g of f)if(g.type===0)s+=g.value;else if(g.type===1){const{value:R,repeatable:b,optional:k}=g,E=R in l?l[R]:"";if(N(E)&&!b)throw new Error(`Provided param "${R}" is an array but it is not repeatable (* or + modifiers)`);const w=N(E)?E.join("/"):E;if(!w)if(k)f.length<2&&(s.endsWith("/")?s=s.slice(0,-1):u=!0);else throw new Error(`Missing required param "${R}"`);s+=w}}return s||"/"}return{re:p,score:r,keys:a,parse:h,stringify:c}}function Nt(e,t){let n=0;for(;n<e.length&&n<t.length;){const r=t[n]-e[n];if(r)return r;n++}return e.length<t.length?e.length===1&&e[0]===40+40?-1:1:e.length>t.length?t.length===1&&t[0]===40+40?1:-1:0}function Tt(e,t){let n=0;const r=e.score,o=t.score;for(;n<r.length&&n<o.length;){const a=Nt(r[n],o[n]);if(a)return a;n++}if(Math.abs(o.length-r.length)===1){if(Me(r))return 1;if(Me(o))return-1}return o.length-r.length}function Me(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const jt={type:0,value:""},Ht=/[a-zA-Z0-9_]/;function $t(e){if(!e)return[[]];if(e==="/")return[[jt]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(g){throw new Error(`ERR (${n})/"${l}": ${g}`)}let n=0,r=n;const o=[];let a;function p(){a&&o.push(a),a=[]}let h=0,c,l="",s="";function u(){l&&(n===0?a.push({type:0,value:l}):n===1||n===2||n===3?(a.length>1&&(c==="*"||c==="+")&&t(`A repeatable param (${l}) must be alone in its segment. eg: '/:ids+.`),a.push({type:1,value:l,regexp:s,repeatable:c==="*"||c==="+",optional:c==="*"||c==="?"})):t("Invalid state to consume buffer"),l="")}function f(){l+=c}for(;h<e.length;){if(c=e[h++],c==="\\"&&n!==2){r=n,n=4;continue}switch(n){case 0:c==="/"?(l&&u(),p()):c===":"?(u(),n=1):f();break;case 4:f(),n=r;break;case 1:c==="("?n=2:Ht.test(c)?f():(u(),n=0,c!=="*"&&c!=="?"&&c!=="+"&&h--);break;case 2:c===")"?s[s.length-1]=="\\"?s=s.slice(0,-1)+c:n=3:s+=c;break;case 3:u(),n=0,c!=="*"&&c!=="?"&&c!=="+"&&h--,s="";break;default:t("Unknown state");break}}return n===2&&t(`Unfinished custom RegExp for param "${l}"`),u(),p(),o}function It(e,t,n){const r=Lt($t(e.path),n),o=S(r,{record:e,parent:t,children:[],alias:[]});return t&&!o.record.aliasOf==!t.record.aliasOf&&t.children.push(o),o}function Bt(e,t){const n=[],r=new Map;t=Te({strict:!1,end:!0,sensitive:!1},t);function o(s){return r.get(s)}function a(s,u,f){const g=!f,R=Gt(s);R.aliasOf=f&&f.record;const b=Te(t,s),k=[R];if("alias"in s){const _=typeof s.alias=="string"?[s.alias]:s.alias;for(const M of _)k.push(S({},R,{components:f?f.record.components:R.components,path:M,aliasOf:f?f.record:R}))}let E,w;for(const _ of k){const{path:M}=_;if(u&&M[0]!=="/"){const B=u.record.path,T=B[B.length-1]==="/"?"":"/";_.path=u.record.path+(M&&T+M)}if(E=It(_,u,b),f?f.alias.push(E):(w=w||E,w!==E&&w.alias.push(E),g&&s.name&&!Ne(E)&&p(s.name)),R.children){const B=R.children;for(let T=0;T<B.length;T++)a(B[T],E,f&&f.children[T])}f=f||E,(E.record.components&&Object.keys(E.record.components).length||E.record.name||E.record.redirect)&&c(E)}return w?()=>{p(w)}:Y}function p(s){if(We(s)){const u=r.get(s);u&&(r.delete(s),n.splice(n.indexOf(u),1),u.children.forEach(p),u.alias.forEach(p))}else{const u=n.indexOf(s);u>-1&&(n.splice(u,1),s.record.name&&r.delete(s.record.name),s.children.forEach(p),s.alias.forEach(p))}}function h(){return n}function c(s){let u=0;for(;u<n.length&&Tt(s,n[u])>=0&&(s.record.path!==n[u].record.path||!Ye(s,n[u]));)u++;n.splice(u,0,s),s.record.name&&!Ne(s)&&r.set(s.record.name,s)}function l(s,u){let f,g={},R,b;if("name"in s&&s.name){if(f=r.get(s.name),!f)throw V(1,{location:s});b=f.record.name,g=S(Le(u.params,f.keys.filter(w=>!w.optional).map(w=>w.name)),s.params&&Le(s.params,f.keys.map(w=>w.name))),R=f.stringify(g)}else if("path"in s)R=s.path,f=n.find(w=>w.re.test(R)),f&&(g=f.parse(R),b=f.record.name);else{if(f=u.name?r.get(u.name):n.find(w=>w.re.test(u.path)),!f)throw V(1,{location:s,currentLocation:u});b=f.record.name,g=S({},u.params,s.params),R=f.stringify(g)}const k=[];let E=f;for(;E;)k.unshift(E.record),E=E.parent;return{name:b,path:R,params:g,matched:k,meta:zt(k)}}return e.forEach(s=>a(s)),{addRoute:a,resolve:l,removeRoute:p,getRoutes:h,getRecordMatcher:o}}function Le(e,t){const n={};for(const r of t)r in e&&(n[r]=e[r]);return n}function Gt(e){return{path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:void 0,beforeEnter:e.beforeEnter,props:qt(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}}}function qt(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(const r in e.components)t[r]=typeof n=="boolean"?n:n[r];return t}function Ne(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function zt(e){return e.reduce((t,n)=>S(t,n.meta),{})}function Te(e,t){const n={};for(const r in e)n[r]=r in t?t[r]:e[r];return n}function Ye(e,t){return t.children.some(n=>n===e||Ye(e,n))}const Ze=/#/g,Ut=/&/g,Kt=/\//g,Vt=/=/g,Dt=/\?/g,Je=/\+/g,Qt=/%5B/g,Ft=/%5D/g,et=/%5E/g,Wt=/%60/g,tt=/%7B/g,Xt=/%7C/g,nt=/%7D/g,Yt=/%20/g;function ge(e){return encodeURI(""+e).replace(Xt,"|").replace(Qt,"[").replace(Ft,"]")}function Zt(e){return ge(e).replace(tt,"{").replace(nt,"}").replace(et,"^")}function pe(e){return ge(e).replace(Je,"%2B").replace(Yt,"+").replace(Ze,"%23").replace(Ut,"%26").replace(Wt,"`").replace(tt,"{").replace(nt,"}").replace(et,"^")}function Jt(e){return pe(e).replace(Vt,"%3D")}function en(e){return ge(e).replace(Ze,"%23").replace(Dt,"%3F")}function tn(e){return e==null?"":en(e).replace(Kt,"%2F")}function J(e){try{return decodeURIComponent(""+e)}catch{}return""+e}function nn(e){const t={};if(e===""||e==="?")return t;const r=(e[0]==="?"?e.slice(1):e).split("&");for(let o=0;o<r.length;++o){const a=r[o].replace(Je," "),p=a.indexOf("="),h=J(p<0?a:a.slice(0,p)),c=p<0?null:J(a.slice(p+1));if(h in t){let l=t[h];N(l)||(l=t[h]=[l]),l.push(c)}else t[h]=c}return t}function je(e){let t="";for(let n in e){const r=e[n];if(n=Jt(n),r==null){r!==void 0&&(t+=(t.length?"&":"")+n);continue}(N(r)?r.map(a=>a&&pe(a)):[r&&pe(r)]).forEach(a=>{a!==void 0&&(t+=(t.length?"&":"")+n,a!=null&&(t+="="+a))})}return t}function rn(e){const t={};for(const n in e){const r=e[n];r!==void 0&&(t[n]=N(r)?r.map(o=>o==null?null:""+o):r==null?r:""+r)}return t}const ve=Symbol(""),He=Symbol(""),te=Symbol(""),ye=Symbol(""),me=Symbol("");function W(){let e=[];function t(r){return e.push(r),()=>{const o=e.indexOf(r);o>-1&&e.splice(o,1)}}function n(){e=[]}return{add:t,list:()=>e,reset:n}}function rt(e,t,n){const r=()=>{e[t].delete(n)};at(r),ut(r),lt(()=>{e[t].add(n)}),e[t].add(n)}function gn(e){const t=H(ve,{}).value;t&&rt(t,"leaveGuards",e)}function vn(e){const t=H(ve,{}).value;t&&rt(t,"updateGuards",e)}function I(e,t,n,r,o){const a=r&&(r.enterCallbacks[o]=r.enterCallbacks[o]||[]);return()=>new Promise((p,h)=>{const c=u=>{u===!1?h(V(4,{from:n,to:t})):u instanceof Error?h(u):_t(u)?h(V(2,{from:t,to:u})):(a&&r.enterCallbacks[o]===a&&typeof u=="function"&&a.push(u),p())},l=e.call(r&&r.instances[o],t,n,c);let s=Promise.resolve(l);e.length<3&&(s=s.then(c)),s.catch(u=>h(u))})}function he(e,t,n,r){const o=[];for(const a of e)for(const p in a.components){let h=a.components[p];if(!(t!=="beforeRouteEnter"&&!a.instances[p]))if(on(h)){const l=(h.__vccOpts||h)[t];l&&o.push(I(l,n,r,a,p))}else{let c=h();o.push(()=>c.then(l=>{if(!l)return Promise.reject(new Error(`Couldn't resolve component "${p}" at "${a.path}"`));const s=Ke(l)?l.default:l;a.components[p]=s;const f=(s.__vccOpts||s)[t];return f&&I(f,n,r,a,p)()}))}}return o}function on(e){return typeof e=="object"||"displayName"in e||"props"in e||"__vccOpts"in e}function yn(e){return e.matched.every(t=>t.redirect)?Promise.reject(new Error("Cannot load a route that redirects.")):Promise.all(e.matched.map(t=>t.components&&Promise.all(Object.keys(t.components).reduce((n,r)=>{const o=t.components[r];return typeof o=="function"&&!("displayName"in o)&&n.push(o().then(a=>{if(!a)return Promise.reject(new Error(`Couldn't resolve component "${r}" at "${t.path}". Ensure you passed a function that returns a promise.`));const p=Ke(a)?a.default:a;t.components[r]=p})),n},[])))).then(()=>e)}function $e(e){const t=H(te),n=H(ye),r=L(()=>t.resolve(X(e.to))),o=L(()=>{const{matched:c}=r.value,{length:l}=c,s=c[l-1],u=n.matched;if(!s||!u.length)return-1;const f=u.findIndex(U.bind(null,s));if(f>-1)return f;const g=Ie(c[l-2]);return l>1&&Ie(s)===g&&u[u.length-1].path!==g?u.findIndex(U.bind(null,c[l-2])):f}),a=L(()=>o.value>-1&&un(n.params,r.value.params)),p=L(()=>o.value>-1&&o.value===n.matched.length-1&&Ve(n.params,r.value.params));function h(c={}){return an(c)?t[X(e.replace)?"replace":"push"](X(e.to)).catch(Y):Promise.resolve()}return{route:r,href:L(()=>r.value.href),isActive:a,isExactActive:p,navigate:h}}const sn=qe({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:$e,setup(e,{slots:t}){const n=ze($e(e)),{options:r}=H(te),o=L(()=>({[Be(e.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[Be(e.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const a=t.default&&t.default(n);return e.custom?a:Ue("a",{"aria-current":n.isExactActive?e.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:o.value},a)}}}),cn=sn;function an(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return e.preventDefault&&e.preventDefault(),!0}}function un(e,t){for(const n in t){const r=t[n],o=e[n];if(typeof r=="string"){if(r!==o)return!1}else if(!N(o)||o.length!==r.length||r.some((a,p)=>a!==o[p]))return!1}return!0}function Ie(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const Be=(e,t,n)=>e??t??n,ln=qe({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:t,slots:n}){const r=H(me),o=L(()=>e.route||r.value),a=H(He,0),p=L(()=>{let l=X(a);const{matched:s}=o.value;let u;for(;(u=s[l])&&!u.components;)l++;return l}),h=L(()=>o.value.matched[p.value]);ae(He,L(()=>p.value+1)),ae(ve,h),ae(me,o);const c=ft();return ht(()=>[c.value,h.value,e.name],([l,s,u],[f,g,R])=>{s&&(s.instances[u]=l,g&&g!==s&&l&&l===f&&(s.leaveGuards.size||(s.leaveGuards=g.leaveGuards),s.updateGuards.size||(s.updateGuards=g.updateGuards))),l&&s&&(!g||!U(s,g)||!f)&&(s.enterCallbacks[u]||[]).forEach(b=>b(l))},{flush:"post"}),()=>{const l=o.value,s=e.name,u=h.value,f=u&&u.components[s];if(!f)return Ge(n.default,{Component:f,route:l});const g=u.props[s],R=g?g===!0?l.params:typeof g=="function"?g(l):g:null,k=Ue(f,S({},R,t,{onVnodeUnmounted:E=>{E.component.isUnmounted&&(u.instances[s]=null)},ref:c}));return Ge(n.default,{Component:k,route:l})||k}}});function Ge(e,t){if(!e)return null;const n=e(t);return n.length===1?n[0]:n}const fn=ln;function Rn(e){const t=Bt(e.routes,e),n=e.parseQuery||nn,r=e.stringifyQuery||je,o=e.history,a=W(),p=W(),h=W(),c=ct($);let l=$;z&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const s=ue.bind(null,i=>""+i),u=ue.bind(null,tn),f=ue.bind(null,J);function g(i,m){let d,v;return We(i)?(d=t.getRecordMatcher(i),v=m):v=i,t.addRoute(v,d)}function R(i){const m=t.getRecordMatcher(i);m&&t.removeRoute(m)}function b(){return t.getRoutes().map(i=>i.record)}function k(i){return!!t.getRecordMatcher(i)}function E(i,m){if(m=S({},m||c.value),typeof i=="string"){const y=le(n,i,m.path),O=t.resolve({path:y.path},m),F=o.createHref(y.fullPath);return S(y,O,{params:f(O.params),hash:J(y.hash),redirectedFrom:void 0,href:F})}let d;if("path"in i)d=S({},i,{path:le(n,i.path,m.path).path});else{const y=S({},i.params);for(const O in y)y[O]==null&&delete y[O];d=S({},i,{params:u(i.params)}),m.params=u(m.params)}const v=t.resolve(d,m),C=i.hash||"";v.params=s(f(v.params));const A=gt(r,S({},i,{hash:Zt(C),path:v.path})),P=o.createHref(A);return S({fullPath:A,hash:C,query:r===je?rn(i.query):i.query||{}},v,{redirectedFrom:void 0,href:P})}function w(i){return typeof i=="string"?le(n,i,c.value.path):S({},i)}function _(i,m){if(l!==i)return V(8,{from:m,to:i})}function M(i){return D(i)}function B(i){return M(S(w(i),{replace:!0}))}function T(i){const m=i.matched[i.matched.length-1];if(m&&m.redirect){const{redirect:d}=m;let v=typeof d=="function"?d(i):d;return typeof v=="string"&&(v=v.includes("?")||v.includes("#")?v=w(v):{path:v},v.params={}),S({query:i.query,hash:i.hash,params:"path"in v?{}:i.params},v)}}function D(i,m){const d=l=E(i),v=c.value,C=i.state,A=i.force,P=i.replace===!0,y=T(d);if(y)return D(S(w(y),{state:typeof y=="object"?S({},C,y.state):C,force:A,replace:P}),m||d);const O=d;O.redirectedFrom=m;let F;return!A&&vt(r,v,d)&&(F=V(16,{to:O,from:v}),Se(v,v,!0,!1)),(F?Promise.resolve(F):Re(O,v)).catch(x=>j(x)?j(x,2)?x:oe(x):re(x,O,v)).then(x=>{if(x){if(j(x,2))return D(S({replace:P},w(x.to),{state:typeof x.to=="object"?S({},C,x.to.state):C,force:A}),m||O)}else x=Pe(O,v,!0,P,C);return Ee(O,v,x),x})}function ot(i,m){const d=_(i,m);return d?Promise.reject(d):Promise.resolve()}function Re(i,m){let d;const[v,C,A]=hn(i,m);d=he(v.reverse(),"beforeRouteLeave",i,m);for(const y of v)y.leaveGuards.forEach(O=>{d.push(I(O,i,m))});const P=ot.bind(null,i,m);return d.push(P),q(d).then(()=>{d=[];for(const y of a.list())d.push(I(y,i,m));return d.push(P),q(d)}).then(()=>{d=he(C,"beforeRouteUpdate",i,m);for(const y of C)y.updateGuards.forEach(O=>{d.push(I(O,i,m))});return d.push(P),q(d)}).then(()=>{d=[];for(const y of i.matched)if(y.beforeEnter&&!m.matched.includes(y))if(N(y.beforeEnter))for(const O of y.beforeEnter)d.push(I(O,i,m));else d.push(I(y.beforeEnter,i,m));return d.push(P),q(d)}).then(()=>(i.matched.forEach(y=>y.enterCallbacks={}),d=he(A,"beforeRouteEnter",i,m),d.push(P),q(d))).then(()=>{d=[];for(const y of p.list())d.push(I(y,i,m));return d.push(P),q(d)}).catch(y=>j(y,8)?y:Promise.reject(y))}function Ee(i,m,d){for(const v of h.list())v(i,m,d)}function Pe(i,m,d,v,C){const A=_(i,m);if(A)return A;const P=m===$,y=z?history.state:{};d&&(v||P?o.replace(i.fullPath,S({scroll:P&&y&&y.scroll},C)):o.push(i.fullPath,C)),c.value=i,Se(i,m,d,P),oe()}let Q;function st(){Q||(Q=o.listen((i,m,d)=>{if(!Ce.listening)return;const v=E(i),C=T(v);if(C){D(S(C,{replace:!0}),v).catch(Y);return}l=v;const A=c.value;z&&St(Ae(A.fullPath,d.delta),ee()),Re(v,A).catch(P=>j(P,12)?P:j(P,2)?(D(P.to,v).then(y=>{j(y,20)&&!d.delta&&d.type===K.pop&&o.go(-1,!1)}).catch(Y),Promise.reject()):(d.delta&&o.go(-d.delta,!1),re(P,v,A))).then(P=>{P=P||Pe(v,A,!1),P&&(d.delta&&!j(P,8)?o.go(-d.delta,!1):d.type===K.pop&&j(P,20)&&o.go(-1,!1)),Ee(v,A,P)}).catch(Y)}))}let ne=W(),we=W(),Z;function re(i,m,d){oe(i);const v=we.list();return v.length?v.forEach(C=>C(i,m,d)):console.error(i),Promise.reject(i)}function it(){return Z&&c.value!==$?Promise.resolve():new Promise((i,m)=>{ne.add([i,m])})}function oe(i){return Z||(Z=!i,st(),ne.list().forEach(([m,d])=>i?d(i):m()),ne.reset()),i}function Se(i,m,d,v){const{scrollBehavior:C}=e;if(!z||!C)return Promise.resolve();const A=!d&&Ct(Ae(i.fullPath,0))||(v||!d)&&history.state&&history.state.scroll||null;return dt().then(()=>C(i,m,A)).then(P=>P&&wt(P)).catch(P=>re(P,i,m))}const se=i=>o.go(i);let ie;const ce=new Set,Ce={currentRoute:c,listening:!0,addRoute:g,removeRoute:R,hasRoute:k,getRoutes:b,resolve:E,options:e,push:M,replace:B,go:se,back:()=>se(-1),forward:()=>se(1),beforeEach:a.add,beforeResolve:p.add,afterEach:h.add,onError:we.add,isReady:it,install(i){const m=this;i.component("RouterLink",cn),i.component("RouterView",fn),i.config.globalProperties.$router=m,Object.defineProperty(i.config.globalProperties,"$route",{enumerable:!0,get:()=>X(c)}),z&&!ie&&c.value===$&&(ie=!0,M(o.location).catch(C=>{}));const d={};for(const C in $)d[C]=L(()=>c.value[C]);i.provide(te,m),i.provide(ye,ze(d)),i.provide(me,c);const v=i.unmount;ce.add(i),i.unmount=function(){ce.delete(i),ce.size<1&&(l=$,Q&&Q(),Q=null,c.value=$,ie=!1,Z=!1),v()}}};return Ce}function q(e){return e.reduce((t,n)=>t.then(()=>n()),Promise.resolve())}function hn(e,t){const n=[],r=[],o=[],a=Math.max(t.matched.length,e.matched.length);for(let p=0;p<a;p++){const h=t.matched[p];h&&(e.matched.find(l=>U(l,h))?r.push(h):n.push(h));const c=e.matched[p];c&&(t.matched.find(l=>U(l,c))||o.push(c))}return[n,r,o]}function En(){return H(te)}function Pn(){return H(ye)}export{_e as NavigationFailureType,cn as RouterLink,fn as RouterView,$ as START_LOCATION,pn as createMemoryHistory,Rn as createRouter,Bt as createRouterMatcher,mn as createWebHashHistory,Ot as createWebHistory,j as isNavigationFailure,yn as loadRouteLocation,ve as matchedRouteKey,gn as onBeforeRouteLeave,vn as onBeforeRouteUpdate,nn as parseQuery,ye as routeLocationKey,te as routerKey,me as routerViewLocationKey,je as stringifyQuery,$e as useLink,Pn as useRoute,En as useRouter,He as viewDepthKey};

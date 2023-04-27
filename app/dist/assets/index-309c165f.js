import{B as W}from"./index.b0c463e5.entry.js";import{b as N,a as O,c as E,d as k}from"./index-c3455229.js";function J(t,e){for(var n=0;n<e.length;n++){const i=e[n];if(typeof i!="string"&&!Array.isArray(i)){for(const o in i)if(o!=="default"&&!(o in t)){const s=Object.getOwnPropertyDescriptor(i,o);s&&Object.defineProperty(t,o,s.get?s:{enumerable:!0,get:()=>i[o]})}}}return Object.freeze(Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}))}var p={},C={get exports(){return p},set exports(t){p=t}},w={},F={get exports(){return w},set exports(t){w=t}};(function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={lessThanXSeconds:{standalone:{one:"manner wéi eng Sekonn",other:"manner wéi {{count}} Sekonnen"},withPreposition:{one:"manner wéi enger Sekonn",other:"manner wéi {{count}} Sekonnen"}},xSeconds:{standalone:{one:"eng Sekonn",other:"{{count}} Sekonnen"},withPreposition:{one:"enger Sekonn",other:"{{count}} Sekonnen"}},halfAMinute:{standalone:"eng hallef Minutt",withPreposition:"enger hallwer Minutt"},lessThanXMinutes:{standalone:{one:"manner wéi eng Minutt",other:"manner wéi {{count}} Minutten"},withPreposition:{one:"manner wéi enger Minutt",other:"manner wéi {{count}} Minutten"}},xMinutes:{standalone:{one:"eng Minutt",other:"{{count}} Minutten"},withPreposition:{one:"enger Minutt",other:"{{count}} Minutten"}},aboutXHours:{standalone:{one:"ongeféier eng Stonn",other:"ongeféier {{count}} Stonnen"},withPreposition:{one:"ongeféier enger Stonn",other:"ongeféier {{count}} Stonnen"}},xHours:{standalone:{one:"eng Stonn",other:"{{count}} Stonnen"},withPreposition:{one:"enger Stonn",other:"{{count}} Stonnen"}},xDays:{standalone:{one:"een Dag",other:"{{count}} Deeg"},withPreposition:{one:"engem Dag",other:"{{count}} Deeg"}},aboutXWeeks:{standalone:{one:"ongeféier eng Woch",other:"ongeféier {{count}} Wochen"},withPreposition:{one:"ongeféier enger Woche",other:"ongeféier {{count}} Wochen"}},xWeeks:{standalone:{one:"eng Woch",other:"{{count}} Wochen"},withPreposition:{one:"enger Woch",other:"{{count}} Wochen"}},aboutXMonths:{standalone:{one:"ongeféier ee Mount",other:"ongeféier {{count}} Méint"},withPreposition:{one:"ongeféier engem Mount",other:"ongeféier {{count}} Méint"}},xMonths:{standalone:{one:"ee Mount",other:"{{count}} Méint"},withPreposition:{one:"engem Mount",other:"{{count}} Méint"}},aboutXYears:{standalone:{one:"ongeféier ee Joer",other:"ongeféier {{count}} Joer"},withPreposition:{one:"ongeféier engem Joer",other:"ongeféier {{count}} Joer"}},xYears:{standalone:{one:"ee Joer",other:"{{count}} Joer"},withPreposition:{one:"engem Joer",other:"{{count}} Joer"}},overXYears:{standalone:{one:"méi wéi ee Joer",other:"méi wéi {{count}} Joer"},withPreposition:{one:"méi wéi engem Joer",other:"méi wéi {{count}} Joer"}},almostXYears:{standalone:{one:"bal ee Joer",other:"bal {{count}} Joer"},withPreposition:{one:"bal engem Joer",other:"bal {{count}} Joer"}}},i=["d","h","n","t","z"],o=["a,","e","i","o","u"],s=[0,1,2,3,8,9],m=[40,50,60,70];function a(u){var c=u.charAt(0).toLowerCase();if(o.indexOf(c)!=-1||i.indexOf(c)!=-1)return!0;var h=u.split(" ")[0],r=parseInt(h);return!isNaN(r)&&s.indexOf(r%10)!=-1&&m.indexOf(parseInt(h.substring(0,2)))==-1}var d=function(c,h,r){var l,M=n[c],v=r!=null&&r.addSuffix?M.withPreposition:M.standalone;return typeof v=="string"?l=v:h===1?l=v.one:l=v.other.replace("{{count}}",String(h)),r!=null&&r.addSuffix?r.comparison&&r.comparison>0?"a"+(a(l)?"n":"")+" "+l:"viru"+(a(l)?"n":"")+" "+l:l},f=d;e.default=f,t.exports=e.default})(F,w);var b={},z={get exports(){return b},set exports(t){b=t}};(function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i(N);function i(f){return f&&f.__esModule?f:{default:f}}var o={full:"EEEE, do MMMM y",long:"do MMMM y",medium:"do MMM y",short:"dd.MM.yy"},s={full:"HH:mm:ss zzzz",long:"HH:mm:ss z",medium:"HH:mm:ss",short:"HH:mm"},m={full:"{{date}} 'um' {{time}}",long:"{{date}} 'um' {{time}}",medium:"{{date}} {{time}}",short:"{{date}} {{time}}"},a={date:(0,n.default)({formats:o,defaultWidth:"full"}),time:(0,n.default)({formats:s,defaultWidth:"full"}),dateTime:(0,n.default)({formats:m,defaultWidth:"full"})},d=a;e.default=d,t.exports=e.default})(z,b);var P={},j={get exports(){return P},set exports(t){P=t}};(function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={lastWeek:function(m){var a=m.getUTCDay(),d="'läschte";return(a===2||a===4)&&(d+="n"),d+="' eeee 'um' p",d},yesterday:"'gëschter um' p",today:"'haut um' p",tomorrow:"'moien um' p",nextWeek:"eeee 'um' p",other:"P"},i=function(m,a,d,f){var u=n[m];return typeof u=="function"?u(a):u},o=i;e.default=o,t.exports=e.default})(j,P);var _={},T={get exports(){return _},set exports(t){_=t}};(function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i(O);function i(r){return r&&r.__esModule?r:{default:r}}var o={narrow:["v.Chr.","n.Chr."],abbreviated:["v.Chr.","n.Chr."],wide:["viru Christus","no Christus"]},s={narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1. Quartal","2. Quartal","3. Quartal","4. Quartal"]},m={narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mäe","Abr","Mee","Jun","Jul","Aug","Sep","Okt","Nov","Dez"],wide:["Januar","Februar","Mäerz","Abrëll","Mee","Juni","Juli","August","September","Oktober","November","Dezember"]},a={narrow:["S","M","D","M","D","F","S"],short:["So","Mé","Dë","Më","Do","Fr","Sa"],abbreviated:["So.","Mé.","Dë.","Më.","Do.","Fr.","Sa."],wide:["Sonndeg","Méindeg","Dënschdeg","Mëttwoch","Donneschdeg","Freideg","Samschdeg"]},d={narrow:{am:"mo.",pm:"nomë.",midnight:"Mëtternuecht",noon:"Mëtteg",morning:"Moien",afternoon:"Nomëtteg",evening:"Owend",night:"Nuecht"},abbreviated:{am:"moies",pm:"nomëttes",midnight:"Mëtternuecht",noon:"Mëtteg",morning:"Moien",afternoon:"Nomëtteg",evening:"Owend",night:"Nuecht"},wide:{am:"moies",pm:"nomëttes",midnight:"Mëtternuecht",noon:"Mëtteg",morning:"Moien",afternoon:"Nomëtteg",evening:"Owend",night:"Nuecht"}},f={narrow:{am:"mo.",pm:"nom.",midnight:"Mëtternuecht",noon:"mëttes",morning:"moies",afternoon:"nomëttes",evening:"owes",night:"nuets"},abbreviated:{am:"moies",pm:"nomëttes",midnight:"Mëtternuecht",noon:"mëttes",morning:"moies",afternoon:"nomëttes",evening:"owes",night:"nuets"},wide:{am:"moies",pm:"nomëttes",midnight:"Mëtternuecht",noon:"mëttes",morning:"moies",afternoon:"nomëttes",evening:"owes",night:"nuets"}},u=function(l,M){var v=Number(l);return v+"."},c={ordinalNumber:u,era:(0,n.default)({values:o,defaultWidth:"wide"}),quarter:(0,n.default)({values:s,defaultWidth:"wide",argumentCallback:function(l){return l-1}}),month:(0,n.default)({values:m,defaultWidth:"wide"}),day:(0,n.default)({values:a,defaultWidth:"wide"}),dayPeriod:(0,n.default)({values:d,defaultWidth:"wide",formattingValues:f,defaultFormattingWidth:"wide"})},h=c;e.default=h,t.exports=e.default})(T,_);var y={},A={get exports(){return y},set exports(t){y=t}};(function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=o(E),i=o(k);function o(g){return g&&g.__esModule?g:{default:g}}var s=/^(\d+)(\.)?/i,m=/\d+/i,a={narrow:/^(v\.? ?Chr\.?|n\.? ?Chr\.?)/i,abbreviated:/^(v\.? ?Chr\.?|n\.? ?Chr\.?)/i,wide:/^(viru Christus|virun eiser Zäitrechnung|no Christus|eiser Zäitrechnung)/i},d={any:[/^v/i,/^n/i]},f={narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](\.)? Quartal/i},u={any:[/1/i,/2/i,/3/i,/4/i]},c={narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mäe|abr|mee|jun|jul|aug|sep|okt|nov|dez)/i,wide:/^(januar|februar|mäerz|abrëll|mee|juni|juli|august|september|oktober|november|dezember)/i},h={narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mä/i,/^ab/i,/^me/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},r={narrow:/^[smdf]/i,short:/^(so|mé|dë|më|do|fr|sa)/i,abbreviated:/^(son?|méi?|dën?|mët?|don?|fre?|sam?)\.?/i,wide:/^(sonndeg|méindeg|dënschdeg|mëttwoch|donneschdeg|freideg|samschdeg)/i},l={any:[/^so/i,/^mé/i,/^dë/i,/^më/i,/^do/i,/^f/i,/^sa/i]},M={narrow:/^(mo\.?|nomë\.?|Mëtternuecht|mëttes|moies|nomëttes|owes|nuets)/i,abbreviated:/^(moi\.?|nomët\.?|Mëtternuecht|mëttes|moies|nomëttes|owes|nuets)/i,wide:/^(moies|nomëttes|Mëtternuecht|mëttes|moies|nomëttes|owes|nuets)/i},v={any:{am:/^m/i,pm:/^n/i,midnight:/^Mëtter/i,noon:/^mëttes/i,morning:/moies/i,afternoon:/nomëttes/i,evening:/owes/i,night:/nuets/i}},D={ordinalNumber:(0,i.default)({matchPattern:s,parsePattern:m,valueCallback:function(S){return parseInt(S,10)}}),era:(0,n.default)({matchPatterns:a,defaultMatchWidth:"wide",parsePatterns:d,defaultParseWidth:"any"}),quarter:(0,n.default)({matchPatterns:f,defaultMatchWidth:"wide",parsePatterns:u,defaultParseWidth:"any",valueCallback:function(S){return S+1}}),month:(0,n.default)({matchPatterns:c,defaultMatchWidth:"wide",parsePatterns:h,defaultParseWidth:"any"}),day:(0,n.default)({matchPatterns:r,defaultMatchWidth:"wide",parsePatterns:l,defaultParseWidth:"any"}),dayPeriod:(0,n.default)({matchPatterns:M,defaultMatchWidth:"wide",parsePatterns:v,defaultParseWidth:"any"})},x=D;e.default=x,t.exports=e.default})(A,y);(function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a(w),i=a(b),o=a(P),s=a(_),m=a(y);function a(u){return u&&u.__esModule?u:{default:u}}var d={code:"lb",formatDistance:n.default,formatLong:i.default,formatRelative:o.default,localize:s.default,match:m.default,options:{weekStartsOn:1,firstWeekContainsDate:4}},f=d;e.default=f,t.exports=e.default})(C,p);const L=W(p),H=J({__proto__:null,default:L},[p]);export{H as i};

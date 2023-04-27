import{B as E}from"./index.b0c463e5.entry.js";import{b as k,a as O,c as z,d as C}from"./index-c3455229.js";function T(a,e){for(var t=0;t<e.length;t++){const n=e[t];if(typeof n!="string"&&!Array.isArray(n)){for(const r in n)if(r!=="default"&&!(r in a)){const u=Object.getOwnPropertyDescriptor(n,r);u&&Object.defineProperty(a,r,u.get?u:{enumerable:!0,get:()=>n[r]})}}}return Object.freeze(Object.defineProperty(a,Symbol.toStringTag,{value:"Module"}))}var c={},H={get exports(){return c},set exports(a){c=a}},h={},R={get exports(){return h},set exports(a){h=a}};(function(a,e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t={lessThanXSeconds:{one:"menos dun segundo",other:"menos de {{count}} segundos"},xSeconds:{one:"1 segundo",other:"{{count}} segundos"},halfAMinute:"medio minuto",lessThanXMinutes:{one:"menos dun minuto",other:"menos de {{count}} minutos"},xMinutes:{one:"1 minuto",other:"{{count}} minutos"},aboutXHours:{one:"arredor dunha hora",other:"arredor de {{count}} horas"},xHours:{one:"1 hora",other:"{{count}} horas"},xDays:{one:"1 día",other:"{{count}} días"},aboutXWeeks:{one:"arredor dunha semana",other:"arredor de {{count}} semanas"},xWeeks:{one:"1 semana",other:"{{count}} semanas"},aboutXMonths:{one:"arredor de 1 mes",other:"arredor de {{count}} meses"},xMonths:{one:"1 mes",other:"{{count}} meses"},aboutXYears:{one:"arredor dun ano",other:"arredor de {{count}} anos"},xYears:{one:"1 ano",other:"{{count}} anos"},overXYears:{one:"máis dun ano",other:"máis de {{count}} anos"},almostXYears:{one:"case un ano",other:"case {{count}} anos"}},n=function(m,i,d){var o,s=t[m];return typeof s=="string"?o=s:i===1?o=s.one:o=s.other.replace("{{count}}",String(i)),d!=null&&d.addSuffix?d.comparison&&d.comparison>0?"en "+o:"hai "+o:o},r=n;e.default=r,a.exports=e.default})(R,h);var p={},F={get exports(){return p},set exports(a){p=a}};(function(a,e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t=n(k);function n(o){return o&&o.__esModule?o:{default:o}}var r={full:"EEEE, d 'de' MMMM y",long:"d 'de' MMMM y",medium:"d MMM y",short:"dd/MM/y"},u={full:"HH:mm:ss zzzz",long:"HH:mm:ss z",medium:"HH:mm:ss",short:"HH:mm"},m={full:"{{date}} 'ás' {{time}}",long:"{{date}} 'ás' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},i={date:(0,t.default)({formats:r,defaultWidth:"full"}),time:(0,t.default)({formats:u,defaultWidth:"full"}),dateTime:(0,t.default)({formats:m,defaultWidth:"full"})},d=i;e.default=d,a.exports=e.default})(F,p);var g={},L={get exports(){return g},set exports(a){g=a}};(function(a,e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t={lastWeek:"'o' eeee 'pasado á' LT",yesterday:"'onte á' p",today:"'hoxe á' p",tomorrow:"'mañá á' p",nextWeek:"eeee 'á' p",other:"P"},n={lastWeek:"'o' eeee 'pasado ás' p",yesterday:"'onte ás' p",today:"'hoxe ás' p",tomorrow:"'mañá ás' p",nextWeek:"eeee 'ás' p",other:"P"},r=function(i,d,o,s){return d.getUTCHours()!==1?n[i]:t[i]},u=r;e.default=u,a.exports=e.default})(L,g);var b={},N={get exports(){return b},set exports(a){b=a}};(function(a,e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t=n(O);function n(l){return l&&l.__esModule?l:{default:l}}var r={narrow:["AC","DC"],abbreviated:["AC","DC"],wide:["antes de cristo","despois de cristo"]},u={narrow:["1","2","3","4"],abbreviated:["T1","T2","T3","T4"],wide:["1º trimestre","2º trimestre","3º trimestre","4º trimestre"]},m={narrow:["e","f","m","a","m","j","j","a","s","o","n","d"],abbreviated:["xan","feb","mar","abr","mai","xun","xul","ago","set","out","nov","dec"],wide:["xaneiro","febreiro","marzo","abril","maio","xuño","xullo","agosto","setembro","outubro","novembro","decembro"]},i={narrow:["d","l","m","m","j","v","s"],short:["do","lu","ma","me","xo","ve","sa"],abbreviated:["dom","lun","mar","mer","xov","ven","sab"],wide:["domingo","luns","martes","mércores","xoves","venres","sábado"]},d={narrow:{am:"a",pm:"p",midnight:"mn",noon:"md",morning:"mañá",afternoon:"tarde",evening:"tarde",night:"noite"},abbreviated:{am:"AM",pm:"PM",midnight:"medianoite",noon:"mediodía",morning:"mañá",afternoon:"tarde",evening:"tardiña",night:"noite"},wide:{am:"a.m.",pm:"p.m.",midnight:"medianoite",noon:"mediodía",morning:"mañá",afternoon:"tarde",evening:"tardiña",night:"noite"}},o={narrow:{am:"a",pm:"p",midnight:"mn",noon:"md",morning:"da mañá",afternoon:"da tarde",evening:"da tardiña",night:"da noite"},abbreviated:{am:"AM",pm:"PM",midnight:"medianoite",noon:"mediodía",morning:"da mañá",afternoon:"da tarde",evening:"da tardiña",night:"da noite"},wide:{am:"a.m.",pm:"p.m.",midnight:"medianoite",noon:"mediodía",morning:"da mañá",afternoon:"da tarde",evening:"da tardiña",night:"da noite"}},s=function(v,w){var _=Number(v);return _+"º"},P={ordinalNumber:s,era:(0,t.default)({values:r,defaultWidth:"wide"}),quarter:(0,t.default)({values:u,defaultWidth:"wide",argumentCallback:function(v){return v-1}}),month:(0,t.default)({values:m,defaultWidth:"wide"}),day:(0,t.default)({values:i,defaultWidth:"wide"}),dayPeriod:(0,t.default)({values:d,defaultWidth:"wide",formattingValues:o,defaultFormattingWidth:"wide"})},y=P;e.default=y,a.exports=e.default})(N,b);var x={},V={get exports(){return x},set exports(a){x=a}};(function(a,e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t=r(z),n=r(C);function r(f){return f&&f.__esModule?f:{default:f}}var u=/^(\d+)(º)?/i,m=/\d+/i,i={narrow:/^(ac|dc|a|d)/i,abbreviated:/^(a\.?\s?c\.?|a\.?\s?e\.?\s?c\.?|d\.?\s?c\.?|e\.?\s?c\.?)/i,wide:/^(antes de cristo|antes da era com[uú]n|despois de cristo|era com[uú]n)/i},d={any:[/^ac/i,/^dc/i],wide:[/^(antes de cristo|antes da era com[uú]n)/i,/^(despois de cristo|era com[uú]n)/i]},o={narrow:/^[1234]/i,abbreviated:/^T[1234]/i,wide:/^[1234](º)? trimestre/i},s={any:[/1/i,/2/i,/3/i,/4/i]},P={narrow:/^[xfmasond]/i,abbreviated:/^(xan|feb|mar|abr|mai|xun|xul|ago|set|out|nov|dec)/i,wide:/^(xaneiro|febreiro|marzo|abril|maio|xuño|xullo|agosto|setembro|outubro|novembro|decembro)/i},y={narrow:[/^x/i,/^f/i,/^m/i,/^a/i,/^m/i,/^x/i,/^x/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^xan/i,/^feb/i,/^mar/i,/^abr/i,/^mai/i,/^xun/i,/^xul/i,/^ago/i,/^set/i,/^out/i,/^nov/i,/^dec/i]},l={narrow:/^[dlmxvs]/i,short:/^(do|lu|ma|me|xo|ve|sa)/i,abbreviated:/^(dom|lun|mar|mer|xov|ven|sab)/i,wide:/^(domingo|luns|martes|m[eé]rcores|xoves|venres|s[áa]bado)/i},v={narrow:[/^d/i,/^l/i,/^m/i,/^m/i,/^x/i,/^v/i,/^s/i],any:[/^do/i,/^lu/i,/^ma/i,/^me/i,/^xo/i,/^ve/i,/^sa/i]},w={narrow:/^(a|p|mn|md|(da|[aá]s) (mañ[aá]|tarde|noite))/i,any:/^([ap]\.?\s?m\.?|medianoite|mediod[ií]a|(da|[aá]s) (mañ[aá]|tarde|noite))/i},_={any:{am:/^a/i,pm:/^p/i,midnight:/^mn/i,noon:/^md/i,morning:/mañ[aá]/i,afternoon:/tarde/i,evening:/tardiña/i,night:/noite/i}},W={ordinalNumber:(0,n.default)({matchPattern:u,parsePattern:m,valueCallback:function(M){return parseInt(M,10)}}),era:(0,t.default)({matchPatterns:i,defaultMatchWidth:"wide",parsePatterns:d,defaultParseWidth:"any"}),quarter:(0,t.default)({matchPatterns:o,defaultMatchWidth:"wide",parsePatterns:s,defaultParseWidth:"any",valueCallback:function(M){return M+1}}),month:(0,t.default)({matchPatterns:P,defaultMatchWidth:"wide",parsePatterns:y,defaultParseWidth:"any"}),day:(0,t.default)({matchPatterns:l,defaultMatchWidth:"wide",parsePatterns:v,defaultParseWidth:"any"}),dayPeriod:(0,t.default)({matchPatterns:w,defaultMatchWidth:"any",parsePatterns:_,defaultParseWidth:"any"})},D=W;e.default=D,a.exports=e.default})(V,x);(function(a,e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t=i(h),n=i(p),r=i(g),u=i(b),m=i(x);function i(s){return s&&s.__esModule?s:{default:s}}var d={code:"gl",formatDistance:t.default,formatLong:n.default,formatRelative:r.default,localize:u.default,match:m.default,options:{weekStartsOn:1,firstWeekContainsDate:1}},o=d;e.default=o,a.exports=e.default})(H,c);const X=E(c),S=T({__proto__:null,default:X},[c]);export{S as i};

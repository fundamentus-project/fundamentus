import{B as z}from"./index.b0c463e5.entry.js";import{b as W,a as D,c as E,d as C}from"./index-c3455229.js";function O(a,e){for(var t=0;t<e.length;t++){const d=e[t];if(typeof d!="string"&&!Array.isArray(d)){for(const r in d)if(r!=="default"&&!(r in a)){const u=Object.getOwnPropertyDescriptor(d,r);u&&Object.defineProperty(a,r,u.get?u:{enumerable:!0,get:()=>d[r]})}}}return Object.freeze(Object.defineProperty(a,Symbol.toStringTag,{value:"Module"}))}var c={},F={get exports(){return c},set exports(a){c=a}},h={},H={get exports(){return h},set exports(a){h=a}};(function(a,e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t={lessThanXSeconds:{one:"minder dan een seconde",other:"minder dan {{count}} seconden"},xSeconds:{one:"1 seconde",other:"{{count}} seconden"},halfAMinute:"een halve minuut",lessThanXMinutes:{one:"minder dan een minuut",other:"minder dan {{count}} minuten"},xMinutes:{one:"een minuut",other:"{{count}} minuten"},aboutXHours:{one:"ongeveer 1 uur",other:"ongeveer {{count}} uur"},xHours:{one:"1 uur",other:"{{count}} uur"},xDays:{one:"1 dag",other:"{{count}} dagen"},aboutXWeeks:{one:"ongeveer 1 week",other:"ongeveer {{count}} weken"},xWeeks:{one:"1 week",other:"{{count}} weken"},aboutXMonths:{one:"ongeveer 1 maand",other:"ongeveer {{count}} maanden"},xMonths:{one:"1 maand",other:"{{count}} maanden"},aboutXYears:{one:"ongeveer 1 jaar",other:"ongeveer {{count}} jaar"},xYears:{one:"1 jaar",other:"{{count}} jaar"},overXYears:{one:"meer dan 1 jaar",other:"meer dan {{count}} jaar"},almostXYears:{one:"bijna 1 jaar",other:"bijna {{count}} jaar"}},d=function(l,i,o){var n,s=t[l];return typeof s=="string"?n=s:i===1?n=s.one:n=s.other.replace("{{count}}",String(i)),o!=null&&o.addSuffix?o.comparison&&o.comparison>0?"over "+n:n+" geleden":n},r=d;e.default=r,a.exports=e.default})(H,h);var g={},R={get exports(){return g},set exports(a){g=a}};(function(a,e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t=d(W);function d(n){return n&&n.__esModule?n:{default:n}}var r={full:"EEEE d MMMM y",long:"d MMMM y",medium:"d MMM y",short:"dd.MM.y"},u={full:"HH:mm:ss zzzz",long:"HH:mm:ss z",medium:"HH:mm:ss",short:"HH:mm"},l={full:"{{date}} 'om' {{time}}",long:"{{date}} 'om' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},i={date:(0,t.default)({formats:r,defaultWidth:"full"}),time:(0,t.default)({formats:u,defaultWidth:"full"}),dateTime:(0,t.default)({formats:l,defaultWidth:"full"})},o=i;e.default=o,a.exports=e.default})(R,g);var p={},N={get exports(){return p},set exports(a){p=a}};(function(a,e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t={lastWeek:"'vorige' eeee 'om' p",yesterday:"'gisteren om' p",today:"'vandaag om' p",tomorrow:"'morgen om' p",nextWeek:"eeee 'om' p",other:"P"},d=function(l,i,o,n){return t[l]},r=d;e.default=r,a.exports=e.default})(N,p);var b={},A={get exports(){return b},set exports(a){b=a}};(function(a,e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t=d(D);function d(m){return m&&m.__esModule?m:{default:m}}var r={narrow:["v.C.","n.C."],abbreviated:["v.Chr.","n.Chr."],wide:["voor Christus","na Christus"]},u={narrow:["1","2","3","4"],abbreviated:["K1","K2","K3","K4"],wide:["1e kwartaal","2e kwartaal","3e kwartaal","4e kwartaal"]},l={narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["jan.","feb.","mrt.","apr.","mei","jun.","jul.","aug.","sep.","okt.","nov.","dec."],wide:["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"]},i={narrow:["Z","M","D","W","D","V","Z"],short:["zo","ma","di","wo","do","vr","za"],abbreviated:["zon","maa","din","woe","don","vri","zat"],wide:["zondag","maandag","dinsdag","woensdag","donderdag","vrijdag","zaterdag"]},o={narrow:{am:"AM",pm:"PM",midnight:"middernacht",noon:"het middag",morning:"'s ochtends",afternoon:"'s namiddags",evening:"'s avonds",night:"'s nachts"},abbreviated:{am:"AM",pm:"PM",midnight:"middernacht",noon:"het middag",morning:"'s ochtends",afternoon:"'s namiddags",evening:"'s avonds",night:"'s nachts"},wide:{am:"AM",pm:"PM",midnight:"middernacht",noon:"het middag",morning:"'s ochtends",afternoon:"'s namiddags",evening:"'s avonds",night:"'s nachts"}},n=function(v,y){var _=Number(v);return _+"e"},s={ordinalNumber:n,era:(0,t.default)({values:r,defaultWidth:"wide"}),quarter:(0,t.default)({values:u,defaultWidth:"wide",argumentCallback:function(v){return v-1}}),month:(0,t.default)({values:l,defaultWidth:"wide"}),day:(0,t.default)({values:i,defaultWidth:"wide"}),dayPeriod:(0,t.default)({values:o,defaultWidth:"wide"})},P=s;e.default=P,a.exports=e.default})(A,b);var w={},L={get exports(){return w},set exports(a){w=a}};(function(a,e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t=r(E),d=r(C);function r(f){return f&&f.__esModule?f:{default:f}}var u=/^(\d+)e?/i,l=/\d+/i,i={narrow:/^([vn]\.? ?C\.?)/,abbreviated:/^([vn]\. ?Chr\.?)/,wide:/^((voor|na) Christus)/},o={any:[/^v/,/^n/]},n={narrow:/^[1234]/i,abbreviated:/^K[1234]/i,wide:/^[1234]e kwartaal/i},s={any:[/1/i,/2/i,/3/i,/4/i]},P={narrow:/^[jfmasond]/i,abbreviated:/^(jan.|feb.|mrt.|apr.|mei|jun.|jul.|aug.|sep.|okt.|nov.|dec.)/i,wide:/^(januari|februari|maart|april|mei|juni|juli|augustus|september|oktober|november|december)/i},m={narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^jan/i,/^feb/i,/^m(r|a)/i,/^apr/i,/^mei/i,/^jun/i,/^jul/i,/^aug/i,/^sep/i,/^okt/i,/^nov/i,/^dec/i]},v={narrow:/^[zmdwv]/i,short:/^(zo|ma|di|wo|do|vr|za)/i,abbreviated:/^(zon|maa|din|woe|don|vri|zat)/i,wide:/^(zondag|maandag|dinsdag|woensdag|donderdag|vrijdag|zaterdag)/i},y={narrow:[/^z/i,/^m/i,/^d/i,/^w/i,/^d/i,/^v/i,/^z/i],any:[/^zo/i,/^ma/i,/^di/i,/^wo/i,/^do/i,/^vr/i,/^za/i]},_={any:/^(am|pm|middernacht|het middaguur|'s (ochtends|middags|avonds|nachts))/i},x={any:{am:/^am/i,pm:/^pm/i,midnight:/^middernacht/i,noon:/^het middaguur/i,morning:/ochtend/i,afternoon:/middag/i,evening:/avond/i,night:/nacht/i}},j={ordinalNumber:(0,d.default)({matchPattern:u,parsePattern:l,valueCallback:function(M){return parseInt(M,10)}}),era:(0,t.default)({matchPatterns:i,defaultMatchWidth:"wide",parsePatterns:o,defaultParseWidth:"any"}),quarter:(0,t.default)({matchPatterns:n,defaultMatchWidth:"wide",parsePatterns:s,defaultParseWidth:"any",valueCallback:function(M){return M+1}}),month:(0,t.default)({matchPatterns:P,defaultMatchWidth:"wide",parsePatterns:m,defaultParseWidth:"any"}),day:(0,t.default)({matchPatterns:v,defaultMatchWidth:"wide",parsePatterns:y,defaultParseWidth:"any"}),dayPeriod:(0,t.default)({matchPatterns:_,defaultMatchWidth:"any",parsePatterns:x,defaultParseWidth:"any"})},k=j;e.default=k,a.exports=e.default})(L,w);(function(a,e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t=i(h),d=i(g),r=i(p),u=i(b),l=i(w);function i(s){return s&&s.__esModule?s:{default:s}}var o={code:"nl-BE",formatDistance:t.default,formatLong:d.default,formatRelative:r.default,localize:u.default,match:l.default,options:{weekStartsOn:1,firstWeekContainsDate:4}},n=o;e.default=n,a.exports=e.default})(F,c);const S=z(c),V=O({__proto__:null,default:S},[c]);export{V as i};

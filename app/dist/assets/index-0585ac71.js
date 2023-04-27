import{B as D}from"./index.b0c463e5.entry.js";import{b as E,a as O,d as k,c as z}from"./index-c3455229.js";function F(t,e){for(var a=0;a<e.length;a++){const r=e[a];if(typeof r!="string"&&!Array.isArray(r)){for(const n in r)if(n!=="default"&&!(n in t)){const l=Object.getOwnPropertyDescriptor(r,n);l&&Object.defineProperty(t,n,l.get?l:{enumerable:!0,get:()=>r[n]})}}}return Object.freeze(Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}))}var c={},R={get exports(){return c},set exports(t){c=t}},v={},N={get exports(){return v},set exports(t){v=t}};(function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={lessThanXSeconds:{one:"أقل من ثانية واحدة",two:"أقل من ثانتين",threeToTen:"أقل من {{count}} ثواني",other:"أقل من {{count}} ثانية"},xSeconds:{one:"ثانية واحدة",two:"ثانتين",threeToTen:"{{count}} ثواني",other:"{{count}} ثانية"},halfAMinute:"نصف دقيقة",lessThanXMinutes:{one:"أقل من دقيقة",two:"أقل من دقيقتين",threeToTen:"أقل من {{count}} دقائق",other:"أقل من {{count}} دقيقة"},xMinutes:{one:"دقيقة واحدة",two:"دقيقتين",threeToTen:"{{count}} دقائق",other:"{{count}} دقيقة"},aboutXHours:{one:"ساعة واحدة تقريباً",two:"ساعتين تقريباً",threeToTen:"{{count}} ساعات تقريباً",other:"{{count}} ساعة تقريباً"},xHours:{one:"ساعة واحدة",two:"ساعتين",threeToTen:"{{count}} ساعات",other:"{{count}} ساعة"},xDays:{one:"يوم واحد",two:"يومين",threeToTen:"{{count}} أيام",other:"{{count}} يوم"},aboutXWeeks:{one:"أسبوع واحد تقريباً",two:"أسبوعين تقريباً",threeToTen:"{{count}} أسابيع تقريباً",other:"{{count}} أسبوع تقريباً"},xWeeks:{one:"أسبوع واحد",two:"أسبوعين",threeToTen:"{{count}} أسابيع",other:"{{count}} أسبوع"},aboutXMonths:{one:"شهر واحد تقريباً",two:"شهرين تقريباً",threeToTen:"{{count}} أشهر تقريباً",other:"{{count}} شهر تقريباً"},xMonths:{one:"شهر واحد",two:"شهرين",threeToTen:"{{count}} أشهر",other:"{{count}} شهر"},aboutXYears:{one:"عام واحد تقريباً",two:"عامين تقريباً",threeToTen:"{{count}} أعوام تقريباً",other:"{{count}} عام تقريباً"},xYears:{one:"عام واحد",two:"عامين",threeToTen:"{{count}} أعوام",other:"{{count}} عام"},overXYears:{one:"أكثر من عام",two:"أكثر من عامين",threeToTen:"أكثر من {{count}} أعوام",other:"أكثر من {{count}} عام"},almostXYears:{one:"عام واحد تقريباً",two:"عامين تقريباً",threeToTen:"{{count}} أعوام تقريباً",other:"{{count}} عام تقريباً"}},r=function(s,o,d){d=d||{};var i=a[s],u;return typeof i=="string"?u=i:o===1?u=i.one:o===2?u=i.two:o<=10?u=i.threeToTen.replace("{{count}}",String(o)):u=i.other.replace("{{count}}",String(o)),d.addSuffix?d.comparison&&d.comparison>0?"في خلال "+u:"منذ "+u:u},n=r;e.default=n,t.exports=e.default})(N,v);var g={},S={get exports(){return g},set exports(t){g=t}};(function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=r(E);function r(i){return i&&i.__esModule?i:{default:i}}var n={full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},l={full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},s={full:"{{date}} 'عند' {{time}}",long:"{{date}} 'عند' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},o={date:(0,a.default)({formats:n,defaultWidth:"full"}),time:(0,a.default)({formats:l,defaultWidth:"full"}),dateTime:(0,a.default)({formats:s,defaultWidth:"full"})},d=o;e.default=d,t.exports=e.default})(S,g);var p={},C={get exports(){return p},set exports(t){p=t}};(function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={lastWeek:"'أخر' eeee 'عند' p",yesterday:"'أمس عند' p",today:"'اليوم عند' p",tomorrow:"'غداً عند' p",nextWeek:"eeee 'عند' p",other:"P"},r=function(s,o,d,i){return a[s]},n=r;e.default=n,t.exports=e.default})(C,p);var w={},L={get exports(){return w},set exports(t){w=t}};(function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=r(O);function r(f){return f&&f.__esModule?f:{default:f}}var n={narrow:["ق","ب"],abbreviated:["ق.م.","ب.م."],wide:["قبل الميلاد","بعد الميلاد"]},l={narrow:["1","2","3","4"],abbreviated:["ر1","ر2","ر3","ر4"],wide:["الربع الأول","الربع الثاني","الربع الثالث","الربع الرابع"]},s={narrow:["ج","ف","م","أ","م","ج","ج","أ","س","أ","ن","د"],abbreviated:["جانـ","فيفـ","مارس","أفريل","مايـ","جوانـ","جويـ","أوت","سبتـ","أكتـ","نوفـ","ديسـ"],wide:["جانفي","فيفري","مارس","أفريل","ماي","جوان","جويلية","أوت","سبتمبر","أكتوبر","نوفمبر","ديسمبر"]},o={narrow:["ح","ن","ث","ر","خ","ج","س"],short:["أحد","اثنين","ثلاثاء","أربعاء","خميس","جمعة","سبت"],abbreviated:["أحد","اثنـ","ثلا","أربـ","خميـ","جمعة","سبت"],wide:["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"]},d={narrow:{am:"ص",pm:"م",midnight:"ن",noon:"ظ",morning:"صباحاً",afternoon:"بعد الظهر",evening:"مساءاً",night:"ليلاً"},abbreviated:{am:"ص",pm:"م",midnight:"نصف الليل",noon:"ظهر",morning:"صباحاً",afternoon:"بعد الظهر",evening:"مساءاً",night:"ليلاً"},wide:{am:"ص",pm:"م",midnight:"نصف الليل",noon:"ظهر",morning:"صباحاً",afternoon:"بعد الظهر",evening:"مساءاً",night:"ليلاً"}},i={narrow:{am:"ص",pm:"م",midnight:"ن",noon:"ظ",morning:"في الصباح",afternoon:"بعد الظـهر",evening:"في المساء",night:"في الليل"},abbreviated:{am:"ص",pm:"م",midnight:"نصف الليل",noon:"ظهر",morning:"في الصباح",afternoon:"بعد الظهر",evening:"في المساء",night:"في الليل"},wide:{am:"ص",pm:"م",midnight:"نصف الليل",noon:"ظهر",morning:"صباحاً",afternoon:"بعد الظـهر",evening:"في المساء",night:"في الليل"}},u=function(h){return String(h)},_={ordinalNumber:u,era:(0,a.default)({values:n,defaultWidth:"wide"}),quarter:(0,a.default)({values:l,defaultWidth:"wide",argumentCallback:function(h){return Number(h)-1}}),month:(0,a.default)({values:s,defaultWidth:"wide"}),day:(0,a.default)({values:o,defaultWidth:"wide"}),dayPeriod:(0,a.default)({values:d,defaultWidth:"wide",formattingValues:i,defaultFormattingWidth:"wide"})},P=_;e.default=P,t.exports=e.default})(L,w);var y={},X={get exports(){return y},set exports(t){y=t}};(function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n(k),r=n(z);function n(m){return m&&m.__esModule?m:{default:m}}var l=/^(\d+)(th|st|nd|rd)?/i,s=/\d+/i,o={narrow:/^(ق|ب)/i,abbreviated:/^(ق\.?\s?م\.?|ق\.?\s?م\.?\s?|a\.?\s?d\.?|c\.?\s?)/i,wide:/^(قبل الميلاد|قبل الميلاد|بعد الميلاد|بعد الميلاد)/i},d={any:[/^قبل/i,/^بعد/i]},i={narrow:/^[1234]/i,abbreviated:/^ر[1234]/i,wide:/^الربع [1234]/i},u={any:[/1/i,/2/i,/3/i,/4/i]},_={narrow:/^[جفمأسند]/i,abbreviated:/^(جان|فيف|مار|أفر|ماي|جوا|جوي|أوت|سبت|أكت|نوف|ديس)/i,wide:/^(جانفي|فيفري|مارس|أفريل|ماي|جوان|جويلية|أوت|سبتمبر|أكتوبر|نوفمبر|ديسمبر)/i},P={narrow:[/^ج/i,/^ف/i,/^م/i,/^أ/i,/^م/i,/^ج/i,/^ج/i,/^أ/i,/^س/i,/^أ/i,/^ن/i,/^د/i],any:[/^جان/i,/^فيف/i,/^مار/i,/^أفر/i,/^ماي/i,/^جوا/i,/^جوي/i,/^أوت/i,/^سبت/i,/^أكت/i,/^نوف/i,/^ديس/i]},f={narrow:/^[حنثرخجس]/i,short:/^(أحد|اثنين|ثلاثاء|أربعاء|خميس|جمعة|سبت)/i,abbreviated:/^(أحد|اثن|ثلا|أرب|خمي|جمعة|سبت)/i,wide:/^(الأحد|الاثنين|الثلاثاء|الأربعاء|الخميس|الجمعة|السبت)/i},h={narrow:[/^ح/i,/^ن/i,/^ث/i,/^ر/i,/^خ/i,/^ج/i,/^س/i],wide:[/^الأحد/i,/^الاثنين/i,/^الثلاثاء/i,/^الأربعاء/i,/^الخميس/i,/^الجمعة/i,/^السبت/i],any:[/^أح/i,/^اث/i,/^ث/i,/^أر/i,/^خ/i,/^ج/i,/^س/i]},M={narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},T={any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},x={ordinalNumber:(0,a.default)({matchPattern:l,parsePattern:s,valueCallback:function(b){return parseInt(b,10)}}),era:(0,r.default)({matchPatterns:o,defaultMatchWidth:"wide",parsePatterns:d,defaultParseWidth:"any"}),quarter:(0,r.default)({matchPatterns:i,defaultMatchWidth:"wide",parsePatterns:u,defaultParseWidth:"any",valueCallback:function(b){return Number(b)+1}}),month:(0,r.default)({matchPatterns:_,defaultMatchWidth:"wide",parsePatterns:P,defaultParseWidth:"any"}),day:(0,r.default)({matchPatterns:f,defaultMatchWidth:"wide",parsePatterns:h,defaultParseWidth:"any"}),dayPeriod:(0,r.default)({matchPatterns:M,defaultMatchWidth:"any",parsePatterns:T,defaultParseWidth:"any"})},W=x;e.default=W,t.exports=e.default})(X,y);(function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=o(v),r=o(g),n=o(p),l=o(w),s=o(y);function o(u){return u&&u.__esModule?u:{default:u}}var d={code:"ar-DZ",formatDistance:a.default,formatLong:r.default,formatRelative:n.default,localize:l.default,match:s.default,options:{weekStartsOn:0,firstWeekContainsDate:1}},i=d;e.default=i,t.exports=e.default})(R,c);const q=D(c),A=F({__proto__:null,default:q},[c]);export{A as i};

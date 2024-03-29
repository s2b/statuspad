// moment.js
// version : 1.5.0
// author : Tim Wood
// license : MIT
// momentjs.com
define(function () {
	(function(a,b){function u(a,b){this._d=a,this._isUTC=!!b}function v(a,b){var c=a+"";while(c.length<b)c="0"+c;return c}function w(b,c,d,e){var f=typeof c=="string",g=f?{}:c,h,i,j,k;return f&&e&&(g[c]=+e),h=(g.ms||g.milliseconds||0)+(g.s||g.seconds||0)*1e3+(g.m||g.minutes||0)*6e4+(g.h||g.hours||0)*36e5,i=(g.d||g.days||0)+(g.w||g.weeks||0)*7,j=(g.M||g.months||0)+(g.y||g.years||0)*12,h&&b.setTime(+b+h*d),i&&b.setDate(b.getDate()+i*d),j&&(k=b.getDate(),b.setDate(1),b.setMonth(b.getMonth()+j*d),b.setDate(Math.min((new a(b.getFullYear(),b.getMonth()+1,0)).getDate(),k))),b}function x(a){return Object.prototype.toString.call(a)==="[object Array]"}function y(b){return new a(b[0],b[1]||0,b[2]||1,b[3]||0,b[4]||0,b[5]||0,b[6]||0)}function z(b,d){function r(d){var j,s;switch(d){case"M":return e+1;case"Mo":return e+1+p(e+1);case"MM":return v(e+1,2);case"MMM":return c.monthsShort[e];case"MMMM":return c.months[e];case"D":return f;case"Do":return f+p(f);case"DD":return v(f,2);case"DDD":return j=new a(g,e,f),s=new a(g,0,1),~~((j-s)/864e5+1.5);case"DDDo":return j=r("DDD"),j+p(j);case"DDDD":return v(r("DDD"),3);case"d":return h;case"do":return h+p(h);case"ddd":return c.weekdaysShort[h];case"dddd":return c.weekdays[h];case"w":return j=new a(g,e,f-h+5),s=new a(j.getFullYear(),0,4),~~((j-s)/864e5/7+1.5);case"wo":return j=r("w"),j+p(j);case"ww":return v(r("w"),2);case"YY":return v(g%100,2);case"YYYY":return g;case"a":return i>11?q.pm:q.am;case"A":return i>11?q.PM:q.AM;case"H":return i;case"HH":return v(i,2);case"h":return i%12||12;case"hh":return v(i%12||12,2);case"m":return m;case"mm":return v(m,2);case"s":return n;case"ss":return v(n,2);case"zz":case"z":return(b._d.toString().match(l)||[""])[0].replace(k,"");case"Z":return(o<0?"-":"+")+v(~~(Math.abs(o)/60),2)+":"+v(~~(Math.abs(o)%60),2);case"ZZ":return(o<0?"-":"+")+v(~~(10*Math.abs(o)/6),4);case"L":case"LL":case"LLL":case"LLLL":case"LT":return z(b,c.longDateFormat[d]);default:return d.replace(/(^\[)|(\\)|\]$/g,"")}}var e=b.month(),f=b.date(),g=b.year(),h=b.day(),i=b.hours(),m=b.minutes(),n=b.seconds(),o=-b.zone(),p=c.ordinal,q=c.meridiem;return d.replace(j,r)}function A(b,d){function p(a,b){var d;switch(a){case"M":case"MM":e[1]=~~b-1;break;case"MMM":case"MMMM":for(d=0;d<12;d++)if(c.monthsParse[d].test(b)){e[1]=d;break}break;case"D":case"DD":case"DDD":case"DDDD":e[2]=~~b;break;case"YY":b=~~b,e[0]=b+(b>70?1900:2e3);break;case"YYYY":e[0]=~~Math.abs(b);break;case"a":case"A":o=b.toLowerCase()==="pm";break;case"H":case"HH":case"h":case"hh":e[3]=~~b;break;case"m":case"mm":e[4]=~~b;break;case"s":case"ss":e[5]=~~b;break;case"Z":case"ZZ":h=!0,d=(b||"").match(r),d&&d[1]&&(f=~~d[1]),d&&d[2]&&(g=~~d[2]),d&&d[0]==="+"&&(f=-f,g=-g)}}var e=[0,0,1,0,0,0,0],f=0,g=0,h=!1,i=b.match(n),j=d.match(m),k=Math.min(i.length,j.length),l,o;for(l=0;l<k;l++)p(j[l],i[l]);return o&&e[3]<12&&(e[3]+=12),o===!1&&e[3]===12&&(e[3]=0),e[3]+=f,e[4]+=g,h?new a(a.UTC.apply({},e)):y(e)}function B(a,b){var c=Math.min(a.length,b.length),d=Math.abs(a.length-b.length),e=0,f;for(f=0;f<c;f++)~~a[f]!==~~b[f]&&e++;return e+d}function C(a,b){var c,d=a.match(n),e=[],f=99,g,h,i;for(g=0;g<b.length;g++)h=A(a,b[g]),i=B(d,z(new u(h),b[g]).match(n)),i<f&&(f=i,c=h);return c}function D(b){var c="YYYY-MM-DDT",d;if(o.exec(b)){for(d=0;d<3;d++)if(q[d][1].exec(b)){c+=q[d][0];break}return A(b,c+"Z")}return new a(b)}function E(a,b,d){var e=c.relativeTime[a];return typeof e=="function"?e(b||1,!!d,a):e.replace(/%d/i,b||1)}function F(a,b){var c=d(Math.abs(a)/1e3),e=d(c/60),f=d(e/60),g=d(f/24),h=d(g/365),i=c<45&&["s",c]||e===1&&["m"]||e<45&&["mm",e]||f===1&&["h"]||f<22&&["hh",f]||g===1&&["d"]||g<=25&&["dd",g]||g<=45&&["M"]||g<345&&["MM",d(g/30)]||h===1&&["y"]||["yy",h];return i[2]=b,E.apply({},i)}function G(a,b){c.fn[a]=function(a){var c=this._isUTC?"UTC":"";return a!=null?(this._d["set"+c+b](a),this):this._d["get"+c+b]()}}var c,d=Math.round,e={},f=typeof module!="undefined",g="months|monthsShort|monthsParse|weekdays|weekdaysShort|longDateFormat|calendar|relativeTime|ordinal|meridiem".split("|"),h,i=/^\/?Date\((\-?\d+)/i,j=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|dddd?|do?|w[o|w]?|YYYY|YY|a|A|hh?|HH?|mm?|ss?|zz?|ZZ?|LT|LL?L?L?)/g,k=/[^A-Z]/g,l=/\([A-Za-z ]+\)|:[0-9]{2} [A-Z]{3} /g,m=/(\\)?(MM?M?M?|dd?d?d|DD?D?D?|YYYY|YY|a|A|hh?|HH?|mm?|ss?|ZZ?|T)/g,n=/(\\)?([0-9]+|([a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+|([\+\-]\d\d:?\d\d))/gi,o=/\d{4}.\d\d.\d\d(T(\d\d(.\d\d(.\d\d)?)?)?([\+\-]\d\d:?\d\d)?)?/,p="YYYY-MM-DDTHH:mm:ssZ",q=[["HH:mm:ss",/T\d\d:\d\d:\d\d/],["HH:mm",/T\d\d:\d\d/],["HH",/T\d\d/]],r=/([\+\-]|\d\d)/gi,s="1.5.0",t="Month|Date|Hours|Minutes|Seconds|Milliseconds".split("|");c=function(c,d){if(c===null||c==="")return null;var e,f;return c&&c._d instanceof a?e=new a(+c._d):d?x(d)?e=C(c,d):e=A(c,d):(f=i.exec(c),e=c===b?new a:f?new a(+f[1]):c instanceof a?c:x(c)?y(c):typeof c=="string"?D(c):new a(c)),new u(e)},c.utc=function(b,d){return x(b)?new u(new a(a.UTC.apply({},b)),!0):d&&b?c(b+" 0",d+" Z").utc():c(b).utc()},c.humanizeDuration=function(a,b,d){var e=+a,f=c.relativeTime,g;switch(b){case"seconds":e*=1e3;break;case"minutes":e*=6e4;break;case"hours":e*=36e5;break;case"days":e*=864e5;break;case"weeks":e*=6048e5;break;case"months":e*=2592e6;break;case"years":e*=31536e6;break;default:d=!!b}return g=F(e,!d),d?(e<=0?f.past:f.future).replace(/%s/i,g):g},c.version=s,c.defaultFormat=p,c.lang=function(a,b){var d,h,i,j=[];if(b){for(d=0;d<12;d++)j[d]=new RegExp("^"+b.months[d]+"|^"+b.monthsShort[d].replace(".",""),"i");b.monthsParse=b.monthsParse||j,e[a]=b}if(e[a])for(d=0;d<g.length;d++)h=g[d],c[h]=e[a][h]||c[h];else f&&(i=require("./lang/"+a),c.lang(a,i))},c.lang("en",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),longDateFormat:{LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D YYYY",LLL:"MMMM D YYYY LT",LLLL:"dddd, MMMM D YYYY LT"},meridiem:{AM:"AM",am:"am",PM:"PM",pm:"pm"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinal:function(a){var b=a%10;return~~(a%100/10)===1?"th":b===1?"st":b===2?"nd":b===3?"rd":"th"}}),c.isMoment=function(a){return a instanceof u},c.fn=u.prototype={clone:function(){return c(this)},valueOf:function(){return+this._d},"native":function(){return this._d},toString:function(){return this._d.toString()},toDate:function(){return this._d},utc:function(){return this._isUTC=!0,this},local:function(){return this._isUTC=!1,this},format:function(a){return z(this,a?a:c.defaultFormat)},add:function(a,b){return this._d=w(this._d,a,1,b),this},subtract:function(a,b){return this._d=w(this._d,a,-1,b),this},diff:function(a,b,e){var f=c(a),g=(this.zone()-f.zone())*6e4,h=this._d-f._d-g,i=this.year()-f.year(),j=this.month()-f.month(),k=this.date()-f.date(),l;return b==="months"?l=i*12+j+k/30:b==="years"?l=i+j/12:l=b==="seconds"?h/1e3:b==="minutes"?h/6e4:b==="hours"?h/36e5:b==="days"?h/864e5:b==="weeks"?h/6048e5:h,e?l:d(l)},from:function(a,b){return c.humanizeDuration(this.diff(a),!b)},fromNow:function(a){return this.from(c(),a)},calendar:function(){var a=this.diff(c().sod(),"days",!0),b=c.calendar,d=b.sameElse,e=a<-6?d:a<-1?b.lastWeek:a<0?b.lastDay:a<1?b.sameDay:a<2?b.nextDay:a<7?b.nextWeek:d;return this.format(typeof e=="function"?e.apply(this):e)},isLeapYear:function(){var a=this.year();return a%4===0&&a%100!==0||a%400===0},isDST:function(){return this.zone()<c([this.year()]).zone()||this.zone()<c([this.year(),5]).zone()},day:function(a){var b=this._d.getDay();return a==null?b:this.add({d:a-b})},sod:function(){return this.clone().hours(0).minutes(0).seconds(0).milliseconds(0)},eod:function(){return this.sod().add({d:1,ms:-1})},zone:function(){return this._isUTC?0:this._d.getTimezoneOffset()},daysInMonth:function(){return this.clone().month(this.month()+1).date(0).date()}};for(h=0;h<t.length;h++)G(t[h].toLowerCase(),t[h]);G("year","FullYear"),f&&(module.exports=c),typeof window!="undefined"&&(window.moment=c),typeof define=="function"&&define.amd&&define("moment",[],function(){return c})})(Date);
	
(function () {
    var lang = {
            months : "Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
            monthsShort : "Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),
            weekdays : "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
            weekdaysShort : "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
            longDateFormat : {
                LT: "H:mm U\\hr",
                L : "DD.MM.YYYY",
                LL : "D. MMMM YYYY",
                LLL : "D. MMMM YYYY LT",
                LLLL : "dddd, D. MMMM YYYY LT"
            },
            calendar : {
                sameDay: "[Heute um] LT",
                sameElse: "L",
                nextDay: '[Morgen um] LT',
                nextWeek: 'dddd [um] LT',
                lastDay: '[Gestern um] LT',
                lastWeek: '[letzten] dddd [um] LT'
            },
            relativeTime : {
                future : "in %s",
                past : "vor %s",
                s : "ein paar Sekunden",
                m : "einer Minute",
                mm : "%d Minuten",
                h : "einer Stunde",
                hh : "%d Stunden",
                d : "einem Tag",
                dd : "%d Tagen",
                M : "einem Monat",
                MM : "%d Monaten",
                y : "einem Jahr",
                yy : "%d Jahren"
            },
            ordinal : function (number) {
                return '.';
            }
        };

    // Node
    if (typeof module !== 'undefined') {
        module.exports = lang;
    }
    // Browser
    if (typeof window !== 'undefined' && this.moment && this.moment.lang) {
        this.moment.lang('de', lang);
    }
}());

	return moment;
});
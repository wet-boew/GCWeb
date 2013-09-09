/*! Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW) wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 - v4.0.0-a1-development - 2013-09-09
 License: MIT */
/* Modernizr (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-shiv-load-mq-css3-input-inputtypes-html5-cssclasses-fontface-backgroundsize-borderimage-teststyles-testprops-testallprops-hasevents-prefixes-domprefixes
 */
;window.Modernizr=function(e,t,n){function k(e){f.cssText=e}function L(e,t){return k(p.join(e+";")+(t||""))}function A(e,t){return typeof e===t}function O(e,t){return!!~(""+e).indexOf(t)}function M(e,t){for(var r in e){var i=e[r];if(!O(i,"-")&&f[i]!==n)return t=="pfx"?i:!0}return!1}function _(e,t,r){for(var i in e){var s=t[e[i]];if(s!==n)return r===!1?e[i]:A(s,"function")?s.bind(r||t):s}return!1}function D(e,t,n){var r=e.charAt(0).toUpperCase()+e.slice(1),i=(e+" "+v.join(r+" ")+r).split(" ");return A(t,"string")||A(t,"undefined")?M(i,t):(i=(e+" "+m.join(r+" ")+r).split(" "),_(i,t,n))}function P(){i.input=function(n){for(var r=0,i=n.length;r<i;r++)b[n[r]]=n[r]in l;return b.list&&(b.list=!!t.createElement("datalist")&&!!e.HTMLDataListElement),b}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),i.inputtypes=function(e){for(var r=0,i,s,u,a=e.length;r<a;r++)l.setAttribute("type",s=e[r]),i=l.type!=="text",i&&(l.value=c,l.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(s)&&l.style.WebkitAppearance!==n?(o.appendChild(l),u=t.defaultView,i=u.getComputedStyle&&u.getComputedStyle(l,null).WebkitAppearance!=="textfield"&&l.offsetHeight!==0,o.removeChild(l)):/^(search|tel)$/.test(s)||(/^(url|email)$/.test(s)?i=l.checkValidity&&l.checkValidity()===!1:i=l.value!=c)),y[e[r]]=!!i;return y}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var r="2.6.2",i={},s=!0,o=t.documentElement,u="modernizr",a=t.createElement(u),f=a.style,l=t.createElement("input"),c=":)",h={}.toString,p=" -webkit- -moz- -o- -ms- ".split(" "),d="Webkit Moz O ms",v=d.split(" "),m=d.toLowerCase().split(" "),g={},y={},b={},w=[],E=w.slice,S,x=function(e,n,r,i){var s,a,f,l,c=t.createElement("div"),h=t.body,p=h||t.createElement("body");if(parseInt(r,10))while(r--)f=t.createElement("div"),f.id=i?i[r]:u+(r+1),c.appendChild(f);return s=["&#173;",'<style id="s',u,'">',e,"</style>"].join(""),c.id=u,(h?c:p).innerHTML+=s,p.appendChild(c),h||(p.style.background="",p.style.overflow="hidden",l=o.style.overflow,o.style.overflow="hidden",o.appendChild(p)),a=n(c,e),h?c.parentNode.removeChild(c):(p.parentNode.removeChild(p),o.style.overflow=l),!!a},T=function(t){var n=e.matchMedia||e.msMatchMedia;if(n)return n(t).matches;var r;return x("@media "+t+" { #"+u+" { position: absolute; } }",function(t){r=(e.getComputedStyle?getComputedStyle(t,null):t.currentStyle)["position"]=="absolute"}),r},N={}.hasOwnProperty,C;!A(N,"undefined")&&!A(N.call,"undefined")?C=function(e,t){return N.call(e,t)}:C=function(e,t){return t in e&&A(e.constructor.prototype[t],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(t){var n=this;if(typeof n!="function")throw new TypeError;var r=E.call(arguments,1),i=function(){if(this instanceof i){var e=function(){};e.prototype=n.prototype;var s=new e,o=n.apply(s,r.concat(E.call(arguments)));return Object(o)===o?o:s}return n.apply(t,r.concat(E.call(arguments)))};return i}),g.backgroundsize=function(){return D("backgroundSize")},g.borderimage=function(){return D("borderImage")},g.fontface=function(){var e;return x('@font-face {font-family:"font";src:url("https://")}',function(n,r){var i=t.getElementById("smodernizr"),s=i.sheet||i.styleSheet,o=s?s.cssRules&&s.cssRules[0]?s.cssRules[0].cssText:s.cssText||"":"";e=/src/i.test(o)&&o.indexOf(r.split(" ")[0])===0}),e};for(var H in g)C(g,H)&&(S=H.toLowerCase(),i[S]=g[H](),w.push((i[S]?"":"no-")+S));return i.input||P(),i.addTest=function(e,t){if(typeof e=="object")for(var r in e)C(e,r)&&i.addTest(r,e[r]);else{e=e.toLowerCase();if(i[e]!==n)return i;t=typeof t=="function"?t():t,typeof s!="undefined"&&s&&(o.className+=" "+(t?"":"no-")+e),i[e]=t}return i},k(""),a=l=null,function(e,t){function l(e,t){var n=e.createElement("p"),r=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",r.insertBefore(n.lastChild,r.firstChild)}function c(){var e=g.elements;return typeof e=="string"?e.split(" "):e}function h(e){var t=a[e[o]];return t||(t={},u++,e[o]=u,a[u]=t),t}function p(e,n,s){n||(n=t);if(f)return n.createElement(e);s||(s=h(n));var o;return s.cache[e]?o=s.cache[e].cloneNode():i.test(e)?o=(s.cache[e]=s.createElem(e)).cloneNode():o=s.createElem(e),o.canHaveChildren&&!r.test(e)?s.frag.appendChild(o):o}function d(e,n){e||(e=t);if(f)return e.createDocumentFragment();n=n||h(e);var r=n.frag.cloneNode(),i=0,s=c(),o=s.length;for(;i<o;i++)r.createElement(s[i]);return r}function v(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return g.shivMethods?p(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+c().join().replace(/\w+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(g,t.frag)}function m(e){e||(e=t);var n=h(e);return g.shivCSS&&!s&&!n.hasCSS&&(n.hasCSS=!!l(e,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),f||v(e,n),e}var n=e.html5||{},r=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,i=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,s,o="_html5shiv",u=0,a={},f;(function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",s="hidden"in e,f=e.childNodes.length==1||function(){t.createElement("a");var e=t.createDocumentFragment();return typeof e.cloneNode=="undefined"||typeof e.createDocumentFragment=="undefined"||typeof e.createElement=="undefined"}()}catch(n){s=!0,f=!0}})();var g={elements:n.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:n.shivCSS!==!1,supportsUnknownElements:f,shivMethods:n.shivMethods!==!1,type:"default",shivDocument:m,createElement:p,createDocumentFragment:d};e.html5=g,m(t)}(this,t),i._version=r,i._prefixes=p,i._domPrefixes=m,i._cssomPrefixes=v,i.mq=T,i.testProp=function(e){return M([e])},i.testAllProps=D,i.testStyles=x,o.className=o.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(s?" js "+w.join(" "):""),i}(this,this.document),function(e,t,n){function r(e){return"[object Function]"==d.call(e)}function i(e){return"string"==typeof e}function s(){}function o(e){return!e||"loaded"==e||"complete"==e||"uninitialized"==e}function u(){var e=v.shift();m=1,e?e.t?h(function(){("c"==e.t?k.injectCss:k.injectJs)(e.s,0,e.a,e.x,e.e,1)},0):(e(),u()):m=0}function a(e,n,r,i,s,a,f){function l(t){if(!d&&o(c.readyState)&&(w.r=d=1,!m&&u(),c.onload=c.onreadystatechange=null,t)){"img"!=e&&h(function(){b.removeChild(c)},50);for(var r in T[n])T[n].hasOwnProperty(r)&&T[n][r].onload()}}var f=f||k.errorTimeout,c=t.createElement(e),d=0,g=0,w={t:r,s:n,e:s,a:a,x:f};1===T[n]&&(g=1,T[n]=[]),"object"==e?c.data=n:(c.src=n,c.type=e),c.width=c.height="0",c.onerror=c.onload=c.onreadystatechange=function(){l.call(this,g)},v.splice(i,0,w),"img"!=e&&(g||2===T[n]?(b.insertBefore(c,y?null:p),h(l,f)):T[n].push(c))}function f(e,t,n,r,s){return m=0,t=t||"j",i(e)?a("c"==t?E:w,e,t,this.i++,n,r,s):(v.splice(this.i++,0,e),1==v.length&&u()),this}function l(){var e=k;return e.loader={load:f,i:0},e}var c=t.documentElement,h=e.setTimeout,p=t.getElementsByTagName("script")[0],d={}.toString,v=[],m=0,g="MozAppearance"in c.style,y=g&&!!t.createRange().compareNode,b=y?c:p.parentNode,c=e.opera&&"[object Opera]"==d.call(e.opera),c=!!t.attachEvent&&!c,w=g?"object":c?"script":"img",E=c?"script":w,S=Array.isArray||function(e){return"[object Array]"==d.call(e)},x=[],T={},N={timeout:function(e,t){return t.length&&(e.timeout=t[0]),e}},C,k;k=function(e){function t(e){var e=e.split("!"),t=x.length,n=e.pop(),r=e.length,n={url:n,origUrl:n,prefixes:e},i,s,o;for(s=0;s<r;s++)o=e[s].split("="),(i=N[o.shift()])&&(n=i(n,o));for(s=0;s<t;s++)n=x[s](n);return n}function o(e,i,s,o,u){var a=t(e),f=a.autoCallback;a.url.split(".").pop().split("?").shift(),a.bypass||(i&&(i=r(i)?i:i[e]||i[o]||i[e.split("/").pop().split("?")[0]]),a.instead?a.instead(e,i,s,o,u):(T[a.url]?a.noexec=!0:T[a.url]=1,s.load(a.url,a.forceCSS||!a.forceJS&&"css"==a.url.split(".").pop().split("?").shift()?"c":n,a.noexec,a.attrs,a.timeout),(r(i)||r(f))&&s.load(function(){l(),i&&i(a.origUrl,u,o),f&&f(a.origUrl,u,o),T[a.url]=2})))}function u(e,t){function n(e,n){if(e){if(i(e))n||(f=function(){var e=[].slice.call(arguments);l.apply(this,e),c()}),o(e,f,t,0,u);else if(Object(e)===e)for(p in h=function(){var t=0,n;for(n in e)e.hasOwnProperty(n)&&t++;return t}(),e)e.hasOwnProperty(p)&&(!n&&!--h&&(r(f)?f=function(){var e=[].slice.call(arguments);l.apply(this,e),c()}:f[p]=function(e){return function(){var t=[].slice.call(arguments);e&&e.apply(this,t),c()}}(l[p])),o(e[p],f,t,p,u))}else!n&&c()}var u=!!e.test,a=e.load||e.both,f=e.callback||s,l=f,c=e.complete||s,h,p;n(u?e.yep:e.nope,!!a),a&&n(a)}var a,f,c=this.yepnope.loader;if(i(e))o(e,0,c,0);else if(S(e))for(a=0;a<e.length;a++)f=e[a],i(f)?o(f,0,c,0):S(f)?k(f):Object(f)===f&&u(f,c);else Object(e)===e&&u(e,c)},k.addPrefix=function(e,t){N[e]=t},k.addFilter=function(e){x.push(e)},k.errorTimeout=1e4,null==t.readyState&&t.addEventListener&&(t.readyState="loading",t.addEventListener("DOMContentLoaded",C=function(){t.removeEventListener("DOMContentLoaded",C,0),t.readyState="complete"},0)),e.yepnope=l(),e.yepnope.executeStack=u,e.yepnope.injectJs=function(e,n,r,i,a,f){var l=t.createElement("script"),c,d,i=i||k.errorTimeout;l.src=e;for(d in r)l.setAttribute(d,r[d]);n=f?u:n||s,l.onreadystatechange=l.onload=function(){!c&&o(l.readyState)&&(c=1,n(),l.onload=l.onreadystatechange=null)},h(function(){c||(c=1,n(1))},i),a?l.onload():p.parentNode.insertBefore(l,p)},e.yepnope.injectCss=function(e,n,r,i,o,a){var i=t.createElement("link"),f,n=a?u:n||s;i.href=e,i.rel="stylesheet",i.type="text/css";for(f in r)i.setAttribute(f,r[f]);o||(p.parentNode.insertBefore(i,p),h(n,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
/*
    WET-BOEW Vapour loader
*/

/*
 Lets establish the base path to be more flexiable in terms of WCMS where JS can reside in theme folders and not in the root of sites
*/

(function(yepnope) {
  return yepnope.addPrefix("site", function(resourceObj) {
    var _path;
    _path = $('script[src$="vapour.js"],script[src$="vapour.min.js"]').last().prop("src").split('?')[0].split('/').slice(0, -1).join('/');
    resourceObj.url = _path + "/" + resourceObj.url;
    return resourceObj;
  });
})(yepnope);

/*
 Our Base timer for all event driven plugins
*/


window._timer = {
  _elms: [],
  _cache: [],
  add: function(_rg) {
    var _obj;
    if (this._cache.length < 1) {
      this._cache = $(document.body);
    }
    _obj = this._cache.find(_rg);
    if (_obj.length > 0) {
      this._elms.push(_obj);
    }
    return void 0;
  },
  remove: function(_rg) {
    var i;
    i = this._elms.length - 1;
    while (i >= 0) {
      if (this._elms[i].selector === _rg) {
        this._elms.splice(i, 1);
      }
      i--;
    }
    return void 0;
  },
  start: function() {
    setInterval((function() {
      return window._timer.touch();
    }), 500);
    return void 0;
  },
  touch: function() {
    var i;
    i = this._elms.length - 1;
    while (i >= 0) {
      this._elms[i].trigger("wb.timerpoke");
      i--;
    }
    return void 0;
  }
};

Modernizr.load([
  {
    test: Modernizr.canvas,
    nope: "site!polyfills/excanvas.min.js"
  }, {
    test: Modernizr.input.list,
    nope: "site!polyfills/datalist.min.js"
  }, {
    test: Modernizr.inputtypes["range"],
    nope: "site!polyfills/slider.min.js"
  }, {
    test: Modernizr.sessionstorage,
    nope: "site!polyfills/sessionstorage.min.js"
  }, {
    test: Modernizr.progress,
    nope: "site!polyfills/progress.min.js"
  }, {
    test: Modernizr.meter,
    nope: "site!/polyfills/meter.min.js"
  }, {
    test: Modernizr.localstorage,
    nope: "site!polyfills/sessionstorage.min.js"
  }, {
    test: Modernizr.lastchild,
    nope: "site!vendor/selectivizr.min.js"
  }, {
    test: Modernizr.touch,
    yep: "site!polyfills/mobile.min.js"
  }, {
    complete: function() {
      return window._timer.start();
    }
  }
]);

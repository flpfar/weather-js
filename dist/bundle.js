!function(n){var e={};function t(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return n[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=n,t.c=e,t.d=function(n,e,r){t.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:r})},t.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t.t=function(n,e){if(1&e&&(n=t(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var o in n)t.d(r,o,function(e){return n[e]}.bind(null,o));return r},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="",t(t.s=4)}([function(n,e,t){var r=t(1),o=t(2);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[n.i,o,""]]);var a={insert:"head",singleton:!1};r(o,a);n.exports=o.locals||{}},function(n,e,t){"use strict";var r,o=function(){return void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r},a=function(){var n={};return function(e){if(void 0===n[e]){var t=document.querySelector(e);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}n[e]=t}return n[e]}}(),i=[];function c(n){for(var e=-1,t=0;t<i.length;t++)if(i[t].identifier===n){e=t;break}return e}function u(n,e){for(var t={},r=[],o=0;o<n.length;o++){var a=n[o],u=e.base?a[0]+e.base:a[0],s=t[u]||0,l="".concat(u," ").concat(s);t[u]=s+1;var d=c(l),f={css:a[1],media:a[2],sourceMap:a[3]};-1!==d?(i[d].references++,i[d].updater(f)):i.push({identifier:l,updater:y(f,e),references:1}),r.push(l)}return r}function s(n){var e=document.createElement("style"),r=n.attributes||{};if(void 0===r.nonce){var o=t.nc;o&&(r.nonce=o)}if(Object.keys(r).forEach((function(n){e.setAttribute(n,r[n])})),"function"==typeof n.insert)n.insert(e);else{var i=a(n.insert||"head");if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(e)}return e}var l,d=(l=[],function(n,e){return l[n]=e,l.filter(Boolean).join("\n")});function f(n,e,t,r){var o=t?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css;if(n.styleSheet)n.styleSheet.cssText=d(e,o);else{var a=document.createTextNode(o),i=n.childNodes;i[e]&&n.removeChild(i[e]),i.length?n.insertBefore(a,i[e]):n.appendChild(a)}}function p(n,e,t){var r=t.css,o=t.media,a=t.sourceMap;if(o?n.setAttribute("media",o):n.removeAttribute("media"),a&&btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),n.styleSheet)n.styleSheet.cssText=r;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(r))}}var m=null,g=0;function y(n,e){var t,r,o;if(e.singleton){var a=g++;t=m||(m=s(e)),r=f.bind(null,t,a,!1),o=f.bind(null,t,a,!0)}else t=s(e),r=p.bind(null,t,e),o=function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(t)};return r(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap)return;r(n=e)}else o()}}n.exports=function(n,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=o());var t=u(n=n||[],e);return function(n){if(n=n||[],"[object Array]"===Object.prototype.toString.call(n)){for(var r=0;r<t.length;r++){var o=c(t[r]);i[o].references--}for(var a=u(n,e),s=0;s<t.length;s++){var l=c(t[s]);0===i[l].references&&(i[l].updater(),i.splice(l,1))}t=a}}}},function(n,e,t){(e=t(3)(!1)).push([n.i,"body {\n  font-family: 'Montserrat', sans-serif;\n}\n\n#container {\n  --bg-url: url('https://images.unsplash.com/photo-1561583534-09e822ba83ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1612&q=80');\n\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-around;\n  align-items: flex-start;\n  padding: 0 10%;\n  background-image: var(--bg-url);\n  background-size: cover;\n  background-repeat: no-repeat;\n}\n\n#city-btn {\n  background-color: rgba(0, 0, 0, 0.9);\n}\n\n#city-btn:hover {\n  background-color: rgba(0, 0, 0, 0.8);\n}\n\n#loading {\n  display: none;\n}\n\n#weather-container {\n  display: inline-flex;\n  justify-content: center;\n  color: #fff;\n  background-color: rgba(0, 0, 0, 0.9);\n  padding: 0 4rem;\n}\n\n#city-country {\n  font-size: 2rem;\n}\n\n#toggle-container {\n  color: #fff;\n  background-color: rgba(0, 0, 0, 0.9);\n  padding: 0.5rem 1rem;\n}\n\n#toggle:checked {\n  right: 0;\n}\n\n#temp {\n  display: flex;\n  margin-right: 2rem;\n  font-size: 5rem;\n  font-weight: 300;\n}\n\n/* Loading Spinner */\n\n.lds-dual-ring {\n  display: inline-block;\n  width: 40px;\n  height: 40px;\n  margin-left: 1rem;\n}\n\n.lds-dual-ring::after {\n  content: \" \";\n  display: block;\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  border: 6px solid #fff;\n  border-color: #fff transparent #fff transparent;\n  animation: lds-dual-ring 1.2s linear infinite;\n}\n\n@keyframes lds-dual-ring {\n  0% {\n    transform: rotate(0deg);\n  }\n\n  100% {\n    transform: rotate(360deg);\n  }\n}\n",""]),n.exports=e},function(n,e,t){"use strict";n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t=function(n,e){var t=n[1]||"",r=n[3];if(!r)return t;if(e&&"function"==typeof btoa){var o=(i=r,c=btoa(unescape(encodeURIComponent(JSON.stringify(i)))),u="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(c),"/*# ".concat(u," */")),a=r.sources.map((function(n){return"/*# sourceURL=".concat(r.sourceRoot||"").concat(n," */")}));return[t].concat(a).concat([o]).join("\n")}var i,c,u;return[t].join("\n")}(e,n);return e[2]?"@media ".concat(e[2]," {").concat(t,"}"):t})).join("")},e.i=function(n,t,r){"string"==typeof n&&(n=[[null,n,""]]);var o={};if(r)for(var a=0;a<this.length;a++){var i=this[a][0];null!=i&&(o[i]=!0)}for(var c=0;c<n.length;c++){var u=[].concat(n[c]);r&&o[u[0]]||(t&&(u[2]?u[2]="".concat(t," and ").concat(u[2]):u[2]=t),e.push(u))}},e}},function(n,e,t){"use strict";t.r(e);var r="302cf19198759e715ef3c5cc54c08b52";t(0);const o=document.getElementById("city-input"),a=document.getElementById("city-input-error"),i=document.getElementById("city-btn"),c=document.getElementById("temp"),u=document.getElementById("city-country"),s=document.getElementById("min-temp"),l=document.getElementById("max-temp"),d=document.getElementById("weather"),f=document.getElementById("toggle"),p=document.getElementById("loading"),m=document.getElementById("toggle-container");let g=!1;function y(n){return Math.round(n-273.15)}function h(n){return Math.round(9*n/5+32)}async function b(n,e="",t=""){try{let o;if(n)o=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${n}&appid=${r}`);else{if(""===e||""===t)return{error:"Invalid parameters"};o=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${e}&lon=${t}&appid=${r}`)}if(200===o.status){const n=await o.json(),e=n.weather[0].main,t=y(Number(n.main.temp_min)),r=y(Number(n.main.temp_max)),a=h(t),i=h(r),c=n.name,{country:u}=n.sys,s=y(Number(n.main.temp));return{weather:e,tempF:h(s),tempC:s,minTempF:a,minTempC:t,maxTempF:i,maxTempC:r,city:c,country:u}}return{error:o.statusText}}catch(n){return{error:n.message}}}function v(n){c.textContent=""+(g?n.tempF+" ºF":n.tempC+" ºC"),s.textContent="Min: "+(g?n.minTempF+" ºF":n.minTempC+" ºC"),l.textContent="Max: "+(g?n.maxTempF+" ºF":n.maxTempC+" ºC")}function x(n){n.error?(a.textContent=n.error,setTimeout(()=>{a.textContent=""},2e3)):(u.textContent=`${n.city}, ${n.country}`,d.textContent=n.weather,v(n),m.classList.remove("hidden"),f.addEventListener("change",e=>{g=e.target.checked,v(n)}))}navigator.geolocation.getCurrentPosition(async n=>{const{latitude:e,longitude:t}=n.coords;p.style.display="block";const r=await b(null,e,t);p.style.display="none",x(r)}),i.addEventListener("click",(async function(n){const e=o.value;if(""===e)return;n.preventDefault(),p.style.display="block";const t=await b(e);p.style.display="none",x(t)}))}]);
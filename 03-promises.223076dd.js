function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},r=t.parcelRequired7c6;null==r&&((r=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var r={id:e,exports:{}};return n[e]=r,t.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){o[e]=t},t.parcelRequired7c6=r);var i=r("eWCmQ");function u(e,t){return new Promise(((n,o)=>{setTimeout((()=>{Math.random()>.3?n({position:e,delay:t}):o({position:e,delay:t})}),t)}))}function l({position:t,delay:n}){e(i).Notify.success(`✅ Fulfilled promise ${t} in ${n}ms`)}function a({position:t,delay:n}){e(i).Notify.failure(`❌ Rejected promise ${t} in ${n}ms`)}document.querySelector(".form").addEventListener("submit",(function(e){e.preventDefault();const{elements:{delay:t,step:n,amount:o}}=e.currentTarget;let r=Number(t.value),i=Number(n.value);const s=Number(o.value);for(let e=0;e<s;e+=1)r+=i,u(e,r).then(l).catch(a);e.currentTarget.reset()}));
//# sourceMappingURL=03-promises.223076dd.js.map

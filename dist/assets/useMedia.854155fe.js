import{r as s}from"./index.7e0b0f28.js";var f=typeof window<"u",c=function(e,t){return t!==void 0?t:f?window.matchMedia(e).matches:!1},d=function(e,t){var r=s.exports.useState(c(e,t)),u=r[0],a=r[1];return s.exports.useEffect(function(){var i=!0,n=window.matchMedia(e),o=function(){!i||a(!!n.matches)};return n.addListener(o),a(n.matches),function(){i=!1,n.removeListener(o)}},[e]),u};const v=d;export{v as u};

import{r as p,e as x,j as o,p as l}from"./index.48ab129e.js";import"./useMedia.f3624665.js";function c(e,s){if(e==null)return{};var n=d(e,s),i,r;if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);for(r=0;r<t.length;r++)i=t[r],!(s.indexOf(i)>=0)&&(!Object.prototype.propertyIsEnumerable.call(e,i)||(n[i]=e[i]))}return n}function d(e,s){if(e==null)return{};var n={},i=Object.keys(e),r,t;for(t=0;t<i.length;t++)r=i[t],!(s.indexOf(r)>=0)&&(n[r]=e[r]);return n}var a=p.exports.forwardRef(function(e,s){var n=e.color,i=n===void 0?"currentColor":n,r=e.size,t=r===void 0?24:r,y=c(e,["color","size"]);return x("svg",{ref:s,xmlns:"http://www.w3.org/2000/svg",width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:i,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...y,children:[o("line",{x1:"12",y1:"2",x2:"12",y2:"6"}),o("line",{x1:"12",y1:"18",x2:"12",y2:"22"}),o("line",{x1:"4.93",y1:"4.93",x2:"7.76",y2:"7.76"}),o("line",{x1:"16.24",y1:"16.24",x2:"19.07",y2:"19.07"}),o("line",{x1:"2",y1:"12",x2:"6",y2:"12"}),o("line",{x1:"18",y1:"12",x2:"22",y2:"12"}),o("line",{x1:"4.93",y1:"19.07",x2:"7.76",y2:"16.24"}),o("line",{x1:"16.24",y1:"7.76",x2:"19.07",y2:"4.93"})]})});a.propTypes={color:l.exports.string,size:l.exports.oneOfType([l.exports.string,l.exports.number])};a.displayName="Loader";const f=a,h=()=>o("div",{className:"loading-shading",children:o("div",{className:"loading-icon",children:o(f,{size:30})})});export{h as L};
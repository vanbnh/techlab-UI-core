import{r as h,a as r,aq as m,j as t,ar as f,k as o}from"./index.945d01c7.js";import{L as p}from"./Loading.b372f5f0.js";const g=({data:s,dataVersionCurrent:l,dataVersionCompare:a,isLoadingVersion:n})=>{const[d,b]=h.exports.useState({});h.exports.useEffect(()=>{if(a){const e={};Object.keys(a).forEach(c=>{a[c]!==l[c]&&(e[c]=!0)}),b(e)}},[l,a]);const i=()=>a?t("table",{className:"table table-bordered table-sm",children:t("tbody",{children:Object.keys(l).map(e=>r("tr",{children:[t("td",{className:"fw-bolder text-nowrap",children:e&&e.toUpperCase()}),t("td",{className:o("text-nowrap",{"bg-light-danger":d[e]}),style:{maxWidth:"30vw",overflow:"auto"},children:l[e]}),t("td",{className:o("text-nowrap",{"bg-light-success":d[e]}),style:{maxWidth:"30vw",overflow:"auto"},children:a[e]})]},e))})}):t("table",{className:"table table-modern table-striped",children:t("tbody",{children:Object.keys(s).map(e=>r("tr",{children:[t("td",{className:"fw-bold text-nowrap",children:e&&e.toUpperCase()}),t("td",{className:"text-nowrap",style:{maxWidth:"50vw",overflow:"auto"},children:s[e]})]},e))})});return s?r(m,{children:[t(f,{className:"p-0",children:i()}),n&&t(p,{})]}):null};export{g as C};
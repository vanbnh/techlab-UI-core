import{aY as u,b8 as f,j as a,e as g,F as h,a0 as C}from"./index.efb59a3a.js";import{u as N,C as b,N as D}from"./NotFound.5155a263.js";import{B as j}from"./skeleton.c6753595.js";import{C as F}from"./CardTable.8d945dfa.js";import{C as n,c as L}from"./index.3ae3412c.js";import"./Loading.8b8d0de2.js";import"./useMedia.71552c73.js";import"./index.cfee603e.js";const M=()=>{var i;const{urls:m,keys:c,entries:l}=L,{search:d}=u(),t=f(d),e=(i=t==null?void 0:t.path)==null?void 0:i.split("/")[5],{detail:s,isLoading:p,notFound:o}=N({columns:n,key:c.detail,url:m.detail,params:t});if((p||!s)&&!o)return a(b,{rows:Object.keys(n).length});const r=C.report.post.path;return g(h,{children:[a("div",{className:"mb-1",children:a(j,{data:{parentName:l,parentTo:r,activeName:e}})}),o?a(D,{id:e,to:r}):a(F,{data:s})]})};export{M as default};
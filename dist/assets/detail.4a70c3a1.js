import{a_ as d,j as a,e as c,F as u,a0 as p}from"./index.4ca943a0.js";import{u as f,C,N}from"./NotFound.facbb765.js";import{B as g}from"./skeleton.c853f2d6.js";import{C as D}from"./CardTable.ee2d03b7.js";import{C as i,c as b}from"./index.a0997966.js";import"./Loading.8d2ae12d.js";import"./useMedia.ed1992ca.js";const M=()=>{const{urls:o,keys:n,entries:m}=b,{id:s}=d(),{detail:t,isLoading:l,notFound:e}=f({columns:i,key:n.detail,url:o.detail});if((l||!t)&&!e)return a(C,{rows:Object.keys(i).length});const r=p.client.path;return c(u,{children:[a("div",{className:"mb-1",children:a(g,{data:{parentName:m,parentTo:r,activeName:e?s:t["CLIENT NAME"]}})}),e?a(N,{id:s,to:r}):a(D,{data:t})]})};export{M as default};

import{bi as u,bu as f,j as t,e as g,I as b,$ as h}from"./index.87b97d19.js";import{u as C,C as N,N as D}from"./NotFound.b3481f95.js";import{B as j}from"./skeleton.5baf482c.js";import{C as L}from"./CardTable.042e1e0f.js";import{C as n,c as P}from"./index.a579c618.js";import"./useQuery.beff949c.js";import"./Loading.30fda6ed.js";import"./useMedia.994f6d7b.js";import"./index.cfee603e.js";const T=()=>{var i;const{urls:m,keys:c,entries:l}=P,{search:d}=u(),a=f(d),e=(i=a==null?void 0:a.path)==null?void 0:i.split("/")[5],{detail:o,isLoading:p,notFound:s}=C({columns:n,key:c.detail,url:m.detail,params:a});if((p||!o)&&!s)return t(N,{rows:Object.keys(n).length});const r=h.report.post.path;return g(b,{children:[t("div",{className:"mb-1",children:t(j,{data:{parentName:l,parentTo:r,activeName:e}})}),s?t(D,{id:e,to:r}):t(L,{data:o})]})};export{T as default};

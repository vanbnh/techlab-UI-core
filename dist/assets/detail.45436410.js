import{bl as c,j as a,e as d,I as u,$ as p}from"./index.87b97d19.js";import{u as f,C,N}from"./NotFound.b3481f95.js";import{B as g}from"./skeleton.5baf482c.js";import{C as D}from"./CardTable.042e1e0f.js";import{C as r,c as b}from"./index.ddb9da45.js";import"./useQuery.beff949c.js";import"./Loading.30fda6ed.js";import"./useMedia.994f6d7b.js";const M=()=>{const{id:s}=c(),{urls:i,keys:n,entries:m}=b,{detail:t,isLoading:l,notFound:e}=f({columns:r,key:n.detail,url:i.detail}),o=p.account.path;return(l||!t)&&!e?a(C,{rows:Object.keys(r).length}):d(u,{children:[a("div",{className:"mb-1",children:a(g,{data:{parentName:m,parentTo:o,activeName:e?s:t["ACCOUNT NAME"]}})}),e?a(N,{id:s,to:o}):a(D,{data:t})]})};export{M as default};

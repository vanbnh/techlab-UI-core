import{bk as c,j as e,a as d,ag as u}from"./index.25262899.js";import{m as p}from"./App.ec46c1b1.js";import{u as f,C as g,B as C,N}from"./NotFound.5110d9b3.js";import{C as D}from"./CardTable.41fb4a57.js";import{C as o,c as b}from"./index.a5d8f2ed.js";import"./useQuery.1bfa0df2.js";const L=()=>{const{urls:i,keys:n,entries:m}=b,{id:s}=c(),{detail:a,isLoading:l,notFound:t}=f({columns:o,key:n.detail,url:i.detail});if((l||!a)&&!t)return e(g,{rows:Object.keys(o).length});const r=p.client.path;return d(u,{children:[e("div",{className:"mb-1",children:e(C,{data:{parentName:m,parentTo:r,activeName:t?s:a==null?void 0:a.Name}})}),t?e(N,{id:s,to:r}):e(D,{data:a})]})};export{L as default};

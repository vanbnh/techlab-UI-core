import{a_ as b,j as a,e as r,F as j,R as F,J as t,a0 as L}from"./index.48ab129e.js";import{u as P,V as S}from"./Version.4fde96e8.js";import{B as v}from"./skeleton.d2262f09.js";import{C as w,N as x}from"./NotFound.6eabe872.js";import{C as k}from"./CardTable.40254689.js";import{C as i,c as y}from"./index.c9d968e1.js";import"./Loading.7b1c2a12.js";import"./useMedia.f3624665.js";const n=L.post.path,J=()=>{const{urls:m,keys:l,entries:c}=y,{id:o}=b(),{detail:e,versions:d,isLoading:p,notFound:s,isShowCompare:C,dataVersionCurrent:u,dataVersionCompare:f,isLoadingVersion:g,versionSelect:D,setVersionSelect:V,onSetDataVersionCompare:h,onCancelCompare:N}=P({keys:l,urls:m,columns:i});return(p||!e)&&!s?a(w,{rows:Object.keys(i).length}):r(j,{children:[r(F,{className:"mb-1",children:[a(t,{sm:"6",children:a(v,{data:{parentName:c,parentTo:n,activeName:s?o:e.ID}})}),a(t,{sm:"6",children:a(S,{versions:d,isShowCompare:C,onSetDataVersionCompare:h,onCancelCompare:N,versionSelect:D,setVersionSelect:V})})]}),s?a(x,{id:o,to:n}):a(k,{data:e,dataVersionCurrent:u,dataVersionCompare:f,isLoadingVersion:g})]})};export{J as default};
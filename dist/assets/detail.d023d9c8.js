import{a$ as L,j as a,e as r,F as b,R as j,J as t,a0 as F}from"./index.76fd1bb9.js";import{u as S,V as v}from"./Version.c8104613.js";import{B as w}from"./skeleton.b8430476.js";import{C as x,N as P}from"./NotFound.f49d19b7.js";import{C as k}from"./CardTable.a85f4a93.js";import{C as i,c as y}from"./index.9cc8e81b.js";import"./Loading.57be7e90.js";import"./useMedia.ffcd3756.js";const n=F.location.path,U=()=>{const{urls:m,keys:l,entries:c}=y,{id:s}=L(),{detail:e,versions:d,isLoading:p,notFound:o,isShowCompare:C,dataVersionCurrent:u,dataVersionCompare:f,isLoadingVersion:g,versionSelect:D,setVersionSelect:V,onSetDataVersionCompare:h,onCancelCompare:N}=S({keys:l,urls:m,columns:i});return(p||!e)&&!o?a(x,{rows:Object.keys(i).length}):r(b,{children:[r(j,{className:"mb-1",children:[a(t,{sm:"6",children:a(w,{data:{parentName:c,parentTo:n,activeName:o?s:e.ID}})}),a(t,{sm:"6",children:a(v,{versions:d,isShowCompare:C,onSetDataVersionCompare:h,onCancelCompare:N,versionSelect:D,setVersionSelect:V})})]}),o?a(P,{id:s,to:n}):a(k,{data:e,dataVersionCurrent:u,dataVersionCompare:f,isLoadingVersion:g})]})};export{U as default};
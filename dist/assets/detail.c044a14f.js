import{be as b,j as a,e as r,z as L,R as j,C as t,b5 as S}from"./index.7e0b0f28.js";import{u as v,V as w}from"./Version.6b8f348e.js";import{B as x}from"./skeleton.e749ceaa.js";import{C as F,N as P}from"./NotFound.cbe17a9c.js";import{C as k}from"./CardTable.e5f5effd.js";import{C as i,c as y}from"./index.42f81e56.js";import"./useQuery.18149dba.js";import"./Loading.cb087734.js";import"./useMedia.854155fe.js";const n=S.location.path,_=()=>{const{urls:m,keys:l,entries:c}=y,{id:s}=b(),{detail:e,versions:d,isLoading:p,notFound:o,isShowCompare:C,dataVersionCurrent:u,dataVersionCompare:f,isLoadingVersion:g,versionSelect:D,setVersionSelect:V,onSetDataVersionCompare:h,onCancelCompare:N}=v({keys:l,urls:m,columns:i});return(p||!e)&&!o?a(F,{rows:Object.keys(i).length}):r(L,{children:[r(j,{className:"mb-1",children:[a(t,{sm:"6",children:a(x,{data:{parentName:c,parentTo:n,activeName:o?s:e.ID}})}),a(t,{sm:"6",children:a(w,{versions:d,isShowCompare:C,onSetDataVersionCompare:h,onCancelCompare:N,versionSelect:D,setVersionSelect:V})})]}),o?a(P,{id:s,to:n}):a(k,{data:e,dataVersionCurrent:u,dataVersionCompare:f,isLoadingVersion:g})]})};export{_ as default};

import{be as b,j as a,e as r,z as j,R as L,C as t,b5 as P}from"./index.7e0b0f28.js";import{u as S,V as v}from"./Version.6b8f348e.js";import{B as w}from"./skeleton.e749ceaa.js";import{C as x,N as F}from"./NotFound.cbe17a9c.js";import{C as k}from"./CardTable.e5f5effd.js";import{C as i,c as y}from"./index.2e434b2f.js";import"./useQuery.18149dba.js";import"./Loading.cb087734.js";import"./useMedia.854155fe.js";const n=P.post.path,_=()=>{const{urls:m,keys:l,entries:c}=y,{id:o}=b(),{detail:e,versions:d,isLoading:p,notFound:s,isShowCompare:C,dataVersionCurrent:u,dataVersionCompare:f,isLoadingVersion:g,versionSelect:D,setVersionSelect:V,onSetDataVersionCompare:h,onCancelCompare:N}=S({keys:l,urls:m,columns:i});return(p||!e)&&!s?a(x,{rows:Object.keys(i).length}):r(j,{children:[r(L,{className:"mb-1",children:[a(t,{sm:"6",children:a(w,{data:{parentName:c,parentTo:n,activeName:s?o:e.ID}})}),a(t,{sm:"6",children:a(v,{versions:d,isShowCompare:C,onSetDataVersionCompare:h,onCancelCompare:N,versionSelect:D,setVersionSelect:V})})]}),s?a(F,{id:o,to:n}):a(k,{data:e,dataVersionCurrent:u,dataVersionCompare:f,isLoadingVersion:g})]})};export{_ as default};

import{r as x,j as d,a1 as u,bj as s}from"./index.25262899.js";import{G as y}from"./index.8491c5c0.js";import{C as b,f as g,c as C}from"./index.ff40cb1e.js";import{F as E}from"./App.ec46c1b1.js";import"./index.51db54c0.js";import"./useQuery.1bfa0df2.js";const v=()=>{const{entries:e,settings:r,keys:i,urls:n,fixedColumns:l}=C,[p,t]=x.exports.useState(!1),c={url:n.list,key:i.list};return d(y,{columns:b,query:c,formatData:g,entries:e,settings:r,fixedCols:l,onExport:async a=>{if(a.length>0){t(!0);try{const o=await u.post("/file-template/",{ids:a.map(f=>f.location_id),type:"location"},{responseType:"blob"}),m=new Blob([o.data],{type:o.data.type});E.exports.saveAs(m,"locations.xlsx"),o.status!==200&&s.error("Export location from S3 Failed"),t(!1)}catch{t(!1),s.error("Export location from S3 Failed")}}},loading:p})};export{v as default};
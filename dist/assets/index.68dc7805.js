import{r as x,j as d,a1 as u,bm as s}from"./index.945d01c7.js";import{G as y}from"./index.b9c1a59a.js";import{C as b,f as g,c as C}from"./index.6c9e25e8.js";import{F as E}from"./App.dd14fcdf.js";import"./index.4f0d5f8a.js";import"./SelectField.f6ae673a.js";import"./useQuery.ad367fe6.js";import"./Loading.b372f5f0.js";/* empty css                */const D=()=>{const{entries:r,settings:e,keys:i,urls:n,fixedColumns:l}=C,[p,t]=x.exports.useState(!1),m={url:n.list,key:i.list};return d(y,{columns:b,query:m,formatData:g,entries:r,settings:e,fixedCols:l,onExport:async a=>{if(a.length>0){t(!0);try{const o=await u.post("/file-template/",{ids:a.map(f=>f.location_id),type:"location"},{responseType:"blob"}),c=new Blob([o.data],{type:o.data.type});E.exports.saveAs(c,"locations.xlsx"),o.status!==200&&s.error("Export location from S3 Failed"),t(!1)}catch{t(!1),s.error("Export location from S3 Failed")}}},loading:p})};export{D as default};
import{r as x,j as d,a1 as u,bn as s}from"./index.d52c8096.js";import{G as y}from"./index.b0a4a8c3.js";import{C as b,f as g,c as C}from"./index.41af2729.js";import{F as E}from"./App.c6f4b6cc.js";import"./index.6caec6e1.js";import"./SelectField.53fd7b53.js";import"./useQuery.c29b86ee.js";import"./Loading.ebef6fa5.js";/* empty css                */const D=()=>{const{entries:r,settings:e,keys:i,urls:n,fixedColumns:l}=C,[p,t]=x.exports.useState(!1),m={url:n.list,key:i.list};return d(y,{columns:b,query:m,formatData:g,entries:r,settings:e,fixedCols:l,onExport:async a=>{if(a.length>0){t(!0);try{const o=await u.post("/file-template/",{ids:a.map(f=>f.location_id),type:"location"},{responseType:"blob"}),c=new Blob([o.data],{type:o.data.type});E.exports.saveAs(c,"locations.xlsx"),o.status!==200&&s.error("Export location from S3 Failed"),t(!1)}catch{t(!1),s.error("Export location from S3 Failed")}}},loading:p})};export{D as default};
import{r as d,j as x,a3 as u,bf as y,bd as s}from"./index.7e0b0f28.js";import{G as b}from"./index.55b3b4ae.js";import{C as g,f as C,c as E}from"./index.42f81e56.js";import"./react-paginate.4b40d3fc.js";import"./SelectField.f7670d16.js";import"./useMedia.854155fe.js";import"./useQuery.18149dba.js";import"./Loading.cb087734.js";const A=()=>{const{entries:e,settings:r,keys:i,urls:n,fixedColumns:l}=E,[p,t]=d.exports.useState(!1),m={url:n.list,key:i.list};return x(b,{columns:g,query:m,formatData:C,entries:e,settings:r,fixedCols:l,onExport:async a=>{if(a.length>0){t(!0);try{const o=await u.post("/file-template/",{ids:a.map(f=>f.location_id),type:"location"},{responseType:"blob"}),c=new Blob([o.data],{type:o.data.type});y.exports.saveAs(c,"locations.xlsx"),o.status!==200&&s.error("Export location from S3 Failed"),t(!1)}catch{t(!1),s.error("Export location from S3 Failed")}}},loading:p})};export{A as default};

import{r as x,j as d,I as u,b7 as y,aP as e}from"./index.efb59a3a.js";import{G as b}from"./index.10d6e570.js";import{C as g,f as C,c as E}from"./index.71709c9f.js";import"./react-paginate.96556f39.js";import"./useClickOutside.abbbf904.js";import"./index.cfee603e.js";import"./useMedia.71552c73.js";import"./Loading.8b8d0de2.js";const A=()=>{const{entries:r,settings:a,keys:p,urls:i,fixedColumns:n}=E,[l,o]=x.exports.useState(!1),m={url:i.list,key:p.list};return d(b,{columns:g,query:m,formatData:C,entries:r,settings:a,fixedCols:n,onExport:async s=>{if(s.length>0){o(!0);try{const t=await u.post("/file-template/",{ids:s.map(c=>c.post_id),type:"post"},{responseType:"blob"}),f=new Blob([t.data],{type:t.data.type});y.exports.saveAs(f,"posts.xlsx"),t.status!==200&&e.error("Export post from S3 Failed"),o(!1)}catch{o(!1),e.error("Export post from S3 Failed")}}},loading:l})};export{A as default};
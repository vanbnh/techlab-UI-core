import{r as x,j as d,I as u,b7 as y,aP as e}from"./index.76fd1bb9.js";import{G as b}from"./index.36c39995.js";import{C as g,f as C,c as E}from"./index.e31aef70.js";import"./react-paginate.45fdd8a1.js";import"./useClickOutside.73995896.js";import"./index.cfee603e.js";import"./useMedia.ffcd3756.js";import"./Loading.57be7e90.js";const A=()=>{const{entries:r,settings:a,keys:p,urls:i,fixedColumns:n}=E,[l,o]=x.exports.useState(!1),m={url:i.list,key:p.list};return d(b,{columns:g,query:m,formatData:C,entries:r,settings:a,fixedCols:n,onExport:async s=>{if(s.length>0){o(!0);try{const t=await u.post("/file-template/",{ids:s.map(c=>c.post_id),type:"post"},{responseType:"blob"}),f=new Blob([t.data],{type:t.data.type});y.exports.saveAs(f,"posts.xlsx"),t.status!==200&&e.error("Export post from S3 Failed"),o(!1)}catch{o(!1),e.error("Export post from S3 Failed")}}},loading:l})};export{A as default};
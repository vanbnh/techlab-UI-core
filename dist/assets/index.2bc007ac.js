import{H as f,I as u,r as n,j as d}from"./index.48ab129e.js";import{G as C}from"./index.9ce02dab.js";import{C as r,f as x,c as g}from"./index.a2e8bf90.js";import{A as y,a as A}from"./DownloadCSV.3442e7ac.js";import"./react-paginate.15af98da.js";import"./useClickOutside.108ebd43.js";import"./index.cfee603e.js";import"./useMedia.f3624665.js";import"./Loading.7b1c2a12.js";const S=()=>f(["ALL_CLIENTS"],async()=>await u.get("/client/",{params:{page:1,limit:999}}).then(e=>e.data)),_=(e,a)=>{const{data:t}=S();n.exports.useEffect(()=>{if(t!=null&&t.data){const s=e.find(o=>o.name==="client_name");s&&(s.options=t.data.map(o=>({value:o.client_id,label:o.client_name})),a([...e]))}},[t])},R=()=>{const{entries:e,settings:a,keys:t,urls:s,fixedColumns:o,filters:l}=g,[i,m]=n.exports.useState(r);_(i,m);const p={url:s.list,key:t.list};return d(C,{columns:i,query:p,formatData:x,entries:e,settings:a,columnExports:r.filter(c=>!c.isDetailHidden),providerComponents:[y,A],fixedCols:o,initialFilters:l})};export{R as default};
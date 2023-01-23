import{bb as R,n as A,bh as B,r as p,a2 as u,j as e,bi as y,e as d,z as E,a0 as S,R as C,C as b,a1 as F,f as H,b5 as I,a3 as z}from"./index.6e116e97.js";import{u as Q}from"./useQuery.8038cb5a.js";import{D as V}from"./flatpickr.489890f8.js";import{S as q}from"./SelectField.67e7c339.js";import{B as G}from"./skeleton.10ea1130.js";import"./useMedia.67cdf354.js";import{c as J}from"./index.c609e052.js";import{S as K,a as U,b as W,C as X}from"./LineBrush.94e36915.js";const Z=(n,o)=>n?Math.round((o-n)/n*100,2):0,$=n=>Math.round(n.reduce((o,g)=>o+g,0)/n.length),ee=I.report.post.path,de=()=>{var _;const{urls:n,keys:o,entries:g,statistic:N}=J,{search:O}=R(),{t:l}=A(),m=B(O),Y=(_=m==null?void 0:m.path)==null?void 0:_.split("/")[5],[c,x]=p.exports.useState({start_date:u().startOf("week").add("-8","week").format("YYYY-MM-DD"),end_date:u().endOf("week").format("YYYY-MM-DD")}),{data:r,isLoading:j}=Q([o.statistic,m,c],async()=>await z.get(n.statistic,{params:{post_id:Y,start_date:c.start_date,end_date:c.end_date}}).then(a=>a.data)),D=N.map(a=>({...a,value:a.key,label:a.name})),P=D.map(a=>({...a,label:l(a.label)})),[f,w]=p.exports.useState(D),T=f.map(a=>({...a,label:l(a.label)})),[t,L]=p.exports.useState({});return p.exports.useEffect(()=>{let a={};r&&r.length>0&&(a=f.reduce((h,s)=>(h[s.key]={...s,name:l(s.name),data:r.map(i=>[new Date(i.report_date).getTime(),i[s.key]]),last:r[r.length-1][s.key],change:Z(r[0][s.key],r[r.length-1][s.key]),average:$(r.map(i=>i[s.key]))},h),{})),L(a)},[r,f]),j?e(y,{}):d(E,{children:[e("div",{className:"mb-1",children:e(G,{data:{parentName:g,parentTo:ee,activeName:Y}})}),e(S,{children:e("div",{className:"p-1",children:d(C,{children:[e(b,{sm:"4",children:e(V,{datePicker:c,setDatePicker:x})}),e(b,{sm:"8",children:e("div",{className:"w-100",children:e(q,{name:"location_report_chart",isMulti:!0,value:T,isClearable:!0,closeMenuOnSelect:!1,onChange:a=>w(a),options:P})})})]})})}),e(C,{children:Object.keys(t).map(a=>e(b,{md:"4",children:e(S,{children:e(F,{className:"p-0",children:e(K,{data:t[a]})})})},a))}),e(S,{className:"mt-2 table-responsive",children:d("table",{className:" table table-modern table-striped",children:[e("thead",{children:d("tr",{children:[e("th",{children:l("Name")}),e("th",{children:l("Last")}),e("th",{children:l("Average")}),e("th",{children:l("Percentage")}),d("th",{children:[u(c.start_date).format("DD/MM/YYYY")," -"," ",u(c.end_date).format("DD/MM/YYYY")]}),e("th",{children:l("Volume")})]})}),e("tbody",{children:Object.keys(t).map(a=>{var h,s,i,M,k,v;return d("tr",{children:[e("td",{children:(h=t[a])==null?void 0:h.name}),e("td",{children:(s=t[a])==null?void 0:s.last}),e("td",{children:(i=t[a])==null?void 0:i.average}),d("td",{className:H({"text-success":((M=t[a])==null?void 0:M.change)>0,"text-danger":((k=t[a])==null?void 0:k.change)<0}),children:[(v=t[a])==null?void 0:v.change,"%"]}),e("td",{children:e(U,{data:t[a]})}),e("td",{children:e(W,{data:t[a]})})]},a)})})]})}),e(C,{children:Object.keys(t).map(a=>e(b,{lg:"6",children:e(X,{data:t[a],dateRange:c})},a))})]})};export{de as default};

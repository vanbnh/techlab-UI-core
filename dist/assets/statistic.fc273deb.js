import{z as P,r as m,j as e,bo as B,a as d,af as L,aq as b,a8 as S,a9 as p,ar as y,k as A,a1 as R}from"./index.9f93e61f.js";import{n as F,i as u,m as T}from"./App.c25ad37e.js";import{u as q}from"./useQuery.4bf9742f.js";import{D as z}from"./flatpickr.08dc8bf6.js";import{S as E}from"./SelectField.63656ebb.js";import{B as I}from"./skeleton.d4688617.js";/* empty css                */import{c as Q}from"./index.28465dfd.js";import{S as V,a as G,b as H,C as J}from"./LineBrush.695583f8.js";const K=(n,l)=>n?Math.round((l-n)/n*100,2):0,U=n=>Math.round(n.reduce((l,g)=>l+g,0)/n.length),W=T.report.post.path,ce=()=>{var C;const{urls:n,keys:l,entries:g,statistic:v}=Q,{search:x}=P(),h=F(x),Y=(C=h==null?void 0:h.path)==null?void 0:C.split("/")[5],[c,N]=m.exports.useState({start_date:u().startOf("week").add("-8","week").format("YYYY-MM-DD"),end_date:u().endOf("week").format("YYYY-MM-DD")}),{data:r,isLoading:O}=q([l.statistic,h,c],async()=>await R.get(n.statistic,{params:{post_id:Y,start_date:c.start_date,end_date:c.end_date}}).then(a=>a.data)),D=v.map(a=>({...a,value:a.key,label:a.name})),[f,j]=m.exports.useState(D),[t,w]=m.exports.useState({});return m.exports.useEffect(()=>{let a={};r&&r.length>0&&(a=f.reduce((o,s)=>(o[s.key]={...s,data:r.map(i=>[new Date(i.report_date).getTime(),i[s.key]]),last:r[r.length-1][s.key],change:K(r[0][s.key],r[r.length-1][s.key]),average:U(r.map(i=>i[s.key]))},o),{})),w(a)},[r,f]),O?e(B,{}):d(L,{children:[e("div",{className:"mb-1",children:e(I,{data:{parentName:g,parentTo:W,activeName:Y}})}),e(b,{children:e("div",{className:"p-1",children:d(S,{children:[e(p,{sm:"4",children:e(z,{datePicker:c,setDatePicker:N})}),e(p,{sm:"8",children:e("div",{className:"w-100",children:e(E,{name:"location_report_chart",isMulti:!0,value:f,isClearable:!0,closeMenuOnSelect:!1,onChange:a=>j(a),options:D})})})]})})}),e(S,{children:Object.keys(t).map(a=>e(p,{md:"4",children:e(b,{children:e(y,{className:"p-0",children:e(V,{data:t[a]})})})},a))}),e(b,{className:"mt-2 table-responsive",children:d("table",{className:" table table-modern table-striped",children:[e("thead",{children:d("tr",{children:[e("th",{children:"Name"}),e("th",{children:"Last"}),e("th",{children:"Average"}),e("th",{children:"Percentage"}),d("th",{children:[u(c.start_date).format("DD/MM/YYYY")," -"," ",u(c.end_date).format("DD/MM/YYYY")]}),e("th",{children:"Volume"})]})}),e("tbody",{children:Object.keys(t).map(a=>{var o,s,i,k,M,_;return d("tr",{children:[e("td",{children:(o=t[a])==null?void 0:o.name}),e("td",{children:(s=t[a])==null?void 0:s.last}),e("td",{children:(i=t[a])==null?void 0:i.average}),d("td",{className:A({"text-success":((k=t[a])==null?void 0:k.change)>0,"text-danger":((M=t[a])==null?void 0:M.change)<0}),children:[(_=t[a])==null?void 0:_.change,"%"]}),e("td",{children:e(G,{data:t[a]})}),e("td",{children:e(H,{data:t[a]})})]},a)})})]})}),e(S,{children:Object.keys(t).map(a=>e(p,{lg:"6",children:e(J,{data:t[a],dateRange:c})},a))})]})};export{ce as default};

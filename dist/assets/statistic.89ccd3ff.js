import{z as M,r as l,a as g,ag as S,j as a,ar as Y,a8 as w,a9 as k,a1 as b}from"./index.cbdf8a16.js";import{n as O,i as D,m as j}from"./App.d125d831.js";import{u as N}from"./useQuery.3b397579.js";import{D as P}from"./flatpickr.51241bc1.js";import{S as L}from"./SelectField.22c07fc3.js";import{B}from"./skeleton.0cc2a86d.js";/* empty css                */import{c as F}from"./index.d541fc62.js";const R=(s,r)=>Math.round((r-s)/s*100,2),T=s=>Math.round(s.reduce((r,d)=>r+d,0)/s.length),z=j.report.location.path,V=()=>{var u;const{urls:s,keys:r,entries:d,statistic:C}=F,{search:_}=M(),n=O(_),p=(u=n==null?void 0:n.path)==null?void 0:u.split("/")[3],[i,y]=l.exports.useState({start_date:D().startOf("week").add("-8","week").format("YYYY-MM-DD"),end_date:D().endOf("week").format("YYYY-MM-DD")}),{data:e,isLoading:A}=N([r.statistic,n,i],async()=>await b.get(s.statistic,{params:{location_id:p,start_date:i.start_date,end_date:i.end_date}}).then(t=>t.data)),h=C.map(t=>({...t,value:t.key,label:t.name})),[m,v]=l.exports.useState(h),[E,x]=l.exports.useState({});return l.exports.useEffect(()=>{let t={};(e==null?void 0:e.length)>0&&(t=m.reduce((f,o)=>(f[o.key]={...o,data:e.map(c=>[new Date(c.report_date).getTime(),c[o.key]]),last:e[e.length-1][o.key],change:R(e[0][o.key],e[e.length-1][o.key]),average:T(e.map(c=>c[o.key]))},f),{})),x(t)},[e,m]),g(S,{children:[a("div",{className:"mb-1",children:a(B,{data:{parentName:d,parentTo:z,activeName:p}})}),a(Y,{children:a("div",{className:"p-1",children:g(w,{children:[a(k,{sm:"3",children:a(P,{datePicker:i,setDatePicker:y})}),a(k,{sm:"9",children:a("div",{className:"w-100",children:a(L,{name:"location_report_chart",isMulti:!0,value:m,isClearable:!0,closeMenuOnSelect:!1,onChange:t=>v(t),options:h})})})]})})})]})};export{V as default};

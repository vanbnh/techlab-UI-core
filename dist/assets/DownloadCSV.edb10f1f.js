import{j as o,a7 as m,a as n,r as d,K as f,ah as h,ag as C}from"./index.d52c8096.js";import{D as i}from"./index.6caec6e1.js";import{E as _,m as a,B as g,l as u,j as s}from"./App.c6f4b6cc.js";import{D as v}from"./download.6f77b0e8.js";const x=({row:e})=>{const t=m();return n("div",{className:"d-flex gap-1",children:[o(_,{size:20,className:"text-primary cursor-pointer",onClick:()=>t(`${a.report.location.path}/details?path=${e.location_report_path}`)}),o(g,{size:20,className:"text-primary cursor-pointer",onClick:()=>t(`${a.report.location.path}/statistic?path=${e.location_report_path}`)})]})},z=e=>o(i,{for:["actions"],formatterComponent:x,...e}),D=({row:e})=>{const[t,l]=d.exports.useState(!1),c=r=>u({url:"/location-report/export/",params:{start_date:r.report_date?s(r.report_date):"",end_date:s(new Date),id:r==null?void 0:r.location_id},fileName:`location-report-${r==null?void 0:r.location_id}.csv`,setLoading:p=>l(p)});return o("div",{className:"text-center",children:o(f,{color:"relief-primary",size:"sm",onClick:()=>c(e),children:t?o(h,{color:"white",size:"sm"}):n(C,{children:[o(v,{size:14}),o("span",{className:"align-middle ms-25",children:"CSV"})]})})})},$=e=>o(i,{for:["download_csv"],formatterComponent:D,...e});export{z as A,$ as D};
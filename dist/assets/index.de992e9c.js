import{j as r,L as p}from"./index.25262899.js";import{m as o,j as _}from"./App.ec46c1b1.js";const m=[{title:"post id",name:"post_id",isLink:!0,filterKey:"post__post_id",to:t=>`${o.post.path}/${t.post_id}`,cell:t=>{var e,a;return r(p,{to:`${o.post.path}/${(e=t.post)==null?void 0:e.post_id}`,children:(a=t.post)==null?void 0:a.post_id})},width:180},{title:"client",name:"client_name",isLink:!0,align:"center",width:110,filterKey:"post__location__gmb_account__client__client_name",to:t=>`${o.client.path}/${t.client_id}`,value_compare:t=>{var e,a,i;return(i=(a=(e=t.post)==null?void 0:e.location)==null?void 0:a.gmb_account.client)==null?void 0:i.client_id},cell:t=>{var e,a,i,s,l,n,c;return r(p,{to:`${o.client.path}/${(i=(a=(e=t.post)==null?void 0:e.location)==null?void 0:a.gmb_account.client)==null?void 0:i.client_id}`,children:(c=(n=(l=(s=t.post)==null?void 0:s.location)==null?void 0:l.gmb_account)==null?void 0:n.client)==null?void 0:c.client_name})}},{title:"Path",name:"post_report_path",isLink:!0,to:t=>`${o.report.post.path}/details?path=${t.post_report_path}`,summaries:["count"],width:540},{title:"local post views search",name:"local_post_views_search",align:"right",summaries:["min","max","avg","sum"],width:150},{title:"local post actions call to action",name:"local_post_actions_call_to_action",align:"right",summaries:["min","max","avg","sum"],width:150},{title:"report date",name:"report_date",isDate:!0},{title:"update date",name:"updated_at",isDate:!0,cell:t=>_(t.updated_at)},{title:"created date",name:"created_at",isDate:!0,cell:t=>_(t.created_at)},{title:"download",name:"download_csv",width:100,isDetailHidden:!0}],h={entries:"Post Reports",settings:["export","select","reordering","filter","search","pagination","summary"],keys:{list:"GMB_POST_REPORTS",detail:"GMB_POST_REPORT_DETAIL"},urls:{list:"/post-report/",detail:"/post-report/"},columns:m,path:"/gmb/reports/posts",fixedColumns:{left:["post_id","client_name"],right:["download_csv"]}},g=t=>t.map((e,a)=>({...e,id:`${new Date().getTime()}_${a}`}));export{m as C,h as c,g as f};

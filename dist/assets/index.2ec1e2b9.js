import{j as o,L as r}from"./index.25262899.js";import{m as a,j as l}from"./App.ec46c1b1.js";const c=[{title:"location",name:"location_name",isLink:!0,align:"left",width:180,filterKey:"location__location_name",to:t=>`${a.location.path}/${t==null?void 0:t.location_id}`,cell:t=>{var i;return o(r,{to:`${a.location.path}/${(i=t.location)==null?void 0:i.location_id}`,children:t==null?void 0:t.location.location_name})}},{title:"client",name:"client_name",isLink:!0,align:"left",width:110,filterKey:"location__gmb_account__client__client_name",to:t=>`${a.client.path}/${t.client_id}`,value_compare:t=>{var i,e;return(e=(i=t.location)==null?void 0:i.gmb_account.client)==null?void 0:e.client_id},cell:t=>{var i,e,n,s,m;return o(r,{to:`${a.client.path}/${(e=(i=t.location)==null?void 0:i.gmb_account.client)==null?void 0:e.client_id}`,children:(m=(s=(n=t.location)==null?void 0:n.gmb_account)==null?void 0:s.client)==null?void 0:m.client_name})}},{title:"path",name:"location_report_path",isLink:!0,to:t=>`${a.report.location.path}/details?path=${t.location_report_path}`,summaries:["count"],width:540},{title:"queries direct",name:"queries_direct",align:"right",summaries:["min","max","avg","sum"],isNumber:!0,width:150},{title:"queries chain",name:"queries_chain",align:"right",summaries:["min","max","avg","sum"],isNumber:!0,width:150},{title:"views search",name:"views_search",align:"right",summaries:["min","max","avg","sum"],isNumber:!0,width:150},{title:"views maps",name:"views_maps",align:"right",summaries:["min","max","avg","sum"],isNumber:!0,width:150},{title:"Views search",name:"local_post_views_search",align:"right",summaries:["min","max","avg","sum"],isNumber:!0,width:150},{title:"Actions call to action",name:"local_post_actions_call_to_action",align:"right",summaries:["min","max","avg","sum"],isNumber:!0,width:150},{title:"actions website",name:"actions_website",align:"right",summaries:["min","max","avg","sum"],isNumber:!0,width:150},{title:"actions driving directions",name:"actions_driving_directions",align:"right",summaries:["min","max","avg","sum"],isNumber:!0,width:150},{title:"actions phone",name:"actions_phone",align:"right",summaries:["min","max","avg","sum"],isNumber:!0,width:150},{title:"photos views merchant",name:"photos_views_merchant",align:"right",summaries:["min","max","avg","sum"],isNumber:!0,width:150},{title:"photos views customers",name:"photos_views_customers",align:"right",summaries:["min","max","avg","sum"],isNumber:!0,width:150},{title:"photos count merchant",name:"photos_count_merchant",align:"right",summaries:["min","max","avg","sum"],isNumber:!0,width:150},{title:"photos count customers",name:"photos_count_customers",align:"right",summaries:["min","max","avg","sum"],isNumber:!0,width:150},{title:"report date",name:"report_date",isDate:!0},{title:"update date",name:"updated_at",isDate:!0,cell:t=>l(t.updated_at)},{title:"created date",name:"created_at",isDate:!0,cell:t=>l(t.created_at)},{title:"download",name:"download_csv",width:100,isDetailHidden:!0}],h={entries:"Location Reports",settings:["export","select","reordering","filter","search","pagination","summary"],keys:{list:"GMB_LOCATION_REPORTS",detail:"GMB_LOCATION_REPORT_DETAIL"},urls:{list:"/location-report/",detail:"/location-report/"},columns:c,path:"/gmb/reports/locations",fixedColumns:{left:["location_name","client_name"],right:["download_csv"]}},d=t=>t.map((i,e)=>({...i,id:`${new Date().getTime()}_${e}`}));export{c as C,h as c,d as f};
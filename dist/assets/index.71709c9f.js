import{a0 as l,j as c,a1 as s,X as a}from"./index.efb59a3a.js";const r=[{title:"ID",name:"post_id",isLink:!0,width:210,to:t=>`${l.post.path}/${t.post_id}`},{title:"LOCATION NAME",name:"location_name",isOption:!0,fetchOption:"/location/",optionField:"location_name",mapOptions:t=>t.map(e=>({value:e.location_name,label:e.location_name})),align:"left",isLink:!0,filterKey:"location__location_name",to:t=>`${l.location.path}/${t.location_id}`,value_compare:t=>{var e;return(e=t.location)==null?void 0:e.location_name},width:200,cell:t=>{var e;return c(s,{to:`${l.location.path}/${t.location.location_id}`,children:(e=t.location)==null?void 0:e.location_name})}},{title:"CLIENT NAME",name:"client_name",isOption:!0,fetchOption:"/client/",optionField:"client_name",mapOptions:t=>t.map(e=>({value:e.client_name,label:e.client_name})),isLink:!0,align:"left",width:110,filterKey:"location__gmb_account__client__client_name",to:t=>`${l.client.path}/${t.client_id}`,value_compare:t=>{var e,i,n;return(n=(i=(e=t.location)==null?void 0:e.gmb_account)==null?void 0:i.client)==null?void 0:n.client_id},cell:t=>{var e,i,n,o,m,_;return c(s,{to:`${l.client.path}/${(n=(i=(e=t.location)==null?void 0:e.gmb_account)==null?void 0:i.client)==null?void 0:n.client_id}`,children:(_=(m=(o=t.location)==null?void 0:o.gmb_account)==null?void 0:m.client)==null?void 0:_.client_name})}},{title:"ACTION TYPE",name:"action_type"},{title:"ACTION URL",name:"action_url"},{title:"POST PATH",name:"post_path"},{title:"SEARCH URL",name:"search_url"},{title:"POST STATE",name:"post_state"},{title:"SUMMARY",name:"summary",cell:t=>t.summary&&t.summary.length>50?t.summary.slice(0,50)+"...":t.summary},{title:"TOPIC TYPE",name:"topic_type"},{title:"ALERT TYPE",name:"alert_type"},{title:"MEDIA FORMAT",name:"media_format"},{title:"SOURCE URL",name:"source_url"},{title:"DATA REFERENCE",name:"data_ref"},{title:"EVENT TITLE",name:"event_title"},{title:"START DATE",name:"start_date",isDate:!0,cell:t=>t.start_date&&a(t.start_date)},{title:"START TIME",name:"start_time"},{title:"END DATE",name:"end_date",isDate:!0,cell:t=>t.end_date&&a(t.end_date)},{title:"END TIME",name:"end_time"},{title:"POST CREATE TIME",name:"post_create_time",isDate:!0,cell:t=>a(t.post_create_time)},{title:"POST UPDATE TIME",name:"post_update_time",isDate:!0,cell:t=>a(t.post_update_time)},{title:"COUPON CODE",name:"coupon_code"},{title:"COUNPON URL",name:"coupon_url"},{title:"COUPON TERMS",name:"coupon_terms"}],u={entries:"Posts",settings:["exporting","selecting","reordering","filtering","searching","pagination"],keys:{list:"GMB_POSTS",detail:"GMB_POST_DETAIL",version:"GMB_POST_VERSION"},urls:{list:"/post/",detail:"/post/",version:"/version/"},columns:r,path:"/gmb/accounts",fixedColumns:{left:["post_id"],right:[]}},T=t=>t.map(e=>({...e,summary:e.summary&&e.summary.length>50?`${e.summary.slice(0,50)}...`:e.summary,start_date:e.start_date&&a(e.start_date),end_date:e.end_date&&a(e.end_date),post_create_time:e.post_create_time&&a(e.post_create_time),post_update_time:e.post_update_time&&a(e.post_update_time)}));export{r as C,u as c,T as f};
import{a0 as i,j as l,au as n,X as a}from"./index.4ca943a0.js";const r=[{title:"ID",name:"task_id",isLink:!0,validLink:t=>{let e=!1;return(Object.keys(t.task_input).length>0||Object.keys(t.task_result).length>0||t.task_errors.length>0)&&(e=!0),e},to:t=>`${i.monitoring.task_log.path}/${t.task_id}`,width:100},{title:"TASK NAME",name:"task_name",width:200},{title:"STATUS",name:"task_status",cell:t=>l(n,{color:t.task_status==="light-success"?"light-success":"light-danger",children:t.task_status})},{title:"TASK USER",name:"task_user",width:100},{title:"TASK CLIENT",name:"task_client",width:120},{title:"TASK ACCOUNT",name:"task_account"},{title:"CELERY ID",name:"task_celery_id",width:100},{title:"UPDATED DATE",name:"updated_at",isDate:!0,cell:t=>a(t.updated_at)},{title:"CREATED DATE",name:"created_at",isDate:!0,cell:t=>a(t.created_at)}],o={entries:"Task Logs",settings:["exporting","selecting","reordering","filtering","searching","pagination"],keys:{list:"GMB_MONITORING_TASK_LOGS",detail:"GMB_MONITORING_TASK_LOG_DETAIL"},urls:{list:"/monitoring-task-log/",detail:"/monitoring-task-log/"},columns:r,path:"/gmb/monitoring/task-logs",fixedColumns:{left:["task_name"],right:[]}},c=t=>t.map((e,s)=>({...e,id:`${new Date().getTime()}_${s}`,task_celery_id:e.task_celery&&e.task_celery.task_id||e.task_celery&&e.task_celery.id||""}));export{r as C,o as c,c as f};

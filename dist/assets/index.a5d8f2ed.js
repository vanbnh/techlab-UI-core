import{m as a,j as i}from"./App.ec46c1b1.js";const n=[{title:"id",name:"client_id",isLink:!0,to:t=>`${a.client.path}/${t.client_id}`,width:50},{title:"Name",name:"client_name",isLink:!0,to:t=>`${a.client.path}/${t.client_id}`,width:200},{title:"Update date",name:"updated_at",isDate:!0,cell:t=>t.updated_at&&i(t.updated_at)},{title:"Created date",name:"created_at",isDate:!0,cell:t=>t.created_at&&i(t.created_at)}],s={entries:"Clients",settings:["export","select","reordering","filter","search","pagination"],keys:{list:"GMB_CLIENTS",detail:"GMB_CLIENT_DETAIL"},urls:{list:"/client/",detail:"/client/"},columns:n,path:"/gmb/clients",fixedColumns:{left:["client_id","client_name"],right:[]}},c=t=>t.map(e=>({...e,client_name:e.client_name}));export{n as C,s as c,c as f};

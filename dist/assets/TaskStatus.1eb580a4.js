import{j as t,au as a}from"./index.4ca943a0.js";import{D as o}from"./react-paginate.a771d663.js";const r={success:"success",error:"danger",failed:"secondary",done:"info"},e=({row:s})=>t(a,{color:`light-${r[s.task_status]}`,children:s.task_status}),u=s=>t(o,{for:["task_status"],formatterComponent:e,...s});export{u as T};

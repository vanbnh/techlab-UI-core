import{j as t,B as a}from"./index.25262899.js";import{D as o}from"./index.51db54c0.js";const r={success:"success",error:"danger",failed:"secondary",done:"info"},e=({row:s})=>t(a,{color:`light-${r[s.task_status]}`,children:s.task_status}),d=s=>t(o,{for:["task_status"],formatterComponent:e,...s});export{d as T};
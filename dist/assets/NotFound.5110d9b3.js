import{bk as O,r as N,a1 as D,j as n,ag as _,a as u,bl as P,bm as C,L as F,al as j,aq as T,ar as z,a7 as H,ac as R,K as q}from"./index.25262899.js";import{u as G}from"./useQuery.1bfa0df2.js";const I=(t,s,a=!1)=>s.reduce((l,i)=>{let o="";return i.cell?o=i.cell(t):o=t[i.name],i.value_compare&&a&&(o=i.value_compare(t)),i.isDetailHidden||(l[i.title]=o),l},{});function U({columns:t,key:s,url:a,params:l}){const{id:i}=O(),[o,m]=N.exports.useState(null),[p,h]=N.exports.useState(!1),{data:e,isLoading:y,isError:g}=G([s,i,l],async()=>{let c=null;if(l){const r=await D.get(`${a}details/`,{params:l}).then(b=>b.data);r&&(c=r.data)}else{const r=await D.get(`${a}${i}/`).then(b=>b.data);r&&(c=r.data)}return c});return N.exports.useEffect(()=>{if(e){e.updated_at||(e.updated_at=e.created_at);const c=I(e,t);m(c)}},[e]),N.exports.useEffect(()=>{g&&h(!0)},[g]),{detail:o,data:e,isLoading:y,notFound:p}}const V=({data:t})=>{const{parentName:s,parentTo:a,activeName:l}=t;return t?n(_,{children:u(P,{className:"breadcrumb-chevron",children:[n(C,{children:n(F,{to:"/",children:" Home "})}),n(C,{children:u(F,{to:a,children:[" ",s," "]})}),n(C,{active:!0,children:u("span",{children:[" ",l," "]})})]})}):null},K=j.createContext({}),A=!0;function M({baseColor:t,highlightColor:s,width:a,height:l,borderRadius:i,circle:o,direction:m,duration:p,enableAnimation:h=A}){const e={};return m==="rtl"&&(e["--animation-direction"]="reverse"),typeof p=="number"&&(e["--animation-duration"]=`${p}s`),h||(e["--pseudo-element-display"]="none"),(typeof a=="string"||typeof a=="number")&&(e.width=a),(typeof l=="string"||typeof l=="number")&&(e.height=l),(typeof i=="string"||typeof i=="number")&&(e.borderRadius=i),o&&(e.borderRadius="50%"),typeof t<"u"&&(e["--base-color"]=t),typeof s<"u"&&(e["--highlight-color"]=s),e}function w({count:t=1,wrapper:s,className:a,containerClassName:l,containerTestId:i,circle:o=!1,style:m,...p}){var h,e,y;const g=j.useContext(K),c={...p};for(const[d,f]of Object.entries(p))typeof f>"u"&&delete c[d];const r={...g,...c,circle:o},b={...m,...M(r)};let S="react-loading-skeleton";a&&(S+=` ${a}`);const E=(h=r.inline)!==null&&h!==void 0?h:!1,v=[],k=Math.ceil(t);for(let d=0;d<k;d++){let f=b;if(k>t&&d===k-1){const x=(e=f.width)!==null&&e!==void 0?e:"100%",B=t%1,L=typeof x=="number"?x*B:`calc(${x} * ${B})`;f={...f,width:L}}const $=n("span",{className:S,style:f,children:"\u200C"},d);E?v.push($):v.push(u(_,{children:[$,n("br",{})]}))}return n("span",{className:l,"data-testid":i,"aria-live":"polite","aria-busy":(y=r.enableAnimation)!==null&&y!==void 0?y:A,children:s?v.map((d,f)=>n(s,{children:d},f)):v})}const W=({rows:t=4})=>n(T,{children:n(z,{children:n("table",{className:"table table-modern",children:n("tbody",{children:Array.from({length:t+2>10?10:t+2}).map((s,a)=>u("tr",{children:[n("td",{className:"fw-bold",children:n(w,{height:20})}),n("td",{children:n(w,{height:20})})]},a))})})})}),X=({id:t,to:s})=>{const a=H();return u(_,{children:[u(R,{color:"dark",children:[n("h4",{className:"alert-heading",children:"Not Found"}),u("div",{className:"alert-body",children:["Can not find the detail you are looking for (id :",t,"). Please try again later."]})]}),n(q.Ripple,{color:"secondary",outline:!0,onClick:()=>a(s),children:"Go back"})]})};export{V as B,W as C,X as N,U as u};

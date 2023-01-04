"use strict";(globalThis.webpackChunkwoo_product_tabs=globalThis.webpackChunkwoo_product_tabs||[]).push([[71],{451:(e,t,a)=>{a.d(t,{o:()=>o});var l=a(307);a(362),a(666),a(387);const o=(0,l.createContext)(window.wptAppLocalizer)},489:(e,t,a)=>{a.r(t),a.d(t,{default:()=>d});var l=a(307),o=a(387),s=a(845),r=a(451),c=a(413),n=a(310);const m=a.p+"images/setting-1.1c754862.png",u=a.p+"images/setting-2.5f0d2be0.png",i=a.p+"images/setting-3.5fc6fc9f.png",d=()=>{const e=(0,l.useContext)(r.o),__=wp.i18n.__,t=(0,o.v9)((e=>e.settings)),a=(0,o.I0)(),[d,p]=(0,l.useState)(""),[b,g]=(0,l.useState)(""),[w,h]=(0,l.useState)(!1),[E,f]=(0,l.useState)(null),[y,N]=(0,l.useState)(null);return(0,l.useEffect)((()=>{(async()=>{if(t.consumer_key&&t.consumer_secret)return p(t.consumer_key),void g(t.consumer_secret);h(!0),await fetch(`${e.apiURL}/wpt/v1/settings`).then((e=>e.json())).then((e=>{if(!e.data.consumer_key||!e.data.consumer_secret)throw new Error("error");a((0,s.zQ)(e.data)),p(e.data.consumer_key),g(e.data.consumer_secret)})).catch((e=>console.log(e))),h(!1)})()}),[]),(0,l.createElement)("div",{className:"w-full max-w-4xl mx-auto"},(0,l.createElement)("h1",{className:"!text-xl font-semibold py-4"},__("Let's get you started 🚀","woo-product-tab")),(0,l.createElement)("div",{className:"mt-4"},(0,l.createElement)("div",{className:"relative"},(0,l.createElement)("div",{className:"w-full bg-white rounded shadow p-4 space-y-4"},(0,l.createElement)("div",null,(0,l.createElement)("span",{className:"text-gray-800"},__("You need to set up a consumer key for your plugin","woo-product-tab"))),(0,l.createElement)("h1",{className:"font-semibold"},__("1. Create woocommere rest api key","woo-product-tab")),(0,l.createElement)("p",null,__("Go to the following link","woo-product-tab")," ",(0,l.createElement)("a",{href:e.adminURL+"admin.php?page=wc-settings&tab=advanced&section=keys",target:"_blank",className:"text-blue-600"},__("Woo setting","woo-product-tab"))," ",__("to create rest api key","woo-product-tab")),(0,l.createElement)("div",{className:"slide"},(0,l.createElement)(c.tq,{spaceBetween:50,slidesPerView:1.2,onSlideChange:()=>console.log("slide changes"),pagination:{clickable:!0,renderBullet:function(e,t){return'<span class="'+t+'">'+(e+1)+"</span>"}},navigation:!0,modules:[n.tl,n.W_],className:"started-slide"},(0,l.createElement)(c.o5,{className:"h-auto"},(0,l.createElement)("div",{className:"w-full h-full border-2 rounded border-rose-600"},(0,l.createElement)("img",{src:m,alt:"",className:"block"}),(0,l.createElement)("div",{className:"p-2"},(0,l.createElement)("p",null,"- ",__("Step 1 click add key at the woocommerce setting page as shown","woo-product-tab"))))),(0,l.createElement)(c.o5,{className:"h-auto"},(0,l.createElement)("div",{className:"w-full h-full border-2 rounded border-rose-600"},(0,l.createElement)("img",{src:u,alt:"",className:"block"}),(0,l.createElement)("div",{className:"p-2"},(0,l.createElement)("p",null,"- ",__("Enter any description for your plugin","woo-product-tab")),(0,l.createElement)("p",null,"- ",__("Select the account you are logged in with","woo-product-tab")),(0,l.createElement)("p",null,"- ",__("Select Permissions is Read or Read/Write","woo-product-tab")),(0,l.createElement)("p",{className:"text-blue-600"},__("Chose Generate API key","woo-product-tab"))))),(0,l.createElement)(c.o5,{className:"h-auto"},(0,l.createElement)("div",{className:"w-full h-full border-2 rounded border-rose-600"},(0,l.createElement)("img",{src:i,alt:"",className:"block"}),(0,l.createElement)("div",{className:"p-2"},(0,l.createElement)("p",null,"- ",__("Coppy Consumer key and Consumer secret and paste into the form below","woo-product-tab")),(0,l.createElement)("p",{className:"text-red-600"},"* ",__("Do not close the page before copying (Consumer key and Consumer secret only shows up once when creating)","woo-product-tab"))))))),(0,l.createElement)("h1",{className:"font-semibold"},__("2. Save woocommere rest api key","woo-product-tab")),(0,l.createElement)("p",null,__("Coppy Consumer key and Consumer secret and paste into the form","woo-product-tab")),(0,l.createElement)("div",{className:"relative"},(0,l.createElement)("div",{className:"mb-6"},(0,l.createElement)("label",{htmlFor:"consumer_key",className:"block mb-2 text-sm text-gray-900 font-semibold capitalize"},"consumer_key"),(0,l.createElement)("input",{type:"text",id:"consumer_key",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",placeholder:"consumer_key",value:d,onChange:e=>p(e.target.value),required:!0})),(0,l.createElement)("div",{className:"mb-6"},(0,l.createElement)("label",{htmlFor:"consumer_secret",className:"block mb-2 text-sm text-gray-900 font-semibold capitalize"},"consumer_secret"),(0,l.createElement)("input",{type:"text",id:"consumer_secret",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",placeholder:"consumer_secret",value:b,onChange:e=>g(e.target.value),required:!0})),E?(0,l.createElement)("div",{className:"mt-6"},(0,l.createElement)("span",{className:"text-red-600"},E)):null,y?(0,l.createElement)("div",{className:"mt-6"},(0,l.createElement)("span",{className:"text-green-600"},y)):null,(0,l.createElement)("button",{onClick:t=>{t.preventDefault(),h(!0),f(null),N(null);let l=new FormData;l.append("consumer_key",d||""),l.append("consumer_secret",b||""),fetch(`${e.apiURL}/wpt/v1/settings`,{method:"post",body:l}).then((e=>e.json())).then((e=>{if(500==e.status)throw e;a((0,s.zQ)(e.data)),N("Mission complete")})).catch((e=>{f(e.text)})).finally((()=>{h(!1)}))},type:"submit",className:"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"},"Submit"),w?(0,l.createElement)("div",{className:"absolute w-full h-full top-0 left-0 grid place-items-center bg-white/30"},(0,l.createElement)("span",{className:"block text-green-500 animate-spin"},(0,l.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",style:{fill:"currentcolor"}},(0,l.createElement)("path",{d:"M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"})))):null)))))}}}]);
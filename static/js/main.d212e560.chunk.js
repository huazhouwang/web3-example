(this.webpackJsonpethereum_utils=this.webpackJsonpethereum_utils||[]).push([[0],{164:function(e,n){},192:function(e,n){},194:function(e,n){},209:function(e,n){},230:function(e,n){},232:function(e,n){},255:function(e,n){},265:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),s=t(18),i=t.n(s),c=t(313),o=t(74),u=t(148),l=t(10),b=Object(o.b)("NETWORK"),p=window.ethereum;p&&(p.autoRefreshOnNetworkChange=!1);var g=function(e){return new c.a(e,"number"===typeof e.chainId?e.chainId:"string"===typeof e.chainId?parseInt(e.chainId):"any")},m=new u.a({}),d=function(e){var n=e.children;return Object(l.jsx)(o.a,{getLibrary:g,children:Object(l.jsx)(b,{getLibrary:g,children:n})})},h=t(70),f=t(304),y=t(310),v=t(311),C=t(312),j=t(305),B=t(266),x=t(41),O=t(100),F=t(3),M=t.n(F),w=t(33),D=t(314),E=t(321),_=t(322),S=t(316),I=t(309),P=t(318),k=t(319),A=Object(k.a)("div")({display:"flex",flexDirection:"column"}),T=Object(k.a)("div")({display:"flex",flexDirection:"row"}),H=function(e){var n=e.width,t=e.height;return Object(l.jsx)("div",{style:{width:n,height:t}})},W=t(34),J=t(315),N=t(147),G=t.n(N),L=(t(262),t(263),Object(f.a)((function(e){return{options:{justifyContent:"flex-end",alignItems:"center",margin:e.spacing(3,0,1)},caseGroup:{flexWrap:"wrap",padding:0,marginBottom:e.spacing(1),"& > *":{margin:e.spacing(.5)}},bottomButtonGroup:{justifyContent:"flex-end",padding:0}}}))),R=function(e){var n=e.methodOptions,t=e.selectedMethod,r=e.onMethodSelected,s=e.cases,i=e.checkIsTargetMessage,c=e.hashMessage,o=e.isWalletEnabled,u=e.connectedAccount,b=e.connectWallet,p=e.onSign,g=e.preferJsonStringMessage,m=L(),d=Object(a.useState)(""),h=Object(x.a)(d,2),f=h[0],y=h[1],v=Object(a.useState)(""),C=Object(x.a)(v,2),B=C[0],F=C[1],k=Object(a.useState)(""),N=Object(x.a)(k,2),R=N[0],z=N[1],K=Object(a.useState)(!0),U=Object(x.a)(K,2),V=U[0],q=U[1],Y=Object(a.useState)(),Q=Object(x.a)(Y,2),X=Q[0],Z=Q[1],$=Object(a.useCallback)(function(){var e=Object(w.a)(M.a.mark((function e(n){var t;return M.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!n||!i(n)){e.next=7;break}return e.next=4,c(n);case 4:t=e.sent,n=g?Object(W.e)(n):n,Object(W.b)(t)?(F(t),q(!1)):q(!0);case 7:e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),q(!0),console.error("Error in hashing message",e.t0);case 13:y(n),z("");case 15:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(n){return e.apply(this,arguments)}}(),[g,i,c]),ee=Object(a.useCallback)(Object(w.a)(M.a.mark((function e(){var n;return M.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p(f);case 3:n=e.sent,z(n),console.log("signature: ",n),n&&Object(W.c)(n)?Z({isOpening:!0,isPositive:!0,message:"Signed successfully"}):Z({isOpening:!0,isPositive:!1,message:"Invalid signature"}),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),console.error("Error in signing message",e.t0),Z({isOpening:!0,isPositive:!1,message:"object"===typeof e.t0?"Error in signing: \n".concat(JSON.stringify(e.t0,void 0,2)):"Something wrong"});case 13:case"end":return e.stop()}}),e,null,[[0,9]])}))),[f,p]);return Object(a.useEffect)((function(){s[0].value&&$(s[0].value)}),[s,$]),console.log("snackBarState: ",X),Object(l.jsxs)(l.Fragment,{children:[Object(l.jsxs)(A,{style:{padding:0},children:[Object(l.jsx)(j.a,{component:"h1",variant:"h4",align:"center",children:"Message"}),Object(l.jsx)(T,{className:m.options,children:Object(l.jsx)(D.a,{value:t,onChange:function(e){return r(e.target.value)},children:n.map((function(e){return Object(l.jsx)(E.a,{value:e,children:e},e)}))})}),Object(l.jsxs)(A,{children:[Object(l.jsx)(T,{className:m.caseGroup,children:s.map((function(e,n){return Object(l.jsx)(_.a,{size:"small",label:e.name,onClick:function(){return function(e){var n=s[e].value;y(n),$(n).catch(console.error)}(n)}},e.name)}))}),Object(l.jsx)(G.a,{width:"100%",fontSize:14,name:"message_editor",placeholder:"Input Message Here",mode:"json",theme:"tomorrow_night_eighties",showGutter:!1,wrapEnabled:!0,showPrintMargin:!0,highlightActiveLine:!0,enableBasicAutocompletion:!0,enableLiveAutocompletion:!0,tabSize:2,value:f,onChange:$}),Object(l.jsx)(H,{height:10}),Object(l.jsx)(S.a,{id:"message_hash",variant:"outlined",value:B,label:"Message Hash"}),Object(l.jsx)(H,{height:10}),Object(l.jsx)(S.a,{id:"signature",variant:"outlined",value:R,label:"Signature"}),Object(l.jsx)(H,{height:10}),Object(l.jsxs)(T,{className:m.bottomButtonGroup,children:[Object(l.jsx)(I.a,{variant:"contained",color:"primary",disabled:o,onClick:b,children:o&&u?"".concat(u.slice(0,4),"...").concat(u.slice(-4)):"Connect"}),Object(l.jsx)(H,{width:16}),Object(l.jsx)(I.a,{variant:"contained",color:"secondary",disabled:V||!o,onClick:ee,children:"SIGN"})]})]},"content_of_".concat(t))]}),Object(l.jsx)(P.a,{anchorOrigin:{vertical:"top",horizontal:"center"},open:(null===X||void 0===X?void 0:X.isOpening)||!1,autoHideDuration:3e3,onClose:function(){return Z((function(e){return Object(O.a)(Object(O.a)({},e),{},{isOpening:!1})}))},children:Object(l.jsx)(J.a,{severity:(null===X||void 0===X?void 0:X.isPositive)?"success":"error",children:null===X||void 0===X?void 0:X.message})})]})},z=t(35),K=t(51),U='{"types":{"EIP712Domain":[{"name":"name","type":"string"},{"name":"version","type":"string"},{"name":"chainId","type":"uint256"},{"name":"verifyingContract","type":"address"}],"Person":[{"name":"name","type":"string"},{"name":"wallet","type":"address"}],"Mail":[{"name":"from","type":"Person"},{"name":"to","type":"Person"},{"name":"contents","type":"string"}]},"primaryType":"Mail","domain":{"name":"Ether Mail","version":"1","chainId":1,"verifyingContract":"0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC"},"message":{"from":{"name":"Cow","wallet":"0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826"},"to":{"name":"Bob","wallet":"0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB"},"contents":"Hello, Bob!"}}',V='{"types":{"EIP712Domain":[{"name":"name","type":"string"},{"name":"version","type":"string"},{"name":"chainId","type":"uint256"},{"name":"verifyingContract","type":"address"}],"Person":[{"name":"name","type":"string"},{"name":"wallet","type":"address"}],"Mail":[{"name":"from","type":"Person"},{"name":"to","type":"Person"},{"name":"contents","type":"string"},{"name":"payload","type":"bytes"}]},"primaryType":"Mail","domain":{"name":"Ether Mail","version":"1","chainId":1,"verifyingContract":"0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC"},"message":{"from":{"name":"Cow","wallet":"0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826"},"to":{"name":"Bob","wallet":"0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB"},"contents":"Hello, Bob!","payload":"0x25192142931f380985072cdd991e37f65cf8253ba7a0e675b54163a1d133b8ca"}}',q='{"types":{"EIP712Domain":[{"name":"name","type":"string"},{"name":"version","type":"string"},{"name":"chainId","type":"uint256"},{"name":"verifyingContract","type":"address"}],"Person":[{"name":"name","type":"string"},{"name":"mother","type":"Person"},{"name":"father","type":"Person"}]},"domain":{"name":"Family Tree","version":"1","chainId":1,"verifyingContract":"0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC"},"primaryType":"Person","message":{"name":"Jon","mother":{"name":"Lyanna","father":{"name":"Rickard"}},"father":{"name":"Rhaegar","father":{"name":"Aeris II"}}}}',Y={eth_sign:{name:"eth_sign",cases:[{name:"Demo 1",value:"0x0000000000000000000000000000000000000000000000000000000000000000"},{name:"Demo 2",value:"0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"}],checkIsTargetMessage:W.b,hashMessage:function(){var e=Object(w.a)(M.a.mark((function e(n){return M.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",Promise.resolve(n));case 1:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),signMessage:function(e,n){var t=e.account;return e.library.getSigner(t).provider.provider.send("eth_sign",[t,n]).then((function(e){return e.result}))}},personal_sign:{name:"personal_sign",cases:[{name:"Hello OneKey",value:"Hello OneKey"},{name:"To Da Moon",value:"To Da Moon"}],checkIsTargetMessage:function(e){return"string"===typeof e&&e.length>0},hashMessage:function(){var e=Object(w.a)(M.a.mark((function e(n){return M.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",z.addHexPrefix(z.hashPersonalMessage(z.toBuffer(n)).toString("hex")));case 1:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),signMessage:function(e,n){var t=e.account;return e.library.getSigner(t).signMessage(n)}},typed_data_sign:{name:"typed_data_sign",cases:[{name:"Single Value",value:'[{"type":"string","name":"message","value":"Hi, Alice!"}]'},{name:"Multiple values",value:'[{"type":"string","name":"message","value":"Hi, Alice!"},{"type":"uint8","name":"value","value":10}]'},{name:"With bytes",value:'[{"type":"bytes","name":"message","value":"0xdeadbeaf"}]'}],preferJsonStringMessage:!0,checkIsTargetMessage:W.a,hashMessage:function(){var e=Object(w.a)(M.a.mark((function e(n){return M.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",z.addHexPrefix(K.typedSignatureHash(JSON.parse(n))));case 1:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),signMessage:function(e,n){var t=e.account,a=e.library;return a.provider.send("eth_signTypedData",a.provider.isMetaMask?[JSON.parse(n),t]:[t,n]).then((function(e){return e.result}))}},typed_data_sign_v1:{name:"typed_data_sign_v1",cases:[{name:"Single Value",value:'[{"type":"string","name":"message","value":"Hi, Alice!"}]'},{name:"Multiple values",value:'[{"type":"string","name":"message","value":"Hi, Alice!"},{"type":"uint8","name":"value","value":10}]'},{name:"With bytes",value:'[{"type":"bytes","name":"message","value":"0xdeadbeaf"}]'}],preferJsonStringMessage:!0,checkIsTargetMessage:W.a,hashMessage:function(){var e=Object(w.a)(M.a.mark((function e(n){return M.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",z.addHexPrefix(K.typedSignatureHash(JSON.parse(n))));case 1:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),signMessage:function(e,n){var t=e.account;return e.library.provider.send("eth_signTypedData_v1",[t,n]).then((function(e){return e.result}))}},typed_data_sign_v3:{name:"typed_data_sign_v3",cases:[{name:"Demo",value:U},{name:"With bytes",value:V},{name:"With recursive types",value:q}],preferJsonStringMessage:!0,checkIsTargetMessage:W.d,hashMessage:function(){var e=Object(w.a)(M.a.mark((function e(n){return M.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",z.addHexPrefix(K.TypedDataUtils.sign(JSON.parse(n)).toString("hex")));case 1:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),signMessage:function(e,n){var t=e.account;return e.library.provider.send("eth_signTypedData_v3",[t,n]).then((function(e){return e.result}))}},typed_data_sign_v4:{name:"typed_data_sign_v4",cases:[{name:"Demo",value:U},{name:"With bytes",value:V},{name:"With recursive types",value:q},{name:"With array",value:'{"types":{"EIP712Domain":[{"name":"name","type":"string"},{"name":"version","type":"string"},{"name":"chainId","type":"uint256"},{"name":"verifyingContract","type":"address"}],"Person":[{"name":"name","type":"string"},{"name":"wallets","type":"address[]"}],"Mail":[{"name":"from","type":"Person"},{"name":"to","type":"Person[]"},{"name":"contents","type":"string"}],"Group":[{"name":"name","type":"string"},{"name":"members","type":"Person[]"}]},"domain":{"name":"Ether Mail","version":"1","chainId":1,"verifyingContract":"0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC"},"primaryType":"Mail","message":{"from":{"name":"Cow","wallets":["0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826","0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF"]},"to":[{"name":"Bob","wallets":["0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB","0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57","0xB0B0b0b0b0b0B000000000000000000000000000"]}],"contents":"Hello, Bob!"}}'},{name:"With 2D array",value:'{"types":{"EIP712Domain":[{"name":"name","type":"string"},{"name":"version","type":"string"},{"name":"chainId","type":"uint256"},{"name":"verifyingContract","type":"address"}],"Person":[{"name":"name","type":"string"},{"name":"wallets","type":"address[]"},{"name":"logo_matrix","type":"int[][]"}],"Mail":[{"name":"from","type":"Person"},{"name":"to","type":"Person[]"},{"name":"contents","type":"string"}],"Group":[{"name":"name","type":"string"},{"name":"members","type":"Person[]"}]},"domain":{"name":"Ether Mail","version":"1","chainId":1,"verifyingContract":"0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC"},"primaryType":"Mail","message":{"from":{"name":"Cow","wallets":["0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826","0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF"],"logo_matrix":[[0,255],[-255,-1]]},"to":[{"name":"Bob","wallets":["0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB","0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57","0xB0B0b0b0b0b0B000000000000000000000000000"],"logo_matrix":[[0,0],[0,0]]}],"contents":"Hello, Bob!"}}'}],preferJsonStringMessage:!0,checkIsTargetMessage:W.d,hashMessage:function(){var e=Object(w.a)(M.a.mark((function e(n){return M.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",z.addHexPrefix(K.TypedDataUtils.sign(JSON.parse(n),!0).toString("hex")));case 1:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),signMessage:function(e,n){var t=e.account;return e.library.provider.send("eth_signTypedData_v4",[t,n]).then((function(e){return e.result}))}}},Q=function(){var e=Object(o.c)(),n=e.active,t=e.activate,r=e.account,s=Object(a.useState)("eth_sign"),i=Object(x.a)(s,2),c=i[0],u=i[1],b=Y[c||"eth_sign"],p=Object(a.useCallback)((function(n){return b.signMessage(e,n)}),[e,b]);return Object(l.jsx)(R,{isWalletEnabled:n,connectedAccount:r,connectWallet:function(){return t(m)},methodOptions:Object.keys(Y),selectedMethod:c,onMethodSelected:u,cases:b.cases,preferJsonStringMessage:b.preferJsonStringMessage,hashMessage:b.hashMessage,checkIsTargetMessage:b.checkIsTargetMessage,onSign:p})},X=Object(f.a)((function(e){return{appBar:{color:"default",position:"relative"},main:Object(h.a)({width:"auto",marginLeft:e.spacing(1),marginRight:e.spacing(1)},e.breakpoints.up(800+2*e.spacing(2)),{width:800,marginLeft:"auto",marginRight:"auto"}),paper:Object(h.a)({marginTop:e.spacing(3),marginBottom:e.spacing(3),padding:e.spacing(2)},e.breakpoints.up(600+2*e.spacing(3)),{marginTop:e.spacing(6),marginBottom:e.spacing(6),padding:e.spacing(5)})}})),Z=function(){var e=X();return Object(l.jsxs)(r.a.Fragment,{children:[Object(l.jsx)(y.a,{}),Object(l.jsx)(v.a,{className:e.appBar,children:Object(l.jsx)(C.a,{children:Object(l.jsx)(j.a,{variant:"h6",color:"inherit",noWrap:!0,children:"Ethereum Utils"})})}),Object(l.jsx)("main",{className:e.main,children:Object(l.jsx)(B.a,{className:e.paper,children:Object(l.jsx)(Q,{})})})]})};i.a.render(Object(l.jsx)(r.a.StrictMode,{children:Object(l.jsx)(d,{children:Object(l.jsx)(Z,{})})}),document.getElementById("root"))},34:function(e,n,t){"use strict";(function(e){t.d(n,"b",(function(){return r})),t.d(n,"c",(function(){return s})),t.d(n,"a",(function(){return i})),t.d(n,"d",(function(){return c})),t.d(n,"e",(function(){return o}));var a=t(51),r=function(n){if("string"===typeof n&&n.startsWith("0x")&&66===n.length)try{return 32===e.from(n.slice(2),"hex").length}catch(t){console.error(t)}return!1},s=function(n){if("string"==typeof n&&n.startsWith("0x")&&132===n.length)try{return 65===e.from(n.slice(2),"hex").length}catch(t){console.error(t)}return!1},i=function(e){if("string"===typeof e&&e.startsWith("[")&&e.endsWith("]"))try{var n=JSON.parse(e);if(Array.isArray(n))return n.every((function(e){return"object"===typeof e&&"string"===typeof e.type&&"string"==typeof e.name&&void 0!==e.value}))}catch(t){console.error(t)}return!1},c=function(e){if("string"===typeof e&&e.startsWith("{")&&e.endsWith("}"))try{var n=JSON.parse(e);if("object"===typeof n)return a.TYPED_MESSAGE_SCHEMA.required.every((function(e){return!!n[e]}))}catch(t){console.error(t)}return!1},o=function(e){if(e)try{var n=JSON.parse(e);return JSON.stringify(n,void 0,2)}catch(t){}return e}}).call(this,t(15).Buffer)}},[[265,1,2]]]);
//# sourceMappingURL=main.d212e560.chunk.js.map
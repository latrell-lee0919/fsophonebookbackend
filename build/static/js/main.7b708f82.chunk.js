(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{41:function(e,n,t){},42:function(e,n,t){"use strict";t.r(n);var c=t(1),r=t(17),a=t.n(r),u=t(8),o=t(3),i=t(0),s=function(e){return Object(i.jsx)("div",{children:Object(i.jsxs)("div",{children:[e.name," ",e.number,Object(i.jsx)("button",{onClick:e.removePerson,children:"delete"})]})})},d=function(e){return Object(i.jsxs)("div",{children:["filter shown with ",Object(i.jsx)("input",{value:e.newFilter,onChange:e.handleFilterChange})]})},l=function(e){return Object(i.jsx)("div",{children:Object(i.jsxs)("form",{onSubmit:e.addName,children:[Object(i.jsxs)("div",{children:["name: ",Object(i.jsx)("input",{value:e.newName,onChange:e.handleNameChange})]}),Object(i.jsxs)("div",{children:["number: ",Object(i.jsx)("input",{value:e.newNumber,onChange:e.handleNumberChange})]}),Object(i.jsx)("div",{children:Object(i.jsx)("button",{type:"submit",children:"add"})})]})})},j=t(4),b=t.n(j),h="/api/persons",m=function(){return b.a.get(h).then((function(e){return e.data}))},f=function(e){return b.a.post(h,e).then((function(e){return e.data}))},O=function(e,n){return b.a.put("".concat(h,"/").concat(e),n).then((function(e){return e.data}))},v=function(e){return b.a.delete("".concat(h,"/").concat(e)).then((function(e){return e}))},x=function(e){var n=e.message;return null===n?null:Object(i.jsx)("div",{className:"success",children:n})},p=function(e){var n=e.message;return null===n?null:Object(i.jsx)("div",{className:"error",children:n})},g=function(){var e=Object(c.useState)([]),n=Object(o.a)(e,2),t=n[0],r=n[1],a=Object(c.useState)(""),j=Object(o.a)(a,2),b=j[0],h=j[1],g=Object(c.useState)(""),w=Object(o.a)(g,2),N=w[0],C=w[1],k=Object(c.useState)(""),S=Object(o.a)(k,2),y=S[0],F=S[1],P=Object(c.useState)(null),T=Object(o.a)(P,2),A=T[0],D=T[1],E=Object(c.useState)(null),I=Object(o.a)(E,2),J=I[0],U=I[1];Object(c.useEffect)((function(){m().then((function(e){r(e)}))}),[]);return Object(i.jsxs)("div",{children:[Object(i.jsx)("h2",{children:"Phonebook"}),Object(i.jsx)(x,{message:A}),Object(i.jsx)(p,{message:J}),Object(i.jsx)(d,{newFilter:y,handleFilterChange:function(e){F(e.target.value)}}),Object(i.jsx)("h3",{children:"Add a new"}),Object(i.jsx)(l,{addName:function(e){e.preventDefault();for(var n={name:b,number:N},c=!1,a=0;a<t.length;a++)t[a].name===n.name&&(window.alert("".concat(b," is already added to phonebook, replace the old number with a new one?")),c=!0);if(c){var o=t.find((function(e){return e.name===n.name})),i=o.id,s=Object(u.a)(Object(u.a)({},o),{},{number:N});O(o.id,s).then((function(e){r(t.map((function(n){return n.id!==i?n:e})))})).catch((function(e){U("Information for ".concat(n.name," has already been removed from server")),setTimeout((function(){U(null)}),5e3),h(""),C("")}))}c||f(n).then((function(e){r(t.concat(e)),D("Added ".concat(n.name)),setTimeout((function(){D(null)}),5e3),h(""),C("")})).catch((function(e){var n=e.response.data;U(n.error),setTimeout((function(){U(null)}),5e3),h(""),C("")}))},newName:b,handleNameChange:function(e){h(e.target.value)},newNumber:N,handleNumberChange:function(e){C(e.target.value)}}),Object(i.jsx)("h2",{children:"Numbers"}),Object(i.jsx)("div",{children:t.filter((function(e){return e.name.toUpperCase().includes(y.toUpperCase())})).map((function(e){return Object(i.jsx)(s,{name:e.name,number:e.number,removePerson:function(){return function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Delete ".concat(n.name,"?"))&&(console.log("removing ".concat(n.name)),v(e).then((function(e){return m()})).then((function(e){return r(e)})))}(e.id)}},e.id)}))})]})};t(41);a.a.render(Object(i.jsx)(g,{}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.7b708f82.chunk.js.map
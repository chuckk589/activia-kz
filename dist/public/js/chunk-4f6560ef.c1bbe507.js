(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4f6560ef"],{2837:function(e,t,l){"use strict";l.r(t);var a=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",[l("CExtendedModal",{attrs:{vis:e.modalConfig.show,mData:e.modalConfig.data},on:{"modal-closed":function(t){return e.closeModalHandler()}}}),l("CDataTable",{attrs:{items:e.items,fields:e.fields,"column-filter":"",sorter:"",pagination:"",itemsPerPageSelect:""},scopedSlots:e._u([{key:"credentials",fn:function(t){var a=t.item;return[l("td",[e._v(e._s(a.credentials||"Не указано"))])]}},{key:"promo",fn:function(t){var a=t.item;return[l("td",[e._v(e._s(a.promo||"Не указано"))])]}},{key:"registered",fn:function(t){var a=t.item;return[l("td",[e._v(e._s(a.registered?"Да":"Нет"))])]}},{key:"locale",fn:function(t){var a=t.item;return[l("td",[e._v(e._s(e.locale(a.locale)))])]}},{key:"role",fn:function(t){var a=t.item;return[l("td",[e._v(e._s(e.role(a.role)))])]}},{key:"over-table",fn:function(){return[l("CLink",{staticClass:"btn btn-primary mb-2 btn-sm",attrs:{href:e.getCurrentItems,download:"table-data.csv",target:"_blank"}},[e._v("Скачать (.csv)")])]},proxy:!0},{key:"action",fn:function(t){var a=t.item;return[l("td",[l("CDropdown",{staticClass:"m-2",attrs:{"toggler-text":"Действия",size:"sm",color:"primary"}},[l("CDropdownItem",{on:{click:function(t){return e.editUser(a)}}},[e._v("Изменить")])],1)],1)]}}])})],1)},o=[],n=l("b33f"),r={name:"Users",components:{CExtendedModal:n["a"]},data:function(){return{modalConfig:{show:!1,data:{}},items:[],fields:[{key:"id",label:"Id"},{key:"chatId",label:"Telegram Id"},{key:"city",label:"Город"},{key:"credentials",label:"Имя"},{key:"locale",label:"Язык"},{key:"phone",label:"Номер"},{key:"promo",label:"Промо"},{key:"role",label:"Роль"},{key:"registered",label:"Регистрация пройдена"},{key:"createdAt",label:"Дата регистрации"},{key:"action",label:"",filter:!1,sorter:!1}]}},mounted:function(){var e=this;this.$http({method:"GET",url:"/v1/user/"}).then((function(t){e.items=t.data}))},computed:{getCurrentItems:function(){var e=this.fields.filter((function(e){return e.label})).map((function(e){return e.label})).join(","),t="data:text/csv;charset=utf-8,"+e+"%0A"+encodeURIComponent(this.items.map((function(e){return"".concat(e.id,",").concat(e.chatId,",").concat(e.city,",").concat(e.credentials,",").concat(e.locale,",").concat(e.phone,",").concat(e.promo,",").concat(e.role,",").concat(e.registered?"Да":"Нет",",").concat(e.createdAt)})).join("\n"));return t}},methods:{locale:function(e){return"ru"==e?"Русский":"Узбекский"},role:function(e){return"user"==e?"Пользователь":"Администратор"},closeModalHandler:function(){var e=this;if("edit"==this.modalConfig.data.type){var t=this.modalConfig.data.fields.reduce((function(t,l){return t[l.key]=l.value,e.modalConfig.data.cur[l.key]=l.value,t}),{});this.$http({method:"PUT",url:"/v1/user/".concat(this.modalConfig.data.cur.id),data:t})}},editUser:function(e){var t,l;this.modalConfig.data={cur:e,fields:[{key:"city",label:"Город",select:this.$ctable.cities,value:null===(t=this.$ctable.cities.find((function(t){return t.label==e.city})))||void 0===t?void 0:t.value},{key:"credentials",label:"Имя",value:e.credentials},{key:"locale",label:"Язык",select:this.$ctable.locales,value:e.locale},{key:"phone",label:"Номер",value:e.phone},{key:"role",label:"Роль",select:this.$ctable.roles,value:e.role},{key:"registered",label:"Регистрация пройдена",select:"bool",value:e.registered},{key:"promo",label:"Промо",select:this.$ctable.promotions,value:null===(l=this.$ctable.promotions.find((function(t){return t.label==e.promo})))||void 0===l?void 0:l.value}],footer:"Сохранить",header:"Редактировать",type:"edit"},this.modalConfig.show=!0}}},i=r,c=l("2877"),s=Object(c["a"])(i,a,o,!1,null,null,null);t["default"]=s.exports},b33f:function(e,t,l){"use strict";var a=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("CModal",{attrs:{show:e.vis,title:e.mData.header},on:{"update:show":function(t){e.vis=t}},scopedSlots:e._u([{key:"footer",fn:function(){return[l("CButton",{attrs:{color:"primary"},on:{click:function(t){return e.closeModal()}}},[e._v(e._s(e.mData.footer))])]},proxy:!0}])},[e._t("content"),e._l(e.mData.fields,(function(t,a){return[e.$scopedSlots[t.label]?[e._t(t.label,null,{item:t})]:t.select?l("CSelect",{key:a,attrs:{label:t.label,value:t.value,options:"bool"==t.select?e.boolSelect:t.select},on:{"update:value":function(l){return e.$set(t,"value",l)}}}):l("CInput",{key:a,attrs:{label:t.label,type:t.type},model:{value:t.value,callback:function(l){e.$set(t,"value",l)},expression:"field.value"}})]}))],2)},o=[],n={name:"ExtendedModal",data:function(){return{boolSelect:[{value:1,label:"Да"},{value:0,label:"Нет"}]}},props:{vis:Boolean,mData:Object},methods:{closeModal:function(){this.vis=!1,this.$emit("modal-closed")}}},r=n,i=l("2877"),c=Object(i["a"])(r,a,o,!1,null,null,null);t["a"]=c.exports}}]);
//# sourceMappingURL=chunk-4f6560ef.c1bbe507.js.map
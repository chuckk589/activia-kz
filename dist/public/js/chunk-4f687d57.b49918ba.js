(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4f687d57"],{9380:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("CExtendedModal",{attrs:{vis:t.modalConfig.show,mData:t.modalConfig.data},on:{"modal-closed":function(e){return t.closeModalHandler()}},scopedSlots:t._u([{key:"content",fn:function(){return[a("CImg",{attrs:{fluidGrow:"",src:t.modalConfig.data.cur.checkPath}})]},proxy:!0}])}),a("CDataTable",{attrs:{items:t.items,fields:t.fields,pagination:"",sorter:"",itemsPerPageSelect:"","column-filter":""},scopedSlots:t._u([{key:"action",fn:function(e){var n=e.item;return[a("td",[a("CButton",{attrs:{size:"sm",color:"primary"},on:{click:function(e){return t.viewCheck(n)}}},[a("CIcon",{attrs:{size:"lg",name:"cilImage"}})],1)],1)]}},{key:"over-table",fn:function(){return[a("CLink",{staticClass:"btn btn-primary mb-2 btn-sm",attrs:{href:t.getCurrentItems(),download:"table-data.csv",target:"_blank"}},[t._v("Скачать (.csv)")])]},proxy:!0}])})],1)},l=[],o=a("b33f");function c(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var s={name:"Checks",components:{CExtendedModal:o["a"]},data:function(){return{modalConfig:{show:!1,data:{cur:{}}},items:[],fields:[{key:"id",label:"Id"},{key:"fancyId",label:"Id чека"},{key:"credentials",label:"Имя"},{key:"phone",label:"Номер"},{key:"city",label:"Город"},{key:"status",label:"Статус чека"},{key:"createdAt",label:"Дата загрузки"},{key:"action",label:"",filter:!1,sorter:!1}]}},mounted:function(){var t=this;this.$http({method:"GET",url:"/v1/check/"}).then((function(e){t.items=e.data}))},computed:{getRejectReasons:function(){return this.$ctable.check_statuses.map((function(t){return{label:t.comment?t.comment:t.label,value:t.value}}))}},methods:{viewCheck:function(t){var e;this.modalConfig.data={cur:t,fields:[(e={label:"status"},c(e,"label","Статус"),c(e,"key","status"),c(e,"select",this.getRejectReasons),c(e,"value",this.$ctable.check_statuses.find((function(e){return e.label==t.status})).value),e)],footer:"Сохранить",header:"Просмотр чека",type:"viewCheck"},this.modalConfig.show=!0},closeModalHandler:function(){var t=this;if("viewCheck"==this.modalConfig.data.type){var e=this.modalConfig.data.fields[0].value;this.$http({method:"PUT",url:"/v1/check/".concat(this.modalConfig.data.cur.id),data:{status:e}}).then((function(){t.modalConfig.data.cur.status=t.$ctable.check_statuses.find((function(t){return t.value==e})).label}))}},getCurrentItems:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.items,e="Id,Id чека,Имя,Номер,Город,Статус чека,Дата загрузки",a="data:text/csv;charset=utf-8,"+e+"%0A"+encodeURIComponent(t.reduce((function(t,e){return t+="".concat(e.id,",").concat(e.fancyId,",").concat(e.credentials,",").concat(e.phone,",").concat(e.city,",").concat(e.status,",").concat(e.createdAt,"\n"),t}),""));return a}}},i=s,r=a("2877"),u=Object(r["a"])(i,n,l,!1,null,null,null);e["default"]=u.exports},b33f:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("CModal",{attrs:{show:t.vis,title:t.mData.header},on:{"update:show":function(e){t.vis=e}},scopedSlots:t._u([{key:"footer",fn:function(){return[a("CButton",{attrs:{color:"primary"},on:{click:function(e){return t.closeModal()}}},[t._v(t._s(t.mData.footer))])]},proxy:!0}])},[t._t("content"),t._l(t.mData.fields,(function(e,n){return[t.$scopedSlots[e.label]?[t._t(e.label,null,{item:e})]:e.select?a("CSelect",{key:n,attrs:{label:e.label,value:e.value,options:"bool"==e.select?t.boolSelect:e.select},on:{"update:value":function(a){return t.$set(e,"value",a)}}}):a("CInput",{key:n,attrs:{label:e.label,type:e.type},model:{value:e.value,callback:function(a){t.$set(e,"value",a)},expression:"field.value"}})]}))],2)},l=[],o={name:"ExtendedModal",data:function(){return{boolSelect:[{value:1,label:"Да"},{value:0,label:"Нет"}]}},props:{vis:Boolean,mData:Object},methods:{closeModal:function(){this.vis=!1,this.$emit("modal-closed")}}},c=o,s=a("2877"),i=Object(s["a"])(c,n,l,!1,null,null,null);e["a"]=i.exports}}]);
//# sourceMappingURL=chunk-4f687d57.b49918ba.js.map
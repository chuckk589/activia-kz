(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e2f6d602"],{"47b1":function(t,s,a){"use strict";a.r(s);var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("main",{staticClass:"form-signin"},[a("CCard",[a("CCardBody",[a("h2",{staticClass:"h3 mb-4 fw-normal text-center"},[t._v("Авторизация")]),a("CForm",[a("CInput",{attrs:{placeholder:"Логин","is-valid":t.isValid},on:{input:t.clear},model:{value:t.login,callback:function(s){t.login=s},expression:"login"}}),a("CInput",{attrs:{type:"password","invalid-feedback":"Указаны неверные данные",placeholder:"Пароль","is-valid":t.isValid},on:{input:t.clear},model:{value:t.password,callback:function(s){t.password=s},expression:"password"}})],1),a("CButton",{staticClass:"w-100 btn btn-lg",attrs:{color:"primary"},on:{click:t.auth}},[t._v("Войти")])],1)],1),t._m(0)],1)},i=[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("p",{staticClass:"mt-3 mb-3 text-muted text-center"},[t._v(" © 2020–2022 "),a("a",{attrs:{href:"https://t.me/ActiviaPromoUZ_Bot",target:"_blank"}},[t._v("ActiviaPromoUZ_Bot")])])}],n={data:function(){return{login:"",password:"",isValid:void 0}},created:function(){0!==Object.keys(this.$route.query).length&&(this.login=this.$route.query.l,this.password=this.$route.query.p,this.$router.replace({query:{}}))},methods:{clear:function(){this.isValid=void 0},auth:function(){var t=this;this.login&&this.password?this.$http.post("/auth/login",{username:this.login,password:this.password}).then((function(s){localStorage.setItem("jwt",s.data.access_token),t.isValid=!0,t.$router.push({name:"Users"})}))["catch"]((function(){return t.isValid=!1})):this.isValid=!1}}},o=n,r=(a("eb4d"),a("2877")),l=Object(r["a"])(o,e,i,!1,null,"498d8087",null);s["default"]=l.exports},"96a3":function(t,s,a){},eb4d:function(t,s,a){"use strict";a("96a3")}}]);
//# sourceMappingURL=chunk-e2f6d602.828b9a7c.js.map
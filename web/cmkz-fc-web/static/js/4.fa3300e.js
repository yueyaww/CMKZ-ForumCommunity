(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{330:function(t,a,e){"use strict";e.r(a);var n=e(820),c=e(464);for(var o in c)"default"!==o&&function(t){e.d(a,t,function(){return c[t]})}(o);e(655);var i=e(16),s=Object(i.a)(c.default,n.a,n.b,!1,null,null,null);s.options.__file="src/components/demo-components/account/account.vue",a.default=s.exports},361:function(t,a){function e(){return t.exports=e=Object.assign||function(t){for(var a=1;a<arguments.length;a++){var e=arguments[a];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])}return t},e.apply(this,arguments)}t.exports=e},464:function(t,a,e){"use strict";e.r(a);var n=e(465),c=e.n(n);for(var o in n)"default"!==o&&function(t){e.d(a,t,function(){return n[t]})}(o);a.default=c.a},465:function(t,a,e){"use strict";var n=e(17);Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var c=n(e(361)),o=n(e(651)),i=n(e(653)),s=e(135),r={components:{AccountInfoEdit:o.default,AccountInfoShow:i.default},data:function(){return{tabs:{info:"基本设置"},tab:"info"}},mounted:function(){this.init()},methods:{init:function(){}},computed:(0,c.default)({},(0,s.mapState)({account:"User"}))};a.default=r},466:function(t,a,e){"use strict";e.r(a);var n=e(467),c=e.n(n);for(var o in n)"default"!==o&&function(t){e.d(a,t,function(){return n[t]})}(o);a.default=c.a},467:function(t,a,e){"use strict";(function(t){var n=e(17);Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var c=n(e(107)),o={props:{account:Object},data:function(){return{acc:t.copy(this.account),rules:{required:["name","email","org"],email:["email"]},options:{max_file_size:"1mb",filters:{mime_types:[{title:"Image files",extensions:"jpg,gif,png"}]}},saveloading:!1}},mounted:function(){this.init()},methods:{init:function(){},save:function(){var a=this;this.$refs.form.valid().result&&(this.saveloading=!0,setTimeout(function(){a.saveloading=!1,c.default.dispatch("updateAccount",t.copy(a.acc))},1e3))},reset:function(){this.$refs.form.reset(),this.acc=t.copy(this.account)}},computed:{}};a.default=o}).call(this,e(73).default)},468:function(t,a,e){},469:function(t,a,e){"use strict";e.r(a);var n=e(470),c=e.n(n);for(var o in n)"default"!==o&&function(t){e.d(a,t,function(){return n[t]})}(o);a.default=c.a},470:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n={props:{account:Object},data:function(){return{}},mounted:function(){this.init()},methods:{init:function(){}},computed:{}};a.default=n},471:function(t,a,e){},472:function(t,a,e){},651:function(t,a,e){"use strict";e.r(a);var n=e(836),c=e(466);for(var o in c)"default"!==o&&function(t){e.d(a,t,function(){return c[t]})}(o);e(652);var i=e(16),s=Object(i.a)(c.default,n.a,n.b,!1,null,null,null);s.options.__file="src/components/demo-components/account/modules/account-info-edit.vue",a.default=s.exports},652:function(t,a,e){"use strict";var n=e(468);e.n(n).a},653:function(t,a,e){"use strict";e.r(a);var n=e(837),c=e(469);for(var o in c)"default"!==o&&function(t){e.d(a,t,function(){return c[t]})}(o);e(654);var i=e(16),s=Object(i.a)(c.default,n.a,n.b,!1,null,null,null);s.options.__file="src/components/demo-components/account/modules/account-info-show.vue",a.default=s.exports},654:function(t,a,e){"use strict";var n=e(471);e.n(n).a},655:function(t,a,e){"use strict";var n=e(472);e.n(n).a},820:function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"account-vue frame-page"},[e("Row",{attrs:{space:30}},[e("Cell",{attrs:{xs:24,sm:24,md:7,lg:7,xl:7}},[e("AccountInfoShow",{attrs:{account:t.account}})],1),t._v(" "),e("Cell",{attrs:{xs:24,sm:24,md:17,lg:17,xl:17}},[e("div",{staticClass:"h-panel"},[e("div",{staticClass:"h-panel-tabs-bar"},[e("Tabs",{attrs:{datas:t.tabs},model:{value:t.tab,callback:function(a){t.tab=a},expression:"tab"}})],1),t._v(" "),"info"==t.tab?e("AccountInfoEdit",{attrs:{account:t.account}}):t._e()],1)])],1)],1)},c=[];n._withStripped=!0,e.d(a,"a",function(){return n}),e.d(a,"b",function(){return c})},836:function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"account-info-vue"},[e("Form",{ref:"form",attrs:{model:t.acc,rules:t.rules,showErrorTip:""}},[e("FormItem",{attrs:{label:"头像",prop:"avatar"}},[e("Qiniu",{attrs:{options:t.options,type:"image","data-type":"url"},model:{value:t.acc.avatar,callback:function(a){t.$set(t.acc,"avatar",a)},expression:"acc.avatar"}})],1),t._v(" "),e("FormItem",{attrs:{label:"姓名",prop:"name"}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.acc.name,expression:"acc.name"}],attrs:{type:"text"},domProps:{value:t.acc.name},on:{input:function(a){a.target.composing||t.$set(t.acc,"name",a.target.value)}}})]),t._v(" "),e("FormItem",{attrs:{label:"描述",prop:"desc"}},[e("textarea",{directives:[{name:"autosize",rawName:"v-autosize"},{name:"model",rawName:"v-model",value:t.acc.desc,expression:"acc.desc"}],domProps:{value:t.acc.desc},on:{input:function(a){a.target.composing||t.$set(t.acc,"desc",a.target.value)}}})]),t._v(" "),e("FormItem",{attrs:{label:"邮箱",prop:"email"}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.acc.email,expression:"acc.email"}],attrs:{type:"text"},domProps:{value:t.acc.email},on:{input:function(a){a.target.composing||t.$set(t.acc,"email",a.target.value)}}})]),t._v(" "),e("FormItem",{attrs:{label:"公司",prop:"org"}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.acc.org,expression:"acc.org"}],attrs:{type:"text"},domProps:{value:t.acc.org},on:{input:function(a){a.target.composing||t.$set(t.acc,"org",a.target.value)}}})]),t._v(" "),e("FormItem",{attrs:{label:"部门",prop:"dept"}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.acc.dept,expression:"acc.dept"}],attrs:{type:"text"},domProps:{value:t.acc.dept},on:{input:function(a){a.target.composing||t.$set(t.acc,"dept",a.target.value)}}})]),t._v(" "),e("FormItem",{attrs:{label:"职位",prop:"title"}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.acc.title,expression:"acc.title"}],attrs:{type:"text"},domProps:{value:t.acc.title},on:{input:function(a){a.target.composing||t.$set(t.acc,"title",a.target.value)}}})]),t._v(" "),e("FormItem",{attrs:{label:"地址",prop:"location"}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.acc.location,expression:"acc.location"}],attrs:{type:"text"},domProps:{value:t.acc.location},on:{input:function(a){a.target.composing||t.$set(t.acc,"location",a.target.value)}}})]),t._v(" "),e("FormItem",{attrs:{label:"标签",prop:"tags"}},[e("TagInput",{model:{value:t.acc.tags,callback:function(a){t.$set(t.acc,"tags",a)},expression:"acc.tags"}})],1),t._v(" "),e("FormItem",{attrs:{label:"",prop:"location"}},[e("Button",{attrs:{color:"primary",loading:t.saveloading},on:{click:t.save}},[t._v("保存")]),t._v(" "),e("Button",{on:{click:t.reset}},[t._v("重置")])],1)],1)],1)},c=[];n._withStripped=!0,e.d(a,"a",function(){return n}),e.d(a,"b",function(){return c})},837:function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"h-panel account-info-show-vue"},[e("div",{staticClass:"h-panel-body"},[e("p",{staticClass:"account-image"},[e("Avatar",{attrs:{src:t.account.avatar,width:100}})],1),t._v(" "),e("p",{staticClass:"account-name"},[t._v(t._s(t.account.name))]),t._v(" "),e("p",{staticClass:"account-desc"},[e("pre",[t._v(t._s(t.account.desc))])]),t._v(" "),e("div",{staticClass:"account-detail-desc"},[e("p",[e("i",{staticClass:"icon-mail"}),e("span",[t._v(t._s(t.account.email))])]),t._v(" "),e("p",[e("i",{staticClass:"icon-briefcase"}),e("span",[t._v(t._s(t.account.org)+" · "+t._s(t.account.dept)+" · "+t._s(t.account.title))])]),t._v(" "),e("p",[e("i",{staticClass:"icon-location-2"}),e("span",[t._v(t._s(t.account.location))])])]),t._v(" "),e("div",{staticClass:"divider"}),t._v(" "),e("div",[e("p",{staticClass:"account-detail-tags-title"},[t._v("标签")]),t._v(" "),e("p",[e("TagInput",{staticStyle:{width:"100%"},attrs:{readonly:!0},model:{value:t.account.tags,callback:function(a){t.$set(t.account,"tags",a)},expression:"account.tags"}})],1)])])])},c=[];n._withStripped=!0,e.d(a,"a",function(){return n}),e.d(a,"b",function(){return c})}}]);
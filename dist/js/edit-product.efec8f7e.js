(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["edit-product"],{"0403":function(e,t,i){},"07ac":function(e,t,i){var n=i("23e7"),r=i("6f53").values;n({target:"Object",stat:!0},{values:function(e){return r(e)}})},"0d1e":function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"repease-product"},[i("h2",{staticClass:"title"},[e._v(e._s(e.title))]),i("BaseInfo",{attrs:{editInfo:e.editInfo},on:{update:e.update}}),i("ProductDetailEdit",{attrs:{editInfo:e.editInfo},on:{update:e.update}}),i("div",{staticClass:"btn-wrap"},[i("el-button",{attrs:{type:"primary"},on:{click:e.vertify}},[e._v("保存并预览")])],1)],1)},r=[],a=(i("a4d3"),i("e01a"),i("c975"),i("a15b"),i("d81d"),i("13d5"),i("b0c0"),i("07ac"),i("96cf"),i("1da1")),o=i("5530"),s=i("ade3"),c=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"base-info"},[i("h3",{staticClass:"item-title"},[e._v("基本信息")]),i("el-form",{ref:"baseForm",staticClass:"base-form",attrs:{"label-position":e.labelPosition,"label-width":"100px",model:e.info,rules:e.rules}},[i("el-form-item",{attrs:{label:"鲜花名称",prop:"product_name"}},[i("el-input",{staticClass:"medium",model:{value:e.info.product_name,callback:function(t){e.$set(e.info,"product_name",t)},expression:"info.product_name"}})],1),i("el-form-item",{attrs:{label:"鲜花类型",prop:"product_type"}},[i("el-select",{attrs:{placeholder:"鲜花类型"},model:{value:e.info.product_type,callback:function(t){e.$set(e.info,"product_type",t)},expression:"info.product_type"}},e._l(e.flowerList,(function(e,t){return i("el-option",{key:t,attrs:{label:e.name,value:e.val}})})),1)],1),i("el-form-item",{attrs:{label:"商品主图",prop:"main_image"}},[i("el-upload",{attrs:{action:"#","file-list":e.info.main_image,limit:1,"on-change":e.mainHandleChange,"list-type":"picture-card","http-request":e.uploadImg},scopedSlots:e._u([{key:"file",fn:function(t){var n=t.file;return i("div",{},[i("img",{staticClass:"el-upload-list__item-thumbnail",attrs:{src:n.url,alt:""}}),i("span",{staticClass:"el-upload-list__item-actions"},[i("span",{staticClass:"el-upload-list__item-preview",on:{click:function(t){return e.handlePictureCardPreview(n)}}},[i("i",{staticClass:"el-icon-zoom-in"})]),e.disabled?e._e():i("span",{staticClass:"el-upload-list__item-delete",on:{click:function(t){return e.handleDownload(n)}}},[i("i",{staticClass:"el-icon-download"})]),e.disabled?e._e():i("span",{staticClass:"el-upload-list__item-delete",on:{click:function(t){return e.handleRemove(n,"main_image")}}},[i("i",{staticClass:"el-icon-delete"})])])])}}])},[i("i",{staticClass:"el-icon-plus",attrs:{slot:"default"},slot:"default"})])],1),i("el-form-item",{attrs:{label:"鲜花摘要",prop:"summary"}},[i("el-input",{staticClass:"medium",model:{value:e.info.summary,callback:function(t){e.$set(e.info,"summary",t)},expression:"info.summary"}})],1),i("el-form-item",{attrs:{label:"标准价格",prop:"original_price"}},[i("el-input",{staticClass:"medium",model:{value:e.info.original_price,callback:function(t){e.$set(e.info,"original_price",t)},expression:"info.original_price"}},[i("template",{slot:"prepend"},[e._v("¥")])],2)],1),i("el-form-item",{attrs:{label:"当前价格",prop:"current_price"}},[i("el-input",{staticClass:"medium",model:{value:e.info.current_price,callback:function(t){e.$set(e.info,"current_price",t)},expression:"info.current_price"}},[i("template",{slot:"prepend"},[e._v("¥")])],2)],1),i("el-form-item",{attrs:{label:"快递运费",prop:"shipping_price"}},[i("el-input",{staticClass:"medium",model:{value:e.info.shipping_price,callback:function(t){e.$set(e.info,"shipping_price",t)},expression:"info.shipping_price"}},[i("template",{slot:"prepend"},[e._v("¥")])],2)],1),i("el-form-item",{attrs:{label:"库存",prop:"stock"}},[i("el-input",{staticClass:"medium",model:{value:e.info.stock,callback:function(t){e.$set(e.info,"stock",t)},expression:"info.stock"}})],1)],1),i("el-dialog",{attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[i("img",{attrs:{width:"100%",src:e.dialogImageUrl,alt:""}})])],1)},u=[],l=(i("99af"),i("4de4"),i("2f7f")),f=i("19e7"),d=i("9b15"),p=i.n(d),m={name:"base-info",props:{editInfo:Object},data:function(){return{labelPosition:"right",info:{stock:"",product_name:"",main_image:[],summary:"",shipping_price:"",current_price:"",original_price:""},dialogImageUrl:"",dialogVisible:!1,disabled:!1,flowerList:[{name:"包月鲜花",val:1},{name:"礼品鲜花",val:2}]}},methods:{onSubmit:function(){console.log("submit!")},handleRemove:function(e,t){var i=this.info[t];this.info[t]=i.filter((function(t){return t.uid!==e.uid}))},handleChange:function(e,t){this.info.gallery_image=t},mainHandleChange:function(e,t){this.info.main_image=t},bgHandleChange:function(e,t){this.info.background_pic=t},handlePictureCardPreview:function(e){this.dialogImageUrl=e.url,this.dialogVisible=!0},handleDownload:function(e){console.log(e)},beforeUpload:function(){return!1},getSign:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var i,n,r,a,o,s,c,u,f;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(l["c"])();case 2:i=t.sent,n=i.errorCode,r=i.data,0===n&&(e.sign=r,a=r.securityToken,o=r.accessKeyId,s=r.accessKeySecret,c=r.bucket,u=r.endpoint,f=new p.a({endpoint:u,accessKeyId:o,accessKeySecret:s,bucket:c,stsToken:a}),e.client=f);case 6:case"end":return t.stop()}}),t)})))()},uploadImg:function(e){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function i(){var n,r,a,o;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:n=e.file,r=Object(f["a"])("".concat(n.uid,"-").concat(n.name)),a="ipxmall/".concat(r),o=new FormData,o.append("file",n),t.client.put(a,n).then((function(t){var i=t.res;200===i.status?(e.url=i.requestUrls,e.onSuccess(i)):e.onError(i)}));case 6:case"end":return i.stop()}}),i)})))()},initInfo:function(){var e=window.sessionStorage.getItem("$editInfo"),t=JSON.parse(e),i=t.base_info,n=i.main_image?[{url:i.main_image}]:[];this.info=Object(o["a"])(Object(o["a"])({},i),{},{main_image:n,current_price:i.sale_price}),this.$emit("update","baseInfo",i)},checkForm:function(){console.log("this",this)}},watch:{info:{deep:!0,handler:function(e){this.$emit("update","baseInfo",e)}},editInfo:{deep:!0,handler:function(){this.initInfo()}}},computed:{isEdit:function(){return/edit-product/.test(this.$route.path)},rules:function(){return{product_name:[{required:!0,message:"请输入商品名称",trigger:"blur"}],product_type:[{required:!0,message:"请选择鲜花类型",trigger:"blur"}],main_image:[{required:!0,message:"请上传商品主图",trigger:"blur"}],summary:[{required:!0,message:"请输入商品摘要",trigger:"blur"}],shipping_price:[{required:!0,message:"请输入商品运费",trigger:"blur"}],original_price:[{required:!0,message:"请输入标准价格",trigger:"blur"}],stock:[{required:!0,message:"请输入库存",trigger:"blur"}],current_price:[{required:!0,message:"请输入当前价格",trigger:"blur"}]}}},created:function(){this.getSign(),this.isEdit&&this.initInfo()},mounted:function(){this.$emit("update","baseForm",this.$refs.baseForm)}},g=m,b=(i("7584"),i("2877")),h=Object(b["a"])(g,c,u,!1,null,"ecee24c2",null),v=h.exports,_=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"base-info"},[i("h3",{staticClass:"item-title"},[e._v("商详编辑")]),i("el-form",{staticClass:"base-form",attrs:{"label-position":e.labelPosition,"label-width":"80px"}},[i("el-form-item",{attrs:{label:"商详图片",required:""}},[i("el-upload",{attrs:{action:"#",limit:5,"file-list":e.fileList,"on-change":e.handleChange,"list-type":"picture-card","http-request":e.uploadImg},scopedSlots:e._u([{key:"file",fn:function(t){var n=t.file;return i("div",{},[i("img",{staticClass:"el-upload-list__item-thumbnail",attrs:{src:n.url,alt:""}}),i("span",{staticClass:"el-upload-list__item-actions"},[i("span",{staticClass:"el-upload-list__item-preview",on:{click:function(t){return e.handlePictureCardPreview(n)}}},[i("i",{staticClass:"el-icon-zoom-in"})]),e.disabled?e._e():i("span",{staticClass:"el-upload-list__item-delete",on:{click:function(t){return e.handleDownload(n)}}},[i("i",{staticClass:"el-icon-download"})]),e.disabled?e._e():i("span",{staticClass:"el-upload-list__item-delete",on:{click:function(t){return e.handleRemove(n)}}},[i("i",{staticClass:"el-icon-delete"})])])])}}])},[i("i",{staticClass:"el-icon-plus",attrs:{slot:"default"},slot:"default"})])],1)],1),i("el-dialog",{attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[i("img",{attrs:{width:"100%",src:e.dialogImageUrl,alt:""}})])],1)},w=[],O={name:"base-info",props:{editInfo:Object},data:function(){return{labelPosition:"right",dialogImageUrl:"",dialogVisible:!1,disabled:!1,fileList:[],client:null}},methods:{onSubmit:function(){console.log("submit!")},handleRemove:function(e){this.fileList=this.fileList.filter((function(t){return t.uid!==e.uid}))},handleChange:function(e,t){this.fileList=t,this.$emit("update","description",t)},handlePictureCardPreview:function(e){this.dialogImageUrl=e.url,this.dialogVisible=!0},handleDownload:function(e){console.log(e)},beforeUpload:function(){return!1},getSign:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var i,n,r,a,o,s,c,u,f;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(l["c"])();case 2:i=t.sent,n=i.errorCode,r=i.data,0===n&&(e.sign=r,a=r.securityToken,o=r.accessKeyId,s=r.accessKeySecret,c=r.bucket,u=r.endpoint,f=new p.a({endpoint:u,accessKeyId:o,accessKeySecret:s,bucket:c,stsToken:a}),e.client=f);case 6:case"end":return t.stop()}}),t)})))()},uploadImg:function(e){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function i(){var n,r,a,o;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:n=e.file,r=Object(f["a"])("".concat(n.uid,"-").concat(n.name)),a="ipxmall/".concat(r),o=new FormData,o.append("file",n),t.client.put(a,n).then((function(t){var i=t.res;200===i.status?(e.url=i.requestUrls,e.onSuccess(i)):e.onError(i)}));case 6:case"end":return i.stop()}}),i)})))()},initInfo:function(){var e=window.sessionStorage.getItem("$editInfo"),t=JSON.parse(e),i=t.description,n=void 0===i?[]:i;this.fileList=n.map((function(e){return Object(o["a"])(Object(o["a"])({},e),{},{url:e.content})})),this.$emit("update","productDetail",this.fileList)}},computed:{isEdit:function(){return/edit-product/.test(this.$route.path)}},watch:{editInfo:{deep:!0,handler:function(){this.initInfo()}}},mounted:function(){this.getSign(),this.isEdit&&this.initInfo()}},y=O,I=(i("3ed2"),Object(b["a"])(y,_,w,!1,null,"2fdc9092",null)),j=I.exports,C={name:"repease-product",props:{},components:{BaseInfo:v,ProductDetailEdit:j},data:function(){return{labelPosition:"right",baseInfo:{main_image:[]},specifications:[],description:[],baseForm:null,editInfo:null,info:{}}},computed:{title:function(){return this.$route.meta.title},isEdit:function(){return/edit-product/.test(this.$route.path)},rules:function(){return{brand_story:[{required:!0,message:"请输入品牌故事",trigger:"blur"}],care_instructions:[{required:!0,message:"请输入养护说明",trigger:"blur"}],logistics_desc:[{required:!0,message:"请输入物流说明",trigger:"blur"}],special_note:[{required:!0,message:"请输入特别说明",trigger:"blur"}],after_sale_instructions:[{required:!0,message:"请输入售后说明",trigger:"blur"}]}}},watch:{$route:function(){this.loadInfo()}},mounted:function(){window.sessionStorage.removeItem("$eitdInfo"),this.isEdit&&this.loadInfo()},methods:{update:function(e,t){this[e]=t},vertify:function(){var e=this;this.baseForm.validate((function(t){if(!t)return console.log("error submit!!"),!1;e.submit()}))},vertifySpecialForm:function(){var e=this;this.baseForm.validate((function(t){if(!t)return console.log("error submit!!"),!1;e.submit()}))},submit:function(){var e=this.baseInfo,t=this.specifications,i=this.description,n=this.info,r=e.main_image.length>0?this.getImgSrc(e.main_image)[0].content:"";t=t.reduce((function(e,t){var i=t.key,n=t.val;return e.push(Object(s["a"])({},i,n)),e}),[]);var a=Object(o["a"])(Object(o["a"])(Object(o["a"])({},this.baseInfo),n),{},{main_image:r,specifications:JSON.stringify(t),description:this.getImgSrc(i)||[]});if(this.isEdit)return this.updateProductInfo(a),!1;this.creaeProductInfo(a)},updateProductInfo:function(e){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function i(){var n,r;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return console.log("params",e),i.next=3,Object(l["g"])(e);case 3:n=i.sent,r=n.errorCode,0===r&&t.$router.go(-1);case 6:case"end":return i.stop()}}),i)})))()},createProductInfo:function(e){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function i(){var n,r;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.next=2,Object(l["a"])(e);case 2:n=i.sent,r=n.errorCode,0===r&&t.$router.go(-1);case 5:case"end":return i.stop()}}),i)})))()},initSpecs:function(){var e=this.priceInfo,t=e.specList,i=e.sepcsData;return i?(i=i.map((function(e){var i=e.id,n=void 0===i?1:i,r=[];t.map((function(t,i){var n={name:t.name,key:i,attr:e["".concat(i)]};r.push(n)}));var a=r.map((function(e){var i=e.key,n=e.attr,r=t[i].attr,a=Object.values(r);return a.indexOf(n)})).join("_");return Object(o["a"])(Object(o["a"])({},e),{},{indexes:a,detail:r,sku_id:n})})),i):[]},getImgSrc:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return e.length?e.map((function(e,t){var i={id:t,type:"image"};return e.response?i.content=e.response.requestUrls[0]:i.content=e.url,i})):""},loadInfo:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var i,n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(l["d"])(e.$route.query);case 2:i=t.sent,n=i.errorCode,r=i.data,0===n&&(e.editInfo=r,window.sessionStorage.setItem("$editInfo",JSON.stringify(r)));case 6:case"end":return t.stop()}}),t)})))()}}},k=C,x=(i("9e0b"),Object(b["a"])(k,n,r,!1,null,"766fa391",null));t["default"]=x.exports},"13d5":function(e,t,i){"use strict";var n=i("23e7"),r=i("d58f").left,a=i("a640"),o=i("ae40"),s=a("reduce"),c=o("reduce",{1:0});n({target:"Array",proto:!0,forced:!s||!c},{reduce:function(e){return r(this,e,arguments.length,arguments.length>1?arguments[1]:void 0)}})},"159b":function(e,t,i){var n=i("da84"),r=i("fdbc"),a=i("17c2"),o=i("9112");for(var s in r){var c=n[s],u=c&&c.prototype;if(u&&u.forEach!==a)try{o(u,"forEach",a)}catch(l){u.forEach=a}}},"17c2":function(e,t,i){"use strict";var n=i("b727").forEach,r=i("a640"),a=i("ae40"),o=r("forEach"),s=a("forEach");e.exports=o&&s?[].forEach:function(e){return n(this,e,arguments.length>1?arguments[1]:void 0)}},"3ed2":function(e,t,i){"use strict";var n=i("0403"),r=i.n(n);r.a},4160:function(e,t,i){"use strict";var n=i("23e7"),r=i("17c2");n({target:"Array",proto:!0,forced:[].forEach!=r},{forEach:r})},5530:function(e,t,i){"use strict";i.d(t,"a",(function(){return a}));i("a4d3"),i("4de4"),i("4160"),i("e439"),i("dbb4"),i("b64b"),i("159b");var n=i("ade3");function r(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,n)}return i}function a(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?r(Object(i),!0).forEach((function(t){Object(n["a"])(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):r(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}},"6f08":function(e,t,i){},"6f53":function(e,t,i){var n=i("83ab"),r=i("df75"),a=i("fc6a"),o=i("d1e7").f,s=function(e){return function(t){var i,s=a(t),c=r(s),u=c.length,l=0,f=[];while(u>l)i=c[l++],n&&!o.call(s,i)||f.push(e?[i,s[i]]:s[i]);return f}};e.exports={entries:s(!0),values:s(!1)}},7584:function(e,t,i){"use strict";var n=i("6f08"),r=i.n(n);r.a},"9e0b":function(e,t,i){"use strict";var n=i("9eaf"),r=i.n(n);r.a},"9eaf":function(e,t,i){},a15b:function(e,t,i){"use strict";var n=i("23e7"),r=i("44ad"),a=i("fc6a"),o=i("a640"),s=[].join,c=r!=Object,u=o("join",",");n({target:"Array",proto:!0,forced:c||!u},{join:function(e){return s.call(a(this),void 0===e?",":e)}})},ade3:function(e,t,i){"use strict";function n(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}i.d(t,"a",(function(){return n}))},b64b:function(e,t,i){var n=i("23e7"),r=i("7b0b"),a=i("df75"),o=i("d039"),s=o((function(){a(1)}));n({target:"Object",stat:!0,forced:s},{keys:function(e){return a(r(e))}})},c975:function(e,t,i){"use strict";var n=i("23e7"),r=i("4d64").indexOf,a=i("a640"),o=i("ae40"),s=[].indexOf,c=!!s&&1/[1].indexOf(1,-0)<0,u=a("indexOf"),l=o("indexOf",{ACCESSORS:!0,1:0});n({target:"Array",proto:!0,forced:c||!u||!l},{indexOf:function(e){return c?s.apply(this,arguments)||0:r(this,e,arguments.length>1?arguments[1]:void 0)}})},d58f:function(e,t,i){var n=i("1c0b"),r=i("7b0b"),a=i("44ad"),o=i("50c4"),s=function(e){return function(t,i,s,c){n(i);var u=r(t),l=a(u),f=o(u.length),d=e?f-1:0,p=e?-1:1;if(s<2)while(1){if(d in l){c=l[d],d+=p;break}if(d+=p,e?d<0:f<=d)throw TypeError("Reduce of empty array with no initial value")}for(;e?d>=0:f>d;d+=p)d in l&&(c=i(c,l[d],d,u));return c}};e.exports={left:s(!1),right:s(!0)}},dbb4:function(e,t,i){var n=i("23e7"),r=i("83ab"),a=i("56ef"),o=i("fc6a"),s=i("06cf"),c=i("8418");n({target:"Object",stat:!0,sham:!r},{getOwnPropertyDescriptors:function(e){var t,i,n=o(e),r=s.f,u=a(n),l={},f=0;while(u.length>f)i=r(n,t=u[f++]),void 0!==i&&c(l,t,i);return l}})},e439:function(e,t,i){var n=i("23e7"),r=i("d039"),a=i("fc6a"),o=i("06cf").f,s=i("83ab"),c=r((function(){o(1)})),u=!s||c;n({target:"Object",stat:!0,forced:u,sham:!s},{getOwnPropertyDescriptor:function(e,t){return o(a(e),t)}})}}]);
//# sourceMappingURL=edit-product.efec8f7e.js.map
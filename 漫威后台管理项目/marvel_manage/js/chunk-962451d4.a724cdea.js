(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-962451d4"],{"75ea":function(t,a,e){"use strict";var n=e("d9a5"),l=e.n(n);l.a},c95a:function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,height:"650",border:""}},[e("el-table-column",{attrs:{prop:"name",label:"取景地名",width:"180"}}),e("el-table-column",{attrs:{prop:"description",label:"取景地描述",width:"340"}}),e("el-table-column",{attrs:{prop:"plot",label:"情节描述",width:"340"}}),e("el-table-column",{attrs:{prop:"positionX",label:"经度"}}),e("el-table-column",{attrs:{prop:"positionY",label:"纬度"}}),e("el-table-column",{attrs:{fixed:"right",label:"操作",width:"100"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("el-button",{attrs:{type:"text",size:"small"},on:{click:function(e){return t.handleClickY(a.row,a.$index,t.tableData)}}},[t._v("通过")]),e("el-button",{attrs:{type:"text",size:"small"},on:{click:function(e){return t.handleClickN(a.row,a.$index,t.tableData)}}},[t._v("未通过")])]}}])})],1)],1)},l=[],o=(e("a434"),e("82ae")),i=e.n(o),s={name:"shootingLocation",data:function(){return{tableData:[]}},mounted:function(){this.loadData()},methods:{loadData:function(){var t=this;i()({url:"http://106.52.187.27:8088/api/ShootingLocation?enable_flag=N"}).then((function(a){t.tableData=a.data}))},handleClickY:function(t,a,e){var n=this;console.log(t._id),i.a.get("http://106.52.187.27:8088/api/ShootingLocationChange",{params:{_id:t._id,enable_flag:"Y"}}).then((function(t){n.$message({message:"操作成功",type:"success"})})),e.splice(a,1)},handleClickN:function(t,a,e){var n=this;i.a.get("http://106.52.187.27:8088/api/ShootingLocationChange",{params:{_id:t._id,enable_flag:"D"}}).then((function(t){n.$message({message:"操作成功",type:"success"})})),e.splice(a,1)}}},c=s,r=(e("75ea"),e("2877")),u=Object(r["a"])(c,n,l,!1,null,"3a859198",null);a["default"]=u.exports},d9a5:function(t,a,e){}}]);
//# sourceMappingURL=chunk-962451d4.a724cdea.js.map
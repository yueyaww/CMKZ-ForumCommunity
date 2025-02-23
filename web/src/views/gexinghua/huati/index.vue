<template>
  <div class="frame-page ">
    <Row :space="30">
      <Cell :xs='24' :sm='24' :md='7' :lg='7' :xl='7'>
        <div class="h-panel">
          <div class="h-panel-bar">
            <span class="h-panel-title">社区列表</span>
            <div style="float:right" class="h-btn-group">
            </div>
          </div>
          <div class="h-panel-body" v-if="height" style="overflow:auto;padding-top: 10px;" :style="'height:'+height+'px;'">
            <Menu :datas="shequs" ref="menuShequ" className="h-menu-white" 
            :option="{titleName: '社区名',keyName: '_id'}" @select="triggerSelectShequ"></Menu>
          </div>
        </div>
      </Cell>
      <Cell :xs='24' :sm='24' :md='17' :lg='17' :xl='17'>
        <div class="h-panel">
          <div class="h-panel-bar">
            <span class="h-panel-title">话题类型预定义</span>
            <div style="float:right" class="h-btn-group">
              <Button color="green" @click="addHuatiType">新建</Button>
            </div>
          </div>
          <div class="h-panel-body" v-if="height" style="overflow:auto;" :style="'height:'+height+'px;'">
            <Table :datas="huatiTypes" ref="table">
              <TableItem title="序号" prop="$serial" :width="50"></TableItem>
              <TableItem title="类型名称" prop="类型名称" ></TableItem>
              <TableItem title="特征" prop="特征"></TableItem>
              <TableItem title="标题阅读权限" prop="标题阅读权限" :format="dateFilter"></TableItem>
              <TableItem title="正文阅读权限" prop="正文阅读权限" :format="dateFilter"></TableItem>
              <TableItem title="公告编辑权限" prop="公告编辑权限" :format="dateFilter"></TableItem>
              <TableItem title="元权限" prop="元权限" :format="dateFilter"></TableItem>
              <TableItem title="结束后标题阅读权限" prop="结束后标题阅读权限" :format="dateFilter"></TableItem>
              <TableItem title="结束后正文阅读权限" prop="结束后正文阅读权限" :format="dateFilter"></TableItem>
              <TableItem title="结束后公告编辑权限" prop="结束后公告编辑权限" :format="dateFilter"></TableItem>
              <TableItem title="结束后发言权限" prop="结束后发言权限" :format="dateFilter"></TableItem>
              <TableItem title="结束后元权限" prop="结束后元权限" :format="dateFilter"></TableItem>
              <TableItem title="操作">
                <template slot-scope="{data}">
                  <button class="h-btn h-btn-s h-btn-red" @click="delHuatiType(data)"><i class="h-icon-trash"></i></button>
                </template>
              </TableItem>
            	<div slot="empty">无数据</div>
            </Table>
          </div>
        </div>
      </Cell>
    </Row>
    
  </div>
</template>

<script>
  import ModalAddHuatiType from "./modal/addHuatiType.vue";
  
  export default {
    data() {
      return {
        height: 450,
        option: {
          titleName: 'name',
          keyName: '_id'
        },
        shequs: [],
        shequ: null,
        huatiTypes: []
      };
    },
    created() {
      this.height = (document.body.clientHeight - 272);
    },
    mounted() {
      this.getShequs();
    },
    methods: {
      getShequs() {
        R.Shequ.gets().then(resp => {
          if (resp.ok) {
            this.shequs = resp.body;
          }
        }).then(() =>{
          if (this.shequs.length>0) {
            this.$refs.menuShequ.select(this.shequs[0]._id);
            this.shequ = this.shequs[0];
            this.getHuatiTypes();
          }
        });
      },
      triggerSelectShequ(data){
        this.shequ = data;
        this.getHuatiTypes();
      },
      addHuatiType(){
        if(this.shequ == null){
          this.$Notice({
            type: 'error',
            title: "失败",
            content: '请选择社区'
          });
          return;
        }
        this.$Modal({
          middle: true,
          hasDivider: true,
          closeOnMask: false,
          component: {
            vue: ModalAddHuatiType,
            datas: {shequId: this.shequ._id, tezheng: this.shequ.特征}
          },
          events: {
            success: (modal, data) => {
              this.getHuatiTypes();
            }
          }
        });
      },
      getHuatiTypes(){
        R.UserHuatiType.gets({社区: this.shequ._id}).then(resp => {
          if (resp.ok) {
            this.huatiTypes = resp.body;
          }
        });
      },
      delHuatiType(data){
      	this.$Confirm('确定删除？', '提示').then(() => {
      	  R.UserHuatiType.delete({'ids': [data._id]}).then(res =>{
            if(res.ok){
              this.$Notice({
                type: 'success',
                title: "成功",
                content: "删除"
              });
              this.getHuatiTypes();
            }else{
              this.$Notice({
                type: 'warn',
                title: "失败",
                content: res.msg
              });
            }
      	  });
      	}).catch(() => {
      	});
      },
      dateFilter(value){
        if(!value){
          return null
        }else{
          return value.用户组;
        }
      }
    }
  }
</script>

<style>
</style>

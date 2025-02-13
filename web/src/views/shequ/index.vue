<template>
  <div class="frame-page ">
    <Row :space="30">
      <Cell :xs='24' :sm='24' :md='7' :lg='7' :xl='7'>
        <div class="h-panel">
          <div class="h-panel-bar">
            <span class="h-panel-title">社区列表</span>
            <div style="float:right" class="h-btn-group">
              <Button color="green" size="s" @click="addShequ">创建</Button>
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
            <span class="h-panel-title">话题</span>
            <div style="float:right" class="h-btn-group">
              <Button color="green" size="s" @click="addHuati">新建</Button>
            </div>
          </div>
          <div class="h-panel-body" v-if="height" style="overflow:auto;" :style="'height:'+height+'px;'">
            <Table :datas="huatis" ref="table">
              <TableItem title="标题" prop="标题" ></TableItem>
              <TableItem title="作者" prop="作者" :width="100"></TableItem>
            	<TableItem title="创建日期" prop="创建时间" :width="100" :format="dateFilter"></TableItem>
            	<div slot="empty">无数据</div>
            </Table>
            <p>
              <Pagination v-model="page" align="center" @change="currentChange"></Pagination>
            </p>
          </div>
        </div>
      </Cell>
    </Row>
    
  </div>
</template>

<script>
  import ModalAddShequ from "./modal/addShequ.vue";
  import ModalAddHuati from "./modal/addHuati.vue";
  
  export default {
    data() {
      return {
        height: 450,
        option: {
          titleName: 'name',
          keyName: '_id'
        },
        shequs: [],
        shequ: null
      };
    },
    created() {
      this.height = (document.body.clientHeight - 272);
    },
    mounted() {
      this.getShequs();
    },
    methods: {
      addShequ(){
        this.$Modal({
          middle: true,
          hasDivider: true,
          closeOnMask: false,
          component: {
            vue: ModalAddShequ,
            datas: {}
          },
          events: {
            success: (modal, data) => {
              this.getShequs();
            }
          }
        });
      },
      getShequs() {
        R.Shequ.gets().then(resp => {
          if (resp.ok) {
            this.shequs = resp.body;
          }
        }).then(() =>{
          if (this.shequs.length>0) {
            this.$refs.menuShequ.select(this.shequs[0]._id);
            this.shequ = this.shequs[0];
          }
        });
      },
      triggerSelectShequ(data){
        this.shequ = data;
      },
      addHuati(){
        if(this.shequ == null){
          this.$Notice({
            type: 'error',
            title: "失败",
            content: '请选择社区'
          });
          return;
        }
        this.$Modal({
          hasCloseIcon: true,
          fullScreen: true,
        	component: {
        		vue: ModalAddHuati,
            datas: {}
        	},
        });
      },
      dateFilter(value){
        if(!value){
          return null
        }else{
          return manba(value).format();
        }
      }
    }
  }
</script>

<style>
</style>

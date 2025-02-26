<style lang='less'>
</style>
<template>
  <div class="frame-page">
    <div class="h-panel">
      <div class="h-panel-bar"><span class="h-panel-title">话题列表</span></div>
      
      <div class="h-panel-bar">
        <span style="font-size: 15px; font-weight: bold; padding: 0 10px;">社区:</span>
        <SwitchList v-model="selectShequ" :datas="shequs" titleName="简称" keyName="_id"></SwitchList>
      </div>
      
      <div class="h-panel-bar">
        <span class="h-panel-title"></span>
        <div style="float:right" class="h-btn-group">
          <Button color="green" @click="addHuati"><i class="h-icon-plus"></i>话题</Button>
        </div>
      </div>
      
      <div class="h-panel-body" v-if="height" style="overflow:auto;" :style="'height:'+height+'px;'">
        <Table :datas="huatis" ref="table" @rowSelect="huatiSelect" :selectRow="true">
          <TableItem title="序号" prop="$serial" :width="50"></TableItem>
          <TableItem title="标题" prop="标题" ></TableItem>
          <TableItem title="作者" prop="作者" :width="100"></TableItem>
        	<TableItem title="创建时间" prop="创建时间" :width="150" :format="dateFilter"></TableItem>
        	<TableItem title="更新时间" prop="更新时间" :width="150" :format="dateFilter"></TableItem>
        	<div slot="empty">无数据</div>
        </Table>
        <p>
          <Pagination v-model="page" align="center" @change="currentChange"></Pagination>
        </p>
      </div>
      
    </div>
    
  </div>
</template>
<script>
import ModalViewHuati from "../../views/shequ/modal/viewHuati.vue";
import ModalAddHuati from "../../views/shequ/modal/addHuati.vue";

export default {
  data() {
    return {
      selectShequ: null,
      height: 450,
      shequs: [],
      page: {
        size: 10,
        cur: 1,
        total: 0
      },
      huatis: [],
      searchForm: {
        社区: ''
      }
    };
  },
  created() {
    this.height = (document.body.clientHeight - 272);
  },
  mounted() {
    R.Shequ.gets().then(resp => {
      if (resp.ok) {
        this.shequs = resp.body;
      }
    }).then(() =>{
      if (this.shequs.length>0) {
        this.selectShequ = this.shequs[0]._id;
        this.getHuatis();
      }
    });
  },
  methods: {
    getHuatis(){
    	R.Huati.page({'size': this.page.size,'cur': this.page.cur,searchForm: this.searchForm}).then(res =>{
    		if(res.ok){
    			this.huatis = res.body.datas;
    	    this.page.total = res.body.count
    		}
    	});
    },
    currentChange(value){
      R.Huati.page({'size': value.size,'cur': value.cur, searchForm: this.searchForm}).then(res =>{
      	if(res.ok){
      		this.huatis = res.body.datas;
          this.page.total = res.body.count
      	}
      });
    },
    huatiSelect(data){
      window.open(this.$router.resolve({
        path: `/huati/view/${data._id}`
      }).href, '_blank');
      
      return;
      
      this.$Modal({
        hasCloseIcon: true,
        fullScreen: true,
      	component: {
      		vue: ModalViewHuati,
          datas: {huati: data}
      	},
        events: {
          success: (modal, data) => {
          }
        }
      });
    },
    addHuati(){
      window.open(this.$router.resolve({
        path: `/huati/edit/new`,
        query: {'shequId': this.selectShequ}
      }).href, '_blank');
      
      return;
      
      if(this.selectShequ == null){
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
          datas: {shequId: this.selectShequ}
      	},
        events: {
          success: (modal, data) => {
            this.getHuatis();
          }
        }
      });
    },
    dateFilter(value){
      if(!value){
        return null
      }else{
        return Manba(value).format('k');
      }
    }
  }
};
</script>

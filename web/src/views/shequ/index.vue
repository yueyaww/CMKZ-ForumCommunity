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
      </Cell>
    </Row>
    
  </div>
</template>

<script>
  import ModalAddShequ from "./modal/addShequ.vue";
  import ModalAddHuati from "./modal/addHuati.vue";
  import ModalViewHuati from "./modal/viewHuati.vue";
  
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
        huatis: [],
        page: {
          size: 10,
          cur: 1,
          total: 0
        },
        searchForm: {
          社区: ''
        }
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
            this.searchForm.社区 = this.shequ._id;
            this.getHuatis();
          }
        });
      },
      triggerSelectShequ(data){
        this.shequ = data;
        this.searchForm.社区 = data._id;
        this.getHuatis();
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
            datas: {shequId: this.shequ._id}
        	},
          events: {
            success: (modal, data) => {
              this.getHuatis();
            }
          }
        });
      },
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
      dateFilter(value){
        if(!value){
          return null
        }else{
          return Manba(value).format('k');
        }
      }
    }
  }
</script>

<style>
</style>

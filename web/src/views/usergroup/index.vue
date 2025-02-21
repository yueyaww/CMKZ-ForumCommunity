<template>
  <div class="frame-page ">
    <Row :space="30">
      <Cell :xs='24' :sm='24' :md='7' :lg='7' :xl='7'>
        <div class="h-panel">
          <div class="h-panel-bar">
            <span class="h-panel-title">用户组</span>
            <div style="float:right" class="h-btn-group">
              <Button color="green" @click="add">创建</Button>
            </div>
          </div>
          <div class="h-panel-body" v-if="height" style="overflow:auto;padding-top: 10px;" :style="'height:'+height+'px;'">
            <Menu :datas="userGroups" ref="menuUserGroup" className="h-menu-white" 
            :option="{titleName: '名称', keyName: '_id'}" @select="triggerSelect"></Menu>
          </div>
        </div>
      </Cell>
      <Cell :xs='24' :sm='24' :md='17' :lg='17' :xl='17'>
        <div class="h-panel">
          <div class="h-panel-bar">
            <span class="h-panel-title">用户</span>
            <div style="float:right" class="h-btn-group">
              <Button color="primary" @click="addUser">编辑</Button>
            </div>
          </div>
          <div class="h-panel-body" v-if="height" style="overflow:auto;" :style="'height:'+height+'px;'">
            <Table :datas="users" ref="table">
              <TableItem title="序号" prop="$serial"></TableItem>
              <TableItem title="用户名" prop="用户名" ></TableItem>
            	<div slot="empty">无数据</div>
            </Table>
          </div>
        </div>
      </Cell>
    </Row>
  </div>
</template>

<script>
  import ModalAdd from "./modal/add.vue";
  import ModalAddUser from "./modal/addUser.vue";
  export default {
    data() {
      return {
        height: 450,
        userGroups: [],
        userGroup: null,
        users: []
      };
    },
    created() {
      this.height = (document.body.clientHeight - 272);
    },
    mounted() {
      this.getUserGroups();
    },
    methods: {
      add(){
        this.$Modal({
          middle: true,
          hasDivider: true,
          closeOnMask: false,
          component: {
            vue: ModalAdd,
            datas: {}
          },
          events: {
            success: (modal, data) => {
              this.getUserGroups();
            }
          }
        });
      },
      getUserGroups() {
        R.UserGroup.gets().then(resp => {
          if (resp.ok) {
            this.userGroups = resp.body;
          }
        }).then(() =>{
          if (this.userGroups.length>0) {
            this.$refs.menuUserGroup.select(this.userGroups[0]._id);
            this.userGroup = this.userGroups[0];
            this.users = this.userGroup.用户;
          }
        });
      },
      triggerSelect(data){
        this.userGroup = data;
        this.users = data.用户;
      },
      addUser(){
        if(this.userGroup == null){
          this.$Notice({
            type: 'error',
            title: "失败",
            content: '请选择用户组'
          });
          return;
        }
        this.$Modal({
          middle: true,
          hasDivider: true,
          closeOnMask: false,
        	component: {
        		vue: ModalAddUser,
            datas: {userGroup: this.userGroup}
        	},
          events: {
            success: (modal, data) => {
              this.getUserGroups();
            }
          }
        });
      }
    }
  }
</script>

<style>
</style>

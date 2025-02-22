<template>
  <div>
    <!-- h-modal-header 将自带modal头部样式 -->
    <header class="h-modal-header">配置用户</header>
    <Row :space="30">
      <Cell :xs='24' :sm='24' :md='12' :lg='12' :xl='12'>
        <div class="h-panel">
          <div class="h-panel-bar">
            <div class="h-input-group">
              <input type="text" placeholder="输入用户名" v-model="seachUserName"/>
              <Button color="primary" @click="seach()">确定</Button>
            </div>
          </div>
          <div class="h-panel-body" v-if="height" style="overflow:auto;padding-top: 10px;" :style="'height:'+height+'px;'">
            <p v-for="(userGroup, index) in userGroups" :key="index">
              <Checkbox v-model="selectUserGroups" :value="userGroup" @change="changeSelectUserGroups">{{userGroup.名称}}</Checkbox>
            </p>
          </div>
        </div>
      </Cell>
      <Cell :xs='24' :sm='24' :md='12' :lg='12' :xl='12'>
        <div class="h-panel">
          <div class="h-panel-body" v-if="height" style="overflow:auto;" :style="'height:'+height+'px;'">
            <Table :datas="users" ref="table">
              <TableItem title="序号" prop="$serial"></TableItem>
              <TableItem title="用户名" prop="用户名" ></TableItem>
              <TableItem title="操作">
                <template slot-scope="{data}">
                  <button class="h-btn h-btn-s h-btn-red" @click="del(data)"><i class="h-icon-trash"></i></button>
                </template>
              </TableItem>
            	<div slot="empty">无数据</div>
            </Table>
          </div>
        </div>
      </Cell>
    </Row>
    <!-- h-modal-footer 将自带modal底部样式 -->
    <footer class="h-modal-footer">
      <button class="h-btn" @click="close">关闭</button>
      <button class="h-btn h-btn-primary" @click="success">确定</button>
    </footer>
  </div>
</template>

<script>
  export default {
    props: {
      duliusers: Array 
    },
    data() {
      return {
        height: 450,
        seachUserName: '',
        users: [],
        userGroups: [],
        selectUserGroups: []
      };
    },
    mounted() {
      this.users = [];
      this.getUserGroups();
      this.users = this.duliusers;
    },
    methods: {
      success() {
        this.$emit('success', this.users);
        this.close();
      },
      getUserGroups() {
        R.UserGroup.gets().then(resp => {
          if (resp.ok) {
            this.userGroups = resp.body;
          }
        });
      },
      seach(){
        R.User.get({'用户名': this.seachUserName}).then(resp => {
          if (resp.ok) {
            if(resp.body){
              this.addUser(resp.body);
            }else{
              this.$Notice({
                type: 'warn',
                title: "提示",
                content: "没有此用户"
              });
            }
          }
        });
      },
      addUser(user){
        if(!this.users.find(item => item.用户名 == user.用户名)){
          this.users.push(user)
        }
      },
      del(data){
        let index = this.users.findIndex(item => item._id == data._id);
        if (index > -1) {
          this.users.splice(index, 1);
        }
      },
      changeSelectUserGroups(datas){
        for (let data of datas) {
          for (let 用户 of data.用户) {
            this.addUser(用户);
          }
        }
      },
      close() {
        this.$emit('close');
      }
    }
  };
</script>

<style>
</style>

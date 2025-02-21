<style lang='less'>
  .app-home-vue {
    .home-part-body {
      height: 37.5rem;
      overflow : auto;
    }
  }
</style>
<template>

  <div class="app-home-vue frame-page">
    <Row :space="30">
      <Cell :xs='24' :sm='24' :md='24' :lg='8' :xl='8'>
        <div class="h-panel">
          <div class="h-panel-bar">
            <div class="h-panel-title">角色</div>
          </div>
          <div class=" h-panel-body home-part-body">
            <Menu :datas="roles" ref="menuRole" className="h-menu-white" :option="option" @select="triggerSelectRole"></Menu>
          </div>
          <div class="h-panel-bar">
          </div>
        </div>
      </Cell>

      <Cell :xs='24' :sm='24' :md='24' :lg='8' :xl='8'>
        <div class="h-panel">
          <div class="h-panel-bar">
            <div class="h-panel-title">菜单权限</div>
            <div style="float:right" class="h-btn-group">
              <Button color="primary" size="s" @click="$refs.menu.chooseAll();$refs.menu.expandAll()">全选</Button>
              <Button size="s" @click="menus = []">清空</Button>
              <Button color="green" size="s" @click="saveRoleMenus">保存</Button>
            </div>
          </div>
          <div class=" h-panel-body home-part-body">
            <Tree :option="menuOption" multiple choose-mode="some" v-model="menus" ref="menu"></Tree>
          </div>
          <div class="h-panel-bar">
          </div>
        </div>
      </Cell>

      <Cell :xs='24' :sm='24' :md='24' :lg='8' :xl='8'>
        <div class="h-panel">
          <div class="h-panel-bar">
            <div class="h-panel-title">用户</div>
            <div style="float:right">
              <Button color="primary" icon="h-icon-edit" size="s" @click="EditUser"></Button>
            </div>
          </div>
          <div class=" h-panel-body home-part-body">
            <Menu :datas="users" ref="menuUsers" className="h-menu-white" :option="option" @select="triggerSelectUser"></Menu>
          </div>
          <div class="h-panel-bar">
          </div>
        </div>
      </Cell>

    </Row>
  </div>
</template>
<script>
  import {fullMenus} from 'js/config/menu-config';
  import ModalAddUser from "./modal/user.vue";
  
  export default {
    data() {
      return {
        roles: [],
        userGroups: [],
        users: [],
        option: {
          titleName: 'name',
          keyName: '_id'
        },
        menuOption: {
          datas: fullMenus
        },
        menus: [],
        role: {},
        user: {}
      };
    },
    mounted() {
      this.getRoles();
      this.getUsers();
    },
    methods: {
      getRoles() {
        R.Role.gets().then(resp => {
          if (resp.ok) {
            this.roles = resp.body;
          }
        }).then(() =>{
          if (this.roles.length>0) {
            this.$refs.menuRole.select(this.roles[0]._id);
            this.menus = this.roles[0].menus;
            this.role = this.roles[0];
          }
        });
      },
      getUsers(userGroupId) {
        R.User.gets().then(resp => {
          if (resp.ok) {
            this.users = [];
            for (let user of resp.body) {
              user.name = '';
              for (let item of user.角色) {
                user.name+= `[${item.name}]`
              }
              user.name += ` ${user.用户名}`;
            }
            this.users = resp.body;
          }
        }).then(() =>{
          if (this.users.length > 0) {
            this.user = this.users[0];
            this.$refs.menuUsers.select(this.user._id);
          }
        });
      },
      EditUser(){
        if(this.user.用户名 == 'admin'){
          this.$Notice({
            type: 'error',
            title: "失败",
            content: '不能编辑admin'
          });
          return;
        }
        this.$Modal({
          middle: true,
          hasDivider: true,
          closeOnMask: false,
          component: {
            vue: ModalAddUser,
            datas: {roles: this.roles, data: this.user}
          },
          events: {
            success: (modal, data) => {
              this.getUsers();
            }
          }
        });
      },
      saveRoleMenus() {
        this.role.menus = this.menus;
        R.Role.save(this.role).then(resp => {
          if (resp.ok) {
            this.$Notice({
              type: 'success',
              title: "成功",
              content: '保存成功'
            });
            G.trigger('SYS_MENU_REFRESH');
          }
        });
      },
      triggerSelectRole(data) {
        this.menus = data.menus;
        this.role = data;
      },
      triggerSelectUser(data){
        this.user = data;
      }
    }
  };
</script>

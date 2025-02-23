<template>
  <div>
    <!-- h-modal-header 将自带modal头部样式 -->
    <header class="h-modal-header"话题预定义</header>
    <div style="padding:15px">
      <Form :label-width="140"  ref="form" :rules="validationRules" :model="model">
        <FormItem label="类型名称:" prop="类型名称">
          <input type="text" v-model="model.类型名称">
        </FormItem>
        <FormItem label="特征:" prop="特征">
          <Select v-model="model.特征" :datas="tezheng" :deletable="false"></Select>
        </FormItem>
        
        <FormItem label="标题阅读权限:" prop="标题阅读权限">
          <div class="h-input-group">
            <Select v-model="model.标题阅读权限.用户组" :datas="用户组" :deletable="false" @change="changeQuanxian(model.标题阅读权限)"></Select>
            <Button v-if="model.标题阅读权限.用户组 == '自定义'" @click="changeQuanxian(model.标题阅读权限)"><i class="h-icon-edit"></i></Button>
          </div>
        </FormItem>
        <FormItem label="正文阅读权限:" prop="正文阅读权限">
          <div class="h-input-group">
            <Select v-model="model.正文阅读权限.用户组" :datas="用户组" :deletable="false" @change="changeQuanxian(model.正文阅读权限)"></Select>
            <Button v-if="model.正文阅读权限.用户组 == '自定义'" @click="changeQuanxian(model.正文阅读权限)"><i class="h-icon-edit"></i></Button>
          </div>
        </FormItem>
        <FormItem label="公告编辑权限:" prop="公告编辑权限">
          <div class="h-input-group">
            <Select v-model="model.公告编辑权限.用户组" :datas="用户组" :deletable="false" @change="changeQuanxian(model.公告编辑权限)"></Select>
            <Button v-if="model.公告编辑权限.用户组 == '自定义'" @click="changeQuanxian(model.公告编辑权限)"><i class="h-icon-edit"></i></Button>
          </div>
        </FormItem>
        <FormItem label="元权限:" prop="元权限">
          <div class="h-input-group">
            <Select v-model="model.元权限.用户组" :datas="用户组" :deletable="false" @change="changeQuanxian(model.元权限)"></Select>
            <Button v-if="model.元权限.用户组 == '自定义'" @click="changeQuanxian(model.元权限)"><i class="h-icon-edit"></i></Button>
          </div>
        </FormItem>
        
        <FormItem label="结束后标题阅读权限:" prop="结束后标题阅读权限">
          <div class="h-input-group">
            <Select v-model="model.结束后标题阅读权限.用户组" :datas="用户组" :deletable="false" @change="changeQuanxian(model.结束后标题阅读权限)"></Select>
            <Button v-if="model.结束后标题阅读权限.用户组 == '自定义'" @click="changeQuanxian(model.结束后标题阅读权限)"><i class="h-icon-edit"></i></Button>
          </div>
        </FormItem>
        <FormItem label="结束后正文阅读权限:" prop="结束后正文阅读权限">
          <div class="h-input-group">
            <Select v-model="model.结束后正文阅读权限.用户组" :datas="用户组" :deletable="false" @change="changeQuanxian(model.结束后正文阅读权限)"></Select>
            <Button v-if="model.结束后正文阅读权限.用户组 == '自定义'" @click="changeQuanxian(model.结束后正文阅读权限)"><i class="h-icon-edit"></i></Button>
          </div>
        </FormItem>
        <FormItem label="结束后公告编辑权限:" prop="结束后公告编辑权限">
          <div class="h-input-group">
            <Select v-model="model.结束后公告编辑权限.用户组" :datas="用户组" :deletable="false" @change="changeQuanxian(model.结束后公告编辑权限)"></Select>
            <Button v-if="model.结束后公告编辑权限.用户组 == '自定义'" @click="changeQuanxian(model.结束后公告编辑权限)"><i class="h-icon-edit"></i></Button>
          </div>
        </FormItem>
        <FormItem label="结束后发言权限:" prop="结束后发言权限">
          <div class="h-input-group">
            <Select v-model="model.结束后发言权限.用户组" :datas="用户组" :deletable="false" @change="changeQuanxian(model.结束后发言权限)"></Select>
            <Button v-if="model.结束后发言权限.用户组 == '自定义'" @click="changeQuanxian(model.结束后发言权限)"><i class="h-icon-edit"></i></Button>
          </div>
        </FormItem>
        <FormItem label="结束后元权限:" prop="结束后元权限">
          <div class="h-input-group">
            <Select v-model="model.结束后元权限.用户组" :datas="用户组" :deletable="false" @change="changeQuanxian(model.结束后元权限)"></Select>
            <Button v-if="model.结束后元权限.用户组 == '自定义'" @click="changeQuanxian(model.结束后元权限)"><i class="h-icon-edit"></i></Button>
          </div>
        </FormItem>
      </Form>
    </div>
    <!-- h-modal-footer 将自带modal底部样式 -->
    <footer class="h-modal-footer">
      <button class="h-btn" @click="close">关闭</button>
      <button class="h-btn h-btn-primary" @click="success">确定</button>
    </footer>
  </div>
</template>

<script>
  import ModalAddUser from "./addUser.vue";
  export default {
    props: {
      shequId: String,
      tezheng: Array
    },
    data() {
      return {
        model: {
          社区: this.shequId,
          类型名称: "",
          特征: '常规',
          用户: '',
          
          标题阅读权限: {
            用户组: '所有人',
            独立用户们: []
          },
          正文阅读权限: {
            用户组: '所有人',
            独立用户们: []
          },
          公告编辑权限: {
            用户组: '所有人',
            独立用户们: []
          },
          元权限: {
            用户组: '所有人',
            独立用户们: []
          },
          
          结束后标题阅读权限: {
            用户组: '所有人',
            独立用户们: []
          },
          结束后正文阅读权限: {
            用户组: '所有人',
            独立用户们: []
          },
          结束后公告编辑权限: {
            用户组: '所有人',
            独立用户们: []
          },
          结束后发言权限: {
            用户组: '所有人',
            独立用户们: []
          },
          结束后元权限: {
            用户组: '所有人',
            独立用户们: []
          }
        },
        validationRules: {
          required: ['类型名称','特征']
        },
        用户组: ['我', '所有人', '所有会员', '所有成员', '本社区管理', '本社区版主', '自定义'],
      };
    },
    mounted() {
      this.model.用户 = Utils.getSessionLocal2Json("token-session")._id;
    },
    methods: {
      success() {
        let validResult = this.$refs.form.valid();
        if (validResult.result) {
        	R.UserHuatiType.save(this.model).then(res =>{
        		if (res.ok) {
        		  this.$Notice({
        		    type: 'success',
        		    title: "成功",
        		    content: ""
        		  });
        		  this.$emit('success', this.model);
        		  this.close();
        		} else {
        		  this.$Notice({
        		    type: 'error',
        		    title: "失败",
        		    content: res.msg
        		  });
        		}
        	});
        } 
      },
      changeQuanxian(data){
        if(data.用户组 == '自定义'){
          this.$Modal({
            middle: true,
            hasDivider: true,
            closeOnMask: false,
          	component: {
          		vue: ModalAddUser,
              datas: {duliusers: data.独立用户们}
          	},
            events: {
              success: (modal, data) => {
                data.独立用户们 = data;
              }
            }
          });
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

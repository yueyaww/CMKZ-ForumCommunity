<template>
  <div>
    <!-- h-modal-header 将自带modal头部样式 -->
    <header class="h-modal-header">添加</header>
    <div style="padding:15px">
      <Form ref="form" :rules="validationRules" :model="model">
        <FormItem label="角色" prop="role">
          <Select v-model="model.role" :datas="roles" keyName="_id" titleName="name"></Select>
        </FormItem>
        <FormItem label="用户组" prop="userGroups">
          <Select v-model="model.userGroups" :datas="userGroups" keyName="_id" titleName="name" :multiple="true"></Select>
        </FormItem>
        <FormItem label="用户名" prop="username">
          <template v-slot:label>用户名</template>
          <input type="text" v-model="model.username">
        </FormItem>
        <FormItem label="密码" prop="password">
          <template v-slot:label>密码</template>
          <input type="text" v-model="model.password">
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
  export default {
    props: {
      userGroups: Array,
      roles: Array,
      data: Object,
      ugId: String
    },
    data() {
      return {
        model: {
          username: '',
          password: '',
          userGroups: [this.ugId],
          role: ''
        },
        validationRules: {
          required: ['username','password','userGroups', 'role']
        },
        isLoading: false
      };
    },
    mounted() {
      if(this.data){
        R.User.get({'id': this.data._id}).then(res =>{
          this.model = res.body;
        });
      }
    },
    methods: {
      success() {
        let validResult = this.$refs.form.valid();
        if (validResult.result) {
          this.$Loading();
        	R.User.save(this.model).then(res =>{
        		if (res.ok) {
        		  this.$Notice({
        		    type: 'success',
        		    title: "成功",
        		    content: "添加"
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
          this.$Loading.close();
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

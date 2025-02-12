<template>
  <div>
    <!-- h-modal-header 将自带modal头部样式 -->
    <header class="h-modal-header">信息</header>
    <div style="padding:15px">
      <Form ref="form" :rules="validationRules" :model="model">
        <FormItem label="角色名称" prop="name">
          <input type="text" v-model="model.name">
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
      data: Object
    },
    data() {
      return {
        model: {
          name: ''
        },
        validationRules: {
          required: ['name']
        },
        isLoading: false
      };
    },
    mounted() {
      if(this.data){
        this.model = this.data;
      }
    },
    methods: {
      success() {
      	let validResult = this.$refs.form.valid();
      	if (validResult.result) {
          this.$Loading();
      		R.Role.save(this.model).then(res =>{
      			if (res.ok) {
      			  this.$Notice({
      			    type: 'success',
      			    title: "成功",
      			    content: "信息"
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

<template>
  <div>
    <!-- h-modal-header 将自带modal头部样式 -->
    <header class="h-modal-header">话题</header>
    <div style="padding:15px">
      <Form ref="form" :rules="validationRules" :model="model">
        <FormItem label="社区名:" prop="社区名">
          <input type="text" v-model="model.社区名">
        </FormItem>
        <FormItem label="权限类别:" prop="权限类别">
          <Select v-model="model.权限类别" :datas="['所有人', '成员']" :deletable="false"></Select>
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
    },
    data() {
      return {
        model: {
          社区名: "",
          权限类别: "所有人"
        },
        validationRules: {
          required: ['社区名']
        }
      };
    },
    mounted() {
    },
    methods: {
      success() {
        let validResult = this.$refs.form.valid();
        if (validResult.result) {
        	R.Shequ.save(this.model).then(res =>{
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
      close() {
        this.$emit('close');
      }
    }
  };
</script>

<style>
</style>

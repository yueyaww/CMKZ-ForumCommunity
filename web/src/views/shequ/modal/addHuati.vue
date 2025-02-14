<template>
  <div>
    <!-- h-modal-header 将自带modal头部样式 -->
    <!-- <header class="h-modal-header"></header> -->
    <div style="padding:15px">
      <Form ref="form" :rules="validationRules" :model="model" mode="threecolumn">
        <FormItem label="标题:" prop="标题">
          <input type="text" v-model="model.标题">
        </FormItem>
        <FormItem label="">
          <SwitchList v-model="model.文本类型" :datas="['富文本', 'Markdown']"></SwitchList>
        </FormItem>
      </Form>
      <RichTextEditor v-model="model.文本内容" v-if="model.文本类型 == '富文本'"></RichTextEditor>
      <MarkdownEditor :readonly="false" v-model="model.文本内容" v-if="model.文本类型 == 'Markdown'"/>
    </div>
    <!-- h-modal-footer 将自带modal底部样式 -->
    <footer class="h-modal-footer">
      <button class="h-btn h-btn-primary" @click="success">确定</button>
    </footer>
  </div>
</template>

<script>
  export default {
    props: {
      shequId: String
    },
    data() {
      return {
        model: {
          标题: "",
          文本类型: "富文本",
          文本内容: ' ',
          作者: '',
          创建时间: new Date(),
          更新时间: new Date(),
          社区: this.shequId
        },
        validationRules: {
          required: ['标题']
        },
      };
    },
    mounted() {
      this.model.作者 = Utils.getSessionLocal2Json("token-session").用户名;
    },
    methods: {
      success() {
        let validResult = this.$refs.form.valid();
        if (validResult.result) {
        	R.Huati.save(this.model).then(res =>{
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

<template>
  <div>
    <!-- h-modal-header 将自带modal头部样式 -->
    <header class="h-modal-header">话题</header>
    <div style="padding:10px">
      <Form ref="form" :rules="validationRules" :labelWidth="120" :model="model" mode="threecolumn">
        <FormItem label="标题:" prop="标题">
          <input type="text" v-model="model.标题">
        </FormItem>
        <FormItem label="特征:">
          <Select v-model="model.特征" :datas="['常规', '付费', '私密']" :deletable="false"></Select>
        </FormItem>
        <FormItem label="标题阅读权限:">
          <Select v-model="model.标题阅读权限" :datas="用户组" :deletable="false"></Select>
        </FormItem>
        <FormItem label="正文阅读权限:">
          <Select v-model="model.正文阅读权限" :datas="用户组" :deletable="false"></Select>
        </FormItem>
        <FormItem label="发言权限:">
          <Select v-model="model.发言权限" :datas="用户组" :deletable="false"></Select>
        </FormItem>
        <FormItem label="公告编辑权限:">
          <Select v-model="model.公告编辑权限" :datas="用户组" :deletable="false"></Select>
        </FormItem>
        <FormItem label="元权限:">
          <Select v-model="model.元权限" :datas="用户组" :deletable="false"></Select>
        </FormItem>
      </Form>
      <SwitchList v-model="model.文本类型" :datas="['富文本', 'Markdown']"></SwitchList>
      <RichTextEditor v-model="model.文本内容" v-if="model.文本类型 == '富文本'"></RichTextEditor>
      <MarkdownEditor :readonly="false" v-model="model.文本内容" v-if="model.文本类型 == 'Markdown'"/>
    </div>
    <!-- h-modal-footer 将自带modal底部样式 -->
    <footer class="h-modal-footer">
      <Button color="green" @click="success()">确定</Button>
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
          社区: this.shequId,
          特征: '常规',
          标题阅读权限: '所有人',
          正文阅读权限: '所有人',
          发言权限: '所有人',
          公告编辑权限: '所有人',
          元权限: '我'
        },
        validationRules: {
          required: ['标题']
        },
        用户组: ['我', '所有人', '所有会员', '所有成员', '本社区管理', '本社区版主', '执悲今厄']
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

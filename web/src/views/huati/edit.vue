<template>
  <div class="frame-page">
    <Row :space="10">
      <Cell :xs='24' :sm='24' :md='4' :lg='4' :xl='4'>
      </Cell>
      <Cell :xs='24' :sm='24' :md='16' :lg='16' :xl='16'>
        <div class="h-panel">
          <div class="h-panel-bar">
            <span class="h-panel-title">话题</span>
          </div>
          <div class="h-panel-bar">
            <Form ref="form" :rules="validationRules" :labelWidth="150" :model="model" mode="threecolumn">
              <FormItem label="标题:" prop="标题" :single="true">
                <input type="text" v-model="model.标题">
              </FormItem>
              <FormItem label="话题类型:">
                <Select v-model="model.预设" keyName="_id" titleName="类型名称" 
                @change="changeYuShe" :datas="huatiTypes" :deletable="false"></Select>
              </FormItem>
              <template v-if="model.预设">
                <FormItem label="特征:">
                  <input type="text" :value="model.特征" readonly/>
                </FormItem>
                <FormItem label="标题阅读权限:">
                  <input type="text" :value="model.标题阅读权限" readonly/>
                </FormItem>
                <FormItem label="正文阅读权限:">
                  <input type="text" :value="model.正文阅读权限" readonly/>
                </FormItem>
                <FormItem label="公告编辑权限:">
                  <input type="text" :value="model.公告编辑权限" readonly/>
                </FormItem>
                <FormItem label="元权限:">
                  <input type="text" :value="model.元权限" readonly/>
                </FormItem>
                
                <FormItem label="结束后标题阅读权限:">
                  <input type="text" :value="model.结束后标题阅读权限" readonly/>
                </FormItem>
                <FormItem label="结束后正文阅读权限:">
                  <input type="text" :value="model.结束后正文阅读权限" readonly/>
                </FormItem>
                <FormItem label="结束后公告编辑权限:">
                  <input type="text" :value="model.结束后公告编辑权限" readonly/>
                </FormItem>
                <FormItem label="结束后发言权限:">
                  <input type="text" :value="model.结束后发言权限" readonly/>
                </FormItem>
                <FormItem label="结束后元权限:">
                  <input type="text" :value="model.结束后元权限" readonly/>
                </FormItem>
                
              </template>
            </Form>
          </div>
          <div class="h-panel-body">
            <SwitchList v-model="model.文本类型" :datas="['富文本', 'Markdown']"></SwitchList>
            <RichTextEditor v-model="model.文本内容" v-if="model.文本类型 == '富文本'"></RichTextEditor>
            <MarkdownEditor :readonly="false" v-model="model.文本内容" v-if="model.文本类型 == 'Markdown'"/>
            <div style="height: 60px;">
              <div style="float: right; padding:20px 0px;">
                <Button color="green" @click="success()">保存</Button>
              </div>
            </div>
          </div>
          
        </div>
      </Cell>
      <Cell :xs='24' :sm='24' :md='4' :lg='4' :xl='4'>
      </Cell>
    </Row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        height: 450,
        model: {
          预设: null,
          标题: "",
          文本类型: "富文本",
          文本内容: ' ',
          作者: '',
          创建时间: new Date(),
          更新时间: new Date(),
          社区: '',
          特征: '',
          标题阅读权限: '',
          正文阅读权限: '',
          公告编辑权限: '',
          元权限: '',
          
          结束后标题阅读权限: '',
          结束后正文阅读权限: '',
          结束后公告编辑权限: '',
          结束后发言权限: '',
          结束后元权限: ''
        },
        validationRules: {
          required: ['标题']
        },
        huatiTypes: []
      };
    },
    created() {
      this.height = (document.body.clientHeight - 272);
    },
    mounted() {
      this.model.社区 = this.$route.query.shequId;
      this.model.作者 = Utils.getSessionLocal2Json("token-session").用户名;
      R.HuatiType.gets({社区: this.$route.query.shequId}).then(resp => {
        if (resp.ok) {
          this.huatiTypes = resp.body;
        }
      });
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
      changeYuShe(data){
        this.model.特征 = data.特征;
        this.model.标题阅读权限 = data.标题阅读权限.用户组;
        this.model.正文阅读权限 = data.正文阅读权限.用户组;
        this.model.公告编辑权限 = data.公告编辑权限.用户组;
        this.model.元权限 = data.元权限.用户组;
        
        this.model.结束后标题阅读权限 = data.结束后标题阅读权限.用户组;
        this.model.结束后正文阅读权限 = data.结束后正文阅读权限.用户组;
        this.model.结束后公告编辑权限 = data.结束后公告编辑权限.用户组;
        this.model.结束后发言权限 = data.结束后发言权限.用户组;
        this.model.结束后元权限 = data.结束后元权限.用户组;
      },
      close() {
        this.$emit('close');
      }
    }
  };
</script>

<style>
</style>

<template>
  <div class="layoutList">
    <!-- h-modal-header 将自带modal头部样式 -->
    <header class="h-modal-header">{{huati.标题}}</header>
    <div class="bottom-line"></div>
    <div style="padding:15px">
      <Form ref="form" :model="huati" mode="threecolumn" :readonly="true">
        <FormItem label="">
          <h2>#1</h2>
        </FormItem>
        <FormItem label="作者:">
          {{huati.作者}}
        </FormItem>
        <FormItem label="创建时间:">
          {{dateFilter(huati.创建时间)}}
        </FormItem>
      </Form>
      <div class="bottom-line"></div>
      
      <div v-html="rawHtml" v-if="huati.文本类型 =='富文本'"></div>
      <MarkdownEditor :readonly="true" v-model="huati.文本内容" v-if="huati.文本类型 == 'Markdown'"/>
      <footer class="h-modal-footer">
        <button class="h-btn h-btn-primary" @click="huifu('#1')">回复</button>
      </footer>
      
      <div v-for="(huatihuifu, index) in huatihuifs" :key="index">
        <Form ref="form" :model="huati" mode="threecolumn" :readonly="true">
          <FormItem label="">
            <h2>#{{index+2}}</h2>
          </FormItem>
          <FormItem label="作者:">
            {{huatihuifu.作者}}
          </FormItem>
          <FormItem label="提交时间:">
            {{dateFilter(huatihuifu.创建时间)}}
          </FormItem>
        </Form>
        <div class="bottom-line"></div>
        
        <div v-html="huatihuifu.文本内容" v-if="huatihuifu.文本类型 =='富文本'"></div>
        <MarkdownEditor :readonly="true" v-model="huatihuifu.文本内容" v-if="huatihuifu.文本类型 == 'Markdown'"/>
        <footer class="h-modal-footer">
          <button class="h-btn h-btn-primary" @click="huifu('#'+(index+2))">回复</button>
        </footer>
      </div>
      
      <div>
        <SwitchList v-model="model.文本类型" :datas="['富文本', 'Markdown']"></SwitchList>
        <RichTextEditor v-model="model.文本内容" v-if="model.文本类型 == '富文本'"></RichTextEditor>
        <MarkdownEditor :readonly="false" v-model="model.文本内容" v-if="model.文本类型 == 'Markdown'"/>
        <footer class="h-modal-footer">
          <Button color="green" @click="tijiao()">提交</Button>
        </footer>
      </div>
      
    </div>
    <div style="height: 50px;"></div>
  </div>
</template>

<script>
  export default {
    props: {
      huati: Object
    },
    data() {
      return {
        rawHtml: this.huati.文本内容,
        model: {
          话题: this.huati._id,
          文本类型: "富文本",
          文本内容: " ",
          作者: "",
          创建时间: "",
        },
        huatihuifs: []
      };
    },
    mounted() {
      this.getHuatiHuifus();
    },
    methods: {
      huifu(to){
        this.model.文本内容 = '回复:' + to;
      },
      getHuatiHuifus(){
        R.HuatiHuifu.gets({"话题": this.huati._id}).then(res =>{
        	if (res.ok) {
            this.huatihuifs = res.body;
        	}
        }).then(() =>{
          // for (var i = 0; i < this.huatihuifs.length; i++) {
          //   console.log(this.huatihuifs[i]);
          // }
        });
      },
      tijiao(){
        this.model.作者 = Utils.getSessionLocal2Json("token-session").用户名;
        this.model.创建时间 = new Date();
        R.HuatiHuifu.save(this.model).then(res =>{
        	if (res.ok) {
        	  this.$Notice({
        	    type: 'success',
        	    title: "成功",
        	    content: ""
        	  });
        	  this.getHuatiHuifus();
            this.model.文本内容 = " ";
        	} else {
        	  this.$Notice({
        	    type: 'error',
        	    title: "失败",
        	    content: res.msg
        	  });
        	}
        });
      },
      close() {
        this.$emit('close');
      },
      dateFilter(value){
        if(!value){
          return null
        }else{
          return Manba(value).format('k');
        }
      }
    }
  };
</script>

<style  lang="less" scoped>
  .layoutList {
    height: 1000px;
    overflow: auto;
    
    padding: 20px;
  }
</style>

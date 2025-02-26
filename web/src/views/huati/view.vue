<template>
  <div class="frame-page">
    <Row :space="10">
      <Cell :xs='24' :sm='24' :md='4' :lg='4' :xl='4'>
      </Cell>
      <Cell :xs='24' :sm='24' :md='16' :lg='16' :xl='16'>
        <div class="h-panel">
          <div class="h-panel-bar">
            <span class="h-panel-title">{{huati.标题}}</span>
          </div>
          <div class="h-panel-body">
            <Row :space="10">
              <Cell :xs='4' :sm='4' :md='4' :lg='4' :xl='4'>
                <ul>
                  <li><h2>#1</h2></li>
                  <li>{{huati.作者}}</li>
                  <li>{{dateFilter(huati.创建时间)}}</li>
                </ul>
              </Cell>
              <Cell :xs='20' :sm='20' :md='20' :lg='20' :xl='20'>
                <div v-html="huati.文本内容" v-if="huati.文本类型 =='富文本'"></div>
                <MarkdownEditor :readonly="true" v-model="huati.文本内容" v-if="huati.文本类型 == 'Markdown'"/>
              </Cell>
            </Row>
            <div style="height: 55px;">
              <div style="float: right; padding:20px 0px;">
                <button class="h-btn h-btn-primary" @click="huifu('#1')">回复</button>
              </div>
            </div>
          </div>
          <div class="bottom-line"></div>
          <div class="h-panel-body" v-for="(huatihuifu, index) in huatihuifs" :key="index">
            <Row :space="10">
              <Cell :xs='4' :sm='4' :md='4' :lg='4' :xl='4'>
                <ul>
                  <li><h2>#{{index+2}}</h2></li>
                  <li>{{huatihuifu.作者}}</li>
                  <li>{{dateFilter(huatihuifu.创建时间)}}</li>
                </ul>
              </Cell>
              <Cell :xs='20' :sm='20' :md='20' :lg='20' :xl='20'>
                <div v-html="huatihuifu.文本内容" v-if="huatihuifu.文本类型 =='富文本'"></div>
                <MarkdownEditor :readonly="true" v-model="huatihuifu.文本内容" v-if="huatihuifu.文本类型 == 'Markdown'"/>
              </Cell>
            </Row>
            <div style="height: 80px;">
              <div style="float: right; padding:20px 0px;">
                <button class="h-btn h-btn-primary" @click="huifu('#'+(index+2))">回复</button>
              </div>
            </div>
            <div class="bottom-line"></div>
          </div>
          
          <div class="h-panel-body">
            <SwitchList v-model="model.文本类型" :datas="['富文本', 'Markdown']"></SwitchList>
            <RichTextEditor v-model="model.文本内容" v-if="model.文本类型 == '富文本'"></RichTextEditor>
            <MarkdownEditor :readonly="false" v-model="model.文本内容" v-if="model.文本类型 == 'Markdown'"/>
            <div style="height: 60px;">
              <div style="float: right; padding:20px 0px;">
                <Button color="green" @click="tijiao()">提交</Button>
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
        huati: {
          作者: '',
          创建时间: ''
        },
        model: {
          话题: '',
          文本类型: "富文本",
          文本内容: " ",
          作者: "",
          创建时间: "",
        },
        huatihuifs: []
      };
    },
    mounted() {
      R.Huati.get({"id": this.$route.params.id}).then(res =>{
      	if (res.ok) {
          this.huati = res.body;
      	}
      }).then(() =>{
        this.model.话题 = this.huati._id;
        R.HuatiHuifu.gets({"话题": this.huati._id}).then(res =>{
        	if (res.ok) {
            this.huatihuifs = res.body;
        	}
        });
      });
    },
    methods: {
      huifu(to){
        this.model.文本内容 = '回复:' + to;
      },
      getHuatiHuifus(){
        R.HuatiHuifu.gets({"话题": this.huati._id}).then(res =>{
        	if (res.ok) {
            this.huatihuifs = res.body;
            console.log();
        	}
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

<style scoped>
  ul li {
    padding: 10px;
  }
</style>

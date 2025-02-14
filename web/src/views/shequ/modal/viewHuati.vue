<template>
  <div>
    <!-- h-modal-header 将自带modal头部样式 -->
    <header class="h-modal-header">{{huati.标题}}</header>
    <div class="bottom-line"></div>
    <div style="padding:15px">
      <Form ref="form" :model="huati" mode="threecolumn" :readonly="true">
        <FormItem label="作者:">
          {{huati.作者}}
        </FormItem>
        <FormItem label="创建时间:">
          {{dateFilter(huati.创建时间)}}
        </FormItem>
      </Form>
      <div class="bottom-line"></div>
      <h2>#1</h2>
      <div v-html="rawHtml" v-if="huati.文本类型 =='富文本'"></div>
      <MarkdownEditor :readonly="true" v-model="huati.文本内容" v-if="huati.文本类型 == 'Markdown'"/>
    </div>
    
    <!-- h-modal-footer 将自带modal底部样式 -->
    <footer class="h-modal-footer">
    </footer>
  </div>
</template>

<script>
  export default {
    props: {
      huati: Object
    },
    data() {
      return {
        rawHtml: this.huati.文本内容
      };
    },
    mounted() {
    },
    methods: {
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

<style>
</style>

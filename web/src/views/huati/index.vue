<template>
  <div class="frame-page ">
    <div class="search-list-vue frame-page h-panel">
      <div class="h-panel-bar">
        <span class="h-panel-title">话题</span>
      </div>
      <div class="h-panel-body" v-if="height" style="overflow:auto;" :style="'height:'+height+'px;'">
        <div>
        </div>
      </div>
    </div>
   </div> 
</template>

<script>
  export default {
    data() {
      return {
        height: 450
      };
    },
    created() {
      this.height = (document.body.clientHeight - 272);
    },
  }
</script>

<style>
</style>

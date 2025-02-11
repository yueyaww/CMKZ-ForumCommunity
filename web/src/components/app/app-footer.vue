<style lang="less">
.app-footer {
  text-align: center;
  padding: 10px 0 30px;
  color: rgba(0,0,0,.45);
  a {
    color: rgba(0,0,0,.45);
  }
}
</style>

<template>
  <div class="app-footer">
    Copyright © {{year}} 轲目苦津
  </div>
</template>
<script>
export default {
  data() {
    return {
      year: Manba().year()
    };
  }
};
</script>

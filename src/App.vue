<template>
  <div id="app" class="backColor">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style scoped lang="less">
  @import "style/reset.css";
  @import "style/main.less";
</style>

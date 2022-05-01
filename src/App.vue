<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'
onLaunch(() => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>
<style lang="scss">
/*
  全局公共样式和字体图标
*/
@font-face {
  font-family: yticon;
  font-weight: normal;
  font-style: normal;
  src: url('https://at.alicdn.com/t/font_1078604_w4kpxh0rafi.ttf') format('truetype');
}
</style>

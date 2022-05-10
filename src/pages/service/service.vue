<script lang="ts" setup>
import uniChat from '@/component/uni-chat/uni-chat.vue'

function moreClick(index: number) {
  if (index === 0)
    console.log('照片')
}
</script>
<template>
  <view>
    <uni-chat />
  </view>
</template>

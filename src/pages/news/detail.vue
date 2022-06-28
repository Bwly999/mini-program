<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { type News } from '@/api/news'
import { useGlobalVarStore } from '@/store/globalVar'

const newsId = ref('')
const newsInfo = ref<News>()
function loadNewsInfo() {
  const globalVar = useGlobalVarStore()
  newsInfo.value = globalVar.selectedNews
}
onLoad((option) => {
  newsId.value = option.id || ''
  loadNewsInfo()
})
</script>
<template>
  <view>
    <view class="head">
      <view class="title font-bold text-2xl">
        {{ newsInfo?.title }}
      </view>
    </view>
    <view v-html="newsInfo?.content" />
  </view>
</template>

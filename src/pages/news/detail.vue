<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { type News, getNewsById } from '@/api/news'
import { useGlobalVarStore } from '@/store/globalVar'

const newsId = ref('')
const newsInfo = ref<News>()
function loadNewsInfo() {
  const globalVar = useGlobalVarStore()
  if (globalVar.selectedNews.id !== undefined) {
    newsInfo.value = globalVar.selectedNews
  }
  else {
    getNewsById(newsId.value).then((res: any) => {
      newsInfo.value = res.data
    }).catch(() => {
      newsInfo.value = {
        id: '1',
        title: '21323dnlaskdn你打算考到哪里的年test',
        time: '2022/6/11',
        image: 'https://d1q6f0aelx0por.cloudfront.net/product-logos/library-sapmachine-logo.png',
        content: '123213dasdasdasd',
      }
    })
  }
}
onLoad((option) => {
  newsId.value = option.id || ''
  loadNewsInfo()
})
</script>
<template>
  <view class="p2">
    <view class="head">
      <view class="title font-bold text-3xl">
        {{ newsInfo?.title }}
      </view>
      <view class="user flex items-center">
        <image :src="newsInfo?.image" class="rounded w-10 h-10" mode="scaleToFill" />
        <span class="ml-2 font-normal font-sans underline decoration-pink-500 underline-offset-2 ">
          {{ '助农资讯' }}
        </span>
        <span class="ml-2 text-gray text-sm">
          {{ newsInfo?.time }}
        </span>
      </view>
    </view>
    <view class="mt-3" v-html="newsInfo?.content" />
  </view>
</template>

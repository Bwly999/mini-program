<script lang="ts" setup>
import { useGlobalVarStore } from '@/store/globalVar'
import { type News } from '@/api/news'
// interface Newscard {
//   id: string
//   title: string
//   content: string
//   image: string
//   time: string
// }
const props = defineProps<{
  news: News
  cssClass?: string
}>()
const globalVar = useGlobalVarStore()
function navToNewsDetail() {
  globalVar.selectedNews = props.news
  uni.navigateTo({
    url: `/pages/news/detail?id=${props.news.id}`,
  })
}
</script>

<template>
  <view class="bg-white rounded-lg pl-2" :class="props.cssClass" @click="navToNewsDetail">
    <view class="title">
      <text class="text-gray-900 font-bold">
        {{ props.news.title }}
      </text>
    </view>
    <view class="content p1 h-20vw overflow-hidden text-ellipsis ">
      <view v-html="props.news.content" />
      <!-- <text class="text-gray-900">
        {{ props.news.content }}
      </text> -->
    </view>
  </view>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { listNews } from '@/api/news'

// component
import NewsCard from '@/component/news-card/news-card.vue'

interface News {
  id: string
  title: string
  content: string
  image: string
  time: string
}

const isLoading = ref(false)
const queryParams = reactive({
  id: '',
  page: 1,
  pageSize: 10,
})
const newsList = ref<News[]>([])
const totalNewsNum = ref()
function loadNews() {
  if (newsList.value.length === totalNewsNum.value) {
    uni.showToast({
      title: '没有更多了',
      icon: 'none',
    })
    return
  }
  isLoading.value = true
  listNews(queryParams).then((res: any) => {
    newsList.value.push(...res.data.conent)
    queryParams.page++
    totalNewsNum.value = res.data.total
  }).catch((err) => {
    console.log(err)
    uni.showToast({
      title: '加载失败',
      icon: 'none',
    })
  }).finally(() => {
    isLoading.value = false
  })
}
</script>
<template>
  <view class="bg-slate-50">
    <view class="flex flex-col gap-2">
      <news-card v-for="(news, i) in newsList" :key="i" :news="news" />
    </view>
    <view v-if="isLoading" class="load-footer">
      <view class="load-more">
        <text class="text-gray-500">
          加载中...
        </text>
      </view>
    </view>
  </view>
</template>

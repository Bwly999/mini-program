<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import LoadingDance from '../../component/loading-dance/loading-dance.vue'
import { type News, listNews } from '@/api/news'

// component
import NewsCard from '@/component/news-card/news-card.vue'

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
    const gen = (k: any, v: any): News => {
      return {
        id: v,
        title: `${k}, ${v} title`,
        content: '21123<p>das</p>',
        time: '1',
        image: '12312',
      }
    }

    newsList.value = Array.from({ length: 20 }, (k, v) => gen(k, v))
    uni.showToast({
      title: '加载失败',
      icon: 'none',
    })
  }).finally(() => {
    isLoading.value = false
  })
}

onLoad(() => {
  loadNews()
})
</script>
<template>
  <view class="bg-slate-100">
    <view class="100vh">
      <view class="flex flex-col gap-2">
        <news-card v-for="(news, i) in newsList" :key="i" :news="news" css-class="mx-1" />
      </view>
      <view v-if="isLoading" class="load">
        <loading-dance />
      </view>
    </view>
  </view>
</template>
<style scoped>
.load {
  display: fixed;
  height: 80vh;
  width: 100vw;
}
</style>

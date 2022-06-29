<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { onLoad, onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'
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
    newsList.value.push(...res.data.content)
    queryParams.page++
    totalNewsNum.value = res.data.totalElements
  }).catch((err) => {
    console.log(err)
    // const gen = (k: any, v: any): News => {
    //   return {
    //     id: v,
    //     title: `${k}, ${v} title`,
    //     content: '21123<p>das</p>',
    //     time: '1',
    //     goodsList: [
    //       {
    //         id: '62b922b3e4061020f6738d2b',
    //         name: '大虾鲜活超大基围虾青岛特大青虾冷冻鲜对虾速冻海虾虾类海鲜水产',
    //         coverImgUrl: 'http://122.9.37.63/goods/8e6e5be4-4097-40e0-bbd7-b5b23479aeb7.jpg',
    //       },
    //       {
    //         id: '62ba94dfa816d4170be20814',
    //         name: '大虾鲜活超大基围虾青岛特大青虾冷冻鲜对虾速冻海虾虾类海鲜水产',
    //         coverImgUrl: 'http://122.9.37.63/goods/f3865b30-8bf3-426f-9585-b6af380bba1f.jpg',
    //       },
    //     ],
    //   }
    // }

    // newsList.value = Array.from({ length: 3 }, (k, v) => gen(k, v))
    uni.showToast({
      title: '加载失败',
      icon: 'none',
    })
  }).finally(() => {
    isLoading.value = false
    uni.stopPullDownRefresh()
  })
}

onLoad(() => {
  loadNews()
})

onPullDownRefresh(() => {
  resetQueryParams()
  loadNews()
})

onReachBottom(() => {
  console.log('onReachBottom')
  if (isLoading.value)
    return
  loadNews()
})

function resetQueryParams() {
  queryParams.page = 1
  newsList.value = []
}
</script>
<template>
  <view class="bg-slate-100 h-100vh">
    <view class="">
      <view class="flex flex-col gap-2">
        <news-card v-for="(news, i) in newsList" :key="i" :news="news" css-class="mx-1 h-20vw" />
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

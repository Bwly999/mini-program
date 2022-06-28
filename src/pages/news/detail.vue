<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { type News, getNewsById } from '@/api/news'
import { useGlobalVarStore } from '@/store/globalVar'
import GoodCard from '@/component/good-card/good-card.vue'

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
        id: newsId.value,
        title: 'title',
        content: '21123<p>das</p>',
        time: '1',
        goodsList: [
          {
            id: '62b922b3e4061020f6738d2b',
            name: '大虾鲜活超大基围虾青岛特大青虾冷冻鲜对虾速冻海虾虾类海鲜水产',
            coverImgUrl: 'http://122.9.37.63/goods/8e6e5be4-4097-40e0-bbd7-b5b23479aeb7.jpg',
          },
          {
            id: '62ba94dfa816d4170be20814',
            name: '大虾鲜活超大基围虾青岛特大青虾冷冻鲜对虾速冻海虾虾类海鲜水产',
            coverImgUrl: 'http://122.9.37.63/goods/f3865b30-8bf3-426f-9585-b6af380bba1f.jpg',
          },
        ],
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
  <view class="p2 flex flex-col">
    <view class="head">
      <view class="font-bold text-3xl">
        {{ newsInfo?.title }}
      </view>
      <view class="user flex items-center">
        <image src="https://img1.baidu.com/it/u=249839577,4213778142&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" class="rounded w-10 h-10" mode="scaleToFill" />
        <span class="ml-2 font-normal font-sans underline decoration-pink-500 underline-offset-2 ">
          {{ '助农资讯' }}
        </span>
        <span class="ml-2 text-gray text-sm">
          {{ newsInfo?.time }}
        </span>
      </view>
    </view>
    <view class="mt-3" v-html="newsInfo?.content" />
    <view class="bg-slate-50 h-450rpx">
      <view class="title">
        推荐商品
      </view>
      <view class="good flex flex-wrap justify-center">
        <good-card v-for="v, i in newsInfo?.goodsList" :key="i" class="" :goods="v" css="w-180rpx h-240rpx m2" />
      </view>
    </view>
  </view>
</template>
<style lang="scss" scoped>
.title{
    font-weight: bold;
    margin: 0 20rpx 0 20rpx;
    position: relative;
    &:before{
      position: absolute;
      left: -10px;
      top: 0px;
      content: "";
      display: block;
      width: 3px;
      height: 40rpx;
      background-color: rgb(49, 135, 216);
    }
  }
</style>

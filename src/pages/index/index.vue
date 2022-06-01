<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'
import MixLoading from '../../component/mix-loading/mix-loading.vue'
import UniLoadMore from '../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.vue'
import Apple from './icon/apple.vue'
import Vegetable from './icon/vegetable.vue'
import Grain from './icon/grain.vue'
import Chick from './icon/chick.vue'
import Cow from './icon/cow.vue'
import Fish from './icon/fish.vue'
import GoodCard from '@/component/good-card/good-card.vue'
import type { Good } from '@/component/good-card/good-card.vue'
import Mysearch from '@/component/mysearch/mysearch.vue'
import type { GoodsParams, GoodsRecord } from '@/api/goods'
import { listGoods } from '@/api/goods'

const imgUrls = ref<Array<string>>([
  'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b4b60b10-5168-11eb-bd01-97bc1429a9ff.jpg',
  'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b1dcfa70-5168-11eb-bd01-97bc1429a9ff.jpg',
])

const showLoadMore = ref<boolean>(false)
const loadMoreText = ref<string>('加载中...')

const queryParams = ref<GoodsParams>({
  page: 1,
  pageSize: 10,
})
const goodsList = ref<GoodsRecord[]>([])
function sleep(delay: number) {
  const start = (new Date()).getTime()
  while ((new Date()).getTime() - start < delay)
    continue
}
function loadGoodsInfo() {
  showLoadMore.value = true
  // sleep(1000)
  listGoods(queryParams.value).then((res: any) => {
    console.log(res)
    const { data } = res
    goodsList.value?.push(...data.content)
    if (data.content.length < queryParams.value.pageSize!) {
      uni.showToast({
        title: '没有更多了',
        icon: 'none',
      })
      loadMoreText.value = '没有更多了'
    }

    else { loadMoreText.value = '加载中...' }

    queryParams.value.page!++
  })
    .catch(() => {
      uni.showToast({
        title: '加载失败',
        icon: 'none',
      })
    })
    .finally(() => {
      setTimeout(() => {
        showLoadMore.value = false
      }, 1000)
      // showLoadMore.value = false
    })
}
loadGoodsInfo()
// onMounted(() => loadGoodsInfo())
onReachBottom(() => {
  console.log('onReachBottom')
  if (showLoadMore.value)
    return
  loadGoodsInfo()
})
// onPullDownRefresh(() => {
//   console.log('refresh')
//   loadGoodsInfo()
// })
function searchclick(options: any) {
  console.log(options)
}
const categoryList = ref([
  {
    name: '瓜果',
    icon: Apple,
  },
  {
    name: '蔬菜',
    icon: Vegetable,
  },
  {
    name: '粮油',
    icon: Grain,
  },
  {
    name: '禽类',
    icon: Chick,
  },
  {
    name: '畜牧',
    icon: Cow,
  },
  {
    name: '水产',
    icon: Fish,
  },
])

function navigateToCategory(category: string) {
  console.log(category)
  uni.navigateTo({
    url: `/pages/category/category?category=${category}`,
  })
}
</script>

<template>
  <view class="index">
    <!-- <view class="top-0 flex gap-2 bg-white z-1" style="position: -webkit-sticky; position: sticky;">
      <view class="search-box rounded-xl bg-gray-100 text-center">
        <input type="text" placeholder="输入关键字搜索">
        <view class="search-icon" />
      </view>
      <a class="ml-2 text-lg font-bold">农产品</a>
    </view> -->
    <Mysearch :select-list="[{name: '傻鸟1'},{name: 'bird'}]" @search-click="searchclick" />
    <view>
      <swiper class="w-100vw" indicator-dots="true">
        <swiper-item v-for="img, key in imgUrls" :key="key">
          <image class="" style="height: 100%;  width: 100%;" :src="img" />
        </swiper-item>
      </swiper>
    </view>
    <view class="m-1rem flex justify-center flex-col rounded-xl shadow-lg gap-2">
      <view class="flex justify-around flex-wrap relative text-5xl">
        <view v-for="(category, i) in categoryList" :key="i" class="flex flex-col" @click="navigateToCategory(category.name)">
          <component
            :is="category.icon"
            class="icon"
          />
          <a class="mt-1 text-center text-xs">{{ category.name }}</a>
        </view>
      </view>
      <!-- <view class="flex justify-around flex-wrap relative text-5xl">
        <view class="flex flex-col">
          <Apple
            class="icon"
          />
          <a class="mt-1 text-center text-xs">瓜果</a>
        </view>
        <view class="flex flex-col">
          <Vegetable
            class="icon"
          />
          <a class="mt-1 text-center text-xs">蔬菜</a>
        </view>
        <view class="flex flex-col">
          <Grain
            class="icon"
          />
          <a class="mt-1 text-center text-xs">粮油</a>
        </view>
        <view class="flex flex-col">
          <Chick
            class="icon"
          />
          <a class="mt-1 text-center text-xs">禽类</a>
        </view>
        <view class="flex flex-col">
          <Cow
            class="icon"
          />
          <a class="mt-1 text-center text-xs">畜牧</a>
        </view>
        <view class="flex flex-col">
          <Fish
            class="icon"
          />
          <a class="mt-1 text-center text-xs">水产</a>
        </view>
      </view> -->
      <view class="flex justify-around gap-2">
        <!-- <view class="flex flex-col">
          <Cow
            class="icon w-2rem h-2rem"
          />
          <a class="mt-1 text-center text-xs">畜牧</a>
        </view>
        <view class="flex flex-col">
          <Fish
            class="icon w-2rem h-2rem"
          />
          <a class="mt-1 text-center text-xs">水产</a>
        </view> -->
      </view>
    </view>
    <view class="app-status-bar-height" />
    <view class="top-box" :style="headerMarginTopStyle">
      <view class="t" />
      <view class="search">
        <u-search v-model="kw" placeholder="输入关键词搜索" :show-action="false" :disabled="true" @click="goSearch" />
      </view>
      <!--  #ifdef  MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ -->
      <view class="mp-btn" :style="menuButtonInfoStyle" />
      <!--  #endif -->
    </view>
  </view>
  <!-- <MixLoading /> -->
  <view class="flex grow-0">
    <view class="font-bold text-xl ml-5 ">
      热门商品
    </view>
    <!-- <img class="h-1rem object-scale-down" src="https://img.alicdn.com/imgextra/i1/O1CN01EjcAPM25IsjiwGyYs_!!6000000007504-2-tps-65-20.png"> -->
  </view>

  <!-- <good-card>1</good-card> -->
  <view class="good flex flex-wrap justify-center">
    <good-card v-for="v, i in goodsList" :key="i" class="" :goods="v" css="w-337rpx h-470rpx m2" />
  </view>
  <!-- <view v-if="showLoadMore" class="uni-loadmore text-center"> -->
  <view class="text-center">
    <view class="text-center flex justify-center">
      <view id="preloader_1">
        <span />
        <span />
        <span />
        <span />
        <span />
      </view>
    </view>
  </view>
  <!-- </view> -->
</template>

<style scoped>
.total-title {
    font-size: 24px;
    color: #111;
    font-weight: bold;
    line-height: 24px;
}
#preloader_1{
    position:relative;
    width: 55px;
}
#preloader_1 span{
    display:block;
    bottom:0px;
    width: 9px;
    height: 5px;
    background:#9b59b6;
    position:absolute;
    animation: preloader_1 1.5s  infinite ease-in-out;
    transform: translate(-2px, 0);
}
#preloader_1 span:nth-child(2){
    left:11px;
    animation-delay: .2s;
}
#preloader_1 span:nth-child(3){
    left:22px;
    animation-delay: .4s;
}
#preloader_1 span:nth-child(4){
    left:33px;
    animation-delay: .6s;
}
#preloader_1 span:nth-child(5){
    left:44px;
    animation-delay: .8s;
}
@keyframes preloader_1 {
    0% {height:5px;transform:translateY(0px);background:#9b59b6;}
    25% {height:30px;transform:translateY(15px);background:#3498db;}
    50% {height:5px;transform:translateY(0px);background:#9b59b6;}
    100% {height:5px;transform:translateY(0px);background:#9b59b6;}
}
/* .mlogo {
    margin: 4px 0 0 6px;
    height: 20px;
}
.fl {
    float: left;
    display: inline;
} */
</style>

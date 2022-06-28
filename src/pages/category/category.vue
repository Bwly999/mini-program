<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import uniEmpty from '@/component/uni-empty/uni-empty.vue'
import { listAllCategory } from '@/api/category'
import { type GoodsParams, type GoodsRecord, listGoods } from '@/api/goods'
import { mockData as goodMockData } from '@/mock/goods'
import { useGlobalVarStore } from '@/store/globalVar'
import { moneyFormatter } from '@/filters'

const isLoading = ref(false)
// 分类
const categoryList = ref<string[]>([])
const current = ref(-1)
function init() {
  listAllCategory().then((res: any) => {
    categoryList.value = res.data
    swichMenu(0)
  })
}

// 商品
const goodsList = ref<GoodsRecord[]>([])

const currentPage = ref(1)
const total = ref(0)
const goodsName = ref()
const lowPrice = ref()
const highPrice = ref()
function getGoodsList() {
  const params: GoodsParams = {
    category: categoryList.value[current.value],
    page: currentPage.value,
    pageSize: 10,
  }
  if (goodsName.value)
    params.name = goodsName.value

  if (lowPrice.value && highPrice.value) {
    params.lowPrice = Math.floor(lowPrice.value * 100)
    params.highPrice = Math.floor(highPrice.value * 100)
  }
  isLoading.value = true
  listGoods(params).then((res: any) => {
    console.log(res)
    if (res.data.content.length === 0) {
      uni.showToast({
        title: '没有更多了',
        icon: 'none',
      })
      return
    }
    goodsList.value.push(...res.data.content)
    total.value = res.data.total
    currentPage.value = currentPage.value + 1
  }).catch((_err: any) => {
    goodsList.value = goodMockData.content
    console.log(goodsList.value)
    uni.showToast({
      title: '加载失败',
      icon: 'error',
    })
  }).finally(() => {
    isLoading.value = false
  })
}

function goodsGoBottom() {
  console.log('reach bottom')
}

function goGoodsDetail(item: GoodsRecord) {
  uni.navigateTo({
    url: `/pages/goods/detail?id=${item.id}`,
  })
}

const resetQueryParams = () => {
  goodsName.value = undefined
  lowPrice.value = undefined
  highPrice.value = undefined
  currentPage.value = 1
}
const scrollTop = ref(0)
function swichMenu(index: number) {
  if (index === current.value)
    return
  current.value = index
  resetQueryParams()

  goodsList.value = []
  getGoodsList()
  console.log(scrollTop.value)
  scrollTop.value = 0
}
onMounted(() => init())

const globalVarStore = useGlobalVarStore()
onShow(() => {
  console.log(globalVarStore.selectedCategory)
  const category = globalVarStore.selectedCategory
  if (category) {
    const index = categoryList.value.findIndex(item => item === category)
    if (index !== -1 && index !== current.value)
      swichMenu(index)

    globalVarStore.selectedCategory = ''
  }
})

const selectDrawer = ref()

const openSelectDrawer = () => {
  selectDrawer.value.open()
}
const closeDrawer = () => {
  selectDrawer.value.close()
}

const onClickSelectConfirm = () => {
  currentPage.value = 1
  goodsList.value = []
  getGoodsList()
  closeDrawer()
}

const onClickResetSelect = () => {
  resetQueryParams()
}
</script>

<template>
  <!-- <view>
    <view class="flex">
      <view>
        <view class="price-s">
          价格
        </view>
      </view>
    </view>
  </view> -->
  <view class="flex flex-1 overflow-hidden h-100vh bg-white">
    <scroll-view class="u-tab-view menu-scroll-view" scroll-y="true" scroll-with-animation="true">
      <view
        v-for="(item,index) in categoryList" :key="index" class="u-tab-item"
        :class="[current==index ? 'u-tab-item-active' : '']" :data-current="index"
        @tap.stop="swichMenu(index)"
      >
        <text class="u-line-1">
          {{ item }}
        </text>
      </view>
      <view class=" select-icon bg-white rounded-full my-4 w-16 h-16 flex flex-col justify-center items-center" @click="openSelectDrawer">
        <view class="i-funnel text-red-400 text-2xl" />
        <view class="text-yellow-500 text-sm">
          筛选
        </view>
      </view>
      <uni-drawer ref="selectDrawer" mode="right" :mask-click="true">
        <view class="rounded-md p2 bg-white flex flex-col h-100vh">
          <view>
            <view class="font-bold text-lg">
              商品名
            </view>
            <view class="text-center align-middle">
              <input v-model="goodsName" class="bg-slate-100 rounded-full w-300rpx text-center align-middle" placeholder="请输入商品名">
            </view>
          </view>
          <view class="select-card mt-4">
            <view class="font-bold text-lg">
              价格
            </view>
            <view class="flex justify-between">
              <input v-model="lowPrice" class="bg-slate-100 rounded-full w-5rem text-center align-middle" type="number" placeholder="最低价">
              -
              <input v-model="highPrice" class="bg-slate-100 rounded-full w-5rem text-center align-middle" type="number" placeholder="最高价">
            </view>
          </view>

          <view class="flex mt-auto bg-slate-50">
            <button class="rounded-full bg-white text-red-500 px-6" @click="onClickResetSelect">
              重置
            </button>
            <button class="rounded-full bg-red-500 text-white px-6" @click="onClickSelectConfirm">
              确认
            </button>
          </view>
        </view>
      </uni-drawer>
    </scroll-view>
    <scroll-view
      class="goods-container flex bg-slate-50 rounded-md" scroll-y="true" :scroll-top="scrollTop"
      @scrolltolower="goodsGoBottom"
    >
      <view v-if="isLoading" class="flex justify-center items-center h-100vh">
        <uni-load-more icon-type="circle" status="loading" />
      </view>
      <view v-else>
        <uni-empty v-if="goodsList.length === 0" text="暂无商品" css-class="mt-200rpx justify-center" />
        <view v-for="(item, index) in goodsList" :key="index" class="flex m2 bg-white rounded-md shadow-md mb-4">
          <image
            mode="scaleToFill" lazy-load :src="item.coverImgUrl" class="h-225rpx max-w-200rpx max-h-225rpx rounded-lg shadow-md"
            @click="goGoodsDetail(item)"
          />
          <view class="ml-24rpx relative flex flex-col">
            <view class="" @click="goGoodsDetail(item)">
              <p class="title">
                {{ item.name }}
              </p>
            </view>
            <view v-if="item.stock" class="t2">
              库存:{{ item.stock }}
            </view>
            <view class="mt-auto">
              <view v-if="item.discountPrice" class="item">
                <text class="text-red-500">
                  ¥{{ moneyFormatter(item.discountPrice) }}
                </text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style scoped>

image{
  will-change: transform
}
.select-icon {
  transform: translate(20%, 0);
  background: #477664;
  box-shadow: inset 0.5rem 0.5rem 1.2rem #345649,
              inset -0.5rem -0.5rem 1.2rem #5a967f;
}

.i-funnel {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBhcmlhLWhpZGRlbj0idHJ1ZSIgcm9sZT0iaW1nIiBjbGFzcz0iaWNvbmlmeSBpY29uaWZ5LS1waCIgd2lkdGg9IjFlbSIgaGVpZ2h0PSIxZW0iIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiIHZpZXdCb3g9IjAgMCAyNTYgMjU2Ij48cGF0aCBmaWxsPSIjZmIyMzIzIiBkPSJNMTEyIDIzNy4xYTE5LjYgMTkuNiAwIDAgMS05LjQtMi40QTE5LjkgMTkuOSAwIDAgMSA5MiAyMTcuMXYtNzYuNUwyNy4zIDY5LjVBMjAgMjAgMCAwIDEgNDIuMSAzNmgxNzEuOGEyMCAyMCAwIDAgMSAxNC44IDMzLjVMMTY0IDE0MC42djU1LjFhMjAuMSAyMC4xIDAgMCAxLTguOSAxNi43bC0zMiAyMS4zYTIwLjQgMjAuNCAwIDAgMS0xMS4xIDMuNFpNNTEuMSA2MGw1OS43IDY1LjZhMTkuOCAxOS44IDAgMCAxIDUuMiAxMy41djcwLjVsMjQtMTZ2LTU0LjVhMTkuOCAxOS44IDAgMCAxIDUuMi0xMy41TDIwNC45IDYwWk05MyAxNDEuOFpNMjEzLjkgNjBaIj48L3BhdGg+PC9zdmc+");
  background-size: cover;
  width: 1em;
  height: 1em;
}
.category-page {
display: flex;
flex-direction: column;
width: 100vw;
height: calc(100vh - var(--window-bottom) - var(--status-bar-height) - var(--window-top));
}

.u-tab-view {
  width: 180rpx;
  height: 100%;
  background-color: #f6f6f6;
}

.u-tab-item {
  height: 110rpx;
  background: #fff;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26rpx;
  color: #444;
  font-weight: 400;
  line-height: 1;
}

.u-tab-item-active {
  position: relative;
  color: #000;
  font-size: 30rpx;
  font-weight: 600;
  --un-bg-opacity: 1;
  background-color: rgba(248, 250, 252, var(--un-bg-opacity));
}

.u-tab-item-active::before {
  content: "";
  position: absolute;
  border-left: 4px solid #e64340;
  height: 60rpx;
  left: 0;
  top: 25rpx;
}

.goods-container {
  flex: 1;
  height: 100%;
}

.t {
  font-weight: bold;
  color: #333;
  font-size: 28rpx;
}

.t2 {
  color: #666;
  font-size: 26rpx;
}

.title {
  width:100%;
  height:2.8rem;
  font-size:1rem;
  overflow:hidden;
  text-overflow: ellipsis;
  display:-webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  font-weight: 550;
}

.price {
  color: #e64340;
  font-size: 40rpx;
  display: flex;
  align-items: center;
}

.addCar {
  position: absolute;
  right: 24rpx;
  bottom: 16rpx;
}

</style>

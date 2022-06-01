<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import uniEmpty from '@/component/uni-empty/uni-empty.vue'
import { listAllCategory } from '@/api/category'
import type { Category } from '@/api/category'
import { type GoodsParams, type GoodsRecord, listGoods } from '@/api/goods'
import { mockData as categoryMockData } from '@/mock/category'
import { mockData as goodMockData } from '@/mock/goods'

const isLoading = ref(false)
// 分类
const categoryList = ref<Category[]>([])
const current = ref(0)
function init() {
  listAllCategory().then((res: any) => {
    console.log(res)
    categoryList.value = res.data
    getGoodsList(0)
  }).catch(() => {
    categoryList.value = categoryMockData
    getGoodsList(0)
  })
}

// 商品
const goodsList = ref<GoodsRecord[]>()

function getGoodsList(index: number) {
  const params: GoodsParams = {
    category: categoryList.value[index].name,
    page: 1,
    pageSize: 500,
  }
  isLoading.value = true
  listGoods(params).then((res: any) => {
    console.log(res)
    goodsList.value = res.data.content
    console.log(goodsList.value)
    isLoading.value = false
  }).catch(() => {
    goodsList.value = goodMockData.content
    console.log(goodsList.value)
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
const scrollTop = ref(0)
function swichMenu(index: number) {
  if (index === current.value)
    return
  current.value = index
  // 如果为0，意味着尚未初始化
  //   if (this.menuHeight == 0 || this.menuItemHeight == 0) {
  //     await this.getElRect('menu-scroll-view', 'menuHeight')
  //     await this.getElRect('u-tab-item', 'menuItemHeight')
  //   }
  getGoodsList(index)
  console.log(scrollTop.value)
  scrollTop.value = 0
}
onMounted(() => init())

onLoad((options) => {
  if (options.category) {
    const index = categoryList.value.findIndex(item => item.name === options.category)
    if (index !== -1)
      swichMenu(index)
  }
})
</script>

<template>
  <view class="flex flex-1 overflow-hidden h-100vh">
    <scroll-view class="u-tab-view menu-scroll-view" scroll-y="true" scroll-with-animation="true">
      <view
        v-for="(item,index) in categoryList" :key="index" class="u-tab-item"
        :class="[current==index ? 'u-tab-item-active' : '']" :data-current="index"
        @tap.stop="swichMenu(index)"
      >
        <text class="u-line-1">
          {{ item.name }}
        </text>
      </view>
    </scroll-view>
    <scroll-view
      class="goods-container flex" scroll-y="true" :scroll-top="scrollTop"
      @scrolltolower="goodsGoBottom"
    >
      <view v-if="isLoading" class="flex justify-center items-center h-100vh">
        <uni-load-more icon-type="circle" status="loading" />
      </view>
      <view v-else>
        <uni-empty v-if="!goodsList" text="暂无商品" css-class="mt-200rpx justify-center" />
        <view v-for="(item, index) in goodsList" :key="index" class="goodsList m2 bg-gray-100">
          <image
            mode="scaleToFill" lazy-load :src="item.coverImgUrl" class="w-200rpx h-225rpx border border-gray-200 rounded-lg"
            @click="goGoodsDetail(item)"
          />
          <view class="grow ml-24rpx relative flex flex-col">
            <view class="" @click="goGoodsDetail(item)">
              <text class="font-bold text-base">
                {{ item.name }}
              </text>
            </view>
            <view v-if="item.stock" class="t2">
              库存:{{ item.stock }}
            </view>
            <view class="mt-auto">
              <view v-if="item.discount" class="item">
                <text class="text-red-500">
                  ¥{{ item.discount }}
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
  background: #f6f6f6;
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
  background: #fff;
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

.goodsList {
  margin-bottom: 32rpx;
  padding: 0 8rpx;
  display: flex;
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

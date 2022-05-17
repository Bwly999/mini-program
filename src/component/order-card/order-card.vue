<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { type Order, listOrderByUserId } from '@/api/order'
import { type GoodsRecord, getGoodsById } from '@/api/goods'

const props = defineProps<{
  order: Partial<Order>
}>()

type GoodInfo = Partial<GoodsRecord>

const goodsInfo = ref<GoodInfo>({})
function getGoodsInfo() {
  getGoodsById(props.order.goodsId!).then((res) => {
    goodsInfo.value = res.data
  }).catch(() => {
    goodsInfo.value = {
      name: '超超超超惆怅长岑长错错错错23',
      coverImgUrl: 'https://images.unsplash.com/photo-1652393383964-001a16967c98?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    }
  })
}

onLoad(() => {
  getGoodsInfo()
})

function navToGoodDetail(id: string) {
  return () => {
    uni.navigateTo({
      url: `/pages/goods/goods?id=${id}`,
    })
  }
}
</script>

<template>
  <view class="my-2 rounded-md shadow-lg">
    <view class="flex" @click="navToGoodDetail(props.order.id!)">
      <view class="">
        订单号: {{ props.order.id }}
      </view>
      <view class="ml-auto">
        {{ props.order.state }}
      </view>
    </view>
    <view class="flex bg-gray-200 items-center">
      <image lazy-load mode="aspectFit" :src="goodsInfo.coverImgUrl" class="h-22vh w-20vh mx-2" />
      <view class="flex items-center">
        <text class="font-bold ">
          {{ goodsInfo.name }}
        </text>
      </view>
    </view>
    <view class="flex justify-end">
      <text>
        共{{ props.order.payAmount }}件商品 合计:
      </text>
      <view class="price-score" style="display: inline-flex;">
        <text>¥ {{ props.order.payAmount }}</text>
        <a class="i-carbon-moon" />
      </view>
    </view>
    <view class="flex justify-end border-t border-gray-300 mt-1">
      <button class="text-red border border-red rounded-full h-15vw text-right">
        再次购买
      </button>
    </view>
  </view>
</template>

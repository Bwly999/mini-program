<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { computed, onUpdated, ref, watch } from 'vue'
import { type Order, listOrderByUserId } from '@/api/order'
import { type GoodsRecord, getGoodsById } from '@/api/goods'

const props = defineProps<{
  order: Partial<Order>
}>()

type GoodInfo = Partial<GoodsRecord>

// const goodsInfo = ref<GoodInfo>({})
// async function getGoodsInfo() {
//   try {
//     console.log('getGoodsInfo')
//     const data = await getGoodsById(props.order.goodsId!)
//     return data
//   }
//   catch (e) {
//     return {
//       name: '超超超超惆怅长岑长错错错错23',
//       coverImgUrl: 'https://images.unsplash.com/photo-1652393383964-001a16967c98?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
//     }
//   }
// }
// watch(props.order, () => {
//   getGoodsInfo()
// })
// const goodsInfo = computed((props): GoodInfo => {
//   return props?.order?.goodsId ? getGoodsInfo() : {}
// })
// onLoad(() => {
//   getGoodsInfo()
// })

function navToGoodDetail(id: string) {
  console.log(id)
  return () => {
    uni.navigateTo({
      url: `/pages/goods/goods?id=${id}`,
    })
  }
}
</script>

<template>
  <view class="my-2 rounded-2xl shadow-xl bg-white p-2 shadow-inner flex flex-col overflow-hidden">
    <view class="flex">
      <view class="font-bold">
        订单号: {{ props.order.id }}
      </view>
      <view class="ml-auto text-gray">
        {{ props.order.state }}
      </view>
    </view>
    <view class="flex justify-between items-center gap-1 grow">
      <image lazy-load mode="aspectFit" :src="props.order.goodsCoverImgUrl" class="mx-2 rounded-2xl max-h-25 max-w-25" @click="navToGoodDetail(props.order.goodsId!)" />
      <view class="flex items-center">
        <text class="font-bold ">
          {{ props.order.goodsName }}
        </text>
      </view>
      <view class="w-15">
        <view class="price-score">
          ¥<text class="font-bold">
            {{ props.order.payAmount }}
          </text>
        </view>
        <p class="text-gray text-xs font-sans">
          共{{ props.order.payAmount }}件
        </p>
      </view>
    </view>
    <view class="flex justify-end items-center border-t border-gray-300 mt-1 p2">
      <button class="m0 text-red border border-red rounded-full p2 text-sm">
        再次购买
      </button>
    </view>
  </view>
</template>
<style scoped>
.title {
  width: 100%;
  height:2.8rem;
  font-size:1rem;
  overflow:hidden;
  text-overflow: ellipsis;
  display:-webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>

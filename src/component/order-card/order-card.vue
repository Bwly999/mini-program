<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { OrderRet } from '@/api/order'
import { type GoodsRecord, getGoodsById } from '@/api/goods'
import { moneyFormatter } from '@/filters'

const props = defineProps<{
  order: Partial<OrderRet>
}>()
const stateMap = ref(['待付款', '待发货', '待收货', '待评价'])
type GoodInfo = Partial<GoodsRecord>
const state = computed(() => {
  if (props.order.state !== undefined)
    return stateMap.value[props.order.state]
  else
    return ''
})
function navToGoodDetail() {
  uni.navigateTo({
    url: `/pages/goods/detail?id=${props.order.goods?.id}`,
  })
}

function navToOrderDetail() {
  uni.navigateTo({
    url: `/pages/order/detail?id=${props.order.id}`,
  })
}

function onClickBuyAgain() {
  uni.navigateTo({
    url: `/pages/order/submit?goodsId=${props.order.goods?.id}`,
  })
}
</script>

<template>
  <view class="rounded-2xl shadow-xl bg-white p-2 shadow-inner flex flex-col overflow-hidden">
    <view class="flex">
      <view class="font-bold">
        订单号: {{ props.order.id }}
      </view>
      <view class="ml-auto text-gray">
        {{ state }}
      </view>
    </view>
    <view class="flex justify-between items-center gap-1 grow" @click="navToOrderDetail">
      <image lazy-load mode="aspectFit" :src="props.order.goods?.coverImgUrl" class="mx-2 rounded-2xl max-h-25 max-w-25" />
      <view class="flex items-center">
        <text class="font-bold ">
          {{ props.order.goods?.name || '' }}
        </text>
      </view>
      <view class="w-15">
        <view class="price-score">
          ¥<text class="font-bold">
            {{ moneyFormatter(props.order.payAmount || 0) }}
          </text>
        </view>
        <p class="text-gray text-xs font-sans">
          共{{ props.order.payNumber }}件
        </p>
      </view>
    </view>
    <view class="flex justify-end items-center border-t border-gray-300 mt-1 p2">
      <button class="m0 text-red border border-red rounded-full p2 text-sm" @click="onClickBuyAgain">
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

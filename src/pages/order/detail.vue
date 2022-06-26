<script lang="ts" setup>
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import addressCard from '@/component/address-card/address-card.vue'
import { useUserStore } from '@/store/user'
import { type OrderRet, createOrder, getOrderById } from '@/api/order'
import type { GoodsRecord } from '@/api/goods'

import { moneyFormatter } from '@/filters'

const goodsNum = ref(1)

const userStore = useUserStore()

const orderInfo = ref<OrderRet>()

function loadOrderInfo(orderId: string) {
  getOrderById(orderId).then((res: any) => {
    orderInfo.value = res.data
  }).catch((err: any) => {
    console.log(err)
  })
}
const payWayMap = [
  {
    name: '微信支付',
    value: 0,
  },
  {
    name: '线下自提',
    value: 1,
  },
]
const payWay = computed(() => {
  const filterArr = payWayMap.filter(x => x.value === orderInfo.value?.payWay)
  if (filterArr.length === 0)
    return ''

  return payWayMap.filter(x => x.value === orderInfo.value?.payWay)[0]?.name || ''
})

function onClickBuyAgain() {
  uni.navigateTo({
    url: `/pages/order/submit?goodsId=${orderInfo.value?.goods?.id}`,
  })
}

onLoad((option) => {
  const id = option.id || ''
  loadOrderInfo(id)
})
</script>

<template>
  <view class="bg-slate-100 h-100vh flex flex-col gap-4">
    <!-- <uni-section class="bg-white" title="地址" type="line">
      <address-card v-bind="userStore.selectedAddress" @click-arrow="selectAddress" />
    </uni-section> -->
    <view class="goods-info bg-white rounded-xl p-3">
      <view class="shop-info flex items-center">
        <view class="i-carbon-shopping-bag" />
        <text class="ml-2 font-bold">
          {{ orderInfo?.shopName || '助农店铺' }}
        </text>
      </view>
      <view class="flex items-center gap-1 relative">
        <image lazy-load mode="aspectFit" :src="orderInfo?.goods.coverImgUrl" class="mx-2 rounded-2xl max-h-25 max-w-25" />
        <view class="grow flex flex-col" style="height: 100%;">
          <text class="font-bold ">
            {{ orderInfo?.goods.name }}
          </text>
          <view class="price-score">
            <text class="text-sm text-gray-500">
              数量:{{ orderInfo?.payAmount }}
            </text>
          </view>
          <view class="price-score mt-auto">
            <text class="font-bold text-red-500">
              ¥ {{ moneyFormatter(orderInfo?.payAmount!) }}
            </text>
          </view>
        </view>
      </view>
    </view>
    <view class="bg-white rounded-xl p3" title="地址" type="line">
      <view class="shop-info flex items-center">
        <view class="i-carbon-message-queue" />
        <text class="ml-2 font-bold">
          订单信息
        </text>
      </view>
      <view class="mt-2">
        <view>
          订单编号:
          <a class="font-bold">
            {{ orderInfo?.id }}
          </a>
        </view>
        <view>
          下单时间:
          <a class="font-bold">
            {{ orderInfo?.createdTime }}
          </a>
        </view>
        <view>
          支付方式:
          <a class="font-bold">
            {{ payWay }}
          </a>
        </view>
      </view>
    </view>
    <view class="bg-white rounded-xl" title="地址" type="line">
      <view class="shop-info flex items-center m-3">
        <view class="i-carbon-map" />
        <text class="ml-2 font-bold">
          收货地址
        </text>
      </view>
      <address-card v-bind="orderInfo?.address || {}" />
    </view>
    <view class="sticky bottom-0 bg-white flex p2 justify-self-end mt-auto">
      <button class="rounded-full bg-red-500 text-white px-4 ml-auto mr-2" @click="onClickBuyAgain">
        再次购买
      </button>
    </view>
  </view>
</template>
<style>
    /* .uni-numbox--text {
        font-weight: 1000 !important;
        color: rgba(248, 113, 113, var(--un-text-opacity)) !important;
    } */
</style>

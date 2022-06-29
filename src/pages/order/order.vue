<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { onLoad, onPullDownRefresh } from '@dcloudio/uni-app'
import type { OrderRet } from '@/api/order'
import { type Order, type OrderParams, listUserOrder } from '@/api/order'
import orderCard from '@/component/order-card/order-card.vue'
import uniEmpty from '@/component/uni-empty/uni-empty.vue'
import { useUserStore } from '@/store/user'

const tabs = reactive(['全部', '待付款', '待发货', '待收货', '待评价'])
const current = ref(0)
const userStore = useUserStore()
const orderParams = ref<OrderParams>({})
const orderList = ref<Array<Partial<OrderRet>>>([])
const isLoading = ref(false)

function loadOrderInfo() {
  isLoading.value = true
  listUserOrder(orderParams.value).then((res: any) => {
    console.log(res)
    orderList.value = res.data
  }).catch(() => {
    // const order = {
    //   ...sample,
    // }
    // if (orderParams.value.state)
    //   order.state = orderParams.value.state
    // orderList.value = Array.from({ length: 10 }, () => order)
  }).finally(() => {
    isLoading.value = false
    uni.stopPullDownRefresh()
  })
}
function onClickItem(e: any) {
  if (current.value === e.currentIndex)
    return

  current.value = e.currentIndex
  if (e.currentIndex === 0) {
    orderParams.value = {}
  }
  else {
    orderParams.value = {
      state: e.currentIndex - 1,
    }
  }

  loadOrderInfo()
}

onLoad(() => {
  loadOrderInfo()
})

onPullDownRefresh(() => {
  loadOrderInfo()
})
</script>

<template>
  <view>
    <view class="h-100vh">
      <view class="sticky top-0 bg-white z-1">
        <uni-segmented-control
          :current="current" :values="tabs" style-type="text"
          active-color="red" @click-item="onClickItem"
        />
      </view>
      <view class="bg-slate-100" style="padding-top: 0.1rem;">
        <scorll-view v-for="v, i in tabs" :key="i" class="">
          <view v-if="current === i" class="all">
            <view v-if="isLoading" class="flex justify-center items-center h-100vh">
              <uni-load-more icon-type="circle" status="loading" />
            </view>
            <view v-else>
              <order-card v-for="order1, orderIdx in orderList" :key="orderIdx" class="w-100vw h-45vw mb-0 mx-1" :order="order1" />
            </view>
          </view>
        </scorll-view>
      </view>
      <uni-empty
        v-if="!orderList || orderList.length == 0" css-class="mt-20" text="您还没有相关的订单"
      />
    </view>
  </view>
</template>

<style lang="scss" scoped>
</style>

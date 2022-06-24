<script lang="ts" setup>
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import UniSection from '../../component/uni-section/uni-section.vue'
import uniSection from '@/component/uni-section/uni-section.vue'
import addressCard from '@/component/address-card/address-card.vue'
import { useUserStore } from '@/store/user'
import { createOrder } from '@/api/order'
import type { GoodsRecord } from '@/api/goods'
import { getGoodsById } from '@/api/goods'
import { moneyFormatter } from '@/filters'

const goodsNum = ref(1)
const payWayOption = ref([
  {
    name: '微信支付',
    value: 0,
  },
  {
    name: '线下自提',
    value: 1,
  },
])
const payWay = ref(0)
const goodsId = ref()

const userStore = useUserStore()
function bindPickerChange(e: any) {
  console.log(`picker发送选择改变，携带值为：${e.detail.value}`)
  payWay.value = e.detail.value
}

function selectAddress() {
  uni.navigateTo({
    url: '/pages/address/address?mode=select',
  })
}

function submitOrder() {
  if (!userStore.selectedAddress && payWay.value !== 1) {
    uni.showToast({
      title: '请选择收货地址',
      icon: 'none',
    })
    return
  }
  createOrder({
    goodsId: goodsId.value,
    userId: userStore.id,
    payNumber: goodsNum.value,
    payWay: payWay.value,
    address: userStore.selectedAddress,
  }).then((res: any) => {
    console.log(res)
    uni.showToast({
      title: '下单成功',
      icon: 'success',
    })
  }).catch((err: any) => {
    console.log(err)
    uni.showToast({
      title: '下单失败',
      icon: 'error',
    })
  })
}

const goodsInfo = ref<Partial<GoodsRecord>>()
const price = ref<number | undefined>()
const calcPrice = computed(() => {
  if (price.value)
    return moneyFormatter(price.value * goodsNum.value)

  return 0.00
})

function loadGoodsInfo(goodsId: string) {
  getGoodsById(goodsId).then((res: any) => {
    goodsInfo.value = res.data
  }).catch((err: any) => {
    goodsInfo.value = {
      id: '1',
      name: '',
      price: 0,
      discountPrice: 132,
      stock: 0,
      coverImgUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b4b60b10-5168-11eb-bd01-97bc1429a9ff.jpg',
    }
    console.log(err)
  }).finally(() => {
    price.value = goodsInfo.value?.discountPrice || goodsInfo.value?.price || undefined
  })
}

onLoad((options: any) => {
  console.log(options)
  if (options.goodsId) {
    goodsId.value = options.goodsId
    loadGoodsInfo(options.goodsId)
  }
})
</script>

<template>
  <view class="bg-slate-100 h-100vh flex flex-col gap-4">
    <!-- <uni-section class="bg-white" title="地址" type="line">
      <address-card v-bind="userStore.selectedAddress" @click-arrow="selectAddress" />
    </uni-section> -->
    <view class="bg-white" title="地址" type="line">
      <view class="shop-info flex items-center m-3">
        <view class="i-carbon-map" />
        <text class="ml-2 font-bold">
          收货地址
        </text>
      </view>
      <address-card v-bind="userStore.selectedAddress || {}" @click-arrow="selectAddress" />
    </view>
    <view class="goods-info bg-white rounded-xl p-3">
      <view class="shop-info flex items-center">
        <view class="i-carbon-shopping-bag" />
        <text class="ml-2 font-bold">
          {{ goodsInfo?.shopName || '店铺' }}
        </text>
      </view>
      <view class="flex items-center gap-1">
        <image lazy-load mode="aspectFit" :src="goodsInfo?.coverImgUrl" class="mx-2 rounded-2xl max-h-25 max-w-25" />
        <view class="grow">
          <view class="flex items-center">
            <text class="font-bold ">
              商品名
            </text>
          </view>
          <view class="flex">
            <view class="price-score">
              <text class="font-bold text-red-500">
                ¥ {{ moneyFormatter(price!) }}
              </text>
            </view>
            <view class="ml-auto mr-2">
              <uni-number-box v-model="goodsNum" />
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="pay-way bg-white rounded-xl p-3 flex items-center">
      <text>支付方式</text>
      <view class="ml-auto border-double border-4 border-indigo-600 p1">
        <picker
          :value="payWay"
          :range="payWayOption"
          range-key="name"
          @change="bindPickerChange"
        >
          <view class="uni-input">
            {{ payWayOption[payWay].name }}
          </view>
        </picker>
      </view>
    </view>
    <view class="sticky bottom-0 bg-white flex p2 justify-self-end mt-auto">
      <view class="price-tip flex flex-col items-center justify-center">
        <view class="text-gray text-xs font-sans">
          共{{ goodsNum }}件
        </view>
        <text class="font-bold text-red-500">
          ¥ {{ calcPrice }}
        </text>
      </view>
      <button class="rounded-full bg-red-500 text-white px-4 ml-auto mr-2" @click="submitOrder">
        提交订单
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

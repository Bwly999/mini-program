<script lang="ts" setup>
import { ref } from 'vue'
import uniSection from '@/component/uni-section/uni-section.vue'

const url = ref('https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b4b60b10-5168-11eb-bd01-97bc1429a9ff.jpg')
const goodsNum = ref(0)
const payWayOption = ref([
  {
    name: '微信支付',
    value: 0,
  },
  {
    name: '线下到付',
    value: 1,
  },
])
const payWay = ref(0)
function bindPickerChange(e) {
  console.log(`picker发送选择改变，携带值为：${e.detail.value}`)
  payWay.value = e.detail.value
}

function submitOrder() {

}
</script>

<template>
  <view class="bg-slate-100 h-100vh flex flex-col gap-4">
    <view class="address-card bg-white">
      <view class="address flex items-center">
        <view class="address-text p4">
          <view class="address-list-item-left-name">
            <text class="text-sm">
              福建省厦门市翔安区
            </text>
          </view>
          <view class="address-list-item-left-name">
            <text class="font-bold text-xl">
              凌云路哈哈哈哈哈哈哈哈哈13当前
            </text>
          </view>
          <view class="address-text-user">
            <text class="address-list-item-left-name-text">
              天天   12323232
            </text>
          </view>
        </view>
        <view class="ml-auto mr-2">
          <view class="text-gray text-xl">
            <div class="i-carbon-chevron-right" />
          </view>
        </view>
      </view>

      <view class="footer">
        <view class="h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />
        <!-- <div class="h-1 bg-repeat" style="background-image: url('https://tailwindcss.com/img/background-pattern.svg');" /> -->
        <!-- <div class="h-14 bg-gradient-to-r from-sky-500 to-indigo-500" /> -->
      </view>
    </view>
    <view class="goods-info bg-white rounded-xl p-3">
      <view class="shop-info flex items-center">
        <view class="i-carbon-shopping-bag" />
        <text class="ml-2">
          店铺名
        </text>
      </view>
      <view class="flex items-center gap-1">
        <image lazy-load mode="aspectFit" :src="url" class="mx-2 rounded-2xl max-h-25 max-w-25" />
        <view class="grow">
          <view class="flex items-center">
            <text class="font-bold ">
              商品名
            </text>
          </view>
          <view class="flex">
            <view class="price-score">
              <text class="font-bold text-red-500">
                ¥ 20
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
          ¥ 20
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

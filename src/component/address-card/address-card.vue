<script lang="ts" setup>
interface Address {
  id: number
  name: string
  phone: string
  province: string
  city: string
  county: string
  detail: string
  isDefault: boolean
}
function navToChangeAddress() {
  uni.navigateTo({
    url: '/pages/address/createAddress',
  })
}
</script>
<template>
  <view class="address-card bg-white">
    <view class="address flex items-center">
      <view class="address-text p4">
        <view class="address-list-item-left-name">
          <text class="text-sm">
            福建省厦门市翔安区
          </text>
        </view>
        <view class="address-list-item-left-name">
          <text class="font-bold text-base">
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
          <view class="i-carbon-chevron-right" @click="navToChangeAddress" />
        </view>
      </view>
    </view>

    <view class="footer">
      <view class="h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />
      <!-- <div class="h-1 bg-repeat" style="background-image: url('https://tailwindcss.com/img/background-pattern.svg');" /> -->
      <!-- <div class="h-14 bg-gradient-to-r from-sky-500 to-indigo-500" /> -->
    </view>
  </view>
</template>

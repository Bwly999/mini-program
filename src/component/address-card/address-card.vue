<script lang="ts" setup>
import { computed } from 'vue'
interface Address {
  consignee: string
  phone: string
  province: string
  city: string
  district: string
  detailAddress: string
}
const props = withDefaults(defineProps<Address>(), {
  consignee: '',
  phone: '',
  province: '',
  city: '',
  district: '',
  detailAddress: '',
})
const sample = {
  consignee: '天天',
  phone: '13332323232',
  province: '福建省',
  city: '厦门市',
  district: '翔安区',
  detailAddress: '12331凌云路',
}

const region = computed(() => `${props.province || ''}${props.city || ''}${props.district || ''}`)
function navToChangeAddress() {
  uni.navigateTo({
    url: '/pages/address/createAddress',
  })
}
const emit = defineEmits(['clickArrow', 'clickCard'])
</script>
<template>
  <view class="address-card bg-white flex flex-col">
    <view class="address flex items-center" @click="$emit('clickCard', props)">
      <view class="address-text p4">
        <view class="address-list-item-left-name">
          <text class="text-sm">
            {{ region }}
          </text>
        </view>
        <view class="address-list-item-left-name">
          <text class="font-bold text-base">
            {{ props.detailAddress }}
          </text>
        </view>
        <view class="address-text-user">
          <text class="address-list-item-left-name-text">
            {{ props.consignee }}   {{ props.phone }}
          </text>
        </view>
      </view>
      <view class="ml-auto mr-2">
        <view class="text-gray text-xl">
          <!-- <view class="i-carbon-chevron-right" @click="navToChangeAddress" /> -->
          <view class="i-carbon-chevron-right" @click="$emit('clickArrow')" />
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

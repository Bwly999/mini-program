<script lang="ts" setup>
import { computed } from 'vue'
interface Address {
  id?: string
  consignee?: string
  phone?: string
  province?: string
  city?: string
  district?: string
  detailAddress?: string
}
const props = withDefaults(defineProps<Address>(), {
  id: '',
  consignee: '',
  phone: '',
  province: '',
  city: '',
  district: '',
  detailAddress: '',
})

const region = computed(() => `${props.province || ''}${props.city || ''}${props.district || ''}`)
const emit = defineEmits(['clickArrow', 'clickCard'])
</script>
<template>
  <view class="address-card bg-white flex flex-col rounded-xl" @click="$emit('clickArrow')">
    <view class="address flex items-center" @click="$emit('clickCard', props)">
      <view class="address-text p4 pt-1">
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
          <view class="i-carbon-chevron-right" />
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

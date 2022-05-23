<script lang="ts" setup>
import { ref } from 'vue'
import addressCard from '@/component/address-card/address-card.vue'

const pickAddressRef = ref()
function openPickAddress() {
  pickAddressRef.value.onOpen()
}

function navToCreateAddress() {
  uni.navigateTo({
    url: '/pages/address/createAddress',
  })
}

</script>

<template>
  <view class="flex flex-col">
    <view class="grow">
      <address-card v-for="i in 5" :key="i" />
    </view>
    <button class="mt-auto rounded-full bg-red-500 text-white px-6" @click="navToCreateAddress">
      +新增收货地址
    </button>
  </view>
</template>

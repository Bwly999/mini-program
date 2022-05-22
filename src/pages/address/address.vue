<script lang="ts" setup>
import { ref } from 'vue'
import addressCard from '@/component/address-card/address-card.vue'
import pickAddress from '@/component/john-pickAddress/pickAddress.vue'

const pickAddressRef = ref()
function openPickAddress() {
  pickAddressRef.value.onOpen()
}

</script>

<template>
  <view class="flex flex-col h-90vh">
    <view class="grow">
      <address-card v-for="i in 5" :key="i" />
    </view>
    <button class="mt-auto rounded-full bg-red-500 text-white px-6">
      +新增收货地址
    </button>
    <view @click="openPickAddress">
      选择地址
    </view>
    <pick-address ref="pickAddressRef" />
  </view>
</template>

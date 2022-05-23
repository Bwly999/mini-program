<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import addressCard from '@/component/address-card/address-card.vue'
import type { Address } from '@/api/address'
import { useUserStore } from '@/store/user'

const pickAddressRef = ref()

const sample = ref({
  consignee: '天天',
  phone: '13332323232',
  province: '福建省',
  city: '厦门市',
  district: '翔安区',
  detailAddress: '12331凌云路',
})
const addressList = ref([{
  consignee: '天天的1',
  phone: '13332323232',
  province: '福建省',
  city: '厦门市',
  district: '翔安区',
  detailAddress: '12331凌云路',
}, {
  consignee: '天天2',
  phone: '13332323232',
  province: '福建省',
  city: '厦门市',
  district: '翔安区',
  detailAddress: '12331凌云路',
}, {
  consignee: '天天3',
  phone: '13332323232',
  province: '福建省',
  city: '厦门市',
  district: '翔安区',
  detailAddress: '12331凌云路',
}])

/**
 * mode = 'select' || '' select代表选择模式
 */
let mode = ''

const userStore = useUserStore()
function openPickAddress() {
  pickAddressRef.value.onOpen()
}

function navToCreateAddress() {
  uni.navigateTo({
    url: '/pages/address/createAddress',
  })
}

function onClickCard(address: Address) {
  // console.log(getCurrentPages())
  // // uni.navigateBack({})
  console.log(address)
  if (mode === 'select') {
    userStore.selectedAddress = address
    uni.navigateBack({})
  }
}

onLoad((option) => {
  mode = option.mode || ''
  // params = option.   //还可以  window.location.search.substring()
  //    invitation = this.getQueryVariable('id') //code是url后面带的
})

</script>

<template>
  <view class="flex flex-col h-100vh">
    <view class="grow">
      <address-card v-for="(v, i) in addressList" :key="i" v-bind="v" @click-card="onClickCard" />
    </view>
    <button class="mt-auto mb-4 rounded-full bg-red-500 text-white px-6" @click="navToCreateAddress">
      +新增收货地址
    </button>
  </view>
</template>

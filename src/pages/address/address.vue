<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import addressCard from '@/component/address-card/address-card.vue'
import { type Address, getAllAddress } from '@/api/address'
import { useUserStore } from '@/store/user'
import { useGlobalVarStore } from '@/store/globalVar'
import UniEmpty from '@/component/uni-empty/uni-empty.vue'

const pickAddressRef = ref()

const addressList = ref([])

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

const globalVarStore = useGlobalVarStore()
function onClickCard(address: Address) {
  // console.log(getCurrentPages())
  // // uni.navigateBack({})
  console.log(address)
  if (mode === 'select') {
    userStore.selectedAddress = address
    uni.navigateBack({})
  }
  else {
    console.log(address)
    globalVarStore.selectedAddress = address
    uni.navigateTo({
      url: `/pages/address/editAddress?id=${address.id}`,
    })
  }
}

function loadAddressInfo() {
  getAllAddress().then((res: any) => {
    addressList.value = res.data
  })
    .catch((err: any) => {
      console.log(err)
      uni.showToast({
        icon: 'error',
        title: err.errmsg,
        duration: 1500,
      })
    })
}

onLoad((option) => {
  mode = option.mode || ''
})

onShow(() => {
  loadAddressInfo()
})

</script>

<template>
  <view class="flex flex-col h-100vh">
    <view class="grow">
      <uni-empty v-if="addressList.length === 0" text="您还没有地址信息" css-class="mt-200rpx justify-center" />
      <view v-else>
        <address-card v-for="(v, i) in addressList" :key="i" v-bind="v" @click-card="onClickCard" />
      </view>
    </view>
    <button class="mt-auto mb-4 rounded-full bg-red-500 text-white px-6" @click="navToCreateAddress">
      +新增收货地址
    </button>
  </view>
</template>

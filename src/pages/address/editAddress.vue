<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { type Address, saveAddress as saveAddressApi } from '@/api/address'

// component
import AddressInfo from '@/component/address-info/address-info.vue'
import { useGlobalVarStore } from '@/store/globalVar'

const formData = ref<Address>({
  consignee: '',
  phone: '',
  province: '',
  city: '',
  district: '',
  detailAddress: '',
})

const addressInfoRef = ref()

function saveAddress() {
  addressInfoRef.value.validate()
    .then(() => {
      return saveAddressApi(formData.value)
    })
    .then((res: any) => {
      console.log(res)
      uni.showToast({
        title: '保存成功',
        icon: 'none',
      })
    })
    .catch(() => {
      uni.showToast({
        title: '保存失败',
        icon: 'error',
      })
    })
}
// function loadAddress(addressId: string) {
//   getAddressById(addressId).then((res: any) => {
//     console.log(res)
//     formData.value = res.data
//   })
// }
onLoad((option) => {
  // console.log(option)
  // if (option.addressId)
  //   loadAddress(option.addressId)
  const globalVarStore = useGlobalVarStore()
  formData.value = globalVarStore.selectedAddress
})
</script>
<template>
  <view class="flex flex-col h-100vh bg-slate-100">
    <address-info ref="addressInfoRef" :model-value="formData" />

    <view class="sticky bottom-0 bg-white flex p2 justify-center mt-auto">
      <button class="rounded-full bg-red-500 text-white px-20" @click="saveAddress">
        保存
      </button>
    </view>
  </view>
</template>

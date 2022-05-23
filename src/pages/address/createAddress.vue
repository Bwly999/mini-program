<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { onReady } from '@dcloudio/uni-app'
import pickAddress from '@/component/john-pickAddress/pickAddress.vue'
import uniForms from '@/uni_modules/uni-forms/components/uni-forms/uni-forms.vue'
import { type Address, saveAddress as saveAddressApi } from '@/api/address'

const formData = reactive<Address>({
  consignee: '',
  phone: '',
  province: '',
  city: '',
  district: '',
  detailAddress: '',
})

const pickAddressRef = ref()
function openPickAddress() {
  pickAddressRef.value.onOpen()
}
function addressConfirm(event: any) {
  console.log(event)
  formData.province = event.province
  formData.city = event.city
  formData.district = event.district
}

const region = computed(() => `${formData.province?.name || ''}${formData.city?.name || ''}${formData.district?.name || ''}`)
const validForm = ref()
const validRules = ref({
  consignee: {
    rules: [{
      required: true,
      errorMessage: '姓名不能为空',
    }],
  },
  phone: {
    rules: [{
      required: true,
      errorMessage: '电话不能为空',
    }, {
      pattern: '1\\d{10}',
      errorMessage: '电话格式不正确',
    }],
  },
  district: {
    rules: [{
      required: true,
      errorMessage: '地区不能为空',
    }],
  },
})

function saveAddress() {
  validForm.value.validate()
    .then(() => {
      saveAddressApi(formData)
    },
    )
    .then(() => {
      console.log('valid success')
      saveAddressApi(formData).then((res) => {
        console.log(res)
        uni.showToast({
          title: '保存成功',
          icon: 'none',
        })
      })
    })
    .catch(() => {
      console.log('valid fail')
    })
}

onReady(() => {
  validForm.value.setRules(validRules.value)
  console.log(validForm.value)
})

</script>
<template>
  <view class="pt-2 flex flex-col h-100vh bg-slate-100">
    <uni-forms ref="validForm" :model-value="formData" class="p2 bg-white">
      <uni-forms-item label="收货人" name="consignee" left-icon="person">
        <uni-easyinput v-model="formData.consignee" type="text" placeholder="请填写收货人姓名" />
      </uni-forms-item>
      <uni-forms-item label="手机号码" name="phone" left-icon="phone">
        <uni-easyinput v-model="formData.phone" type="number" placeholder="请填写收货人手机号" />
      </uni-forms-item>
      <uni-forms-item label="所在地区" name="district" left-icon="location">
        <view class="text-left flex items-center px-3" :class="(region === '' ? 'text-gray text-10px': ' text-14px')" style="border: 1px solid #DCDFE6;border-radius: 4px; height: 100%;" @click="openPickAddress">
          {{ region === '' ? '请填写所在地区' : region }}
        </view>
        <pick-address ref="pickAddressRef" @confirm="addressConfirm" />
      </uni-forms-item>
      <uni-forms-item label="详细地址" left-icon="map">
        <uni-easyinput v-model="formData.detailAddress" type="textarea" :maxlength="-1" auto-height placeholder="街道、楼牌号等" />
      </uni-forms-item>
    </uni-forms>

    <view class="sticky bottom-0 bg-white flex p2 justify-center mt-auto">
      <button class="rounded-full bg-red-500 text-white px-20" @click="saveAddress">
        保存
      </button>
    </view>
  </view>
</template>

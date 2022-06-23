<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { onReady } from '@dcloudio/uni-app'
import pickAddress from '@/component/john-pickAddress/pickAddress.vue'
import uniForms from '@/uni_modules/uni-forms/components/uni-forms/uni-forms.vue'
import { type Address, saveAddress as saveAddressApi } from '@/api/address'

const props = defineProps<{
  modelValue: Address
}>()
const emit = defineEmits(['update:modelValue'])
const formData = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})

const pickAddressRef = ref()
function openPickAddress() {
  pickAddressRef.value.onOpen()
}
function addressConfirm(event: any) {
  formData.value.province = event.province.name
  formData.value.city = event.city.name
  formData.value.district = event.district.name
}

const region = computed(() => `${formData.value.province || ''}${formData.value.city || ''}${formData.value.district || ''}`)
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
onMounted(() => {
  validForm.value.setRules(validRules.value)
})

function validate() {
  return new Promise<void>((resolve, reject) => {
    validForm.value.validate()
      .then(() => {
        resolve()
      })
      .catch((err: any) => {
        reject(err)
      })
  })
}

defineExpose({ validate })

</script>
<template>
  <view class="bg-white">
    <uni-forms ref="validForm" :model-value="formData" class="address-form p2 bg-white">
      <uni-forms-item label="收货人" name="consignee" left-icon="person" label-width="80">
        <uni-easyinput v-model="formData.consignee" type="text" placeholder="请填写收货人姓名" />
      </uni-forms-item>
      <uni-forms-item label="手机号码" name="phone" left-icon="phone" label-width="80">
        <uni-easyinput v-model="formData.phone" type="number" placeholder="请填写收货人手机号" />
      </uni-forms-item>
      <uni-forms-item label="所在地区" name="district" left-icon="location" label-width="80">
        <view class="text-left flex items-center px-3" :class="(region === '' ? 'text-input text-14px': ' text-14px')" style="border: 1px solid #DCDFE6;border-radius: 4px; height: 100%;" @click="openPickAddress">
          {{ region === '' ? '请填写所在地区' : region }}
        </view>
        <pick-address ref="pickAddressRef" @confirm="addressConfirm" />
      </uni-forms-item>
      <uni-forms-item label="详细地址" left-icon="map" label-width="80">
        <uni-easyinput v-model="formData.detailAddress" type="textarea" :maxlength="-1" auto-height placeholder="街道、楼牌号等" />
      </uni-forms-item>
    </uni-forms>
  </view>
</template>

<style lang="scss">
.address-form {
  background: #fff !important;
}
.text-input {
  color: rgb(60 56 54 / 0.74);
}
</style>

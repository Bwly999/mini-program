<script lang="ts" setup>
export interface Good {
  goodsId: number
  goodsName: string
  goodsCoverImg: string
  sellingPrice: number
}
const props = defineProps<Good>()
</script>
<template>
  <view class="">
    <img :src="props.goodsCoverImg" alt="">
    <view class="good-desc">
      <view class="title">
        {{ props.goodsName }}
      </view>
      <view class="price text-red">
        ¥ {{ props.sellingPrice }}
      </view>
    </view>
    <view>AA</view>
  </view>
</template>

<script lang="ts" setup>
import { moneyFormatter } from '@/filters'
export interface Good {
  id: string
  name: string
  coverImgUrl: string
  price: number
  discountPrice?: number
}
const props = defineProps<{
  goods: Good
  css?: string
}>()
function getDetail() {
  uni.navigateTo({
    url: `/pages/goods/detail?id=${props.goods.id}`,
  })
}
</script>
<template>
  <!-- <view class="rounded-2xl shadow-xl flex flex-col" :class="props.css" style="aspect-ratio: 9/11;" @click="getDetail"> -->
  <view class="rounded-2xl shadow-xl flex flex-col bg-white" :class="props.css" @click="getDetail">
    <img :src="props.goods.coverImgUrl" class="rounded-t-2xl" style="width: 100%; height: 100%;" alt="">
    <view class="good-desc ml-1rem">
      <view class="title">
        {{ props.goods.name }}
      </view>
      <view class="flex mb-2">
        <a class="font-bold text-red">
          ¥ {{ moneyFormatter(props.goods.price) }}
        </a>
        <a v-if="props.goods.discountPrice" class="ml-2 font-bold line-through text-gray">
          ¥ {{ moneyFormatter(props.goods.discountPrice) }}
        </a>
      </view>
    </view>
  </view>
</template>
<style scoped>
.title {
  width:100%;
  height:2.6rem;
  font-size:1rem;
  overflow:hidden;
  text-overflow: ellipsis;
  display:-webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  font-weight: 550;
}
</style>

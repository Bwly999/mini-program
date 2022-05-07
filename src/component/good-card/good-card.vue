<script lang="ts" setup>
export interface Good {
  goodsId: number
  goodsName: string
  goodsCoverImg: string
  sellingPrice: number
  discountPrice?: number
  css?: string
}
const props = defineProps<Good>()
function getDetail() {
  uni.navigateTo({
    url: `/pages/goods/detail?id=${props.goodsId}`,
  })
}
console.log(props.sellingPrice)
</script>
<template>
  <!-- <view class="rounded-2xl shadow-xl flex flex-col" :class="props.css" style="aspect-ratio: 9/11;" @click="getDetail"> -->
  <view class="rounded-2xl shadow-xl flex flex-col" :class="props.css" @click="getDetail">
    <img :src="props.goodsCoverImg" style="width: 100%; height: 100%; border-radius: inherit;" alt="">
    <view class="good-desc ml-1rem">
      <view class="title">
        {{ props.goodsName }}
      </view>
      <view class="flex">
        <a class="font-bold text-red">
          ¥ {{ props.sellingPrice }}
        </a>
        <a v-if="props.discountPrice" class="ml-2 font-bold line-through text-gray">
          ¥ {{ props.discountPrice }}
        </a>
      </view>
    </view>
  </view>
</template>
<style scoped>
.title {
  width:100%;
  height:2.8rem;
  font-size:1rem;
  overflow:hidden;
  text-overflow: ellipsis;
  display:-webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>

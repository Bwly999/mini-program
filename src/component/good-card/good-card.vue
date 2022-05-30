<script lang="ts" setup>
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
  <view class="rounded-2xl shadow-xl flex flex-col" :class="props.css" @click="getDetail">
    <img :src="props.goods.coverImgUrl" style="width: 100%; height: 100%; border-radius: inherit;" alt="">
    <view class="good-desc ml-1rem">
      <view class="title">
        {{ props.goods.name }}
      </view>
      <view class="flex">
        <a class="font-bold text-red">
          ¥ {{ props.goods.price }}
        </a>
        <a v-if="props.goods.discountPrice" class="ml-2 font-bold line-through text-gray">
          ¥ {{ props.goods.discountPrice }}
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

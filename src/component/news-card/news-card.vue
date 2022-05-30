<script lang="ts" setup>
interface Newscard {
  id: string
  title: string
  content: string
  image: string
  time: string
}
const props = defineProps<{
  news: Newscard
}>()
</script>

<template>
  <view class="bg-white">
    <view class="title">
      <text class="text-gray-900">
        {{ props.news.title }}
      </text>
    </view>
    <view class="content">
      <text class="text-gray-900">
        {{ props.news.content }}
      </text>
    </view>
  </view>
</template>

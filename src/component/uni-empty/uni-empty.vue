<script lang="ts" setup>
interface Props {
  text: string
  cssClass?: string
}
const props = defineProps<Props>()
</script>
<template>
  <view :class="props.cssClass" class="flex flex-col justify-center items-center">
    <a class="i-carbon-align-box-bottom-left text-4xl" />
    <text> {{ props.text }} </text>
  </view>
</template>

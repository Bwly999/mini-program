<script lang="ts" setup>
import { onLoad, onReady } from '@dcloudio/uni-app'
import { ref } from 'vue'

const imgUrls = ref<Array<string>>([
  'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b4b60b10-5168-11eb-bd01-97bc1429a9ff.jpg',
  'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b1dcfa70-5168-11eb-bd01-97bc1429a9ff.jpg',
])

let id = 1
onLoad((option) => {
  id = Number(option.id)
  // params = option.   //还可以  window.location.search.substring()
  //    invitation = this.getQueryVariable('id') //code是url后面带的
})
let videoContext: any
const hasVideo = ref(true)
onReady(() => {
//   uni.showModal({
//     content: 'maw',
//     showCancel: false,
//   })
  if (hasVideo.value)
    videoContext = uni.createVideoContext('myVideo')
})
function autoStopVideo(e) {
  console.log(e)
  if (hasVideo.value && videoContext !== undefined && e.detail.current !== 0) {
    videoContext.pause()
    console.log(videoContext)
  }
}
</script>

<template>
  <view>
    <view>
      <swiper class="w-100vw" indicator-dots="true" @change="autoStopVideo">
        <swiper-item>
          <video
            id="myVideo" style="height: 100%;  width: 100%;" src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126-lite.m4v" enable-danmu danmu-btn controls poster="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b1476d40-4e5f-11eb-b997-9918a5dda011.png"
          />
        </swiper-item>
        <swiper-item v-for="img, key in imgUrls" :key="key">
          <image class="" style="height: 100%;  width: 100%;" :src="img" />
        </swiper-item>
      </swiper>
    </view>
    <view @click="autoStopVideo">
      傻鸟
    </view>
  </view>
</template>

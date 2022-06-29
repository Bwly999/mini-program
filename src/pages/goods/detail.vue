<script lang="ts" setup>
import { onLoad, onReady } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'
import alGoodsDetail from '@/component/al-goods-detail/al-goods-detail.vue'
import uniEvaluate from '@/component/uni-evaluate/uni-evaluate.vue'
import { type GoodsRecord, getGoodsById } from '@/api/goods'
import { moneyFormatter } from '@/filters'
import { checkLogin } from '@/utils/userUtil'

const goodsInfo = ref<Partial<GoodsRecord>>({})

const imgUrls = computed(() => {
  const imgs = [goodsInfo.value.coverImgUrl]
  if (goodsInfo.value.scollImages)
    imgs.push(...goodsInfo.value.scollImages!)

  return imgs
})

// const options = ref([{
//   icon: 'chat',
//   text: '客服',
// }, {
//   icon: 'shop',
//   text: '店铺',
//   infoBackgroundColor: '#007aff',
//   infoColor: '#f5f5f5',
// }])

const options = ref([{
  icon: 'chat',
  text: '客服',
}])

const buttonGroup = ref([
  {
    text: '立即购买',
    backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
    color: '#fff',
  },
])

function onClick(e: any) {
  if (e.content.text === '客服') {
    uni.showToast({
      title: '开发中',
      icon: 'error',
    })
    // uni.navigateTo({
    //   url: `/pages/service/service?id=${goodsInfo.value?.shopId}`,
    // })
  }
}
// 评论
const listData = [{
  header_img: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b1dcfa70-5168-11eb-bd01-97bc1429a9ff.jpg',
  user_name: '用户1',
  rate: 5,
  create_time: '2022-04-12',
  content: '好评',
  imgs: [
    'http://27557142.s21i.faiusr.com/2/ABUIABACGAAg7aP8iAYokPzTxwIwwAc4pgQ.jpg',
    'http://27557142.s21i.faiusr.com/2/ABUIABACGAAgs8HOiAYo8PC38AEwsAk4kAM.jpg',
  ],
},
{
  content: '中评',
  create_time: '2022-04-14',
  header_img: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b1dcfa70-5168-11eb-bd01-97bc1429a9ff.jpg',
  user_name: '用户2',
  rate: 5,
  // imgs:[]
},
{
  content: '',
  create_time: '2022-05-12',
  header_img: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b1dcfa70-5168-11eb-bd01-97bc1429a9ff.jpg',
  user_name: '用户3',
  rate: 5,
  // imgs:[]
}]

function buttonClick() {
  if (!checkLogin())
    return

  uni.navigateTo({
    url: `/pages/order/submit?goodsId=${goodsInfo.value?.id}`,
  })
}

function loadGoodsInfo(goodsId: string) {
  getGoodsById(goodsId).then((res: any) => {
    goodsInfo.value = res.data
  })
}

onLoad((option) => {
  console.log(option)
  const id = option.id || ''
  loadGoodsInfo(id)
})
let videoContext: any
const hasVideo = ref(true)
onReady(() => {
  if (hasVideo.value)
    videoContext = uni.createVideoContext('myVideo')
})
function autoStopVideo(e: any) {
  if (hasVideo.value && videoContext !== undefined && e.detail.current !== 0)
    videoContext.pause()
}

</script>

<template>
  <view>
    <view>
      <swiper class="w-100vw h-30vh" indicator-dots="true" @change="autoStopVideo">
        <swiper-item v-if="goodsInfo.videoUrl">
          <video
            id="myVideo" style="height: 100%;  width: 100%;" :src="goodsInfo.videoUrl" controls :poster="goodsInfo.coverImgUrl"
          />
        </swiper-item>
        <swiper-item v-for="img, key in imgUrls" :key="key">
          <image class="" style="height: 100%;  width: 100%;" :src="img" mode="aspectFit" />
        </swiper-item>
      </swiper>
    </view>
    <al-goods-detail :goods-detail="goodsInfo" />
    <uni-evaluate :list-data="listData" :rate="5" />
    <view class="goods-carts">
      <uni-goods-nav
        :options="options" :fill="true" :button-group="buttonGroup" @click="onClick"
        @button-click="buttonClick"
      />
    </view>
  </view>
</template>

<style scoped>
.goods-carts {
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  right: 0;
  left: var(--window-left);
  right: var(--window-right);
  bottom: 0;
}
</style>

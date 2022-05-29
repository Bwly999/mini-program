<script lang="ts" setup>
import { onLoad, onReady } from '@dcloudio/uni-app'
import { ref } from 'vue'
import echoneSku from '@/component/echone-sku/echone-sku.vue'
import alGoodsDetail from '@/component/al-goods-detail/al-goods-detail.vue'
import uniEvaluate from '@/component/uni-evaluate/uni-evaluate.vue'
import { type GoodsRecord, getGoodsById } from '@/api/goods'
interface GoodDetail {
  goodsId: number
  shopId: number
}
const goodsInfo = ref<Partial<GoodsRecord>>()

const imgUrls = ref<Array<string>>([
  'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b4b60b10-5168-11eb-bd01-97bc1429a9ff.jpg',
  'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b1dcfa70-5168-11eb-bd01-97bc1429a9ff.jpg',
])

const goodsDetail = {
  actualPrice: 100,
  originalPrice: 101,
  title: '马肉',
  shopLogo: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b1dcfa70-5168-11eb-bd01-97bc1429a9ff.jpg',
  shopName: '马肉店',
  dsrScore: 1,
  serviceScore: 1,
  shipScore: 1,
  monthSales: 1,
  detailPics: [
    'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b4b60b10-5168-11eb-bd01-97bc1429a9ff.jpg',
    'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b1dcfa70-5168-11eb-bd01-97bc1429a9ff.jpg',
  ],
}

const options = ref([{
  icon: 'chat',
  text: '客服',
}, {
  icon: 'shop',
  text: '店铺',
  infoBackgroundColor: '#007aff',
  infoColor: '#f5f5f5',
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
    uni.navigateTo({
      url: `/pages/service/service?id=${goodsInfo.value?.shopId}`,
    })
  }
  // uni.showToast({
  //   title: `点击${e.content.text}`,
  //   icon: 'none',
  // })
}
// 评论
const listData = [{
  header_img: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b1dcfa70-5168-11eb-bd01-97bc1429a9ff.jpg',
  user_name: '测试1',
  rate: 5,
  create_time: '2019-04-12',
  content: '好评',
  imgs: [
    'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b1dcfa70-5168-11eb-bd01-97bc1429a9ff.jpg',
    'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b1dcfa70-5168-11eb-bd01-97bc1429a9ff.jpg',
  ],
},
{
  content: '中评',
  create_time: '2019-04-12',
  header_img: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b1dcfa70-5168-11eb-bd01-97bc1429a9ff.jpg',
  user_name: '测试2',
  rate: 4,
  // imgs:[]
},
{
  content: '',
  create_time: '2019-04-12',
  header_img: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b1dcfa70-5168-11eb-bd01-97bc1429a9ff.jpg',
  user_name: '测试3',
  rate: 2,
  // imgs:[]
}]

function buttonClick() {
  uni.navigateTo({
    url: `/pages/order/submit?goodsId=${goodsInfo.value?.id}`,
  })
}

function loadGoodsInfo(goodsId: string) {
  getGoodsById(goodsId).then((res: any) => {
    goodsInfo.value = res.data
  }).catch((err: any) => {
    goodsInfo.value = {
      id: '1',
      name: 'hh',
      price: 0,
      discountPrice: 100,
      stock: 0,
      coverImgUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b4b60b10-5168-11eb-bd01-97bc1429a9ff.jpg',
    }
    console.log(err)
  })
}

onLoad((option) => {
  console.log(option)
  const id = option.id || ''
  // params = option.   //还可以  window.location.search.substring()
  //    invitation = this.getQueryVariable('id') //code是url后面带的
  loadGoodsInfo(id)
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
function autoStopVideo(e: any) {
  if (hasVideo.value && videoContext !== undefined && e.detail.current !== 0)
    videoContext.pause()
}

</script>

<template>
  <view>
    <view>
      <swiper class="w-100vw h-30vh" indicator-dots="true" @change="autoStopVideo">
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
    <uni-icons type="contact" size="30" />
    <a class="i-carbon-microphone text-2xl" />
    <al-goods-detail :goods-detail="goodsDetail" interval="5000" />
    <!-- <echone-sku
      :show="skuShow"
      :combinations="combinations"
      :specifications="specifications"
      :specifications-goodsInfo="specificationsProps"
      :mode="skuMode"
      @close="handleClose"
      @confirm="handleConfirm"
    /> -->
    <uni-evaluate :list-data="listData" :rate="1" />
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

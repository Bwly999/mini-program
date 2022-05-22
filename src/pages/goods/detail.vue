<script lang="ts" setup>
import { onLoad, onReady } from '@dcloudio/uni-app'
import { ref } from 'vue'
import echoneSku from '@/component/echone-sku/echone-sku.vue'
import alGoodsDetail from '@/component/al-goods-detail/al-goods-detail.vue'
import uniEvaluate from '@/component/uni-evaluate/uni-evaluate.vue'
interface GoodDetail {
  goodsId: number
  shopId: number
}
const props = defineProps<GoodDetail>()

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

function onClick(e) {
  if (e.content.text === '客服') {
    uni.navigateTo({
      url: `/pages/service/service?id=${props.shopId}`,
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

// 商品规格
const specifications = ref([
  {
    name: '发证机关',
    id: '123',
    list: ['成都市锦江区', '成都市青羊区'],
  },
  {
    name: '教育年度',
    id: '456',
    list: ['2020年', '2019年'],
  },
])
const combinations = ref([
  {
    id: '1',
    value: '成都市锦江区,2020年',
    image:
      'https://miniprogram-img01.caishuib.com/wx15168444f005a4ab/material/image/202005135/3a014c2f42c1c46b.PNG',
    price: 80.0,
    stock: 1000,
  },
  {
    id: '2',
    value: '成都市锦江区,2019年',
    image:
      'https://miniprogram-img01.caishuib.com/wx15168444f005a4ab/material/image/20200383/ebd0c8d01a6e9c10.PNG',
    price: 100.0,
    stock: 500,
  },
  {
    id: '3',
    value: '成都市青羊区,2020年',
    image:
      'https://miniprogram-img01.caishuib.com/wx15168444f005a4ab/material/image/202005135/3a014c2f42c1c46b.PNG',
    price: 80.0,
    stock: 1000,
  },
  {
    id: '4',
    value: '成都市青羊区,2019年',
    image:
      'https://miniprogram-img01.caishuib.com/wx15168444f005a4ab/material/image/20200383/ebd0c8d01a6e9c10.PNG',
    price: 100.0,
    stock: 0,
  },
])
const specificationsProps = ref({
  id: 'id',
  list: 'list',
  name: 'name',
  value: 'value',
  image: 'image',
  price: 'price',
  stock: 'stock',
})
const skuShow = ref(false)
const skuMode = ref(0)

function buttonClick() {
  console.log('立即购买的逻辑')
  uni.navigateTo({
    url: '/pages/order/submit',
  })
}

function handleClose() {
  skuShow.value = false
}
function handleConfirm() {
  console.log('confirm')
}

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
      :specifications-props="specificationsProps"
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

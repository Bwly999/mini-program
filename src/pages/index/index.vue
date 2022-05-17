<script lang="ts">
import { ref } from 'vue'
import { onReachBottom } from '@dcloudio/uni-app'
import MixLoading from '../../component/mix-loading/mix-loading.vue'
import GoodCard from '@/component/good-card/good-card.vue'
import type { Good } from '@/component/good-card/good-card.vue'
import Mysearch from '@/component/mysearch/mysearch.vue'
export default {
  components: { MixLoading, GoodCard, Mysearch },
  //   components: { GoodCard },
  setup() {
    const hots = [
      {
        goodsId: 1,
        goodsName: '耳机',
        goodsCoverImg: 'https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/MME73_AV4_GEO_CN.jpeg',
        sellingPrice: 100001,
      },
    ]
    const good = ref<Good>({
      goodsId: 1,
      goodsName: '耳机耳机耳机耳机耳机耳机耳机机',
      goodsCoverImg: 'https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/MME73_AV4_GEO_CN.jpeg',
      sellingPrice: 100001,
      discountPrice: 1,
    })
    const imgUrls = ref<Array<string>>([
      'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b4b60b10-5168-11eb-bd01-97bc1429a9ff.jpg',
      'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b1dcfa70-5168-11eb-bd01-97bc1429a9ff.jpg',
    ])
    function addImg() {
      imgUrls.value.push('https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b4b60b10-5168-11eb-bd01-97bc1429a9ff.jpg')
    }
    const data = ref<Array<number>>([])
    let idx = 0
    for (let i = 0; i < 5; i++) {
      data.value.push(idx)
      idx++
    }
    const showLoadMore = ref<boolean>(false)
    const loadMoreText = ref<string>('加载中...')
    onReachBottom(() => {
      console.log('reach bottom')
      showLoadMore.value = true
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          data.value.push(idx)
          idx++
        }
        showLoadMore.value = false
      }, 500)
    })
    function searchclick(options: any) {
      console.log(options)
    }
    console.log(good.value)
    return {
      imgUrls,
      addImg,
      data,
      showLoadMore,
      loadMoreText,
      hots,
      good,
      searchclick,
    }
  },
}
</script>

<template>
  <view class="index">
    <!-- <view class="top-0 flex gap-2 bg-white z-1" style="position: -webkit-sticky; position: sticky;">
      <view class="search-box rounded-xl bg-gray-100 text-center">
        <input type="text" placeholder="输入关键字搜索">
        <view class="search-icon" />
      </view>
      <a class="ml-2 text-lg font-bold">农产品</a>

    </view> -->
    <Mysearch :select-list="[{name: '傻鸟1'},{name: 'bird'}]" @search-click="searchclick" />
    <view>
      <swiper class="w-100vw" indicator-dots="true">
        <swiper-item v-for="img, key in imgUrls" :key="key">
          <image class="" style="height: 100%;  width: 100%;" :src="img" />
        </swiper-item>
      </swiper>
    </view>
    <view class="m-1rem flex justify-center flex-col rounded-xl shadow-lg gap-2">
      <view class="flex justify-around gap-2">
        <view v-for="v, i in 5" :key="i">
          <view class="flex flex-col">
            <a
              class="i-carbon-logo-github text-4xl"
            />
            <a class="mt-1 text-center text-xs">上装</a>
          </view>
        </view>
      </view>
      <view class="flex justify-around gap-2">
        <view v-for="v, i in 5" :key="i">
          <view class="flex flex-col">
            <a
              class="i-carbon-moon text-4xl"
            />
            <a class="mt-1 text-center text-xs">上装</a>
          </view>
        </view>
      </view>
    </view>
    <button @click="addImg">
      ADD ITEM
    </button>
    <view class="">
      <view class="">
        <view class="uni-title uni-common-mt">
          flex-direction: row
          <a class="font-bold font-mono text-red-500">
            \n横向布局
          </a>
        </view>
        <view class="flex flex-row w-375rpx">
          <view class="flex-grow bg-red text-center">
            A
          </view>
          <view class="flex-grow bg-green">
            B
          </view>
          <view class="flex-grow bg-blue">
            C
          </view>
        </view>
        <view class="uni-title uni-common-mt">
          flex-direction: column
          <text>\n纵向布局</text>
        </view>
        <view class="uni-flex uni-column">
          <view class="flex-item flex-item-V uni-bg-red">
            A
          </view>
          <view class="flex-item flex-item-V uni-bg-green">
            B
          </view>
          <view class="flex-item flex-item-V uni-bg-blue">
            C
          </view>
        </view>
      </view>
    </view>
    <view bg-color="#FFFFFF" custom-nav-height="0">
      <!--  #ifdef  APP-PLUS -->
      <view class="app-status-bar-height" />
      <!--  #endif -->
      <view class="top-box" :style="headerMarginTopStyle">
        <view class="t">
          Q
        </view>
        <view class="search">
          <u-search v-model="kw" placeholder="输入关键词搜索" :show-action="false" :disabled="true" @click="goSearch" />
        </view>
        <!--  #ifdef  MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ -->
        <view class="mp-btn" :style="menuButtonInfoStyle" />
        <!--  #endif -->
      </view>
    </view>
    <!-- <MixLoading /> -->
    <view class="flex grow-0">
      <view class="font-bold text-xl ml-5 ">
        热门商品
      </view>
      <!-- <img class="h-1rem object-scale-down" src="https://img.alicdn.com/imgextra/i1/O1CN01EjcAPM25IsjiwGyYs_!!6000000007504-2-tps-65-20.png"> -->
    </view>

    <view>
      <!-- <good-card>1</good-card> -->
      <view class="good flex flex-wrap justify-center">
        <good-card v-for="v, i in data" :key="i" class="" v-bind="good" css="w-337rpx h-470rpx m2" />
      </view>
      <view v-if="showLoadMore" class="uni-loadmore text-center">
        {{ loadMoreText }}
      </view>
      <!-- <view title :row="3" :loading="loading">
        <div class="good-box">
          <div v-for="item in hots" :key="item.goodsId" class="good-item" @click="goToDetail(item)">
            <img :src="item.goodsCoverImg" alt="">
            <div class="good-desc">
              <div class="title">
                {{ item.goodsName }}
              </div>
              <div class="price">
                ¥ {{ item.sellingPrice }}
              </div>
            </div>
          </div>
        </div>
      </view> -->
    </view>
    <!-- <view>
      <a v-for="v, i in data" :key="i">HHHH {{ v }}</a>
    </view>
    <view v-if="showLoadMore" class="uni-loadmore">
      {{ loadMoreText }}
    </view> -->
  </view>
</template>

<style scoped>
.total-title {
    font-size: 24px;
    color: #111;
    font-weight: bold;
    line-height: 24px;
}
/* .mlogo {
    margin: 4px 0 0 6px;
    height: 20px;
}
.fl {
    float: left;
    display: inline;
} */
</style>

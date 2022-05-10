<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

export interface Order {
  id: string
  name: string
  goodsIdList: number[]
  price: number
  count: number
  time: string
  status: string
}
const props = defineProps<{
  order: Order
}>()

interface GoodInfo {
  imgUrl: string
}

const goodsInfoList = ref<GoodInfo[]>([])
function getGoodsInfo() {
  goodsInfoList.value = [{
    imgUrl: 'https://img.yzcdn.cn/vant/cat.jpeg',
  }, {
    imgUrl: 'https://img.yzcdn.cn/vant/cat.jpeg',
  },
  ]
}

onLoad(() => {
  getGoodsInfo()
})

function navToGoodDetail(id: string) {
  return () => {
    uni.navigateTo({
      url: `/pages/goods/goods?id=${id}`,
    })
  }
}
</script>

<template>
  <view class="top" @click="navToGoodDetail(props.order.id)">
    <view class="left">
      订单号: {{ props.order.id }}
    </view>
    <view class="right">
      {{ props.order.status }}
    </view>
  </view>
  <view class="flex">
    <view v-for="(goods, i) in goodsInfoList" :key="i">
      <image :src="goods.imgUrl" class="h-20vh w-20vh mx-2" />
    </view>
  </view>
  <!-- <view v-for="(goods, i) in goodsInfoList" :key="i" class="">
    <view class="left">
      <image :src="item2.pic" mode="aspectFill" />
    </view>
    <view class="content">
      <view class="title u-line-2">
        {{ item2.goodsName }}
      </view>
      <view v-if="item2.property" class="type">
        {{ item2.property }}
      </view>
    </view>
    <view class="right">
      <view class="price-score">
        <view v-if="item2.amountSingle" class="props.order">
          <text>¥</text>{{ item2.amountSingle }}
        </view>
        <view v-if="item2.score" class="props.order">
          <text>
            <image class="score-icon" src="/static/images/score.png" />
          </text>{{ item2.score }}
        </view>
      </view>
      <view class="number">
        x{{ item2.number }}
      </view>
    </view>
  </view>
  <view class="total">
    共{{ props.order.goodsNumber }}件商品 合计:
    <view class="price-score" style="display: inline-flex;">
      <view v-if="props.order.amountReal" class="props.order">
        <text>¥</text>{{ props.order.amountReal }}
      </view>
      <view v-if="props.order.score" class="props.order">
        <text>
          <image class="score-icon" src="/static/images/score.png" />
        </text>{{ props.order.score }}
      </view>
    </view>
  </view>
  <view v-if="props.order.status == 0" class="bottom">
    <view class="exchange btn" @click="close(props.order.id)">
      取消订单
    </view>
    <view class="evaluate btn ml24" @click="pay(index)">
      立即支付
    </view>
  </view>
  <view v-if="props.order.status > 0 && !props.order.isEnd" class="bottom">
    <view v-if="props.order.refundStatus == 1" class="btn-box">
      <u-button
        type="error" plain size="small" shape="circle" text="撤销售后"
        @click="refundCancel(props.order)"
      />
    </view>
    <view v-else class="btn-box">
      <u-button type="error" plain size="small" shape="circle" text="退换货" @click="refund(props.order)" />
    </view>
  </view> -->
</template>

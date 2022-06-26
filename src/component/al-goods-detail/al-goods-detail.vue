<script lang="ts" setup>
import { onLoad, onReady } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'
import { type GoodsRecord } from '@/api/goods'
import { moneyFormatter } from '@/filters'
const props = defineProps<{
  goodsDetail: Partial<GoodsRecord>
}>()
const goodsDetail = computed(() => props.goodsDetail)

onReady(() => {
  console.log(props.goodsDetail)
})
const acutalPrice = computed(() => {
  if (props.goodsDetail.discountPrice)
    return moneyFormatter(props.goodsDetail.discountPrice)
  else
    return moneyFormatter(props.goodsDetail.price!)
})
</script>

<template>
  <view class="goods-detail">
    <view class="detail-body">
      <view class="goods-text">
        <view class="price">
          ￥{{ acutalPrice }}
          <text v-if="goodsDetail.discountPrice" class="del-price">
            ￥{{ moneyFormatter(goodsDetail.price!) }}
          </text>
        </view>
        <view class="month-sale">
          销量：{{ goodsDetail.monthSale || 0 }}
        </view>
      </view>
      <view class="goods-title">
        <text class="tag">
          助农商城
        </text>{{ goodsDetail.name }}
      </view>
    </view>
    <!-- 店铺信息 -->
    <view class="goods-shop">
      <view class="logo">
        <image :src="goodsDetail.shopName" mode="widthFix" />
      </view>
      <view class="shop-info">
        <view>
          <text class="name">
            {{ goodsDetail.shopName }}
          </text>
        </view>
        <view class="desc">
          <text>描述{{ goodsDetail.desc }}</text>
          <!-- <text>卖家{{ goodsDetail.serviceScore }}</text>
          <text>物流{{ goodsDetail.shipScore }}</text> -->
        </view>
      </view>
    </view>
    <!-- 商品评价 -->
    <!-- <view class="goods-comment">

</view> -->
    <!-- 商品详情 -->
    <view class="goods-show">
      <view class="title">
        商品详情
      </view>
      <!-- <image v-for="(item,index) in goodsDetail.scollImages" :key="index" :src="item" mode="widthFix" /> -->
      <view v-html="goodsDetail.desc" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
$pad:20rpx 20rpx;
@mixin flex-between {
  display: flex;
  justify-content: space-between;
}
@mixin box-shadow {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}
.goods-detail{
  background-color: #f6f6f6;
}
.detail-body{
  background-color: #fff;
  padding:$pad;
  margin:20rpx;
  @include box-shadow;
}
.swiper{
  height: 600rpx;
}
.swiper-item{
  image{
    width: 100%;
  }
}
.goods-text{
  @include flex-between;
  .price{
    color: red;
    font-weight: 600;
    font-size: 52rpx;
    .del-price{
      color: #888;
      font-size: 28rpx;
      margin-left: 5px;
      text-decoration: line-through;
    }
  }
  .month-sale{
    display: flex;
    align-items: flex-end;
    margin-bottom: 6rpx;
    color: #888;
    font-size: 28rpx;
  }
}

.goods-title {
  font-size: 32rpx;
  font-weight: 600;
  margin: 8rpx 0;
  .tag{
    background-color: red;
    color: #fff;
    font-size: 20rpx;
    line-height: 1;
    font-weight: normal;
    padding: 4rpx 6rpx;
    border-radius: 4px;
    margin-right: 4px;
    position: relative;
    top: -4rpx;
  }
  }
  .goods-shop{
  display: flex;
  margin: 20rpx;
  background-color: #fff;
  padding: $pad;
  @include box-shadow;
  .logo{
    margin-right: 20rpx;
    image{
      width: 120rpx;
      height: 120rpx;
      border-radius: 5px;
    }
  }
  .shop-info{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 10rpx;
    flex: 1;
    .name{
      font-weight: bold;
    }
  }
  .desc{
    font-size: 24rpx;
    color: #888;
    text{
      margin-right: 30rpx;
    }
  }
  }
  .goods-show{
  background-color: #fff;

  font-weight: bold;
  .title{
    padding: $pad;
    margin: 0 20rpx 0 20rpx;
    position: relative;
    &:before{
      position: absolute;
      left: 8rpx;
      top: 30rpx;
      content: "";
      display: block;
      width: 3px;
      height: 25rpx;
      background-color: red;
    }
  }
  image{
    outline-width: 0;
    vertical-align: top;
    width: 100%;
  }
  }
  .coupon-b {
  @include flex-between;
  margin: 20rpx 0;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 130rpx;
  align-items: center;
  padding: 0 30rpx;
  color: #fff;
  }

  .coupon-text {
  font-size: 32rpx;
  letter-spacing: 2rpx;
  margin-right: 22rpx;
  }

  .coupon-time {
  color: rgba(255, 255, 255, 0.67);
  font-size: 24rpx;
  }

  .kouling-box {
  width: 100%;
  height: 100%;
  padding: 20rpx;
  text-align: center;
  /* border-radius: 10px; */
  }

  .kouling-text {
  text-align: left;
  margin: 30rpx 0;
  background-color: #f7dfad;
  padding: 30rpx;
  border-radius: 5px;
  border: 1px solid #ff0000;
  }

</style>

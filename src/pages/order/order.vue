<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { Order } from '@/component/order-card/order-card.vue'
import orderCard from '@/component/order-card/order-card.vue'

const tabs = reactive(['全部', '待付款', '待发货', '待收货', '待评价'])
const current = ref(0)
function onClickItem(e: any) {
  if (current.value !== e.currentIndex)
    current.value = e.currentIndex
}

const orderList = ref<Array<Order>>([
  {
    id: '1',
    name: '商品1',
    goodsIdList: [1, 2],
    price: 100,
    count: 1,
    time: '2020-05-01',
    status: '待发货',
  },
])
</script>

<template>
  <view>
    <view class="wrap">
      <view bg-color="#ffffff" class="sticky top-0">
        <uni-section title="实心标签" type="line">
          <uni-segmented-control
            :current="current" :values="tabs" style-type="text"
            active-color="red" @click-item="onClickItem"
          />
        </uni-section>
      </view>
      <view class="content">
        <view v-for="v, i in tabs" :key="i">
          <view v-if="current === i" class="all">
            <text class="content-text">
              选项卡{{ v }}的内容
            </text>
            <view>
              <order-card v-for="order1, orderIdx in orderList" :key="orderIdx" :order="order1" />
            </view>
          </view>
        </view>
      </view>
      <page-box-empty
        v-if="!orderList || orderList.length == 0" title="您还没有相关的订单" sub-title="可以去看看有那些想买的～"
        :show-btn="true"
      />
    </view>
  </view>
</template>

<style lang="scss" scoped>
.order {
    width: 710rpx;
    background-color: #ffffff;
    margin: 20rpx auto;
    border-radius: 20rpx;
    box-sizing: border-box;
    padding: 20rpx;
    font-size: 28rpx;

    .top {
        display: flex;
        justify-content: space-between;

        .left {
            display: flex;
            align-items: center;

            .store {
                margin: 0 10rpx;
                font-size: 32rpx;
                font-weight: bold;
            }
        }

        .right {
            color: darkblue;
        }
    }

    .item {
        display: flex;
        margin: 20rpx 0 0;

        .left {
            margin-right: 20rpx;

            image {
                width: 200rpx;
                height: 200rpx;
                border-radius: 10rpx;
            }
        }

        .content {
            flex: 1;

            .title {
                font-size: 28rpx;
                line-height: 50rpx;
            }

            .type {
                margin: 10rpx 0;
                font-size: 24rpx;
                color: red;
            }

            .delivery-time {
                color: #e5d001;
                font-size: 24rpx;
            }
        }

        .right {
            margin-left: 10rpx;
            padding-top: 20rpx;
            text-align: right;

            .decimal {
                font-size: 24rpx;
                margin-top: 4rpx;
            }

            .number {
                color: red;
                font-size: 24rpx;
            }
        }
    }

    .total {
        margin-top: 20rpx;
        text-align: right;
        font-size: 24rpx;

        .total-price {
            font-size: 32rpx;
        }
    }

    .bottom {
        display: flex;
        margin-top: 40rpx;
        padding: 0 10rpx;
        justify-content: flex-end;
        align-items: center;

        .btn {
            line-height: 52rpx;
            width: 160rpx;
            border-radius: 26rpx;
            border: 2rpx solid gray;
            font-size: 26rpx;
            text-align: center;
            color: black;
        }

        .evaluate {
            color: black;
            border-color: gray;
        }
    }
}

.wrap {
    display: flex;
    flex-direction: column;
    height: calc(100vh - var(--window-top));
    width: 100%;
}

.swiper-box {
    flex: 1;
}

.swiper-item {
    height: 100%;
}

.ml24 {
    margin-left: 24rpx;
}

.btn-box {
    width: 160rpx;
}
</style>

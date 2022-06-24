<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import type { OrderRet } from '@/api/order'
import { type Order, type OrderParams, listUserOrder } from '@/api/order'
import orderCard from '@/component/order-card/order-card.vue'
import uniEmpty from '@/component/uni-empty/uni-empty.vue'
import { useUserStore } from '@/store/user'

const tabs = reactive(['全部', '待付款', '待发货', '待收货', '待评价'])
const current = ref(0)
const userStore = useUserStore()
const orderParams = ref<OrderParams>({})
const orderList = ref<Array<Partial<OrderRet>>>([])
const isLoading = ref(false)

function loadOrderInfo() {
  isLoading.value = true
  listUserOrder(orderParams.value).then((res: any) => {
    console.log(res)
    orderList.value = res.data
  }).catch(() => {
    // const order = {
    //   ...sample,
    // }
    // if (orderParams.value.state)
    //   order.state = orderParams.value.state
    // orderList.value = Array.from({ length: 10 }, () => order)
  }).finally(() => {
    isLoading.value = false
  })
}
function onClickItem(e: any) {
  if (current.value === e.currentIndex)
    return

  current.value = e.currentIndex
  if (e.currentIndex === 0) {
    orderParams.value = {}
  }
  else {
    orderParams.value = {
      state: e.currentIndex - 1,
    }
  }

  loadOrderInfo()
}

onLoad(() => {
  loadOrderInfo()
})
</script>

<template>
  <view>
    <view class="h-100vh">
      <view class="sticky top-0 bg-white z-1">
        <uni-segmented-control
          :current="current" :values="tabs" style-type="text"
          active-color="red" @click-item="onClickItem"
        />
      </view>
      <view class="content bg-slate-100" style="padding-top: 0.2rem;">
        <scorll-view v-for="v, i in tabs" :key="i" class="">
          <view v-if="current === i" class="all">
            <view v-if="isLoading" class="flex justify-center items-center h-100vh">
              <uni-load-more icon-type="circle" status="loading" />
            </view>
            <view v-else>
              <order-card v-for="order1, orderIdx in orderList" :key="orderIdx" class="w-100vw h-45vw mb-4 mx-2" :order="order1" />
            </view>
          </view>
        </scorll-view>
      </view>
      <uni-empty
        v-if="!orderList || orderList.length == 0" css-class="mt-20" text="您还没有相关的订单"
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

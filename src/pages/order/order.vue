<script lang="ts" setup>
</script>

<template>
  <view>
    <view class="wrap">
      <u-sticky bg-color="#ffffff">
        <view class="u-tabs-box">
          <u-tabs line-color="#e64340" :list="list" :current="current" @change="change" />
        </view>
      </u-sticky>
      <page-box-empty
        v-if="!orderList || orderList.length == 0" title="您还没有相关的订单" sub-title="可以去看看有那些想买的～"
        :show-btn="true"
      />
      <view v-else class="page-box">
        <view v-for="(item, index) in orderList" :key="item.id" class="order">
          <view class="top" @click="godetail(item.id)">
            <view class="left">
              订单号: {{ item.orderNumber }}
            </view>
            <view class="right">
              {{ item.statusStr }}
            </view>
          </view>
          <view v-for="(item2, index2) in item.goodsList" :key="item2.id" class="item">
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
                <view v-if="item2.amountSingle" class="item">
                  <text>¥</text>{{ item2.amountSingle }}
                </view>
                <view v-if="item2.score" class="item">
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
            共{{ item.goodsNumber }}件商品 合计:
            <view class="price-score" style="display: inline-flex;">
              <view v-if="item.amountReal" class="item">
                <text>¥</text>{{ item.amountReal }}
              </view>
              <view v-if="item.score" class="item">
                <text>
                  <image class="score-icon" src="/static/images/score.png" />
                </text>{{ item.score }}
              </view>
            </view>
          </view>
          <view v-if="item.status == 0" class="bottom">
            <view class="exchange btn" @click="close(item.id)">
              取消订单
            </view>
            <view class="evaluate btn ml24" @click="pay(index)">
              立即支付
            </view>
          </view>
          <view v-if="item.status > 0 && !item.isEnd" class="bottom">
            <view v-if="item.refundStatus == 1" class="btn-box">
              <u-button
                type="error" plain size="small" shape="circle" text="撤销售后"
                @click="refundCancel(item)"
              />
            </view>
            <view v-else class="btn-box">
              <u-button type="error" plain size="small" shape="circle" text="退换货" @click="refund(item)" />
            </view>
          </view>
        </view>
      </view>
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
            color: $u-warning-dark;
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
                color: $u-tips-color;
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
                color: $u-tips-color;
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
        justify-content: end;
        align-items: center;

        .btn {
            line-height: 52rpx;
            width: 160rpx;
            border-radius: 26rpx;
            border: 2rpx solid $u-border-color;
            font-size: 26rpx;
            text-align: center;
            color: $u-info-dark;
        }

        .evaluate {
            color: $u-warning-dark;
            border-color: $u-warning-dark;
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

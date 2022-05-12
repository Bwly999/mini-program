<script lang="ts" setup>
import { ref } from 'vue'
import { listAllCategory } from '@/api/category'
import type { Category } from '@/api/category'
import { mockData } from '@/mock/category'

const categoryList = ref<Category[]>()
const current = ref(0)
listAllCategory().then((res) => {
  console.log(res)
  categoryList.value = res.data
}).catch(() => {
  categoryList.value = mockData
})
const scrollTop = ref(0)
async function swichMenu(index) {
  if (index == current.value)
    return
  current.value = index
  // 如果为0，意味着尚未初始化
  //   if (this.menuHeight == 0 || this.menuItemHeight == 0) {
  //     await this.getElRect('menu-scroll-view', 'menuHeight')
  //     await this.getElRect('u-tab-item', 'menuItemHeight')
  //   }
  scrollTop.value = 0
//   this.getGoodsList(index)
}
</script>

<template>
  <view class="flex">
    <scroll-view class="u-tab-view menu-scroll-view" scroll-y="true" scroll-with-animation="true">
      <view
        v-for="(item,index) in categoryList" :key="index" class="u-tab-item"
        :class="[current==index ? 'u-tab-item-active' : '']" :data-current="index"
        @tap.stop="swichMenu(index)"
      >
        <text class="u-line-1">
          {{ item.name }}
        </text>
      </view>
    </scroll-view>
    <scroll-view
      class="goods-container" scroll-y="true" :scroll-top="scrolltop"
      @scrolltolower="goodsGoBottom"
    >
      <u-empty v-if="!goodsList" mode="list" text="暂无商品" margin-top="200rpx" />
      <view v-for="(item, index) in goodsList" :key="index" class="goodsList">
        <u--image
          show-loading lazy-load :src="item.pic" radius="16rpx" width="240rpx" height="240rpx"
          @click="goDetail(item)"
        />
        <view class="goods-info">
          <view class="goods-title u-line-3 pt16" @click="goDetail(item)">
            <u-tag v-if="item.supplyType == 'vop_jd' || item.supplyType == 'jdJoycityPoints'" text="京东自营" bg-color="#e64340" border-color="#e64340" size="mini" class="goods-title-tag" />
            <text class="goods-title">
              {{ item.name }}
            </text>
          </view>
          <view v-if="item.numberSells" class="t2">
            已售:{{ item.numberSells }}
          </view>
          <view class="price-score">
            <view v-if="item.minPrice" class="item">
              <text>¥</text>{{ item.minPrice }}
            </view>
            <view v-if="item.minScore" class="item">
              <text><image class="score-icon" src="/static/images/score.png" /></text>{{ item.minScore }}
            </view>
          </view>
          <view v-if="item.supplyType != 'jdJoycityPoints'" class="addCar">
            <u-icon
              v-if="item.propertyIds || item.hasAddition" name="plus-circle" color="#e64340"
              size="48rpx" @click="_showGoodsPop(item)"
            />
            <u-icon v-else name="shopping-cart" color="#e64340" size="64rpx" @click="addCart(item)" />
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
.category-page {
		display: flex;
		flex-direction: column;
		width: 100vw;
		height: calc(100vh - var(--window-bottom) - var(--status-bar-height) - var(--window-top));

		.search {
			padding: 8rpx;
			display: flex;
			align-items: center;

			.scan {
				padding: 0 16rpx;
			}
		}

		.main {
			flex: 1;
			overflow: hidden;
			display: flex;

			.u-tab-view {
				width: 180rpx;
				height: 100%;
				background-color: #f6f6f6;
			}

			.u-tab-item {
				height: 110rpx;
				background: #f6f6f6;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 26rpx;
				color: #444;
				font-weight: 400;
				line-height: 1;
			}

			.u-tab-item-active {
				position: relative;
				color: #000;
				font-size: 30rpx;
				font-weight: 600;
				background: #fff;
			}

			.u-tab-item-active::before {
				content: "";
				position: absolute;
				border-left: 4px solid #e64340;
				height: 60rpx;
				left: 0;
				top: 25rpx;
			}

			.goods-container {
				flex: 1;
				height: 100%;

				.goodsList {
					margin-bottom: 32rpx;
					padding: 0 8rpx;
					display: flex;

					.goods-info {
						flex: 1;
						margin-left: 24rpx;
						position: relative;

						.t {
							font-weight: bold;
							color: #333;
							font-size: 28rpx;
						}

						.t2 {
							color: #666;
							font-size: 26rpx;
						}

						.price {
							color: #e64340;
							font-size: 40rpx;
							display: flex;
							align-items: center;

							font {
								font-size: 22rpx;
							}
						}

						.addCar {
							position: absolute;
							right: 24rpx;
							bottom: 16rpx;
						}
					}
				}
			}
		}

	}
</style>

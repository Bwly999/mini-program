<script lang="ts">

export default {

  data() {
    return {
      swiperCurrent: 0,
      swiperLength: 0,
      carouselList: [],
      goodsList: [],
    }
  },

  onShow() {
    this.loadData()
  },
  methods: {
    /**
			 * 请求静态数据只是为了代码不那么乱
			 * 分次请求未作整合
			 */
    async loadData() {
      const that = this
      // getAdvertList().then((response) => {
      //   const data = response.data
      //   if (data) {
      //     that.swiperLength = data.length
      //     that.carouselList = data
      //   }
      // })

      // const goodsList = await this.$api.json('goodsList')
      // this.goodsList = goodsList || []
    },
    // 轮播图切换修改背景色
    swiperChange(e) {
      const index = e.detail.current
      this.swiperCurrent = index
    },
    // 详情页
    navToDetailPage(item) {
      // 测试数据没有写id，用title代替
      const id = item.title
      uni.navigateTo({
        url: `/pages/product/product?id=${id}`,
      })
    },
  },
  // #ifndef MP
  // 标题栏input搜索框点击
  async onNavigationBarSearchInputClicked(e) {
    this.$api.msg('点击了搜索框')
  },
  // 点击导航栏 buttons 时触发
  onNavigationBarButtonTap(e) {
    const index = e.index
    if (index === 0) {
      this.$api.msg('点击了扫描')
    }
    else if (index === 1) {
      // #ifdef APP-PLUS
      const pages = getCurrentPages()
      const page = pages[pages.length - 1]
      const currentWebview = page.$getAppWebview()
      currentWebview.hideTitleNViewButtonRedDot({
        index,
      })
      // #endif
      uni.navigateTo({
        url: '/pages/notice/notice',
      })
    }
  },
  // #endif
}
</script>

<template>
  <view class="index">
    <view class="top-0 bg-teal-500" style="position: -webkit-sticky; position: sticky;">
      <view class="search-box">
        <input type="text" placeholder="搜索商品">
        <view class="search-icon" />
      </view>
      <view class="nav-bar flex">
        <view class="nav-item">
          <view class="nav-icon" />
          <view class="nav-text">
            首页
          </view>
        </view>
        <view class="nav-item">
          <view class="nav-icon" />
          <view class="nav-text">
            分类
          </view>
        </view>
        <view class="nav-item">
          <view class="nav-icon" />
          <view class="nav-text">
            购物车
          </view>
        </view>
        <view class="nav-item">
          <view class="nav-icon" />
          <view class="nav-text">
            我的
          </view>
        </view>
      </view>
    </view>
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
    <view>
      <a v-for="v, i in 100" :key="i">HHHH {{ v }}</a>
    </view>
  </view>
</template>

<style lang="scss">
	.app-status-bar-height {
		width: 100%;
		height: var(--status-bar-height);
	}

	.index {
		.top-box {
			padding: 16rpx 8rpx;
			display: flex;
			align-items: center;
			background-color: #FFFFFF;

			.t {
				padding-left: 8rpx;
				font-size: 28rpx;
				color: #333;
			}

			.search {
				padding: 0 8rpx;
				flex: 1;
			}
		}

		.swiper {
			position: relative;
			margin-top: 8rpx;

			.notice {
				position: absolute;
				bottom: 46rpx;
				left: 24rpx;
				width: 668rpx;
				color: #fff;
				font-size: 24rpx;
				opacity: 0.8;
				border-radius: 32rpx;
			}
		}

		.category-container {
			padding: 0 0 10px 0;
			margin-top: 16rpx;
			position: relative;
			background-color: white;

			.category-box {
				background-color: #fff;
				display: flex;
				flex-wrap: wrap;
				box-shadow: 0px 0px 18px 0px rgba(5, 5, 5, 0.15);

				margin-left: 25rpx;
				margin-right: 25rpx;
				border-radius: 10px;
				padding: 20rpx 0;
				position: inherit;
			}

			.category-list {
				width: 140rpx;
				text-align: center;
				display: inline-block;
				overflow: hidden;
			}

			.category-column {
				width: 100%;
				margin-top: 20rpx;
				overflow: hidden;
			}

			.category-imgbox {
				width: 100rpx;
				height: 100rpx;
			}

			.category-title {
				font-size: 24rpx;
				text-align: center;
			}
		}

		.live-pic {
			margin-top: 16rpx;
		}

		.ttt {
			display: flex;
			align-items: center;
			margin-top: 24rpx;

			.l {
				flex: 1;
				display: inline-block;
			}

			.content {
				display: flex;
				align-items: center;
				padding: 0 16rpx;

				image {
					width: 34rpx;
					height: 42rpx;
				}

				text {
					margin-left: 16rpx;
					color: #333;
					font-size: 28rpx;
				}
			}
		}

		.miaoshaGoods {
			.miaosha-goods-list {
				margin: 20rpx;
				border-radius: 16rpx;
				display: flex;
				padding: 20rpx;
			}

			.miaosha-goods-list .image {
				width: 260rpx;
				height: 260rpx;
				flex-shrink: 0;
				border-radius: 16rpx;
			}

			.miaosha-goods-list .r {
				margin-left: 32rpx;
			}

			.miaosha-goods-list .r .goods-title {
				color: #333;
				font-size: 28rpx;
			}

			.miaosha-goods-list .r .label {
				color: #e64340;
				font-size: 24rpx;
				display: flex;
				align-items: flex-start;
				margin-top: 8rpx;
			}

			.miaosha-goods-list .r .label text {
				margin-left: 8rpx;
			}

			.miaosha-goods-list .count-down {
				background: rgba(250, 195, 198, 0.3);
				border-radius: 5rpx;
				font-size: 14rpx;
				color: red;
				font-weight: 400;
				padding: 6rpx 16rpx;
				margin-top: 6rpx;
				text-align: center;
				border-radius: 10rpx;
			}

			.miaosha-price-btn {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.miaosha-price-btn .msbtn {
				width: 170rpx;
				height: 60rpx;
				background: linear-gradient(156deg, #FF7863 0%, #FF211A 100%);
				border-radius: 34rpx;
				border: none !important;
				line-height: 60rpx !important;
				font-size: 13px !important;
			}

			.miaosha-price-btn .price {
				color: #e64340;
				font-size: 40rpx;
				margin-top: 12rpx;
				padding-right: 32rpx;
			}

			.miaosha-price-btn .price text {
				color: #666666;
				font-size: 26rpx;
				text-decoration: line-through;
			}
		}

		.goods-container {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			box-sizing: content-box;
			padding: 0 24rpx;
		}

		.goods-box {
			width: 339rpx;
			background-color: #fff;
			overflow: hidden;
			margin-top: 24rpx;
			border-radius: 5px;
			border: 1px solid #D1D1D1;
			padding-bottom: 10rpx;
		}

		.goods-box .img-box {
			width: 339rpx;
			height: 339rpx;
			overflow: hidden;
		}

		.goods-box .img-box image {
			width: 339rpx;
			height: 339rpx;
		}

		.goods-box .goods-title {
			padding: 0 4rpx;
		}

		.goods-box .goods-price-container {
			display: flex;
			align-items: baseline;
		}

		.goods-box .goods-price {
			overflow: hidden;
			font-size: 34rpx;
			color: #F20C32;
			margin-left: 24rpx;
		}

		.goods-box .goods-price2 {
			overflow: hidden;
			font-size: 26rpx;
			color: #aaa;
			text-decoration: line-through;
			margin-left: 20rpx;
		}

		.coupons-float {
			position: fixed;
			right: 15rpx;
			bottom: 180rpx;
			width: 80rpx;
			height: 80rpx;
			background-color: #fff;
			text-align: center;
			border-radius: 50%;
			border: 1rpx solid #ddd;
		}

		.coupons-float image {
			width: 60rpx;
			height: 60rpx;
			margin-top: 10rpx;
		}

		.adPositionIndexPop {
			width: 100vw;
			height: 100vh;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}

		.adPositionIndexPop image {
			width: 420rpx;
		}

		.adPositionIndexPop .close {
			margin-top: 32rpx;
		}
	}

	.blank {
		height: 32rpx;
	}
</style>

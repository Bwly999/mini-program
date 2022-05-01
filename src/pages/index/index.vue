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
    <view>
      <view class="uni-padding-wrap uni-common-mt">
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
    <u-sticky bg-color="#FFFFFF" custom-nav-height="0">
      <!--  #ifdef  APP-PLUS -->
      <view class="app-status-bar-height" />
      <!--  #endif -->
      <view class="top-box" :style="headerMarginTopStyle">
        <view class="t">
          {{ sysconfigMap.mallName }}
        </view>
        <view class="search">
          <u-search v-model="kw" placeholder="输入关键词搜索" :show-action="false" :disabled="true" @click="goSearch" />
        </view>
        <!--  #ifdef  MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ -->
        <view class="mp-btn" :style="menuButtonInfoStyle" />
        <!--  #endif -->
      </view>
    </u-sticky>
    <u-cell
      v-if="shopInfo" icon="map" :title="shopInfo.name" value="切换门店" url="/pages/shop/select" clickable
      is-link
    />
    <view class="swiper">
      <u-swiper
        v-if="banners" :list="banners" indicator circular key-name="picUrl" height="375rpx"
        @click="tapBanner"
      />
      <u-notice-bar
        v-if="goodsDynamic" class="notice" icon="bag" :text="goodsDynamic" direction="column"
        mode="link" :disable-touch="false" @click="noticeclick"
      />
    </view>
    <div v-if="categories && categories.length > 0" class="category-container">
      <view class="category-box">
        <!-- <view v-for="(item, index) in categories" :key="index" class="category-list">
          <view class="category-column" @click="categoryClick(item)">
            <image mode="aspectFill" class="category-imgbox" :src="item.icon" />
            <view class="category-title">
              {{ item.name }}
            </view>
          </view>
        </view> -->
      </view>
    </div>
    <u-notice-bar
      v-if="notice" class="notice" icon="volume" :text="notice.title" mode="link"
      url="/pages/notice/list"
    />
    <u--image
      v-if="adPosition['index-live-pic']" class="live-pic" :show-loading="true"
      :src="adPosition['index-live-pic'].val" width="100vw" height="auto" radius="32rpx" mode="widthFix"
      @click="goUrl(adPosition['index-live-pic'].url)"
    />
    <view v-if="miaoshaGoods" class="miaoshaGoods">
      <view class="ttt">
        <view class="l">
          <u-line />
        </view>
        <view class="content">
          <image src="/static/images/miaosha.png" />
          <text>限时秒杀</text>
        </view>
        <view class="l">
          <u-line />
        </view>
      </view>
      <view v-for="(item, index) in miaoshaGoods" :key="index" class="miaosha-goods-list" @click="toDetailsTap">
        <image :src="item.pic" class="image" mode="aspectFill" lazy-load="true" @click="goDetail(item)" />
        <view class="r">
          <view class="goods-title" @click="goDetail(item)">
            {{ item.name }}
          </view>
          <!-- <u-count-down
            v-if="item.dateStartInt > 0" class="count-down" :time="item.dateStartInt"
            format="距离开始: HH时mm分ss秒"
          />
          <u-count-down
            v-if="item.dateStartInt <= 0 && item.dateEndInt > 0" class="count-down"
            :time="item.dateEndInt" format="剩余: HH时mm分ss秒"
          /> -->
          <view class="miaosha-price-btn">
            <view class="price">
              ￥{{ item.minPrice }} <text>￥{{ item.originalPrice }}</text>
            </view>
            <!-- <u-button
              v-if="item.dateStartInt > 0" type="warning" size="mini" plain disabled text="即将开始"
              @click="goDetail(item)"
            />
            <u-button
              v-else-if="item.dateEndInt <= 0" type="info" size="mini" plain disabled text="已结束"
              @click="goDetail(item)"
            />
            <u-button
              v-else-if="item.stores <= 0" type="info" size="mini" plain disabled text="已抢完"
              @click="goDetail(item)"
            />
            <u-button v-else type="error" size="mini" plain text="立即抢购" @click="goDetail(item)" /> -->
          </view>
        </view>
      </view>
    </view>
    <view v-if="goodsRecommend" class="goodsRecommend">
      <view class="ttt">
        <view class="l">
          <u-line />
        </view>
        <view class="content">
          <image src="/static/images/recommend.png" />
          <text>爆款推荐</text>
        </view>
        <view class="l">
          <u-line />
        </view>
      </view>
      <view class="goods-container">
        <view v-for="(item, index) in goodsRecommend" :key="index" class="goods-box" bindtap="toDetailsTap">
          <view class="img-box">
            <image
              :src="item.pic" class="image" mode="aspectFill" lazy-load="true"
              @click="goDetail(item)"
            />
          </view>
          <view class="goods-title u-line-3 pt16" @click="goDetail(item)">
            <u-tag
              v-if="item.supplyType == 'vop_jd' || item.supplyType == 'jdJoycityPoints'" text="京东自营"
              bg-color="#e64340" border-color="#e64340" size="mini" class="goods-title-tag"
            />
            <text class="goods-title">
              {{ item.name }}
            </text>
          </view>
          <u--text
            v-if="item.characteristic" class="goods-title" :text="item.characteristic" size="28rpx"
            color="#c95060"
          />
          <view class="price-score">
            <view v-if="item.minPrice" class="item">
              <text>¥</text>{{ item.minPrice }}
            </view>
            <view v-if="item.minScore" class="item">
              <text>
                <image class="score-icon" src="/static/images/score.png" />
              </text>{{ item.minScore }}
            </view>
          </view>
        </view>
      </view>
    </view>
    <view v-if="kanjiaList" class="miaoshaGoods">
      <view class="ttt">
        <view class="l">
          <u-line />
        </view>
        <view class="content">
          <image src="/static/images/kanjia.png" />
          <text>疯狂砍价</text>
        </view>
        <view class="l">
          <u-line />
        </view>
      </view>
      <view v-for="(item, index) in kanjiaList" :key="index" class="miaosha-goods-list" @click="toDetailsTap">
        <image :src="item.pic" class="image" mode="aspectFill" lazy-load="true" @click="goDetail(item)" />
        <view class="r">
          <view class="goods-title" @click="goDetail(item)">
            {{ item.name }}
          </view>
          <u--text
            v-if="item.characteristic" class="goods-title" :text="item.characteristic" size="28rpx"
            color="#c95060"
          />
          <u-line-progress :percentage="item.process" active-color="#ff0000" />
          <view class="miaosha-price-btn">
            <view class="price">
              ￥{{ item.kanjiaPrice }} <text>￥{{ item.minPrice }}</text>
            </view>
            <u-button type="error" size="mini" plain text="我要砍价" @click="goDetail(item)" />
          </view>
        </view>
      </view>
    </view>
    <view v-if="pingtuanList" class="miaoshaGoods">
      <view class="ttt">
        <view class="l">
          <u-line />
        </view>
        <view class="content">
          <image src="/static/images/pingtuan.png" />
          <text>全民拼团</text>
        </view>
        <view class="l">
          <u-line />
        </view>
      </view>
      <view v-for="(item, index) in kanjiaList" :key="index" class="miaosha-goods-list" @click="toDetailsTap">
        <image :src="item.pic" class="image" mode="aspectFill" lazy-load="true" @click="goDetail(item)" />
        <view class="r">
          <view class="goods-title" @click="goDetail(item)">
            {{ item.name }}
          </view>
          <u--text
            v-if="item.characteristic" class="goods-title" :text="item.characteristic" size="28rpx"
            color="#c95060"
          />
          <view class="miaosha-price-btn">
            <view class="price">
              ￥{{ item.kanjiaPrice }} <text>￥{{ item.minPrice }}</text>
            </view>
            <u-button type="success" size="mini" text="我要拼团" @click="goDetail(item)" />
          </view>
        </view>
      </view>
    </view>
    <view v-if="goods" class="goodsRecommend">
      <view class="ttt">
        <view class="l">
          <u-line />
        </view>
        <view class="content">
          <image src="/static/images/goodslist.png" />
          <text>商品列表</text>
        </view>
        <view class="l">
          <u-line />
        </view>
      </view>
      <view class="goods-container">
        <view v-for="(item, index) in goods" :key="index" class="goods-box" bindtap="toDetailsTap">
          <view class="img-box">
            <image
              :src="item.pic" class="image" mode="aspectFill" lazy-load="true"
              @click="goDetail(item)"
            />
          </view>
          <view class="goods-title u-line-3 pt16" @click="goDetail(item)">
            <u-tag
              v-if="item.supplyType == 'vop_jd' || item.supplyType == 'jdJoycityPoints'" text="京东自营"
              bg-color="#e64340" border-color="#e64340" size="mini" class="goods-title-tag"
            />
            <text class="goods-title">
              {{ item.name }}
            </text>
          </view>
          <u--text
            v-if="item.characteristic" class="goods-title" :text="item.characteristic" size="28rpx"
            color="#c95060"
          />
          <view class="price-score">
            <view v-if="item.minPrice" class="item">
              <text>¥</text>{{ item.minPrice }}
            </view>
            <view v-if="item.minScore" class="item">
              <text>
                <image class="score-icon" src="/static/images/score.png" />
              </text>{{ item.minScore }}
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="blank" />
    <view class="coupons-float" @click="goCoupons">
      <image src="/static/images/gift.png" />
    </view>
    <u-overlay v-if="adPosition['indexPop']" :show="adPositionIndexPop" @click="goUrl(adPosition['indexPop'].url)">
      <view class="adPositionIndexPop">
        <image :src="adPosition['indexPop'].val" mode="widthFix" />
        <view class="close" @click="adPositionIndexPop = false">
          <u-icon name="close-circle-fill" color="#eee" size="80rpx" />
        </view>
      </view>
    </u-overlay>
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

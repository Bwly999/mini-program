<script lang="ts">
import { computed, reactive, toRefs, watch } from 'vue'
import { onReady } from '@dcloudio/uni-app'
import PopupBottom from '@/component/echone-sku/popup-bottom.vue'
export default {
  components: {
    PopupBottom,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    themeColor: {
      type: String,
      default: '#1ac792',
    },
    combinations: {
      type: Array,
      default() {
        return []
      },
    },
    specifications: {
      type: Array,
      default() {
        return []
      },
    },
    defaultSelectIndex: {
      type: Number,
      default: 0,
    },
    combinationsProps: {
      type: Object,
      default() {
        return {
          id: 'id',
          value: 'value',
          image: 'image',
          price: 'price',
          stock: 'stock',
        }
      },
    },
    specificationsProps: {
      type: Object,
      default() {
        return {
          id: 'id',
          list: 'list',
          name: 'name',
        }
      },
    },
    mode: {
      // 0 购买  1加入购物车
      type: Number,
      default() {
        return 0
      },
    },
  },
  setup(props: any, { emit }) {
    const skuData = reactive({
      buyCount: 1,
      selectedIndex: 0,
      borderWidth: uni.upx2px(2),
      mySpecifications: [],
      selectSkuInfo: {},
    })
    const speData = reactive({
      speId: props.specificationsProps.id,
      speList: props.specificationsProps.list,
      speName: props.specificationsProps.name,
      cbValue: props.specificationsProps.value,
      cbImage: props.specificationsProps.image,
      cbPrice: props.specificationsProps.price,
      cbStock: props.specificationsProps.stock,
    })

    const acutalPrice = computed(() => {
      const value = skuData.selectSkuInfo[speData.cbPrice]
      if (!value)
        return '0.00'
      return Number(value).toFixed(2)
    })

    function initSkuData() {
      skuData.selectedIndex = props.defaultSelectIndex
      skuData.selectSkuInfo = props.combinations[skuData.selectedIndex]
      skuData.mySpecifications = JSON.parse(JSON.stringify(props.specifications))
      skuData.mySpecifications.forEach((item, idx) => {
        // 当前规格组合值
        const selects = props.combinations[skuData.selectedIndex][speData.cbValue].split(',')
        // 每类规格对应其列表的下标 并记录在属性sidx在mySpecifications的子对象中
        const sIndex = item[speData.speList].indexOf(selects[idx])
        if (sIndex === -1) {
          uni.showToast({
            title: '默认规格值不存在',
          })
          return
        }
        item.sidx = sIndex
      })
    }
    function selectSku(sIndex: any, index: any) {
      skuData.mySpecifications[sIndex].sidx = index
      const selectInfo = skuData.mySpecifications.reduce((prev, cur) => {
        if (prev)
          return `${prev},${cur[speData.speList][cur.sidx]}`
        else
          return cur[speData.speList][cur.sidx]
      }, '')
      skuData.selectedIndex = props.combinations.findIndex(item => item[speData.cbValue] === selectInfo)
      skuData.selectSkuInfo = props.combinations[skuData.selectedIndex]
      if (skuData.selectSkuInfo[speData.cbStock] === 0)
        skuData.buyCount = 0

      if (skuData.selectSkuInfo[speData.cbStock] !== 0 && skuData.buyCount * 1 === 0)
        skuData.buyCount = 1
    }
    function handleBuyCount(type) {
      if (type === 'minus') {
        if (skuData.buyCount <= 1)
          return
        skuData.buyCount = skuData.buyCount * 1 - 1
      }
      if (type === 'add') {
        if (skuData.buyCount >= skuData.selectSkuInfo[speData.cbStock])
          return
        skuData.buyCount = skuData.buyCount * 1 + 1
      }
    }
    function closeSkuBox() {
      emit('close')
    }
    function handleConfirm() {
      const result = skuData.selectSkuInfo
      result.count = skuData.buyCount * 1
      emit('confirm', result)
    }

    onReady(() => {
      if (props.specifications.length)
        initSkuData()
    })

    const model = computed(() => props.model)

    return {
      speData,
      ...toRefs(skuData),
      ...toRefs(speData),
      selectSku,
      handleBuyCount,
      closeSkuBox,
      handleConfirm,
      acutalPrice,
      model,
    }
  },
}
</script>

<template>
  <popup-bottom :show="show" @close="closeSkuBox">
    <view class="sku-box">
      <view class="sku-header container">
        <image class="goods-img" :src="selectSkuInfo[cbImage]" />

        <view class="sku-goods-info">
          <view class="money" :style="{color:themeColor}">
            <text class="symbol fs-26">
              ￥
            </text>
            <text class="amount fs-38">
              {{ acutalPrice }}
            </text>
          </view>
          <view class="stock fs-24">
            库存{{ selectSkuInfo[cbStock] }}件
          </view>
          <view class="fs-24">
            已选："{{ selectSkuInfo[cbValue] }}"
          </view>
        </view>
      </view>
      <scroll-view class="sku-list" scroll-y="true">
        <view v-for="(sku,sIndex) in mySpecifications" :key="sku[speId]" class="sku-item container">
          <view class="sku-name">
            {{ sku[speName] }}
          </view>
          <view class="sku-content">
            <text
              v-for="(item,index) in sku[speList]"
              :key="index"
              class="sku-content-item"
              :style="{
                borderColor: index===sku.sidx? themeColor: '',
                color:index===sku.sidx?themeColor:'',
                backgroundColor: index===sku.sidx?'white':'#f5f5f5' }"
              @click="selectSku(sIndex,index)"
            >
              {{ item }}
            </text>
          </view>
        </view>
      </scroll-view>
      <view class="sku-item container count">
        <view class="sku-name">
          数量
        </view>
        <view class="count-box">
          <text class="minus" :class="{disabled:buyCount<=1}" @click="handleBuyCount('minus')">
            -
          </text>
          <input v-model="buyCount" class="count-content" :disabled="selectSkuInfo[cbStock]<=0">
          <text class="add" :class="{disabled:buyCount>=selectSkuInfo[cbStock]}" @click="handleBuyCount('add')">
            +
          </text>
        </view>
      </view>
      <view class="confirm-btn container" :class="{disabled:selectSkuInfo[cbStock]==0}" :style="{backgroundColor:themeColor}" @click="handleConfirm">
        {{ selectSkuInfo[cbStock]>0?mode == 0 ? '购买' : '加入购物车' : '缺货中' }}
      </view>
    </view>
  </popup-bottom>
</template>

<style lang="scss" scoped>
	.flex-center {
		display: flex;
		align-items: center;
	}

	.flex-center-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	$font-color-light: #999999;
	$page-bg-color-grey: #f5f5f5;

	.fs-24 {
		font-size: 24upx;
	}

	.fs-26 {
		font-size: 26upx;
	}

	.fs-38 {
		font-size: 38upx;
	}

	.container {
		width: 690upx;
		margin: 0 auto;
	}

	.sku-box {
		min-height: 500upx;
		background-color: white;
		padding-bottom: 20upx;
		font-size: 28upx;
		color: #333333;
		.sku-header {
			display: flex;
			padding: 40upx 0 20upx;
			.goods-img {
				width: 200upx;
				height: 200upx;
				border-radius: 6upx;
				border: 4upx solid white;
				flex: none;
				margin-top: -80upx;
			}
		}
		.sku-goods-info {
			margin-left: 20upx;
			.money {
				border: none;
				padding-bottom: 0;
			}
			.stock {
				color: $font-color-light;
			}
		}
		.sku-list {
			max-height: 500upx;
		}
		.sku-item {
			padding: 30upx 0;
			.sku-name {
				font-size: 30upx;
			}
			.sku-content {
				border-bottom: 2upx solid $page-bg-color-grey;
				padding: 20upx 0;
				@extend .flex-center;
				flex-wrap: wrap;
				.sku-content-item {
					padding: 16upx 20upx;
					border-radius: 6upx;
					margin: 0 30upx 20upx 0;
					border: 2upx solid transparent;
				}
			}
			&.count {
				@extend .flex-center;
				justify-content: space-between;
				.count-box {
					@extend .flex-center;
					text,.count-content {
						@extend .flex-center-center;
						width: 70upx;
						height: 70upx;
						font-size: 32upx;
						border: 2upx solid $page-bg-color-grey;
					}
					.add,.minus {
						font-size: 44upx;
					}
					.count-content {
						border-width: 2upx 0;
						text-align: center;
					}
				}
			}
		}
		.confirm-btn {
			@extend .flex-center-center;
			height: 80upx;
			border-radius: 80upx;
			color: white;
			font-size: 32upx;
			margin-top: 10upx;
		}
	}

	[class*=disabled] {
		color: $font-color-light;
		opacity: .7;
	}
</style>

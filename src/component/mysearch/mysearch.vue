<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { onMounted, ref } from 'vue'
const emit = defineEmits(['searchClick'])
interface MAW {
  selectList: Array<any>
}
const showSelectList = ref(false)
const props = withDefaults(defineProps<MAW>(), { selectList: [] as any[] })
const selectIndex = ref(0)
const options = ref({ id: '', value: '' })
onMounted(() => { options.value.id = props.selectList[selectIndex.value].id })

function selectItem(index: any) {
  selectIndex.value = index
  options.value.id = props.selectList[index].id
}
function selectClick() {
  console.log(props.selectList)
  console.log(showSelectList.value)
  showSelectList.value = !showSelectList.value
}
function seachSubmit() {
  console.log(options.value.value)
  if (options.value.value)
    emit('searchClick', options.value)
}
function clickMask() {
  showSelectList.value = false
}

</script>

<template>
  <view class="page-container">
    <input v-model="options.value" class="seach-input" confirm-type="search" placeholder="搜索">
    <!-- 下拉选择框 -->
    <view class="seach-select">
      <!-- 选中值 -->
      <view class="select-value" @click="selectClick">
        {{ selectList[selectIndex].name }}
        <text class="iconfont icon-xiala1" style="float: right;margin-right: 10rpx;font-size: 18rpx;" />
      </view>
      <!-- 选择列表 -->
      <view class="select-item-list" :style="{'display':(showSelectList)?'block':'none'}">
        <text class="iconfont icon-shang" style="position: absolute;top: -18px;left: 60rpx;font-size: 30rpx;color: #000;" />
        <view v-for="(data,index) in selectList" :key="index" :class="['select-item',(index>0)?'item-border':'']" @click="selectItem(index)">
          {{ data.name }}
        </view>
      </view>
    </view>
    <!-- 搜索按钮 -->
    <view class="seach-submit">
      <!-- <button class="mini-btn" type="default" size="mini">搜索</button> -->
      <view class="seach-submit-text" @click="seachSubmit">
        搜索
      </view>
    </view>
    <!-- <view v-show="showSelectList" class="page-mask" @click="clickMask" /> -->
  </view>
</template>

<style lang="scss" scoped>
$navBarColor: #007aff;
	.page-container{
		background-color: #EDEDED;
		// line-height: 50rpx;
		height: 60rpx;
		font-size: 25rpx;
		border-radius: 70rpx;
		z-index: 1;
		input{
			display: inline-block;
			height: 60rpx;
			line-height: 60rpx;
			margin-left: 10rpx;
			width: 64%;
		}
		.seach-select,.seach-submit{
			display: inline-block;
			height: 60rpx;
			line-height: 60rpx;
		}
		.seach-select{
			position: relative;
			float: left;
			text-align: center;
			width: 120rpx;
			border-right: 1px solid #C9C9C9;
			.select-item-list{
				background-color: #FFFFFF;
				position: absolute;
				top: 75rpx;
				width: 150rpx;
				left: -20rpx;
				border-radius: 20rpx;
				z-index: 10;
				box-shadow:0px 0px 5px #C9C9C9;
				.select-item{
					text-align: center;
					// margin-top: 10rpx;
				}
				.item-border{
					border-top: 1rpx solid #EEEEEE;
				}
			}
		}
		.seach-submit{
			float: right;
			width: 80rpx;
			text-align: center;
			background-color: $navBarColor;
			border-top-right-radius: 70rpx;
			border-bottom-right-radius: 70rpx;
			.seach-submit-text{

			}
		}
		.page-mask{
			position: fixed;
			top: 0;
			bottom: 0;
			right: 0;
			left: 0;
			z-index: 5;
		}

	}

	@font-face {font-family: "iconfont";
  src: url('//at.alicdn.com/t/font_2507618_kvgdeafd2q.eot?t=1619182550299'); /* IE9 */
  src: url('https://at.alicdn.com/t/font_2507618_kvgdeafd2q.eot?t=1619182550299#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
  url('https://at.alicdn.com/t/font_2507618_kvgdeafd2q.woff?t=1619182550299') format('woff'),
  url('https://at.alicdn.com/t/font_2507618_kvgdeafd2q.ttf?t=1619182550299') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('https://at.alicdn.com/t/font_2507618_kvgdeafd2q.svg?t=1619182550299#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-shang:before {
  content: "\e600";
}

.icon-xiala1:before {
  content: "\e647";
}

.icon-shangcheng:before {
  content: "\e7a8";
}

.icon-huahua:before {
  content: "\e603";
}
</style>

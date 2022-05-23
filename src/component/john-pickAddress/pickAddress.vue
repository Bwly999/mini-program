<template>
  <uni-popup ref="popup" type="bottom" @touchmove.stop.prevent="()=>{return}">
    <view class="picker-box" :style="{height:screenHeight+'px'}">
      <view class="picker-close iconfont icon-guanbi" @click="onClose()">
      </view>
      <view class="box-select-button">
        <view class="button" :class="{'button-select':tabIndex===0}" @click="onTab(0)">
          {{provinceName}}
        </view>
        <view class="button" :class="{'button-select':tabIndex===1}" @click="onTab(1)">
          {{cityName}}
        </view>
        <view class="button" :class="{'button-select':tabIndex===2}" @click="onTab(2)">
          {{districtName}}
        </view>
      </view>
      <view class="box-select-area">
        <view class="box-province" v-if="tabIndex===0">
          <scroll-view scroll-y class="scroll-view" :style="{height:boxScrollArea+'px'}">
            <view class="province-item" v-for="(item,index) in provinceArray" :key="index"
              @click="onSelectProvince(item)">
              {{item.name}}
            </view>
          </scroll-view>
        </view>
        <view class="box-city" v-else-if="tabIndex===1">
          <scroll-view scroll-y class="scroll-view" :style="{height:boxScrollArea+'px'}">
            <view class="city-item" v-for="(item,index) in cityArray" :key="index" @click="onSelectCity(item)">
              {{item.name}}
            </view>
          </scroll-view>
        </view>
        <view class="box-district" v-else-if="tabIndex===2">
          <scroll-view scroll-y class="scroll-view" :style="{height:boxScrollArea+'px'}">
            <view class="district-item" v-for="(item, index) in districtArray" :key="index"
              @click="onSelectDistrict(item)">
              {{item.name}}
            </view>
          </scroll-view>
        </view>
      </view>


    </view>
  </uni-popup>
</template>

<script>
  import addressData from './addressData.js'
  export default {
    emits: ['confirm'],
    data() {
      return {
        tabIndex: 0,
        screenHeight: 600,
        province: '', //省
        city: '', //市
        district: '' //区
      }
    },
    mounted() {
      const res = uni.getSystemInfoSync();
      if (res && res.screenHeight) {
        this.screenHeight = res.screenHeight * 0.75
      } else {
        this.screenHeight = 600
      }
    },
    computed: {
      boxScrollArea() {
        return this.screenHeight - uni.upx2px(220)
      },
      provinceName() {
        if (this.province) {
          return this.province.name
        } else {
          return '请选择省'
        }
      },
      cityName() {
        if (this.city) {
          return this.city.name
        } else {
          return '请选择市'
        }
      },
      districtName() {
        if (this.district) {
          return this.district.name
        } else {
          return '请选择区'
        }
      },

      provinceArray() {
        return addressData
      },
      cityArray() {
        // console.log("**** this.province:", this.province)
        if (this.province) {
          // console.log(" this.province.children:", this.province.children.length)
          return this.province.children
        } else {
          return []
        }
      },
      districtArray() {
        console.log("**** this.city:", this.city)
        // console.log(" this.province.children:", this.province.children.length)
        if (this.city) {
          return this.city.children
        } else {
          return []
        }
      }
    },
    methods: {
      onOpen() {
        this.tabIndex = 0
        this.province = ''
        this.city = ''
        this.district = ''
        this.$refs.popup.open()
      },
      onClose() {
        this.$refs.popup.close()
      },
      onTab(index) {
        ///没有选中上一级目录 该目录不能响应点击
        if (index === 1) {
          if (this.cityArray.length === 0) {
            return
          }
        }
        if (index === 2) {
          if (this.districtArray.length === 0) {
            return
          }
        }

        this.tabIndex = index
        ///点击上一个目录 清除下一级目录 之前选择信息
        if (this.tabIndex === 0) {
          this.province = ''
          this.city = ''
          this.district = ''
        } else if (this.tabIndex === 1) {
          this.city = ''
          this.district = ''
        }


      },
      onSelectProvince(item) {
        console.log("onSelectProvince:", item)
        this.province = item
        this.tabIndex = 1

      },
      onSelectCity(item) {
        console.log("onSelectCity:", item)
        this.city = item
        this.tabIndex = 2
      },
      onSelectDistrict(item) {
        console.log("onSelectDistrict:", item)
        this.district = item
        this.onSelectConfirm();
      },
      onSelectConfirm() {
        console.log(`省：${this.province.name},市：${this.city.name}, 区：${this.district.name}`)
        console.log(`省code：${this.province.id},市code：${this.city.id}, 区code：${this.district.id}`)
        this.$emit('confirm',{
          province: this.province,
          city: this.city,
          district: this.district
        })
        this.$refs.popup.close()
      }

    }
  }
</script>


<style lang="scss" scoped>
  .picker-box {

    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    border-top-right-radius: 24rpx;
    border-top-left-radius: 24rpx;

    .picker-close {
      padding: 25rpx;
      text-align: right;
      // line-height: 66rpx;
      height: 45rpx;
      font-size: 50rpx;
      color: #d4237a;
      border-bottom: 1px solid #dddddd;
    }

    .box-select-button {
      height: 88rpx;
      padding: 0rpx 24rpx;
      display: flex;
      flex-direction: row;

      // background-color: #007AFF;
      .button {
        margin-left: 20rpx;
        font-size: 28rpx;
        font-weight: bold;
        line-height: 88rpx;
        min-width: 200rpx;
        max-width: 350rpx;
        overflow: hidden;
        word-wrap: normal;

        // padding-left: 80rpx;
        // background-color: #007AFF;
      }

      .button:first-child {
        margin-left: 0;
      }

      .button-select {
        font-weight: bold;
        color: #d4237a;
        // border-bottom: 2rpx solid #007AFF;
      }
    }

    .box-select-area {
      flex: 1;
      padding: 0 24rpx;
      margin-bottom: 30rpx;

      .box-province {
        height: 100%;
        width: 100%;

        .scroll-view {
          padding: 5rpx;
          width: 100%;
          height: 600rpx;

          .province-item {
            padding: 5rpx;
            height: 60rpx;
            font-size: 26rpx;
          }
        }
      }

      .box-city {
        height: 100%;
        width: 100%;

        .scroll-view {
          height: 100%;
          width: 100%;

          .city-item {
            height: 60rpx;
            font-size: 26rpx;
          }
        }
      }

      .box-district {
        height: 100%;
        width: 100%;

        .scroll-view {
          height: 100%;
          width: 100%;

          .district-item {
            height: 60rpx;
            font-size: 26rpx;
          }
        }
      }
    }
  }
</style>

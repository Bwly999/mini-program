<script lang="ts" setup>
import { reactive, ref, toRefs } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { type UserData } from '@/api/user'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

function login(user: UserData) {
  uni.login({
    provider: 'weixin',
    success: (res) => {
      console.log(res)
      user = {
        code: res.code,
        ...user,
      }
      userStore.login(user)
    },
    fail: (err) => {
      console.log(err)
    },
  })
}

function getUserInfoAndLogin() {
  let user: UserData
  // 获取用户信息
  uni.getUserProfile({
    desc: '获取用户信息',
    success(infoRes) {
      console.log(infoRes)
      user = { ...infoRes.userInfo }
      login(user)
    },
    fail(err) {
      console.log(err)
    },
  })
}

function isLogin() {
  if (userStore.id)
    return true
  else
    return false
}
function showLoginTip() {
  uni.showToast({
    title: '请先登录',
    icon: 'error',
    duration: 2000,
  })
}

function navToMyOrder() {
  if (!isLogin()) {
    showLoginTip()
    return
  }

  uni.navigateTo({
    url: '/pages/order/order',
  })
}
const frightNo = ref('')
function navToFright(no: string) {
  if (!isLogin()) {
    showLoginTip()
    return
  }
  uni.navigateTo({
    url: `/pages/fright/fright?id=${no}`,
  })
}

function navToMyAddress() {
  if (!isLogin()) {
    showLoginTip()
    return
  }

  uni.navigateTo({
    url: '/pages/address/address',
  })
}

onLoad(() => userStore.getUserInfo())
</script>
<template>
  <view class="flex flex-col h-100vh bg-teal-100">
    <view class="user-info flex gap-2 p4">
      <view class="avator rounded-full ml-2">
        <image class="avator-img rounded-full max-h-20 max-w-20" mode="scaleToFill" :src="userStore.avatarUrl" />
      </view>
      <view class="flex items-center">
        <text class="text-xl">
          {{ userStore.nickName }}
        </text>
      </view>
    </view>
    <!-- <web-view src="https://player.bilibili.com/player.html?aid=416605084&bvid=BV13V411i7B7&cid=293227595&page=1" /> -->
    <button v-if="!userStore.id" class="rounded-xl bg-gray-500" @tap="getUserInfoAndLogin">
      登录
    </button>
    <view class="bg-slate-100 rounded-t-2xl grow">
      <view class="bg-white rounded-2xl shadow-md m-2">
        <view class="p2 font-bold">
          个人中心
        </view>
        <view class="flex justify-around text-sm">
          <view class="flex flex-col justify-center items-center shadow-md bg-white m2">
            <a class="i-carbon-order-details text-center text-xl" />
            <button class="icon-btn text-sm" @click="navToMyOrder">
              我的订单
            </button>
          </view>
          <view class="flex flex-col justify-center items-center shadow-md bg-white m2">
            <a class="i-carbon-package text-center text-xl" />
            <button class="icon-btn text-sm" @click="navToFright(frightNo)">
              物流信息
            </button>
          </view>
          <view class="flex flex-col justify-center items-center shadow-md bg-white m2">
            <a class="i-carbon-pedestrian text-center text-xl" />
            <button class="icon-btn text-sm" @click="navToMyAddress">
              我的地址
            </button>
          </view>
          <view class="flex flex-col justify-center items-center shadow-md bg-white m2">
            <a class="i-carbon-phone-voice text-center text-xl" />
            <button class="icon-btn text-sm" open-type="contact" show-message-card session-from send-message-path send-message-title send-message-img>
              客服咨询
            </button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<style>
  .icon-btn {
    border-radius: 20px;
    background-color: #fff;
    border: 1px solid #ddd;
    box-sizing: border-box;
    border: none !important;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  .icon-btn::after {
    border: none !important;
  }
</style>

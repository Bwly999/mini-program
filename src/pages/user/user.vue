<script lang="ts">
import { reactive, ref, toRefs } from 'vue'
import { isDark, toggleDark } from '@/composables'
export default {
  setup() {
    const single = ref<string>('')
    const change = (e: string) => {
      single.value = e
      console.log('-change事件:', e)
    }

    const url = ref<string>('https://staging-cn.vuejs.org/api/composition-api-setup.html#basic-usage')
    function getMessage(event) {
      console.log(typeof event)
      uni.showModal({
        content: JSON.stringify(event.detail),
        showCancel: false,
      })
    }
    const mapData = reactive({
      title: 'map',
      latitude: 39.909,
      longitude: 116.39742,
      covers: [],
    })

    function login() {
      uni.login({
        provider: 'weixin',
        success: (res) => {
          console.log(res)
          console.log(res.authResult)
          // 获取用户信息
          uni.getUserInfo({
            provider: 'weixin',
            success(infoRes) {
              console.log(infoRes)
              console.log(`用户昵称为：${infoRes.userInfo.nickName}`)
            },
          })
        },
        fail: (err) => {
          console.log(err)
        },
      })
    }
    return {
      change, single, url, getMessage, ...toRefs(mapData), login,
    }
  },
//   methods: {
//     toggleDark() {
//       toggleDark()
//     },
//   },
}
</script>
<template>
  <view>
    <button>rrr{{ isDark }}</button>
    <web-view src="https://player.bilibili.com/player.html?aid=416605084&bvid=BV13V411i7B7&cid=293227595&page=1" />
    <input>
    <view text-xl mt-6 inline-flex gap-2>
      <button class="icon-btn outline-none inline-flex" @click="toggleDark()">
        <div class="i-carbon-moon" />
        <div class="i-carbon-sun" />
      </button>
      <uni-link
        title="GitHub"
        href="https://github.com/antfu/vitesse-lite"
      >
        <a
          class="icon-btn i-carbon-logo-github"
        />
      </uni-link>
    </view>
    <view class="example-body">
      <uni-datetime-picker
        type="date"
        :value="single"
        start="2022-3-20"
        end="2022-6-20"
        @change="change"
      />
      <a> {{ single }}, {{ typeof single }}</a>
    </view>
    <view>
      <page-head :title="title" />
      <view class="uni-common-mt">
        <view>
          <map :latitude="latitude" :longitude="longitude" :markers="covers" />
        </view>
      </view>
    </view>
    <button class="rounded-xl bg-gray-500" @click="login">
      登录
    </button>
    about user
  </view>
</template>

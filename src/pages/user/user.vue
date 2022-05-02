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
      covers: [{
        id: 1,
        latitude: 39.9085,
        longitude: 116.39747,
        // #ifdef APP-PLUS
        iconPath: '../../../static/app-plus/location@3x.png',
        // #endif
        // #ifndef APP-PLUS
        iconPath: '../../../static/location.png',
        // #endif
      }, {
        id: 2,
        latitude: 39.90,
        longitude: 116.39,
        // #ifdef APP-PLUS
        iconPath: '../../../static/app-plus/location@3x.png',
        // #endif
        // #ifndef APP-PLUS
        iconPath: '../../../static/location.png',
        // #endif
      }],
    })
    return {
      change, single, url, getMessage, ...toRefs(mapData),
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
    about user
  </view>
</template>

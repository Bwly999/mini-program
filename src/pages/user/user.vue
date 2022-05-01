<script lang="ts">
import { isDark, toggleDark } from '@/composables'
console.log(isDark)
</script>
<template>
  <view>
    <button>rrr{{ isDark }}</button>
    <input>
    <view text-xl mt-6 inline-flex gap-2>
      <button class="icon-btn outline-none" @click="toggleDark()">
        <div class="i-carbon-moon" />
        <div i-carbon-sun />
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
    <div class="icon-huifu">
      dads
    </div>
    about user
  </view>
</template>

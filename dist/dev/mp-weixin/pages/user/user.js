"use strict";
var common_vendor = require("../../common/vendor.js");
var composables_dark = require("../../composables/dark.js");
console.log(composables_dark.isDark);
const _sfc_main = {};
if (!Array) {
  const _easycom_uni_link2 = common_vendor.resolveComponent("uni-link");
  _easycom_uni_link2();
}
const _easycom_uni_link = () => "../../uni_modules/uni-link/components/uni-link/uni-link.js";
if (!Math) {
  _easycom_uni_link();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t(_ctx.isDark),
    b: common_vendor.o(($event) => _ctx.toggleDark()),
    c: common_vendor.p({
      title: "GitHub",
      href: "https://github.com/antfu/vitesse-lite"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/vueProjects/my-vue3-project/src/pages/user/user.vue"]]);
wx.createPage(MiniProgramPage);

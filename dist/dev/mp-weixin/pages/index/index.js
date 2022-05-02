"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      swiperCurrent: 0,
      swiperLength: 0,
      carouselList: [],
      goodsList: []
    };
  },
  onShow() {
    this.loadData();
  },
  methods: {
    async loadData() {
    },
    swiperChange(e) {
      const index = e.detail.current;
      this.swiperCurrent = index;
    },
    navToDetailPage(item) {
      const id = item.title;
      common_vendor.index.navigateTo({
        url: `/pages/product/product?id=${id}`
      });
    }
  }
};
if (!Array) {
  const _component_u_search = common_vendor.resolveComponent("u-search");
  _component_u_search();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(_ctx.goSearch),
    b: common_vendor.o(($event) => _ctx.kw = $event),
    c: common_vendor.p({
      placeholder: "\u8F93\u5165\u5173\u952E\u8BCD\u641C\u7D22",
      ["show-action"]: false,
      disabled: true,
      modelValue: _ctx.kw
    }),
    d: common_vendor.s(_ctx.menuButtonInfoStyle),
    e: common_vendor.s(_ctx.headerMarginTopStyle),
    f: common_vendor.f(100, (v, i, i0) => {
      return {
        a: common_vendor.t(v),
        b: i
      };
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/vueProjects/my-vue3-project/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);

"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  setup() {
    const single = common_vendor.ref("");
    const change = (e) => {
      single.value = e;
      console.log("-change\u4E8B\u4EF6:", e);
    };
    const url = common_vendor.ref("https://staging-cn.vuejs.org/api/composition-api-setup.html#basic-usage");
    function getMessage(event) {
      console.log(typeof event);
      common_vendor.index.showModal({
        content: JSON.stringify(event.detail),
        showCancel: false
      });
    }
    const mapData = common_vendor.reactive({
      title: "map",
      latitude: 39.909,
      longitude: 116.39742,
      covers: [{
        id: 1,
        latitude: 39.9085,
        longitude: 116.39747,
        iconPath: "../../../static/location.png"
      }, {
        id: 2,
        latitude: 39.9,
        longitude: 116.39,
        iconPath: "../../../static/location.png"
      }]
    });
    return __spreadValues({
      change,
      single,
      url,
      getMessage
    }, common_vendor.toRefs(mapData));
  }
};
if (!Array) {
  const _easycom_uni_link2 = common_vendor.resolveComponent("uni-link");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _component_page_head = common_vendor.resolveComponent("page-head");
  (_easycom_uni_link2 + _easycom_uni_datetime_picker2 + _component_page_head)();
}
const _easycom_uni_link = () => "../../uni_modules/uni-link/components/uni-link/uni-link.js";
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
if (!Math) {
  (_easycom_uni_link + _easycom_uni_datetime_picker)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t(_ctx.isDark),
    b: common_vendor.o(($event) => _ctx.toggleDark()),
    c: common_vendor.p({
      title: "GitHub",
      href: "https://github.com/antfu/vitesse-lite"
    }),
    d: common_vendor.o($setup.change),
    e: common_vendor.p({
      type: "date",
      value: $setup.single,
      start: "2022-3-20",
      end: "2022-6-20"
    }),
    f: common_vendor.t($setup.single),
    g: common_vendor.t(typeof $setup.single),
    h: common_vendor.p({
      title: _ctx.title
    }),
    i: _ctx.latitude,
    j: _ctx.longitude,
    k: _ctx.covers
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/vueProjects/my-vue3-project/src/pages/user/user.vue"]]);
wx.createPage(MiniProgramPage);

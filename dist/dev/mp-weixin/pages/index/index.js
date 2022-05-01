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
  const _component_u_sticky = common_vendor.resolveComponent("u-sticky");
  const _component_u_cell = common_vendor.resolveComponent("u-cell");
  const _component_u_swiper = common_vendor.resolveComponent("u-swiper");
  const _component_u_notice_bar = common_vendor.resolveComponent("u-notice-bar");
  const _component_u__image = common_vendor.resolveComponent("u--image");
  const _component_u_line = common_vendor.resolveComponent("u-line");
  const _component_u_tag = common_vendor.resolveComponent("u-tag");
  const _component_u__text = common_vendor.resolveComponent("u--text");
  const _component_u_line_progress = common_vendor.resolveComponent("u-line-progress");
  const _component_u_button = common_vendor.resolveComponent("u-button");
  const _component_u_icon = common_vendor.resolveComponent("u-icon");
  const _component_u_overlay = common_vendor.resolveComponent("u-overlay");
  (_component_u_search + _component_u_sticky + _component_u_cell + _component_u_swiper + _component_u_notice_bar + _component_u__image + _component_u_line + _component_u_tag + _component_u__text + _component_u_line_progress + _component_u_button + _component_u_icon + _component_u_overlay)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t(_ctx.sysconfigMap.mallName),
    b: common_vendor.o(_ctx.goSearch),
    c: common_vendor.o(($event) => _ctx.kw = $event),
    d: common_vendor.p({
      placeholder: "\u8F93\u5165\u5173\u952E\u8BCD\u641C\u7D22",
      ["show-action"]: false,
      disabled: true,
      modelValue: _ctx.kw
    }),
    e: common_vendor.s(_ctx.menuButtonInfoStyle),
    f: common_vendor.s(_ctx.headerMarginTopStyle),
    g: common_vendor.p({
      ["bg-color"]: "#FFFFFF",
      ["custom-nav-height"]: "0"
    }),
    h: _ctx.shopInfo
  }, _ctx.shopInfo ? {
    i: common_vendor.p({
      icon: "map",
      title: _ctx.shopInfo.name,
      value: "\u5207\u6362\u95E8\u5E97",
      url: "/pages/shop/select",
      clickable: true,
      ["is-link"]: true
    })
  } : {}, {
    j: _ctx.banners
  }, _ctx.banners ? {
    k: common_vendor.o(_ctx.tapBanner),
    l: common_vendor.p({
      list: _ctx.banners,
      indicator: true,
      circular: true,
      ["key-name"]: "picUrl",
      height: "375rpx"
    })
  } : {}, {
    m: _ctx.goodsDynamic
  }, _ctx.goodsDynamic ? {
    n: common_vendor.o(_ctx.noticeclick),
    o: common_vendor.p({
      icon: "bag",
      text: _ctx.goodsDynamic,
      direction: "column",
      mode: "link",
      ["disable-touch"]: false
    })
  } : {}, {
    p: _ctx.categories && _ctx.categories.length > 0
  }, _ctx.categories && _ctx.categories.length > 0 ? {} : {}, {
    q: _ctx.notice
  }, _ctx.notice ? {
    r: common_vendor.p({
      icon: "volume",
      text: _ctx.notice.title,
      mode: "link",
      url: "/pages/notice/list"
    })
  } : {}, {
    s: _ctx.adPosition["index-live-pic"]
  }, _ctx.adPosition["index-live-pic"] ? {
    t: common_vendor.o(($event) => _ctx.goUrl(_ctx.adPosition["index-live-pic"].url)),
    v: common_vendor.p({
      ["show-loading"]: true,
      src: _ctx.adPosition["index-live-pic"].val,
      width: "100vw",
      height: "auto",
      radius: "32rpx",
      mode: "widthFix"
    })
  } : {}, {
    w: _ctx.miaoshaGoods
  }, _ctx.miaoshaGoods ? {
    x: common_vendor.f(_ctx.miaoshaGoods, (item, index, i0) => {
      return {
        a: item.pic,
        b: common_vendor.o(($event) => _ctx.goDetail(item)),
        c: common_vendor.t(item.name),
        d: common_vendor.o(($event) => _ctx.goDetail(item)),
        e: common_vendor.t(item.minPrice),
        f: common_vendor.t(item.originalPrice),
        g: index
      };
    }),
    y: common_vendor.o((...args) => _ctx.toDetailsTap && _ctx.toDetailsTap(...args))
  } : {}, {
    z: _ctx.goodsRecommend
  }, _ctx.goodsRecommend ? {
    A: common_vendor.f(_ctx.goodsRecommend, (item, index, i0) => {
      return common_vendor.e({
        a: item.pic,
        b: common_vendor.o(($event) => _ctx.goDetail(item)),
        c: item.supplyType == "vop_jd" || item.supplyType == "jdJoycityPoints"
      }, item.supplyType == "vop_jd" || item.supplyType == "jdJoycityPoints" ? {
        d: "6d40b2e0-11-" + i0,
        e: common_vendor.p({
          text: "\u4EAC\u4E1C\u81EA\u8425",
          ["bg-color"]: "#e64340",
          ["border-color"]: "#e64340",
          size: "mini"
        })
      } : {}, {
        f: common_vendor.t(item.name),
        g: common_vendor.o(($event) => _ctx.goDetail(item)),
        h: item.characteristic
      }, item.characteristic ? {
        i: "6d40b2e0-12-" + i0,
        j: common_vendor.p({
          text: item.characteristic,
          size: "28rpx",
          color: "#c95060"
        })
      } : {}, {
        k: item.minPrice
      }, item.minPrice ? {
        l: common_vendor.t(item.minPrice)
      } : {}, {
        m: item.minScore
      }, item.minScore ? {
        n: common_vendor.t(item.minScore)
      } : {}, {
        o: index
      });
    })
  } : {}, {
    B: _ctx.kanjiaList
  }, _ctx.kanjiaList ? {
    C: common_vendor.f(_ctx.kanjiaList, (item, index, i0) => {
      return common_vendor.e({
        a: item.pic,
        b: common_vendor.o(($event) => _ctx.goDetail(item)),
        c: common_vendor.t(item.name),
        d: common_vendor.o(($event) => _ctx.goDetail(item)),
        e: item.characteristic
      }, item.characteristic ? {
        f: "6d40b2e0-15-" + i0,
        g: common_vendor.p({
          text: item.characteristic,
          size: "28rpx",
          color: "#c95060"
        })
      } : {}, {
        h: "6d40b2e0-16-" + i0,
        i: common_vendor.p({
          percentage: item.process,
          ["active-color"]: "#ff0000"
        }),
        j: common_vendor.t(item.kanjiaPrice),
        k: common_vendor.t(item.minPrice),
        l: common_vendor.o(($event) => _ctx.goDetail(item)),
        m: "6d40b2e0-17-" + i0,
        n: index
      });
    }),
    D: common_vendor.p({
      type: "error",
      size: "mini",
      plain: true,
      text: "\u6211\u8981\u780D\u4EF7"
    }),
    E: common_vendor.o((...args) => _ctx.toDetailsTap && _ctx.toDetailsTap(...args))
  } : {}, {
    F: _ctx.pingtuanList
  }, _ctx.pingtuanList ? {
    G: common_vendor.f(_ctx.kanjiaList, (item, index, i0) => {
      return common_vendor.e({
        a: item.pic,
        b: common_vendor.o(($event) => _ctx.goDetail(item)),
        c: common_vendor.t(item.name),
        d: common_vendor.o(($event) => _ctx.goDetail(item)),
        e: item.characteristic
      }, item.characteristic ? {
        f: "6d40b2e0-20-" + i0,
        g: common_vendor.p({
          text: item.characteristic,
          size: "28rpx",
          color: "#c95060"
        })
      } : {}, {
        h: common_vendor.t(item.kanjiaPrice),
        i: common_vendor.t(item.minPrice),
        j: common_vendor.o(($event) => _ctx.goDetail(item)),
        k: "6d40b2e0-21-" + i0,
        l: index
      });
    }),
    H: common_vendor.p({
      type: "success",
      size: "mini",
      text: "\u6211\u8981\u62FC\u56E2"
    }),
    I: common_vendor.o((...args) => _ctx.toDetailsTap && _ctx.toDetailsTap(...args))
  } : {}, {
    J: _ctx.goods
  }, _ctx.goods ? {
    K: common_vendor.f(_ctx.goods, (item, index, i0) => {
      return common_vendor.e({
        a: item.pic,
        b: common_vendor.o(($event) => _ctx.goDetail(item)),
        c: item.supplyType == "vop_jd" || item.supplyType == "jdJoycityPoints"
      }, item.supplyType == "vop_jd" || item.supplyType == "jdJoycityPoints" ? {
        d: "6d40b2e0-24-" + i0,
        e: common_vendor.p({
          text: "\u4EAC\u4E1C\u81EA\u8425",
          ["bg-color"]: "#e64340",
          ["border-color"]: "#e64340",
          size: "mini"
        })
      } : {}, {
        f: common_vendor.t(item.name),
        g: common_vendor.o(($event) => _ctx.goDetail(item)),
        h: item.characteristic
      }, item.characteristic ? {
        i: "6d40b2e0-25-" + i0,
        j: common_vendor.p({
          text: item.characteristic,
          size: "28rpx",
          color: "#c95060"
        })
      } : {}, {
        k: item.minPrice
      }, item.minPrice ? {
        l: common_vendor.t(item.minPrice)
      } : {}, {
        m: item.minScore
      }, item.minScore ? {
        n: common_vendor.t(item.minScore)
      } : {}, {
        o: index
      });
    })
  } : {}, {
    L: common_vendor.o((...args) => _ctx.goCoupons && _ctx.goCoupons(...args)),
    M: _ctx.adPosition["indexPop"]
  }, _ctx.adPosition["indexPop"] ? {
    N: _ctx.adPosition["indexPop"].val,
    O: common_vendor.p({
      name: "close-circle-fill",
      color: "#eee",
      size: "80rpx"
    }),
    P: common_vendor.o(($event) => _ctx.adPositionIndexPop = false),
    Q: common_vendor.o(($event) => _ctx.goUrl(_ctx.adPosition["indexPop"].url)),
    R: common_vendor.p({
      show: _ctx.adPositionIndexPop
    })
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/vueProjects/my-vue3-project/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);

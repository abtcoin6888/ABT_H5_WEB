import {
  __commonJS
} from "./chunk-35XAPQLS.js";

// ../../../../../../Users/jack/Documents/mobile/node_modules/vant/lib/utils/basic.js
var require_basic = __commonJS({
  "../../../../../../Users/jack/Documents/mobile/node_modules/vant/lib/utils/basic.js"(exports, module) {
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
    var stdin_exports = {};
    __export(stdin_exports, {
      extend: () => extend,
      flat: () => flat,
      get: () => get,
      inBrowser: () => inBrowser,
      isDate: () => isDate,
      isDef: () => isDef,
      isFunction: () => isFunction,
      isIOS: () => isIOS,
      isMobile: () => isMobile,
      isNumeric: () => isNumeric,
      isObject: () => isObject,
      isPromise: () => isPromise,
      isSameValue: () => isSameValue,
      noop: () => noop,
      pick: () => pick,
      toArray: () => toArray
    });
    module.exports = __toCommonJS(stdin_exports);
    function noop() {
    }
    var extend = Object.assign;
    var inBrowser = typeof window !== "undefined";
    var isObject = (val) => val !== null && typeof val === "object";
    var isDef = (val) => val !== void 0 && val !== null;
    var isFunction = (val) => typeof val === "function";
    var isPromise = (val) => isObject(val) && isFunction(val.then) && isFunction(val.catch);
    var isDate = (val) => Object.prototype.toString.call(val) === "[object Date]" && !Number.isNaN(val.getTime());
    function isMobile(value) {
      value = value.replace(/[^-|\d]/g, "");
      return /^((\+86)|(86))?(1)\d{10}$/.test(value) || /^0[0-9-]{10,13}$/.test(value);
    }
    var isNumeric = (val) => typeof val === "number" || /^\d+(\.\d+)?$/.test(val);
    var isIOS = () => inBrowser ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) : false;
    function get(object, path) {
      const keys = path.split(".");
      let result = object;
      keys.forEach((key) => {
        var _a;
        result = isObject(result) ? (_a = result[key]) != null ? _a : "" : "";
      });
      return result;
    }
    function pick(obj, keys, ignoreUndefined) {
      return keys.reduce(
        (ret, key) => {
          if (!ignoreUndefined || obj[key] !== void 0) {
            ret[key] = obj[key];
          }
          return ret;
        },
        {}
      );
    }
    var isSameValue = (newValue, oldValue) => JSON.stringify(newValue) === JSON.stringify(oldValue);
    var toArray = (item) => Array.isArray(item) ? item : [item];
    var flat = (arr) => arr.reduce((acc, val) => acc.concat(val), []);
  }
});

// ../../../../../../Users/jack/Documents/mobile/node_modules/vant/lib/utils/props.js
var require_props = __commonJS({
  "../../../../../../Users/jack/Documents/mobile/node_modules/vant/lib/utils/props.js"(exports, module) {
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
    var stdin_exports = {};
    __export(stdin_exports, {
      makeArrayProp: () => makeArrayProp,
      makeNumberProp: () => makeNumberProp,
      makeNumericProp: () => makeNumericProp,
      makeRequiredProp: () => makeRequiredProp,
      makeStringProp: () => makeStringProp,
      numericProp: () => numericProp,
      truthProp: () => truthProp,
      unknownProp: () => unknownProp
    });
    module.exports = __toCommonJS(stdin_exports);
    var unknownProp = null;
    var numericProp = [Number, String];
    var truthProp = {
      type: Boolean,
      default: true
    };
    var makeRequiredProp = (type) => ({
      type,
      required: true
    });
    var makeArrayProp = () => ({
      type: Array,
      default: () => []
    });
    var makeNumberProp = (defaultVal) => ({
      type: Number,
      default: defaultVal
    });
    var makeNumericProp = (defaultVal) => ({
      type: numericProp,
      default: defaultVal
    });
    var makeStringProp = (defaultVal) => ({
      type: String,
      default: defaultVal
    });
  }
});

// vite:cjs-external-facade:vue
import * as m from "vue";
var require_vue = __commonJS({
  "vite:cjs-external-facade:vue"(exports, module) {
    module.exports = m;
  }
});

// ../../../../../../Users/jack/Documents/mobile/node_modules/@vant/use/dist/index.cjs.js
var require_index_cjs = __commonJS({
  "../../../../../../Users/jack/Documents/mobile/node_modules/@vant/use/dist/index.cjs.js"(exports, module) {
    "use strict";
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
    var src_exports = {};
    __export(src_exports, {
      CUSTOM_FIELD_INJECTION_KEY: () => CUSTOM_FIELD_INJECTION_KEY,
      cancelRaf: () => cancelRaf,
      doubleRaf: () => doubleRaf,
      flattenVNodes: () => flattenVNodes,
      getScrollParent: () => getScrollParent,
      inBrowser: () => inBrowser,
      onMountedOrActivated: () => onMountedOrActivated,
      raf: () => raf,
      sortChildren: () => sortChildren,
      supportsPassive: () => supportsPassive,
      useChildren: () => useChildren,
      useClickAway: () => useClickAway,
      useCountDown: () => useCountDown,
      useCustomFieldValue: () => useCustomFieldValue,
      useEventListener: () => useEventListener,
      usePageVisibility: () => usePageVisibility,
      useParent: () => useParent,
      useRaf: () => useRaf,
      useRect: () => useRect,
      useScrollParent: () => useScrollParent,
      useToggle: () => useToggle,
      useWindowSize: () => useWindowSize
    });
    module.exports = __toCommonJS(src_exports);
    var inBrowser = typeof window !== "undefined";
    var supportsPassive = true;
    function raf(fn) {
      return inBrowser ? requestAnimationFrame(fn) : -1;
    }
    function cancelRaf(id) {
      if (inBrowser) {
        cancelAnimationFrame(id);
      }
    }
    function doubleRaf(fn) {
      raf(() => raf(fn));
    }
    var import_vue = require_vue();
    var isWindow = (val) => val === window;
    var makeDOMRect = (width2, height2) => ({
      top: 0,
      left: 0,
      right: width2,
      bottom: height2,
      width: width2,
      height: height2
    });
    var useRect = (elementOrRef) => {
      const element = (0, import_vue.unref)(elementOrRef);
      if (isWindow(element)) {
        const width2 = element.innerWidth;
        const height2 = element.innerHeight;
        return makeDOMRect(width2, height2);
      }
      if (element == null ? void 0 : element.getBoundingClientRect) {
        return element.getBoundingClientRect();
      }
      return makeDOMRect(0, 0);
    };
    var import_vue2 = require_vue();
    function useToggle(defaultValue = false) {
      const state = (0, import_vue2.ref)(defaultValue);
      const toggle = (value = !state.value) => {
        state.value = value;
      };
      return [state, toggle];
    }
    var import_vue3 = require_vue();
    function useParent(key) {
      const parent = (0, import_vue3.inject)(key, null);
      if (parent) {
        const instance = (0, import_vue3.getCurrentInstance)();
        const { link, unlink, internalChildren } = parent;
        link(instance);
        (0, import_vue3.onUnmounted)(() => unlink(instance));
        const index = (0, import_vue3.computed)(() => internalChildren.indexOf(instance));
        return {
          parent,
          index
        };
      }
      return {
        parent: null,
        index: (0, import_vue3.ref)(-1)
      };
    }
    var import_vue4 = require_vue();
    function flattenVNodes(children) {
      const result = [];
      const traverse = (children2) => {
        if (Array.isArray(children2)) {
          children2.forEach((child) => {
            var _a;
            if ((0, import_vue4.isVNode)(child)) {
              result.push(child);
              if ((_a = child.component) == null ? void 0 : _a.subTree) {
                result.push(child.component.subTree);
                traverse(child.component.subTree.children);
              }
              if (child.children) {
                traverse(child.children);
              }
            }
          });
        }
      };
      traverse(children);
      return result;
    }
    var findVNodeIndex = (vnodes, vnode) => {
      const index = vnodes.indexOf(vnode);
      if (index === -1) {
        return vnodes.findIndex(
          (item) => vnode.key !== void 0 && vnode.key !== null && item.type === vnode.type && item.key === vnode.key
        );
      }
      return index;
    };
    function sortChildren(parent, publicChildren, internalChildren) {
      const vnodes = flattenVNodes(parent.subTree.children);
      internalChildren.sort(
        (a, b) => findVNodeIndex(vnodes, a.vnode) - findVNodeIndex(vnodes, b.vnode)
      );
      const orderedPublicChildren = internalChildren.map((item) => item.proxy);
      publicChildren.sort((a, b) => {
        const indexA = orderedPublicChildren.indexOf(a);
        const indexB = orderedPublicChildren.indexOf(b);
        return indexA - indexB;
      });
    }
    function useChildren(key) {
      const publicChildren = (0, import_vue4.reactive)([]);
      const internalChildren = (0, import_vue4.reactive)([]);
      const parent = (0, import_vue4.getCurrentInstance)();
      const linkChildren = (value) => {
        const link = (child) => {
          if (child.proxy) {
            internalChildren.push(child);
            publicChildren.push(child.proxy);
            sortChildren(parent, publicChildren, internalChildren);
          }
        };
        const unlink = (child) => {
          const index = internalChildren.indexOf(child);
          publicChildren.splice(index, 1);
          internalChildren.splice(index, 1);
        };
        (0, import_vue4.provide)(
          key,
          Object.assign(
            {
              link,
              unlink,
              children: publicChildren,
              internalChildren
            },
            value
          )
        );
      };
      return {
        children: publicChildren,
        linkChildren
      };
    }
    var import_vue5 = require_vue();
    var SECOND = 1e3;
    var MINUTE = 60 * SECOND;
    var HOUR = 60 * MINUTE;
    var DAY = 24 * HOUR;
    function parseTime(time) {
      const days = Math.floor(time / DAY);
      const hours = Math.floor(time % DAY / HOUR);
      const minutes = Math.floor(time % HOUR / MINUTE);
      const seconds = Math.floor(time % MINUTE / SECOND);
      const milliseconds = Math.floor(time % SECOND);
      return {
        total: time,
        days,
        hours,
        minutes,
        seconds,
        milliseconds
      };
    }
    function isSameSecond(time1, time2) {
      return Math.floor(time1 / 1e3) === Math.floor(time2 / 1e3);
    }
    function useCountDown(options) {
      let rafId;
      let endTime;
      let counting;
      let deactivated;
      const remain = (0, import_vue5.ref)(options.time);
      const current = (0, import_vue5.computed)(() => parseTime(remain.value));
      const pause = () => {
        counting = false;
        cancelRaf(rafId);
      };
      const getCurrentRemain = () => Math.max(endTime - Date.now(), 0);
      const setRemain = (value) => {
        var _a, _b;
        remain.value = value;
        (_a = options.onChange) == null ? void 0 : _a.call(options, current.value);
        if (value === 0) {
          pause();
          (_b = options.onFinish) == null ? void 0 : _b.call(options);
        }
      };
      const microTick = () => {
        rafId = raf(() => {
          if (counting) {
            setRemain(getCurrentRemain());
            if (remain.value > 0) {
              microTick();
            }
          }
        });
      };
      const macroTick = () => {
        rafId = raf(() => {
          if (counting) {
            const remainRemain = getCurrentRemain();
            if (!isSameSecond(remainRemain, remain.value) || remainRemain === 0) {
              setRemain(remainRemain);
            }
            if (remain.value > 0) {
              macroTick();
            }
          }
        });
      };
      const tick = () => {
        if (!inBrowser) {
          return;
        }
        if (options.millisecond) {
          microTick();
        } else {
          macroTick();
        }
      };
      const start = () => {
        if (!counting) {
          endTime = Date.now() + remain.value;
          counting = true;
          tick();
        }
      };
      const reset = (totalTime = options.time) => {
        pause();
        remain.value = totalTime;
      };
      (0, import_vue5.onBeforeUnmount)(pause);
      (0, import_vue5.onActivated)(() => {
        if (deactivated) {
          counting = true;
          deactivated = false;
          tick();
        }
      });
      (0, import_vue5.onDeactivated)(() => {
        if (counting) {
          pause();
          deactivated = true;
        }
      });
      return {
        start,
        pause,
        reset,
        current
      };
    }
    var import_vue8 = require_vue();
    var import_vue7 = require_vue();
    var import_vue6 = require_vue();
    function onMountedOrActivated(hook) {
      let mounted;
      (0, import_vue6.onMounted)(() => {
        hook();
        (0, import_vue6.nextTick)(() => {
          mounted = true;
        });
      });
      (0, import_vue6.onActivated)(() => {
        if (mounted) {
          hook();
        }
      });
    }
    function useEventListener(type, listener, options = {}) {
      if (!inBrowser) {
        return;
      }
      const { target = window, passive = false, capture = false } = options;
      let cleaned = false;
      let attached;
      const add = (target2) => {
        if (cleaned) {
          return;
        }
        const element = (0, import_vue7.unref)(target2);
        if (element && !attached) {
          element.addEventListener(type, listener, {
            capture,
            passive
          });
          attached = true;
        }
      };
      const remove = (target2) => {
        if (cleaned) {
          return;
        }
        const element = (0, import_vue7.unref)(target2);
        if (element && attached) {
          element.removeEventListener(type, listener, capture);
          attached = false;
        }
      };
      (0, import_vue7.onUnmounted)(() => remove(target));
      (0, import_vue7.onDeactivated)(() => remove(target));
      onMountedOrActivated(() => add(target));
      let stopWatch;
      if ((0, import_vue7.isRef)(target)) {
        stopWatch = (0, import_vue7.watch)(target, (val, oldVal) => {
          remove(oldVal);
          add(val);
        });
      }
      return () => {
        stopWatch == null ? void 0 : stopWatch();
        remove(target);
        cleaned = true;
      };
    }
    function useClickAway(target, listener, options = {}) {
      if (!inBrowser) {
        return;
      }
      const { eventName = "click" } = options;
      const onClick = (event) => {
        const targets = Array.isArray(target) ? target : [target];
        const isClickAway = targets.every((item) => {
          const element = (0, import_vue8.unref)(item);
          return element && !element.contains(event.target);
        });
        if (isClickAway) {
          listener(event);
        }
      };
      useEventListener(eventName, onClick, { target: document });
    }
    var import_vue9 = require_vue();
    var width;
    var height;
    function useWindowSize() {
      if (!width) {
        width = (0, import_vue9.ref)(0);
        height = (0, import_vue9.ref)(0);
        if (inBrowser) {
          const update = () => {
            width.value = window.innerWidth;
            height.value = window.innerHeight;
          };
          update();
          window.addEventListener("resize", update, { passive: true });
          window.addEventListener("orientationchange", update, { passive: true });
        }
      }
      return { width, height };
    }
    var import_vue10 = require_vue();
    var overflowScrollReg = /scroll|auto|overlay/i;
    var defaultRoot = inBrowser ? window : void 0;
    function isElement(node) {
      const ELEMENT_NODE_TYPE = 1;
      return node.tagName !== "HTML" && node.tagName !== "BODY" && node.nodeType === ELEMENT_NODE_TYPE;
    }
    function getScrollParent(el, root = defaultRoot) {
      let node = el;
      while (node && node !== root && isElement(node)) {
        const { overflowY } = window.getComputedStyle(node);
        if (overflowScrollReg.test(overflowY)) {
          return node;
        }
        node = node.parentNode;
      }
      return root;
    }
    function useScrollParent(el, root = defaultRoot) {
      const scrollParent = (0, import_vue10.ref)();
      (0, import_vue10.onMounted)(() => {
        if (el.value) {
          scrollParent.value = getScrollParent(el.value, root);
        }
      });
      return scrollParent;
    }
    var import_vue11 = require_vue();
    var visibility;
    function usePageVisibility() {
      if (!visibility) {
        visibility = (0, import_vue11.ref)("visible");
        if (inBrowser) {
          const update = () => {
            visibility.value = document.hidden ? "hidden" : "visible";
          };
          update();
          window.addEventListener("visibilitychange", update);
        }
      }
      return visibility;
    }
    var import_vue12 = require_vue();
    var CUSTOM_FIELD_INJECTION_KEY = Symbol("van-field");
    function useCustomFieldValue(customValue) {
      const field = (0, import_vue12.inject)(CUSTOM_FIELD_INJECTION_KEY, null);
      if (field && !field.customValue.value) {
        field.customValue.value = customValue;
        (0, import_vue12.watch)(customValue, () => {
          field.resetValidation();
          field.validateWithTrigger("onChange");
        });
      }
    }
    function useRaf(fn, options) {
      if (inBrowser) {
        const { interval = 0, isLoop = false } = options || {};
        let start;
        let isStopped = false;
        let rafId;
        const stop = () => {
          isStopped = true;
          cancelAnimationFrame(rafId);
        };
        const frameWrapper = (timestamp) => {
          if (isStopped)
            return;
          if (start === void 0) {
            start = timestamp;
          } else if (timestamp - start > interval) {
            fn(timestamp);
            start = timestamp;
            if (!isLoop) {
              stop();
              return;
            }
          }
          rafId = requestAnimationFrame(frameWrapper);
        };
        rafId = requestAnimationFrame(frameWrapper);
        return stop;
      }
      return () => {
      };
    }
  }
});

// ../../../../../../Users/jack/Documents/mobile/node_modules/vant/lib/utils/dom.js
var require_dom = __commonJS({
  "../../../../../../Users/jack/Documents/mobile/node_modules/vant/lib/utils/dom.js"(exports, module) {
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
    var stdin_exports = {};
    __export(stdin_exports, {
      getContainingBlock: () => getContainingBlock,
      getElementTop: () => getElementTop,
      getRootScrollTop: () => getRootScrollTop,
      getScrollTop: () => getScrollTop,
      isHidden: () => isHidden,
      preventDefault: () => preventDefault,
      resetScroll: () => resetScroll,
      setRootScrollTop: () => setRootScrollTop,
      setScrollTop: () => setScrollTop,
      stopPropagation: () => stopPropagation,
      windowHeight: () => windowHeight,
      windowWidth: () => windowWidth
    });
    module.exports = __toCommonJS(stdin_exports);
    var import_use = require_index_cjs();
    var import_vue = require_vue();
    var import_basic = require_basic();
    function getScrollTop(el) {
      const top = "scrollTop" in el ? el.scrollTop : el.pageYOffset;
      return Math.max(top, 0);
    }
    function setScrollTop(el, value) {
      if ("scrollTop" in el) {
        el.scrollTop = value;
      } else {
        el.scrollTo(el.scrollX, value);
      }
    }
    function getRootScrollTop() {
      return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    }
    function setRootScrollTop(value) {
      setScrollTop(window, value);
      setScrollTop(document.body, value);
    }
    function getElementTop(el, scroller) {
      if (el === window) {
        return 0;
      }
      const scrollTop = scroller ? getScrollTop(scroller) : getRootScrollTop();
      return (0, import_use.useRect)(el).top + scrollTop;
    }
    var isIOS = (0, import_basic.isIOS)();
    function resetScroll() {
      if (isIOS) {
        setRootScrollTop(getRootScrollTop());
      }
    }
    var stopPropagation = (event) => event.stopPropagation();
    function preventDefault(event, isStopPropagation) {
      if (typeof event.cancelable !== "boolean" || event.cancelable) {
        event.preventDefault();
      }
      if (isStopPropagation) {
        stopPropagation(event);
      }
    }
    function isHidden(elementRef) {
      const el = (0, import_vue.unref)(elementRef);
      if (!el) {
        return false;
      }
      const style = window.getComputedStyle(el);
      const hidden = style.display === "none";
      const parentHidden = el.offsetParent === null && style.position !== "fixed";
      return hidden || parentHidden;
    }
    var { width: windowWidth, height: windowHeight } = (0, import_use.useWindowSize)();
    function isContainingBlock(el) {
      const css = window.getComputedStyle(el);
      return css.transform !== "none" || css.perspective !== "none" || ["transform", "perspective", "filter"].some(
        (value) => (css.willChange || "").includes(value)
      );
    }
    function getContainingBlock(el) {
      let node = el.parentElement;
      while (node) {
        if (node && node.tagName !== "HTML" && node.tagName !== "BODY" && isContainingBlock(node)) {
          return node;
        }
        node = node.parentElement;
      }
      return null;
    }
  }
});

// ../../../../../../Users/jack/Documents/mobile/node_modules/vant/lib/utils/format.js
var require_format = __commonJS({
  "../../../../../../Users/jack/Documents/mobile/node_modules/vant/lib/utils/format.js"(exports, module) {
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
    var stdin_exports = {};
    __export(stdin_exports, {
      addNumber: () => addNumber,
      addUnit: () => addUnit,
      camelize: () => camelize,
      clamp: () => clamp,
      formatNumber: () => formatNumber,
      getSizeStyle: () => getSizeStyle,
      getZIndexStyle: () => getZIndexStyle,
      kebabCase: () => kebabCase,
      padZero: () => padZero,
      unitToPx: () => unitToPx
    });
    module.exports = __toCommonJS(stdin_exports);
    var import_basic = require_basic();
    var import_dom = require_dom();
    var import_basic2 = require_basic();
    function addUnit(value) {
      if ((0, import_basic2.isDef)(value)) {
        return (0, import_basic2.isNumeric)(value) ? `${value}px` : String(value);
      }
      return void 0;
    }
    function getSizeStyle(originSize) {
      if ((0, import_basic2.isDef)(originSize)) {
        if (Array.isArray(originSize)) {
          return {
            width: addUnit(originSize[0]),
            height: addUnit(originSize[1])
          };
        }
        const size = addUnit(originSize);
        return {
          width: size,
          height: size
        };
      }
    }
    function getZIndexStyle(zIndex) {
      const style = {};
      if (zIndex !== void 0) {
        style.zIndex = +zIndex;
      }
      return style;
    }
    var rootFontSize;
    function getRootFontSize() {
      if (!rootFontSize) {
        const doc = document.documentElement;
        const fontSize = doc.style.fontSize || window.getComputedStyle(doc).fontSize;
        rootFontSize = parseFloat(fontSize);
      }
      return rootFontSize;
    }
    function convertRem(value) {
      value = value.replace(/rem/g, "");
      return +value * getRootFontSize();
    }
    function convertVw(value) {
      value = value.replace(/vw/g, "");
      return +value * import_dom.windowWidth.value / 100;
    }
    function convertVh(value) {
      value = value.replace(/vh/g, "");
      return +value * import_dom.windowHeight.value / 100;
    }
    function unitToPx(value) {
      if (typeof value === "number") {
        return value;
      }
      if (import_basic.inBrowser) {
        if (value.includes("rem")) {
          return convertRem(value);
        }
        if (value.includes("vw")) {
          return convertVw(value);
        }
        if (value.includes("vh")) {
          return convertVh(value);
        }
      }
      return parseFloat(value);
    }
    var camelizeRE = /-(\w)/g;
    var camelize = (str) => str.replace(camelizeRE, (_, c) => c.toUpperCase());
    var kebabCase = (str) => str.replace(/([A-Z])/g, "-$1").toLowerCase().replace(/^-/, "");
    function padZero(num, targetLength = 2) {
      let str = num + "";
      while (str.length < targetLength) {
        str = "0" + str;
      }
      return str;
    }
    var clamp = (num, min, max) => Math.min(Math.max(num, min), max);
    function trimExtraChar(value, char, regExp) {
      const index = value.indexOf(char);
      if (index === -1) {
        return value;
      }
      if (char === "-" && index !== 0) {
        return value.slice(0, index);
      }
      return value.slice(0, index + 1) + value.slice(index).replace(regExp, "");
    }
    function formatNumber(value, allowDot = true, allowMinus = true) {
      if (allowDot) {
        value = trimExtraChar(value, ".", /\./g);
      } else {
        value = value.split(".")[0];
      }
      if (allowMinus) {
        value = trimExtraChar(value, "-", /-/g);
      } else {
        value = value.replace(/-/, "");
      }
      const regExp = allowDot ? /[^-0-9.]/g : /[^-0-9]/g;
      return value.replace(regExp, "");
    }
    function addNumber(num1, num2) {
      const cardinal = 10 ** 10;
      return Math.round((num1 + num2) * cardinal) / cardinal;
    }
  }
});

// ../../../../../../Users/jack/Documents/mobile/node_modules/vant/lib/utils/deep-assign.js
var require_deep_assign = __commonJS({
  "../../../../../../Users/jack/Documents/mobile/node_modules/vant/lib/utils/deep-assign.js"(exports, module) {
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
    var stdin_exports = {};
    __export(stdin_exports, {
      deepAssign: () => deepAssign
    });
    module.exports = __toCommonJS(stdin_exports);
    var import_basic = require_basic();
    var { hasOwnProperty } = Object.prototype;
    function assignKey(to, from, key) {
      const val = from[key];
      if (!(0, import_basic.isDef)(val)) {
        return;
      }
      if (!hasOwnProperty.call(to, key) || !(0, import_basic.isObject)(val)) {
        to[key] = val;
      } else {
        to[key] = deepAssign(Object(to[key]), val);
      }
    }
    function deepAssign(to, from) {
      Object.keys(from).forEach((key) => {
        assignKey(to, from, key);
      });
      return to;
    }
  }
});

// ../../../../../../Users/jack/Documents/mobile/node_modules/vant/lib/locale/lang/zh-CN.js
var require_zh_CN = __commonJS({
  "../../../../../../Users/jack/Documents/mobile/node_modules/vant/lib/locale/lang/zh-CN.js"(exports, module) {
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
    var stdin_exports = {};
    __export(stdin_exports, {
      default: () => stdin_default
    });
    module.exports = __toCommonJS(stdin_exports);
    var stdin_default = {
      name: "姓名",
      tel: "电话",
      save: "保存",
      clear: "清空",
      cancel: "取消",
      confirm: "确认",
      delete: "删除",
      loading: "加载中...",
      noCoupon: "暂无优惠券",
      nameEmpty: "请填写姓名",
      addContact: "添加联系人",
      telInvalid: "请填写正确的电话",
      vanCalendar: {
        end: "结束",
        start: "开始",
        title: "日期选择",
        weekdays: ["日", "一", "二", "三", "四", "五", "六"],
        monthTitle: (year, month) => `${year}年${month}月`,
        rangePrompt: (maxRange) => `最多选择 ${maxRange} 天`
      },
      vanCascader: {
        select: "请选择"
      },
      vanPagination: {
        prev: "上一页",
        next: "下一页"
      },
      vanPullRefresh: {
        pulling: "下拉即可刷新...",
        loosing: "释放即可刷新..."
      },
      vanSubmitBar: {
        label: "合计:"
      },
      vanCoupon: {
        unlimited: "无门槛",
        discount: (discount) => `${discount}折`,
        condition: (condition) => `满${condition}元可用`
      },
      vanCouponCell: {
        title: "优惠券",
        count: (count) => `${count}张可用`
      },
      vanCouponList: {
        exchange: "兑换",
        close: "不使用",
        enable: "可用",
        disabled: "不可用",
        placeholder: "输入优惠码"
      },
      vanAddressEdit: {
        area: "地区",
        areaEmpty: "请选择地区",
        addressEmpty: "请填写详细地址",
        addressDetail: "详细地址",
        defaultAddress: "设为默认收货地址"
      },
      vanAddressList: {
        add: "新增地址"
      }
    };
  }
});

// ../../../../../../Users/jack/Documents/mobile/node_modules/vant/lib/locale/index.js
var require_locale = __commonJS({
  "../../../../../../Users/jack/Documents/mobile/node_modules/vant/lib/locale/index.js"(exports, module) {
    var __create = Object.create;
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __getProtoOf = Object.getPrototypeOf;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
      mod
    ));
    var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
    var stdin_exports = {};
    __export(stdin_exports, {
      Locale: () => Locale,
      default: () => stdin_default,
      useCurrentLang: () => useCurrentLang
    });
    module.exports = __toCommonJS(stdin_exports);
    var import_vue = require_vue();
    var import_deep_assign = require_deep_assign();
    var import_zh_CN = __toESM(require_zh_CN());
    var lang = (0, import_vue.ref)("zh-CN");
    var messages = (0, import_vue.reactive)({
      "zh-CN": import_zh_CN.default
    });
    var Locale = {
      messages() {
        return messages[lang.value];
      },
      use(newLang, newMessages) {
        lang.value = newLang;
        this.add({ [newLang]: newMessages });
      },
      add(newMessages = {}) {
        (0, import_deep_assign.deepAssign)(messages, newMessages);
      }
    };
    var useCurrentLang = () => lang;
    var stdin_default = Locale;
  }
});

// ../../../../../../Users/jack/Documents/mobile/node_modules/vant/lib/utils/create.js
var require_create = __commonJS({
  "../../../../../../Users/jack/Documents/mobile/node_modules/vant/lib/utils/create.js"(exports, module) {
    var __create = Object.create;
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __getProtoOf = Object.getPrototypeOf;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
      mod
    ));
    var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
    var stdin_exports = {};
    __export(stdin_exports, {
      createBEM: () => createBEM,
      createNamespace: () => createNamespace,
      createTranslate: () => createTranslate
    });
    module.exports = __toCommonJS(stdin_exports);
    var import_basic = require_basic();
    var import_format = require_format();
    var import_locale = __toESM(require_locale());
    function createTranslate(name) {
      const prefix = (0, import_format.camelize)(name) + ".";
      return (path, ...args) => {
        const messages = import_locale.default.messages();
        const message = (0, import_basic.get)(messages, prefix + path) || (0, import_basic.get)(messages, path);
        return (0, import_basic.isFunction)(message) ? message(...args) : message;
      };
    }
    function genBem(name, mods) {
      if (!mods) {
        return "";
      }
      if (typeof mods === "string") {
        return ` ${name}--${mods}`;
      }
      if (Array.isArray(mods)) {
        return mods.reduce(
          (ret, item) => ret + genBem(name, item),
          ""
        );
      }
      return Object.keys(mods).reduce(
        (ret, key) => ret + (mods[key] ? genBem(name, key) : ""),
        ""
      );
    }
    function createBEM(name) {
      return (el, mods) => {
        if (el && typeof el !== "string") {
          mods = el;
          el = "";
        }
        el = el ? `${name}__${el}` : name;
        return `${el}${genBem(el, mods)}`;
      };
    }
    function createNamespace(name) {
      const prefixedName = `van-${name}`;
      return [
        prefixedName,
        createBEM(prefixedName),
        createTranslate(prefixedName)
      ];
    }
  }
});

// ../../../../../../Users/jack/Documents/mobile/node_modules/vant/lib/utils/constant.js
var require_constant = __commonJS({
  "../../../../../../Users/jack/Documents/mobile/node_modules/vant/lib/utils/constant.js"(exports, module) {
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
    var stdin_exports = {};
    __export(stdin_exports, {
      BORDER: () => BORDER,
      BORDER_BOTTOM: () => BORDER_BOTTOM,
      BORDER_LEFT: () => BORDER_LEFT,
      BORDER_RIGHT: () => BORDER_RIGHT,
      BORDER_SURROUND: () => BORDER_SURROUND,
      BORDER_TOP: () => BORDER_TOP,
      BORDER_TOP_BOTTOM: () => BORDER_TOP_BOTTOM,
      BORDER_UNSET_TOP_BOTTOM: () => BORDER_UNSET_TOP_BOTTOM,
      FORM_KEY: () => FORM_KEY,
      HAPTICS_FEEDBACK: () => HAPTICS_FEEDBACK,
      LONG_PRESS_START_TIME: () => LONG_PRESS_START_TIME,
      TAP_OFFSET: () => TAP_OFFSET
    });
    module.exports = __toCommonJS(stdin_exports);
    var BORDER = "van-hairline";
    var BORDER_TOP = `${BORDER}--top`;
    var BORDER_LEFT = `${BORDER}--left`;
    var BORDER_RIGHT = `${BORDER}--right`;
    var BORDER_BOTTOM = `${BORDER}--bottom`;
    var BORDER_SURROUND = `${BORDER}--surround`;
    var BORDER_TOP_BOTTOM = `${BORDER}--top-bottom`;
    var BORDER_UNSET_TOP_BOTTOM = `${BORDER}-unset--top-bottom`;
    var HAPTICS_FEEDBACK = "van-haptics-feedback";
    var FORM_KEY = Symbol("van-form");
    var LONG_PRESS_START_TIME = 500;
    var TAP_OFFSET = 5;
  }
});

// ../../../../../../Users/jack/Documents/mobile/node_modules/vant/lib/utils/interceptor.js
var require_interceptor = __commonJS({
  "../../../../../../Users/jack/Documents/mobile/node_modules/vant/lib/utils/interceptor.js"(exports, module) {
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
    var stdin_exports = {};
    __export(stdin_exports, {
      callInterceptor: () => callInterceptor
    });
    module.exports = __toCommonJS(stdin_exports);
    var import_basic = require_basic();
    function callInterceptor(interceptor, {
      args = [],
      done,
      canceled,
      error
    }) {
      if (interceptor) {
        const returnVal = interceptor.apply(null, args);
        if ((0, import_basic.isPromise)(returnVal)) {
          returnVal.then((value) => {
            if (value) {
              done();
            } else if (canceled) {
              canceled();
            }
          }).catch(error || import_basic.noop);
        } else if (returnVal) {
          done();
        } else if (canceled) {
          canceled();
        }
      } else {
        done();
      }
    }
  }
});

// ../../../../../../Users/jack/Documents/mobile/node_modules/vant/lib/utils/with-install.js
var require_with_install = __commonJS({
  "../../../../../../Users/jack/Documents/mobile/node_modules/vant/lib/utils/with-install.js"(exports, module) {
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
    var stdin_exports = {};
    __export(stdin_exports, {
      withInstall: () => withInstall
    });
    module.exports = __toCommonJS(stdin_exports);
    var import_format = require_format();
    function withInstall(options) {
      options.install = (app) => {
        const { name } = options;
        if (name) {
          app.component(name, options);
          app.component((0, import_format.camelize)(`-${name}`), options);
        }
      };
      return options;
    }
  }
});

// ../../../../../../Users/jack/Documents/mobile/node_modules/vant/lib/utils/closest.js
var require_closest = __commonJS({
  "../../../../../../Users/jack/Documents/mobile/node_modules/vant/lib/utils/closest.js"(exports, module) {
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
    var stdin_exports = {};
    __export(stdin_exports, {
      closest: () => closest
    });
    module.exports = __toCommonJS(stdin_exports);
    function closest(arr, target) {
      return arr.reduce(
        (pre, cur) => Math.abs(pre - target) < Math.abs(cur - target) ? pre : cur
      );
    }
  }
});

// ../../../../../../Users/jack/Documents/mobile/node_modules/vant/lib/utils/index.js
var require_utils = __commonJS({
  "../../../../../../Users/jack/Documents/mobile/node_modules/vant/lib/utils/index.js"(exports, module) {
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
    var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
    var stdin_exports = {};
    module.exports = __toCommonJS(stdin_exports);
    __reExport(stdin_exports, require_basic(), module.exports);
    __reExport(stdin_exports, require_props(), module.exports);
    __reExport(stdin_exports, require_dom(), module.exports);
    __reExport(stdin_exports, require_create(), module.exports);
    __reExport(stdin_exports, require_format(), module.exports);
    __reExport(stdin_exports, require_constant(), module.exports);
    __reExport(stdin_exports, require_interceptor(), module.exports);
    __reExport(stdin_exports, require_with_install(), module.exports);
    __reExport(stdin_exports, require_closest(), module.exports);
  }
});
export default require_utils();
//# sourceMappingURL=vant_lib_utils.js.map

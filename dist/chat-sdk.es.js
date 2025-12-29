import { defineComponent as g, createElementBlock as c, openBlock as r, createElementVNode as i, toDisplayString as y, Fragment as M, renderList as D, normalizeClass as f, createCommentVNode as m, ref as d, computed as $, withDirectives as O, withKeys as I, vModelText as R, nextTick as z, watch as K, onMounted as N, createBlock as p, Transition as j, withCtx as V, createVNode as A, reactive as E, createApp as F } from "vue";
const G = { class: "cs-header" }, P = { class: "cs-header-left" }, U = { class: "cs-avatar" }, J = {
  key: 0,
  viewBox: "0 0 24 24",
  fill: "currentColor"
}, W = ["src"], X = { class: "cs-title" }, Y = { class: "cs-header-right" }, Z = /* @__PURE__ */ g({
  __name: "ChatHeader",
  props: {
    title: { default: "智能客服" },
    avatar: {}
  },
  emits: ["close", "menu"],
  setup(n) {
    return (s, e) => (r(), c("div", G, [
      i("div", P, [
        i("div", U, [
          n.avatar ? (r(), c("img", {
            key: 1,
            src: n.avatar,
            alt: "智能客服",
            class: "cs-avatar-img"
          }, null, 8, W)) : (r(), c("svg", J, [...e[2] || (e[2] = [
            i("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }, null, -1)
          ])]))
        ]),
        i("span", X, y(n.title), 1)
      ]),
      i("div", Y, [
        i("button", {
          class: "cs-icon-btn",
          onClick: e[0] || (e[0] = (t) => s.$emit("menu"))
        }, [...e[3] || (e[3] = [
          i("svg", {
            viewBox: "0 0 24 24",
            fill: "currentColor"
          }, [
            i("path", { d: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" })
          ], -1)
        ])]),
        i("button", {
          class: "cs-icon-btn cs-close-btn",
          onClick: e[1] || (e[1] = (t) => s.$emit("close"))
        }, [...e[4] || (e[4] = [
          i("svg", {
            viewBox: "0 0 24 24",
            fill: "currentColor"
          }, [
            i("path", { d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" })
          ], -1)
        ])])
      ])
    ]));
  }
}), _ = { class: "cs-welcome-section" }, ee = { class: "cs-welcome-card" }, te = { class: "cs-welcome-content" }, se = { class: "cs-welcome-title" }, ne = { class: "cs-questions-list" }, ie = ["onClick"], oe = { class: "cs-question-text" }, ae = /* @__PURE__ */ g({
  __name: "WelcomeSection",
  props: {
    welcomeMessage: { default: "Hi，我是智能客服" },
    quickQuestions: { default: () => [] }
  },
  emits: ["askQuestion", "refreshQuestions"],
  setup(n, { emit: s }) {
    const e = s, t = (o) => {
      e("askQuestion", o);
    };
    return (o, a) => (r(), c("div", _, [
      i("div", ee, [
        i("div", te, [
          i("div", se, y(n.welcomeMessage), 1),
          a[1] || (a[1] = i("div", { class: "cs-welcome-subtitle" }, "你可以试着问我：", -1))
        ]),
        i("button", {
          class: "cs-refresh-btn",
          onClick: a[0] || (a[0] = (l) => o.$emit("refreshQuestions"))
        }, [...a[2] || (a[2] = [
          i("svg", {
            viewBox: "0 0 24 24",
            fill: "currentColor"
          }, [
            i("path", { d: "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" })
          ], -1),
          i("span", null, "换一换", -1)
        ])])
      ]),
      i("div", ne, [
        (r(!0), c(M, null, D(n.quickQuestions, (l) => (r(), c("div", {
          key: l.id,
          class: "cs-question-item",
          onClick: (u) => t(l)
        }, [
          i("div", oe, y(l.text), 1),
          a[3] || (a[3] = i("button", { class: "cs-ask-btn" }, "提问", -1))
        ], 8, ie))), 128))
      ])
    ]));
  }
}), le = {
  key: 0,
  class: "cs-message-avatar"
}, re = { class: "cs-avatar cs-avatar-assistant" }, ce = {
  key: 0,
  viewBox: "0 0 24 24",
  fill: "currentColor"
}, de = ["src"], ue = { class: "cs-message-wrapper" }, he = { class: "cs-message-content" }, me = {
  key: 0,
  class: "cs-streaming-indicator"
}, ge = {
  key: 0,
  class: "cs-feedback-actions"
}, ve = {
  key: 1,
  class: "cs-message-avatar"
}, fe = /* @__PURE__ */ g({
  __name: "MessageItem",
  props: {
    message: {},
    avatar: {}
  },
  emits: ["feedback"],
  setup(n, { emit: s }) {
    const e = n, t = s, o = (a) => {
      e.message.feedback === a ? t("feedback", e.message.id, null) : t("feedback", e.message.id, a);
    };
    return (a, l) => (r(), c("div", {
      class: f(["cs-message-item", `cs-message-${n.message.role}`])
    }, [
      n.message.role === "assistant" ? (r(), c("div", le, [
        i("div", re, [
          n.avatar ? (r(), c("img", {
            key: 1,
            src: n.avatar,
            alt: "智能客服",
            class: "cs-avatar-img"
          }, null, 8, de)) : (r(), c("svg", ce, [...l[2] || (l[2] = [
            i("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }, null, -1)
          ])]))
        ])
      ])) : m("", !0),
      i("div", ue, [
        i("div", {
          class: f(["cs-message-bubble", `cs-bubble-${n.message.role}`])
        }, [
          i("div", he, y(n.message.content), 1),
          n.message.isStreaming ? (r(), c("div", me, [...l[3] || (l[3] = [
            i("span", { class: "cs-dot" }, null, -1),
            i("span", { class: "cs-dot" }, null, -1),
            i("span", { class: "cs-dot" }, null, -1)
          ])])) : m("", !0)
        ], 2),
        n.message.role === "assistant" && !n.message.isStreaming ? (r(), c("div", ge, [
          i("button", {
            class: f(["cs-feedback-btn", { "cs-feedback-btn-active": n.message.feedback === "like" }]),
            onClick: l[0] || (l[0] = (u) => o("like"))
          }, [...l[4] || (l[4] = [
            i("svg", {
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [
              i("path", { d: "M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" })
            ], -1)
          ])], 2),
          i("button", {
            class: f(["cs-feedback-btn", { "cs-feedback-btn-active": n.message.feedback === "dislike" }]),
            onClick: l[1] || (l[1] = (u) => o("dislike"))
          }, [...l[5] || (l[5] = [
            i("svg", {
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [
              i("path", { d: "M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" })
            ], -1)
          ])], 2)
        ])) : m("", !0)
      ]),
      n.message.role === "user" ? (r(), c("div", ve, [...l[6] || (l[6] = [
        i("div", { class: "cs-avatar cs-avatar-user" }, [
          i("svg", {
            viewBox: "0 0 24 24",
            fill: "currentColor"
          }, [
            i("path", { d: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" })
          ])
        ], -1)
      ])])) : m("", !0)
    ], 2));
  }
}), ke = { class: "cs-input-container" }, pe = { class: "cs-input-wrapper" }, ye = ["placeholder", "disabled"], be = ["disabled"], we = /* @__PURE__ */ g({
  __name: "MessageInput",
  props: {
    placeholder: { default: "你可以问我任何平台相关的问题" },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["send"],
  setup(n, { expose: s, emit: e }) {
    const t = n, o = e, a = d(""), l = d(), u = $(() => a.value.trim().length > 0), b = () => {
    }, w = () => {
      const k = a.value.trim();
      k && !t.disabled && (o("send", k), a.value = "");
    };
    return s({
      focus: () => {
        z(() => {
          l.value?.focus();
        });
      }
    }), (k, v) => (r(), c("div", ke, [
      i("div", pe, [
        O(i("input", {
          ref_key: "inputRef",
          ref: l,
          "onUpdate:modelValue": v[0] || (v[0] = (C) => a.value = C),
          type: "text",
          class: "cs-input",
          placeholder: n.placeholder,
          disabled: n.disabled,
          onKeydown: I(w, ["enter"]),
          onInput: b
        }, null, 40, ye), [
          [R, a.value]
        ]),
        i("button", {
          class: f(["cs-send-btn", { "cs-send-btn-active": u.value }]),
          disabled: n.disabled || !u.value,
          onClick: w
        }, [...v[1] || (v[1] = [
          i("svg", {
            viewBox: "0 0 24 24",
            fill: "currentColor"
          }, [
            i("path", { d: "M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" })
          ], -1)
        ])], 10, be)
      ])
    ]));
  }
}), Ce = {
  key: 0,
  class: "cs-quick-questions"
}, Se = {
  class: "cs-questions-scroll",
  ref: "scrollContainer"
}, $e = ["onClick"], xe = { class: "cs-question-text" }, Me = /* @__PURE__ */ g({
  __name: "QuickQuestions",
  props: {
    quickQuestions: { default: () => [] }
  },
  emits: ["askQuestion"],
  setup(n) {
    return (s, e) => n.quickQuestions.length > 0 ? (r(), c("div", Ce, [
      i("div", Se, [
        (r(!0), c(M, null, D(n.quickQuestions, (t) => (r(), c("div", {
          key: t.id,
          class: "cs-question-chip",
          onClick: (o) => s.$emit("askQuestion", t)
        }, [
          i("span", xe, y(t.text), 1),
          e[0] || (e[0] = i("svg", {
            class: "cs-question-icon",
            viewBox: "0 0 24 24",
            fill: "currentColor"
          }, [
            i("path", { d: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" })
          ], -1))
        ], 8, $e))), 128))
      ], 512)
    ])) : m("", !0);
  }
}), De = {
  key: 1,
  class: "cs-messages-list"
}, Le = /* @__PURE__ */ g({
  __name: "ChatWindow",
  props: {
    isOpen: { type: Boolean },
    config: {},
    messages: {},
    isLoading: { type: Boolean, default: !1 }
  },
  emits: ["close", "sendMessage", "askQuestion", "feedback"],
  setup(n, { emit: s }) {
    const e = n, t = s, o = d(), a = d([]), l = d([]), u = d(0), b = $(() => e.config.position || "right"), w = $(() => b.value === "left" ? "slide-left" : "slide-right"), L = () => {
      const h = e.config.quickQuestions || [];
      a.value = h.length > 0 ? h : k();
    }, k = () => [
      { id: "1", text: "如何使用这个平台？" },
      { id: "2", text: "账号如何注册？" },
      { id: "3", text: "忘记密码怎么办？" },
      { id: "4", text: "如何联系人工客服？" }
    ], v = () => {
      u.value = (u.value + 1) % l.value.length, a.value = l.value[u.value] ?? [];
    }, C = (h) => {
      t("askQuestion", h);
    }, H = (h, Q) => {
      t("feedback", h, Q);
    }, B = (h) => {
      t("sendMessage", h);
    }, T = () => {
      t("close");
    };
    return K(() => e.messages, () => {
      z(() => {
        o.value && (o.value.scrollTop = o.value.scrollHeight);
      });
    }, { deep: !0 }), N(() => {
      L();
    }), (h, Q) => (r(), p(j, { name: w.value }, {
      default: V(() => [
        n.isOpen ? (r(), c("div", {
          key: 0,
          class: f(["cs-chat-window", `cs-chat-window-${b.value}`])
        }, [
          A(Z, {
            title: n.config.title || "智能客服",
            avatar: n.config.avatar?.assistant,
            onClose: T
          }, null, 8, ["title", "avatar"]),
          i("div", {
            class: "cs-messages-container",
            ref_key: "messagesContainer",
            ref: o
          }, [
            n.messages.length === 0 ? (r(), p(ae, {
              key: 0,
              "welcome-message": n.config.welcomeMessage || "Hi，我是智能客服",
              "quick-questions": a.value,
              onAskQuestion: C,
              onRefreshQuestions: v
            }, null, 8, ["welcome-message", "quick-questions"])) : (r(), c("div", De, [
              (r(!0), c(M, null, D(n.messages, (S) => (r(), p(fe, {
                key: S.id,
                message: S,
                avatar: S.role === "assistant" ? n.config.avatar?.assistant : n.config.avatar?.user,
                onFeedback: H
              }, null, 8, ["message", "avatar"]))), 128))
            ]))
          ], 512),
          n.messages.length > 0 ? (r(), p(Me, {
            key: 0,
            "quick-questions": a.value,
            onAskQuestion: C
          }, null, 8, ["quick-questions"])) : m("", !0),
          A(we, {
            placeholder: n.config.placeholder || "你可以问我任何平台相关的问题",
            disabled: n.isLoading,
            onSend: B
          }, null, 8, ["placeholder", "disabled"])
        ], 2)) : m("", !0)
      ]),
      _: 1
    }, 8, ["name"]));
  }
}), Qe = /* @__PURE__ */ g({
  __name: "SDKApp",
  props: {
    sdk: {
      type: Object,
      required: !0
    }
  },
  setup(n) {
    return (s, e) => (r(), p(Le, {
      "is-open": n.sdk.isOpen.value,
      config: n.sdk.config,
      messages: n.sdk.messages.value,
      "is-loading": n.sdk.isLoading.value,
      onClose: e[0] || (e[0] = (t) => n.sdk.close()),
      onSendMessage: e[1] || (e[1] = (t) => n.sdk.handleSendMessage(t)),
      onAskQuestion: e[2] || (e[2] = (t) => n.sdk.handleAskQuestion(t)),
      onFeedback: e[3] || (e[3] = (t, o) => n.sdk.handleFeedback({ messageId: t, type: o }))
    }, null, 8, ["is-open", "config", "messages", "is-loading"]));
  }
}), Ae = (n, s) => {
  const e = n.__vccOpts || n;
  for (const [t, o] of s)
    e[t] = o;
  return e;
}, qe = /* @__PURE__ */ Ae(Qe, [["__scopeId", "data-v-63424d60"]]);
function q() {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}
function Oe(n) {
  const s = new Date(n), e = /* @__PURE__ */ new Date(), t = e.getTime() - s.getTime();
  if (t < 60 * 1e3)
    return "刚刚";
  if (t < 3600 * 1e3)
    return `${Math.floor(t / (60 * 1e3))}分钟前`;
  if (s.toDateString() === e.toDateString())
    return s.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
  const o = new Date(e);
  return o.setDate(o.getDate() - 1), s.toDateString() === o.toDateString() ? `昨天 ${s.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}` : s.toLocaleString("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function x(n, s) {
  const e = { ...n };
  for (const t in s)
    s[t] && typeof s[t] == "object" && !Array.isArray(s[t]) && t in n && n[t] && typeof n[t] == "object" && !Array.isArray(n[t]) ? e[t] = x(
      n[t],
      s[t]
    ) : e[t] = s[t];
  return e;
}
function Ie(n, s) {
  let e = null;
  return function(...t) {
    e && clearTimeout(e), e = setTimeout(() => n.apply(this, t), s);
  };
}
function Re(n, s) {
  let e = null, t = 0;
  return function(...o) {
    const a = Date.now(), l = s - (a - t);
    l <= 0 ? (e && (clearTimeout(e), e = null), t = a, n.apply(this, o)) : e || (e = setTimeout(() => {
      t = Date.now(), e = null, n.apply(this, o);
    }, l));
  };
}
const ze = {
  title: "智能客服",
  placeholder: "你可以问我任何平台相关的问题",
  theme: "light",
  position: "right",
  // 默认在右侧
  welcomeMessage: "Hi，我是智能客服",
  quickQuestions: [],
  enableHistory: !0,
  maxHistoryDays: 7,
  avatar: {
    assistant: "",
    user: ""
  }
};
class He {
  app = null;
  container = null;
  shadowRoot = null;
  eventListeners = /* @__PURE__ */ new Map();
  isOpen = d(!1);
  config = E({});
  messages = d([]);
  isLoading = d(!1);
  unreadCount = d(0);
  constructor(s = {}) {
    Object.assign(this.config, x(ze, s)), this.loadHistory();
  }
  /**
   * 挂载SDK到页面
   */
  mount(s) {
    if (this.app) {
      console.warn("[ChatSDK] SDK already mounted");
      return;
    }
    const e = typeof s == "string" ? document.querySelector(s) : s || document.body;
    if (!e) {
      console.error("[ChatSDK] Container not found");
      return;
    }
    this.container = document.createElement("chat-sdk-root"), this.container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 999999;
    `, e.appendChild(this.container), this.shadowRoot = this.container.attachShadow({ mode: "open" }), this.injectGlobalStyles();
    const t = document.createElement("div");
    t.id = "chat-sdk-mount-point", this.shadowRoot.appendChild(t), this.app = F(qe, {
      sdk: this
    }), this.app.mount(t), this.emit("mounted");
  }
  /**
   * 卸载SDK
   */
  unmount() {
    this.app && (this.app.unmount(), this.app = null), this.container && this.container.parentNode && this.container.parentNode.removeChild(this.container), this.container = null, this.shadowRoot = null, this.emit("unmounted");
  }
  /**
   * 注入全局样式到 Shadow DOM
   */
  injectGlobalStyles() {
    if (!this.shadowRoot) return;
    const s = document.createElement("style");
    s.textContent = `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      #chat-sdk-mount-point {
        width: 100%;
        height: 100%;
        position: relative;
      }

      /* 恢复点击事件 - 容器设置了 pointer-events: none */
      #chat-sdk-mount-point > * {
        pointer-events: auto;
      }

      /* SVG 全局样式 - 确保在 Shadow DOM 中正确显示 */
      svg {
        display: inline-block;
        vertical-align: middle;
        overflow: hidden;
        /* 防止无尺寸限制时显示过大 */
        width: 1em;
        height: 1em;
      }

      /* 确保内部路径不会溢出 */
      svg * {
        vector-effect: non-scaling-stroke;
      }

      /* 确保图片正确显示 */
      img {
        display: block;
        max-width: 100%;
        height: auto;
      }

      /* 按钮重置 */
      button {
        font: inherit;
        color: inherit;
        background: none;
        border: none;
        cursor: pointer;
        outline: none;
      }

      /* 按钮内的 SVG 不继承字体相关样式 */
      button svg {
        font: normal;
        width: inherit;
        height: inherit;
      }

      /* 输入框重置 */
      input {
        font: inherit;
        color: inherit;
        outline: none;
        border: none;
        background: none;
      }

      /* 伪元素重置 */
      ::before,
      ::after {
        box-sizing: border-box;
      }
    `, this.shadowRoot.appendChild(s), this.loadComponentStyles();
  }
  /**
   * 在生产模式下加载组件样式
   */
  loadComponentStyles() {
    if (!this.shadowRoot) return;
    Array.from(document.querySelectorAll('link[rel="stylesheet"]')).forEach((e) => {
      const t = e.getAttribute("href");
      if (t && t.includes("ai-bot")) {
        const o = document.createElement("link");
        o.rel = "stylesheet", o.href = t, this.shadowRoot.appendChild(o), console.log("[ChatSDK] Loaded stylesheet:", t);
      }
    });
  }
  /**
   * 在开发模式下注入组件样��到 Shadow DOM
   */
  injectComponentStyles() {
    if (!this.shadowRoot) return;
    Array.from(document.querySelectorAll("style")).forEach((e) => {
      const t = e.textContent || "";
      if (t.includes(".cs-") || t.includes(".chat-sdk")) {
        const o = e.getAttribute("data-vite-dev-id");
        if (!Array.from(this.shadowRoot.querySelectorAll("style")).some((l) => l.getAttribute("data-vite-dev-id") === o)) {
          const l = e.cloneNode(!0);
          this.shadowRoot.appendChild(l), console.log("[ChatSDK] Injected component style:", o || "unknown");
        }
      }
    });
  }
  /**
   * 打开聊天窗口
   */
  open() {
    this.isOpen.value = !0, this.unreadCount.value = 0, this.emit("open");
  }
  /**
   * 关闭聊天窗口
   */
  close() {
    this.isOpen.value = !1, this.emit("close");
  }
  /**
   * 切换聊天窗口状态
   */
  toggle() {
    this.isOpen.value ? this.close() : this.open();
  }
  /**
   * 发送消息
   */
  async sendMessage(s) {
    if (s.trim()) {
      this.addMessage({
        id: q(),
        role: "user",
        content: s.trim(),
        timestamp: Date.now()
      }), this.isLoading.value = !0;
      try {
        await this.emitAsync("sendMessage", s);
      } catch (e) {
        console.error("[ChatSDK] Send message error:", e), this.addMessage({
          id: q(),
          role: "system",
          content: "发送消息失败，请稍后重试",
          timestamp: Date.now()
        });
      } finally {
        this.isLoading.value = !1;
      }
    }
  }
  /**
   * 添加消息到聊天记录
   */
  addMessage(s) {
    this.messages.value.push(s), this.saveHistory(), !this.isOpen.value && s.role === "assistant" && this.unreadCount.value++, this.emit("message", s);
  }
  /**
   * 追加消息内容（用于流式输出）
   */
  appendMessageContent(s, e) {
    const t = this.messages.value.find((o) => o.id === s);
    t && (t.content += e, t.timestamp = Date.now(), this.emit("messageUpdate", t));
  }
  /**
   * 结束消息流式输出
   */
  finishMessageStream(s) {
    const e = this.messages.value.find((t) => t.id === s);
    e && (e.isStreaming = !1, e.timestamp = Date.now(), this.saveHistory(), this.emit("messageComplete", e));
  }
  /**
   * 清空消息
   */
  clearMessages() {
    this.messages.value = [], this.saveHistory(), this.emit("clear");
  }
  /**
   * 处理发送消息（由组件内部调用）
   */
  handleSendMessage(s) {
    return this.sendMessage(s);
  }
  /**
   * 处理点击推荐问题（由组件内部调用）
   */
  handleAskQuestion(s) {
    this.sendMessage(s.text);
  }
  /**
   * 处理点赞点踩反馈（由组件内部调用）
   */
  handleFeedback(s) {
    const { messageId: e, type: t } = s, o = this.messages.value.find((a) => a.id === e);
    o && o.role === "assistant" && (o.feedback = t || void 0, this.saveHistory(), this.emit("feedback", o));
  }
  /**
   * 加载历史记录
   */
  loadHistory() {
    if (this.config.enableHistory)
      try {
        const s = localStorage.getItem("chat-sdk-history");
        if (s) {
          const e = JSON.parse(s), t = Date.now(), o = this.config.maxHistoryDays * 24 * 60 * 60 * 1e3;
          this.messages.value = e.filter((a) => t - a.timestamp < o);
        }
      } catch (s) {
        console.error("[ChatSDK] Load history error:", s);
      }
  }
  /**
   * 保存历史记录
   */
  saveHistory() {
    if (this.config.enableHistory)
      try {
        localStorage.setItem("chat-sdk-history", JSON.stringify(this.messages.value));
      } catch (s) {
        console.error("[ChatSDK] Save history error:", s);
      }
  }
  /**
   * 触发事件
   */
  emit(s, e) {
    const t = this.eventListeners.get(s);
    t && t.forEach((o) => o(e));
  }
  /**
   * 异步触发事件并等待
   */
  async emitAsync(s, e) {
    const t = this.eventListeners.get(s);
    if (t && t.size > 0) {
      const o = Array.from(t).map((a) => Promise.resolve(a(e)));
      return Promise.all(o);
    }
    return Promise.resolve();
  }
  /**
   * 监听事件
   */
  on(s, e) {
    this.eventListeners.has(s) || this.eventListeners.set(s, /* @__PURE__ */ new Set()), this.eventListeners.get(s).add(e);
  }
  /**
   * 取消监听事件
   */
  off(s, e) {
    const t = this.eventListeners.get(s);
    t && t.delete(e);
  }
  /**
   * 更新配置
   */
  updateConfig(s) {
    Object.assign(this.config, x(this.config, s));
  }
}
function Ke(n) {
  return new He(n);
}
export {
  He as ChatSDK,
  Ke as createChatSDK,
  Ie as debounce,
  x as deepMerge,
  He as default,
  Oe as formatTimestamp,
  q as generateId,
  Re as throttle
};

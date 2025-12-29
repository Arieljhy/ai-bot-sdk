import { defineComponent as S, createElementBlock as v, openBlock as f, createElementVNode as o, toDisplayString as D, ref as g, createCommentVNode as k, normalizeClass as z, Fragment as N, renderList as K, watch as q, computed as T, createBlock as A, withDirectives as J, withKeys as Y, vModelText as X, nextTick as B, onUnmounted as Z, onMounted as ee, Transition as te, withCtx as se, createVNode as P, unref as O, reactive as ae, createApp as ne } from "vue";
const oe = { class: "cs-header" }, ie = { class: "cs-header-left" }, re = { class: "cs-avatar" }, ce = {
  key: 0,
  viewBox: "0 0 24 24",
  fill: "currentColor"
}, le = ["src"], de = { class: "cs-title" }, fe = { class: "cs-header-right" }, ue = /* @__PURE__ */ S({
  __name: "ChatHeader",
  props: {
    title: { default: "智能客服" },
    avatar: {}
  },
  emits: ["close", "menu"],
  setup(a) {
    return (t, e) => (f(), v("div", oe, [
      o("div", ie, [
        o("div", re, [
          a.avatar ? (f(), v("img", {
            key: 1,
            src: a.avatar,
            alt: "智能客服",
            class: "cs-avatar-img"
          }, null, 8, le)) : (f(), v("svg", ce, [...e[2] || (e[2] = [
            o("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }, null, -1)
          ])]))
        ]),
        o("span", de, D(a.title), 1)
      ]),
      o("div", fe, [
        o("button", {
          class: "cs-icon-btn",
          onClick: e[0] || (e[0] = (s) => t.$emit("menu"))
        }, [...e[3] || (e[3] = [
          o("svg", {
            viewBox: "0 0 24 24",
            fill: "currentColor"
          }, [
            o("path", { d: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" })
          ], -1)
        ])]),
        o("button", {
          class: "cs-icon-btn cs-close-btn",
          onClick: e[1] || (e[1] = (s) => t.$emit("close"))
        }, [...e[4] || (e[4] = [
          o("svg", {
            viewBox: "0 0 24 24",
            fill: "currentColor"
          }, [
            o("path", { d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" })
          ], -1)
        ])])
      ])
    ]));
  }
}), C = (a, t) => {
  const e = a.__vccOpts || a;
  for (const [s, n] of t)
    e[s] = n;
  return e;
}, he = /* @__PURE__ */ C(ue, [["__scopeId", "data-v-c3c54fb3"]]), ve = { class: "cs-welcome-section" }, ge = { class: "cs-welcome-card" }, me = { class: "cs-welcome-header" }, pe = { class: "cs-welcome-left" }, be = { class: "cs-welcome-text" }, xe = { class: "cs-welcome-title" }, ke = {
  key: 0,
  class: "cs-welcome-subtitle"
}, we = { class: "cs-questions-list" }, ye = ["onClick"], Se = { class: "cs-question-text" }, Ce = /* @__PURE__ */ S({
  __name: "WelcomeSection",
  props: {
    welcomeMessage: { default: "Hi，我是智能客服" },
    quickQuestions: { default: () => [] },
    showWelcome: { type: Boolean, default: !0 }
  },
  emits: ["askQuestion", "refreshQuestions"],
  setup(a, { emit: t }) {
    const e = t, s = g(!1), n = (r) => {
      e("askQuestion", r);
    }, c = () => {
      s.value = !0, setTimeout(() => {
        s.value = !1;
      }, 500), e("refreshQuestions");
    };
    return (r, u) => (f(), v("div", ve, [
      o("div", ge, [
        o("div", me, [
          o("div", pe, [
            u[0] || (u[0] = o("div", { class: "cs-avatar" }, [
              o("svg", {
                viewBox: "0 0 24 24",
                fill: "currentColor"
              }, [
                o("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" })
              ])
            ], -1)),
            o("div", be, [
              o("div", xe, D(a.welcomeMessage), 1),
              a.showWelcome ? (f(), v("div", ke, "你可以试着问我：")) : k("", !0)
            ])
          ]),
          o("button", {
            class: "cs-refresh-btn",
            onClick: c
          }, [
            (f(), v("svg", {
              viewBox: "0 0 24 24",
              fill: "currentColor",
              class: z({ "rotate-animating": s.value })
            }, [...u[1] || (u[1] = [
              o("path", { d: "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" }, null, -1)
            ])], 2)),
            u[2] || (u[2] = o("span", null, "换一换", -1))
          ])
        ]),
        o("div", we, [
          (f(!0), v(N, null, K(a.quickQuestions, (i) => (f(), v("div", {
            key: i.id,
            class: "cs-question-item",
            onClick: (m) => n(i)
          }, [
            o("div", Se, D(i.text), 1)
          ], 8, ye))), 128))
        ])
      ])
    ]));
  }
}), Me = /* @__PURE__ */ C(Ce, [["__scopeId", "data-v-d56a62e7"]]), $e = {
  key: 0,
  class: "cs-message-avatar"
}, ze = { class: "cs-avatar cs-avatar-assistant" }, Qe = {
  key: 0,
  viewBox: "0 0 24 24",
  fill: "currentColor"
}, qe = ["src"], Ie = { class: "cs-message-wrapper" }, Ae = { class: "cs-message-content" }, De = {
  key: 0,
  class: "cs-streaming-indicator"
}, je = {
  key: 0,
  class: "cs-feedback-actions"
}, He = {
  key: 1,
  class: "cs-message-avatar"
}, Le = /* @__PURE__ */ S({
  __name: "MessageItem",
  props: {
    message: {},
    avatar: {}
  },
  emits: ["feedback"],
  setup(a, { emit: t }) {
    const e = a, s = t, n = (c) => {
      e.message.feedback === c ? s("feedback", e.message.id, null) : s("feedback", e.message.id, c);
    };
    return (c, r) => (f(), v("div", {
      class: z(["cs-message-item", `cs-message-${a.message.role}`])
    }, [
      a.message.role === "assistant" ? (f(), v("div", $e, [
        o("div", ze, [
          a.avatar ? (f(), v("img", {
            key: 1,
            src: a.avatar,
            alt: "智能客服",
            class: "cs-avatar-img"
          }, null, 8, qe)) : (f(), v("svg", Qe, [...r[2] || (r[2] = [
            o("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }, null, -1)
          ])]))
        ])
      ])) : k("", !0),
      o("div", Ie, [
        o("div", {
          class: z(["cs-message-bubble", `cs-bubble-${a.message.role}`])
        }, [
          o("div", Ae, D(a.message.content), 1),
          a.message.isStreaming ? (f(), v("div", De, [...r[3] || (r[3] = [
            o("span", { class: "cs-dot" }, null, -1),
            o("span", { class: "cs-dot" }, null, -1),
            o("span", { class: "cs-dot" }, null, -1)
          ])])) : k("", !0)
        ], 2),
        a.message.role === "assistant" && !a.message.isStreaming ? (f(), v("div", je, [
          o("button", {
            class: z(["cs-feedback-btn", { "cs-feedback-btn-active": a.message.feedback === "like" }]),
            onClick: r[0] || (r[0] = (u) => n("like"))
          }, [...r[4] || (r[4] = [
            o("svg", {
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [
              o("path", { d: "M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" })
            ], -1)
          ])], 2),
          o("button", {
            class: z(["cs-feedback-btn", { "cs-feedback-btn-active": a.message.feedback === "dislike" }]),
            onClick: r[1] || (r[1] = (u) => n("dislike"))
          }, [...r[5] || (r[5] = [
            o("svg", {
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [
              o("path", { d: "M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" })
            ], -1)
          ])], 2)
        ])) : k("", !0)
      ]),
      a.message.role === "user" ? (f(), v("div", He, [...r[6] || (r[6] = [
        o("div", { class: "cs-avatar cs-avatar-user" }, [
          o("svg", {
            viewBox: "0 0 24 24",
            fill: "currentColor"
          }, [
            o("path", { d: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" })
          ])
        ], -1)
      ])])) : k("", !0)
    ], 2));
  }
}), Ee = /* @__PURE__ */ C(Le, [["__scopeId", "data-v-ee56945d"]]), Oe = { class: "cs-messages-list" }, Be = /* @__PURE__ */ S({
  __name: "MessagesList",
  props: {
    messages: {},
    config: {},
    streamingMessageId: { default: void 0 },
    streamingContent: { default: "" }
  },
  emits: ["feedback"],
  setup(a, { emit: t }) {
    const e = a, s = t, n = g("");
    q(() => e.streamingContent, (i) => {
      i ? n.value = i : n.value = "";
    }, { immediate: !0 }), q(() => e.streamingMessageId, (i, m) => {
      i !== m && (n.value = "");
    });
    const c = T(() => {
      const i = [...e.messages];
      if (e.streamingMessageId && n.value) {
        const m = i.findIndex((l) => l.id === e.streamingMessageId);
        if (m >= 0) {
          const l = i[m];
          i[m] = {
            id: l.id,
            role: l.role,
            content: n.value,
            isStreaming: !0,
            timestamp: l.timestamp,
            feedback: l.feedback
          };
        } else
          i.push({
            id: e.streamingMessageId,
            role: "assistant",
            content: n.value,
            isStreaming: !0,
            timestamp: Date.now()
          });
      }
      return i;
    }), r = (i) => {
      if (i.role === "assistant")
        return e.config.avatar?.assistant;
      if (i.role === "user")
        return e.config.avatar?.user;
    }, u = (i, m) => {
      s("feedback", i, m);
    };
    return (i, m) => (f(), v("div", Oe, [
      (f(!0), v(N, null, K(c.value, (l) => (f(), A(Ee, {
        key: l.id,
        message: l,
        avatar: r(l),
        onFeedback: u
      }, null, 8, ["message", "avatar"]))), 128))
    ]));
  }
}), Te = /* @__PURE__ */ C(Be, [["__scopeId", "data-v-531b4005"]]), _e = { class: "cs-input-container" }, Pe = { class: "cs-input-wrapper" }, Fe = ["placeholder", "disabled"], Ne = ["disabled"], Ke = /* @__PURE__ */ S({
  __name: "MessageInput",
  props: {
    placeholder: { default: "你可以问我任何平台相关的问题" },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["send"],
  setup(a, { expose: t, emit: e }) {
    const s = e, n = g(""), c = g(), r = T(() => n.value.trim().length > 0), u = () => {
    }, i = () => {
      const l = n.value.trim();
      l && (n.value = "", s("send", l));
    };
    return t({
      focus: () => {
        B(() => {
          c.value?.focus();
        });
      }
    }), (l, h) => (f(), v("div", _e, [
      o("div", Pe, [
        J(o("input", {
          ref_key: "inputRef",
          ref: c,
          "onUpdate:modelValue": h[0] || (h[0] = (d) => n.value = d),
          type: "text",
          class: "cs-input",
          placeholder: a.placeholder,
          disabled: a.disabled,
          onKeydown: Y(i, ["enter"]),
          onInput: u
        }, null, 40, Fe), [
          [X, n.value]
        ]),
        o("button", {
          class: z(["cs-send-btn", { "cs-send-btn-active": r.value }]),
          disabled: a.disabled || !r.value,
          onClick: i
        }, [...h[1] || (h[1] = [
          o("svg", {
            viewBox: "0 0 24 24",
            fill: "currentColor"
          }, [
            o("path", { d: "M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" })
          ], -1)
        ])], 10, Ne)
      ])
    ]));
  }
}), Ve = /* @__PURE__ */ C(Ke, [["__scopeId", "data-v-582889fb"]]), Ue = {
  key: 0,
  class: "cs-quick-questions"
}, Re = {
  class: "cs-questions-scroll",
  ref: "scrollContainer"
}, We = ["onClick"], Ge = { class: "cs-question-text" }, Je = /* @__PURE__ */ S({
  __name: "QuickQuestions",
  props: {
    quickQuestions: { default: () => [] }
  },
  emits: ["askQuestion"],
  setup(a) {
    return (t, e) => a.quickQuestions.length > 0 ? (f(), v("div", Ue, [
      o("div", Re, [
        (f(!0), v(N, null, K(a.quickQuestions, (s) => (f(), v("div", {
          key: s.id,
          class: "cs-question-chip",
          onClick: (n) => t.$emit("askQuestion", s)
        }, [
          o("span", Ge, D(s.text), 1)
        ], 8, We))), 128))
      ], 512)
    ])) : k("", !0);
  }
}), Ye = /* @__PURE__ */ C(Je, [["__scopeId", "data-v-fc7fd5f8"]]), Xe = [
  { id: "1", text: "如何使用这个平台？" },
  { id: "2", text: "账号如何注册？" },
  { id: "3", text: "忘记密码怎么办？" },
  { id: "4", text: "如何联系人工客服？" },
  { id: "5", text: "平台支持哪些功能？" },
  { id: "6", text: "如何查看使用记录？" }
];
function Ze(a = []) {
  const t = g([]), e = g([]), s = g([]), n = g(0), c = () => {
    const i = a.length > 0 ? a : Xe;
    e.value = i, s.value = r(i, 2), t.value = s.value[0] || [], n.value = 0;
  }, r = (i, m) => {
    const l = [];
    for (let h = 0; h < i.length; h += m)
      l.push(i.slice(h, h + m));
    return l;
  }, u = () => {
    s.value.length !== 0 && (n.value = (n.value + 1) % s.value.length, t.value = s.value[n.value] ?? []);
  };
  return c(), {
    displayedQuestions: t,
    allQuickQuestions: e,
    refreshQuestions: u
  };
}
function et(a = {}) {
  const t = g(""), e = g(!1), s = g(null);
  let n = null, c = null, r = a;
  const u = (d) => {
    if (typeof d == "object" && d !== null) {
      if ("choices" in d && d.choices?.[0]?.delta?.content)
        return d.choices[0].delta.content;
      if ("delta" in d && d.delta?.text)
        return d.delta.text;
      if ("content" in d && typeof d.content == "string")
        return d.content;
    }
    return typeof d == "string" ? d : "";
  }, i = (d, Q) => {
    if (!d.trim()) return "";
    if (d.startsWith("data: ")) {
      const x = d.slice(6).trim();
      if (x === "[DONE]")
        return "";
      try {
        const M = JSON.parse(x), w = u(M);
        return w && (t.value += w, Q?.(w)), w;
      } catch {
        return x ? (t.value += x, Q?.(x), x) : "";
      }
    }
    return d.startsWith("event: "), "";
  }, m = async (d) => {
    const Q = { ...r, ...d }, {
      url: x = "http://localhost:3000/sse",
      method: M = "POST",
      headers: w = {},
      body: j,
      onMessage: H,
      onComplete: L,
      onError: _
    } = Q;
    e.value && l(), s.value = null, e.value = !0, n = new AbortController();
    try {
      const b = await fetch(x, {
        method: M,
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
          ...w
        },
        body: j ? JSON.stringify(j) : void 0,
        signal: n.signal
      });
      if (!b.ok)
        throw new Error(`HTTP error! status: ${b.status}`);
      if (!b.body)
        throw new Error("无法获取 ReadableStream");
      c = b.body.getReader();
      const $ = new TextDecoder();
      let p = "";
      for (; ; ) {
        const { done: y, value: I } = await c.read();
        if (y) {
          if (p.trim()) {
            const E = p.split(`
`);
            for (const G of E)
              i(G, H);
          }
          e.value = !1, L?.();
          break;
        }
        const W = $.decode(I, { stream: !0 });
        p += W;
        const V = p.split(`
`);
        p = V.pop() || "";
        for (const E of V)
          E.trim() && i(E, H);
      }
    } catch (b) {
      if (b.name === "AbortError") {
        e.value = !1;
        return;
      }
      const $ = b instanceof Error ? b : new Error(String(b));
      throw s.value = $, e.value = !1, _?.($), $;
    } finally {
      c = null, n = null;
    }
  }, l = () => {
    n && (n.abort(), n = null), c && (c.cancel(), c = null), e.value = !1;
  }, h = () => {
    l(), t.value = "", s.value = null;
  };
  return Z(() => {
    l();
  }), {
    content: t,
    isLoading: e,
    error: s,
    start: m,
    stop: l,
    reset: h
  };
}
function tt(a) {
  const t = g(), e = g(""), { content: s, start: n, reset: c } = et();
  let r = 0;
  q(s, (l) => {
    if (l && l.length > r) {
      const h = l.slice(r);
      e.value += h, r = l.length;
    }
  });
  const u = async (l, h) => {
    c(), r = 0, e.value = "", t.value = Date.now().toString();
    try {
      await n({
        url: h?.sseUrl || a.sseUrl || "http://localhost:3000/sse",
        method: h?.sseMethod || a.sseMethod || "POST",
        body: {
          message: l,
          history: []
        },
        onComplete: () => {
          console.log("✅ 流式传输完成"), t.value && e.value && h?.onComplete?.(t.value, e.value), i();
        },
        onError: (d) => {
          console.error("❌ SSE 错误:", d), e.value += `错误：${d.message}`, t.value && e.value && h?.onComplete?.(t.value, e.value), i();
        }
      });
    } catch (d) {
      console.error("❌ 启动 SSE 失败:", d), e.value += "网络错误，请检查连接", t.value && e.value && h?.onComplete?.(t.value, e.value), i();
    }
  }, i = () => {
    t.value = void 0, e.value = "";
  };
  return {
    streamingMessageId: t,
    streamingContent: e,
    startStreamingChat: u,
    isStreaming: () => !!t.value
  };
}
function st(a, t) {
  const e = g(0);
  return {
    savedScrollTop: e,
    scrollToBottom: () => {
      B(() => {
        a.value && (a.value.scrollTop = a.value.scrollHeight);
      });
    },
    saveScrollPosition: () => {
      a.value && !t.value && (e.value = a.value.scrollTop);
    },
    restoreScrollPosition: () => {
      t.value || B(() => {
        a.value && e.value > 0 && (a.value.scrollTop = e.value);
      });
    },
    resetScrollPosition: () => {
      e.value = 0;
    },
    watchStreamingContent: () => {
      q(t, () => {
        B(() => {
          a.value && (a.value.scrollTop = a.value.scrollHeight);
        });
      });
    }
  };
}
const at = /* @__PURE__ */ S({
  __name: "ChatWindow",
  props: {
    isOpen: { type: Boolean },
    config: {},
    messages: {},
    isLoading: { type: Boolean, default: !1 }
  },
  emits: ["close", "sendMessage", "askQuestion", "feedback", "streamingComplete"],
  setup(a, { emit: t }) {
    const e = a, s = t, n = T(() => e.config.position || "right"), c = T(() => n.value === "left" ? "slide-left" : "slide-right"), r = g(), {
      displayedQuestions: u,
      allQuickQuestions: i,
      refreshQuestions: m
    } = Ze(e.config.quickQuestions || []), {
      streamingMessageId: l,
      streamingContent: h,
      startStreamingChat: d
    } = tt(e.config), {
      saveScrollPosition: Q,
      restoreScrollPosition: x,
      resetScrollPosition: M,
      scrollToBottom: w,
      watchStreamingContent: j
    } = st(r, h);
    j(), q(() => e.messages, w, { deep: !0 }), q(() => e.isOpen, (p) => {
      p && x();
    }), ee(() => {
    });
    const H = () => {
      m();
    }, L = (p) => {
      s("askQuestion", p), d(p.text, {
        onComplete: (y, I) => {
          s("streamingComplete", y, I), M();
        }
      });
    }, _ = (p, y) => {
      s("feedback", p, y);
    }, b = (p) => {
      s("sendMessage", p), d(p, {
        onComplete: (y, I) => {
          s("streamingComplete", y, I), M();
        }
      });
    }, $ = () => {
      Q(), s("close");
    };
    return (p, y) => (f(), A(te, { name: c.value }, {
      default: se(() => [
        a.isOpen ? (f(), v("div", {
          key: 0,
          class: z(["cs-chat-window", `cs-chat-window-${n.value}`])
        }, [
          P(he, {
            title: a.config.title || "智能客服",
            avatar: a.config.avatar?.assistant,
            onClose: $
          }, null, 8, ["title", "avatar"]),
          o("div", {
            class: "cs-messages-container",
            ref_key: "messagesContainer",
            ref: r
          }, [
            P(Me, {
              "welcome-message": a.config.welcomeMessage || "Hi，我是智能客服",
              "quick-questions": O(u),
              "show-welcome": a.messages.length === 0,
              onAskQuestion: L,
              onRefreshQuestions: H
            }, null, 8, ["welcome-message", "quick-questions", "show-welcome"]),
            a.messages.length > 0 ? (f(), A(Te, {
              key: 0,
              messages: a.messages,
              config: a.config,
              "streaming-message-id": O(l),
              "streaming-content": O(h),
              onFeedback: _
            }, null, 8, ["messages", "config", "streaming-message-id", "streaming-content"])) : k("", !0)
          ], 512),
          a.messages.length > 0 ? (f(), A(Ye, {
            key: 0,
            "quick-questions": O(i),
            onAskQuestion: L
          }, null, 8, ["quick-questions"])) : k("", !0),
          P(Ve, {
            placeholder: a.config.placeholder || "你可以问我任何平台相关的问题",
            disabled: a.isLoading,
            onSend: b
          }, null, 8, ["placeholder", "disabled"])
        ], 2)) : k("", !0)
      ]),
      _: 1
    }, 8, ["name"]));
  }
}), nt = /* @__PURE__ */ C(at, [["__scopeId", "data-v-e65cdfc5"]]), ot = /* @__PURE__ */ S({
  __name: "ChatSDKApp",
  props: {
    sdk: {
      type: Object,
      required: !0
    }
  },
  setup(a) {
    return (t, e) => (f(), A(nt, {
      "is-open": a.sdk.isOpen.value,
      config: a.sdk.config,
      messages: a.sdk.messages.value,
      "is-loading": a.sdk.isLoading.value,
      onClose: e[0] || (e[0] = (s) => a.sdk.close()),
      onSendMessage: e[1] || (e[1] = (s) => a.sdk.handleSendMessage(s)),
      onAskQuestion: e[2] || (e[2] = (s) => a.sdk.handleAskQuestion(s)),
      onFeedback: e[3] || (e[3] = (s, n) => a.sdk.handleFeedback({ messageId: s, type: n })),
      onStreamingComplete: e[4] || (e[4] = (s, n) => a.sdk.handleStreamingComplete(s, n))
    }, null, 8, ["is-open", "config", "messages", "is-loading"]));
  }
}), it = /* @__PURE__ */ C(ot, [["__scopeId", "data-v-87cbd1c8"]]);
function U() {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}
function F(a, t) {
  const e = { ...a };
  for (const s in t)
    t[s] && typeof t[s] == "object" && !Array.isArray(t[s]) && s in a && a[s] && typeof a[s] == "object" && !Array.isArray(a[s]) ? e[s] = F(
      a[s],
      t[s]
    ) : e[s] = t[s];
  return e;
}
const R = `.cs-header[data-v-c3c54fb3]{height:60px;padding:0 16px;display:flex;align-items:center;justify-content:space-between;background-color:#f0f5ff;border-bottom:1px solid rgba(0,0,0,.05);flex-shrink:0}.cs-header-left[data-v-c3c54fb3]{display:flex;align-items:center;gap:12px}.cs-avatar[data-v-c3c54fb3]{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#3b82f6,#2563eb);color:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden}.cs-avatar svg[data-v-c3c54fb3]{width:24px;height:24px}.cs-avatar-img[data-v-c3c54fb3]{width:100%;height:100%;object-fit:cover}.cs-title[data-v-c3c54fb3]{font-size:18px;font-weight:600;color:#1a1a1a}.cs-header-right[data-v-c3c54fb3]{display:flex;align-items:center;gap:8px}.cs-icon-btn[data-v-c3c54fb3]{width:36px;height:36px;border:none;background:transparent;border-radius:50%;color:#9ca3af;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s cubic-bezier(.4,0,.2,1)}.cs-icon-btn[data-v-c3c54fb3]:hover{background-color:#0000000d;color:#1a1a1a}.cs-icon-btn[data-v-c3c54fb3]:active{transform:scale(.95)}.cs-icon-btn svg[data-v-c3c54fb3]{width:24px;height:24px}.cs-close-btn[data-v-c3c54fb3]{color:#9ca3af}.cs-close-btn[data-v-c3c54fb3]:hover{background-color:#0000000d;color:#1a1a1a}.cs-welcome-section[data-v-d56a62e7]{padding:16px}.cs-welcome-card[data-v-d56a62e7]{background:#fff;border-radius:16px;padding:16px;box-shadow:0 4px 12px #00000014;display:flex;flex-direction:column;gap:12px}.cs-welcome-header[data-v-d56a62e7]{display:flex;align-items:center;justify-content:space-between;gap:12px;padding-bottom:12px;border-bottom:1px solid rgba(0,0,0,.08)}.cs-welcome-left[data-v-d56a62e7]{display:flex;align-items:center;gap:12px;flex:1;min-width:0}.cs-avatar[data-v-d56a62e7]{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#667eea,#764ba2);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#fff;box-shadow:0 2px 8px #3b82f633}.cs-avatar svg[data-v-d56a62e7]{width:24px;height:24px}.cs-welcome-text[data-v-d56a62e7]{flex:1;min-width:0}.cs-welcome-title[data-v-d56a62e7]{font-size:16px;font-weight:600;color:#1a1a1a;line-height:1.4;margin-bottom:2px}.cs-welcome-subtitle[data-v-d56a62e7]{font-size:12px;color:#9ca3af;line-height:1.4}.cs-refresh-btn[data-v-d56a62e7]{display:flex;flex-direction:column;align-items:center;gap:4px;padding:8px;background:transparent;border:none;border-radius:8px;color:#3b82f6;font-size:11px;cursor:pointer;transition:all .2s cubic-bezier(.4,0,.2,1);flex-shrink:0;white-space:nowrap}.cs-refresh-btn[data-v-d56a62e7]:hover{background-color:#3b82f614}.cs-refresh-btn[data-v-d56a62e7]:active{transform:scale(.95)}.cs-refresh-btn svg[data-v-d56a62e7]{width:18px;height:18px;transition:transform .5s ease}.cs-refresh-btn svg.rotate-animating[data-v-d56a62e7]{animation:rotate-d56a62e7 .5s ease-in-out}.cs-refresh-btn span[data-v-d56a62e7]{font-size:11px}@keyframes rotate-d56a62e7{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.cs-questions-list[data-v-d56a62e7]{display:flex;flex-direction:column;gap:8px}.cs-question-item[data-v-d56a62e7]{background:#f0f5ff;border-radius:12px;padding:12px 16px;display:flex;align-items:center;justify-content:space-between;gap:12px;cursor:pointer;transition:all .2s cubic-bezier(.4,0,.2,1)}.cs-question-item[data-v-d56a62e7]:hover{background:#f3f4f6}.cs-question-item[data-v-d56a62e7]:active{transform:scale(.98)}.cs-question-text[data-v-d56a62e7]{flex:1;font-size:14px;color:#1a1a1a;line-height:1.5;word-break:break-word}@media(max-width:480px){.cs-welcome-section[data-v-d56a62e7],.cs-welcome-card[data-v-d56a62e7]{padding:12px}.cs-welcome-title[data-v-d56a62e7]{font-size:14px}.cs-welcome-subtitle[data-v-d56a62e7],.cs-question-text[data-v-d56a62e7]{font-size:12px}}.cs-message-item[data-v-ee56945d]{display:flex;gap:8px;margin-bottom:4px}.cs-message-assistant[data-v-ee56945d]{justify-content:flex-start}.cs-message-user[data-v-ee56945d]{justify-content:flex-end}.cs-message-avatar[data-v-ee56945d]{flex-shrink:0;display:flex;align-items:flex-start}.cs-avatar[data-v-ee56945d]{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden}.cs-avatar svg[data-v-ee56945d]{width:20px;height:20px}.cs-avatar-assistant[data-v-ee56945d]{background:linear-gradient(135deg,#3b82f6,#2563eb);color:#fff}.cs-avatar-user[data-v-ee56945d]{background:linear-gradient(135deg,#9ca3af,#6b7280);color:#fff}.cs-avatar-img[data-v-ee56945d]{width:100%;height:100%;object-fit:cover}.cs-message-wrapper[data-v-ee56945d]{display:flex;flex-direction:column;gap:4px;max-width:75%}.cs-message-bubble[data-v-ee56945d]{padding:12px 16px;border-radius:12px;position:relative;word-wrap:break-word;overflow-wrap:break-word}.cs-bubble-assistant[data-v-ee56945d]{background:#fff;color:#1a1a1a;border-bottom-left-radius:4px;box-shadow:0 2px 8px #0000000a}.cs-bubble-user[data-v-ee56945d]{background:linear-gradient(135deg,#3b82f6,#2563eb);color:#fff;border-bottom-right-radius:4px;box-shadow:0 2px 8px #3b82f633}.cs-message-content[data-v-ee56945d]{font-size:15px;line-height:1.6;white-space:pre-wrap;word-break:break-word}.cs-bubble-user .cs-message-content[data-v-ee56945d]{color:#fff}.cs-streaming-indicator[data-v-ee56945d]{display:inline-flex;align-items:center;gap:4px;margin-left:8px;vertical-align:middle}.cs-dot[data-v-ee56945d]{width:6px;height:6px;border-radius:50%;background-color:currentColor;animation:dotBounce-ee56945d 1.4s infinite ease-in-out both}.cs-dot[data-v-ee56945d]:nth-child(1){animation-delay:-.32s}.cs-dot[data-v-ee56945d]:nth-child(2){animation-delay:-.16s}@keyframes dotBounce-ee56945d{0%,80%,to{transform:scale(.8);opacity:.5}40%{transform:scale(1);opacity:1}}.cs-feedback-actions[data-v-ee56945d]{display:flex;gap:12px;padding-left:4px}.cs-feedback-btn[data-v-ee56945d]{display:flex;align-items:center;justify-content:center;width:28px;height:28px;border:1px solid rgba(0,0,0,.08);background:#fff;border-radius:4px;color:#9ca3af;cursor:pointer;transition:all .2s cubic-bezier(.4,0,.2,1)}.cs-feedback-btn svg[data-v-ee56945d]{width:8px;height:8px}.cs-feedback-btn[data-v-ee56945d]:hover{border-color:#3b82f6;color:#3b82f6;background:#3b82f60d}.cs-feedback-btn[data-v-ee56945d]:active{transform:scale(.95)}.cs-feedback-btn-active[data-v-ee56945d]{background:#3b82f6;border-color:#3b82f6;color:#fff}.cs-feedback-btn-active[data-v-ee56945d]:hover{background:#2563eb;border-color:#2563eb;color:#fff}@media(max-width:480px){.cs-message-wrapper[data-v-ee56945d]{max-width:80%}.cs-message-content[data-v-ee56945d]{font-size:14px}}.cs-messages-list[data-v-531b4005]{display:flex;flex-direction:column;gap:12px}.cs-input-container[data-v-582889fb]{height:70px;padding:12px 16px;background-color:#f0f5ff;border-top:1px solid rgba(0,0,0,.05);flex-shrink:0}.cs-input-wrapper[data-v-582889fb]{display:flex;align-items:center;gap:12px;height:100%}.cs-input[data-v-582889fb]{flex:1;height:46px;padding:0 16px;background:#fff;border:none;border-radius:23px;font-size:15px;color:#1a1a1a;outline:none;transition:all .2s cubic-bezier(.4,0,.2,1)}.cs-input[data-v-582889fb]::placeholder{color:#9ca3af;font-size:14px}.cs-input[data-v-582889fb]:focus{box-shadow:0 0 0 2px #3b82f633}.cs-input[data-v-582889fb]:disabled{background-color:#f3f4f6;cursor:not-allowed}.cs-send-btn[data-v-582889fb]{width:46px;height:46px;border:none;border-radius:50%;background-color:#e5e7eb;color:#9ca3af;cursor:not-allowed;display:flex;align-items:center;justify-content:center;transition:all .2s cubic-bezier(.4,0,.2,1);flex-shrink:0}.cs-send-btn svg[data-v-582889fb]{width:24px;height:24px}.cs-send-btn[data-v-582889fb]:disabled{cursor:not-allowed;transform:none}.cs-send-btn-active[data-v-582889fb]{background:linear-gradient(135deg,#3b82f6,#2563eb);color:#fff;cursor:pointer;box-shadow:0 4px 12px #3b82f64d}.cs-send-btn-active[data-v-582889fb]:hover{box-shadow:0 6px 20px #667eea66;transform:scale(1.05)}.cs-send-btn-active[data-v-582889fb]:active{transform:scale(.95)}@media(max-width:480px){.cs-input-container[data-v-582889fb]{padding:10px 12px}.cs-input[data-v-582889fb]{height:42px;font-size:14px}.cs-send-btn[data-v-582889fb]{width:42px;height:42px}.cs-send-btn svg[data-v-582889fb]{width:22px;height:22px}}.cs-quick-questions[data-v-fc7fd5f8]{padding:12px 16px;background:#f0f5ff;border-top:1px solid rgba(0,0,0,.05)}.cs-questions-scroll[data-v-fc7fd5f8]{display:flex;gap:8px;overflow-x:auto;overflow-y:hidden;-webkit-overflow-scrolling:touch;scroll-behavior:smooth;-ms-overflow-style:none;scrollbar-width:none}.cs-questions-scroll[data-v-fc7fd5f8]::-webkit-scrollbar{display:none}.cs-question-chip[data-v-fc7fd5f8]{display:inline-flex;align-items:center;gap:4px;padding:8px 12px;background:#fff;border:1px solid rgba(0,0,0,.08);border-radius:9999px;white-space:nowrap;cursor:pointer;transition:all .2s cubic-bezier(.4,0,.2,1);flex-shrink:0}.cs-question-chip[data-v-fc7fd5f8]:hover{border-color:#3b82f6;color:#3b82f6;box-shadow:0 2px 8px #3b82f633}.cs-question-chip[data-v-fc7fd5f8]:active{transform:scale(.95)}.cs-question-text[data-v-fc7fd5f8]{font-size:12px;color:#1a1a1a}.cs-question-icon[data-v-fc7fd5f8]{width:8px;height:8px;flex-shrink:0;color:#9ca3af}.cs-question-chip:hover .cs-question-icon[data-v-fc7fd5f8]{color:#3b82f6}.cs-chat-window[data-v-e65cdfc5]{position:fixed;bottom:0;width:100%;height:100vh;max-height:100vh;background-color:#f0f5ff;display:flex;flex-direction:column;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,sans-serif;z-index:200}.cs-chat-window-left[data-v-e65cdfc5]{left:0;right:auto}.cs-chat-window-right[data-v-e65cdfc5]{left:auto;right:0}.cs-messages-container[data-v-e65cdfc5]{flex:1;overflow-y:auto;overflow-x:hidden;padding:20px 16px;-webkit-overflow-scrolling:touch}.cs-messages-container[data-v-e65cdfc5]::-webkit-scrollbar{width:4px}.cs-messages-container[data-v-e65cdfc5]::-webkit-scrollbar-track{background:transparent}.cs-messages-container[data-v-e65cdfc5]::-webkit-scrollbar-thumb{background:#0000001a;border-radius:2px}.cs-messages-container[data-v-e65cdfc5]::-webkit-scrollbar-thumb:hover{background:#0003}.cs-messages-list[data-v-e65cdfc5]{display:flex;flex-direction:column;gap:12px}.slide-right-enter-active[data-v-e65cdfc5],.slide-right-leave-active[data-v-e65cdfc5]{transition:transform .3s cubic-bezier(.4,0,.2,1)}.slide-right-enter-from[data-v-e65cdfc5],.slide-right-leave-to[data-v-e65cdfc5]{transform:translate(100%)}.slide-left-enter-active[data-v-e65cdfc5],.slide-left-leave-active[data-v-e65cdfc5]{transition:transform .3s cubic-bezier(.4,0,.2,1)}.slide-left-enter-from[data-v-e65cdfc5],.slide-left-leave-to[data-v-e65cdfc5]{transform:translate(-100%)}@media(min-width:768px){.cs-chat-window[data-v-e65cdfc5]{max-width:420px;bottom:20px;height:calc(100vh - 40px);max-height:800px;border-radius:16px;box-shadow:0 8px 32px #0000001a}.cs-chat-window-left[data-v-e65cdfc5]{left:20px;transform:none}.cs-chat-window-right[data-v-e65cdfc5]{right:20px;left:auto}.slide-left-enter-from[data-v-e65cdfc5],.slide-left-leave-to[data-v-e65cdfc5]{transform:translate(-100%) translateY(0)}.slide-right-enter-from[data-v-e65cdfc5],.slide-right-leave-to[data-v-e65cdfc5]{transform:translate(100%) translateY(0)}}
`, rt = {
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
class ct {
  app = null;
  container = null;
  shadowRoot = null;
  eventListeners = /* @__PURE__ */ new Map();
  isOpen = g(!1);
  config = ae({});
  messages = g([]);
  isLoading = g(!1);
  unreadCount = g(0);
  constructor(t = {}) {
    Object.assign(this.config, F(rt, t)), this.loadHistory();
  }
  /**
   * 挂载SDK到页面
   */
  mount(t) {
    if (this.app) {
      console.warn("[ChatSDK] SDK already mounted");
      return;
    }
    const e = typeof t == "string" ? document.querySelector(t) : t || document.body;
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
    const s = document.createElement("div");
    s.id = "chat-sdk-mount-point", this.shadowRoot.appendChild(s), this.app = ne(it, {
      sdk: this
    }), this.app.mount(s), this.emit("mounted");
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
    const t = document.createElement("style");
    t.textContent = `
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
    `, this.shadowRoot.appendChild(t), this.injectComponentStyles();
  }
  /**
   * 注入组件样式到 Shadow DOM
   */
  injectComponentStyles() {
    if (!this.shadowRoot) return;
    const t = document.createElement("style");
    t.setAttribute("data-chat-sdk-styles", "true"), R.includes("请在构建时自动注入") ? Array.from(document.querySelectorAll("style")).forEach((s) => {
      const n = s.textContent || "";
      if (n.includes(".cs-") || n.includes(".chat-sdk")) {
        const c = s.getAttribute("data-vite-dev-id");
        if (!Array.from(this.shadowRoot.querySelectorAll("style")).some((u) => u.getAttribute("data-vite-dev-id") === c)) {
          const u = s.cloneNode(!0);
          this.shadowRoot.appendChild(u), console.log("[ChatSDK] Injected component style:", c || "unknown");
        }
      }
    }) : (t.textContent = R, this.shadowRoot.appendChild(t), console.log("[ChatSDK] Injected component styles"));
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
  async sendMessage(t) {
    if (t.trim()) {
      this.addMessage({
        id: U(),
        role: "user",
        content: t.trim(),
        timestamp: Date.now()
      }), this.isLoading.value = !0;
      try {
        await this.emitAsync("sendMessage", t);
      } catch (e) {
        console.error("[ChatSDK] Send message error:", e), this.addMessage({
          id: U(),
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
  addMessage(t) {
    this.messages.value.push(t), this.saveHistory(), !this.isOpen.value && t.role === "assistant" && this.unreadCount.value++, this.emit("message", t);
  }
  /**
   * 追加消息内容（用于流式输出）
   */
  appendMessageContent(t, e) {
    const s = this.messages.value.find((n) => n.id === t);
    s && (s.content += e, s.timestamp = Date.now(), this.emit("messageUpdate", s));
  }
  /**
   * 结束消息流式输出
   */
  finishMessageStream(t) {
    const e = this.messages.value.find((s) => s.id === t);
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
  handleSendMessage(t) {
    return this.sendMessage(t);
  }
  /**
   * 处理点击推荐问题（由组件内部调用）
   */
  handleAskQuestion(t) {
    this.sendMessage(t.text);
  }
  /**
   * 处理点赞点踩反馈（由组件内部调用）
   */
  handleFeedback(t) {
    const { messageId: e, type: s } = t, n = this.messages.value.find((c) => c.id === e);
    n && n.role === "assistant" && (n.feedback = s || void 0, this.saveHistory(), this.emit("feedback", n));
  }
  /**
   * 处理流式消息完成（由组件内部调用）
   */
  handleStreamingComplete(t, e) {
    const s = this.messages.value.find((n) => n.id === t);
    s ? (s.content = e, s.isStreaming = !1, s.timestamp = Date.now()) : this.addMessage({
      id: t,
      role: "assistant",
      content: e,
      isStreaming: !1,
      timestamp: Date.now()
    }), this.saveHistory();
  }
  /**
   * 加载历史记录
   */
  loadHistory() {
    if (this.config.enableHistory)
      try {
        const t = localStorage.getItem("chat-sdk-history");
        if (t) {
          const e = JSON.parse(t), s = Date.now(), n = this.config.maxHistoryDays * 24 * 60 * 60 * 1e3;
          this.messages.value = e.filter((c) => s - c.timestamp < n);
        }
      } catch (t) {
        console.error("[ChatSDK] Load history error:", t);
      }
  }
  /**
   * 保存历史记录
   */
  saveHistory() {
    if (this.config.enableHistory)
      try {
        localStorage.setItem("chat-sdk-history", JSON.stringify(this.messages.value));
      } catch (t) {
        console.error("[ChatSDK] Save history error:", t);
      }
  }
  /**
   * 触发事件
   */
  emit(t, e) {
    const s = this.eventListeners.get(t);
    s && s.forEach((n) => n(e));
  }
  /**
   * 异步触发事件并等待
   */
  async emitAsync(t, e) {
    const s = this.eventListeners.get(t);
    if (s && s.size > 0) {
      const n = Array.from(s).map((c) => Promise.resolve(c(e)));
      return Promise.all(n);
    }
    return Promise.resolve();
  }
  /**
   * 监听事件
   */
  on(t, e) {
    this.eventListeners.has(t) || this.eventListeners.set(t, /* @__PURE__ */ new Set()), this.eventListeners.get(t).add(e);
  }
  /**
   * 取消监听事件
   */
  off(t, e) {
    const s = this.eventListeners.get(t);
    s && s.delete(e);
  }
  /**
   * 更新配置
   */
  updateConfig(t) {
    Object.assign(this.config, F(this.config, t));
  }
}
function dt(a) {
  return new ct(a);
}
export {
  ct as ChatSDK,
  dt as createChatSDK,
  ct as default
};

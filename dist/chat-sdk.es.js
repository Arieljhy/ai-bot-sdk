import { defineComponent as S, createElementBlock as f, openBlock as c, createElementVNode as o, toDisplayString as T, ref as v, createCommentVNode as k, normalizeClass as Q, Fragment as Y, renderList as X, watch as H, computed as V, createBlock as I, withDirectives as re, withKeys as ce, vModelText as le, nextTick as N, Transition as ne, withCtx as oe, onUnmounted as de, onMounted as fe, createVNode as P, unref as K, reactive as ue, createApp as he } from "vue";
const ve = { class: "cs-header" }, ge = { class: "cs-header-left" }, me = { class: "cs-avatar" }, pe = {
  key: 0,
  viewBox: "0 0 24 24",
  fill: "currentColor"
}, be = ["src"], xe = { class: "cs-title" }, we = { class: "cs-header-right" }, ke = /* @__PURE__ */ S({
  __name: "ChatHeader",
  props: {
    title: { default: "智能客服" },
    avatar: {}
  },
  emits: ["close", "menu"],
  setup(e) {
    return (t, a) => (c(), f("div", ve, [
      o("div", ge, [
        o("div", me, [
          e.avatar ? (c(), f("img", {
            key: 1,
            src: e.avatar,
            alt: "智能客服",
            class: "cs-avatar-img"
          }, null, 8, be)) : (c(), f("svg", pe, [...a[2] || (a[2] = [
            o("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }, null, -1)
          ])]))
        ]),
        o("span", xe, T(e.title), 1)
      ]),
      o("div", we, [
        o("button", {
          class: "cs-icon-btn",
          onClick: a[0] || (a[0] = (s) => t.$emit("menu"))
        }, [...a[3] || (a[3] = [
          o("svg", {
            viewBox: "0 0 24 24",
            fill: "currentColor"
          }, [
            o("path", { d: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" })
          ], -1)
        ])]),
        o("button", {
          class: "cs-icon-btn cs-close-btn",
          onClick: a[1] || (a[1] = (s) => t.$emit("close"))
        }, [...a[4] || (a[4] = [
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
}), C = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [s, n] of t)
    a[s] = n;
  return a;
}, ye = /* @__PURE__ */ C(ke, [["__scopeId", "data-v-c3c54fb3"]]), Se = { class: "cs-welcome-section" }, Ce = { class: "cs-welcome-card" }, Me = { class: "cs-welcome-header" }, $e = { class: "cs-welcome-left" }, ze = { class: "cs-welcome-text" }, Qe = { class: "cs-welcome-title" }, qe = {
  key: 0,
  class: "cs-welcome-subtitle"
}, _e = { class: "cs-questions-list" }, Ie = ["onClick"], Te = { class: "cs-question-text" }, De = /* @__PURE__ */ S({
  __name: "WelcomeSection",
  props: {
    welcomeMessage: { default: "Hi，我是智能客服" },
    quickQuestions: { default: () => [] },
    showWelcome: { type: Boolean, default: !0 }
  },
  emits: ["askQuestion", "refreshQuestions"],
  setup(e, { emit: t }) {
    const a = t, s = v(!1), n = (r) => {
      a("askQuestion", r);
    }, l = () => {
      s.value = !0, setTimeout(() => {
        s.value = !1;
      }, 500), a("refreshQuestions");
    };
    return (r, d) => (c(), f("div", Se, [
      o("div", Ce, [
        o("div", Me, [
          o("div", $e, [
            d[0] || (d[0] = o("div", { class: "cs-avatar" }, [
              o("svg", {
                viewBox: "0 0 24 24",
                fill: "currentColor"
              }, [
                o("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" })
              ])
            ], -1)),
            o("div", ze, [
              o("div", Qe, T(e.welcomeMessage), 1),
              e.showWelcome ? (c(), f("div", qe, "你可以试着问我：")) : k("", !0)
            ])
          ]),
          o("button", {
            class: "cs-refresh-btn",
            onClick: l
          }, [
            (c(), f("svg", {
              viewBox: "0 0 24 24",
              fill: "currentColor",
              class: Q({ "rotate-animating": s.value })
            }, [...d[1] || (d[1] = [
              o("path", { d: "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" }, null, -1)
            ])], 2)),
            d[2] || (d[2] = o("span", null, "换一换", -1))
          ])
        ]),
        o("div", _e, [
          (c(!0), f(Y, null, X(e.quickQuestions, (i) => (c(), f("div", {
            key: i.id,
            class: "cs-question-item",
            onClick: (g) => n(i)
          }, [
            o("div", Te, T(i.text), 1)
          ], 8, Ie))), 128))
        ])
      ])
    ]));
  }
}), Ae = /* @__PURE__ */ C(De, [["__scopeId", "data-v-d56a62e7"]]), He = {
  key: 0,
  class: "cs-message-avatar"
}, Le = { class: "cs-avatar cs-avatar-assistant" }, Oe = {
  key: 0,
  viewBox: "0 0 24 24",
  fill: "currentColor"
}, Ee = ["src"], je = { class: "cs-message-wrapper" }, Be = { class: "cs-message-content" }, Fe = {
  key: 0,
  class: "cs-streaming-indicator"
}, Pe = {
  key: 0,
  class: "cs-feedback-actions"
}, Ne = {
  key: 1,
  class: "cs-message-avatar"
}, Ke = /* @__PURE__ */ S({
  __name: "MessageItem",
  props: {
    message: {},
    avatar: {}
  },
  emits: ["feedback"],
  setup(e, { emit: t }) {
    const a = e, s = t, n = (l) => {
      a.message.feedback === l ? s("feedback", a.message.id, null) : s("feedback", a.message.id, l);
    };
    return (l, r) => (c(), f("div", {
      class: Q(["cs-message-item", `cs-message-${e.message.role}`])
    }, [
      e.message.role === "assistant" ? (c(), f("div", He, [
        o("div", Le, [
          e.avatar ? (c(), f("img", {
            key: 1,
            src: e.avatar,
            alt: "智能客服",
            class: "cs-avatar-img"
          }, null, 8, Ee)) : (c(), f("svg", Oe, [...r[2] || (r[2] = [
            o("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }, null, -1)
          ])]))
        ])
      ])) : k("", !0),
      o("div", je, [
        o("div", {
          class: Q(["cs-message-bubble", `cs-bubble-${e.message.role}`])
        }, [
          o("div", Be, T(e.message.content), 1),
          e.message.isStreaming ? (c(), f("div", Fe, [...r[3] || (r[3] = [
            o("span", { class: "cs-dot" }, null, -1),
            o("span", { class: "cs-dot" }, null, -1),
            o("span", { class: "cs-dot" }, null, -1)
          ])])) : k("", !0)
        ], 2),
        e.message.role === "assistant" && !e.message.isStreaming ? (c(), f("div", Pe, [
          o("button", {
            class: Q(["cs-feedback-btn", { "cs-feedback-btn-active": e.message.feedback === "like" }]),
            onClick: r[0] || (r[0] = (d) => n("like"))
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
            class: Q(["cs-feedback-btn", { "cs-feedback-btn-active": e.message.feedback === "dislike" }]),
            onClick: r[1] || (r[1] = (d) => n("dislike"))
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
      e.message.role === "user" ? (c(), f("div", Ne, [...r[6] || (r[6] = [
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
}), Ve = /* @__PURE__ */ C(Ke, [["__scopeId", "data-v-ee56945d"]]), Ue = { class: "cs-messages-list" }, We = /* @__PURE__ */ S({
  __name: "MessagesList",
  props: {
    messages: {},
    config: {},
    streamingMessageId: { default: void 0 },
    streamingContent: { default: "" }
  },
  emits: ["feedback"],
  setup(e, { emit: t }) {
    const a = e, s = t, n = v("");
    H(() => a.streamingContent, (i) => {
      i ? n.value = i : n.value = "";
    }, { immediate: !0 }), H(() => a.streamingMessageId, (i, g) => {
      i !== g && (n.value = "");
    });
    const l = V(() => {
      const i = [...a.messages];
      if (a.streamingMessageId && n.value) {
        const g = i.findIndex((u) => u.id === a.streamingMessageId);
        if (g >= 0) {
          const u = i[g];
          i[g] = {
            id: u.id,
            role: u.role,
            content: n.value,
            isStreaming: !0,
            timestamp: u.timestamp,
            feedback: u.feedback
          };
        } else
          i.push({
            id: a.streamingMessageId,
            role: "assistant",
            content: n.value,
            isStreaming: !0,
            timestamp: Date.now()
          });
      }
      return i;
    }), r = (i) => {
      if (i.role === "assistant")
        return a.config.avatar?.assistant;
      if (i.role === "user")
        return a.config.avatar?.user;
    }, d = (i, g) => {
      s("feedback", i, g);
    };
    return (i, g) => (c(), f("div", Ue, [
      (c(!0), f(Y, null, X(l.value, (u) => (c(), I(Ve, {
        key: u.id,
        message: u,
        avatar: r(u),
        onFeedback: d
      }, null, 8, ["message", "avatar"]))), 128))
    ]));
  }
}), Re = /* @__PURE__ */ C(We, [["__scopeId", "data-v-531b4005"]]), Ge = { class: "cs-input-container" }, Je = { class: "cs-input-wrapper" }, Ye = ["placeholder", "disabled"], Xe = ["disabled"], Ze = /* @__PURE__ */ S({
  __name: "MessageInput",
  props: {
    placeholder: { default: "你可以问我任何平台相关的问题" },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["send"],
  setup(e, { expose: t, emit: a }) {
    const s = a, n = v(""), l = v(), r = V(() => n.value.trim().length > 0), d = () => {
    }, i = () => {
      const u = n.value.trim();
      u && (n.value = "", s("send", u));
    };
    return t({
      focus: () => {
        N(() => {
          l.value?.focus();
        });
      }
    }), (u, h) => (c(), f("div", Ge, [
      o("div", Je, [
        re(o("input", {
          ref_key: "inputRef",
          ref: l,
          "onUpdate:modelValue": h[0] || (h[0] = (M) => n.value = M),
          type: "text",
          class: "cs-input",
          placeholder: e.placeholder,
          disabled: e.disabled,
          onKeydown: ce(i, ["enter"]),
          onInput: d
        }, null, 40, Ye), [
          [le, n.value]
        ]),
        o("button", {
          class: Q(["cs-send-btn", { "cs-send-btn-active": r.value }]),
          disabled: e.disabled || !r.value,
          onClick: i
        }, [...h[1] || (h[1] = [
          o("svg", {
            viewBox: "0 0 24 24",
            fill: "currentColor"
          }, [
            o("path", { d: "M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" })
          ], -1)
        ])], 10, Xe)
      ])
    ]));
  }
}), et = /* @__PURE__ */ C(Ze, [["__scopeId", "data-v-582889fb"]]), tt = {
  key: 0,
  class: "cs-quick-questions"
}, st = {
  class: "cs-questions-scroll",
  ref: "scrollContainer"
}, at = ["onClick"], nt = { class: "cs-question-text" }, ot = /* @__PURE__ */ S({
  __name: "QuickQuestions",
  props: {
    quickQuestions: { default: () => [] }
  },
  emits: ["askQuestion"],
  setup(e) {
    return (t, a) => e.quickQuestions.length > 0 ? (c(), f("div", tt, [
      o("div", st, [
        (c(!0), f(Y, null, X(e.quickQuestions, (s) => (c(), f("div", {
          key: s.id,
          class: "cs-question-chip",
          onClick: (n) => t.$emit("askQuestion", s)
        }, [
          o("span", nt, T(s.text), 1)
        ], 8, at))), 128))
      ], 512)
    ])) : k("", !0);
  }
}), it = /* @__PURE__ */ C(ot, [["__scopeId", "data-v-fc7fd5f8"]]), rt = {
  key: 0,
  class: "cs-toast"
}, ct = { class: "cs-toast-content" }, lt = { class: "cs-toast-message" }, dt = /* @__PURE__ */ S({
  __name: "index",
  props: {
    toast: {}
  },
  setup(e) {
    return (t, a) => (c(), I(ne, { name: "toast-fade" }, {
      default: oe(() => [
        e.toast ? (c(), f("div", rt, [
          o("div", ct, [
            o("div", lt, T(e.toast.message), 1)
          ])
        ])) : k("", !0)
      ]),
      _: 1
    }));
  }
}), ft = /* @__PURE__ */ C(dt, [["__scopeId", "data-v-5b0eab61"]]), ut = [
  { id: "1", text: "如何使用这个平台？" },
  { id: "2", text: "账号如何注册？" },
  { id: "3", text: "忘记密码怎么办？" },
  { id: "4", text: "如何联系人工客服？" },
  { id: "5", text: "平台支持哪些功能？" },
  { id: "6", text: "如何查看使用记录？" }
];
function ht(e = []) {
  const t = v([]), a = v([]), s = v([]), n = v(0), l = () => {
    const i = e.length > 0 ? e : ut;
    a.value = i, s.value = r(i, 2), t.value = s.value[0] || [], n.value = 0;
  }, r = (i, g) => {
    const u = [];
    for (let h = 0; h < i.length; h += g)
      u.push(i.slice(h, h + g));
    return u;
  }, d = () => {
    s.value.length !== 0 && (n.value = (n.value + 1) % s.value.length, t.value = s.value[n.value] ?? []);
  };
  return l(), {
    displayedQuestions: t,
    allQuickQuestions: a,
    refreshQuestions: d
  };
}
const ee = (e) => {
  if (typeof e == "object" && e !== null) {
    if ("choices" in e && e.choices?.[0]?.delta?.content)
      return e.choices[0].delta.content;
    if ("delta" in e && e.delta?.text)
      return e.delta.text;
    if ("content" in e && typeof e.content == "string")
      return e.content;
  }
  return typeof e == "string" ? e : "";
}, te = (e) => {
  if (!e.trim()) return null;
  if (e.startsWith("data: ")) {
    const t = e.slice(6).trim();
    if (t === "[DONE]")
      return null;
    try {
      return JSON.parse(t);
    } catch {
      return t;
    }
  }
  return e.startsWith("event: ") || e.startsWith("id: "), null;
};
function vt(e = {}) {
  const t = v(""), a = v(!1), s = v(null);
  let n = null, l = e;
  const r = async (g) => {
    const u = { ...l, ...g }, {
      url: h = "",
      method: M = "POST",
      headers: W = {},
      body: L,
      onMessage: O,
      onComplete: E,
      onError: j
    } = u;
    a.value && d(), s.value = null, a.value = !0, n = new AbortController();
    let p = "", w = null, D = !1;
    const B = () => {
      D || (D = !0, w = requestAnimationFrame(() => {
        p && (t.value += p, p = ""), D = !1, w = null;
      }));
    };
    try {
      const b = await fetch(h, {
        method: M,
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
          ...W
        },
        body: L ? JSON.stringify(L) : void 0,
        signal: n.signal
      });
      if (!b.ok)
        throw new Error(`HTTP error! status: ${b.status}`);
      if (!b.body)
        throw new Error("无法获取 ReadableStream");
      const $ = b.body.getReader(), R = new TextDecoder();
      let z = "";
      for (; ; ) {
        const { done: m, value: x } = await $.read();
        if (m) {
          if (z.trim()) {
            const F = z.split(`
`);
            for (const A of F) {
              const _ = te(A);
              if (_) {
                const G = ee(_);
                G && (p += G, O?.(G));
              }
            }
          }
          w && cancelAnimationFrame(w), p && (t.value += p, p = ""), a.value = !1, E?.();
          break;
        }
        const y = R.decode(x, { stream: !0 });
        z += y;
        const Z = z.split(`
`);
        z = Z.pop() || "";
        for (const F of Z)
          if (F.trim()) {
            const A = te(F);
            if (A) {
              if (A === "[DONE]") {
                w && cancelAnimationFrame(w), p && (t.value += p, p = ""), a.value = !1, E?.();
                return;
              }
              const _ = ee(A);
              _ && (p += _, O?.(_), B());
            }
          }
      }
    } catch (b) {
      if (w && cancelAnimationFrame(w), b.name === "AbortError" || b.message?.includes("cancel")) {
        a.value = !1;
        return;
      }
      const $ = b instanceof Error ? b : new Error(String(b));
      throw s.value = $, a.value = !1, j?.($), $;
    } finally {
      n = null;
    }
  }, d = () => {
    n && (n.abort(), n = null), a.value = !1;
  }, i = () => {
    d(), t.value = "", s.value = null;
  };
  return de(() => {
    d();
  }), {
    content: t,
    isLoading: a,
    error: s,
    start: r,
    stop: d,
    reset: i
  };
}
function gt(e, t) {
  const a = v(0);
  return {
    savedScrollTop: a,
    scrollToBottom: () => {
      N(() => {
        e.value && (e.value.scrollTop = e.value.scrollHeight);
      });
    },
    saveScrollPosition: () => {
      e.value && !t.value && (a.value = e.value.scrollTop);
    },
    restoreScrollPosition: () => {
      t.value || N(() => {
        e.value && a.value > 0 && (e.value.scrollTop = a.value);
      });
    },
    resetScrollPosition: () => {
      a.value = 0;
    },
    watchStreamingContent: () => {
      H(t, () => {
        N(() => {
          e.value && (e.value.scrollTop = e.value.scrollHeight);
        });
      });
    }
  };
}
let q = null;
const U = v(null), mt = (e, t = 3e3) => {
  q && (clearTimeout(q), q = null), U.value = { message: e, duration: t }, t > 0 && (q = setTimeout(() => {
    ie();
  }, t));
}, ie = () => {
  U.value = null, q && (clearTimeout(q), q = null);
}, pt = () => ({
  toast: U,
  show: mt,
  hide: ie
}), bt = /* @__PURE__ */ S({
  __name: "ChatWindow",
  props: {
    isOpen: { type: Boolean },
    config: {},
    messages: {},
    isLoading: { type: Boolean, default: !1 },
    toast: {}
  },
  emits: ["close", "sendMessage", "askQuestion", "feedback", "streamingComplete"],
  setup(e, { emit: t }) {
    const { show: a } = pt(), s = e, n = t, l = V(() => s.config.position || "right"), r = V(() => l.value === "left" ? "slide-left" : "slide-right"), d = v(), {
      displayedQuestions: i,
      allQuickQuestions: g,
      refreshQuestions: u
    } = ht(s.config.quickQuestions || []), h = v(), { content: M, start: W, reset: L } = vt(), {
      saveScrollPosition: O,
      restoreScrollPosition: E,
      resetScrollPosition: j,
      scrollToBottom: p,
      watchStreamingContent: w
    } = gt(d, M);
    w(), H(() => s.messages, p, { deep: !0 }), H(() => s.isOpen, (m) => {
      m && E();
    }), fe(() => {
    });
    const D = () => {
      u();
    }, B = async (m, x) => {
      L(), h.value = Date.now().toString(), await W({
        url: s.config.sseUrl || "http://localhost:3000/sse",
        method: s.config.sseMethod || "POST",
        body: {
          message: m,
          history: []
        },
        onComplete: () => {
          h.value && M.value && (x?.(h.value, M.value), j()), h.value = void 0;
        },
        onError: (y) => {
          console.error("SSE 错误:", y), a(y.message || "发生错误，请重试"), h.value && (x?.(h.value, `错误：${y.message}`), j()), h.value = void 0;
        }
      });
    }, b = (m) => {
      n("askQuestion", m), B(m.text, (x, y) => {
        n("streamingComplete", x, y);
      });
    }, $ = (m, x) => {
      n("feedback", m, x);
    }, R = (m) => {
      n("sendMessage", m), B(m, (x, y) => {
        n("streamingComplete", x, y);
      });
    }, z = () => {
      O(), n("close");
    };
    return (m, x) => (c(), I(ne, { name: r.value }, {
      default: oe(() => [
        e.isOpen ? (c(), f("div", {
          key: 0,
          class: Q(["cs-chat-window", `cs-chat-window-${l.value}`])
        }, [
          P(ye, {
            title: e.config.title || "智能客服",
            avatar: e.config.avatar?.assistant,
            onClose: z
          }, null, 8, ["title", "avatar"]),
          o("div", {
            class: "cs-messages-container",
            ref_key: "messagesContainer",
            ref: d
          }, [
            P(Ae, {
              "welcome-message": e.config.welcomeMessage || "Hi，我是���能客服",
              "quick-questions": K(i),
              "show-welcome": e.messages.length === 0,
              onAskQuestion: b,
              onRefreshQuestions: D
            }, null, 8, ["welcome-message", "quick-questions", "show-welcome"]),
            e.messages.length > 0 ? (c(), I(Re, {
              key: 0,
              messages: e.messages,
              config: e.config,
              "streaming-message-id": h.value,
              "streaming-content": K(M),
              onFeedback: $
            }, null, 8, ["messages", "config", "streaming-message-id", "streaming-content"])) : k("", !0)
          ], 512),
          e.messages.length > 0 ? (c(), I(it, {
            key: 0,
            "quick-questions": K(g),
            onAskQuestion: b
          }, null, 8, ["quick-questions"])) : k("", !0),
          P(et, {
            placeholder: e.config.placeholder || "你可以问我任何平台相关的问题",
            disabled: e.isLoading,
            onSend: R
          }, null, 8, ["placeholder", "disabled"]),
          P(ft, {
            toast: e.toast || null
          }, null, 8, ["toast"])
        ], 2)) : k("", !0)
      ]),
      _: 1
    }, 8, ["name"]));
  }
}), xt = /* @__PURE__ */ C(bt, [["__scopeId", "data-v-0bc5d315"]]), wt = /* @__PURE__ */ S({
  __name: "ChatSDKApp",
  props: {
    sdk: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    const t = U;
    return (a, s) => (c(), I(xt, {
      "is-open": e.sdk.isOpen.value,
      config: e.sdk.config,
      messages: e.sdk.messages.value,
      "is-loading": e.sdk.isLoading.value,
      toast: K(t),
      onClose: s[0] || (s[0] = (n) => e.sdk.close()),
      onSendMessage: s[1] || (s[1] = (n) => e.sdk.handleSendMessage(n)),
      onAskQuestion: s[2] || (s[2] = (n) => e.sdk.handleAskQuestion(n)),
      onFeedback: s[3] || (s[3] = (n, l) => e.sdk.handleFeedback({ messageId: n, type: l })),
      onStreamingComplete: s[4] || (s[4] = (n, l) => e.sdk.handleStreamingComplete(n, l))
    }, null, 8, ["is-open", "config", "messages", "is-loading", "toast"]));
  }
}), kt = /* @__PURE__ */ C(wt, [["__scopeId", "data-v-bf6430c2"]]);
function se() {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}
function J(e, t) {
  const a = { ...e };
  for (const s in t)
    t[s] && typeof t[s] == "object" && !Array.isArray(t[s]) && s in e && e[s] && typeof e[s] == "object" && !Array.isArray(e[s]) ? a[s] = J(
      e[s],
      t[s]
    ) : a[s] = t[s];
  return a;
}
const ae = `.cs-header[data-v-c3c54fb3]{height:60px;padding:0 16px;display:flex;align-items:center;justify-content:space-between;background-color:#f0f5ff;border-bottom:1px solid rgba(0,0,0,.05);flex-shrink:0}.cs-header-left[data-v-c3c54fb3]{display:flex;align-items:center;gap:12px}.cs-avatar[data-v-c3c54fb3]{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#3b82f6,#2563eb);color:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden}.cs-avatar svg[data-v-c3c54fb3]{width:24px;height:24px}.cs-avatar-img[data-v-c3c54fb3]{width:100%;height:100%;object-fit:cover}.cs-title[data-v-c3c54fb3]{font-size:18px;font-weight:600;color:#1a1a1a}.cs-header-right[data-v-c3c54fb3]{display:flex;align-items:center;gap:8px}.cs-icon-btn[data-v-c3c54fb3]{width:36px;height:36px;border:none;background:transparent;border-radius:50%;color:#9ca3af;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s cubic-bezier(.4,0,.2,1)}.cs-icon-btn[data-v-c3c54fb3]:hover{background-color:#0000000d;color:#1a1a1a}.cs-icon-btn[data-v-c3c54fb3]:active{transform:scale(.95)}.cs-icon-btn svg[data-v-c3c54fb3]{width:24px;height:24px}.cs-close-btn[data-v-c3c54fb3]{color:#9ca3af}.cs-close-btn[data-v-c3c54fb3]:hover{background-color:#0000000d;color:#1a1a1a}.cs-welcome-section[data-v-d56a62e7]{padding:16px}.cs-welcome-card[data-v-d56a62e7]{background:#fff;border-radius:16px;padding:16px;box-shadow:0 4px 12px #00000014;display:flex;flex-direction:column;gap:12px}.cs-welcome-header[data-v-d56a62e7]{display:flex;align-items:center;justify-content:space-between;gap:12px;padding-bottom:12px;border-bottom:1px solid rgba(0,0,0,.08)}.cs-welcome-left[data-v-d56a62e7]{display:flex;align-items:center;gap:12px;flex:1;min-width:0}.cs-avatar[data-v-d56a62e7]{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#667eea,#764ba2);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#fff;box-shadow:0 2px 8px #3b82f633}.cs-avatar svg[data-v-d56a62e7]{width:24px;height:24px}.cs-welcome-text[data-v-d56a62e7]{flex:1;min-width:0}.cs-welcome-title[data-v-d56a62e7]{font-size:16px;font-weight:600;color:#1a1a1a;line-height:1.4;margin-bottom:2px}.cs-welcome-subtitle[data-v-d56a62e7]{font-size:12px;color:#9ca3af;line-height:1.4}.cs-refresh-btn[data-v-d56a62e7]{display:flex;flex-direction:column;align-items:center;gap:4px;padding:8px;background:transparent;border:none;border-radius:8px;color:#3b82f6;font-size:11px;cursor:pointer;transition:all .2s cubic-bezier(.4,0,.2,1);flex-shrink:0;white-space:nowrap}.cs-refresh-btn[data-v-d56a62e7]:hover{background-color:#3b82f614}.cs-refresh-btn[data-v-d56a62e7]:active{transform:scale(.95)}.cs-refresh-btn svg[data-v-d56a62e7]{width:18px;height:18px;transition:transform .5s ease}.cs-refresh-btn svg.rotate-animating[data-v-d56a62e7]{animation:rotate-d56a62e7 .5s ease-in-out}.cs-refresh-btn span[data-v-d56a62e7]{font-size:11px}@keyframes rotate-d56a62e7{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.cs-questions-list[data-v-d56a62e7]{display:flex;flex-direction:column;gap:8px}.cs-question-item[data-v-d56a62e7]{background:#f0f5ff;border-radius:12px;padding:12px 16px;display:flex;align-items:center;justify-content:space-between;gap:12px;cursor:pointer;transition:all .2s cubic-bezier(.4,0,.2,1)}.cs-question-item[data-v-d56a62e7]:hover{background:#f3f4f6}.cs-question-item[data-v-d56a62e7]:active{transform:scale(.98)}.cs-question-text[data-v-d56a62e7]{flex:1;font-size:14px;color:#1a1a1a;line-height:1.5;word-break:break-word}@media(max-width:480px){.cs-welcome-section[data-v-d56a62e7],.cs-welcome-card[data-v-d56a62e7]{padding:12px}.cs-welcome-title[data-v-d56a62e7]{font-size:14px}.cs-welcome-subtitle[data-v-d56a62e7],.cs-question-text[data-v-d56a62e7]{font-size:12px}}.cs-message-item[data-v-ee56945d]{display:flex;gap:8px;margin-bottom:4px}.cs-message-assistant[data-v-ee56945d]{justify-content:flex-start}.cs-message-user[data-v-ee56945d]{justify-content:flex-end}.cs-message-avatar[data-v-ee56945d]{flex-shrink:0;display:flex;align-items:flex-start}.cs-avatar[data-v-ee56945d]{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden}.cs-avatar svg[data-v-ee56945d]{width:20px;height:20px}.cs-avatar-assistant[data-v-ee56945d]{background:linear-gradient(135deg,#3b82f6,#2563eb);color:#fff}.cs-avatar-user[data-v-ee56945d]{background:linear-gradient(135deg,#9ca3af,#6b7280);color:#fff}.cs-avatar-img[data-v-ee56945d]{width:100%;height:100%;object-fit:cover}.cs-message-wrapper[data-v-ee56945d]{display:flex;flex-direction:column;gap:4px;max-width:75%}.cs-message-bubble[data-v-ee56945d]{padding:12px 16px;border-radius:12px;position:relative;word-wrap:break-word;overflow-wrap:break-word}.cs-bubble-assistant[data-v-ee56945d]{background:#fff;color:#1a1a1a;border-bottom-left-radius:4px;box-shadow:0 2px 8px #0000000a}.cs-bubble-user[data-v-ee56945d]{background:linear-gradient(135deg,#3b82f6,#2563eb);color:#fff;border-bottom-right-radius:4px;box-shadow:0 2px 8px #3b82f633}.cs-message-content[data-v-ee56945d]{font-size:15px;line-height:1.6;white-space:pre-wrap;word-break:break-word}.cs-bubble-user .cs-message-content[data-v-ee56945d]{color:#fff}.cs-streaming-indicator[data-v-ee56945d]{display:inline-flex;align-items:center;gap:4px;margin-left:8px;vertical-align:middle}.cs-dot[data-v-ee56945d]{width:6px;height:6px;border-radius:50%;background-color:currentColor;animation:dotBounce-ee56945d 1.4s infinite ease-in-out both}.cs-dot[data-v-ee56945d]:nth-child(1){animation-delay:-.32s}.cs-dot[data-v-ee56945d]:nth-child(2){animation-delay:-.16s}@keyframes dotBounce-ee56945d{0%,80%,to{transform:scale(.8);opacity:.5}40%{transform:scale(1);opacity:1}}.cs-feedback-actions[data-v-ee56945d]{display:flex;gap:12px;padding-left:4px}.cs-feedback-btn[data-v-ee56945d]{display:flex;align-items:center;justify-content:center;width:28px;height:28px;border:1px solid rgba(0,0,0,.08);background:#fff;border-radius:4px;color:#9ca3af;cursor:pointer;transition:all .2s cubic-bezier(.4,0,.2,1)}.cs-feedback-btn svg[data-v-ee56945d]{width:8px;height:8px}.cs-feedback-btn[data-v-ee56945d]:hover{border-color:#3b82f6;color:#3b82f6;background:#3b82f60d}.cs-feedback-btn[data-v-ee56945d]:active{transform:scale(.95)}.cs-feedback-btn-active[data-v-ee56945d]{background:#3b82f6;border-color:#3b82f6;color:#fff}.cs-feedback-btn-active[data-v-ee56945d]:hover{background:#2563eb;border-color:#2563eb;color:#fff}@media(max-width:480px){.cs-message-wrapper[data-v-ee56945d]{max-width:80%}.cs-message-content[data-v-ee56945d]{font-size:14px}}.cs-messages-list[data-v-531b4005]{display:flex;flex-direction:column;gap:12px}.cs-input-container[data-v-582889fb]{height:70px;padding:12px 16px;background-color:#f0f5ff;border-top:1px solid rgba(0,0,0,.05);flex-shrink:0}.cs-input-wrapper[data-v-582889fb]{display:flex;align-items:center;gap:12px;height:100%}.cs-input[data-v-582889fb]{flex:1;height:46px;padding:0 16px;background:#fff;border:none;border-radius:23px;font-size:15px;color:#1a1a1a;outline:none;transition:all .2s cubic-bezier(.4,0,.2,1)}.cs-input[data-v-582889fb]::placeholder{color:#9ca3af;font-size:14px}.cs-input[data-v-582889fb]:focus{box-shadow:0 0 0 2px #3b82f633}.cs-input[data-v-582889fb]:disabled{background-color:#f3f4f6;cursor:not-allowed}.cs-send-btn[data-v-582889fb]{width:46px;height:46px;border:none;border-radius:50%;background-color:#e5e7eb;color:#9ca3af;cursor:not-allowed;display:flex;align-items:center;justify-content:center;transition:all .2s cubic-bezier(.4,0,.2,1);flex-shrink:0}.cs-send-btn svg[data-v-582889fb]{width:24px;height:24px}.cs-send-btn[data-v-582889fb]:disabled{cursor:not-allowed;transform:none}.cs-send-btn-active[data-v-582889fb]{background:linear-gradient(135deg,#3b82f6,#2563eb);color:#fff;cursor:pointer;box-shadow:0 4px 12px #3b82f64d}.cs-send-btn-active[data-v-582889fb]:hover{box-shadow:0 6px 20px #667eea66;transform:scale(1.05)}.cs-send-btn-active[data-v-582889fb]:active{transform:scale(.95)}@media(max-width:480px){.cs-input-container[data-v-582889fb]{padding:10px 12px}.cs-input[data-v-582889fb]{height:42px;font-size:14px}.cs-send-btn[data-v-582889fb]{width:42px;height:42px}.cs-send-btn svg[data-v-582889fb]{width:22px;height:22px}}.cs-quick-questions[data-v-fc7fd5f8]{padding:12px 16px;background:#f0f5ff;border-top:1px solid rgba(0,0,0,.05)}.cs-questions-scroll[data-v-fc7fd5f8]{display:flex;gap:8px;overflow-x:auto;overflow-y:hidden;-webkit-overflow-scrolling:touch;scroll-behavior:smooth;-ms-overflow-style:none;scrollbar-width:none}.cs-questions-scroll[data-v-fc7fd5f8]::-webkit-scrollbar{display:none}.cs-question-chip[data-v-fc7fd5f8]{display:inline-flex;align-items:center;gap:4px;padding:8px 12px;background:#fff;border:1px solid rgba(0,0,0,.08);border-radius:9999px;white-space:nowrap;cursor:pointer;transition:all .2s cubic-bezier(.4,0,.2,1);flex-shrink:0}.cs-question-chip[data-v-fc7fd5f8]:hover{border-color:#3b82f6;color:#3b82f6;box-shadow:0 2px 8px #3b82f633}.cs-question-chip[data-v-fc7fd5f8]:active{transform:scale(.95)}.cs-question-text[data-v-fc7fd5f8]{font-size:12px;color:#1a1a1a}.cs-question-icon[data-v-fc7fd5f8]{width:8px;height:8px;flex-shrink:0;color:#9ca3af}.cs-question-chip:hover .cs-question-icon[data-v-fc7fd5f8]{color:#3b82f6}.cs-chat-window[data-v-e65cdfc5]{position:fixed;bottom:0;width:100%;height:100vh;max-height:100vh;background-color:#f0f5ff;display:flex;flex-direction:column;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,sans-serif;z-index:200}.cs-chat-window-left[data-v-e65cdfc5]{left:0;right:auto}.cs-chat-window-right[data-v-e65cdfc5]{left:auto;right:0}.cs-messages-container[data-v-e65cdfc5]{flex:1;overflow-y:auto;overflow-x:hidden;padding:20px 16px;-webkit-overflow-scrolling:touch}.cs-messages-container[data-v-e65cdfc5]::-webkit-scrollbar{width:4px}.cs-messages-container[data-v-e65cdfc5]::-webkit-scrollbar-track{background:transparent}.cs-messages-container[data-v-e65cdfc5]::-webkit-scrollbar-thumb{background:#0000001a;border-radius:2px}.cs-messages-container[data-v-e65cdfc5]::-webkit-scrollbar-thumb:hover{background:#0003}.cs-messages-list[data-v-e65cdfc5]{display:flex;flex-direction:column;gap:12px}.slide-right-enter-active[data-v-e65cdfc5],.slide-right-leave-active[data-v-e65cdfc5]{transition:transform .3s cubic-bezier(.4,0,.2,1)}.slide-right-enter-from[data-v-e65cdfc5],.slide-right-leave-to[data-v-e65cdfc5]{transform:translate(100%)}.slide-left-enter-active[data-v-e65cdfc5],.slide-left-leave-active[data-v-e65cdfc5]{transition:transform .3s cubic-bezier(.4,0,.2,1)}.slide-left-enter-from[data-v-e65cdfc5],.slide-left-leave-to[data-v-e65cdfc5]{transform:translate(-100%)}@media(min-width:768px){.cs-chat-window[data-v-e65cdfc5]{max-width:420px;bottom:20px;height:calc(100vh - 40px);max-height:800px;border-radius:16px;box-shadow:0 8px 32px #0000001a}.cs-chat-window-left[data-v-e65cdfc5]{left:20px;transform:none}.cs-chat-window-right[data-v-e65cdfc5]{right:20px;left:auto}.slide-left-enter-from[data-v-e65cdfc5],.slide-left-leave-to[data-v-e65cdfc5]{transform:translate(-100%) translateY(0)}.slide-right-enter-from[data-v-e65cdfc5],.slide-right-leave-to[data-v-e65cdfc5]{transform:translate(100%) translateY(0)}}
`, yt = {
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
class St {
  app = null;
  container = null;
  shadowRoot = null;
  eventListeners = /* @__PURE__ */ new Map();
  isOpen = v(!1);
  config = ue({});
  messages = v([]);
  isLoading = v(!1);
  unreadCount = v(0);
  constructor(t = {}) {
    Object.assign(this.config, J(yt, t)), this.loadHistory();
  }
  /**
   * 挂载SDK到页面
   */
  mount(t) {
    if (this.app) {
      console.warn("[ChatSDK] SDK already mounted");
      return;
    }
    const a = typeof t == "string" ? document.querySelector(t) : t || document.body;
    if (!a) {
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
    `, a.appendChild(this.container), this.shadowRoot = this.container.attachShadow({ mode: "open" }), this.injectGlobalStyles();
    const s = document.createElement("div");
    s.id = "chat-sdk-mount-point", this.shadowRoot.appendChild(s), this.app = he(kt, {
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
    if (this.shadowRoot && !ae.includes("请在构建时自动注入")) {
      const t = document.createElement("style");
      t.textContent = ae, this.shadowRoot.appendChild(t);
    }
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
        id: se(),
        role: "user",
        content: t.trim(),
        timestamp: Date.now()
      }), this.isLoading.value = !0;
      try {
        await this.emitAsync("sendMessage", t);
      } catch (a) {
        console.error("[ChatSDK] Send message error:", a), this.addMessage({
          id: se(),
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
  appendMessageContent(t, a) {
    const s = this.messages.value.find((n) => n.id === t);
    s && (s.content += a, s.timestamp = Date.now(), this.emit("messageUpdate", s));
  }
  /**
   * 结束消息流式输出
   */
  finishMessageStream(t) {
    const a = this.messages.value.find((s) => s.id === t);
    a && (a.isStreaming = !1, a.timestamp = Date.now(), this.saveHistory(), this.emit("messageComplete", a));
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
    const { messageId: a, type: s } = t, n = this.messages.value.find((l) => l.id === a);
    n && n.role === "assistant" && (n.feedback = s || void 0, this.saveHistory(), this.emit("feedback", n));
  }
  /**
   * 处理流式消息完成（由组件内部调用）
   */
  handleStreamingComplete(t, a) {
    const s = this.messages.value.find((n) => n.id === t);
    s ? (s.content = a, s.isStreaming = !1, s.timestamp = Date.now()) : this.addMessage({
      id: t,
      role: "assistant",
      content: a,
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
          const a = JSON.parse(t), s = Date.now(), n = this.config.maxHistoryDays * 24 * 60 * 60 * 1e3;
          this.messages.value = a.filter((l) => s - l.timestamp < n);
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
  emit(t, a) {
    const s = this.eventListeners.get(t);
    s && s.forEach((n) => n(a));
  }
  /**
   * 异步触发事件并等待
   */
  async emitAsync(t, a) {
    const s = this.eventListeners.get(t);
    if (s && s.size > 0) {
      const n = Array.from(s).map((l) => Promise.resolve(l(a)));
      return Promise.all(n);
    }
    return Promise.resolve();
  }
  /**
   * 监听事件
   */
  on(t, a) {
    this.eventListeners.has(t) || this.eventListeners.set(t, /* @__PURE__ */ new Set()), this.eventListeners.get(t).add(a);
  }
  /**
   * 取消监听事件
   */
  off(t, a) {
    const s = this.eventListeners.get(t);
    s && s.delete(a);
  }
  /**
   * 更新配置
   */
  updateConfig(t) {
    Object.assign(this.config, J(this.config, t));
  }
}
function Mt(e) {
  return new St(e);
}
export {
  St as ChatSDK,
  Mt as createChatSDK,
  St as default
};

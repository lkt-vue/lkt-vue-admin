import { defineComponent as A, inject as g, resolveComponent as x, createBlock as L, createCommentVNode as E, unref as e, openBlock as f, mergeProps as $, isRef as X, computed as k, createElementBlock as B, normalizeClass as Y, createVNode as F, ref as o, watch as P, nextTick as K, onMounted as Z } from "vue";
import { ButtonType as T, WebPageController as O, MenuEntryType as U, WebItemsController as S, AppSize as y, FieldType as b, ColumnType as w, TableRowType as q, TableType as M, ItemCrudButtonNavVisibility as G, ItemCrudMode as V, FormInstance as z, FieldAutoValidationTrigger as N } from "lkt-vue-kernel";
import { useRoute as I, useRouter as j } from "vue-router";
import { createHTTPGetResource as J, createHTTPPostResource as ee, createHTTPPutResource as te, createHTTPDeleteResource as ae } from "lkt-http-client";
const ne = /* @__PURE__ */ A({
  __name: "LktAdminMenuButton",
  setup(u) {
    const a = g("adminMenu"), n = g("lktAdminEnabled");
    return (l, t) => {
      const r = x("lkt-button");
      return e(n) ? (f(), L(r, $({
        key: 0,
        checked: e(a),
        "onUpdate:checked": t[0] || (t[0] = (c) => X(a) ? a.value = c : null)
      }, {
        type: e(T).HiddenSwitch,
        icon: "lkt-icn-lkt",
        class: "lkt-admin-button"
      }), null, 16, ["checked"])) : E("", !0);
    };
  }
}), oe = /* @__PURE__ */ A({
  __name: "LktAdminMenu",
  setup(u) {
    const a = g("adminMenu"), n = k(() => {
      let l = [];
      return O.hasDefaultPageEnabled() && l.push({
        key: "web-pages",
        type: U.Entry,
        icon: "lkt-icn-webpage",
        anchor: {
          to: "/admin/web-pages/0",
          text: "Pages",
          events: {
            click: () => {
              a.value = !1;
            }
          }
        }
      }), O.getPages().forEach((t) => {
        l.push({
          key: t.code,
          type: U.Entry,
          icon: "lkt-icn-webpage",
          anchor: {
            to: `/admin/web-pages/${t.id}`,
            text: t.label,
            events: {
              click: () => {
                a.value = !1;
              }
            }
          }
        });
      }), S.getItems().forEach((t) => {
        l.push({
          key: t.code,
          type: U.Entry,
          icon: t.icon,
          anchor: {
            to: `/admin/web-items/${t.code}`,
            text: t.labelMany,
            events: {
              click: () => {
                a.value = !1;
              }
            }
          }
        });
      }), l.push(
        {
          key: "translations",
          type: U.Entry,
          icon: "lkt-icn-lang-picker",
          anchor: {
            to: "/admin/i18n",
            text: "Translations",
            events: {
              click: () => {
                a.value = !1;
              }
            }
          }
        }
      ), l;
    });
    return (l, t) => {
      const r = x("lkt-menu");
      return f(), B("div", {
        class: Y(["lkt-admin-menu", e(a) ? "is-opened" : ""])
      }, [
        F(r, {
          "model-value": n.value,
          onClickOutside: t[0] || (t[0] = (c) => a.value = !1)
        }, null, 8, ["model-value"])
      ], 2);
    };
  }
}), le = { class: "lkt-admin-spa lkt-admin-pages" }, re = /* @__PURE__ */ A({
  __name: "LktAdminPagesSpa",
  setup(u) {
    const a = I(), n = o(a.params.type), l = o(a.params.id), t = o({
      name: "",
      type: n.value
    }), r = o([]), c = o(null);
    P(a, (s) => {
      n.value = a.params.type, l.value = a.params.id, t.value.type = n.value;
    }, { flush: "pre", immediate: !0, deep: !0 });
    let i = g("lktAppSize");
    i || (i = o(y.MD));
    const d = k(() => [
      {
        type: w.Field,
        key: "name",
        label: "__:common.column.name",
        isForAccordionHeader: !0,
        field: {
          type: b.Text,
          icon: "lkt-icn-webpage"
        }
      },
      {
        type: w.Button,
        key: "details",
        label: "Details",
        button: {
          type: T.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (s) => `/admin/web-pages/${n.value}/${s.id}`
          }
        }
      }
    ]), m = k(() => {
      let s = "Web Pages";
      return O.getPages().forEach((p) => {
        if (p.id == n.value) {
          s = p.label ?? "Web Pages";
          return;
        }
      }), s;
    });
    return (s, p) => {
      const _ = x("lkt-table");
      return f(), B("section", le, [
        F(_, $({
          ref_key: "spaRef",
          ref: c,
          modelValue: r.value,
          "onUpdate:modelValue": p[0] || (p[0] = (v) => r.value = v)
        }, {
          type: e(i) < e(y).MD ? e(M).Accordion : e(M).Table,
          rowDisplayType: e(q).PreferColumns,
          title: m.value,
          titleTag: "h1",
          titleIcon: "lkt-icn-webpage",
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          columns: d.value,
          paginator: {
            resource: "ls-web-pages-type",
            resourceData: t.value
          },
          createButton: {
            icon: "lkt-icn-more",
            type: e(T).Anchor,
            anchor: {
              to: `/admin/web-pages/${n.value}/0`
            }
          },
          itemsContainerClass: e(i) < e(y).MD ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          }
        }), null, 16, ["modelValue"])
      ]);
    };
  }
}), ie = { class: "lkt-admin-spa" }, ue = /* @__PURE__ */ A({
  __name: "LktAdminPageSpa",
  setup(u) {
    const a = I(), n = j(), l = o(a.params.type), t = o(a.params.id);
    P(a, (i) => {
      l.value = a.params.type, t.value = a.params.id;
    }, { flush: "pre", immediate: !0, deep: !0 });
    const r = o({}), c = (i) => `/admin/web-pages/${l.value}/${i}`;
    return (i, d) => {
      const m = x("lkt-web-page");
      return f(), B("section", ie, [
        F(m, {
          modelValue: r.value,
          "onUpdate:modelValue": d[0] || (d[0] = (s) => r.value = s),
          "crud-config": {
            readResource: "r-web-page",
            readData: {
              id: t.value
            },
            mode: t.value > 0 ? e(V).Update : e(V).Create,
            buttonNavVisibility: e(G).Always,
            editing: !0,
            perms: ["update"],
            createButton: {
              resource: "mk-web-page",
              resourceData: { ...r.value, type: l.value },
              text: "Create",
              disabled: !1
            },
            updateButton: {
              resource: "up-web-page",
              resourceData: r.value,
              text: "Update",
              disabled: !1
            },
            dropButton: {
              resource: "rm-web-page",
              resourceData: r.value,
              text: "Remove",
              disabled: !1,
              events: {
                click: () => {
                  e(n).back();
                }
              }
            },
            redirectOnCreate: c
          },
          "modal-crud-config": {
            readResource: "r-web-element",
            createButton: {
              resource: "mk-web-element"
            },
            updateButton: {
              resource: "up-web-element"
            },
            dropButton: {
              resource: "rm-web-element"
            }
          },
          "file-browser-config": {
            http: {
              resource: "file-browser"
            },
            entityCreateButton: {
              text: "Create",
              resource: "mk-file-entity"
            },
            entityUpdateButton: {
              text: "Update",
              resource: "up-file-entity"
            }
          }
        }, null, 8, ["modelValue", "crud-config"])
      ]);
    };
  }
}), se = {
  key: 0,
  class: "lkt-admin-spa lkt-admin-translations"
}, de = /* @__PURE__ */ A({
  __name: "LktAdminTranslationsSpa",
  setup(u) {
    const a = g("lktAdminEnabled");
    a.value || (window.location.href = "/");
    const n = I(), l = o(n.params.id), t = o({
      name: ""
    }), r = o([]), c = o(null);
    P(n, (s) => {
      l.value = n.params.id;
    }, { flush: "pre", immediate: !0, deep: !0 });
    let i = g("lktAppSize");
    i || (i = o(y.MD));
    const d = k(() => [
      {
        type: w.Field,
        key: "property",
        label: "Property",
        isForAccordionHeader: !0,
        field: {
          type: b.Text,
          icon: "lkt-icn-lang-picker"
        }
      },
      {
        type: w.Field,
        key: "type",
        label: "Type",
        ensureFieldLabel: i.value < y.MD,
        field: {
          type: b.Select,
          options: [b.Text, b.Textarea]
        }
      },
      {
        type: w.Field,
        key: "value",
        label: "Value",
        ensureFieldLabel: i.value < y.MD,
        field: {
          type: "prop:type",
          readModeConfig: {
            textMaxLength: 10
          }
        }
      },
      {
        type: w.Button,
        key: "details",
        label: "Details",
        button: {
          type: T.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (s) => `/admin/i18n/${s.id}`
          }
        }
      }
    ]), m = k(() => "Translations");
    return (s, p) => {
      const _ = x("lkt-table");
      return e(a) ? (f(), B("section", se, [
        F(_, $({
          ref_key: "spaRef",
          ref: c,
          modelValue: r.value,
          "onUpdate:modelValue": p[0] || (p[0] = (v) => r.value = v)
        }, {
          type: e(i) < e(y).MD ? e(M).Accordion : e(M).Table,
          rowDisplayType: e(q).PreferColumns,
          header: {
            text: m.value,
            icon: "lkt-icn-lang-picker",
            tag: "h1"
          },
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          columns: d.value,
          paginator: {
            resource: "ls-lkt-i18n",
            resourceData: t.value
          },
          createButton: {
            icon: "lkt-icn-more",
            text: "Add translation",
            type: e(T).Anchor,
            anchor: {
              to: "/admin/i18n/new"
            }
          },
          itemsContainerClass: e(i) < e(y).MD ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          }
        }), null, 16, ["modelValue"])
      ])) : E("", !0);
    };
  }
}), ce = {
  key: 0,
  class: "lkt-admin-spa"
}, me = /* @__PURE__ */ A({
  __name: "LktAdminTranslationSpa",
  setup(u) {
    const a = g("lktAdminEnabled");
    a.value || (window.location.href = "/");
    const n = I(), l = j(), t = o(parseInt(n.params.id)), r = o(!1), c = o(["create", "switch-edit-mode"]);
    P(n, (s) => {
      t.value = parseInt(n.params.id);
    }, { flush: "pre", immediate: !0, deep: !0 });
    const i = o({
      property: "",
      type: b.Text,
      value: "",
      valueData: {}
    }), d = (s) => `/admin/i18n/${s}`, m = k(() => ({
      items: [
        z.mkFieldItemConfig("property", {
          type: b.Text,
          label: "Property",
          mandatory: !0,
          validation: {
            trigger: N.Blur
          }
        }),
        z.mkFieldItemConfig("type", {
          type: b.Select,
          mandatory: !0,
          label: "Type",
          options: [b.Text, b.Textarea],
          validation: {
            trigger: N.Blur
          }
        }),
        z.mkFieldItemConfig("valueData", {
          type: i.value.type,
          mandatory: !0,
          canI18n: !0,
          label: "Value",
          validation: {
            trigger: N.Blur
          }
        })
      ]
    }));
    return (s, p) => {
      const _ = x("lkt-item-crud");
      return e(a) ? (f(), B("section", ce, [
        F(_, $({
          modelValue: i.value,
          "onUpdate:modelValue": p[0] || (p[0] = (v) => i.value = v),
          editing: r.value,
          "onUpdate:editing": p[1] || (p[1] = (v) => r.value = v),
          perms: c.value,
          "onUpdate:perms": p[2] || (p[2] = (v) => c.value = v)
        }, {
          header: {
            text: t.value > 0 ? i.value.property : "New translation",
            icon: "lkt-icn-lang-picker",
            tag: "h1"
          },
          readResource: "r-i18n",
          readData: {
            id: t.value
          },
          mode: t.value > 0 ? e(V).Update : e(V).Create,
          form: m.value,
          buttonNavVisibility: e(G).Always,
          createButton: {
            resource: "mk-i18n",
            icon: "lkt-icn-save",
            text: "Create"
          },
          updateButton: {
            resource: "up-i18n",
            icon: "lkt-icn-save",
            text: "Update"
          },
          dropButton: {
            resource: "rm-i18n",
            resourceData: { id: t.value },
            icon: "lkt-icn-trash",
            text: "Remove",
            events: {
              click: () => {
                e(l).back();
              }
            }
          },
          redirectOnCreate: d
        }), null, 16, ["modelValue", "editing", "perms"])
      ])) : E("", !0);
    };
  }
}), pe = {
  key: 0,
  class: "lkt-admin-spa lkt-web-items"
}, ve = /* @__PURE__ */ A({
  __name: "LktWebItemsSpa",
  setup(u) {
    const a = g("lktAdminEnabled");
    a.value || (window.location.href = "/");
    const n = I(), l = o(n.params.type), t = o(n.params.id), r = o({
      name: "",
      type: l.value
    }), c = o([]), i = o(null), d = o(!1), m = o(S.getWebItemSettings(l.value));
    P(n, (h) => {
      l.value = n.params.type, t.value = n.params.id, c.value.splice(0, c.value.length), d.value = !1, r.value.type = l.value, m.value = S.getWebItemSettings(l.value), K(() => d.value = !0);
    }, { flush: "pre", immediate: !0, deep: !0 });
    let s = g("lktAppSize");
    s || (s = o(y.MD));
    const p = k(() => m.value.many.columns ? [
      ...m.value.many.columns,
      {
        type: w.Button,
        key: "details",
        label: "Details",
        button: {
          type: T.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (h) => `/admin/web-items/${l.value}/${h.id}`
          }
        }
      }
    ] : [
      {
        type: w.Field,
        key: "name",
        label: "Name",
        isForAccordionHeader: !0,
        field: {
          type: b.Text,
          icon: m.value.icon
        }
      },
      {
        type: w.Button,
        key: "details",
        label: "Details",
        button: {
          type: T.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (h) => `/admin/web-items/${l.value}/${h.id}`
          }
        }
      }
    ]), _ = k(() => ({
      text: m.value.labelMany ?? "",
      icon: m.value.icon,
      tag: "h1"
    })), v = k(() => ({
      icon: "lkt-icn-more",
      text: "Add web item",
      type: T.Anchor,
      anchor: {
        to: `/admin/web-items/${l.value}/new`
      },
      ...m.value.many.createButton
    }));
    return Z(() => {
      d.value = !0;
    }), (h, D) => {
      const C = x("lkt-table");
      return e(a) ? (f(), B("section", pe, [
        d.value ? (f(), L(C, $({
          key: 0,
          ref_key: "spaRef",
          ref: i,
          modelValue: c.value,
          "onUpdate:modelValue": D[0] || (D[0] = (W) => c.value = W)
        }, {
          type: e(s) < e(y).MD ? e(M).Accordion : e(M).Table,
          rowDisplayType: e(q).PreferColumns,
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          paginator: {
            resource: "ls-web-items",
            resourceData: r.value
          },
          itemsContainerClass: e(s) < e(y).MD ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          },
          ...m.value.many,
          columns: p.value,
          header: _.value,
          createButton: v.value
        }), null, 16, ["modelValue"])) : E("", !0)
      ])) : E("", !0);
    };
  }
}), ke = {
  key: 0,
  class: "lkt-admin-spa lkt-web-item-spa"
}, ye = /* @__PURE__ */ A({
  __name: "LktWebItemSpa",
  setup(u) {
    const a = g("lktAdminEnabled"), n = I(), l = j(), t = o(n.params.type), r = o(n.params.id), c = o(!1), i = o(!1), d = o(S.getWebItemSettings(t.value)), m = o({});
    P(n, (D) => {
      m.value = {}, t.value = n.params.type, r.value = n.params.id, c.value = !1, d.value = S.getWebItemSettings(t.value), K(() => c.value = !0);
    }, { flush: "pre", immediate: !0, deep: !0 });
    const s = k(() => ({
      text: d.value.labelSingle ?? "",
      icon: d.value.icon,
      tag: "h1"
    })), p = k(() => ({
      resource: "mk-web-item",
      icon: "lkt-icn-save",
      text: "Create",
      ...d.value.single.createButton
    })), _ = k(() => ({
      resource: "up-web-item",
      icon: "lkt-icn-save",
      text: "Update",
      ...d.value.single.updateButton
    })), v = k(() => ({
      resource: "rm-web-item",
      resourceData: { id: r },
      icon: "lkt-icn-trash",
      text: "Remove",
      events: {
        click: () => {
          l.back();
        }
      },
      ...d.value.single.dropButton
    })), h = (D) => `/admin/web-items/${t.value}/${D}`;
    return (D, C) => {
      const W = x("lkt-item-crud"), Q = x("lkt-loader");
      return e(a) ? (f(), B("section", ke, [
        c.value ? (f(), L(W, $({
          key: 0,
          modelValue: m.value,
          "onUpdate:modelValue": C[0] || (C[0] = (H) => m.value = H),
          editing: i.value,
          "onUpdate:editing": C[1] || (C[1] = (H) => i.value = H)
        }, {
          readResource: "r-web-item",
          readData: { id: r.value },
          mode: r.value > 0 ? e(V).Update : e(V).Create,
          buttonNavVisibility: e(G).Always,
          redirectOnCreate: h,
          ...d.value.single,
          header: s.value,
          createButton: p.value,
          updateButton: _.value,
          dropButton: v.value
        }), null, 16, ["modelValue", "editing"])) : (f(), L(Q, { key: 1 }))
      ])) : E("", !0);
    };
  }
}), we = () => {
  J({
    url: "/translations",
    name: "ls-lkt-i18n",
    digToPerms: "perms",
    digToData: "results",
    mapData: (u) => u
  }), J({
    url: "/translation/{id}",
    name: "r-i18n",
    params: { id: { default: void 0 } },
    digToPerms: "perms",
    digToData: "item",
    mapData: (u) => u
  }), ee({
    url: "/translation",
    name: "mk-i18n",
    params: {
      type: { default: void 0 },
      property: { default: void 0 },
      valueData: { default: void 0 }
    },
    digToPerms: "perms",
    digToAutoReloadId: "item.id"
  }), te({
    url: "/translation/{id}",
    name: "up-i18n",
    params: {
      id: { default: void 0 },
      type: { default: void 0 },
      property: { default: void 0 },
      valueData: { default: void 0 }
    },
    digToPerms: "perms"
  }), ae({
    url: "/translation/{id}",
    name: "rm-i18n",
    params: {
      id: { default: void 0 }
    },
    digToPerms: "perms",
    digToData: "item"
  });
}, xe = {
  install: (u) => {
    u.component("lkt-admin-menu-button") === void 0 && u.component("lkt-admin-menu-button", ne), u.component("lkt-admin-menu") === void 0 && u.component("lkt-admin-menu", oe);
  }
}, R = (u, a) => {
}, he = (u) => {
  u.addRoute({ path: "/admin/web-pages/:type", name: "lkt-admin-pages", component: re, beforeEnter: R }), u.addRoute({ path: "/admin/web-pages/:type/:id", name: "lkt-admin-page", component: ue, beforeEnter: R }), u.addRoute({ path: "/admin/web-items/:type", name: "lkt-web-items", component: ve, beforeEnter: R }), u.addRoute({ path: "/admin/web-items/:type/:id", name: "lkt-web-item", component: ye, beforeEnter: R }), u.addRoute({ path: "/admin/i18n", name: "lkt-admin-translations", component: de, beforeEnter: R }), u.addRoute({ path: "/admin/i18n/:id", name: "lkt-admin-translation", component: me, beforeEnter: R });
};
export {
  xe as default,
  we as setupAdminTranslationsHttp,
  he as setupLktVueAdminRoutes
};

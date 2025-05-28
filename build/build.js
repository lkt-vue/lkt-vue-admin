import { defineComponent as T, inject as f, resolveComponent as _, createBlock as S, createCommentVNode as D, unref as e, openBlock as b, mergeProps as R, isRef as G, computed as w, createElementBlock as A, normalizeClass as J, createVNode as P, ref as l, watch as M, nextTick as O, onMounted as K } from "vue";
import { ButtonType as x, MenuEntryType as E, WebPageController as q, WebItemsController as $, AppSize as v, FieldType as y, ColumnType as g, TableRowType as W, TableType as C, ItemCrudButtonNavVisibility as H, ItemCrudMode as B, FormInstance as U, FieldAutoValidationTrigger as L } from "lkt-vue-kernel";
import { useRoute as V, useRouter as z } from "vue-router";
import { createHTTPGetResource as N, createHTTPPostResource as Q, createHTTPPutResource as X, createHTTPDeleteResource as Y } from "lkt-http-client";
const Z = /* @__PURE__ */ T({
  __name: "LktAdminMenuButton",
  setup(u) {
    const a = f("adminMenu"), n = f("lktAdminEnabled");
    return (r, t) => {
      const o = _("lkt-button");
      return e(n) ? (b(), S(o, R({
        key: 0,
        checked: e(a),
        "onUpdate:checked": t[0] || (t[0] = (d) => G(a) ? a.value = d : null)
      }, {
        type: e(x).HiddenSwitch,
        icon: "lkt-icn-lkt",
        class: "lkt-admin-button"
      }), null, 16, ["checked"])) : D("", !0);
    };
  }
}), ee = /* @__PURE__ */ T({
  __name: "LktAdminMenu",
  setup(u) {
    const a = f("adminMenu"), n = w(() => {
      let r = [
        {
          key: "web-pages",
          type: E.Entry,
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
        }
      ];
      return q.getPages().forEach((t) => {
        r.push({
          key: t.code,
          type: E.Entry,
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
      }), $.getItems().forEach((t) => {
        r.push({
          key: t.code,
          type: E.Entry,
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
      }), r.push(
        {
          key: "translations",
          type: E.Entry,
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
      ), r;
    });
    return (r, t) => {
      const o = _("lkt-menu");
      return b(), A("div", {
        class: J(["lkt-admin-menu", e(a) ? "is-opened" : ""])
      }, [
        P(o, {
          "model-value": n.value,
          onClickOutside: t[0] || (t[0] = (d) => a.value = !1)
        }, null, 8, ["model-value"])
      ], 2);
    };
  }
}), te = { class: "lkt-admin-spa lkt-admin-pages" }, ae = /* @__PURE__ */ T({
  __name: "LktAdminPagesSpa",
  setup(u) {
    const a = V(), n = l(a.params.type), r = l(a.params.id), t = l({
      name: "",
      type: n.value
    }), o = l([]), d = l(null);
    M(a, (s) => {
      n.value = a.params.type, r.value = a.params.id, t.value.type = n.value;
    }, { flush: "pre", immediate: !0, deep: !0 });
    let i = f("lktAppSize");
    i || (i = l(v.MD));
    const c = w(() => [
      {
        type: g.Field,
        key: "name",
        label: "__:common.column.name",
        isForAccordionHeader: !0,
        field: {
          type: y.Text,
          icon: "lkt-icn-webpage"
        }
      },
      {
        type: g.Button,
        key: "details",
        label: "Details",
        button: {
          type: x.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (s) => `/admin/web-pages/${n.value}/${s.id}`
          }
        }
      }
    ]), m = w(() => {
      let s = "Web Pages";
      return q.getPages().forEach((p) => {
        if (p.id == n.value) {
          s = p.label ?? "Web Pages";
          return;
        }
      }), s;
    });
    return (s, p) => {
      const h = _("lkt-table");
      return b(), A("section", te, [
        P(h, R({
          ref_key: "spaRef",
          ref: d,
          modelValue: o.value,
          "onUpdate:modelValue": p[0] || (p[0] = (k) => o.value = k)
        }, {
          type: e(i) < e(v).MD ? e(C).Accordion : e(C).Table,
          rowDisplayType: e(W).PreferColumns,
          title: m.value,
          titleTag: "h1",
          titleIcon: "lkt-icn-webpage",
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          columns: c.value,
          paginator: {
            resource: "ls-web-pages-type",
            resourceData: t.value
          },
          createButton: {
            icon: "lkt-icn-more",
            type: e(x).Anchor,
            anchor: {
              to: `/admin/web-pages/${n.value}/0`
            }
          },
          itemsContainerClass: e(i) < e(v).MD ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          }
        }), null, 16, ["modelValue"])
      ]);
    };
  }
}), ne = { class: "lkt-admin-spa" }, le = /* @__PURE__ */ T({
  __name: "LktAdminPageSpa",
  setup(u) {
    const a = V(), n = z(), r = l(a.params.type), t = l(a.params.id);
    M(a, (i) => {
      r.value = a.params.type, t.value = a.params.id;
    }, { flush: "pre", immediate: !0, deep: !0 });
    const o = l({}), d = (i) => `/admin/web-pages/${r.value}/${i}`;
    return (i, c) => {
      const m = _("lkt-web-page");
      return b(), A("section", ne, [
        P(m, {
          modelValue: o.value,
          "onUpdate:modelValue": c[0] || (c[0] = (s) => o.value = s),
          "crud-config": {
            readResource: "r-web-page",
            readData: {
              id: t.value
            },
            mode: t.value > 0 ? e(B).Update : e(B).Create,
            buttonNavVisibility: e(H).Always,
            editing: !0,
            perms: ["update"],
            createButton: {
              resource: "mk-web-page",
              resourceData: { ...o.value, type: r.value },
              text: "Create",
              disabled: !1
            },
            updateButton: {
              resource: "up-web-page",
              resourceData: o.value,
              text: "Update",
              disabled: !1
            },
            dropButton: {
              resource: "rm-web-page",
              resourceData: o.value,
              text: "Remove",
              disabled: !1,
              events: {
                click: () => {
                  e(n).back();
                }
              }
            },
            redirectOnCreate: d
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
}), oe = {
  key: 0,
  class: "lkt-admin-spa lkt-admin-translations"
}, re = /* @__PURE__ */ T({
  __name: "LktAdminTranslationsSpa",
  setup(u) {
    const a = f("lktAdminEnabled");
    a.value || (window.location.href = "/");
    const n = V(), r = l(n.params.id), t = l({
      name: ""
    }), o = l([]), d = l(null);
    M(n, (s) => {
      r.value = n.params.id;
    }, { flush: "pre", immediate: !0, deep: !0 });
    let i = f("lktAppSize");
    i || (i = l(v.MD));
    const c = w(() => [
      {
        type: g.Field,
        key: "property",
        label: "Property",
        isForAccordionHeader: !0,
        field: {
          type: y.Text,
          icon: "lkt-icn-lang-picker"
        }
      },
      {
        type: g.Field,
        key: "type",
        label: "Type",
        ensureFieldLabel: i.value < v.MD,
        field: {
          type: y.Select,
          options: [y.Text, y.Textarea]
        }
      },
      {
        type: g.Field,
        key: "value",
        label: "Value",
        ensureFieldLabel: i.value < v.MD,
        field: {
          type: "prop:type",
          readModeConfig: {
            textMaxLength: 10
          }
        }
      },
      {
        type: g.Button,
        key: "details",
        label: "Details",
        button: {
          type: x.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (s) => `/admin/i18n/${s.id}`
          }
        }
      }
    ]), m = w(() => "Translations");
    return (s, p) => {
      const h = _("lkt-table");
      return e(a) ? (b(), A("section", oe, [
        P(h, R({
          ref_key: "spaRef",
          ref: d,
          modelValue: o.value,
          "onUpdate:modelValue": p[0] || (p[0] = (k) => o.value = k)
        }, {
          type: e(i) < e(v).MD ? e(C).Accordion : e(C).Table,
          rowDisplayType: e(W).PreferColumns,
          title: m.value,
          titleTag: "h1",
          titleIcon: "lkt-icn-lang-picker",
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          columns: c.value,
          paginator: {
            resource: "ls-lkt-i18n",
            resourceData: t.value
          },
          createButton: {
            icon: "lkt-icn-more",
            text: "Add translation",
            type: e(x).Anchor,
            anchor: {
              to: "/admin/i18n/new"
            }
          },
          itemsContainerClass: e(i) < e(v).MD ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          }
        }), null, 16, ["modelValue"])
      ])) : D("", !0);
    };
  }
}), ie = {
  key: 0,
  class: "lkt-admin-spa"
}, ue = /* @__PURE__ */ T({
  __name: "LktAdminTranslationSpa",
  setup(u) {
    const a = f("lktAdminEnabled");
    a.value || (window.location.href = "/");
    const n = V(), r = z(), t = l(parseInt(n.params.id));
    M(n, (c) => {
      t.value = parseInt(n.params.id);
    }, { flush: "pre", immediate: !0, deep: !0 });
    const o = l({
      property: "",
      type: y.Text,
      value: "",
      valueData: {}
    }), d = (c) => `/admin/i18n/${c}`, i = w(() => ({
      items: [
        U.mkFieldItemConfig("property", {
          type: y.Text,
          label: "Property",
          mandatory: !0,
          validation: {
            trigger: L.Blur
          }
        }),
        U.mkFieldItemConfig("type", {
          type: y.Select,
          mandatory: !0,
          label: "Type",
          options: [y.Text, y.Textarea],
          validation: {
            trigger: L.Blur
          }
        }),
        U.mkFieldItemConfig("valueData", {
          type: o.value.type,
          mandatory: !0,
          canI18n: !0,
          label: "Value",
          validation: {
            trigger: L.Blur
          }
        })
      ]
    }));
    return (c, m) => {
      const s = _("lkt-item-crud");
      return e(a) ? (b(), A("section", ie, [
        P(s, R({
          modelValue: o.value,
          "onUpdate:modelValue": m[0] || (m[0] = (p) => o.value = p)
        }, {
          title: t.value > 0 ? o.value.property : "New translation",
          readResource: "r-i18n",
          readData: {
            id: t.value
          },
          mode: t.value > 0 ? e(B).Update : e(B).Create,
          form: i.value,
          buttonNavVisibility: e(H).Always,
          editing: !0,
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
                e(r).back();
              }
            }
          },
          redirectOnCreate: d
        }), null, 16, ["modelValue"])
      ])) : D("", !0);
    };
  }
}), se = {
  key: 0,
  class: "lkt-admin-spa lkt-web-items"
}, de = /* @__PURE__ */ T({
  __name: "LktWebItemsSpa",
  setup(u) {
    const a = f("lktAdminEnabled");
    a.value || (window.location.href = "/");
    const n = V(), r = l(n.params.type), t = l(n.params.id), o = l({
      name: "",
      type: r.value
    }), d = l([]), i = l(null), c = l(!1), m = l($.getWebItemSettings(r.value));
    M(n, (k) => {
      r.value = n.params.type, t.value = n.params.id, d.value.splice(0, d.value.length), c.value = !1, o.value.type = r.value, m.value = $.getWebItemSettings(r.value), O(() => c.value = !0);
    }, { flush: "pre", immediate: !0, deep: !0 });
    let s = f("lktAppSize");
    s || (s = l(v.MD));
    const p = w(() => m.value.many.columns ? [
      ...m.value.many.columns,
      {
        type: g.Button,
        key: "details",
        label: "Details",
        button: {
          type: x.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (k) => `/admin/web-items/${r.value}/${k.id}`
          }
        }
      }
    ] : [
      {
        type: g.Field,
        key: "name",
        label: "Name",
        isForAccordionHeader: !0,
        field: {
          type: y.Text,
          icon: m.value.icon
        }
      },
      {
        type: g.Button,
        key: "details",
        label: "Details",
        button: {
          type: x.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (k) => `/admin/web-items/${r.value}/${k.id}`
          }
        }
      }
    ]), h = w(() => ({
      text: m.value.labelMany ?? "",
      icon: m.value.icon,
      tag: "h1"
    }));
    return K(() => {
      c.value = !0;
    }), (k, I) => {
      const F = _("lkt-table");
      return e(a) ? (b(), A("section", se, [
        c.value ? (b(), S(F, R({
          key: 0,
          ref_key: "spaRef",
          ref: i,
          modelValue: d.value,
          "onUpdate:modelValue": I[0] || (I[0] = (j) => d.value = j)
        }, {
          type: e(s) < e(v).MD ? e(C).Accordion : e(C).Table,
          rowDisplayType: e(W).PreferColumns,
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          paginator: {
            resource: "ls-web-items",
            resourceData: o.value
          },
          createButton: {
            icon: "lkt-icn-more",
            text: "Add web item",
            type: e(x).Anchor,
            anchor: {
              to: "/admin/web-item/new"
            }
          },
          itemsContainerClass: e(s) < e(v).MD ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          },
          ...m.value.many,
          columns: p.value,
          header: h.value
        }), null, 16, ["modelValue"])) : D("", !0)
      ])) : D("", !0);
    };
  }
}), ce = {
  key: 0,
  class: "lkt-admin-spa lkt-web-item-spa"
}, me = /* @__PURE__ */ T({
  __name: "LktWebItemSpa",
  setup(u) {
    const a = f("lktAdminEnabled");
    a.value || (window.location.href = "/");
    const n = V(), r = z(), t = l(n.params.type), o = l(n.params.id), d = l(!1), i = l($.getWebItemSettings(t.value)), c = l({});
    M(n, (p) => {
      c.value = {}, t.value = n.params.type, o.value = n.params.id, d.value = !1, i.value = $.getWebItemSettings(t.value), O(() => d.value = !0);
    }, { flush: "pre", immediate: !0, deep: !0 });
    const m = w(() => ({
      text: i.value.labelSingle ?? "",
      icon: i.value.icon,
      tag: "h1"
    })), s = (p) => `/admin/web-items/${t.value}/${p}`;
    return (p, h) => {
      const k = _("lkt-item-crud"), I = _("lkt-loader");
      return e(a) ? (b(), A("section", ce, [
        d.value ? (b(), S(k, R({
          key: 0,
          modelValue: c.value,
          "onUpdate:modelValue": h[0] || (h[0] = (F) => c.value = F)
        }, {
          readResource: "r-web-item",
          readData: {
            id: o.value
          },
          mode: o.value > 0 ? e(B).Update : e(B).Create,
          buttonNavVisibility: e(H).Always,
          editing: !0,
          createButton: {
            resource: "mk-web-item",
            icon: "lkt-icn-save",
            text: "Create"
          },
          updateButton: {
            resource: "up-web-item",
            icon: "lkt-icn-save",
            text: "Update"
          },
          dropButton: {
            resource: "rm-web-item",
            resourceData: { id: o.value },
            icon: "lkt-icn-trash",
            text: "Remove",
            events: {
              click: () => {
                e(r).back();
              }
            }
          },
          redirectOnCreate: s,
          ...i.value.single,
          header: m.value
        }), null, 16, ["modelValue"])) : (b(), S(I, { key: 1 }))
      ])) : D("", !0);
    };
  }
}), be = () => {
  N({
    url: "/translations",
    name: "ls-lkt-i18n",
    digToPerms: "perms",
    digToData: "results",
    mapData: (u) => u
  }), N({
    url: "/translation/{id}",
    name: "r-i18n",
    params: { id: { default: void 0 } },
    digToPerms: "perms",
    digToData: "item",
    mapData: (u) => u
  }), Q({
    url: "/translation",
    name: "mk-i18n",
    params: {
      type: { default: void 0 },
      property: { default: void 0 },
      valueData: { default: void 0 }
    },
    digToPerms: "perms",
    digToAutoReloadId: "item.id"
  }), X({
    url: "/translation/{id}",
    name: "up-i18n",
    params: {
      id: { default: void 0 },
      type: { default: void 0 },
      property: { default: void 0 },
      valueData: { default: void 0 }
    },
    digToPerms: "perms"
  }), Y({
    url: "/translation/{id}",
    name: "rm-i18n",
    params: {
      id: { default: void 0 }
    },
    digToPerms: "perms",
    digToData: "item"
  });
}, fe = {
  install: (u) => {
    u.component("lkt-admin-menu-button") === void 0 && u.component("lkt-admin-menu-button", Z), u.component("lkt-admin-menu") === void 0 && u.component("lkt-admin-menu", ee);
  }
}, ge = (u) => {
  u.addRoute({ path: "/admin/web-pages/:type", name: "lkt-admin-pages", component: ae }), u.addRoute({ path: "/admin/web-pages/:type/:id", name: "lkt-admin-page", component: le }), u.addRoute({ path: "/admin/web-items/:type", name: "lkt-web-items", component: de }), u.addRoute({ path: "/admin/web-items/:type/:id", name: "lkt-web-item", component: me }), u.addRoute({ path: "/admin/i18n", name: "lkt-admin-translations", component: re }), u.addRoute({ path: "/admin/i18n/:id", name: "lkt-admin-translation", component: ue });
};
export {
  fe as default,
  be as setupAdminTranslationsHttp,
  ge as setupLktVueAdminRoutes
};

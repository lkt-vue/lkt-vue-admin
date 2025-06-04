import { defineComponent as C, inject as T, resolveComponent as B, createBlock as H, createCommentVNode as M, unref as e, openBlock as w, mergeProps as P, isRef as ee, computed as f, createElementBlock as R, normalizeClass as te, createVNode as L, ref as l, watch as I, nextTick as Y, onMounted as ae } from "vue";
import { ButtonType as A, WebPageController as j, MenuEntryType as W, WebItemsController as U, AppSize as _, FieldType as x, ColumnType as h, TableRowType as J, TableType as V, ItemCrudButtonNavVisibility as K, ItemCrudMode as $, FormInstance as G, FieldAutoValidationTrigger as O } from "lkt-vue-kernel";
import { useRoute as S, useRouter as Q } from "vue-router";
import { createHTTPGetResource as X, createHTTPPostResource as ne, createHTTPPutResource as oe, createHTTPDeleteResource as le } from "lkt-http-client";
const re = /* @__PURE__ */ C({
  __name: "LktAdminMenuButton",
  setup(s) {
    const t = T("adminMenu"), r = T("lktAdminEnabled");
    return (o, n) => {
      const i = B("lkt-button");
      return e(r) ? (w(), H(i, P({
        key: 0,
        checked: e(t),
        "onUpdate:checked": n[0] || (n[0] = (d) => ee(t) ? t.value = d : null)
      }, {
        type: e(A).HiddenSwitch,
        icon: "lkt-icn-lkt",
        class: "lkt-admin-button"
      }), null, 16, ["checked"])) : M("", !0);
    };
  }
}), ie = /* @__PURE__ */ C({
  __name: "LktAdminMenu",
  setup(s) {
    const t = T("adminMenu"), r = f(() => {
      let o = [];
      return j.hasDefaultPageEnabled() && o.push({
        key: "web-pages",
        type: W.Entry,
        icon: "lkt-icn-webpage",
        anchor: {
          to: "/admin/web-pages/0",
          text: "Pages",
          events: {
            click: () => {
              t.value = !1;
            }
          }
        }
      }), j.getPages().forEach((n) => {
        o.push({
          key: n.code,
          type: W.Entry,
          icon: "lkt-icn-webpage",
          anchor: {
            to: `/admin/web-pages/${n.id}`,
            text: n.label,
            events: {
              click: () => {
                t.value = !1;
              }
            }
          }
        });
      }), U.getItems().forEach((n) => {
        n.many !== !1 && o.push({
          key: n.code,
          type: W.Entry,
          icon: n.icon,
          anchor: {
            to: `/admin/web-items/${n.code}`,
            text: n.labelMany,
            events: {
              click: () => {
                t.value = !1;
              }
            }
          }
        });
      }), o.push(
        {
          key: "translations",
          type: W.Entry,
          icon: "lkt-icn-lang-picker",
          anchor: {
            to: "/admin/i18n",
            text: "Translations",
            events: {
              click: () => {
                t.value = !1;
              }
            }
          }
        }
      ), o;
    });
    return (o, n) => {
      const i = B("lkt-menu");
      return w(), R("div", {
        class: te(["lkt-admin-menu", e(t) ? "is-opened" : ""])
      }, [
        L(i, {
          "model-value": r.value,
          onClickOutside: n[0] || (n[0] = (d) => t.value = !1)
        }, null, 8, ["model-value"])
      ], 2);
    };
  }
}), ue = { class: "lkt-admin-spa lkt-admin-pages" }, se = /* @__PURE__ */ C({
  __name: "LktAdminPagesSpa",
  setup(s) {
    const t = S(), r = l(t.params.type), o = l(t.params.id), n = l({
      name: "",
      type: r.value
    }), i = l([]), d = l(null);
    I(t, (a) => {
      r.value = t.params.type, o.value = t.params.id, n.value.type = r.value;
    }, { flush: "pre", immediate: !0, deep: !0 });
    let u = T("lktAppSize");
    u || (u = l(_.MD));
    const p = f(() => [
      {
        type: h.Field,
        key: "name",
        label: "__:common.column.name",
        isForAccordionHeader: !0,
        field: {
          type: x.Text,
          icon: "lkt-icn-webpage"
        }
      },
      {
        type: h.Button,
        key: "details",
        label: "Details",
        button: {
          type: A.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (a) => `/admin/web-pages/${r.value}/${a.id}`
          }
        }
      }
    ]), m = f(() => {
      let a = "Web Pages";
      return j.getPages().forEach((c) => {
        if (c.id == r.value) {
          a = c.label ?? "Web Pages";
          return;
        }
      }), a;
    });
    return (a, c) => {
      const b = B("lkt-table");
      return w(), R("section", ue, [
        L(b, P({
          ref_key: "spaRef",
          ref: d,
          modelValue: i.value,
          "onUpdate:modelValue": c[0] || (c[0] = (y) => i.value = y)
        }, {
          type: e(u) < e(_).MD ? e(V).Accordion : e(V).Table,
          rowDisplayType: e(J).PreferColumns,
          title: m.value,
          titleTag: "h1",
          titleIcon: "lkt-icn-webpage",
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          columns: p.value,
          paginator: {
            resource: "ls-web-pages-type",
            resourceData: n.value
          },
          createButton: {
            icon: "lkt-icn-more",
            type: e(A).Anchor,
            anchor: {
              to: `/admin/web-pages/${r.value}/0`
            }
          },
          itemsContainerClass: e(u) < e(_).MD ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          }
        }), null, 16, ["modelValue"])
      ]);
    };
  }
}), de = { class: "lkt-admin-spa" }, me = /* @__PURE__ */ C({
  __name: "LktAdminPageSpa",
  setup(s) {
    const t = S(), r = Q(), o = l(t.params.type), n = l(t.params.id);
    I(t, (u) => {
      o.value = t.params.type, n.value = t.params.id;
    }, { flush: "pre", immediate: !0, deep: !0 });
    const i = l({}), d = (u) => `/admin/web-pages/${o.value}/${u}`;
    return (u, p) => {
      const m = B("lkt-web-page");
      return w(), R("section", de, [
        L(m, {
          modelValue: i.value,
          "onUpdate:modelValue": p[0] || (p[0] = (a) => i.value = a),
          "crud-config": {
            readResource: "r-web-page",
            readData: {
              id: n.value
            },
            mode: n.value > 0 ? e($).Update : e($).Create,
            buttonNavVisibility: e(K).Always,
            editing: !0,
            perms: ["update"],
            createButton: {
              resource: "mk-web-page",
              resourceData: { ...i.value, type: o.value },
              text: "Create",
              disabled: !1
            },
            updateButton: {
              resource: "up-web-page",
              resourceData: i.value,
              text: "Update",
              disabled: !1
            },
            dropButton: {
              resource: "rm-web-page",
              resourceData: i.value,
              text: "Remove",
              disabled: !1,
              events: {
                click: () => {
                  e(r).back();
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
}), ce = {
  key: 0,
  class: "lkt-admin-spa lkt-admin-translations"
}, pe = /* @__PURE__ */ C({
  __name: "LktAdminTranslationsSpa",
  setup(s) {
    const t = T("lktAdminEnabled");
    t.value || (window.location.href = "/");
    const r = S(), o = l(r.params.id), n = l({
      name: ""
    }), i = l([]), d = l(null);
    I(r, (a) => {
      o.value = r.params.id;
    }, { flush: "pre", immediate: !0, deep: !0 });
    let u = T("lktAppSize");
    u || (u = l(_.MD));
    const p = f(() => [
      {
        type: h.Field,
        key: "property",
        label: "Property",
        isForAccordionHeader: !0,
        field: {
          type: x.Text,
          icon: "lkt-icn-lang-picker"
        }
      },
      {
        type: h.Field,
        key: "type",
        label: "Type",
        ensureFieldLabel: u.value < _.MD,
        field: {
          type: x.Select,
          options: [x.Text, x.Textarea]
        }
      },
      {
        type: h.Field,
        key: "value",
        label: "Value",
        ensureFieldLabel: u.value < _.MD,
        field: {
          type: "prop:type",
          readModeConfig: {
            textMaxLength: 10
          }
        }
      },
      {
        type: h.Button,
        key: "details",
        label: "Details",
        button: {
          type: A.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (a) => `/admin/i18n/${a.id}`
          }
        }
      }
    ]), m = f(() => "Translations");
    return (a, c) => {
      const b = B("lkt-table");
      return e(t) ? (w(), R("section", ce, [
        L(b, P({
          ref_key: "spaRef",
          ref: d,
          modelValue: i.value,
          "onUpdate:modelValue": c[0] || (c[0] = (y) => i.value = y)
        }, {
          type: e(u) < e(_).MD ? e(V).Accordion : e(V).Table,
          rowDisplayType: e(J).PreferColumns,
          header: {
            text: m.value,
            icon: "lkt-icn-lang-picker",
            tag: "h1"
          },
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          columns: p.value,
          paginator: {
            resource: "ls-lkt-i18n",
            resourceData: n.value
          },
          createButton: {
            icon: "lkt-icn-more",
            text: "Add translation",
            type: e(A).Anchor,
            anchor: {
              to: "/admin/i18n/new"
            }
          },
          itemsContainerClass: e(u) < e(_).MD ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          }
        }), null, 16, ["modelValue"])
      ])) : M("", !0);
    };
  }
}), ve = {
  key: 0,
  class: "lkt-admin-spa"
}, ke = /* @__PURE__ */ C({
  __name: "LktAdminTranslationSpa",
  setup(s) {
    const t = T("lktAdminEnabled");
    t.value || (window.location.href = "/");
    const r = S(), o = Q(), n = l(parseInt(r.params.id)), i = l(!1), d = l(["create", "switch-edit-mode"]);
    I(r, (a) => {
      n.value = parseInt(r.params.id);
    }, { flush: "pre", immediate: !0, deep: !0 });
    const u = l({
      property: "",
      type: x.Text,
      value: "",
      valueData: {}
    }), p = (a) => `/admin/i18n/${a}`, m = f(() => ({
      items: [
        G.mkFieldItemConfig("property", {
          type: x.Text,
          label: "Property",
          mandatory: !0,
          validation: {
            trigger: O.Blur
          }
        }),
        G.mkFieldItemConfig("type", {
          type: x.Select,
          mandatory: !0,
          label: "Type",
          options: [x.Text, x.Textarea],
          validation: {
            trigger: O.Blur
          }
        }),
        G.mkFieldItemConfig("valueData", {
          type: u.value.type,
          mandatory: !0,
          canI18n: !0,
          label: "Value",
          validation: {
            trigger: O.Blur
          }
        })
      ]
    }));
    return (a, c) => {
      const b = B("lkt-item-crud");
      return e(t) ? (w(), R("section", ve, [
        L(b, P({
          modelValue: u.value,
          "onUpdate:modelValue": c[0] || (c[0] = (y) => u.value = y),
          editing: i.value,
          "onUpdate:editing": c[1] || (c[1] = (y) => i.value = y),
          perms: d.value,
          "onUpdate:perms": c[2] || (c[2] = (y) => d.value = y)
        }, {
          header: {
            text: n.value > 0 ? u.value.property : "New translation",
            icon: "lkt-icn-lang-picker",
            tag: "h1"
          },
          readResource: "r-i18n",
          readData: {
            id: n.value
          },
          mode: n.value > 0 ? e($).Update : e($).Create,
          form: m.value,
          buttonNavVisibility: e(K).Always,
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
            resourceData: { id: n.value },
            icon: "lkt-icn-trash",
            text: "Remove",
            events: {
              click: () => {
                e(o).back();
              }
            }
          },
          redirectOnCreate: p
        }), null, 16, ["modelValue", "editing", "perms"])
      ])) : M("", !0);
    };
  }
}), ye = {
  key: 0,
  class: "lkt-admin-spa lkt-web-items"
}, fe = /* @__PURE__ */ C({
  __name: "LktWebItemsSpa",
  setup(s) {
    const t = T("lktAdminEnabled");
    t.value || (window.location.href = "/");
    const r = S(), o = l(r.params.type), n = l(r.params.id), i = l({
      name: "",
      type: o.value
    }), d = l([]), u = l(null), p = l(!1), m = l(U.getWebItemSettings(o.value));
    I(r, (g) => {
      o.value = r.params.type, n.value = r.params.id, d.value.splice(0, d.value.length), p.value = !1, i.value.type = o.value, m.value = U.getWebItemSettings(o.value), Y(() => p.value = !0);
    }, { flush: "pre", immediate: !0, deep: !0 });
    let a = T("lktAppSize");
    a || (a = l(_.MD));
    const c = f(() => m.value.many.columns ? [
      ...m.value.many.columns,
      {
        type: h.Button,
        key: "details",
        label: "Details",
        button: {
          type: A.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (g) => `/admin/web-items/${o.value}/${g.id}`
          }
        }
      }
    ] : [
      {
        type: h.Field,
        key: "name",
        label: "Name",
        isForAccordionHeader: !0,
        field: {
          type: x.Text,
          icon: m.value.icon
        }
      },
      {
        type: h.Button,
        key: "details",
        label: "Details",
        button: {
          type: A.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (g) => `/admin/web-items/${o.value}/${g.id}`
          }
        }
      }
    ]), b = f(() => ({
      text: m.value.labelMany ?? "",
      icon: m.value.icon,
      tag: "h1"
    })), y = f(() => {
      var g, D;
      return ((D = (g = m.value) == null ? void 0 : g.many) == null ? void 0 : D.createButton) === !1 ? !1 : {
        icon: "lkt-icn-more",
        text: "Add web item",
        type: A.Anchor,
        anchor: {
          to: `/admin/web-items/${o.value}/new`
        },
        ...m.value.many.createButton
      };
    });
    return ae(() => {
      p.value = !0;
    }), (g, D) => {
      const z = B("lkt-table");
      return e(t) ? (w(), R("section", ye, [
        p.value ? (w(), H(z, P({
          key: 0,
          ref_key: "spaRef",
          ref: u,
          modelValue: d.value,
          "onUpdate:modelValue": D[0] || (D[0] = (N) => d.value = N)
        }, {
          type: e(a) < e(_).MD ? e(V).Accordion : e(V).Table,
          rowDisplayType: e(J).PreferColumns,
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          paginator: {
            resource: "ls-web-items",
            resourceData: i.value
          },
          itemsContainerClass: e(a) < e(_).MD ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          },
          ...m.value.many,
          columns: c.value,
          header: b.value,
          createButton: y.value
        }), null, 16, ["modelValue"])) : M("", !0)
      ])) : M("", !0);
    };
  }
}), be = {
  key: 0,
  class: "lkt-admin-spa lkt-web-item-spa"
}, ge = /* @__PURE__ */ C({
  __name: "LktWebItemSpa",
  props: {
    id: {},
    type: {},
    onCreateTo: {}
  },
  setup(s) {
    const t = T("lktAdminEnabled"), r = s, o = S(), n = Q(), i = l(o.params.type), d = l(o.params.id), u = l(!1), p = l(!1), m = l(["create"]), a = l(U.getWebItemSettings(i.value)), c = (v) => typeof a.value.itemGenerator == "function" ? a.value.itemGenerator(v) : {
      ...v
    }, b = l(c(o.query));
    I(o, (v) => {
      b.value = c(o.query), i.value = o.params.type, d.value = o.params.id, u.value = !1, p.value = !1, m.value = ["create"], a.value = U.getWebItemSettings(i.value), Y(() => u.value = !0);
    }, { flush: "pre", immediate: !0, deep: !0 });
    const y = f(() => ({
      text: a.value.labelSingle ?? "",
      icon: a.value.icon,
      tag: "h1"
    })), g = f(() => {
      var v, k;
      return ((k = (v = a.value) == null ? void 0 : v.single) == null ? void 0 : k.createButton) === !1 ? !1 : {
        resource: "mk-web-item",
        icon: "lkt-icn-save",
        text: "Create",
        ...a.value.single.createButton,
        events: {
          click: (q) => {
            typeof a.value.single.createButton == "function" && a.value.single.createButton(q), r.onCreateTo && n.push({
              path: r.onCreateTo,
              replace: !0
            });
          }
        }
      };
    }), D = f(() => {
      var v, k;
      return ((k = (v = a.value) == null ? void 0 : v.single) == null ? void 0 : k.updateButton) === !1 ? !1 : {
        resource: "up-web-item",
        icon: "lkt-icn-save",
        text: "Update",
        ...a.value.single.updateButton
      };
    }), z = f(() => {
      var v, k;
      return ((k = (v = a.value) == null ? void 0 : v.single) == null ? void 0 : k.dropButton) === !1 ? !1 : {
        resource: "rm-web-item",
        resourceData: { id: d },
        icon: "lkt-icn-trash",
        text: "Remove",
        events: {
          click: () => {
            n.back();
          }
        },
        ...a.value.single.dropButton
      };
    }), N = (v) => `/admin/web-items/${i.value}/${v}`;
    return (v, k) => {
      const q = B("lkt-item-crud"), Z = B("lkt-loader");
      return e(t) ? (w(), R("section", be, [
        u.value ? (w(), H(q, P({
          key: 0,
          modelValue: b.value,
          "onUpdate:modelValue": k[0] || (k[0] = (F) => b.value = F),
          editing: p.value,
          "onUpdate:editing": k[1] || (k[1] = (F) => p.value = F),
          perms: m.value,
          "onUpdate:perms": k[2] || (k[2] = (F) => m.value = F)
        }, {
          readResource: "r-web-item",
          readData: { id: d.value },
          mode: d.value > 0 ? e($).Update : e($).Create,
          buttonNavVisibility: e(K).Always,
          redirectOnCreate: N,
          ...a.value.single,
          header: y.value,
          createButton: g.value,
          updateButton: D.value,
          dropButton: z.value
        }), null, 16, ["modelValue", "editing", "perms"])) : (w(), H(Z, { key: 1 }))
      ])) : M("", !0);
    };
  }
}), he = () => {
  X({
    url: "/translations",
    name: "ls-lkt-i18n",
    digToPerms: "perms",
    digToData: "results",
    mapData: (s) => s
  }), X({
    url: "/translation/{id}",
    name: "r-i18n",
    params: { id: { default: void 0 } },
    digToPerms: "perms",
    digToData: "item",
    mapData: (s) => s
  }), ne({
    url: "/translation",
    name: "mk-i18n",
    params: {
      type: { default: void 0 },
      property: { default: void 0 },
      valueData: { default: void 0 }
    },
    digToPerms: "perms",
    digToAutoReloadId: "item.id"
  }), oe({
    url: "/translation/{id}",
    name: "up-i18n",
    params: {
      id: { default: void 0 },
      type: { default: void 0 },
      property: { default: void 0 },
      valueData: { default: void 0 }
    },
    digToPerms: "perms"
  }), le({
    url: "/translation/{id}",
    name: "rm-i18n",
    params: {
      id: { default: void 0 }
    },
    digToPerms: "perms",
    digToData: "item"
  });
}, Be = {
  install: (s) => {
    s.component("lkt-admin-menu-button") === void 0 && s.component("lkt-admin-menu-button", re), s.component("lkt-admin-menu") === void 0 && s.component("lkt-admin-menu", ie);
  }
}, E = (s, t) => {
}, Ae = (s) => {
  s.addRoute({ path: "/admin/web-pages/:type", name: "lkt-admin-pages", component: se, beforeEnter: E }), s.addRoute({ path: "/admin/web-pages/:type/:id", name: "lkt-admin-page", component: me, beforeEnter: E }), s.addRoute({ path: "/admin/web-items/:type", name: "lkt-web-items", component: fe, beforeEnter: E }), s.addRoute({ path: "/admin/web-items/:type/:id", name: "lkt-web-item", component: ge, beforeEnter: E, props: (t) => ({
    id: t.params.id,
    type: t.params.type,
    onCreateTo: t.query.onCreateTo ?? ""
  }) }), s.addRoute({ path: "/admin/i18n", name: "lkt-admin-translations", component: pe, beforeEnter: E }), s.addRoute({ path: "/admin/i18n/:id", name: "lkt-admin-translation", component: ke, beforeEnter: E });
};
export {
  Be as default,
  he as setupAdminTranslationsHttp,
  Ae as setupLktVueAdminRoutes
};

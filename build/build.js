import { defineComponent as w, inject as f, resolveComponent as T, createBlock as H, createCommentVNode as D, unref as e, openBlock as g, mergeProps as R, isRef as j, computed as x, createElementBlock as h, normalizeClass as q, createVNode as M, ref as l, watch as V, nextTick as G, onMounted as J } from "vue";
import { ButtonType as _, MenuEntryType as I, WebPageController as z, WebItemsController as P, AppSize as v, FieldType as y, ColumnType as b, TableRowType as F, TableType as C, ItemCrudButtonNavVisibility as U, ItemCrudMode as B, FormInstance as E, FieldAutoValidationTrigger as S } from "lkt-vue-kernel";
import { useRoute as $, useRouter as L } from "vue-router";
import { createHTTPGetResource as W, createHTTPPostResource as K, createHTTPPutResource as Q, createHTTPDeleteResource as X } from "lkt-http-client";
const Y = /* @__PURE__ */ w({
  __name: "LktAdminMenuButton",
  setup(r) {
    const a = f("adminMenu"), n = f("lktAdminEnabled");
    return (i, t) => {
      const o = T("lkt-button");
      return e(n) ? (g(), H(o, R({
        key: 0,
        checked: e(a),
        "onUpdate:checked": t[0] || (t[0] = (c) => j(a) ? a.value = c : null)
      }, {
        type: e(_).HiddenSwitch,
        icon: "lkt-icn-lkt",
        class: "lkt-admin-button"
      }), null, 16, ["checked"])) : D("", !0);
    };
  }
}), Z = /* @__PURE__ */ w({
  __name: "LktAdminMenu",
  setup(r) {
    const a = f("adminMenu"), n = x(() => {
      let i = [
        {
          key: "web-pages",
          type: I.Entry,
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
      return z.getPages().forEach((t) => {
        i.push({
          key: t.code,
          type: I.Entry,
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
      }), P.getItems().forEach((t) => {
        i.push({
          key: t.code,
          type: I.Entry,
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
      }), i.push(
        {
          key: "translations",
          type: I.Entry,
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
      ), i;
    });
    return (i, t) => {
      const o = T("lkt-menu");
      return g(), h("div", {
        class: q(["lkt-admin-menu", e(a) ? "is-opened" : ""])
      }, [
        M(o, {
          "model-value": n.value,
          onClickOutside: t[0] || (t[0] = (c) => a.value = !1)
        }, null, 8, ["model-value"])
      ], 2);
    };
  }
}), ee = { class: "lkt-admin-spa lkt-admin-pages" }, te = /* @__PURE__ */ w({
  __name: "LktAdminPagesSpa",
  setup(r) {
    const a = $(), n = l(a.params.type), i = l(a.params.id), t = l({
      name: "",
      type: n.value
    }), o = l([]), c = l(null);
    V(a, (s) => {
      n.value = a.params.type, i.value = a.params.id, t.value.type = n.value;
    }, { flush: "pre", immediate: !0, deep: !0 });
    let u = f("lktAppSize");
    u || (u = l(v.MD));
    const m = x(() => [
      {
        type: b.Field,
        key: "name",
        label: "__:common.column.name",
        isForAccordionHeader: !0,
        field: {
          type: y.Text,
          icon: "lkt-icn-webpage"
        }
      },
      {
        type: b.Button,
        key: "details",
        label: "Details",
        button: {
          type: _.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (s) => `/admin/web-pages/${n.value}/${s.id}`
          }
        }
      }
    ]), d = x(() => {
      let s = "Web Pages";
      return z.getPages().forEach((p) => {
        if (p.id == n.value) {
          s = p.label ?? "Web Pages";
          return;
        }
      }), s;
    });
    return (s, p) => {
      const k = T("lkt-table");
      return g(), h("section", ee, [
        M(k, R({
          ref_key: "spaRef",
          ref: c,
          modelValue: o.value,
          "onUpdate:modelValue": p[0] || (p[0] = (A) => o.value = A)
        }, {
          type: e(u) < e(v).MD ? e(C).Accordion : e(C).Table,
          rowDisplayType: e(F).PreferColumns,
          title: d.value,
          titleTag: "h1",
          titleIcon: "lkt-icn-webpage",
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          columns: m.value,
          paginator: {
            resource: "ls-web-pages-type",
            resourceData: t.value
          },
          createButton: {
            icon: "lkt-icn-more",
            type: e(_).Anchor,
            anchor: {
              to: `/admin/web-pages/${n.value}/0`
            }
          },
          itemsContainerClass: e(u) < e(v).MD ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          }
        }), null, 16, ["modelValue"])
      ]);
    };
  }
}), ae = { class: "lkt-admin-spa" }, ne = /* @__PURE__ */ w({
  __name: "LktAdminPageSpa",
  setup(r) {
    const a = $(), n = L(), i = l(a.params.type), t = l(a.params.id);
    V(a, (u) => {
      i.value = a.params.type, t.value = a.params.id;
    }, { flush: "pre", immediate: !0, deep: !0 });
    const o = l({}), c = (u) => `/admin/web-pages/${i.value}/${u}`;
    return (u, m) => {
      const d = T("lkt-web-page");
      return g(), h("section", ae, [
        M(d, {
          modelValue: o.value,
          "onUpdate:modelValue": m[0] || (m[0] = (s) => o.value = s),
          "crud-config": {
            readResource: "r-web-page",
            readData: {
              id: t.value
            },
            mode: t.value > 0 ? e(B).Update : e(B).Create,
            buttonNavVisibility: e(U).Always,
            editing: !0,
            perms: ["update"],
            createButton: {
              resource: "mk-web-page",
              resourceData: { ...o.value, type: i.value },
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
}), oe = {
  key: 0,
  class: "lkt-admin-spa lkt-admin-translations"
}, le = /* @__PURE__ */ w({
  __name: "LktAdminTranslationsSpa",
  setup(r) {
    const a = f("lktAdminEnabled");
    a.value || (window.location.href = "/");
    const n = $(), i = l(n.params.id), t = l({
      name: ""
    }), o = l([]), c = l(null);
    V(n, (s) => {
      i.value = n.params.id;
    }, { flush: "pre", immediate: !0, deep: !0 });
    let u = f("lktAppSize");
    u || (u = l(v.MD));
    const m = x(() => [
      {
        type: b.Field,
        key: "property",
        label: "Property",
        isForAccordionHeader: !0,
        field: {
          type: y.Text,
          icon: "lkt-icn-lang-picker"
        }
      },
      {
        type: b.Field,
        key: "type",
        label: "Type",
        ensureFieldLabel: u.value < v.MD,
        field: {
          type: y.Select,
          options: [y.Text, y.Textarea]
        }
      },
      {
        type: b.Field,
        key: "value",
        label: "Value",
        ensureFieldLabel: u.value < v.MD,
        field: {
          type: "prop:type",
          readModeConfig: {
            textMaxLength: 10
          }
        }
      },
      {
        type: b.Button,
        key: "details",
        label: "Details",
        button: {
          type: _.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (s) => `/admin/i18n/${s.id}`
          }
        }
      }
    ]), d = x(() => "Translations");
    return (s, p) => {
      const k = T("lkt-table");
      return e(a) ? (g(), h("section", oe, [
        M(k, R({
          ref_key: "spaRef",
          ref: c,
          modelValue: o.value,
          "onUpdate:modelValue": p[0] || (p[0] = (A) => o.value = A)
        }, {
          type: e(u) < e(v).MD ? e(C).Accordion : e(C).Table,
          rowDisplayType: e(F).PreferColumns,
          title: d.value,
          titleTag: "h1",
          titleIcon: "lkt-icn-lang-picker",
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          columns: m.value,
          paginator: {
            resource: "ls-lkt-i18n",
            resourceData: t.value
          },
          createButton: {
            icon: "lkt-icn-more",
            text: "Add translation",
            type: e(_).Anchor,
            anchor: {
              to: "/admin/i18n/new"
            }
          },
          itemsContainerClass: e(u) < e(v).MD ? "lkt-grid-1 xs-grid-style" : "",
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
}, re = /* @__PURE__ */ w({
  __name: "LktAdminTranslationSpa",
  setup(r) {
    const a = f("lktAdminEnabled");
    a.value || (window.location.href = "/");
    const n = $(), i = L(), t = l(parseInt(n.params.id));
    V(n, (m) => {
      t.value = parseInt(n.params.id);
    }, { flush: "pre", immediate: !0, deep: !0 });
    const o = l({
      property: "",
      type: y.Text,
      value: "",
      valueData: {}
    }), c = (m) => `/admin/i18n/${m}`, u = x(() => ({
      items: [
        E.mkFieldItemConfig("property", {
          type: y.Text,
          label: "Property",
          mandatory: !0,
          validation: {
            trigger: S.Blur
          }
        }),
        E.mkFieldItemConfig("type", {
          type: y.Select,
          mandatory: !0,
          label: "Type",
          options: [y.Text, y.Textarea],
          validation: {
            trigger: S.Blur
          }
        }),
        E.mkFieldItemConfig("valueData", {
          type: o.value.type,
          mandatory: !0,
          canI18n: !0,
          label: "Value",
          validation: {
            trigger: S.Blur
          }
        })
      ]
    }));
    return (m, d) => {
      const s = T("lkt-item-crud");
      return e(a) ? (g(), h("section", ie, [
        M(s, R({
          modelValue: o.value,
          "onUpdate:modelValue": d[0] || (d[0] = (p) => o.value = p)
        }, {
          title: t.value > 0 ? o.value.property : "New translation",
          readResource: "r-i18n",
          readData: {
            id: t.value
          },
          mode: t.value > 0 ? e(B).Update : e(B).Create,
          form: u.value,
          buttonNavVisibility: e(U).Always,
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
                e(i).back();
              }
            }
          },
          redirectOnCreate: c
        }), null, 16, ["modelValue"])
      ])) : D("", !0);
    };
  }
}), se = {
  key: 0,
  class: "lkt-admin-spa lkt-web-items"
}, ue = /* @__PURE__ */ w({
  __name: "LktWebItemsSpa",
  setup(r) {
    const a = f("lktAdminEnabled");
    a.value || (window.location.href = "/");
    const n = $(), i = l(n.params.type), t = l(n.params.id), o = l({
      name: "",
      type: i.value
    }), c = l([]), u = l(null), m = l(!1), d = l(P.getWebItemSettings(i.value));
    V(n, (k) => {
      i.value = n.params.type, t.value = n.params.id, c.value.splice(0, c.value.length), m.value = !1, o.value.type = i.value, d.value = P.getWebItemSettings(i.value), G(() => m.value = !0);
    }, { flush: "pre", immediate: !0, deep: !0 });
    let s = f("lktAppSize");
    s || (s = l(v.MD));
    const p = x(() => d.value.many.columns ? [
      ...d.value.many.columns,
      {
        type: b.Button,
        key: "details",
        label: "Details",
        button: {
          type: _.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (k) => `/admin/web-items/${i.value}/${k.id}`
          }
        }
      }
    ] : [
      {
        type: b.Field,
        key: "name",
        label: "Name",
        isForAccordionHeader: !0,
        field: {
          type: y.Text,
          icon: d.icon
        }
      },
      {
        type: b.Button,
        key: "details",
        label: "Details",
        button: {
          type: _.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (k) => `/admin/web-items/${i.value}/${k.id}`
          }
        }
      }
    ]);
    return J(() => {
      m.value = !0;
    }), (k, A) => {
      const N = T("lkt-table");
      return e(a) ? (g(), h("section", se, [
        m.value ? (g(), H(N, R({
          key: 0,
          ref_key: "spaRef",
          ref: u,
          modelValue: c.value,
          "onUpdate:modelValue": A[0] || (A[0] = (O) => c.value = O)
        }, {
          type: e(s) < e(v).MD ? e(C).Accordion : e(C).Table,
          rowDisplayType: e(F).PreferColumns,
          title: d.value.labelMany,
          titleTag: "h1",
          titleIcon: d.value.icon,
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          paginator: {
            resource: "ls-web-items",
            resourceData: o.value
          },
          createButton: {
            icon: "lkt-icn-more",
            text: "Add web item",
            type: e(_).Anchor,
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
          ...d.value.many,
          columns: p.value
        }), null, 16, ["modelValue"])) : D("", !0)
      ])) : D("", !0);
    };
  }
}), de = {
  key: 0,
  class: "lkt-admin-spa lkt-web-item-spa"
}, ce = /* @__PURE__ */ w({
  __name: "LktWebItemSpa",
  setup(r) {
    const a = inject("lktAdminEnabled");
    a.value || (window.location.href = "/");
    const n = $(), i = L(), t = l(n.params.type), o = l(n.params.id), c = l(P.getWebItemSettings(t.value));
    V(n, (d) => {
      t.value = n.params.type, o.value = n.params.id, c.value = P.getWebItemSettings(t.value);
    }, { flush: "pre", immediate: !0, deep: !0 });
    const u = l({}), m = (d) => `/admin/web-items/${t.value}/${d}`;
    return (d, s) => {
      const p = T("lkt-item-crud");
      return e(a) ? (g(), h("section", de, [
        M(p, R({
          modelValue: u.value,
          "onUpdate:modelValue": s[0] || (s[0] = (k) => u.value = k)
        }, {
          title: c.value.labelSingle,
          readResource: "r-web-item",
          readData: {
            id: o.value
          },
          mode: o.value > 0 ? e(B).Update : e(B).Create,
          buttonNavVisibility: e(U).Always,
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
                e(i).back();
              }
            }
          },
          redirectOnCreate: m,
          ...c.value.single
        }), null, 16, ["modelValue"])
      ])) : D("", !0);
    };
  }
}), ye = () => {
  W({
    url: "/translations",
    name: "ls-lkt-i18n",
    digToPerms: "perms",
    digToData: "results",
    mapData: (r) => r
  }), W({
    url: "/translation/{id}",
    name: "r-i18n",
    params: { id: { default: void 0 } },
    digToPerms: "perms",
    digToData: "item",
    mapData: (r) => r
  }), K({
    url: "/translation",
    name: "mk-i18n",
    params: {
      type: { default: void 0 },
      property: { default: void 0 },
      valueData: { default: void 0 }
    },
    digToPerms: "perms",
    digToAutoReloadId: "item.id"
  }), Q({
    url: "/translation/{id}",
    name: "up-i18n",
    params: {
      id: { default: void 0 },
      type: { default: void 0 },
      property: { default: void 0 },
      valueData: { default: void 0 }
    },
    digToPerms: "perms"
  }), X({
    url: "/translation/{id}",
    name: "rm-i18n",
    params: {
      id: { default: void 0 }
    },
    digToPerms: "perms",
    digToData: "item"
  });
}, be = {
  install: (r) => {
    r.component("lkt-admin-menu-button") === void 0 && r.component("lkt-admin-menu-button", Y), r.component("lkt-admin-menu") === void 0 && r.component("lkt-admin-menu", Z);
  }
}, fe = (r) => {
  r.addRoute({ path: "/admin/web-pages/:type", name: "lkt-admin-pages", component: te }), r.addRoute({ path: "/admin/web-pages/:type/:id", name: "lkt-admin-page", component: ne }), r.addRoute({ path: "/admin/web-items/:type", name: "lkt-web-items", component: ue }), r.addRoute({ path: "/admin/web-items/:type/:id", name: "lkt-web-item", component: ce }), r.addRoute({ path: "/admin/i18n", name: "lkt-admin-translations", component: le }), r.addRoute({ path: "/admin/i18n/:id", name: "lkt-admin-translation", component: re });
};
export {
  be as default,
  ye as setupAdminTranslationsHttp,
  fe as setupLktVueAdminRoutes
};

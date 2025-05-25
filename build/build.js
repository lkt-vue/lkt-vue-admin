import { defineComponent as f, inject as h, resolveComponent as _, createBlock as W, createCommentVNode as H, unref as t, openBlock as b, mergeProps as A, isRef as O, computed as T, createElementBlock as x, normalizeClass as q, createVNode as B, ref as n, watch as R, nextTick as j, onMounted as G } from "vue";
import { ButtonType as g, MenuEntryType as $, WebPageController as z, WebItemsController as V, AppSize as k, FieldType as v, ColumnType as y, TableRowType as F, TableType as D, ItemCrudButtonNavVisibility as U, ItemCrudMode as C, FormInstance as I, FieldAutoValidationTrigger as S } from "lkt-vue-kernel";
import { useRoute as M, useRouter as E } from "vue-router";
import { createHTTPGetResource as L, createHTTPPostResource as J, createHTTPPutResource as K, createHTTPDeleteResource as Q } from "lkt-http-client";
const X = /* @__PURE__ */ f({
  __name: "LktAdminMenuButton",
  setup(i) {
    const e = h("adminMenu"), l = h("lktAdminEnabled");
    return (o, a) => {
      const r = _("lkt-button");
      return t(l) ? (b(), W(r, A({
        key: 0,
        checked: t(e),
        "onUpdate:checked": a[0] || (a[0] = (d) => O(e) ? e.value = d : null)
      }, {
        type: t(g).HiddenSwitch,
        icon: "lkt-icn-lkt",
        class: "lkt-admin-button"
      }), null, 16, ["checked"])) : H("", !0);
    };
  }
}), Y = /* @__PURE__ */ f({
  __name: "LktAdminMenu",
  setup(i) {
    const e = h("adminMenu"), l = T(() => {
      let o = [
        {
          key: "web-pages",
          type: $.Entry,
          icon: "lkt-icn-webpage",
          anchor: {
            to: "/admin/web-pages/0",
            text: "Pages",
            events: {
              click: () => {
                e.value = !1;
              }
            }
          }
        }
      ];
      return z.getPages().forEach((a) => {
        o.push({
          key: a.code,
          type: $.Entry,
          icon: "lkt-icn-webpage",
          anchor: {
            to: `/admin/web-pages/${a.id}`,
            text: a.label,
            events: {
              click: () => {
                e.value = !1;
              }
            }
          }
        });
      }), V.getItems().forEach((a) => {
        o.push({
          key: a.code,
          type: $.Entry,
          icon: a.icon,
          anchor: {
            to: `/admin/web-items/${a.code}`,
            text: a.labelMany,
            events: {
              click: () => {
                e.value = !1;
              }
            }
          }
        });
      }), o.push(
        {
          key: "translations",
          type: $.Entry,
          icon: "lkt-icn-lang-picker",
          anchor: {
            to: "/admin/i18n",
            text: "Translations",
            events: {
              click: () => {
                e.value = !1;
              }
            }
          }
        }
      ), o;
    });
    return (o, a) => {
      const r = _("lkt-menu");
      return b(), x("div", {
        class: q(["lkt-admin-menu", t(e) ? "is-opened" : ""])
      }, [
        B(r, {
          "model-value": l.value,
          onClickOutside: a[0] || (a[0] = (d) => e.value = !1)
        }, null, 8, ["model-value"])
      ], 2);
    };
  }
}), Z = { class: "lkt-admin-spa lkt-admin-pages" }, ee = /* @__PURE__ */ f({
  __name: "LktAdminPagesSpa",
  setup(i) {
    const e = M(), l = n(e.params.type), o = n(e.params.id), a = n({
      name: "",
      type: l.value
    }), r = n([]), d = n(null);
    R(e, (m) => {
      l.value = e.params.type, o.value = e.params.id, a.value.type = l.value;
    }, { flush: "pre", immediate: !0, deep: !0 });
    let s = h("lktAppSize");
    s || (s = n(k.MD));
    const u = T(() => [
      {
        type: y.Field,
        key: "name",
        label: "__:common.column.name",
        isForAccordionHeader: !0,
        field: {
          type: v.Text,
          icon: "lkt-icn-webpage"
        }
      },
      {
        type: y.Button,
        key: "details",
        label: "Details",
        button: {
          type: g.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (m) => `/admin/web-pages/${l.value}/${m.id}`
          }
        }
      }
    ]), c = T(() => {
      let m = "Web Pages";
      return z.getPages().forEach((p) => {
        if (p.id == l.value) {
          m = p.label ?? "Web Pages";
          return;
        }
      }), m;
    });
    return (m, p) => {
      const w = _("lkt-table");
      return b(), x("section", Z, [
        B(w, A({
          ref_key: "spaRef",
          ref: d,
          modelValue: r.value,
          "onUpdate:modelValue": p[0] || (p[0] = (P) => r.value = P)
        }, {
          type: t(s) < t(k).MD ? t(D).Accordion : t(D).Table,
          rowDisplayType: t(F).PreferColumns,
          title: c.value,
          titleTag: "h1",
          titleIcon: "lkt-icn-webpage",
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          columns: u.value,
          paginator: {
            resource: "ls-web-pages-type",
            resourceData: a.value
          },
          createButton: {
            icon: "lkt-icn-more",
            type: t(g).Anchor,
            anchor: {
              to: `/admin/web-pages/${l.value}/0`
            }
          },
          itemsContainerClass: t(s) < t(k).MD ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          }
        }), null, 16, ["modelValue"])
      ]);
    };
  }
}), te = { class: "lkt-admin-spa" }, ae = /* @__PURE__ */ f({
  __name: "LktAdminPageSpa",
  setup(i) {
    const e = M(), l = E(), o = n(e.params.type), a = n(e.params.id);
    R(e, (s) => {
      o.value = e.params.type, a.value = e.params.id;
    }, { flush: "pre", immediate: !0, deep: !0 });
    const r = n({}), d = (s) => `/admin/web-pages/${o.value}/${s}`;
    return (s, u) => {
      const c = _("lkt-web-page");
      return b(), x("section", te, [
        B(c, {
          modelValue: r.value,
          "onUpdate:modelValue": u[0] || (u[0] = (m) => r.value = m),
          "crud-config": {
            readResource: "r-web-page",
            readData: {
              id: a.value
            },
            mode: a.value > 0 ? t(C).Update : t(C).Create,
            buttonNavVisibility: t(U).Always,
            editing: !0,
            perms: ["update"],
            createButton: {
              resource: "mk-web-page",
              resourceData: { ...r.value, type: o.value },
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
                  t(l).back();
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
}), ne = { class: "lkt-admin-spa lkt-admin-translations" }, oe = /* @__PURE__ */ f({
  __name: "LktAdminTranslationsSpa",
  setup(i) {
    const e = M(), l = n(e.params.id), o = n({
      name: ""
    }), a = n([]), r = n(null);
    R(e, (c) => {
      l.value = e.params.id;
    }, { flush: "pre", immediate: !0, deep: !0 });
    let d = h("lktAppSize");
    d || (d = n(k.MD));
    const s = T(() => [
      {
        type: y.Field,
        key: "property",
        label: "Property",
        isForAccordionHeader: !0,
        field: {
          type: v.Text,
          icon: "lkt-icn-lang-picker"
        }
      },
      {
        type: y.Field,
        key: "type",
        label: "Type",
        ensureFieldLabel: d.value < k.MD,
        field: {
          type: v.Select,
          options: [v.Text, v.Textarea]
        }
      },
      {
        type: y.Field,
        key: "value",
        label: "Value",
        ensureFieldLabel: d.value < k.MD,
        field: {
          type: "prop:type",
          readModeConfig: {
            textMaxLength: 10
          }
        }
      },
      {
        type: y.Button,
        key: "details",
        label: "Details",
        button: {
          type: g.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (c) => `/admin/i18n/${c.id}`
          }
        }
      }
    ]), u = T(() => "Translations");
    return (c, m) => {
      const p = _("lkt-table");
      return b(), x("section", ne, [
        B(p, A({
          ref_key: "spaRef",
          ref: r,
          modelValue: a.value,
          "onUpdate:modelValue": m[0] || (m[0] = (w) => a.value = w)
        }, {
          type: t(d) < t(k).MD ? t(D).Accordion : t(D).Table,
          rowDisplayType: t(F).PreferColumns,
          title: u.value,
          titleTag: "h1",
          titleIcon: "lkt-icn-lang-picker",
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          columns: s.value,
          paginator: {
            resource: "ls-lkt-i18n",
            resourceData: o.value
          },
          createButton: {
            icon: "lkt-icn-more",
            text: "Add translation",
            type: t(g).Anchor,
            anchor: {
              to: "/admin/i18n/new"
            }
          },
          itemsContainerClass: t(d) < t(k).MD ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          }
        }), null, 16, ["modelValue"])
      ]);
    };
  }
}), le = { class: "lkt-admin-spa" }, re = /* @__PURE__ */ f({
  __name: "LktAdminTranslationSpa",
  setup(i) {
    const e = M(), l = E(), o = n(parseInt(e.params.id));
    R(e, (s) => {
      o.value = parseInt(e.params.id);
    }, { flush: "pre", immediate: !0, deep: !0 });
    const a = n({
      property: "",
      type: v.Text,
      value: "",
      valueData: {}
    }), r = (s) => `/admin/i18n/${s}`, d = T(() => ({
      items: [
        I.mkFieldItemConfig("property", {
          type: v.Text,
          label: "Property",
          mandatory: !0,
          validation: {
            trigger: S.Blur
          }
        }),
        I.mkFieldItemConfig("type", {
          type: v.Select,
          mandatory: !0,
          label: "Type",
          options: [v.Text, v.Textarea],
          validation: {
            trigger: S.Blur
          }
        }),
        I.mkFieldItemConfig("valueData", {
          type: a.value.type,
          mandatory: !0,
          canI18n: !0,
          label: "Value",
          validation: {
            trigger: S.Blur
          }
        })
      ]
    }));
    return (s, u) => {
      const c = _("lkt-item-crud");
      return b(), x("section", le, [
        B(c, A({
          modelValue: a.value,
          "onUpdate:modelValue": u[0] || (u[0] = (m) => a.value = m)
        }, {
          title: o.value > 0 ? a.value.property : "New translation",
          readResource: "r-i18n",
          readData: {
            id: o.value
          },
          mode: o.value > 0 ? t(C).Update : t(C).Create,
          form: d.value,
          buttonNavVisibility: t(U).Always,
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
            resourceData: { id: o.value },
            icon: "lkt-icn-trash",
            text: "Remove",
            events: {
              click: () => {
                t(l).back();
              }
            }
          },
          redirectOnCreate: r
        }), null, 16, ["modelValue"])
      ]);
    };
  }
}), ie = { class: "lkt-admin-spa lkt-web-items" }, se = /* @__PURE__ */ f({
  __name: "LktWebItemsSpa",
  setup(i) {
    const e = M(), l = n(e.params.type), o = n(e.params.id), a = n({
      name: "",
      type: l.value
    }), r = n([]), d = n(null), s = n(!1), u = n(V.getWebItemSettings(l.value));
    R(e, (p) => {
      l.value = e.params.type, o.value = e.params.id, r.value.splice(0, r.value.length), s.value = !1, a.value.type = l.value, u.value = V.getWebItemSettings(l.value), j(() => s.value = !0);
    }, { flush: "pre", immediate: !0, deep: !0 });
    let c = h("lktAppSize");
    c || (c = n(k.MD));
    const m = T(() => u.value.many.columns ? [
      ...u.value.many.columns,
      {
        type: y.Button,
        key: "details",
        label: "Details",
        button: {
          type: g.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (p) => `/admin/web-items/${l.value}/${p.id}`
          }
        }
      }
    ] : [
      {
        type: y.Field,
        key: "name",
        label: "Name",
        isForAccordionHeader: !0,
        field: {
          type: v.Text,
          icon: u.icon
        }
      },
      {
        type: y.Button,
        key: "details",
        label: "Details",
        button: {
          type: g.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (p) => `/admin/web-items/${l.value}/${p.id}`
          }
        }
      }
    ]);
    return G(() => {
      s.value = !0;
    }), (p, w) => {
      const P = _("lkt-table");
      return b(), x("section", ie, [
        s.value ? (b(), W(P, A({
          key: 0,
          ref_key: "spaRef",
          ref: d,
          modelValue: r.value,
          "onUpdate:modelValue": w[0] || (w[0] = (N) => r.value = N)
        }, {
          type: t(c) < t(k).MD ? t(D).Accordion : t(D).Table,
          rowDisplayType: t(F).PreferColumns,
          title: u.value.labelMany,
          titleTag: "h1",
          titleIcon: u.value.icon,
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          paginator: {
            resource: "ls-web-items",
            resourceData: a.value
          },
          createButton: {
            icon: "lkt-icn-more",
            text: "Add web item",
            type: t(g).Anchor,
            anchor: {
              to: "/admin/web-item/new"
            }
          },
          itemsContainerClass: t(c) < t(k).MD ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          },
          ...u.value.many,
          columns: m.value
        }), null, 16, ["modelValue"])) : H("", !0)
      ]);
    };
  }
}), ue = { class: "lkt-admin-spa lkt-web-item-spa" }, de = /* @__PURE__ */ f({
  __name: "LktWebItemSpa",
  setup(i) {
    const e = M(), l = E(), o = n(e.params.type), a = n(e.params.id), r = n(V.getWebItemSettings(o.value));
    R(e, (u) => {
      o.value = e.params.type, a.value = e.params.id, r.value = V.getWebItemSettings(o.value);
    }, { flush: "pre", immediate: !0, deep: !0 });
    const d = n({}), s = (u) => `/admin/web-items/${o.value}/${u}`;
    return (u, c) => {
      const m = _("lkt-item-crud");
      return b(), x("section", ue, [
        B(m, A({
          modelValue: d.value,
          "onUpdate:modelValue": c[0] || (c[0] = (p) => d.value = p)
        }, {
          title: r.value.labelSingle,
          readResource: "r-web-item",
          readData: {
            id: a.value
          },
          mode: a.value > 0 ? t(C).Update : t(C).Create,
          buttonNavVisibility: t(U).Always,
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
            resourceData: { id: a.value },
            icon: "lkt-icn-trash",
            text: "Remove",
            events: {
              click: () => {
                t(l).back();
              }
            }
          },
          redirectOnCreate: s,
          ...r.value.single
        }), null, 16, ["modelValue"])
      ]);
    };
  }
}), ve = () => {
  L({
    url: "/translations",
    name: "ls-lkt-i18n",
    digToPerms: "perms",
    digToData: "results",
    mapData: (i) => i
  }), L({
    url: "/translation/{id}",
    name: "r-i18n",
    params: { id: { default: void 0 } },
    digToPerms: "perms",
    digToData: "item",
    mapData: (i) => i
  }), J({
    url: "/translation",
    name: "mk-i18n",
    params: {
      type: { default: void 0 },
      property: { default: void 0 },
      valueData: { default: void 0 }
    },
    digToPerms: "perms",
    digToAutoReloadId: "item.id"
  }), K({
    url: "/translation/{id}",
    name: "up-i18n",
    params: {
      id: { default: void 0 },
      type: { default: void 0 },
      property: { default: void 0 },
      valueData: { default: void 0 }
    },
    digToPerms: "perms"
  }), Q({
    url: "/translation/{id}",
    name: "rm-i18n",
    params: {
      id: { default: void 0 }
    },
    digToPerms: "perms",
    digToData: "item"
  });
}, ye = {
  install: (i) => {
    i.component("lkt-admin-menu-button") === void 0 && i.component("lkt-admin-menu-button", X), i.component("lkt-admin-menu") === void 0 && i.component("lkt-admin-menu", Y);
  }
}, be = (i) => {
  i.addRoute({ path: "/admin/web-pages/:type", name: "lkt-admin-pages", component: ee }), i.addRoute({ path: "/admin/web-pages/:type/:id", name: "lkt-admin-page", component: ae }), i.addRoute({ path: "/admin/web-items/:type", name: "lkt-web-items", component: se }), i.addRoute({ path: "/admin/web-items/:type/:id", name: "lkt-web-item", component: de }), i.addRoute({ path: "/admin/i18n", name: "lkt-admin-translations", component: oe }), i.addRoute({ path: "/admin/i18n/:id", name: "lkt-admin-translation", component: re });
};
export {
  ye as default,
  ve as setupAdminTranslationsHttp,
  be as setupLktVueAdminRoutes
};

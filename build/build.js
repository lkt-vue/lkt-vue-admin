import { defineComponent as D, inject as w, resolveComponent as B, createBlock as H, createCommentVNode as M, unref as e, openBlock as x, mergeProps as P, isRef as Y, computed as f, createElementBlock as R, normalizeClass as Z, createVNode as U, ref as l, watch as I, nextTick as Q, onMounted as ee } from "vue";
import { ButtonType as A, WebPageController as q, MenuEntryType as W, WebItemsController as F, AppSize as g, FieldType as _, ColumnType as T, TableRowType as G, TableType as V, ItemCrudButtonNavVisibility as j, ItemCrudMode as $, FormInstance as N, FieldAutoValidationTrigger as O } from "lkt-vue-kernel";
import { useRoute as S, useRouter as J } from "vue-router";
import { createHTTPGetResource as K, createHTTPPostResource as te, createHTTPPutResource as ae, createHTTPDeleteResource as ne } from "lkt-http-client";
const le = /* @__PURE__ */ D({
  __name: "LktAdminMenuButton",
  setup(d) {
    const a = w("adminMenu"), n = w("lktAdminEnabled");
    return (o, t) => {
      const r = B("lkt-button");
      return e(n) ? (x(), H(r, P({
        key: 0,
        checked: e(a),
        "onUpdate:checked": t[0] || (t[0] = (m) => Y(a) ? a.value = m : null)
      }, {
        type: e(A).HiddenSwitch,
        icon: "lkt-icn-lkt",
        class: "lkt-admin-button"
      }), null, 16, ["checked"])) : M("", !0);
    };
  }
}), oe = /* @__PURE__ */ D({
  __name: "LktAdminMenu",
  setup(d) {
    const a = w("adminMenu"), n = f(() => {
      let o = [];
      return q.hasDefaultPageEnabled() && o.push({
        key: "web-pages",
        type: W.Entry,
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
      }), q.getPages().forEach((t) => {
        o.push({
          key: t.code,
          type: W.Entry,
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
      }), F.getItems().forEach((t) => {
        t.many !== !1 && o.push({
          key: t.code,
          type: W.Entry,
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
                a.value = !1;
              }
            }
          }
        }
      ), o;
    });
    return (o, t) => {
      const r = B("lkt-menu");
      return x(), R("div", {
        class: Z(["lkt-admin-menu", e(a) ? "is-opened" : ""])
      }, [
        U(r, {
          "model-value": n.value,
          onClickOutside: t[0] || (t[0] = (m) => a.value = !1)
        }, null, 8, ["model-value"])
      ], 2);
    };
  }
}), re = { class: "lkt-admin-spa lkt-admin-pages" }, ie = /* @__PURE__ */ D({
  __name: "LktAdminPagesSpa",
  setup(d) {
    const a = S(), n = l(a.params.type), o = l(a.params.id), t = l({
      name: "",
      type: n.value
    }), r = l([]), m = l(null);
    I(a, (u) => {
      n.value = a.params.type, o.value = a.params.id, t.value.type = n.value;
    }, { flush: "pre", immediate: !0, deep: !0 });
    let s = w("lktAppSize");
    s || (s = l(g.MD));
    const i = f(() => [
      {
        type: T.Field,
        key: "name",
        label: "__:common.column.name",
        isForAccordionHeader: !0,
        field: {
          type: _.Text,
          icon: "lkt-icn-webpage"
        }
      },
      {
        type: T.Button,
        key: "details",
        label: "Details",
        button: {
          type: A.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (u) => `/admin/web-pages/${n.value}/${u.id}`
          }
        }
      }
    ]), c = f(() => {
      let u = "Web Pages";
      return q.getPages().forEach((p) => {
        if (p.id == n.value) {
          u = p.label ?? "Web Pages";
          return;
        }
      }), u;
    });
    return (u, p) => {
      const h = B("lkt-table");
      return x(), R("section", re, [
        U(h, P({
          ref_key: "spaRef",
          ref: m,
          modelValue: r.value,
          "onUpdate:modelValue": p[0] || (p[0] = (y) => r.value = y)
        }, {
          type: e(s) < e(g).MD ? e(V).Accordion : e(V).Table,
          rowDisplayType: e(G).PreferColumns,
          title: c.value,
          titleTag: "h1",
          titleIcon: "lkt-icn-webpage",
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          columns: i.value,
          paginator: {
            resource: "ls-web-pages-type",
            resourceData: t.value
          },
          createButton: {
            icon: "lkt-icn-more",
            type: e(A).Anchor,
            anchor: {
              to: `/admin/web-pages/${n.value}/0`
            }
          },
          itemsContainerClass: e(s) < e(g).MD ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          }
        }), null, 16, ["modelValue"])
      ]);
    };
  }
}), ue = { class: "lkt-admin-spa" }, se = /* @__PURE__ */ D({
  __name: "LktAdminPageSpa",
  setup(d) {
    const a = S(), n = J(), o = l(a.params.type), t = l(a.params.id);
    I(a, (s) => {
      o.value = a.params.type, t.value = a.params.id;
    }, { flush: "pre", immediate: !0, deep: !0 });
    const r = l({}), m = (s) => `/admin/web-pages/${o.value}/${s}`;
    return (s, i) => {
      const c = B("lkt-web-page");
      return x(), R("section", ue, [
        U(c, {
          modelValue: r.value,
          "onUpdate:modelValue": i[0] || (i[0] = (u) => r.value = u),
          "crud-config": {
            readResource: "r-web-page",
            readData: {
              id: t.value
            },
            mode: t.value > 0 ? e($).Update : e($).Create,
            buttonNavVisibility: e(j).Always,
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
                  e(n).back();
                }
              }
            },
            redirectOnCreate: m
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
}), de = {
  key: 0,
  class: "lkt-admin-spa lkt-admin-translations"
}, ce = /* @__PURE__ */ D({
  __name: "LktAdminTranslationsSpa",
  setup(d) {
    const a = w("lktAdminEnabled");
    a.value || (window.location.href = "/");
    const n = S(), o = l(n.params.id), t = l({
      name: ""
    }), r = l([]), m = l(null);
    I(n, (u) => {
      o.value = n.params.id;
    }, { flush: "pre", immediate: !0, deep: !0 });
    let s = w("lktAppSize");
    s || (s = l(g.MD));
    const i = f(() => [
      {
        type: T.Field,
        key: "property",
        label: "Property",
        isForAccordionHeader: !0,
        field: {
          type: _.Text,
          icon: "lkt-icn-lang-picker"
        }
      },
      {
        type: T.Field,
        key: "type",
        label: "Type",
        ensureFieldLabel: s.value < g.MD,
        field: {
          type: _.Select,
          options: [_.Text, _.Textarea]
        }
      },
      {
        type: T.Field,
        key: "value",
        label: "Value",
        ensureFieldLabel: s.value < g.MD,
        field: {
          type: "prop:type",
          readModeConfig: {
            textMaxLength: 10
          }
        }
      },
      {
        type: T.Button,
        key: "details",
        label: "Details",
        button: {
          type: A.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (u) => `/admin/i18n/${u.id}`
          }
        }
      }
    ]), c = f(() => "Translations");
    return (u, p) => {
      const h = B("lkt-table");
      return e(a) ? (x(), R("section", de, [
        U(h, P({
          ref_key: "spaRef",
          ref: m,
          modelValue: r.value,
          "onUpdate:modelValue": p[0] || (p[0] = (y) => r.value = y)
        }, {
          type: e(s) < e(g).MD ? e(V).Accordion : e(V).Table,
          rowDisplayType: e(G).PreferColumns,
          header: {
            text: c.value,
            icon: "lkt-icn-lang-picker",
            tag: "h1"
          },
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          columns: i.value,
          paginator: {
            resource: "ls-lkt-i18n",
            resourceData: t.value
          },
          createButton: {
            icon: "lkt-icn-more",
            text: "Add translation",
            type: e(A).Anchor,
            anchor: {
              to: "/admin/i18n/new"
            }
          },
          itemsContainerClass: e(s) < e(g).MD ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          }
        }), null, 16, ["modelValue"])
      ])) : M("", !0);
    };
  }
}), me = {
  key: 0,
  class: "lkt-admin-spa"
}, pe = /* @__PURE__ */ D({
  __name: "LktAdminTranslationSpa",
  setup(d) {
    const a = w("lktAdminEnabled");
    a.value || (window.location.href = "/");
    const n = S(), o = J(), t = l(parseInt(n.params.id)), r = l(!1), m = l(["create", "switch-edit-mode"]);
    I(n, (u) => {
      t.value = parseInt(n.params.id);
    }, { flush: "pre", immediate: !0, deep: !0 });
    const s = l({
      property: "",
      type: _.Text,
      value: "",
      valueData: {}
    }), i = (u) => `/admin/i18n/${u}`, c = f(() => ({
      items: [
        N.mkFieldItemConfig("property", {
          type: _.Text,
          label: "Property",
          mandatory: !0,
          validation: {
            trigger: O.Blur
          }
        }),
        N.mkFieldItemConfig("type", {
          type: _.Select,
          mandatory: !0,
          label: "Type",
          options: [_.Text, _.Textarea],
          validation: {
            trigger: O.Blur
          }
        }),
        N.mkFieldItemConfig("valueData", {
          type: s.value.type,
          mandatory: !0,
          canI18n: !0,
          label: "Value",
          validation: {
            trigger: O.Blur
          }
        })
      ]
    }));
    return (u, p) => {
      const h = B("lkt-item-crud");
      return e(a) ? (x(), R("section", me, [
        U(h, P({
          modelValue: s.value,
          "onUpdate:modelValue": p[0] || (p[0] = (y) => s.value = y),
          editing: r.value,
          "onUpdate:editing": p[1] || (p[1] = (y) => r.value = y),
          perms: m.value,
          "onUpdate:perms": p[2] || (p[2] = (y) => m.value = y)
        }, {
          header: {
            text: t.value > 0 ? s.value.property : "New translation",
            icon: "lkt-icn-lang-picker",
            tag: "h1"
          },
          readResource: "r-i18n",
          readData: {
            id: t.value
          },
          mode: t.value > 0 ? e($).Update : e($).Create,
          form: c.value,
          buttonNavVisibility: e(j).Always,
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
                e(o).back();
              }
            }
          },
          redirectOnCreate: i
        }), null, 16, ["modelValue", "editing", "perms"])
      ])) : M("", !0);
    };
  }
}), ve = {
  key: 0,
  class: "lkt-admin-spa lkt-web-items"
}, ke = /* @__PURE__ */ D({
  __name: "LktWebItemsSpa",
  setup(d) {
    const a = w("lktAdminEnabled");
    a.value || (window.location.href = "/");
    const n = S(), o = l(n.params.type), t = l(n.params.id), r = l({
      name: "",
      type: o.value
    }), m = l([]), s = l(null), i = l(!1), c = l(F.getWebItemSettings(o.value));
    I(n, (b) => {
      o.value = n.params.type, t.value = n.params.id, m.value.splice(0, m.value.length), i.value = !1, r.value.type = o.value, c.value = F.getWebItemSettings(o.value), Q(() => i.value = !0);
    }, { flush: "pre", immediate: !0, deep: !0 });
    let u = w("lktAppSize");
    u || (u = l(g.MD));
    const p = f(() => c.value.many.columns ? [
      ...c.value.many.columns,
      {
        type: T.Button,
        key: "details",
        label: "Details",
        button: {
          type: A.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (b) => `/admin/web-items/${o.value}/${b.id}`
          }
        }
      }
    ] : [
      {
        type: T.Field,
        key: "name",
        label: "Name",
        isForAccordionHeader: !0,
        field: {
          type: _.Text,
          icon: c.value.icon
        }
      },
      {
        type: T.Button,
        key: "details",
        label: "Details",
        button: {
          type: A.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (b) => `/admin/web-items/${o.value}/${b.id}`
          }
        }
      }
    ]), h = f(() => ({
      text: c.value.labelMany ?? "",
      icon: c.value.icon,
      tag: "h1"
    })), y = f(() => {
      var b, C;
      return ((C = (b = c.value) == null ? void 0 : b.many) == null ? void 0 : C.createButton) === !1 ? !1 : {
        icon: "lkt-icn-more",
        text: "Add web item",
        type: A.Anchor,
        anchor: {
          to: `/admin/web-items/${o.value}/new`
        },
        ...c.value.many.createButton
      };
    });
    return ee(() => {
      i.value = !0;
    }), (b, C) => {
      const v = B("lkt-table");
      return e(a) ? (x(), R("section", ve, [
        i.value ? (x(), H(v, P({
          key: 0,
          ref_key: "spaRef",
          ref: s,
          modelValue: m.value,
          "onUpdate:modelValue": C[0] || (C[0] = (k) => m.value = k)
        }, {
          type: e(u) < e(g).MD ? e(V).Accordion : e(V).Table,
          rowDisplayType: e(G).PreferColumns,
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          paginator: {
            resource: "ls-web-items",
            resourceData: r.value
          },
          itemsContainerClass: e(u) < e(g).MD ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          },
          ...c.value.many,
          columns: p.value,
          header: h.value,
          createButton: y.value
        }), null, 16, ["modelValue"])) : M("", !0)
      ])) : M("", !0);
    };
  }
}), ye = {
  key: 0,
  class: "lkt-admin-spa lkt-web-item-spa"
}, fe = /* @__PURE__ */ D({
  __name: "LktWebItemSpa",
  setup(d) {
    const a = w("lktAdminEnabled"), n = S(), o = J(), t = l(n.params.type), r = l(n.params.id), m = l(!1), s = l(!1), i = l(F.getWebItemSettings(t.value)), c = l({}), u = l(n.params.onCreate);
    I(n, (v) => {
      c.value = {}, t.value = n.params.type, r.value = n.params.id, u.value = n.params.onCreate, m.value = !1, i.value = F.getWebItemSettings(t.value), Q(() => m.value = !0);
    }, { flush: "pre", immediate: !0, deep: !0 });
    const p = f(() => ({
      text: i.value.labelSingle ?? "",
      icon: i.value.icon,
      tag: "h1"
    })), h = f(() => {
      var v, k;
      return ((k = (v = i.value) == null ? void 0 : v.single) == null ? void 0 : k.createButton) === !1 ? !1 : {
        resource: "mk-web-item",
        icon: "lkt-icn-save",
        text: "Create",
        ...i.value.single.createButton,
        events: {
          click: (L) => {
            console.log("custom create button click: "), typeof i.value.single.createButton == "function" && i.value.single.createButton(L), typeof u.value == "function" && u.value(L);
          }
        }
      };
    }), y = f(() => {
      var v, k;
      return ((k = (v = i.value) == null ? void 0 : v.single) == null ? void 0 : k.updateButton) === !1 ? !1 : {
        resource: "up-web-item",
        icon: "lkt-icn-save",
        text: "Update",
        ...i.value.single.updateButton
      };
    }), b = f(() => {
      var v, k;
      return ((k = (v = i.value) == null ? void 0 : v.single) == null ? void 0 : k.dropButton) === !1 ? !1 : {
        resource: "rm-web-item",
        resourceData: { id: r },
        icon: "lkt-icn-trash",
        text: "Remove",
        events: {
          click: () => {
            o.back();
          }
        },
        ...i.value.single.dropButton
      };
    }), C = (v) => `/admin/web-items/${t.value}/${v}`;
    return (v, k) => {
      const L = B("lkt-item-crud"), X = B("lkt-loader");
      return e(a) ? (x(), R("section", ye, [
        m.value ? (x(), H(L, P({
          key: 0,
          modelValue: c.value,
          "onUpdate:modelValue": k[0] || (k[0] = (z) => c.value = z),
          editing: s.value,
          "onUpdate:editing": k[1] || (k[1] = (z) => s.value = z)
        }, {
          readResource: "r-web-item",
          readData: { id: r.value },
          mode: r.value > 0 ? e($).Update : e($).Create,
          buttonNavVisibility: e(j).Always,
          redirectOnCreate: C,
          ...i.value.single,
          header: p.value,
          createButton: h.value,
          updateButton: y.value,
          dropButton: b.value
        }), null, 16, ["modelValue", "editing"])) : (x(), H(X, { key: 1 }))
      ])) : M("", !0);
    };
  }
}), we = () => {
  K({
    url: "/translations",
    name: "ls-lkt-i18n",
    digToPerms: "perms",
    digToData: "results",
    mapData: (d) => d
  }), K({
    url: "/translation/{id}",
    name: "r-i18n",
    params: { id: { default: void 0 } },
    digToPerms: "perms",
    digToData: "item",
    mapData: (d) => d
  }), te({
    url: "/translation",
    name: "mk-i18n",
    params: {
      type: { default: void 0 },
      property: { default: void 0 },
      valueData: { default: void 0 }
    },
    digToPerms: "perms",
    digToAutoReloadId: "item.id"
  }), ae({
    url: "/translation/{id}",
    name: "up-i18n",
    params: {
      id: { default: void 0 },
      type: { default: void 0 },
      property: { default: void 0 },
      valueData: { default: void 0 }
    },
    digToPerms: "perms"
  }), ne({
    url: "/translation/{id}",
    name: "rm-i18n",
    params: {
      id: { default: void 0 }
    },
    digToPerms: "perms",
    digToData: "item"
  });
}, he = {
  install: (d) => {
    d.component("lkt-admin-menu-button") === void 0 && d.component("lkt-admin-menu-button", le), d.component("lkt-admin-menu") === void 0 && d.component("lkt-admin-menu", oe);
  }
}, E = (d, a) => {
}, Te = (d) => {
  d.addRoute({ path: "/admin/web-pages/:type", name: "lkt-admin-pages", component: ie, beforeEnter: E }), d.addRoute({ path: "/admin/web-pages/:type/:id", name: "lkt-admin-page", component: se, beforeEnter: E }), d.addRoute({ path: "/admin/web-items/:type", name: "lkt-web-items", component: ke, beforeEnter: E }), d.addRoute({ path: "/admin/web-items/:type/:id", name: "lkt-web-item", component: fe, beforeEnter: E }), d.addRoute({ path: "/admin/i18n", name: "lkt-admin-translations", component: ce, beforeEnter: E }), d.addRoute({ path: "/admin/i18n/:id", name: "lkt-admin-translation", component: pe, beforeEnter: E });
};
export {
  he as default,
  we as setupAdminTranslationsHttp,
  Te as setupLktVueAdminRoutes
};

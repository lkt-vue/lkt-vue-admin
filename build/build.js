import { defineComponent as R, inject as T, resolveComponent as B, createBlock as P, createCommentVNode as I, unref as a, openBlock as _, mergeProps as U, isRef as le, computed as f, createElementBlock as E, normalizeClass as oe, createVNode as j, ref as o, watch as N, nextTick as O, onMounted as re } from "vue";
import { ButtonType as D, WebPageController as X, MenuEntryType as G, WebItemsController as z, AppSize as x, FieldType as w, ColumnType as C, TableRowType as Y, TableType as S, ItemCrudButtonNavVisibility as Z, ItemCrudMode as F, FormInstance as K, FieldAutoValidationTrigger as Q } from "lkt-vue-kernel";
import { useRoute as L, useRouter as ee } from "vue-router";
import { time as ae } from "lkt-date-tools";
import { createHTTPGetResource as te, createHTTPPostResource as ie, createHTTPPutResource as ue, createHTTPDeleteResource as se } from "lkt-http-client";
const de = /* @__PURE__ */ R({
  __name: "LktAdminMenuButton",
  setup(u) {
    const t = T("adminMenu"), r = T("lktAdminEnabled");
    return (n, l) => {
      const i = B("lkt-button");
      return a(r) ? (_(), P(i, U({
        key: 0,
        checked: a(t),
        "onUpdate:checked": l[0] || (l[0] = (d) => le(t) ? t.value = d : null)
      }, {
        type: a(D).HiddenSwitch,
        icon: "lkt-icn-lkt",
        class: "lkt-admin-button"
      }), null, 16, ["checked"])) : I("", !0);
    };
  }
}), ce = /* @__PURE__ */ R({
  __name: "LktAdminMenu",
  setup(u) {
    const t = T("adminMenu"), r = f(() => {
      let n = [];
      return X.hasDefaultPageEnabled() && n.push({
        key: "web-pages",
        type: G.Entry,
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
      }), X.getPages().forEach((l) => {
        n.push({
          key: l.code,
          type: G.Entry,
          icon: "lkt-icn-webpage",
          anchor: {
            to: `/admin/web-pages/${l.id}`,
            text: l.label,
            events: {
              click: () => {
                t.value = !1;
              }
            }
          }
        });
      }), z.getItems().forEach((l) => {
        l.many !== !1 && n.push({
          key: l.code,
          type: G.Entry,
          icon: l.icon,
          anchor: {
            to: `/admin/web-items/${l.code}`,
            text: l.labelMany,
            events: {
              click: () => {
                t.value = !1;
              }
            }
          }
        });
      }), n.push(
        {
          key: "translations",
          type: G.Entry,
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
      ), n;
    });
    return (n, l) => {
      const i = B("lkt-menu");
      return _(), E("div", {
        class: oe(["lkt-admin-menu", a(t) ? "is-opened" : ""])
      }, [
        j(i, {
          "model-value": r.value,
          onClickOutside: l[0] || (l[0] = (d) => t.value = !1)
        }, null, 8, ["model-value"])
      ], 2);
    };
  }
}), pe = { class: "lkt-admin-spa lkt-admin-pages" }, me = /* @__PURE__ */ R({
  __name: "LktAdminPagesSpa",
  setup(u) {
    const t = L(), r = o(t.params.type), n = o(t.params.id), l = o({
      name: "",
      type: r.value
    }), i = o([]), d = o(null);
    N(t, (e) => {
      r.value = t.params.type, n.value = t.params.id, l.value.type = r.value;
    }, { flush: "pre", immediate: !0, deep: !0 });
    let s = T("lktAppSize");
    s || (s = o(x.MD));
    const c = f(() => [
      {
        type: C.Field,
        key: "name",
        label: "__:common.column.name",
        isForAccordionHeader: !0,
        field: {
          type: w.Text,
          icon: "lkt-icn-webpage"
        }
      },
      {
        type: C.Button,
        key: "details",
        label: "Details",
        button: {
          type: D.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (e) => `/admin/web-pages/${r.value}/${e.id}`
          }
        }
      }
    ]), p = f(() => {
      let e = "Web Pages";
      return X.getPages().forEach((k) => {
        if (k.id == r.value) {
          e = k.label ?? "Web Pages";
          return;
        }
      }), e;
    });
    return (e, k) => {
      const m = B("lkt-table");
      return _(), E("section", pe, [
        j(m, U({
          ref_key: "spaRef",
          ref: d,
          modelValue: i.value,
          "onUpdate:modelValue": k[0] || (k[0] = (A) => i.value = A)
        }, {
          type: a(s) < a(x).MD ? a(S).Accordion : a(S).Table,
          rowDisplayType: a(Y).PreferColumns,
          title: p.value,
          titleTag: "h1",
          titleIcon: "lkt-icn-webpage",
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          columns: c.value,
          paginator: {
            resource: "ls-web-pages-type",
            resourceData: l.value
          },
          createButton: {
            icon: "lkt-icn-more",
            type: a(D).Anchor,
            anchor: {
              to: `/admin/web-pages/${r.value}/0`
            }
          },
          itemsContainerClass: a(s) < a(x).MD ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          }
        }), null, 16, ["modelValue"])
      ]);
    };
  }
}), ve = { class: "lkt-admin-spa" }, ke = /* @__PURE__ */ R({
  __name: "LktAdminPageSpa",
  setup(u) {
    const t = L(), r = ee(), n = o(t.params.type), l = o(t.params.id);
    N(t, (s) => {
      n.value = t.params.type, l.value = t.params.id;
    }, { flush: "pre", immediate: !0, deep: !0 });
    const i = o({}), d = (s) => `/admin/web-pages/${n.value}/${s}`;
    return (s, c) => {
      const p = B("lkt-web-page");
      return _(), E("section", ve, [
        j(p, {
          modelValue: i.value,
          "onUpdate:modelValue": c[0] || (c[0] = (e) => i.value = e),
          "crud-config": {
            readResource: "r-web-page",
            readData: {
              id: l.value
            },
            mode: l.value > 0 ? a(F).Update : a(F).Create,
            buttonNavVisibility: a(Z).Always,
            editing: !0,
            perms: ["update"],
            createButton: {
              resource: "mk-web-page",
              resourceData: { ...i.value, type: n.value },
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
                  a(r).back();
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
}), ye = {
  key: 0,
  class: "lkt-admin-spa lkt-admin-translations"
}, fe = /* @__PURE__ */ R({
  __name: "LktAdminTranslationsSpa",
  setup(u) {
    const t = T("lktAdminEnabled");
    t.value || (window.location.href = "/");
    const r = L(), n = o(r.params.id), l = o({
      name: ""
    }), i = o([]), d = o(null);
    N(r, (e) => {
      n.value = r.params.id;
    }, { flush: "pre", immediate: !0, deep: !0 });
    let s = T("lktAppSize");
    s || (s = o(x.MD));
    const c = f(() => [
      {
        type: C.Field,
        key: "property",
        label: "Property",
        isForAccordionHeader: !0,
        field: {
          type: w.Text,
          icon: "lkt-icn-lang-picker"
        }
      },
      {
        type: C.Field,
        key: "type",
        label: "Type",
        ensureFieldLabel: s.value < x.MD,
        field: {
          type: w.Select,
          options: [w.Text, w.Textarea]
        }
      },
      {
        type: C.Field,
        key: "value",
        label: "Value",
        ensureFieldLabel: s.value < x.MD,
        field: {
          type: "prop:type",
          readModeConfig: {
            textMaxLength: 10
          }
        }
      },
      {
        type: C.Button,
        key: "details",
        label: "Details",
        button: {
          type: D.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (e) => `/admin/i18n/${e.id}`
          }
        }
      }
    ]), p = f(() => "Translations");
    return (e, k) => {
      const m = B("lkt-table");
      return a(t) ? (_(), E("section", ye, [
        j(m, U({
          ref_key: "spaRef",
          ref: d,
          modelValue: i.value,
          "onUpdate:modelValue": k[0] || (k[0] = (A) => i.value = A)
        }, {
          type: a(s) < a(x).MD ? a(S).Accordion : a(S).Table,
          rowDisplayType: a(Y).PreferColumns,
          header: {
            text: p.value,
            icon: "lkt-icn-lang-picker",
            tag: "h1"
          },
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          columns: c.value,
          paginator: {
            resource: "ls-lkt-i18n",
            resourceData: l.value
          },
          createButton: {
            icon: "lkt-icn-more",
            text: "Add translation",
            type: a(D).Anchor,
            anchor: {
              to: "/admin/i18n/new"
            }
          },
          itemsContainerClass: a(s) < a(x).MD ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          }
        }), null, 16, ["modelValue"])
      ])) : I("", !0);
    };
  }
}), ge = {
  key: 0,
  class: "lkt-admin-spa"
}, be = /* @__PURE__ */ R({
  __name: "LktAdminTranslationSpa",
  setup(u) {
    const t = T("lktAdminEnabled");
    t.value || (window.location.href = "/");
    const r = L(), n = ee(), l = o(parseInt(r.params.id)), i = o(!1), d = o(!1), s = o(["create", "switch-edit-mode"]), c = o({
      property: "",
      type: w.Text,
      value: "",
      valueData: {}
    });
    N(r, (k) => {
      l.value = parseInt(r.params.id), d.value = !1, i.value = !1, c.value = {
        property: "",
        type: w.Text,
        value: "",
        valueData: {}
      }, s.value = ["create", "switch-edit-mode"], O(() => d.value = !0);
    }, { flush: "pre", immediate: !0, deep: !0 });
    const p = f(() => ({
      items: [
        K.mkFieldItemConfig("property", {
          type: w.Text,
          label: "Property",
          mandatory: !0,
          validation: {
            trigger: Q.Blur
          }
        }),
        K.mkFieldItemConfig("type", {
          type: w.Select,
          mandatory: !0,
          label: "Type",
          options: [w.Text, w.Textarea],
          validation: {
            trigger: Q.Blur
          }
        }),
        K.mkFieldItemConfig("valueData", {
          type: c.value.type,
          mandatory: !0,
          canI18n: !0,
          label: "Value",
          validation: {
            trigger: Q.Blur
          }
        })
      ]
    })), e = f(() => ({
      header: {
        text: l.value > 0 ? c.value.property : "New translation",
        icon: "lkt-icn-lang-picker",
        tag: "h1"
      },
      readResource: "r-i18n",
      readData: {
        id: l.value
      },
      mode: l.value > 0 ? F.Update : F.Create,
      form: p.value,
      buttonNavVisibility: Z.Always,
      createButton: {
        resource: "mk-i18n",
        icon: "lkt-icn-save",
        text: "Create",
        events: {
          click: (k) => {
            var m;
            n.push({
              path: `/admin/i18n/${(m = k.httpResponse) == null ? void 0 : m.autoReloadId}`,
              replace: !0
            });
          }
        }
      },
      createAndNewButton: {
        resource: "mk-i18n",
        icon: "lkt-icn-save",
        text: "Create and new",
        events: {
          click: (k) => {
            n.push({
              path: "/admin/i18n/new",
              query: {
                keepCreating: ae()
              },
              replace: !0
            });
          }
        }
      },
      updateButton: {
        resource: "up-i18n",
        icon: "lkt-icn-save",
        text: "Update"
      },
      dropButton: {
        resource: "rm-i18n",
        resourceData: { id: l.value },
        icon: "lkt-icn-trash",
        text: "Remove",
        events: {
          click: () => {
            n.back();
          }
        }
      }
      // redirectOnCreate,
    }));
    return (k, m) => {
      const A = B("lkt-item-crud"), g = B("lkt-loader");
      return a(t) ? (_(), E("section", ge, [
        d.value ? (_(), P(A, U({
          key: 0,
          modelValue: c.value,
          "onUpdate:modelValue": m[0] || (m[0] = (b) => c.value = b),
          editing: i.value,
          "onUpdate:editing": m[1] || (m[1] = (b) => i.value = b),
          perms: s.value,
          "onUpdate:perms": m[2] || (m[2] = (b) => s.value = b)
        }, e.value), null, 16, ["modelValue", "editing", "perms"])) : (_(), P(g, { key: 1 }))
      ])) : I("", !0);
    };
  }
}), _e = {
  key: 0,
  class: "lkt-admin-spa lkt-web-items"
}, we = /* @__PURE__ */ R({
  __name: "LktWebItemsSpa",
  setup(u) {
    const t = T("lktAdminEnabled");
    t.value || (window.location.href = "/");
    const r = L(), n = o(r.params.type), l = o(r.params.id), i = o({
      name: "",
      type: n.value
    }), d = o([]), s = o(null), c = o(!1), p = o(z.getWebItemSettings(n.value));
    N(r, (g) => {
      n.value = r.params.type, l.value = r.params.id, d.value.splice(0, d.value.length), c.value = !1, i.value.type = n.value, p.value = z.getWebItemSettings(n.value), O(() => c.value = !0);
    }, { flush: "pre", immediate: !0, deep: !0 });
    let e = T("lktAppSize");
    e || (e = o(x.MD));
    const k = f(() => p.value.many.columns ? [
      ...p.value.many.columns,
      {
        type: C.Button,
        key: "details",
        label: "Details",
        button: {
          type: D.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (g) => `/admin/web-items/${n.value}/${g.id}`
          }
        }
      }
    ] : [
      {
        type: C.Field,
        key: "name",
        label: "Name",
        isForAccordionHeader: !0,
        field: {
          type: w.Text,
          icon: p.value.icon
        }
      },
      {
        type: C.Button,
        key: "details",
        label: "Details",
        button: {
          type: D.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (g) => `/admin/web-items/${n.value}/${g.id}`
          }
        }
      }
    ]), m = f(() => ({
      text: p.value.labelMany ?? "",
      icon: p.value.icon,
      tag: "h1"
    })), A = f(() => {
      var g, b, M;
      return ((b = (g = p.value) == null ? void 0 : g.many) == null ? void 0 : b.createButton) === !1 ? !1 : {
        icon: "lkt-icn-more",
        text: "Add web item",
        type: D.Anchor,
        anchor: {
          to: `/admin/web-items/${n.value}/new`
        },
        //@ts-ignore
        ...(M = p.value.many) == null ? void 0 : M.createButton
      };
    });
    return re(() => {
      c.value = !0;
    }), (g, b) => {
      const M = B("lkt-table");
      return a(t) ? (_(), E("section", _e, [
        c.value ? (_(), P(M, U({
          key: 0,
          ref_key: "spaRef",
          ref: s,
          modelValue: d.value,
          "onUpdate:modelValue": b[0] || (b[0] = (J) => d.value = J)
        }, {
          type: a(e) < a(x).MD ? a(S).Accordion : a(S).Table,
          rowDisplayType: a(Y).PreferColumns,
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          paginator: {
            resource: "ls-web-items",
            resourceData: i.value
          },
          itemsContainerClass: a(e) < a(x).MD ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          },
          ...p.value.many,
          columns: k.value,
          header: m.value,
          createButton: A.value
        }), null, 16, ["modelValue"])) : I("", !0)
      ])) : I("", !0);
    };
  }
}), he = {
  key: 0,
  class: "lkt-admin-spa lkt-web-item-spa"
}, xe = /* @__PURE__ */ R({
  __name: "LktWebItemSpa",
  props: {
    id: {},
    type: {},
    onCreateTo: {}
  },
  setup(u) {
    const t = T("lktAdminEnabled"), r = u, n = L(), l = ee(), i = o(n.params.type), d = o(n.params.id), s = o(!1), c = o(!1), p = o(["create"]), e = o(z.getWebItemSettings(i.value)), k = (v) => typeof e.value.itemGenerator == "function" ? e.value.itemGenerator(v) : {
      ...v
    }, m = o(k(n.query));
    N(n, (v) => {
      i.value = n.params.type, d.value = n.params.id, s.value = !1, c.value = !1, p.value = ["create"], e.value = z.getWebItemSettings(i.value), O(() => {
        m.value = k(n.query), O(() => s.value = !0);
      });
    }, { flush: "pre", immediate: !0, deep: !0 });
    const A = f(() => ({
      text: e.value.labelSingle ?? "",
      icon: e.value.icon,
      tag: "h1"
    })), g = f(() => {
      var v, y;
      return ((y = (v = e.value) == null ? void 0 : v.single) == null ? void 0 : y.createButton) === !1 ? !1 : {
        resource: "mk-web-item",
        icon: "lkt-icn-save",
        text: "Create",
        ...e.value.single.createButton,
        events: {
          click: (W) => {
            var $, h, H, q;
            typeof ((h = ($ = e.value.single.createButton) == null ? void 0 : $.events) == null ? void 0 : h.click) == "function" && ((q = (H = e.value.single.createButton) == null ? void 0 : H.events) == null || q.click(W)), r.onCreateTo && l.push({
              path: r.onCreateTo,
              replace: !0
            });
          }
        }
      };
    }), b = f(() => {
      var v, y;
      return ((y = (v = e.value) == null ? void 0 : v.single) == null ? void 0 : y.createButton) === !1 ? !1 : {
        resource: "mk-web-item",
        icon: "lkt-icn-save",
        text: "Create",
        ...e.value.single.createAndNewButton,
        events: {
          click: (W) => {
            var $, h, H, q;
            typeof ((h = ($ = e.value.single.createAndNewButton) == null ? void 0 : $.events) == null ? void 0 : h.click) == "function" && ((q = (H = e.value.single.createAndNewButton) == null ? void 0 : H.events) == null || q.click(W)), l.push({
              path: `/admin/web-items/${i.value}/new`,
              query: {
                keepCreating: ae()
              },
              replace: !0
            });
          }
        }
      };
    }), M = f(() => {
      var v, y;
      return ((y = (v = e.value) == null ? void 0 : v.single) == null ? void 0 : y.updateButton) === !1 ? !1 : {
        resource: "up-web-item",
        icon: "lkt-icn-save",
        text: "Update",
        ...e.value.single.updateButton
      };
    }), J = f(() => {
      var v, y;
      return ((y = (v = e.value) == null ? void 0 : v.single) == null ? void 0 : y.dropButton) === !1 ? !1 : {
        resource: "rm-web-item",
        resourceData: { id: d },
        icon: "lkt-icn-trash",
        text: "Remove",
        events: {
          click: () => {
            l.back();
          }
        },
        ...e.value.single.dropButton
      };
    }), ne = (v) => `/admin/web-items/${i.value}/${v}`;
    return (v, y) => {
      const W = B("lkt-item-crud"), $ = B("lkt-loader");
      return a(t) ? (_(), E("section", he, [
        s.value ? (_(), P(W, U({
          key: 0,
          modelValue: m.value,
          "onUpdate:modelValue": y[0] || (y[0] = (h) => m.value = h),
          editing: c.value,
          "onUpdate:editing": y[1] || (y[1] = (h) => c.value = h),
          perms: p.value,
          "onUpdate:perms": y[2] || (y[2] = (h) => p.value = h)
        }, {
          readResource: "r-web-item",
          readData: { id: d.value },
          mode: d.value > 0 ? a(F).Update : a(F).Create,
          buttonNavVisibility: a(Z).Always,
          redirectOnCreate: ne,
          ...e.value.single,
          header: A.value,
          createButton: g.value,
          createAndNewButton: b.value,
          updateButton: M.value,
          dropButton: J.value
        }), null, 16, ["modelValue", "editing", "perms"])) : (_(), P($, { key: 1 }))
      ])) : I("", !0);
    };
  }
}), Re = () => {
  te({
    url: "/translations",
    name: "ls-lkt-i18n",
    digToPerms: "perms",
    digToData: "results",
    mapData: (u) => u
  }), te({
    url: "/translation/{id}",
    name: "r-i18n",
    params: { id: { default: void 0 } },
    digToPerms: "perms",
    digToData: "item",
    mapData: (u) => u
  }), ie({
    url: "/translation",
    name: "mk-i18n",
    params: {
      type: { default: void 0 },
      property: { default: void 0 },
      valueData: { default: void 0 }
    },
    digToPerms: "perms",
    digToAutoReloadId: "item.id"
  }), ue({
    url: "/translation/{id}",
    name: "up-i18n",
    params: {
      id: { default: void 0 },
      type: { default: void 0 },
      property: { default: void 0 },
      valueData: { default: void 0 }
    },
    digToPerms: "perms"
  }), se({
    url: "/translation/{id}",
    name: "rm-i18n",
    params: {
      id: { default: void 0 }
    },
    digToPerms: "perms",
    digToData: "item"
  });
}, $e = {
  install: (u) => {
    u.component("lkt-admin-menu-button") === void 0 && u.component("lkt-admin-menu-button", de), u.component("lkt-admin-menu") === void 0 && u.component("lkt-admin-menu", ce);
  }
}, V = (u, t) => {
}, Ee = (u) => {
  u.addRoute({ path: "/admin/web-pages/:type", name: "lkt-admin-pages", component: me, beforeEnter: V }), u.addRoute({ path: "/admin/web-pages/:type/:id", name: "lkt-admin-page", component: ke, beforeEnter: V }), u.addRoute({ path: "/admin/web-items/:type", name: "lkt-web-items", component: we, beforeEnter: V }), u.addRoute({ path: "/admin/web-items/:type/:id", name: "lkt-web-item", component: xe, beforeEnter: V, props: (t) => ({
    id: t.params.id,
    type: t.params.type,
    onCreateTo: t.query.onCreateTo ?? ""
  }) }), u.addRoute({ path: "/admin/i18n", name: "lkt-admin-translations", component: fe, beforeEnter: V }), u.addRoute({ path: "/admin/i18n/:id", name: "lkt-admin-translation", component: be, beforeEnter: V });
};
export {
  $e as default,
  Re as setupAdminTranslationsHttp,
  Ee as setupLktVueAdminRoutes
};

import { defineComponent as b, inject as x, resolveComponent as _, createBlock as H, createCommentVNode as z, unref as t, openBlock as T, mergeProps as B, isRef as N, computed as g, createElementBlock as D, normalizeClass as O, createVNode as h, ref as i, watch as f } from "vue";
import { ButtonType as w, MenuEntryType as M, WebPageController as I, AppSize as k, FieldType as c, ColumnType as v, TableRowType as S, TableType as C, ItemCrudButtonNavVisibility as E, ItemCrudMode as A, FormInstance as V, FieldAutoValidationTrigger as $ } from "lkt-vue-kernel";
import { useRoute as R, useRouter as L } from "vue-router";
import { createHTTPGetResource as F, createHTTPPostResource as W, createHTTPPutResource as q, createHTTPDeleteResource as j } from "lkt-http-client";
const G = /* @__PURE__ */ b({
  __name: "LktAdminMenuButton",
  setup(n) {
    const e = x("adminMenu"), r = x("lktAdminEnabled");
    return (o, a) => {
      const l = _("lkt-button");
      return t(r) ? (T(), H(l, B({
        key: 0,
        checked: t(e),
        "onUpdate:checked": a[0] || (a[0] = (s) => N(e) ? e.value = s : null)
      }, {
        type: t(w).HiddenSwitch,
        icon: "lkt-icn-lkt",
        class: "lkt-admin-button"
      }), null, 16, ["checked"])) : z("", !0);
    };
  }
}), J = /* @__PURE__ */ b({
  __name: "LktAdminMenu",
  setup(n) {
    const e = x("adminMenu"), r = g(() => {
      let o = [
        {
          key: "web-pages",
          type: M.Entry,
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
      return I.getPages().forEach((a) => {
        o.push({
          key: a.code,
          type: M.Entry,
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
      }), o.push(
        {
          key: "translations",
          type: M.Entry,
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
      const l = _("lkt-menu");
      return T(), D("div", {
        class: O(["lkt-admin-menu", t(e) ? "is-opened" : ""])
      }, [
        h(l, {
          "model-value": r.value,
          onClickOutside: a[0] || (a[0] = (s) => e.value = !1)
        }, null, 8, ["model-value"])
      ], 2);
    };
  }
}), K = { class: "lkt-admin-spa lkt-admin-pages" }, Q = /* @__PURE__ */ b({
  __name: "LktAdminPagesSpa",
  setup(n) {
    const e = R(), r = i(e.params.type), o = i(e.params.id), a = i({
      name: "",
      type: r.value
    }), l = i([]), s = i(null);
    f(e, (u) => {
      r.value = e.params.type, o.value = e.params.id, a.value.type = r.value;
    }, { flush: "pre", immediate: !0, deep: !0 });
    let d = x("lktAppSize");
    d || (d = i(k.MD));
    const m = g(() => [
      {
        type: v.Field,
        key: "name",
        label: "__:common.column.name",
        isForAccordionHeader: !0,
        field: {
          type: c.Text,
          icon: "lkt-icn-webpage"
        }
      },
      {
        type: v.Button,
        key: "details",
        label: "Details",
        button: {
          type: w.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (u) => `/admin/web-pages/${r.value}/${u.id}`
          }
        }
      }
    ]), p = g(() => {
      let u = "Web Pages";
      return I.getPages().forEach((y) => {
        if (y.id == r.value) {
          u = y.label ?? "Web Pages";
          return;
        }
      }), u;
    });
    return f(l, (u) => {
      console.log(u);
    }), (u, y) => {
      const P = _("lkt-table");
      return T(), D("section", K, [
        h(P, B({
          ref_key: "spaRef",
          ref: s,
          modelValue: l.value,
          "onUpdate:modelValue": y[0] || (y[0] = (U) => l.value = U)
        }, {
          type: t(d) < t(k).MD ? t(C).Accordion : t(C).Table,
          rowDisplayType: t(S).PreferColumns,
          title: p.value,
          titleTag: "h1",
          titleIcon: "lkt-icn-webpage",
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          columns: m.value,
          paginator: {
            resource: "ls-web-pages-type",
            resourceData: a.value
          },
          createButton: {
            icon: "lkt-icn-more",
            type: t(w).Anchor,
            anchor: {
              to: `/admin/web-pages/${r.value}/0`
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
}), X = { class: "lkt-admin-spa" }, Y = /* @__PURE__ */ b({
  __name: "LktAdminPageSpa",
  setup(n) {
    const e = R(), r = L(), o = i(e.params.type), a = i(e.params.id);
    f(e, (d) => {
      o.value = e.params.type, a.value = e.params.id;
    }, { flush: "pre", immediate: !0, deep: !0 });
    const l = i({}), s = (d) => `/admin/web-pages/${o.value}/${d}`;
    return (d, m) => {
      const p = _("lkt-web-page");
      return T(), D("section", X, [
        h(p, {
          modelValue: l.value,
          "onUpdate:modelValue": m[0] || (m[0] = (u) => l.value = u),
          "crud-config": {
            readResource: "r-web-page",
            readData: {
              id: a.value
            },
            mode: a.value > 0 ? t(A).Update : t(A).Create,
            buttonNavVisibility: t(E).Always,
            editing: !0,
            perms: ["update"],
            createButton: {
              resource: "mk-web-page",
              resourceData: { ...l.value, type: o.value },
              text: "Create",
              disabled: !1
            },
            updateButton: {
              resource: "up-web-page",
              resourceData: l.value,
              text: "Update",
              disabled: !1
            },
            dropButton: {
              resource: "rm-web-page",
              resourceData: l.value,
              text: "Remove",
              disabled: !1,
              events: {
                click: () => {
                  t(r).back();
                }
              }
            },
            redirectOnCreate: s
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
}), Z = { class: "lkt-admin-spa lkt-admin-translations" }, ee = /* @__PURE__ */ b({
  __name: "LktAdminTranslationsSpa",
  setup(n) {
    const e = R(), r = i(e.params.id), o = i({
      name: ""
    }), a = i([]), l = i(null);
    f(e, (p) => {
      r.value = e.params.id;
    }, { flush: "pre", immediate: !0, deep: !0 });
    let s = x("lktAppSize");
    s || (s = i(k.MD));
    const d = g(() => [
      {
        type: v.Field,
        key: "property",
        label: "Property",
        isForAccordionHeader: !0,
        field: {
          type: c.Text,
          icon: "lkt-icn-lang-picker"
        }
      },
      {
        type: v.Field,
        key: "type",
        label: "Type",
        ensureFieldLabel: s.value < k.MD,
        field: {
          type: c.Select,
          options: [c.Text, c.Textarea]
        }
      },
      {
        type: v.Field,
        key: "value",
        label: "Value",
        ensureFieldLabel: s.value < k.MD,
        field: {
          type: "prop:type",
          readModeConfig: {
            textMaxLength: 10
          }
        }
      },
      {
        type: v.Button,
        key: "details",
        label: "Details",
        button: {
          type: w.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (p) => `/admin/i18n/${p.id}`
          }
        }
      }
    ]), m = g(() => "Translations");
    return f(a, (p) => {
      console.log(p);
    }), (p, u) => {
      const y = _("lkt-table");
      return T(), D("section", Z, [
        h(y, B({
          ref_key: "spaRef",
          ref: l,
          modelValue: a.value,
          "onUpdate:modelValue": u[0] || (u[0] = (P) => a.value = P)
        }, {
          type: t(s) < t(k).MD ? t(C).Accordion : t(C).Table,
          rowDisplayType: t(S).PreferColumns,
          title: m.value,
          titleTag: "h1",
          titleIcon: "lkt-icn-lang-picker",
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          columns: d.value,
          paginator: {
            resource: "ls-lkt-i18n",
            resourceData: o.value
          },
          createButton: {
            icon: "lkt-icn-more",
            text: "Add translation",
            type: t(w).Anchor,
            anchor: {
              to: "/admin/i18n/new"
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
}), te = { class: "lkt-admin-spa" }, ae = /* @__PURE__ */ b({
  __name: "LktAdminTranslationSpa",
  setup(n) {
    const e = R(), r = L(), o = i(parseInt(e.params.id));
    f(e, (d) => {
      o.value = parseInt(e.params.id);
    }, { flush: "pre", immediate: !0, deep: !0 });
    const a = i({
      property: "",
      type: c.Text,
      value: "",
      valueData: {}
    }), l = (d) => `/admin/i18n/${d}`, s = g(() => ({
      items: [
        V.mkFieldItemConfig("property", {
          type: c.Text,
          label: "Property",
          mandatory: !0,
          validation: {
            trigger: $.Blur
          }
        }),
        V.mkFieldItemConfig("type", {
          type: c.Select,
          mandatory: !0,
          label: "Type",
          options: [c.Text, c.Textarea],
          validation: {
            trigger: $.Blur
          }
        }),
        V.mkFieldItemConfig("valueData", {
          type: a.value.type,
          mandatory: !0,
          canI18n: !0,
          label: "Value",
          validation: {
            trigger: $.Blur
          }
        })
      ]
    }));
    return (d, m) => {
      const p = _("lkt-item-crud");
      return T(), D("section", te, [
        h(p, B({
          modelValue: a.value,
          "onUpdate:modelValue": m[0] || (m[0] = (u) => a.value = u)
        }, {
          title: o.value > 0 ? a.value.property : "New translation",
          readResource: "r-i18n",
          readData: {
            id: o.value
          },
          mode: o.value > 0 ? t(A).Update : t(A).Create,
          form: s.value,
          buttonNavVisibility: t(E).Always,
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
                t(r).back();
              }
            }
          },
          redirectOnCreate: l
        }), null, 16, ["modelValue"])
      ]);
    };
  }
}), ie = () => {
  F({
    url: "/translations",
    name: "ls-lkt-i18n",
    digToPerms: "perms",
    digToData: "results",
    mapData: (n) => n
  }), F({
    url: "/translation/{id}",
    name: "r-i18n",
    params: { id: { default: void 0 } },
    digToPerms: "perms",
    digToData: "item",
    mapData: (n) => n
  }), W({
    url: "/translation",
    name: "mk-i18n",
    params: {
      type: { default: void 0 },
      property: { default: void 0 },
      valueData: { default: void 0 }
    },
    digToPerms: "perms",
    digToAutoReloadId: "item.id"
  }), q({
    url: "/translation/{id}",
    name: "up-i18n",
    params: {
      id: { default: void 0 },
      type: { default: void 0 },
      property: { default: void 0 },
      valueData: { default: void 0 }
    },
    digToPerms: "perms"
  }), j({
    url: "/translation/{id}",
    name: "rm-i18n",
    params: {
      id: { default: void 0 }
    },
    digToPerms: "perms",
    digToData: "item"
  });
}, se = {
  install: (n) => {
    n.component("lkt-admin-menu-button") === void 0 && n.component("lkt-admin-menu-button", G), n.component("lkt-admin-menu") === void 0 && n.component("lkt-admin-menu", J);
  }
}, ue = (n) => {
  n.addRoute({ path: "/admin/web-pages/:type", name: "lkt-admin-pages", component: Q }), n.addRoute({ path: "/admin/web-pages/:type/:id", name: "lkt-admin-page", component: Y }), n.addRoute({ path: "/admin/i18n", name: "lkt-admin-translations", component: ee }), n.addRoute({ path: "/admin/i18n/:id", name: "lkt-admin-translation", component: ae });
};
export {
  se as default,
  ie as setupAdminTranslationsHttp,
  ue as setupLktVueAdminRoutes
};

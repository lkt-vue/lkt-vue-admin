import { defineComponent as p, inject as g, resolveComponent as k, createBlock as B, openBlock as b, mergeProps as R, unref as a, isRef as D, computed as v, createElementBlock as T, normalizeClass as E, createVNode as A, ref as s, watch as f } from "vue";
import { ButtonType as _, MenuEntryType as w, WebPageController as M, FieldType as U, ColumnType as x, TableRowType as L, TableType as C, ItemCrudButtonNavVisibility as S, ItemCrudMode as h } from "lkt-vue-kernel";
import { useRoute as V, useRouter as F } from "vue-router";
const I = /* @__PURE__ */ p({
  __name: "LktAdminMenuButton",
  setup(l) {
    const e = g("adminMenu");
    return (r, o) => {
      const t = k("lkt-button");
      return b(), B(t, R({
        checked: a(e),
        "onUpdate:checked": o[0] || (o[0] = (n) => D(e) ? e.value = n : null)
      }, {
        type: a(_).HiddenSwitch,
        icon: "lkt-icn-lkt",
        class: "lkt-admin-button"
      }), null, 16, ["checked"]);
    };
  }
}), z = /* @__PURE__ */ p({
  __name: "LktAdminMenu",
  setup(l) {
    const e = g("adminMenu"), r = v(() => {
      let o = [
        {
          key: "web-pages",
          type: w.Entry,
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
      return M.getPages().forEach((t) => {
        o.push({
          key: t.code,
          type: w.Entry,
          icon: "lkt-icn-webpage",
          anchor: {
            to: `/admin/web-pages/${t.id}`,
            text: t.label,
            events: {
              click: () => {
                e.value = !1;
              }
            }
          }
        });
      }), o;
    });
    return (o, t) => {
      const n = k("lkt-menu");
      return b(), T("div", {
        class: E(["lkt-admin-menu", a(e) ? "is-opened" : ""])
      }, [
        A(n, {
          "model-value": r.value,
          onClickOutside: t[0] || (t[0] = (m) => e.value = !1)
        }, null, 8, ["model-value"])
      ], 2);
    };
  }
}), N = { class: "lkt-admin-pages" }, W = /* @__PURE__ */ p({
  __name: "LktAdminPagesSpa",
  setup(l) {
    const e = V(), r = s(e.params.type), o = s(e.params.id), t = s({
      name: "",
      type: r.value
    }), n = s([]), m = s(null);
    f(e, (u) => {
      r.value = e.params.type, o.value = e.params.id, t.value.type = r.value;
    }, { flush: "pre", immediate: !0, deep: !0 });
    let i = g("appSize");
    i || (i = s(""));
    const d = v(() => [
      {
        type: x.Field,
        key: "name",
        label: "__:common.column.name",
        isForAccordionHeader: !0,
        field: {
          type: U.Text,
          icon: "lkt-icn-webpage"
        }
      },
      {
        type: x.Button,
        key: "details",
        label: "Details",
        button: {
          type: _.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (u) => `/admin/web-pages/${r.value}/${u.id}`
          }
        }
      }
    ]), y = v(() => {
      let u = "Web Pages";
      return M.getPages().forEach((c) => {
        if (c.id == r.value) {
          u = c.label ?? "Web Pages";
          return;
        }
      }), u;
    });
    return f(n, (u) => {
      console.log(u);
    }), (u, c) => {
      const P = k("lkt-table");
      return b(), T("div", N, [
        A(P, R({
          ref_key: "spaRef",
          ref: m,
          modelValue: n.value,
          "onUpdate:modelValue": c[0] || (c[0] = ($) => n.value = $)
        }, {
          type: a(i) === "xs" ? a(C).Accordion : a(C).Table,
          rowDisplayType: a(L).PreferColumns,
          title: y.value,
          titleTag: "h1",
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          columns: d.value,
          paginator: {
            resource: "ls-web-pages-type",
            resourceData: t.value
          },
          createButton: {
            icon: "lkt-icn-more",
            type: a(_).Anchor,
            anchor: {
              to: `/admin/web-pages/${r.value}/0`
            }
          },
          itemsContainerClass: a(i) === "xs" ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          }
        }), null, 16, ["modelValue"])
      ]);
    };
  }
}), H = /* @__PURE__ */ p({
  __name: "LktAdminPageSpa",
  setup(l) {
    const e = V(), r = F(), o = s(e.params.type), t = s(e.params.id);
    f(e, (i) => {
      o.value = e.params.type, t.value = e.params.id;
    }, { flush: "pre", immediate: !0, deep: !0 });
    const n = s({}), m = (i) => `/admin/web-pages/${o.value}/${i}`;
    return (i, d) => {
      const y = k("lkt-web-page");
      return b(), B(y, {
        modelValue: n.value,
        "onUpdate:modelValue": d[0] || (d[0] = (u) => n.value = u),
        "crud-config": {
          readResource: "r-web-page",
          readData: {
            id: t.value
          },
          mode: t.value > 0 ? a(h).Update : a(h).Create,
          buttonNavVisibility: a(S).Always,
          editing: !0,
          perms: ["update"],
          createButton: {
            resource: "mk-web-page",
            resourceData: { ...n.value, type: o.value },
            text: "Create",
            disabled: !1
          },
          updateButton: {
            resource: "up-web-page",
            resourceData: n.value,
            text: "Update",
            disabled: !1
          },
          dropButton: {
            resource: "rm-web-page",
            resourceData: n.value,
            text: "Remove",
            disabled: !1,
            events: {
              click: () => {
                a(r).back();
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
      }, null, 8, ["modelValue", "crud-config"]);
    };
  }
}), G = {
  install: (l) => {
    l.component("lkt-admin-menu-button") === void 0 && l.component("lkt-admin-menu-button", I), l.component("lkt-admin-menu") === void 0 && l.component("lkt-admin-menu", z);
  }
}, J = (l) => {
  l.addRoute({ path: "/admin/web-pages/:type", name: "lkt-admin-pages", component: W }), l.addRoute({ path: "/admin/web-pages/:type/:id", name: "lkt-admin-page", component: H });
};
export {
  G as default,
  J as setupLktVueAdminRoutes
};

import { defineComponent as p, inject as y, resolveComponent as b, createBlock as x, openBlock as k, mergeProps as C, unref as n, isRef as V, computed as B, createElementBlock as h, normalizeClass as $, createVNode as A, ref as r, watch as _ } from "vue";
import { ButtonType as g, MenuEntryType as D, FieldType as U, ColumnType as f, TableRowType as L, TableType as v, ItemCrudButtonNavVisibility as P, ItemCrudMode as w } from "lkt-vue-kernel";
import { useRoute as R, useRouter as S } from "vue-router";
const E = /* @__PURE__ */ p({
  __name: "LktAdminMenuButton",
  setup(o) {
    const e = y("adminMenu");
    return (l, u) => {
      const t = b("lkt-button");
      return k(), x(t, C({
        checked: n(e),
        "onUpdate:checked": u[0] || (u[0] = (a) => V(e) ? e.value = a : null)
      }, {
        type: n(g).HiddenSwitch,
        icon: "lkt-icn-upload",
        text: "Admin button, baby"
      }), null, 16, ["checked"]);
    };
  }
}), F = /* @__PURE__ */ p({
  __name: "LktAdminMenu",
  setup(o) {
    const e = y("adminMenu"), l = B(() => [
      {
        key: "web-pages",
        type: D.Entry,
        icon: "lkt-icn-webpage",
        anchor: {
          to: "/admin/web-pages/web-page",
          text: "Pages",
          events: {
            click: () => {
              e.value = !1;
            }
          }
        }
      }
    ]);
    return (u, t) => {
      const a = b("lkt-menu");
      return k(), h("div", {
        class: $(["lkt-admin-menu", n(e) ? "is-opened" : ""])
      }, [
        A(a, {
          "model-value": l.value,
          onClickOutside: t[0] || (t[0] = (i) => e.value = !1)
        }, null, 8, ["model-value"])
      ], 2);
    };
  }
}), I = { class: "lkt-admin-pages" }, z = /* @__PURE__ */ p({
  __name: "LktAdminPagesSpa",
  setup(o) {
    const e = R();
    console.log(e);
    const l = r(e.params.type), u = r(e.params.id);
    _(e, (s) => {
      l.value = e.params.type, u.value = e.params.id;
    }, { flush: "pre", immediate: !0, deep: !0 });
    let t = y("appSize");
    t || (t = r(""));
    const a = r({
      name: ""
    }), i = r([]), c = r(null), m = B(() => [
      {
        type: f.Field,
        key: "name",
        label: "__:common.column.name",
        isForAccordionHeader: !0,
        field: {
          type: U.Text,
          icon: "lkt-icn-webpage"
        }
      },
      {
        type: f.Button,
        key: "details",
        label: "Details",
        button: {
          type: g.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (s) => `/admin/web-pages/${l.value}/${s.id}`
          }
        }
      }
    ]);
    return _(i, (s) => {
      console.log(s);
    }), (s, d) => {
      const T = b("lkt-table");
      return k(), h("div", I, [
        A(T, C({
          ref_key: "spaRef",
          ref: c,
          modelValue: i.value,
          "onUpdate:modelValue": d[0] || (d[0] = (M) => i.value = M)
        }, {
          type: n(t) === "xs" ? n(v).Accordion : n(v).Table,
          rowDisplayType: n(L).PreferColumns,
          title: "Web Pages",
          titleTag: "h1",
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          columns: m.value,
          paginator: {
            resource: "ls-web-pages",
            resourceData: a.value
          },
          createButton: {
            icon: "lkt-icn-more",
            type: n(g).Anchor,
            anchor: {
              to: `/admin/web-pages/${l.value}/0`
            }
          },
          itemsContainerClass: n(t) === "xs" ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          }
        }), null, 16, ["modelValue"])
      ]);
    };
  }
}), N = /* @__PURE__ */ p({
  __name: "LktAdminPageSpa",
  setup(o) {
    const e = R(), l = S(), u = r(e.params.type), t = r(e.params.id);
    _(e, (c) => {
      u.value = e.params.type, t.value = e.params.id;
    }, { flush: "pre", immediate: !0, deep: !0 });
    const a = r({}), i = (c) => (console.log("called redirectOnCreate: ", c), `/admin/web-pages/${u.value}/${c}`);
    return (c, m) => {
      const s = b("lkt-web-page");
      return k(), x(s, {
        modelValue: a.value,
        "onUpdate:modelValue": m[0] || (m[0] = (d) => a.value = d),
        "crud-config": {
          readResource: "r-web-page",
          readData: {
            id: t.value
          },
          mode: t.value > 0 ? n(w).Update : n(w).Create,
          buttonNavVisibility: n(P).Always,
          editing: !0,
          perms: ["update"],
          createButton: {
            resource: "mk-web-page",
            resourceData: a.value,
            text: "Create",
            disabled: !1
          },
          updateButton: {
            resource: "up-web-page",
            resourceData: a.value,
            text: "Update",
            disabled: !1
          },
          dropButton: {
            resource: "rm-web-page",
            resourceData: a.value,
            text: "Remove",
            disabled: !1,
            events: {
              click: () => {
                n(l).back();
              }
            }
          },
          redirectOnCreate: i
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
}), q = {
  install: (o) => {
    o.component("lkt-admin-menu-button") === void 0 && o.component("lkt-admin-menu-button", E), o.component("lkt-admin-menu") === void 0 && o.component("lkt-admin-menu", F);
  }
}, W = (o) => {
  o.addRoute({ path: "/admin/web-pages/:type", name: "lkt-admin-pages", component: z }), o.addRoute({ path: "/admin/web-pages/:type/:id", name: "lkt-admin-page", component: N });
};
export {
  q as default,
  W as setupLktVueAdminRoutes
};

import { defineComponent as c, inject as y, resolveComponent as p, createBlock as x, openBlock as d, mergeProps as B, unref as n, isRef as V, computed as C, createElementBlock as h, normalizeClass as D, createVNode as A, ref as l, watch as b } from "vue";
import { ButtonType as _, MenuEntryType as U, FieldType as $, ColumnType as g, TableRowType as L, TableType as v, ItemCrudButtonNavVisibility as P, ItemCrudMode as w } from "lkt-vue-kernel";
import { useRoute as R, useRouter as S } from "vue-router";
const E = /* @__PURE__ */ c({
  __name: "LktAdminMenuButton",
  setup(o) {
    const e = y("adminMenu");
    return (u, r) => {
      const t = p("lkt-button");
      return d(), x(t, B({
        checked: n(e),
        "onUpdate:checked": r[0] || (r[0] = (a) => V(e) ? e.value = a : null)
      }, {
        type: n(_).HiddenSwitch,
        icon: "lkt-icn-upload",
        text: "Admin button, baby"
      }), null, 16, ["checked"]);
    };
  }
}), F = /* @__PURE__ */ c({
  __name: "LktAdminMenu",
  setup(o) {
    const e = y("adminMenu"), u = C(() => [
      {
        key: "web-pages",
        type: U.Entry,
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
    return (r, t) => {
      const a = p("lkt-menu");
      return d(), h("div", {
        class: D(["lkt-admin-menu", n(e) ? "is-opened" : ""])
      }, [
        A(a, {
          "model-value": u.value,
          onClickOutside: t[0] || (t[0] = (i) => e.value = !1)
        }, null, 8, ["model-value"])
      ], 2);
    };
  }
}), I = { class: "lkt-admin-pages" }, z = /* @__PURE__ */ c({
  __name: "LktAdminPagesSpa",
  setup(o) {
    const e = R();
    console.log(e);
    const u = l(e.params.type), r = l(e.params.id);
    b(e, (s) => {
      u.value = e.params.type, r.value = e.params.id;
    }, { flush: "pre", immediate: !0, deep: !0 });
    let t = y("appSize");
    t || (t = l(""));
    const a = l({
      name: ""
    }), i = l([]), m = l(null), k = C(() => [
      {
        type: g.Field,
        key: "name",
        label: "__:common.column.name",
        isForAccordionHeader: !0,
        field: {
          type: $.Text,
          icon: "lkt-icn-webpage"
        }
      },
      {
        type: g.Button,
        key: "details",
        label: "Details",
        button: {
          type: _.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (s) => `/admin/web-pages/${u.value}/${s.id}`
          }
        }
      }
    ]);
    return b(i, (s) => {
      console.log(s);
    }), (s, f) => {
      const T = p("lkt-table");
      return d(), h("div", I, [
        A(T, B({
          ref_key: "spaRef",
          ref: m,
          modelValue: i.value,
          "onUpdate:modelValue": f[0] || (f[0] = (M) => i.value = M)
        }, {
          type: n(t) === "xs" ? n(v).Accordion : n(v).Table,
          rowDisplayType: n(L).PreferColumns,
          title: "Web Pages",
          titleTag: "h1",
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          columns: k.value,
          paginator: {
            resource: "ls-web-pages",
            resourceData: a.value
          },
          createButton: {
            icon: "lkt-icn-more",
            type: n(_).Anchor,
            anchor: {
              to: `/admin/web-pages/${u.value}/0`
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
}), N = /* @__PURE__ */ c({
  __name: "LktAdminPageSpa",
  setup(o) {
    const e = R(), u = S(), r = l(e.params.type), t = l(e.params.id);
    b(e, (i) => {
      r.value = e.params.type, t.value = e.params.id;
    }, { flush: "pre", immediate: !0, deep: !0 });
    const a = l({});
    return (i, m) => {
      const k = p("lkt-web-page");
      return d(), x(k, {
        modelValue: a.value,
        "onUpdate:modelValue": m[0] || (m[0] = (s) => a.value = s),
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
                n(u).back();
              }
            }
          }
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
}), O = {
  install: (o) => {
    o.component("lkt-admin-menu-button") === void 0 && o.component("lkt-admin-menu-button", E), o.component("lkt-admin-menu") === void 0 && o.component("lkt-admin-menu", F);
  }
}, W = (o) => {
  o.addRoute({ path: "/admin/web-pages/:type", name: "lkt-admin-pages", component: z }), o.addRoute({ path: "/admin/web-pages/:type/:id", name: "lkt-admin-page", component: N });
};
export {
  O as default,
  W as setupLktVueAdminRoutes
};

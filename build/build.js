import { defineComponent as r, inject as d, resolveComponent as s, createBlock as b, openBlock as c, mergeProps as g, unref as o, isRef as C, computed as f, createElementBlock as y, normalizeClass as A, createVNode as w, ref as i, watch as T } from "vue";
import { ButtonType as v, MenuEntryType as M, FieldType as V, ColumnType as k, TableRowType as R, TableType as _, ItemCrudButtonNavVisibility as h, ItemCrudMode as U } from "lkt-vue-kernel";
const D = /* @__PURE__ */ r({
  __name: "LktAdminMenuButton",
  setup(t) {
    const e = d("adminMenu");
    return (u, n) => {
      const a = s("lkt-button");
      return c(), b(a, g({
        checked: o(e),
        "onUpdate:checked": n[0] || (n[0] = (l) => C(e) ? e.value = l : null)
      }, {
        type: o(v).HiddenSwitch,
        icon: "lkt-icn-upload",
        text: "Admin button, baby"
      }), null, 16, ["checked"]);
    };
  }
}), L = /* @__PURE__ */ r({
  __name: "LktAdminMenu",
  setup(t) {
    const e = d("adminMenu"), u = f(() => [
      {
        key: "web-pages",
        type: M.Entry,
        icon: "lkt-icn-webpage",
        anchor: {
          to: "/admin/web-pages/web-pages",
          text: "Pages",
          events: {
            click: () => {
              e.value = !1;
            }
          }
        }
      }
    ]);
    return (n, a) => {
      const l = s("lkt-menu");
      return c(), y("div", {
        class: A(["lkt-admin-menu", o(e) ? "is-opened" : ""])
      }, [
        w(l, {
          "model-value": u.value,
          onClickOutside: a[0] || (a[0] = (m) => e.value = !1)
        }, null, 8, ["model-value"])
      ], 2);
    };
  }
}), P = { class: "spa-page lkt-grid-1" }, S = /* @__PURE__ */ r({
  __name: "LktAdminPagesSpa",
  setup(t) {
    let e = d("appSize");
    e || (e = i(""));
    const u = i({
      name: ""
    }), n = i([]), a = i(null), l = f(() => [
      {
        type: k.Field,
        key: "name",
        label: "__:common.column.name",
        isForAccordionHeader: !0,
        field: {
          type: V.Text,
          icon: "lkt-icn-webpage"
        }
      },
      {
        type: k.Button,
        key: "details",
        label: "Details",
        button: {
          type: v.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: "/admin/web-page/id"
          }
        }
      }
    ]);
    return T(n, (m) => {
      console.log(m);
    }), (m, p) => {
      const x = s("lkt-table");
      return c(), y("div", P, [
        w(x, g({
          ref_key: "spaRef",
          ref: a,
          modelValue: n.value,
          "onUpdate:modelValue": p[0] || (p[0] = (B) => n.value = B)
        }, {
          type: o(e) === "xs" ? o(_).Accordion : o(_).Table,
          rowDisplayType: o(R).PreferColumns,
          title: "Web Pages",
          titleTag: "h1",
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          columns: l.value,
          paginator: {
            resource: "ls-web-pages",
            resourceData: u.value
          },
          createButton: {
            icon: "lkt-icn-more"
          },
          itemsContainerClass: o(e) === "xs" ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          }
        }), null, 16, ["modelValue"])
      ]);
    };
  }
}), E = /* @__PURE__ */ r({
  __name: "LktAdminPageSpa",
  setup(t) {
    const e = i({});
    return (u, n) => {
      const a = s("lkt-web-page");
      return c(), b(a, {
        modelValue: e.value,
        "onUpdate:modelValue": n[0] || (n[0] = (l) => e.value = l),
        "crud-config": {
          readResource: "r-web-page",
          readData: {
            id: 2
          },
          mode: o(U).Update,
          buttonNavVisibility: o(h).Always,
          editing: !0,
          perms: ["update"],
          updateButton: {
            resource: "up-web-page",
            resourceData: e.value,
            text: "Update",
            disabled: !1
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
}), $ = {
  install: (t) => {
    t.component("lkt-admin-menu-button") === void 0 && t.component("lkt-admin-menu-button", D), t.component("lkt-admin-menu") === void 0 && t.component("lkt-admin-menu", L);
  }
}, z = (t) => {
  t.addRoute({ path: "/admin/web-pages/:type", name: "lkt-admin-pages", component: S }), t.addRoute({ path: "/admin/web-page/:id", name: "lkt-admin-page", component: E });
};
export {
  $ as default,
  z as setupLktVueAdminRoutes
};

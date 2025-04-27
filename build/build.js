import { defineComponent as m, inject as b, resolveComponent as p, createBlock as v, openBlock as d, mergeProps as w, unref as o, isRef as R, computed as x, createElementBlock as B, normalizeClass as V, createVNode as C, ref as a, watch as _ } from "vue";
import { ButtonType as A, MenuEntryType as U, FieldType as D, ColumnType as f, TableRowType as L, TableType as g, ItemCrudButtonNavVisibility as P, ItemCrudMode as $ } from "lkt-vue-kernel";
import { useRoute as T } from "vue-router";
const S = /* @__PURE__ */ m({
  __name: "LktAdminMenuButton",
  setup(n) {
    const e = b("adminMenu");
    return (u, l) => {
      const t = p("lkt-button");
      return d(), v(t, w({
        checked: o(e),
        "onUpdate:checked": l[0] || (l[0] = (r) => R(e) ? e.value = r : null)
      }, {
        type: o(A).HiddenSwitch,
        icon: "lkt-icn-upload",
        text: "Admin button, baby"
      }), null, 16, ["checked"]);
    };
  }
}), E = /* @__PURE__ */ m({
  __name: "LktAdminMenu",
  setup(n) {
    const e = b("adminMenu"), u = x(() => [
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
    return (l, t) => {
      const r = p("lkt-menu");
      return d(), B("div", {
        class: V(["lkt-admin-menu", o(e) ? "is-opened" : ""])
      }, [
        C(r, {
          "model-value": u.value,
          onClickOutside: t[0] || (t[0] = (i) => e.value = !1)
        }, null, 8, ["model-value"])
      ], 2);
    };
  }
}), F = { class: "lkt-admin-pages" }, I = /* @__PURE__ */ m({
  __name: "LktAdminPagesSpa",
  setup(n) {
    const e = T();
    console.log(e);
    const u = a(e.params.type), l = a(e.params.id);
    _(e, (s) => {
      u.value = e.params.type, l.value = e.params.id;
    }, { flush: "pre", immediate: !0, deep: !0 });
    let t = b("appSize");
    t || (t = a(""));
    const r = a({
      name: ""
    }), i = a([]), c = a(null), k = x(() => [
      {
        type: f.Field,
        key: "name",
        label: "__:common.column.name",
        isForAccordionHeader: !0,
        field: {
          type: D.Text,
          icon: "lkt-icn-webpage"
        }
      },
      {
        type: f.Button,
        key: "details",
        label: "Details",
        button: {
          type: A.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (s) => `/admin/web-pages/${u.value}/${s.id}`
          }
        }
      }
    ]);
    return _(i, (s) => {
      console.log(s);
    }), (s, y) => {
      const h = p("lkt-table");
      return d(), B("div", F, [
        C(h, w({
          ref_key: "spaRef",
          ref: c,
          modelValue: i.value,
          "onUpdate:modelValue": y[0] || (y[0] = (M) => i.value = M)
        }, {
          type: o(t) === "xs" ? o(g).Accordion : o(g).Table,
          rowDisplayType: o(L).PreferColumns,
          title: "Web Pages",
          titleTag: "h1",
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          columns: k.value,
          paginator: {
            resource: "ls-web-pages",
            resourceData: r.value
          },
          createButton: {
            icon: "lkt-icn-more"
          },
          itemsContainerClass: o(t) === "xs" ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          }
        }), null, 16, ["modelValue"])
      ]);
    };
  }
}), z = /* @__PURE__ */ m({
  __name: "LktAdminPageSpa",
  setup(n) {
    const e = T(), u = a(e.params.type), l = a(e.params.id);
    _(e, (r) => {
      u.value = e.params.type, l.value = e.params.id;
    }, { flush: "pre", immediate: !0, deep: !0 });
    const t = a({});
    return (r, i) => {
      const c = p("lkt-web-page");
      return d(), v(c, {
        modelValue: t.value,
        "onUpdate:modelValue": i[0] || (i[0] = (k) => t.value = k),
        "crud-config": {
          readResource: "r-web-page",
          readData: {
            id: l.value
          },
          mode: o($).Update,
          buttonNavVisibility: o(P).Always,
          editing: !0,
          perms: ["update"],
          updateButton: {
            resource: "up-web-page",
            resourceData: t.value,
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
}), q = {
  install: (n) => {
    n.component("lkt-admin-menu-button") === void 0 && n.component("lkt-admin-menu-button", S), n.component("lkt-admin-menu") === void 0 && n.component("lkt-admin-menu", E);
  }
}, O = (n) => {
  n.addRoute({ path: "/admin/web-pages/:type", name: "lkt-admin-pages", component: I }), n.addRoute({ path: "/admin/web-pages/:type/:id", name: "lkt-admin-page", component: z });
};
export {
  q as default,
  O as setupLktVueAdminRoutes
};

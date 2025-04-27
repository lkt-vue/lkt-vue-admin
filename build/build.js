import { defineComponent as d, inject as v, resolveComponent as b, createBlock as C, openBlock as k, mergeProps as B, unref as a, isRef as $, computed as h, createElementBlock as A, normalizeClass as D, createVNode as R, ref as u, watch as y } from "vue";
import { ButtonType as _, MenuEntryType as f, WebPageController as P, FieldType as U, ColumnType as g, TableRowType as E, TableType as w, ItemCrudButtonNavVisibility as L, ItemCrudMode as x } from "lkt-vue-kernel";
import { useRoute as T, useRouter as S } from "vue-router";
const F = /* @__PURE__ */ d({
  __name: "LktAdminMenuButton",
  setup(l) {
    const e = v("adminMenu");
    return (r, o) => {
      const t = b("lkt-button");
      return k(), C(t, B({
        checked: a(e),
        "onUpdate:checked": o[0] || (o[0] = (n) => $(e) ? e.value = n : null)
      }, {
        type: a(_).HiddenSwitch,
        icon: "lkt-icn-upload",
        text: "Admin button, baby"
      }), null, 16, ["checked"]);
    };
  }
}), I = /* @__PURE__ */ d({
  __name: "LktAdminMenu",
  setup(l) {
    const e = v("adminMenu"), r = h(() => {
      let o = [
        {
          key: "web-pages",
          type: f.Entry,
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
      return P.getPages().forEach((t) => {
        o.push({
          key: t.code,
          type: f.Entry,
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
      const n = b("lkt-menu");
      return k(), A("div", {
        class: D(["lkt-admin-menu", a(e) ? "is-opened" : ""])
      }, [
        R(n, {
          "model-value": r.value,
          onClickOutside: t[0] || (t[0] = (c) => e.value = !1)
        }, null, 8, ["model-value"])
      ], 2);
    };
  }
}), z = { class: "lkt-admin-pages" }, N = /* @__PURE__ */ d({
  __name: "LktAdminPagesSpa",
  setup(l) {
    const e = T(), r = u(e.params.type), o = u(e.params.id), t = u({
      name: "",
      type: r.value
    }), n = u([]), c = u(null);
    y(e, (i) => {
      r.value = e.params.type, o.value = e.params.id, t.value.type = r.value;
    }, { flush: "pre", immediate: !0, deep: !0 });
    let s = v("appSize");
    s || (s = u(""));
    const p = h(() => [
      {
        type: g.Field,
        key: "name",
        label: "__:common.column.name",
        isForAccordionHeader: !0,
        field: {
          type: U.Text,
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
            to: (i) => `/admin/web-pages/${r.value}/${i.id}`
          }
        }
      }
    ]);
    return y(n, (i) => {
      console.log(i);
    }), (i, m) => {
      const M = b("lkt-table");
      return k(), A("div", z, [
        R(M, B({
          ref_key: "spaRef",
          ref: c,
          modelValue: n.value,
          "onUpdate:modelValue": m[0] || (m[0] = (V) => n.value = V)
        }, {
          type: a(s) === "xs" ? a(w).Accordion : a(w).Table,
          rowDisplayType: a(E).PreferColumns,
          title: "Web Pages",
          titleTag: "h1",
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          columns: p.value,
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
          itemsContainerClass: a(s) === "xs" ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          }
        }), null, 16, ["modelValue"])
      ]);
    };
  }
}), H = /* @__PURE__ */ d({
  __name: "LktAdminPageSpa",
  setup(l) {
    const e = T(), r = S(), o = u(e.params.type), t = u(e.params.id);
    y(e, (s) => {
      o.value = e.params.type, t.value = e.params.id;
    }, { flush: "pre", immediate: !0, deep: !0 });
    const n = u({}), c = (s) => `/admin/web-pages/${o.value}/${s}`;
    return (s, p) => {
      const i = b("lkt-web-page");
      return k(), C(i, {
        modelValue: n.value,
        "onUpdate:modelValue": p[0] || (p[0] = (m) => n.value = m),
        "crud-config": {
          readResource: "r-web-page",
          readData: {
            id: t.value
          },
          mode: t.value > 0 ? a(x).Update : a(x).Create,
          buttonNavVisibility: a(L).Always,
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
      }, null, 8, ["modelValue", "crud-config"]);
    };
  }
}), q = {
  install: (l) => {
    l.component("lkt-admin-menu-button") === void 0 && l.component("lkt-admin-menu-button", F), l.component("lkt-admin-menu") === void 0 && l.component("lkt-admin-menu", I);
  }
}, G = (l) => {
  l.addRoute({ path: "/admin/web-pages/:type", name: "lkt-admin-pages", component: N }), l.addRoute({ path: "/admin/web-pages/:type/:id", name: "lkt-admin-page", component: H });
};
export {
  q as default,
  G as setupLktVueAdminRoutes
};

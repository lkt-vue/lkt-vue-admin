import { defineComponent as M, inject as B, resolveComponent as A, createBlock as L, createCommentVNode as W, unref as n, openBlock as b, mergeProps as j, isRef as se, computed as k, createElementBlock as I, normalizeClass as de, createVNode as Y, ref as l, watch as O, nextTick as x, onMounted as ee } from "vue";
import { ButtonType as R, WebPageController as Q, MenuEntryType as U, WebItemsController as V, AppSize as P, FieldType as te, ColumnType as S, LktSettings as X, TableRowType as ae, TableType as F, ItemCrudButtonNavVisibility as ne, ItemCrudMode as q, LktTranslation as Z } from "lkt-vue-kernel";
import { useRoute as G, useRouter as oe } from "vue-router";
import { updateMainHeader as z } from "lkt-vue-app";
import { time as pe } from "lkt-date-tools";
import { createHTTPGetResource as E, createHTTPPostResource as re, createHTTPPutResource as le, createHTTPDeleteResource as ue } from "lkt-http-client";
const me = /* @__PURE__ */ M({
  __name: "LktAdminMenuButton",
  setup(o) {
    const t = B("adminMenu"), s = B("lktAdminEnabled");
    return (a, r) => {
      const i = A("lkt-button");
      return n(s) ? (b(), L(i, j({
        key: 0,
        checked: n(t),
        "onUpdate:checked": r[0] || (r[0] = (m) => se(t) ? t.value = m : null)
      }, {
        type: n(R).HiddenSwitch,
        icon: "lkt-icn-lkt",
        class: "lkt-admin-button"
      }), null, 16, ["checked"])) : W("", !0);
    };
  }
}), ce = /* @__PURE__ */ M({
  __name: "LktAdminMenu",
  setup(o) {
    const t = B("adminMenu"), s = k(() => {
      let a = [];
      return Q.hasDefaultPageEnabled() && a.push({
        key: "web-pages",
        type: U.Entry,
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
      }), Q.getPages().forEach((r) => {
        a.push({
          key: r.code,
          type: U.Entry,
          icon: "lkt-icn-webpage",
          anchor: {
            to: `/admin/web-pages/${r.id}`,
            text: r.label,
            events: {
              click: () => {
                t.value = !1;
              }
            }
          }
        });
      }), V.getItems().forEach((r) => {
        r.many !== !1 && a.push({
          key: r.code,
          type: U.Entry,
          icon: r.icon,
          anchor: {
            to: `/admin/web-items/${r.code}`,
            text: r.labelMany,
            events: {
              click: () => {
                t.value = !1;
              }
            }
          }
        });
      }), a.push(
        {
          key: "translations",
          type: U.Entry,
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
      ), a;
    });
    return (a, r) => {
      const i = A("lkt-menu");
      return b(), I("div", {
        class: de(["lkt-admin-menu", n(t) ? "is-opened" : ""])
      }, [
        Y(i, {
          "model-value": s.value,
          onClickOutside: r[0] || (r[0] = (m) => t.value = !1)
        }, null, 8, ["model-value"])
      ], 2);
    };
  }
}), ve = { class: "lkt-admin-spa lkt-admin-pages" }, fe = /* @__PURE__ */ M({
  __name: "LktAdminPagesSpa",
  setup(o) {
    const t = G(), s = l(t.params.type), a = l(t.params.id), r = l({
      name: "",
      type: s.value
    }), i = l([]), m = l(null);
    O(t, (e) => {
      s.value = t.params.type, a.value = t.params.id, r.value.type = s.value;
    }, { flush: "pre", immediate: !0, deep: !0 });
    let c = B("lktAppSize");
    c || (c = l(P.MD));
    const v = k(() => [
      {
        type: S.Field,
        key: "name",
        label: "__:common.column.name",
        isForAccordionHeader: !0,
        field: {
          type: te.Text,
          icon: "lkt-icn-webpage"
        }
      },
      {
        type: S.Button,
        key: "details",
        label: "Details",
        button: {
          ...X.defaultDetailsButton,
          type: R.Anchor,
          anchor: {
            to: (e) => `/admin/web-pages/${s.value}/${e.id}`
          }
        }
      }
    ]), u = k(() => {
      let e = "Web Pages";
      return Q.getPages().forEach((f) => {
        if (f.id == s.value) {
          e = f.label ?? "Web Pages";
          return;
        }
      }), e;
    });
    return (e, f) => {
      const _ = A("lkt-table");
      return b(), I("section", ve, [
        Y(_, j({
          ref_key: "spaRef",
          ref: m,
          modelValue: i.value,
          "onUpdate:modelValue": f[0] || (f[0] = (D) => i.value = D)
        }, {
          type: n(c) < n(P).MD ? n(F).Accordion : n(F).Table,
          rowDisplayType: n(ae).PreferColumns,
          title: u.value,
          titleTag: "h1",
          titleIcon: "lkt-icn-webpage",
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          columns: v.value,
          paginator: {
            resource: "ls-web-pages-type",
            resourceData: r.value
          },
          createButton: {
            icon: "lkt-icn-more",
            type: n(R).Anchor,
            anchor: {
              to: `/admin/web-pages/${s.value}/0`
            }
          },
          itemsContainerClass: n(c) < n(P).MD ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          }
        }), null, 16, ["modelValue"])
      ]);
    };
  }
}), ye = { class: "lkt-admin-spa" }, ge = /* @__PURE__ */ M({
  __name: "LktAdminPageSpa",
  setup(o) {
    const t = G(), s = oe(), a = l(t.params.type), r = l(t.params.id);
    O(t, (c) => {
      a.value = t.params.type, r.value = t.params.id;
    }, { flush: "pre", immediate: !0, deep: !0 });
    const i = l({}), m = (c) => `/admin/web-pages/${a.value}/${c}`;
    return (c, v) => {
      const u = A("lkt-web-page");
      return b(), I("section", ye, [
        Y(u, {
          modelValue: i.value,
          "onUpdate:modelValue": v[0] || (v[0] = (e) => i.value = e),
          "crud-config": {
            readResource: "r-web-page",
            readData: {
              id: r.value
            },
            mode: r.value > 0 ? n(q).Update : n(q).Create,
            buttonNavVisibility: n(ne).Always,
            editing: !0,
            perms: ["update"],
            createButton: {
              resource: "mk-web-page",
              resourceData: { ...i.value, type: a.value },
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
                  n(s).back();
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
}), ke = {
  key: 0,
  class: "lkt-admin-spa lkt-web-items"
}, be = /* @__PURE__ */ M({
  __name: "LktWebItemsSpa",
  setup(o) {
    const t = B("lktAdminEnabled");
    t.value || (window.location.href = "/");
    const s = G(), a = l(s.params.type), r = l(s.params.id), i = l({
      name: "",
      type: a.value
    }), m = l([]), c = l(null), v = l(!1), u = l(V.getWebItemSettings(a.value)), e = () => {
      typeof u.value.appHeaderMany == "function" ? z(u.value.appHeaderMany({ item: item.value })) : typeof u.value.appHeaderMany == "object" && Object.keys(u.value.appHeaderMany).length > 0 && z(u.value.appHeaderMany);
    };
    O(s, (y) => {
      a.value = s.params.type, r.value = s.params.id, m.value.splice(0, m.value.length), v.value = !1, i.value.type = a.value, u.value = V.getWebItemSettings(a.value), x(() => {
        e(), x(() => v.value = !0);
      });
    }, { flush: "pre", immediate: !0, deep: !0 });
    let f = B("lktAppSize");
    f || (f = l(P.MD));
    const _ = k(() => u.value.many.columns ? [
      ...u.value.many.columns,
      {
        type: S.Button,
        key: "details",
        label: "Details",
        button: {
          ...X.defaultDetailsButton,
          type: R.Anchor,
          anchor: {
            to: (y) => `/admin/web-items/${a.value}/${y.id}`
          }
        }
      }
    ] : [
      {
        type: S.Field,
        key: "name",
        label: "Name",
        isForAccordionHeader: !0,
        field: {
          type: te.Text,
          icon: u.value.icon
        }
      },
      {
        type: S.Button,
        key: "details",
        label: "Details",
        button: {
          ...X.defaultDetailsButton,
          type: R.Anchor,
          anchor: {
            to: (y) => `/admin/web-items/${a.value}/${y.id}`
          }
        }
      }
    ]), D = k(() => typeof u.value.appHeaderMany < "u" ? {} : {
      text: u.value.labelMany ?? "",
      icon: u.value.icon,
      tag: "h1"
    }), J = k(() => {
      var y, T, C;
      return ((T = (y = u.value) == null ? void 0 : y.many) == null ? void 0 : T.createButton) === !1 ? !1 : {
        icon: "lkt-icn-more",
        text: "Add web item",
        type: R.Anchor,
        anchor: {
          to: `/admin/web-items/${a.value}/new`
        },
        //@ts-ignore
        ...(C = u.value.many) == null ? void 0 : C.createButton
      };
    });
    return ee(() => {
      v.value = !0;
    }), (y, T) => {
      const C = A("lkt-table");
      return n(t) ? (b(), I("section", ke, [
        v.value ? (b(), L(C, j({
          key: 0,
          ref_key: "spaRef",
          ref: c,
          modelValue: m.value,
          "onUpdate:modelValue": T[0] || (T[0] = (K) => m.value = K)
        }, {
          type: n(f) < n(P).MD ? n(F).Accordion : n(F).Table,
          rowDisplayType: n(ae).PreferColumns,
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          paginator: {
            resource: "ls-web-items",
            resourceData: i.value
          },
          itemsContainerClass: n(f) < n(P).MD ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          },
          ...u.value.many,
          columns: _.value,
          header: D.value,
          createButton: J.value
        }), null, 16, ["modelValue"])) : W("", !0)
      ])) : W("", !0);
    };
  }
}), _e = {
  key: 0,
  class: "lkt-admin-spa lkt-web-item-spa"
}, we = /* @__PURE__ */ M({
  __name: "LktWebItemSpa",
  props: {
    id: {},
    type: {},
    onCreateTo: {}
  },
  setup(o) {
    const t = B("lktAdminEnabled"), s = o, a = G(), r = oe(), i = l(a.params.type), m = l(a.params.id), c = l(!1), v = l(!1), u = l(["create"]), e = l(V.getWebItemSettings(i.value)), f = (d) => typeof e.value.itemGenerator == "function" ? e.value.itemGenerator(d) : {
      ...d
    }, _ = l(f(a.query)), D = () => {
      typeof e.value.appHeaderSingle == "function" ? z(e.value.appHeaderSingle({ item: _.value })) : typeof e.value.appHeaderSingle == "object" && Object.keys(e.value.appHeaderSingle).length > 0 && z(e.value.appHeaderSingle);
    };
    O(a, (d) => {
      i.value = a.params.type, m.value = a.params.id, c.value = !1, v.value = !1, u.value = ["create"], e.value = V.getWebItemSettings(i.value), x(() => {
        _.value = f(a.query), x(() => {
          D(), x(() => c.value = !0);
        });
      });
    }, { flush: "pre", immediate: !0, deep: !0 });
    const J = k(() => typeof e.value.appHeaderSingle < "u" ? {} : {
      text: e.value.labelSingle ?? "",
      icon: e.value.icon,
      tag: "h1"
    }), y = k(() => {
      var d, p;
      return ((p = (d = e.value) == null ? void 0 : d.single) == null ? void 0 : p.createButton) === !1 ? !1 : {
        resource: "mk-web-item",
        icon: "lkt-icn-save",
        text: "Create",
        ...e.value.single.createButton,
        events: {
          click: (w) => {
            var h, g, $, H;
            typeof ((g = (h = e.value.single.createButton) == null ? void 0 : h.events) == null ? void 0 : g.click) == "function" && ((H = ($ = e.value.single.createButton) == null ? void 0 : $.events) == null || H.click(w));
          }
        },
        hooks: {
          redirectType: "replace",
          onSuccessRedirectTo: (w) => {
            if (s.onCreateTo)
              return s.onCreateTo;
            if (w.httpResponse.autoReloadId)
              return `/admin/web-items/${i.value}/${w.httpResponse.autoReloadId}`;
          }
        }
      };
    }), T = k(() => {
      var d, p;
      return ((p = (d = e.value) == null ? void 0 : d.single) == null ? void 0 : p.createButton) === !1 ? !1 : {
        resource: "mk-web-item",
        icon: "lkt-icn-save",
        text: "Create",
        ...e.value.single.createAndNewButton,
        events: {
          click: (w) => {
            var h, g, $, H;
            typeof ((g = (h = e.value.single.createAndNewButton) == null ? void 0 : h.events) == null ? void 0 : g.click) == "function" && ((H = ($ = e.value.single.createAndNewButton) == null ? void 0 : $.events) == null || H.click(w)), r.push({
              path: `/admin/web-items/${i.value}/new`,
              query: {
                keepCreating: pe()
              },
              replace: !0
            });
          }
        }
      };
    }), C = k(() => {
      var d, p;
      return ((p = (d = e.value) == null ? void 0 : d.single) == null ? void 0 : p.updateButton) === !1 ? !1 : {
        resource: "up-web-item",
        icon: "lkt-icn-save",
        text: "Update",
        ...e.value.single.updateButton
      };
    }), K = k(() => {
      var d, p;
      return ((p = (d = e.value) == null ? void 0 : d.single) == null ? void 0 : p.dropButton) === !1 ? !1 : {
        resource: "rm-web-item",
        resourceData: { id: m },
        icon: "lkt-icn-trash",
        text: "Remove",
        events: {
          click: () => {
            r.back();
          }
        },
        ...e.value.single.dropButton
      };
    }), ie = (d) => `/admin/web-items/${i.value}/${d}`;
    return ee(() => {
      x(() => {
        D();
      });
    }), (d, p) => {
      const w = A("lkt-item-crud"), h = A("lkt-loader");
      return n(t) ? (b(), I("section", _e, [
        c.value ? (b(), L(w, j({
          key: 0,
          modelValue: _.value,
          "onUpdate:modelValue": p[0] || (p[0] = (g) => _.value = g),
          editing: v.value,
          "onUpdate:editing": p[1] || (p[1] = (g) => v.value = g),
          perms: u.value,
          "onUpdate:perms": p[2] || (p[2] = (g) => u.value = g)
        }, {
          readResource: "r-web-item",
          readData: { id: m.value },
          mode: m.value > 0 ? n(q).Update : n(q).Create,
          buttonNavVisibility: n(ne).Always,
          redirectOnCreate: ie,
          ...e.value.single,
          header: J.value,
          createButton: y.value,
          createAndNewButton: T.value,
          updateButton: C.value,
          dropButton: K.value
        }), null, 16, ["modelValue", "editing", "perms"])) : (b(), L(h, { key: 1 }))
      ])) : W("", !0);
    };
  }
}), xe = () => {
  E({
    url: "/translations",
    name: "ls-lkt-i18n",
    params: { property: { default: void 0 }, value: { default: void 0 }, type: { default: void 0 }, page: { default: void 0 } },
    digToPerms: "perms",
    digToData: "results",
    digToMaxPage: "maxPage",
    mapData: (o) => o.map((t) => new Z(t))
  }), E({
    url: "/translation/{id}",
    name: "r-i18n",
    params: { id: { default: void 0 }, type: { default: void 0 } },
    digToPerms: "perms",
    digToData: "item",
    mapData: (o) => new Z(o)
  }), re({
    url: "/translation",
    name: "mk-i18n",
    params: {
      type: { default: void 0 },
      property: { default: void 0 },
      valueData: { default: void 0 },
      parentId: { default: void 0 }
    },
    digToPerms: "perms",
    digToAutoReloadId: "item.id"
  }), le({
    url: "/translation/{id}",
    name: "up-i18n",
    params: {
      id: { default: void 0 },
      type: { default: void 0 },
      property: { default: void 0 },
      valueData: { default: void 0 }
    },
    digToPerms: "perms"
  }), ue({
    url: "/translation/{id}",
    name: "rm-i18n",
    params: {
      id: { default: void 0 }
    },
    digToPerms: "perms",
    digToData: "item"
  });
}, Re = () => {
  E({
    url: "/user/roles/page-{page}",
    name: "ls-user-role",
    params: { page: { default: void 0 } },
    digToPerms: "perms",
    digToData: "results",
    mapData: (o) => o
  }), E({
    url: "/user/roles",
    name: "all-user-role",
    digToPerms: "perms",
    digToData: "results",
    mapData: (o) => o
  }), E({
    url: "/user/role/{id}",
    name: "r-user-role",
    params: { id: { default: void 0 } },
    digToPerms: "perms",
    digToData: "item",
    mapData: (o) => o
  }), re({
    url: "/user/role",
    name: "mk-user-role",
    params: {
      name: { default: void 0 },
      permissions: { default: void 0 }
    },
    digToPerms: "perms",
    digToAutoReloadId: "item.id"
  }), le({
    url: "/user/role/{id}",
    name: "up-user-role",
    params: {
      id: { default: void 0 },
      name: { default: void 0 },
      permissions: { default: void 0 }
    },
    digToPerms: "perms"
  }), ue({
    url: "/user/role/{id}",
    name: "rm-user-role",
    params: {
      id: { default: void 0 }
    },
    digToPerms: "perms",
    digToData: "item"
  });
}, Pe = {
  install: (o) => {
    o.component("lkt-admin-menu-button") === void 0 && o.component("lkt-admin-menu-button", me), o.component("lkt-admin-menu") === void 0 && o.component("lkt-admin-menu", ce);
  }
}, N = (o, t) => {
}, Me = (o) => {
  o.addRoute({ path: "/admin/web-pages/:type", name: "lkt-admin-pages", component: fe, beforeEnter: N }), o.addRoute({ path: "/admin/web-pages/:type/:id", name: "lkt-admin-page", component: ge, beforeEnter: N }), o.addRoute({ path: "/admin/web-items/:type", name: "lkt-web-items", component: be, beforeEnter: N }), o.addRoute({ path: "/admin/web-items/:type/:id", name: "lkt-web-item", component: we, beforeEnter: N, props: (t) => ({
    id: t.params.id,
    type: t.params.type,
    onCreateTo: t.query.onCreateTo ?? ""
  }) });
};
export {
  Pe as default,
  xe as setupAdminTranslationsHttp,
  Re as setupAdminUserRoleHttp,
  Me as setupLktVueAdminRoutes
};

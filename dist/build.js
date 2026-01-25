import { defineComponent as V, inject as x, resolveComponent as D, createBlock as S, createCommentVNode as $, unref as l, openBlock as h, mergeProps as J, isRef as ie, computed as w, createElementBlock as q, normalizeClass as se, createVNode as de, ref as n, watch as L, nextTick as T, onMounted as Y } from "vue";
import { ButtonType as P, WebPageController as E, MenuEntryType as F, WebItemsController as j, AppSize as R, FieldType as ee, ColumnType as W, LktSettings as X, TableRowType as te, TableType as z, ItemCrudButtonNavVisibility as ae, ItemCrudMode as G, WebPage as pe, LktTranslation as Z } from "lkt-vue-kernel";
import { useRoute as K, useRouter as ne } from "vue-router";
import { updateMainHeader as A } from "lkt-vue-app";
import { time as me } from "lkt-date-tools";
import { createHTTPGetResource as N, createHTTPPostResource as re, createHTTPPutResource as le, createHTTPDeleteResource as oe } from "lkt-http-client";
const ce = /* @__PURE__ */ V({
  __name: "LktAdminMenuButton",
  setup(o) {
    const e = x("adminMenu"), s = x("lktAdminEnabled");
    return (a, r) => {
      const d = D("lkt-button");
      return l(s) ? (h(), S(d, J({
        key: 0,
        checked: l(e),
        "onUpdate:checked": r[0] || (r[0] = (y) => ie(e) ? e.value = y : null)
      }, {
        type: l(P).HiddenSwitch,
        icon: "lkt-icn-lkt",
        class: "lkt-admin-button"
      }), null, 16, ["checked"])) : $("", !0);
    };
  }
}), ve = /* @__PURE__ */ V({
  __name: "LktAdminMenu",
  setup(o) {
    const e = x("adminMenu"), s = w(() => {
      let a = [];
      return E.hasDefaultPageEnabled() && a.push({
        key: "web-pages",
        type: F.Entry,
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
      }), E.getPages().forEach((r) => {
        a.push({
          key: r.code,
          type: F.Entry,
          icon: "lkt-icn-webpage",
          anchor: {
            to: `/admin/web-pages/${r.id}`,
            text: r.label,
            events: {
              click: () => {
                e.value = !1;
              }
            }
          }
        });
      }), j.getItems().forEach((r) => {
        r.many !== !1 && a.push({
          key: r.code,
          type: F.Entry,
          icon: r.icon,
          anchor: {
            to: `/admin/web-items/${r.code}`,
            text: r.labelMany,
            events: {
              click: () => {
                e.value = !1;
              }
            }
          }
        });
      }), a.push(
        {
          key: "translations",
          type: F.Entry,
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
      ), a;
    });
    return (a, r) => {
      const d = D("lkt-menu");
      return h(), q("div", {
        class: se(["lkt-admin-menu", l(e) ? "is-opened" : ""])
      }, [
        de(d, {
          "model-value": s.value,
          onClickOutside: r[0] || (r[0] = (y) => e.value = !1)
        }, null, 8, ["model-value"])
      ], 2);
    };
  }
}), fe = { class: "lkt-admin-spa lkt-admin-pages" }, ye = /* @__PURE__ */ V({
  __name: "LktAdminPagesSpa",
  setup(o) {
    const e = K(), s = n(e.params.type), a = n(e.params.id), r = n({
      name: "",
      type: s.value
    }), d = n([]), y = n(null), k = n(!1), u = n(E.getCustomWebPageSettings(s.value)), i = () => {
      typeof u.value.appHeaderMany == "function" ? A(u.value.appHeaderMany({ items: d.value })) : typeof u.value.appHeaderMany == "object" && Object.keys(u.value.appHeaderMany).length > 0 && A(u.value.appHeaderMany);
    };
    L(e, (p) => {
      s.value = e.params.type, a.value = e.params.id, r.value.type = s.value, k.value = !1, u.value = E.getCustomWebPageSettings(s.value), T(() => {
        i(), T(() => k.value = !0);
      });
    }, { flush: "pre", immediate: !0, deep: !0 });
    let t = x("lktAppSize");
    t || (t = n(R.MD));
    const b = w(() => [
      {
        type: W.Field,
        key: "name",
        label: "__:common.column.name",
        isForAccordionHeader: !0,
        field: {
          type: ee.Text,
          icon: "lkt-icn-webpage"
        }
      },
      {
        type: W.Button,
        key: "details",
        label: "",
        button: {
          ...X.defaultDetailsButton,
          type: P.Anchor,
          anchor: {
            to: (p) => `/admin/web-pages/${s.value}/${p.id}`
          }
        }
      }
    ]), B = w(() => {
      var c, v, g;
      return typeof ((c = u.value) == null ? void 0 : c.appHeaderMany) < "u" ? {} : {
        text: ((v = u.value) == null ? void 0 : v.labelMany) ?? "",
        icon: (g = u.value) == null ? void 0 : g.icon,
        tag: "h1"
      };
    });
    return Y(() => {
      k.value = !0;
    }), (p, c) => {
      const v = D("lkt-table");
      return h(), q("section", fe, [
        k.value ? (h(), S(v, J({
          key: 0,
          ref_key: "spaRef",
          ref: y,
          modelValue: d.value,
          "onUpdate:modelValue": c[0] || (c[0] = (g) => d.value = g)
        }, {
          type: l(t) < l(R).MD ? l(z).Accordion : l(z).Table,
          rowDisplayType: l(te).PreferColumns,
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          header: B.value,
          columns: b.value,
          paginator: {
            resource: "ls-web-pages-type",
            resourceData: r.value
          },
          createButton: {
            icon: "lkt-icn-more",
            type: l(P).Anchor,
            anchor: {
              to: `/admin/web-pages/${s.value}/0`
            }
          },
          itemsContainerClass: l(t) < l(R).MD ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          }
        }), null, 16, ["modelValue"])) : $("", !0)
      ]);
    };
  }
}), ge = { class: "lkt-admin-spa" }, ke = /* @__PURE__ */ V({
  __name: "LktAdminPageSpa",
  setup(o) {
    const e = K(), s = ne(), a = n(e.params.type), r = n(e.params.id), d = n(!1), y = n(!1), k = n(["create"]);
    L(e, (p) => {
      a.value = e.params.type, r.value = e.params.id;
    }, { flush: "pre", immediate: !0, deep: !0 });
    const u = n(E.getCustomWebPageSettings(a.value)), i = (p) => {
      var c;
      return typeof ((c = u.value) == null ? void 0 : c.itemGenerator) == "function" ? u.value.itemGenerator(p) : new pe({
        ...p
      });
    }, t = n(i(e.query)), b = () => {
      var p, c;
      typeof ((p = u.value) == null ? void 0 : p.appHeaderSingle) == "function" ? A(u.value.appHeaderSingle({ item: t.value })) : typeof ((c = u.value) == null ? void 0 : c.appHeaderSingle) == "object" && Object.keys(u.value.appHeaderSingle).length > 0 && A(u.value.appHeaderSingle);
    };
    L(e, (p) => {
      a.value = e.params.type, r.value = e.params.id, d.value = !1, y.value = !1, k.value = ["create"], u.value = E.getCustomWebPageSettings(a.value), T(() => {
        t.value = i(e.query), T(() => {
          b(), T(() => d.value = !0);
        });
      });
    }, { flush: "pre", immediate: !0, deep: !0 });
    const B = (p) => `/admin/web-pages/${a.value}/${p}`;
    return (p, c) => {
      const v = D("lkt-web-page");
      return h(), q("section", ge, [
        d.value ? (h(), S(v, {
          key: 0,
          modelValue: t.value,
          "onUpdate:modelValue": c[0] || (c[0] = (g) => t.value = g),
          "crud-config": {
            readResource: "r-web-page",
            readData: {
              id: r.value
            },
            mode: r.value > 0 ? l(G).Update : l(G).Create,
            buttonNavVisibility: l(ae).Always,
            editing: !0,
            perms: ["update"],
            createButton: {
              resource: "mk-web-page",
              resourceData: { ...t.value, type: a.value },
              text: "Create",
              disabled: !1
            },
            updateButton: {
              resource: "up-web-page",
              resourceData: t.value,
              text: "Update",
              disabled: !1
            },
            dropButton: {
              resource: "rm-web-page",
              resourceData: t.value,
              text: "Remove",
              disabled: !1,
              events: {
                click: () => {
                  l(s).back();
                }
              }
            },
            redirectOnCreate: B
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
        }, null, 8, ["modelValue", "crud-config"])) : $("", !0)
      ]);
    };
  }
}), be = {
  key: 0,
  class: "lkt-admin-spa lkt-web-items"
}, _e = /* @__PURE__ */ V({
  __name: "LktWebItemsSpa",
  setup(o) {
    const e = x("lktAdminEnabled");
    e.value || (window.location.href = "/");
    const s = K(), a = n(s.params.type), r = n(s.params.id), d = n({
      name: "",
      type: a.value
    }), y = n([]), k = n(null), u = n(!1), i = n(j.getWebItemSettings(a.value)), t = () => {
      typeof i.value.appHeaderMany == "function" ? A(i.value.appHeaderMany({ items: y.value })) : typeof i.value.appHeaderMany == "object" && Object.keys(i.value.appHeaderMany).length > 0 && A(i.value.appHeaderMany);
    };
    L(s, (v) => {
      a.value = s.params.type, r.value = s.params.id, y.value.splice(0, y.value.length), u.value = !1, d.value.type = a.value, i.value = j.getWebItemSettings(a.value), T(() => {
        t(), T(() => u.value = !0);
      });
    }, { flush: "pre", immediate: !0, deep: !0 });
    let b = x("lktAppSize");
    b || (b = n(R.MD));
    const B = w(() => i.value.many.columns ? [
      ...i.value.many.columns,
      {
        type: W.Button,
        key: "details",
        label: "Details",
        button: {
          ...X.defaultDetailsButton,
          type: P.Anchor,
          anchor: {
            to: (v) => `/admin/web-items/${a.value}/${v.id}`
          }
        }
      }
    ] : [
      {
        type: W.Field,
        key: "name",
        label: "Name",
        isForAccordionHeader: !0,
        field: {
          type: ee.Text,
          icon: i.value.icon
        }
      },
      {
        type: W.Button,
        key: "details",
        label: "",
        button: {
          ...X.defaultDetailsButton,
          type: P.Anchor,
          anchor: {
            to: (v) => `/admin/web-items/${a.value}/${v.id}`
          }
        }
      }
    ]), p = w(() => typeof i.value.appHeaderMany < "u" ? {} : {
      text: i.value.labelMany ?? "",
      icon: i.value.icon,
      tag: "h1"
    }), c = w(() => {
      var v, g, M;
      return ((g = (v = i.value) == null ? void 0 : v.many) == null ? void 0 : g.createButton) === !1 ? !1 : {
        icon: "lkt-icn-more",
        text: "Add web item",
        type: P.Anchor,
        anchor: {
          to: `/admin/web-items/${a.value}/new`
        },
        //@ts-ignore
        ...(M = i.value.many) == null ? void 0 : M.createButton
      };
    });
    return Y(() => {
      u.value = !0;
    }), (v, g) => {
      const M = D("lkt-table");
      return l(e) ? (h(), q("section", be, [
        u.value ? (h(), S(M, J({
          key: 0,
          ref_key: "spaRef",
          ref: k,
          modelValue: y.value,
          "onUpdate:modelValue": g[0] || (g[0] = (Q) => y.value = Q)
        }, {
          type: l(b) < l(R).MD ? l(z).Accordion : l(z).Table,
          rowDisplayType: l(te).PreferColumns,
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          paginator: {
            resource: "ls-web-items",
            resourceData: d.value
          },
          itemsContainerClass: l(b) < l(R).MD ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          },
          ...i.value.many,
          columns: B.value,
          header: p.value,
          createButton: c.value
        }), null, 16, ["modelValue"])) : $("", !0)
      ])) : $("", !0);
    };
  }
}), we = {
  key: 0,
  class: "lkt-admin-spa lkt-web-item-spa"
}, Te = /* @__PURE__ */ V({
  __name: "LktWebItemSpa",
  props: {
    id: {},
    type: {},
    onCreateTo: {}
  },
  setup(o) {
    const e = x("lktAdminEnabled"), s = o, a = K(), r = ne(), d = n(a.params.type), y = n(a.params.id), k = n(!1), u = n(!1), i = n(["create"]), t = n(j.getWebItemSettings(d.value)), b = (m) => typeof t.value.itemGenerator == "function" ? t.value.itemGenerator(m) : {
      ...m
    }, B = n(b(a.query)), p = () => {
      typeof t.value.appHeaderSingle == "function" ? A(t.value.appHeaderSingle({ item: B.value })) : typeof t.value.appHeaderSingle == "object" && Object.keys(t.value.appHeaderSingle).length > 0 && A(t.value.appHeaderSingle);
    };
    L(a, (m) => {
      d.value = a.params.type, y.value = a.params.id, k.value = !1, u.value = !1, i.value = ["create"], t.value = j.getWebItemSettings(d.value), T(() => {
        B.value = b(a.query), T(() => {
          p(), T(() => k.value = !0);
        });
      });
    }, { flush: "pre", immediate: !0, deep: !0 });
    const c = w(() => typeof t.value.appHeaderSingle < "u" ? {} : {
      text: t.value.labelSingle ?? "",
      icon: t.value.icon,
      tag: "h1"
    }), v = w(() => {
      var m, f;
      return ((f = (m = t.value) == null ? void 0 : m.single) == null ? void 0 : f.createButton) === !1 ? !1 : {
        resource: "mk-web-item",
        icon: "lkt-icn-save",
        text: "Create",
        ...t.value.single.createButton,
        events: {
          click: (C) => {
            var H, _, I, U;
            typeof ((_ = (H = t.value.single.createButton) == null ? void 0 : H.events) == null ? void 0 : _.click) == "function" && ((U = (I = t.value.single.createButton) == null ? void 0 : I.events) == null || U.click(C));
          }
        },
        hooks: {
          redirectType: "replace",
          onSuccessRedirectTo: (C) => {
            if (s.onCreateTo)
              return s.onCreateTo;
            if (C.httpResponse.autoReloadId)
              return `/admin/web-items/${d.value}/${C.httpResponse.autoReloadId}`;
          }
        }
      };
    }), g = w(() => {
      var m, f;
      return ((f = (m = t.value) == null ? void 0 : m.single) == null ? void 0 : f.createButton) === !1 ? !1 : {
        resource: "mk-web-item",
        icon: "lkt-icn-save",
        text: "Create",
        ...t.value.single.createAndNewButton,
        events: {
          click: (C) => {
            var H, _, I, U;
            typeof ((_ = (H = t.value.single.createAndNewButton) == null ? void 0 : H.events) == null ? void 0 : _.click) == "function" && ((U = (I = t.value.single.createAndNewButton) == null ? void 0 : I.events) == null || U.click(C)), r.push({
              path: `/admin/web-items/${d.value}/new`,
              query: {
                keepCreating: me()
              },
              replace: !0
            });
          }
        }
      };
    }), M = w(() => {
      var m, f;
      return ((f = (m = t.value) == null ? void 0 : m.single) == null ? void 0 : f.updateButton) === !1 ? !1 : {
        resource: "up-web-item",
        icon: "lkt-icn-save",
        text: "Update",
        ...t.value.single.updateButton
      };
    }), Q = w(() => {
      var m, f;
      return ((f = (m = t.value) == null ? void 0 : m.single) == null ? void 0 : f.dropButton) === !1 ? !1 : {
        resource: "rm-web-item",
        resourceData: { id: y },
        icon: "lkt-icn-trash",
        text: "Remove",
        events: {
          click: () => {
            r.back();
          }
        },
        ...t.value.single.dropButton
      };
    }), ue = (m) => `/admin/web-items/${d.value}/${m}`;
    return Y(() => {
      T(() => {
        p();
      });
    }), (m, f) => {
      const C = D("lkt-item-crud"), H = D("lkt-loader");
      return l(e) ? (h(), q("section", we, [
        k.value ? (h(), S(C, J({
          key: 0,
          modelValue: B.value,
          "onUpdate:modelValue": f[0] || (f[0] = (_) => B.value = _),
          editing: u.value,
          "onUpdate:editing": f[1] || (f[1] = (_) => u.value = _),
          perms: i.value,
          "onUpdate:perms": f[2] || (f[2] = (_) => i.value = _)
        }, {
          readResource: "r-web-item",
          readData: { id: y.value },
          mode: y.value > 0 ? l(G).Update : l(G).Create,
          buttonNavVisibility: l(ae).Always,
          redirectOnCreate: ue,
          ...t.value.single,
          header: c.value,
          createButton: v.value,
          createAndNewButton: g.value,
          updateButton: M.value,
          dropButton: Q.value
        }), null, 16, ["modelValue", "editing", "perms"])) : (h(), S(H, { key: 1 }))
      ])) : $("", !0);
    };
  }
}), De = () => {
  N({
    url: "/translations",
    name: "ls-lkt-i18n",
    params: { property: { default: void 0 }, value: { default: void 0 }, type: { default: void 0 }, page: { default: void 0 } },
    digToPerms: "perms",
    digToData: "results",
    digToMaxPage: "maxPage",
    mapData: (o) => o.map((e) => new Z(e))
  }), N({
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
  }), oe({
    url: "/translation/{id}",
    name: "rm-i18n",
    params: {
      id: { default: void 0 }
    },
    digToPerms: "perms",
    digToData: "item"
  });
}, Me = () => {
  N({
    url: "/user/roles/page-{page}",
    name: "ls-user-role",
    params: { page: { default: void 0 } },
    digToPerms: "perms",
    digToData: "results",
    mapData: (o) => o
  }), N({
    url: "/user/roles",
    name: "all-user-role",
    digToPerms: "perms",
    digToData: "results",
    mapData: (o) => o
  }), N({
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
  }), oe({
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
    o.component("lkt-admin-menu-button") === void 0 && o.component("lkt-admin-menu-button", ce), o.component("lkt-admin-menu") === void 0 && o.component("lkt-admin-menu", ve);
  }
}, O = (o, e) => {
}, Re = (o) => {
  o.addRoute({ path: "/admin/web-pages/:type", name: "lkt-admin-pages", component: ye, beforeEnter: O }), o.addRoute({ path: "/admin/web-pages/:type/:id", name: "lkt-admin-page", component: ke, beforeEnter: O }), o.addRoute({ path: "/admin/web-items/:type", name: "lkt-web-items", component: _e, beforeEnter: O }), o.addRoute({ path: "/admin/web-items/:type/:id", name: "lkt-web-item", component: Te, beforeEnter: O, props: (e) => ({
    id: e.params.id,
    type: e.params.type,
    onCreateTo: e.query.onCreateTo ?? ""
  }) });
};
export {
  Pe as default,
  De as setupAdminTranslationsHttp,
  Me as setupAdminUserRoleHttp,
  Re as setupLktVueAdminRoutes
};

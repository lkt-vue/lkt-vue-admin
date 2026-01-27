import { defineComponent as V, inject as D, resolveComponent as M, createBlock as S, createCommentVNode as $, unref as u, openBlock as B, mergeProps as J, isRef as ie, computed as b, createElementBlock as q, normalizeClass as se, createVNode as de, ref as n, watch as L, nextTick as h, onMounted as Y } from "vue";
import { ButtonType as P, WebPageController as E, MenuEntryType as F, WebItemsController as j, AppSize as R, FieldType as ee, ColumnType as W, LktSettings as X, TableRowType as te, TableType as z, ItemCrudButtonNavVisibility as ae, ItemCrudMode as G, WebPage as pe, LktTranslation as Z } from "lkt-vue-kernel";
import { useRoute as K, useRouter as ne } from "vue-router";
import { updateMainHeader as x } from "lkt-vue-app";
import { time as me } from "lkt-date-tools";
import { createHTTPGetResource as N, createHTTPPostResource as re, createHTTPPutResource as le, createHTTPDeleteResource as oe } from "lkt-http-client";
const ce = /* @__PURE__ */ V({
  __name: "LktAdminMenuButton",
  setup(o) {
    const e = D("adminMenu"), s = D("lktAdminEnabled");
    return (a, l) => {
      const p = M("lkt-button");
      return u(s) ? (B(), S(p, J({
        key: 0,
        checked: u(e),
        "onUpdate:checked": l[0] || (l[0] = (f) => ie(e) ? e.value = f : null)
      }, {
        type: u(P).HiddenSwitch,
        icon: "lkt-icn-lkt",
        class: "lkt-admin-button"
      }), null, 16, ["checked"])) : $("", !0);
    };
  }
}), ve = /* @__PURE__ */ V({
  __name: "LktAdminMenu",
  setup(o) {
    const e = D("adminMenu"), s = b(() => {
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
      }), E.getPages().forEach((l) => {
        a.push({
          key: l.code,
          type: F.Entry,
          icon: "lkt-icn-webpage",
          anchor: {
            to: `/admin/web-pages/${l.id}`,
            text: l.label,
            events: {
              click: () => {
                e.value = !1;
              }
            }
          }
        });
      }), j.getItems().forEach((l) => {
        l.many !== !1 && a.push({
          key: l.code,
          type: F.Entry,
          icon: l.icon,
          anchor: {
            to: `/admin/web-items/${l.code}`,
            text: l.labelMany,
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
    return (a, l) => {
      const p = M("lkt-menu");
      return B(), q("div", {
        class: se(["lkt-admin-menu", u(e) ? "is-opened" : ""])
      }, [
        de(p, {
          "model-value": s.value,
          onClickOutside: l[0] || (l[0] = (f) => e.value = !1)
        }, null, 8, ["model-value"])
      ], 2);
    };
  }
}), fe = { class: "lkt-admin-spa lkt-admin-pages" }, ye = /* @__PURE__ */ V({
  __name: "LktAdminPagesSpa",
  setup(o) {
    const e = K(), s = n(e.params.type), a = n(e.params.id), l = n({
      name: "",
      type: s.value
    }), p = n([]), f = n(null), k = n(!1), r = n(E.getCustomWebPageSettings(s.value)), i = () => {
      typeof r.value.appHeaderMany == "function" ? x(r.value.appHeaderMany({ items: p.value })) : typeof r.value.appHeaderMany == "object" && Object.keys(r.value.appHeaderMany).length > 0 && x(r.value.appHeaderMany);
    };
    L(e, (m) => {
      s.value = e.params.type, a.value = e.params.id, l.value.type = s.value, k.value = !1, r.value = E.getCustomWebPageSettings(s.value), h(() => {
        i(), h(() => k.value = !0);
      });
    }, { flush: "pre", immediate: !0, deep: !0 });
    let t = D("lktAppSize");
    t || (t = n(R.MD));
    const _ = b(() => [
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
            to: (m) => `/admin/web-pages/${s.value}/${m.id}`
          }
        }
      }
    ]), A = b(() => {
      var d, g, w;
      return typeof ((d = r.value) == null ? void 0 : d.appHeaderMany) < "u" ? {} : {
        text: ((g = r.value) == null ? void 0 : g.labelMany) ?? "",
        icon: (w = r.value) == null ? void 0 : w.icon,
        tag: "h1"
      };
    }), y = b(() => {
      var m, d, g;
      return ((d = (m = r.value) == null ? void 0 : m.many) == null ? void 0 : d.createButton) === !1 ? !1 : {
        icon: "lkt-icn-more",
        text: "Add web page",
        type: P.Anchor,
        anchor: {
          to: `/admin/web-pages/${s.value}/new`
        },
        //@ts-ignore
        ...(g = r.value.many) == null ? void 0 : g.createButton
      };
    });
    return Y(() => {
      k.value = !0;
    }), (m, d) => {
      const g = M("lkt-table");
      return B(), q("section", fe, [
        k.value ? (B(), S(g, J({
          key: 0,
          ref_key: "spaRef",
          ref: f,
          modelValue: p.value,
          "onUpdate:modelValue": d[0] || (d[0] = (w) => p.value = w)
        }, {
          type: u(t) < u(R).MD ? u(z).Accordion : u(z).Table,
          rowDisplayType: u(te).PreferColumns,
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          header: A.value,
          columns: _.value,
          paginator: {
            resource: "ls-web-pages-type",
            resourceData: l.value
          },
          createButton: y.value,
          itemsContainerClass: u(t) < u(R).MD ? "lkt-grid-1 xs-grid-style" : "",
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
    const e = K(), s = ne(), a = n(e.params.type), l = n(e.params.id), p = n(!1), f = n(!1), k = n(["create"]);
    L(e, (y) => {
      a.value = e.params.type, l.value = e.params.id;
    }, { flush: "pre", immediate: !0, deep: !0 });
    const r = n(E.getCustomWebPageSettings(a.value)), i = (y) => {
      var m;
      return typeof ((m = r.value) == null ? void 0 : m.itemGenerator) == "function" ? r.value.itemGenerator(y) : new pe({
        ...y
      });
    }, t = n(i(e.query)), _ = () => {
      var y, m;
      typeof ((y = r.value) == null ? void 0 : y.appHeaderSingle) == "function" ? x(r.value.appHeaderSingle({ item: t.value })) : typeof ((m = r.value) == null ? void 0 : m.appHeaderSingle) == "object" && Object.keys(r.value.appHeaderSingle).length > 0 && x(r.value.appHeaderSingle);
    };
    L(e, (y) => {
      a.value = e.params.type, l.value = e.params.id, p.value = !1, f.value = !1, k.value = ["create"], r.value = E.getCustomWebPageSettings(a.value), h(() => {
        t.value = i(e.query), h(() => {
          _(), h(() => p.value = !0);
        });
      });
    }, { flush: "pre", immediate: !0, deep: !0 });
    const A = (y) => `/admin/web-pages/${a.value}/${y}`;
    return (y, m) => {
      const d = M("lkt-web-page");
      return B(), q("section", ge, [
        p.value ? (B(), S(d, {
          key: 0,
          modelValue: t.value,
          "onUpdate:modelValue": m[0] || (m[0] = (g) => t.value = g),
          "crud-config": {
            readResource: "r-web-page",
            readData: {
              id: l.value
            },
            mode: l.value > 0 ? u(G).Update : u(G).Create,
            buttonNavVisibility: u(ae).Always,
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
                  u(s).back();
                }
              }
            },
            redirectOnCreate: A
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
    const e = D("lktAdminEnabled");
    e.value || (window.location.href = "/");
    const s = K(), a = n(s.params.type), l = n(s.params.id), p = n({
      name: "",
      type: a.value
    }), f = n([]), k = n(null), r = n(!1), i = n(j.getWebItemSettings(a.value)), t = () => {
      typeof i.value.appHeaderMany == "function" ? x(i.value.appHeaderMany({ items: f.value })) : typeof i.value.appHeaderMany == "object" && Object.keys(i.value.appHeaderMany).length > 0 && x(i.value.appHeaderMany);
    };
    L(s, (d) => {
      a.value = s.params.type, l.value = s.params.id, f.value.splice(0, f.value.length), r.value = !1, p.value.type = a.value, i.value = j.getWebItemSettings(a.value), h(() => {
        t(), h(() => r.value = !0);
      });
    }, { flush: "pre", immediate: !0, deep: !0 });
    let _ = D("lktAppSize");
    _ || (_ = n(R.MD));
    const A = b(() => i.value.many.columns ? [
      ...i.value.many.columns,
      {
        type: W.Button,
        key: "details",
        label: "Details",
        button: {
          ...X.defaultDetailsButton,
          type: P.Anchor,
          anchor: {
            to: (d) => `/admin/web-items/${a.value}/${d.id}`
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
            to: (d) => `/admin/web-items/${a.value}/${d.id}`
          }
        }
      }
    ]), y = b(() => typeof i.value.appHeaderMany < "u" ? {} : {
      text: i.value.labelMany ?? "",
      icon: i.value.icon,
      tag: "h1"
    }), m = b(() => {
      var d, g, w;
      return ((g = (d = i.value) == null ? void 0 : d.many) == null ? void 0 : g.createButton) === !1 ? !1 : {
        icon: "lkt-icn-more",
        text: "Add web item",
        type: P.Anchor,
        anchor: {
          to: `/admin/web-items/${a.value}/new`
        },
        //@ts-ignore
        ...(w = i.value.many) == null ? void 0 : w.createButton
      };
    });
    return Y(() => {
      r.value = !0;
    }), (d, g) => {
      const w = M("lkt-table");
      return u(e) ? (B(), q("section", be, [
        r.value ? (B(), S(w, J({
          key: 0,
          ref_key: "spaRef",
          ref: k,
          modelValue: f.value,
          "onUpdate:modelValue": g[0] || (g[0] = (Q) => f.value = Q)
        }, {
          type: u(_) < u(R).MD ? u(z).Accordion : u(z).Table,
          rowDisplayType: u(te).PreferColumns,
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          paginator: {
            resource: "ls-web-items",
            resourceData: p.value
          },
          itemsContainerClass: u(_) < u(R).MD ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          },
          ...i.value.many,
          columns: A.value,
          header: y.value,
          createButton: m.value
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
    const e = D("lktAdminEnabled"), s = o, a = K(), l = ne(), p = n(a.params.type), f = n(a.params.id), k = n(!1), r = n(!1), i = n(["create"]), t = n(j.getWebItemSettings(p.value)), _ = (c) => typeof t.value.itemGenerator == "function" ? t.value.itemGenerator(c) : {
      ...c
    }, A = n(_(a.query)), y = () => {
      typeof t.value.appHeaderSingle == "function" ? x(t.value.appHeaderSingle({ item: A.value })) : typeof t.value.appHeaderSingle == "object" && Object.keys(t.value.appHeaderSingle).length > 0 && x(t.value.appHeaderSingle);
    };
    L(a, (c) => {
      p.value = a.params.type, f.value = a.params.id, k.value = !1, r.value = !1, i.value = ["create"], t.value = j.getWebItemSettings(p.value), h(() => {
        A.value = _(a.query), h(() => {
          y(), h(() => k.value = !0);
        });
      });
    }, { flush: "pre", immediate: !0, deep: !0 });
    const m = b(() => typeof t.value.appHeaderSingle < "u" ? {} : {
      text: t.value.labelSingle ?? "",
      icon: t.value.icon,
      tag: "h1"
    }), d = b(() => {
      var c, v;
      return ((v = (c = t.value) == null ? void 0 : c.single) == null ? void 0 : v.createButton) === !1 ? !1 : {
        resource: "mk-web-item",
        icon: "lkt-icn-save",
        text: "Create",
        ...t.value.single.createButton,
        events: {
          click: (C) => {
            var H, T, I, U;
            typeof ((T = (H = t.value.single.createButton) == null ? void 0 : H.events) == null ? void 0 : T.click) == "function" && ((U = (I = t.value.single.createButton) == null ? void 0 : I.events) == null || U.click(C));
          }
        },
        hooks: {
          redirectType: "replace",
          onSuccessRedirectTo: (C) => {
            if (s.onCreateTo)
              return s.onCreateTo;
            if (C.httpResponse.autoReloadId)
              return `/admin/web-items/${p.value}/${C.httpResponse.autoReloadId}`;
          }
        }
      };
    }), g = b(() => {
      var c, v;
      return ((v = (c = t.value) == null ? void 0 : c.single) == null ? void 0 : v.createButton) === !1 ? !1 : {
        resource: "mk-web-item",
        icon: "lkt-icn-save",
        text: "Create",
        ...t.value.single.createAndNewButton,
        events: {
          click: (C) => {
            var H, T, I, U;
            typeof ((T = (H = t.value.single.createAndNewButton) == null ? void 0 : H.events) == null ? void 0 : T.click) == "function" && ((U = (I = t.value.single.createAndNewButton) == null ? void 0 : I.events) == null || U.click(C)), l.push({
              path: `/admin/web-items/${p.value}/new`,
              query: {
                keepCreating: me()
              },
              replace: !0
            });
          }
        }
      };
    }), w = b(() => {
      var c, v;
      return ((v = (c = t.value) == null ? void 0 : c.single) == null ? void 0 : v.updateButton) === !1 ? !1 : {
        resource: "up-web-item",
        icon: "lkt-icn-save",
        text: "Update",
        ...t.value.single.updateButton
      };
    }), Q = b(() => {
      var c, v;
      return ((v = (c = t.value) == null ? void 0 : c.single) == null ? void 0 : v.dropButton) === !1 ? !1 : {
        resource: "rm-web-item",
        resourceData: { id: f },
        icon: "lkt-icn-trash",
        text: "Remove",
        events: {
          click: () => {
            l.back();
          }
        },
        ...t.value.single.dropButton
      };
    }), ue = (c) => `/admin/web-items/${p.value}/${c}`;
    return Y(() => {
      h(() => {
        y();
      });
    }), (c, v) => {
      const C = M("lkt-item-crud"), H = M("lkt-loader");
      return u(e) ? (B(), q("section", we, [
        k.value ? (B(), S(C, J({
          key: 0,
          modelValue: A.value,
          "onUpdate:modelValue": v[0] || (v[0] = (T) => A.value = T),
          editing: r.value,
          "onUpdate:editing": v[1] || (v[1] = (T) => r.value = T),
          perms: i.value,
          "onUpdate:perms": v[2] || (v[2] = (T) => i.value = T)
        }, {
          readResource: "r-web-item",
          readData: { id: f.value },
          mode: f.value > 0 ? u(G).Update : u(G).Create,
          buttonNavVisibility: u(ae).Always,
          redirectOnCreate: ue,
          ...t.value.single,
          header: m.value,
          createButton: d.value,
          createAndNewButton: g.value,
          updateButton: w.value,
          dropButton: Q.value
        }), null, 16, ["modelValue", "editing", "perms"])) : (B(), S(H, { key: 1 }))
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

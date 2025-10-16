import { defineComponent as M, inject as A, resolveComponent as D, createBlock as P, createCommentVNode as F, unref as a, openBlock as h, mergeProps as U, isRef as oe, computed as b, createElementBlock as $, normalizeClass as re, createVNode as K, ref as o, watch as L, nextTick as j, onMounted as ie } from "vue";
import { ButtonType as B, WebPageController as X, MenuEntryType as O, WebItemsController as G, AppSize as x, FieldType as _, ColumnType as C, TableRowType as Y, TableType as V, ItemCrudButtonNavVisibility as Z, ItemCrudMode as S, FormInstance as H, FieldAutoValidationTrigger as Q, AnchorType as ue, MultipleOptionsDisplay as te } from "lkt-vue-kernel";
import { useRoute as N, useRouter as ee } from "vue-router";
import { time as ne } from "lkt-date-tools";
import { createHTTPGetResource as ae, createHTTPPostResource as se, createHTTPPutResource as de, createHTTPDeleteResource as pe } from "lkt-http-client";
const ce = /* @__PURE__ */ M({
  __name: "LktAdminMenuButton",
  setup(s) {
    const e = A("adminMenu"), u = A("lktAdminEnabled");
    return (t, l) => {
      const r = D("lkt-button");
      return a(u) ? (h(), P(r, U({
        key: 0,
        checked: a(e),
        "onUpdate:checked": l[0] || (l[0] = (p) => oe(e) ? e.value = p : null)
      }, {
        type: a(B).HiddenSwitch,
        icon: "lkt-icn-lkt",
        class: "lkt-admin-button"
      }), null, 16, ["checked"])) : F("", !0);
    };
  }
}), me = /* @__PURE__ */ M({
  __name: "LktAdminMenu",
  setup(s) {
    const e = A("adminMenu"), u = b(() => {
      let t = [];
      return X.hasDefaultPageEnabled() && t.push({
        key: "web-pages",
        type: O.Entry,
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
      }), X.getPages().forEach((l) => {
        t.push({
          key: l.code,
          type: O.Entry,
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
      }), G.getItems().forEach((l) => {
        l.many !== !1 && t.push({
          key: l.code,
          type: O.Entry,
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
      }), t.push(
        {
          key: "translations",
          type: O.Entry,
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
      ), t;
    });
    return (t, l) => {
      const r = D("lkt-menu");
      return h(), $("div", {
        class: re(["lkt-admin-menu", a(e) ? "is-opened" : ""])
      }, [
        K(r, {
          "model-value": u.value,
          onClickOutside: l[0] || (l[0] = (p) => e.value = !1)
        }, null, 8, ["model-value"])
      ], 2);
    };
  }
}), ve = { class: "lkt-admin-spa lkt-admin-pages" }, ye = /* @__PURE__ */ M({
  __name: "LktAdminPagesSpa",
  setup(s) {
    const e = N(), u = o(e.params.type), t = o(e.params.id), l = o({
      name: "",
      type: u.value
    }), r = o([]), p = o(null);
    L(e, (n) => {
      u.value = e.params.type, t.value = e.params.id, l.value.type = u.value;
    }, { flush: "pre", immediate: !0, deep: !0 });
    let d = A("lktAppSize");
    d || (d = o(x.MD));
    const c = b(() => [
      {
        type: C.Field,
        key: "name",
        label: "__:common.column.name",
        isForAccordionHeader: !0,
        field: {
          type: _.Text,
          icon: "lkt-icn-webpage"
        }
      },
      {
        type: C.Button,
        key: "details",
        label: "Details",
        button: {
          type: B.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (n) => `/admin/web-pages/${u.value}/${n.id}`
          }
        }
      }
    ]), i = b(() => {
      let n = "Web Pages";
      return X.getPages().forEach((k) => {
        if (k.id == u.value) {
          n = k.label ?? "Web Pages";
          return;
        }
      }), n;
    });
    return (n, k) => {
      const v = D("lkt-table");
      return h(), $("section", ve, [
        K(v, U({
          ref_key: "spaRef",
          ref: p,
          modelValue: r.value,
          "onUpdate:modelValue": k[0] || (k[0] = (f) => r.value = f)
        }, {
          type: a(d) < a(x).MD ? a(V).Accordion : a(V).Table,
          rowDisplayType: a(Y).PreferColumns,
          title: i.value,
          titleTag: "h1",
          titleIcon: "lkt-icn-webpage",
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          columns: c.value,
          paginator: {
            resource: "ls-web-pages-type",
            resourceData: l.value
          },
          createButton: {
            icon: "lkt-icn-more",
            type: a(B).Anchor,
            anchor: {
              to: `/admin/web-pages/${u.value}/0`
            }
          },
          itemsContainerClass: a(d) < a(x).MD ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          }
        }), null, 16, ["modelValue"])
      ]);
    };
  }
}), ke = { class: "lkt-admin-spa" }, fe = /* @__PURE__ */ M({
  __name: "LktAdminPageSpa",
  setup(s) {
    const e = N(), u = ee(), t = o(e.params.type), l = o(e.params.id);
    L(e, (d) => {
      t.value = e.params.type, l.value = e.params.id;
    }, { flush: "pre", immediate: !0, deep: !0 });
    const r = o({}), p = (d) => `/admin/web-pages/${t.value}/${d}`;
    return (d, c) => {
      const i = D("lkt-web-page");
      return h(), $("section", ke, [
        K(i, {
          modelValue: r.value,
          "onUpdate:modelValue": c[0] || (c[0] = (n) => r.value = n),
          "crud-config": {
            readResource: "r-web-page",
            readData: {
              id: l.value
            },
            mode: l.value > 0 ? a(S).Update : a(S).Create,
            buttonNavVisibility: a(Z).Always,
            editing: !0,
            perms: ["update"],
            createButton: {
              resource: "mk-web-page",
              resourceData: { ...r.value, type: t.value },
              text: "Create",
              disabled: !1
            },
            updateButton: {
              resource: "up-web-page",
              resourceData: r.value,
              text: "Update",
              disabled: !1
            },
            dropButton: {
              resource: "rm-web-page",
              resourceData: r.value,
              text: "Remove",
              disabled: !1,
              events: {
                click: () => {
                  a(u).back();
                }
              }
            },
            redirectOnCreate: p
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
}), be = {
  key: 0,
  class: "lkt-admin-spa lkt-admin-translations"
}, ge = /* @__PURE__ */ M({
  __name: "LktAdminTranslationsSpa",
  setup(s) {
    const e = A("lktAdminEnabled");
    e.value || (window.location.href = "/");
    const u = N(), t = o(u.params.id), l = o({
      property: "",
      value: ""
    }), r = o([]), p = o(null);
    L(u, (k) => {
      t.value = u.params.id;
    }, { flush: "pre", immediate: !0, deep: !0 });
    let d = A("lktAppSize");
    d || (d = o(x.MD));
    const c = b(() => [
      {
        type: C.Field,
        key: "property",
        label: "Property",
        isForAccordionHeader: !0,
        field: {
          type: _.Text,
          icon: "lkt-icn-lang-picker"
        }
      },
      {
        type: C.Field,
        key: "type",
        label: "Type",
        ensureFieldLabel: d.value < x.MD,
        field: {
          type: _.Select,
          options: [_.Text, _.Textarea]
        }
      },
      {
        type: C.Field,
        key: "value",
        label: "Value",
        ensureFieldLabel: d.value < x.MD,
        field: {
          type: "prop:type",
          readModeConfig: {
            textMaxLength: 10
          }
        }
      },
      {
        type: C.Button,
        key: "details",
        label: "Details",
        button: {
          type: B.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (k) => `/admin/i18n/${k.id}`
          }
        }
      }
    ]), i = b(() => "Translations"), n = b(() => ({
      header: {
        text: "Filters",
        tag: "h2"
      },
      items: [
        H.mkFieldItemConfig("property", {
          type: _.Text,
          label: "Property"
        })
        // FormInstance.mkFieldItemConfig('value', {
        //     type: FieldType.Text,
        //     label: 'Value',
        // }),
      ]
    }));
    return (k, v) => {
      const f = D("lkt-table");
      return a(e) ? (h(), $("section", be, [
        K(f, U({
          ref_key: "spaRef",
          ref: p,
          modelValue: r.value,
          "onUpdate:modelValue": v[0] || (v[0] = (g) => r.value = g)
        }, {
          type: a(d) < a(x).MD ? a(V).Accordion : a(V).Table,
          rowDisplayType: a(Y).PreferColumns,
          header: {
            text: i.value,
            icon: "lkt-icn-lang-picker",
            tag: "h1"
          },
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          columns: c.value,
          paginator: {
            resource: "ls-lkt-i18n",
            resourceData: l.value
          },
          createButton: {
            icon: "lkt-icn-more",
            text: "Add translation",
            type: a(B).Anchor,
            anchor: {
              to: "/admin/i18n/new"
            }
          },
          itemsContainerClass: a(d) < a(x).MD ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          },
          filtersForm: n.value
        }), null, 16, ["modelValue"])
      ])) : F("", !0);
    };
  }
}), _e = {
  key: 0,
  class: "lkt-admin-spa"
}, he = /* @__PURE__ */ M({
  __name: "LktAdminTranslationSpa",
  props: {
    onCreateTo: {}
  },
  setup(s) {
    const e = s;
    console.log("i18n props: ", e);
    const u = A("lktAdminEnabled");
    u.value || (window.location.href = "/");
    const t = N(), l = ee(), r = o(parseInt(t.params.id)), p = o(!1), d = o(!1), c = o(["create", "switch-edit-mode"]), i = o({
      property: "",
      type: _.Text,
      value: "",
      valueData: {},
      children: [],
      ...t.query
    });
    L(t, (v) => {
      r.value = parseInt(t.params.id), d.value = !1, p.value = !1, i.value = {
        property: "",
        type: _.Text,
        value: "",
        valueData: {},
        children: [],
        ...t.query
      }, c.value = ["create", "switch-edit-mode"], j(() => d.value = !0);
    }, { flush: "pre", immediate: !0, deep: !0 });
    const n = b(() => (v) => ({
      items: [
        H.mkFieldItemConfig("property", {
          type: _.Text,
          label: "Property",
          mandatory: !0,
          validation: {
            trigger: Q.Blur
          }
        }),
        H.mkFieldItemConfig("type", {
          type: _.Select,
          mandatory: !0,
          label: "Type",
          options: [_.Text, _.Textarea, "many"],
          readMode: i.value.type === "many" && i.value.id > 0,
          validation: {
            trigger: Q.Blur
          }
        }),
        H.mkFieldItemConfig("valueData", {
          type: i.value.type,
          mandatory: !0,
          canI18n: !0,
          label: "Value",
          validation: {
            trigger: Q.Blur
          }
        }, {}, { canRender: i.value.type !== "many" }),
        H.mkFieldItemConfig("children", {
          type: _.Table,
          multiple: !0,
          options: "prop:children",
          optionValueType: "option",
          searchable: !1,
          multipleDisplay: te.Table,
          multipleDisplayEdition: te.Table,
          tooltipConfig: {
            compensateGlobalContainers: !1
          },
          optionsConfig: {
            icon: "lkt-icn-edit",
            anchor: {
              to: "/admin/i18n/feed{value}"
            },
            zeroMeansEmpty: !0,
            table: {
              type: V.Table,
              drag: {
                enabled: !0,
                isDraggable: !0,
                isValid: !0,
                isDisabled: !1,
                canRender: !0,
                dragKey: "drag-indicator"
              },
              columns: [
                {
                  key: "property",
                  label: "Property",
                  type: C.Field,
                  field: {
                    type: _.Text,
                    icon: "lkt-icn-lang-picker"
                  }
                },
                {
                  key: "details",
                  label: "Details",
                  type: C.Button,
                  button: {
                    type: B.Anchor,
                    text: "__:common.button.details",
                    class: "lkt-button--info",
                    icon: "lkt-icn-expand",
                    anchor: {
                      to: "/admin/i18n/feed{value}"
                    }
                  }
                }
              ]
            }
          },
          createButton: {
            type: B.Anchor,
            anchor: {
              type: ue.RouterLink,
              to: {
                path: "/admin/i18n/new",
                query: {
                  parentId: v.item.id,
                  onCreateTo: `/admin/i18n/${v.item.id}`
                }
              }
            }
          }
        }, {}, { canRender: i.value.id > 0 && i.value.type === "many" })
      ]
    })), k = b(() => ({
      header: {
        text: r.value > 0 ? i.value.property : "New translation",
        icon: "lkt-icn-lang-picker",
        tag: "h1"
      },
      readResource: "r-i18n",
      readData: {
        id: r.value
      },
      mode: r.value > 0 ? S.Update : S.Create,
      form: n.value,
      buttonNavVisibility: Z.Always,
      createButton: {
        resource: "mk-i18n",
        icon: "lkt-icn-save",
        text: "Create",
        events: {
          click: (v) => {
            var f;
            e.onCreateTo ? l.push({
              path: e.onCreateTo,
              replace: !0
            }) : l.push({
              path: `/admin/i18n/${(f = v.httpResponse) == null ? void 0 : f.autoReloadId}`,
              replace: !0
            });
          }
        }
      },
      createAndNewButton: {
        resource: "mk-i18n",
        icon: "lkt-icn-save",
        text: "Create and new",
        events: {
          click: (v) => {
            l.push({
              path: "/admin/i18n/new",
              query: {
                keepCreating: ne()
              },
              replace: !0
            });
          }
        }
      },
      updateButton: {
        resource: "up-i18n",
        icon: "lkt-icn-save",
        text: "Update"
      },
      dropButton: {
        resource: "rm-i18n",
        resourceData: { id: r.value },
        icon: "lkt-icn-trash",
        text: "Remove",
        events: {
          click: () => {
            l.back();
          }
        }
      }
      // redirectOnCreate,
    }));
    return (v, f) => {
      const g = D("lkt-item-crud"), R = D("lkt-loader");
      return a(u) ? (h(), $("section", _e, [
        d.value ? (h(), P(g, U({
          key: 0,
          modelValue: i.value,
          "onUpdate:modelValue": f[0] || (f[0] = (T) => i.value = T),
          editing: p.value,
          "onUpdate:editing": f[1] || (f[1] = (T) => p.value = T),
          perms: c.value,
          "onUpdate:perms": f[2] || (f[2] = (T) => c.value = T)
        }, k.value), null, 16, ["modelValue", "editing", "perms"])) : (h(), P(R, { key: 1 }))
      ])) : F("", !0);
    };
  }
}), Te = {
  key: 0,
  class: "lkt-admin-spa lkt-web-items"
}, we = /* @__PURE__ */ M({
  __name: "LktWebItemsSpa",
  setup(s) {
    const e = A("lktAdminEnabled");
    e.value || (window.location.href = "/");
    const u = N(), t = o(u.params.type), l = o(u.params.id), r = o({
      name: "",
      type: t.value
    }), p = o([]), d = o(null), c = o(!1), i = o(G.getWebItemSettings(t.value));
    L(u, (g) => {
      t.value = u.params.type, l.value = u.params.id, p.value.splice(0, p.value.length), c.value = !1, r.value.type = t.value, i.value = G.getWebItemSettings(t.value), j(() => c.value = !0);
    }, { flush: "pre", immediate: !0, deep: !0 });
    let n = A("lktAppSize");
    n || (n = o(x.MD));
    const k = b(() => i.value.many.columns ? [
      ...i.value.many.columns,
      {
        type: C.Button,
        key: "details",
        label: "Details",
        button: {
          type: B.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (g) => `/admin/web-items/${t.value}/${g.id}`
          }
        }
      }
    ] : [
      {
        type: C.Field,
        key: "name",
        label: "Name",
        isForAccordionHeader: !0,
        field: {
          type: _.Text,
          icon: i.value.icon
        }
      },
      {
        type: C.Button,
        key: "details",
        label: "Details",
        button: {
          type: B.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (g) => `/admin/web-items/${t.value}/${g.id}`
          }
        }
      }
    ]), v = b(() => ({
      text: i.value.labelMany ?? "",
      icon: i.value.icon,
      tag: "h1"
    })), f = b(() => {
      var g, R, T;
      return ((R = (g = i.value) == null ? void 0 : g.many) == null ? void 0 : R.createButton) === !1 ? !1 : {
        icon: "lkt-icn-more",
        text: "Add web item",
        type: B.Anchor,
        anchor: {
          to: `/admin/web-items/${t.value}/new`
        },
        //@ts-ignore
        ...(T = i.value.many) == null ? void 0 : T.createButton
      };
    });
    return ie(() => {
      c.value = !0;
    }), (g, R) => {
      const T = D("lkt-table");
      return a(e) ? (h(), $("section", Te, [
        c.value ? (h(), P(T, U({
          key: 0,
          ref_key: "spaRef",
          ref: d,
          modelValue: p.value,
          "onUpdate:modelValue": R[0] || (R[0] = (J) => p.value = J)
        }, {
          type: a(n) < a(x).MD ? a(V).Accordion : a(V).Table,
          rowDisplayType: a(Y).PreferColumns,
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          paginator: {
            resource: "ls-web-items",
            resourceData: r.value
          },
          itemsContainerClass: a(n) < a(x).MD ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          },
          ...i.value.many,
          columns: k.value,
          header: v.value,
          createButton: f.value
        }), null, 16, ["modelValue"])) : F("", !0)
      ])) : F("", !0);
    };
  }
}), xe = {
  key: 0,
  class: "lkt-admin-spa lkt-web-item-spa"
}, Ce = /* @__PURE__ */ M({
  __name: "LktWebItemSpa",
  props: {
    id: {},
    type: {},
    onCreateTo: {}
  },
  setup(s) {
    const e = A("lktAdminEnabled"), u = s, t = N(), l = ee(), r = o(t.params.type), p = o(t.params.id), d = o(!1), c = o(!1), i = o(["create"]), n = o(G.getWebItemSettings(r.value)), k = (m) => typeof n.value.itemGenerator == "function" ? n.value.itemGenerator(m) : {
      ...m
    }, v = o(k(t.query));
    L(t, (m) => {
      r.value = t.params.type, p.value = t.params.id, d.value = !1, c.value = !1, i.value = ["create"], n.value = G.getWebItemSettings(r.value), j(() => {
        v.value = k(t.query), j(() => d.value = !0);
      });
    }, { flush: "pre", immediate: !0, deep: !0 });
    const f = b(() => ({
      text: n.value.labelSingle ?? "",
      icon: n.value.icon,
      tag: "h1"
    })), g = b(() => {
      var m, y;
      return ((y = (m = n.value) == null ? void 0 : m.single) == null ? void 0 : y.createButton) === !1 ? !1 : {
        resource: "mk-web-item",
        icon: "lkt-icn-save",
        text: "Create",
        ...n.value.single.createButton,
        events: {
          click: (q) => {
            var E, w, W, z;
            typeof ((w = (E = n.value.single.createButton) == null ? void 0 : E.events) == null ? void 0 : w.click) == "function" && ((z = (W = n.value.single.createButton) == null ? void 0 : W.events) == null || z.click(q)), u.onCreateTo && l.push({
              path: u.onCreateTo,
              replace: !0
            });
          }
        }
      };
    }), R = b(() => {
      var m, y;
      return ((y = (m = n.value) == null ? void 0 : m.single) == null ? void 0 : y.createButton) === !1 ? !1 : {
        resource: "mk-web-item",
        icon: "lkt-icn-save",
        text: "Create",
        ...n.value.single.createAndNewButton,
        events: {
          click: (q) => {
            var E, w, W, z;
            typeof ((w = (E = n.value.single.createAndNewButton) == null ? void 0 : E.events) == null ? void 0 : w.click) == "function" && ((z = (W = n.value.single.createAndNewButton) == null ? void 0 : W.events) == null || z.click(q)), l.push({
              path: `/admin/web-items/${r.value}/new`,
              query: {
                keepCreating: ne()
              },
              replace: !0
            });
          }
        }
      };
    }), T = b(() => {
      var m, y;
      return ((y = (m = n.value) == null ? void 0 : m.single) == null ? void 0 : y.updateButton) === !1 ? !1 : {
        resource: "up-web-item",
        icon: "lkt-icn-save",
        text: "Update",
        ...n.value.single.updateButton
      };
    }), J = b(() => {
      var m, y;
      return ((y = (m = n.value) == null ? void 0 : m.single) == null ? void 0 : y.dropButton) === !1 ? !1 : {
        resource: "rm-web-item",
        resourceData: { id: p },
        icon: "lkt-icn-trash",
        text: "Remove",
        events: {
          click: () => {
            l.back();
          }
        },
        ...n.value.single.dropButton
      };
    }), le = (m) => `/admin/web-items/${r.value}/${m}`;
    return (m, y) => {
      const q = D("lkt-item-crud"), E = D("lkt-loader");
      return a(e) ? (h(), $("section", xe, [
        d.value ? (h(), P(q, U({
          key: 0,
          modelValue: v.value,
          "onUpdate:modelValue": y[0] || (y[0] = (w) => v.value = w),
          editing: c.value,
          "onUpdate:editing": y[1] || (y[1] = (w) => c.value = w),
          perms: i.value,
          "onUpdate:perms": y[2] || (y[2] = (w) => i.value = w)
        }, {
          readResource: "r-web-item",
          readData: { id: p.value },
          mode: p.value > 0 ? a(S).Update : a(S).Create,
          buttonNavVisibility: a(Z).Always,
          redirectOnCreate: le,
          ...n.value.single,
          header: f.value,
          createButton: g.value,
          createAndNewButton: R.value,
          updateButton: T.value,
          dropButton: J.value
        }), null, 16, ["modelValue", "editing", "perms"])) : (h(), P(E, { key: 1 }))
      ])) : F("", !0);
    };
  }
}), Ee = () => {
  ae({
    url: "/translations",
    name: "ls-lkt-i18n",
    params: { property: { default: void 0 }, value: { default: void 0 } },
    digToPerms: "perms",
    digToData: "results",
    mapData: (s) => s
  }), ae({
    url: "/translation/{id}",
    name: "r-i18n",
    params: { id: { default: void 0 } },
    digToPerms: "perms",
    digToData: "item",
    mapData: (s) => s
  }), se({
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
  }), de({
    url: "/translation/{id}",
    name: "up-i18n",
    params: {
      id: { default: void 0 },
      type: { default: void 0 },
      property: { default: void 0 },
      valueData: { default: void 0 }
    },
    digToPerms: "perms"
  }), pe({
    url: "/translation/{id}",
    name: "rm-i18n",
    params: {
      id: { default: void 0 }
    },
    digToPerms: "perms",
    digToData: "item"
  });
}, Ve = {
  install: (s) => {
    s.component("lkt-admin-menu-button") === void 0 && s.component("lkt-admin-menu-button", ce), s.component("lkt-admin-menu") === void 0 && s.component("lkt-admin-menu", me);
  }
}, I = (s, e) => {
}, $e = (s) => {
  s.addRoute({ path: "/admin/web-pages/:type", name: "lkt-admin-pages", component: ye, beforeEnter: I }), s.addRoute({ path: "/admin/web-pages/:type/:id", name: "lkt-admin-page", component: fe, beforeEnter: I }), s.addRoute({ path: "/admin/web-items/:type", name: "lkt-web-items", component: we, beforeEnter: I }), s.addRoute({ path: "/admin/web-items/:type/:id", name: "lkt-web-item", component: Ce, beforeEnter: I, props: (e) => ({
    id: e.params.id,
    type: e.params.type,
    onCreateTo: e.query.onCreateTo ?? ""
  }) }), s.addRoute({ path: "/admin/i18n", name: "lkt-admin-translations", component: ge, beforeEnter: I }), s.addRoute({ path: "/admin/i18n/:id", name: "lkt-admin-translation", component: he, beforeEnter: I, props: (e) => ({
    onCreateTo: e.query.onCreateTo ?? ""
  }) });
};
export {
  Ve as default,
  Ee as setupAdminTranslationsHttp,
  $e as setupLktVueAdminRoutes
};

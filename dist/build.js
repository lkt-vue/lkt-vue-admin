import { defineComponent as M, inject as A, resolveComponent as D, createBlock as F, createCommentVNode as H, unref as n, openBlock as T, mergeProps as L, isRef as ue, computed as g, createElementBlock as I, normalizeClass as se, createVNode as Q, ref as r, watch as N, nextTick as V, onMounted as oe } from "vue";
import { ButtonType as B, WebPageController as Z, MenuEntryType as K, WebItemsController as G, AppSize as x, FieldType as b, ColumnType as C, TableRowType as ee, TableType as $, ItemCrudButtonNavVisibility as te, ItemCrudMode as U, FormInstance as j, FieldAutoValidationTrigger as Y, AnchorType as de, MultipleOptionsDisplay as ne } from "lkt-vue-kernel";
import { useRoute as q, useRouter as ae } from "vue-router";
import { time as re } from "lkt-date-tools";
import { updateMainHeader as J } from "lkt-vue-app";
import { createHTTPGetResource as le, createHTTPPostResource as pe, createHTTPPutResource as ce, createHTTPDeleteResource as me } from "lkt-http-client";
const ve = /* @__PURE__ */ M({
  __name: "LktAdminMenuButton",
  setup(s) {
    const e = A("adminMenu"), u = A("lktAdminEnabled");
    return (a, o) => {
      const i = D("lkt-button");
      return n(u) ? (T(), F(i, L({
        key: 0,
        checked: n(e),
        "onUpdate:checked": o[0] || (o[0] = (p) => ue(e) ? e.value = p : null)
      }, {
        type: n(B).HiddenSwitch,
        icon: "lkt-icn-lkt",
        class: "lkt-admin-button"
      }), null, 16, ["checked"])) : H("", !0);
    };
  }
}), ye = /* @__PURE__ */ M({
  __name: "LktAdminMenu",
  setup(s) {
    const e = A("adminMenu"), u = g(() => {
      let a = [];
      return Z.hasDefaultPageEnabled() && a.push({
        key: "web-pages",
        type: K.Entry,
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
      }), Z.getPages().forEach((o) => {
        a.push({
          key: o.code,
          type: K.Entry,
          icon: "lkt-icn-webpage",
          anchor: {
            to: `/admin/web-pages/${o.id}`,
            text: o.label,
            events: {
              click: () => {
                e.value = !1;
              }
            }
          }
        });
      }), G.getItems().forEach((o) => {
        o.many !== !1 && a.push({
          key: o.code,
          type: K.Entry,
          icon: o.icon,
          anchor: {
            to: `/admin/web-items/${o.code}`,
            text: o.labelMany,
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
          type: K.Entry,
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
    return (a, o) => {
      const i = D("lkt-menu");
      return T(), I("div", {
        class: se(["lkt-admin-menu", n(e) ? "is-opened" : ""])
      }, [
        Q(i, {
          "model-value": u.value,
          onClickOutside: o[0] || (o[0] = (p) => e.value = !1)
        }, null, 8, ["model-value"])
      ], 2);
    };
  }
}), ke = { class: "lkt-admin-spa lkt-admin-pages" }, fe = /* @__PURE__ */ M({
  __name: "LktAdminPagesSpa",
  setup(s) {
    const e = q(), u = r(e.params.type), a = r(e.params.id), o = r({
      name: "",
      type: u.value
    }), i = r([]), p = r(null);
    N(e, (t) => {
      u.value = e.params.type, a.value = e.params.id, o.value.type = u.value;
    }, { flush: "pre", immediate: !0, deep: !0 });
    let d = A("lktAppSize");
    d || (d = r(x.MD));
    const m = g(() => [
      {
        type: C.Field,
        key: "name",
        label: "__:common.column.name",
        isForAccordionHeader: !0,
        field: {
          type: b.Text,
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
            to: (t) => `/admin/web-pages/${u.value}/${t.id}`
          }
        }
      }
    ]), l = g(() => {
      let t = "Web Pages";
      return Z.getPages().forEach((c) => {
        if (c.id == u.value) {
          t = c.label ?? "Web Pages";
          return;
        }
      }), t;
    });
    return (t, c) => {
      const v = D("lkt-table");
      return T(), I("section", ke, [
        Q(v, L({
          ref_key: "spaRef",
          ref: p,
          modelValue: i.value,
          "onUpdate:modelValue": c[0] || (c[0] = (k) => i.value = k)
        }, {
          type: n(d) < n(x).MD ? n($).Accordion : n($).Table,
          rowDisplayType: n(ee).PreferColumns,
          title: l.value,
          titleTag: "h1",
          titleIcon: "lkt-icn-webpage",
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          columns: m.value,
          paginator: {
            resource: "ls-web-pages-type",
            resourceData: o.value
          },
          createButton: {
            icon: "lkt-icn-more",
            type: n(B).Anchor,
            anchor: {
              to: `/admin/web-pages/${u.value}/0`
            }
          },
          itemsContainerClass: n(d) < n(x).MD ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          }
        }), null, 16, ["modelValue"])
      ]);
    };
  }
}), ge = { class: "lkt-admin-spa" }, be = /* @__PURE__ */ M({
  __name: "LktAdminPageSpa",
  setup(s) {
    const e = q(), u = ae(), a = r(e.params.type), o = r(e.params.id);
    N(e, (d) => {
      a.value = e.params.type, o.value = e.params.id;
    }, { flush: "pre", immediate: !0, deep: !0 });
    const i = r({}), p = (d) => `/admin/web-pages/${a.value}/${d}`;
    return (d, m) => {
      const l = D("lkt-web-page");
      return T(), I("section", ge, [
        Q(l, {
          modelValue: i.value,
          "onUpdate:modelValue": m[0] || (m[0] = (t) => i.value = t),
          "crud-config": {
            readResource: "r-web-page",
            readData: {
              id: o.value
            },
            mode: o.value > 0 ? n(U).Update : n(U).Create,
            buttonNavVisibility: n(te).Always,
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
                  n(u).back();
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
}), _e = {
  key: 0,
  class: "lkt-admin-spa lkt-admin-translations"
}, he = /* @__PURE__ */ M({
  __name: "LktAdminTranslationsSpa",
  setup(s) {
    const e = A("lktAdminEnabled");
    e.value || (window.location.href = "/");
    const u = q(), a = r(u.params.id), o = r({
      property: "",
      value: ""
    }), i = r([]), p = r(null);
    N(u, (c) => {
      a.value = u.params.id;
    }, { flush: "pre", immediate: !0, deep: !0 });
    let d = A("lktAppSize");
    d || (d = r(x.MD));
    const m = g(() => [
      {
        type: C.Field,
        key: "property",
        label: "Property",
        isForAccordionHeader: !0,
        field: {
          type: b.Text,
          icon: "lkt-icn-lang-picker"
        }
      },
      {
        type: C.Field,
        key: "type",
        label: "Type",
        ensureFieldLabel: d.value < x.MD,
        field: {
          type: b.Select,
          options: [b.Text, b.Textarea]
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
            to: (c) => `/admin/i18n/${c.id}`
          }
        }
      }
    ]), l = g(() => "Translations"), t = g(() => ({
      header: {
        text: "Filters",
        tag: "h2"
      },
      items: [
        j.mkFieldItemConfig("property", {
          type: b.Text,
          label: "Property"
        })
        // FormInstance.mkFieldItemConfig('value', {
        //     type: FieldType.Text,
        //     label: 'Value',
        // }),
      ]
    }));
    return (c, v) => {
      const k = D("lkt-table");
      return n(e) ? (T(), I("section", _e, [
        Q(k, L({
          ref_key: "spaRef",
          ref: p,
          modelValue: i.value,
          "onUpdate:modelValue": v[0] || (v[0] = (R) => i.value = R)
        }, {
          type: n(d) < n(x).MD ? n($).Accordion : n($).Table,
          rowDisplayType: n(ee).PreferColumns,
          header: {
            text: l.value,
            icon: "lkt-icn-lang-picker",
            tag: "h1"
          },
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          columns: m.value,
          paginator: {
            resource: "ls-lkt-i18n",
            resourceData: o.value
          },
          createButton: {
            icon: "lkt-icn-more",
            text: "Add translation",
            type: n(B).Anchor,
            anchor: {
              to: "/admin/i18n/new"
            }
          },
          itemsContainerClass: n(d) < n(x).MD ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          },
          filtersForm: t.value
        }), null, 16, ["modelValue"])
      ])) : H("", !0);
    };
  }
}), Te = {
  key: 0,
  class: "lkt-admin-spa"
}, we = /* @__PURE__ */ M({
  __name: "LktAdminTranslationSpa",
  props: {
    onCreateTo: {}
  },
  setup(s) {
    const e = s;
    console.log("i18n props: ", e);
    const u = A("lktAdminEnabled");
    u.value || (window.location.href = "/");
    const a = q(), o = ae(), i = r(parseInt(a.params.id)), p = r(!1), d = r(!1), m = r(["create", "switch-edit-mode"]), l = r({
      property: "",
      type: b.Text,
      value: "",
      valueData: {},
      children: [],
      ...a.query
    });
    N(a, (v) => {
      i.value = parseInt(a.params.id), d.value = !1, p.value = !1, l.value = {
        property: "",
        type: b.Text,
        value: "",
        valueData: {},
        children: [],
        ...a.query
      }, m.value = ["create", "switch-edit-mode"], V(() => d.value = !0);
    }, { flush: "pre", immediate: !0, deep: !0 });
    const t = g(() => (v) => ({
      items: [
        j.mkFieldItemConfig("property", {
          type: b.Text,
          label: "Property",
          mandatory: !0,
          validation: {
            trigger: Y.Blur
          }
        }),
        j.mkFieldItemConfig("type", {
          type: b.Select,
          mandatory: !0,
          label: "Type",
          options: [b.Text, b.Textarea, "many"],
          readMode: l.value.type === "many" && l.value.id > 0,
          validation: {
            trigger: Y.Blur
          }
        }),
        j.mkFieldItemConfig("valueData", {
          type: l.value.type,
          mandatory: !0,
          canI18n: !0,
          label: "Value",
          validation: {
            trigger: Y.Blur
          }
        }, {}, { canRender: l.value.type !== "many" }),
        j.mkFieldItemConfig("children", {
          type: b.Table,
          multiple: !0,
          options: "prop:children",
          optionValueType: "option",
          searchable: !1,
          multipleDisplay: ne.Table,
          multipleDisplayEdition: ne.Table,
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
              type: $.Table,
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
                    type: b.Text,
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
              type: de.RouterLink,
              to: {
                path: "/admin/i18n/new",
                query: {
                  parentId: v.item.id,
                  onCreateTo: `/admin/i18n/${v.item.id}`
                }
              }
            }
          }
        }, {}, { canRender: l.value.id > 0 && l.value.type === "many" })
      ]
    })), c = g(() => ({
      header: {
        text: i.value > 0 ? l.value.property : "New translation",
        icon: "lkt-icn-lang-picker",
        tag: "h1"
      },
      readResource: "r-i18n",
      readData: {
        id: i.value
      },
      mode: i.value > 0 ? U.Update : U.Create,
      form: t.value,
      buttonNavVisibility: te.Always,
      createButton: {
        resource: "mk-i18n",
        icon: "lkt-icn-save",
        text: "Create",
        events: {
          click: (v) => {
            var k;
            e.onCreateTo ? o.push({
              path: e.onCreateTo,
              replace: !0
            }) : o.push({
              path: `/admin/i18n/${(k = v.httpResponse) == null ? void 0 : k.autoReloadId}`,
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
            o.push({
              path: "/admin/i18n/new",
              query: {
                keepCreating: re()
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
        resourceData: { id: i.value },
        icon: "lkt-icn-trash",
        text: "Remove",
        events: {
          click: () => {
            o.back();
          }
        }
      }
      // redirectOnCreate,
    }));
    return (v, k) => {
      const R = D("lkt-item-crud"), _ = D("lkt-loader");
      return n(u) ? (T(), I("section", Te, [
        d.value ? (T(), F(R, L({
          key: 0,
          modelValue: l.value,
          "onUpdate:modelValue": k[0] || (k[0] = (h) => l.value = h),
          editing: p.value,
          "onUpdate:editing": k[1] || (k[1] = (h) => p.value = h),
          perms: m.value,
          "onUpdate:perms": k[2] || (k[2] = (h) => m.value = h)
        }, c.value), null, 16, ["modelValue", "editing", "perms"])) : (T(), F(_, { key: 1 }))
      ])) : H("", !0);
    };
  }
}), xe = {
  key: 0,
  class: "lkt-admin-spa lkt-web-items"
}, Ce = /* @__PURE__ */ M({
  __name: "LktWebItemsSpa",
  setup(s) {
    const e = A("lktAdminEnabled");
    e.value || (window.location.href = "/");
    const u = q(), a = r(u.params.type), o = r(u.params.id), i = r({
      name: "",
      type: a.value
    }), p = r([]), d = r(null), m = r(!1), l = r(G.getWebItemSettings(a.value)), t = () => {
      typeof l.value.appHeaderMany == "function" ? J(l.value.appHeaderMany({ item: item.value })) : typeof l.value.appHeaderMany == "object" && Object.keys(l.value.appHeaderMany).length > 0 && J(l.value.appHeaderMany);
    };
    N(u, (_) => {
      a.value = u.params.type, o.value = u.params.id, p.value.splice(0, p.value.length), m.value = !1, i.value.type = a.value, l.value = G.getWebItemSettings(a.value), V(() => {
        t(), V(() => m.value = !0);
      });
    }, { flush: "pre", immediate: !0, deep: !0 });
    let c = A("lktAppSize");
    c || (c = r(x.MD));
    const v = g(() => l.value.many.columns ? [
      ...l.value.many.columns,
      {
        type: C.Button,
        key: "details",
        label: "Details",
        button: {
          type: B.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (_) => `/admin/web-items/${a.value}/${_.id}`
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
          type: b.Text,
          icon: l.value.icon
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
            to: (_) => `/admin/web-items/${a.value}/${_.id}`
          }
        }
      }
    ]), k = g(() => typeof l.value.appHeaderMany < "u" ? {} : {
      text: l.value.labelMany ?? "",
      icon: l.value.icon,
      tag: "h1"
    }), R = g(() => {
      var _, h, P;
      return ((h = (_ = l.value) == null ? void 0 : _.many) == null ? void 0 : h.createButton) === !1 ? !1 : {
        icon: "lkt-icn-more",
        text: "Add web item",
        type: B.Anchor,
        anchor: {
          to: `/admin/web-items/${a.value}/new`
        },
        //@ts-ignore
        ...(P = l.value.many) == null ? void 0 : P.createButton
      };
    });
    return oe(() => {
      m.value = !0;
    }), (_, h) => {
      const P = D("lkt-table");
      return n(e) ? (T(), I("section", xe, [
        m.value ? (T(), F(P, L({
          key: 0,
          ref_key: "spaRef",
          ref: d,
          modelValue: p.value,
          "onUpdate:modelValue": h[0] || (h[0] = (X) => p.value = X)
        }, {
          type: n(c) < n(x).MD ? n($).Accordion : n($).Table,
          rowDisplayType: n(ee).PreferColumns,
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          paginator: {
            resource: "ls-web-items",
            resourceData: i.value
          },
          itemsContainerClass: n(c) < n(x).MD ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          },
          ...l.value.many,
          columns: v.value,
          header: k.value,
          createButton: R.value
        }), null, 16, ["modelValue"])) : H("", !0)
      ])) : H("", !0);
    };
  }
}), Be = {
  key: 0,
  class: "lkt-admin-spa lkt-web-item-spa"
}, Ae = /* @__PURE__ */ M({
  __name: "LktWebItemSpa",
  props: {
    id: {},
    type: {},
    onCreateTo: {}
  },
  setup(s) {
    const e = A("lktAdminEnabled"), u = s, a = q(), o = ae(), i = r(a.params.type), p = r(a.params.id), d = r(!1), m = r(!1), l = r(["create"]), t = r(G.getWebItemSettings(i.value)), c = (y) => typeof t.value.itemGenerator == "function" ? t.value.itemGenerator(y) : {
      ...y
    }, v = r(c(a.query)), k = () => {
      typeof t.value.appHeaderSingle == "function" ? J(t.value.appHeaderSingle({ item: v.value })) : typeof t.value.appHeaderSingle == "object" && Object.keys(t.value.appHeaderSingle).length > 0 && J(t.value.appHeaderSingle);
    };
    N(a, (y) => {
      i.value = a.params.type, p.value = a.params.id, d.value = !1, m.value = !1, l.value = ["create"], t.value = G.getWebItemSettings(i.value), V(() => {
        v.value = c(a.query), V(() => {
          k(), V(() => d.value = !0);
        });
      });
    }, { flush: "pre", immediate: !0, deep: !0 });
    const R = g(() => typeof t.value.appHeaderSingle < "u" ? {} : {
      text: t.value.labelSingle ?? "",
      icon: t.value.icon,
      tag: "h1"
    }), _ = g(() => {
      var y, f;
      return ((f = (y = t.value) == null ? void 0 : y.single) == null ? void 0 : f.createButton) === !1 ? !1 : {
        resource: "mk-web-item",
        icon: "lkt-icn-save",
        text: "Create",
        ...t.value.single.createButton,
        events: {
          click: (W) => {
            var E, w, z, O;
            typeof ((w = (E = t.value.single.createButton) == null ? void 0 : E.events) == null ? void 0 : w.click) == "function" && ((O = (z = t.value.single.createButton) == null ? void 0 : z.events) == null || O.click(W)), u.onCreateTo && o.push({
              path: u.onCreateTo,
              replace: !0
            });
          }
        }
      };
    }), h = g(() => {
      var y, f;
      return ((f = (y = t.value) == null ? void 0 : y.single) == null ? void 0 : f.createButton) === !1 ? !1 : {
        resource: "mk-web-item",
        icon: "lkt-icn-save",
        text: "Create",
        ...t.value.single.createAndNewButton,
        events: {
          click: (W) => {
            var E, w, z, O;
            typeof ((w = (E = t.value.single.createAndNewButton) == null ? void 0 : E.events) == null ? void 0 : w.click) == "function" && ((O = (z = t.value.single.createAndNewButton) == null ? void 0 : z.events) == null || O.click(W)), o.push({
              path: `/admin/web-items/${i.value}/new`,
              query: {
                keepCreating: re()
              },
              replace: !0
            });
          }
        }
      };
    }), P = g(() => {
      var y, f;
      return ((f = (y = t.value) == null ? void 0 : y.single) == null ? void 0 : f.updateButton) === !1 ? !1 : {
        resource: "up-web-item",
        icon: "lkt-icn-save",
        text: "Update",
        ...t.value.single.updateButton
      };
    }), X = g(() => {
      var y, f;
      return ((f = (y = t.value) == null ? void 0 : y.single) == null ? void 0 : f.dropButton) === !1 ? !1 : {
        resource: "rm-web-item",
        resourceData: { id: p },
        icon: "lkt-icn-trash",
        text: "Remove",
        events: {
          click: () => {
            o.back();
          }
        },
        ...t.value.single.dropButton
      };
    }), ie = (y) => `/admin/web-items/${i.value}/${y}`;
    return oe(() => {
      V(() => {
        k();
      });
    }), (y, f) => {
      const W = D("lkt-item-crud"), E = D("lkt-loader");
      return n(e) ? (T(), I("section", Be, [
        d.value ? (T(), F(W, L({
          key: 0,
          modelValue: v.value,
          "onUpdate:modelValue": f[0] || (f[0] = (w) => v.value = w),
          editing: m.value,
          "onUpdate:editing": f[1] || (f[1] = (w) => m.value = w),
          perms: l.value,
          "onUpdate:perms": f[2] || (f[2] = (w) => l.value = w)
        }, {
          readResource: "r-web-item",
          readData: { id: p.value },
          mode: p.value > 0 ? n(U).Update : n(U).Create,
          buttonNavVisibility: n(te).Always,
          redirectOnCreate: ie,
          ...t.value.single,
          header: R.value,
          createButton: _.value,
          createAndNewButton: h.value,
          updateButton: P.value,
          dropButton: X.value
        }), null, 16, ["modelValue", "editing", "perms"])) : (T(), F(E, { key: 1 }))
      ])) : H("", !0);
    };
  }
}), Ie = () => {
  le({
    url: "/translations",
    name: "ls-lkt-i18n",
    params: { property: { default: void 0 }, value: { default: void 0 } },
    digToPerms: "perms",
    digToData: "results",
    mapData: (s) => s
  }), le({
    url: "/translation/{id}",
    name: "r-i18n",
    params: { id: { default: void 0 } },
    digToPerms: "perms",
    digToData: "item",
    mapData: (s) => s
  }), pe({
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
  }), ce({
    url: "/translation/{id}",
    name: "up-i18n",
    params: {
      id: { default: void 0 },
      type: { default: void 0 },
      property: { default: void 0 },
      valueData: { default: void 0 }
    },
    digToPerms: "perms"
  }), me({
    url: "/translation/{id}",
    name: "rm-i18n",
    params: {
      id: { default: void 0 }
    },
    digToPerms: "perms",
    digToData: "item"
  });
}, Pe = {
  install: (s) => {
    s.component("lkt-admin-menu-button") === void 0 && s.component("lkt-admin-menu-button", ve), s.component("lkt-admin-menu") === void 0 && s.component("lkt-admin-menu", ye);
  }
}, S = (s, e) => {
}, Se = (s) => {
  s.addRoute({ path: "/admin/web-pages/:type", name: "lkt-admin-pages", component: fe, beforeEnter: S }), s.addRoute({ path: "/admin/web-pages/:type/:id", name: "lkt-admin-page", component: be, beforeEnter: S }), s.addRoute({ path: "/admin/web-items/:type", name: "lkt-web-items", component: Ce, beforeEnter: S }), s.addRoute({ path: "/admin/web-items/:type/:id", name: "lkt-web-item", component: Ae, beforeEnter: S, props: (e) => ({
    id: e.params.id,
    type: e.params.type,
    onCreateTo: e.query.onCreateTo ?? ""
  }) }), s.addRoute({ path: "/admin/i18n", name: "lkt-admin-translations", component: he, beforeEnter: S }), s.addRoute({ path: "/admin/i18n/:id", name: "lkt-admin-translation", component: we, beforeEnter: S, props: (e) => ({
    onCreateTo: e.query.onCreateTo ?? ""
  }) });
};
export {
  Pe as default,
  Ie as setupAdminTranslationsHttp,
  Se as setupLktVueAdminRoutes
};

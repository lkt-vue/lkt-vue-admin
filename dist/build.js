import { defineComponent as E, inject as M, resolveComponent as R, createBlock as L, createCommentVNode as N, unref as n, openBlock as _, mergeProps as j, isRef as de, computed as g, createElementBlock as U, normalizeClass as pe, createVNode as Y, ref as o, watch as z, nextTick as $, onMounted as ue } from "vue";
import { ButtonType as A, WebPageController as ee, MenuEntryType as X, WebItemsController as P, AppSize as B, FieldType as T, ColumnType as D, TableRowType as te, TableType as F, ItemCrudButtonNavVisibility as ae, ItemCrudMode as W, FormInstance as Q, FieldAutoValidationTrigger as Z, AnchorType as ce, MultipleOptionsDisplay as le } from "lkt-vue-kernel";
import { useRoute as O, useRouter as ne } from "vue-router";
import { updateMainHeader as S } from "lkt-vue-app";
import { time as se } from "lkt-date-tools";
import { createHTTPGetResource as oe, createHTTPPostResource as me, createHTTPPutResource as ve, createHTTPDeleteResource as ye } from "lkt-http-client";
const fe = /* @__PURE__ */ E({
  __name: "LktAdminMenuButton",
  setup(u) {
    const t = M("adminMenu"), s = M("lktAdminEnabled");
    return (a, r) => {
      const d = R("lkt-button");
      return n(s) ? (_(), L(d, j({
        key: 0,
        checked: n(t),
        "onUpdate:checked": r[0] || (r[0] = (y) => de(t) ? t.value = y : null)
      }, {
        type: n(A).HiddenSwitch,
        icon: "lkt-icn-lkt",
        class: "lkt-admin-button"
      }), null, 16, ["checked"])) : N("", !0);
    };
  }
}), ke = /* @__PURE__ */ E({
  __name: "LktAdminMenu",
  setup(u) {
    const t = M("adminMenu"), s = g(() => {
      let a = [];
      return ee.hasDefaultPageEnabled() && a.push({
        key: "web-pages",
        type: X.Entry,
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
      }), ee.getPages().forEach((r) => {
        a.push({
          key: r.code,
          type: X.Entry,
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
      }), P.getItems().forEach((r) => {
        r.many !== !1 && a.push({
          key: r.code,
          type: X.Entry,
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
          type: X.Entry,
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
      const d = R("lkt-menu");
      return _(), U("div", {
        class: pe(["lkt-admin-menu", n(t) ? "is-opened" : ""])
      }, [
        Y(d, {
          "model-value": s.value,
          onClickOutside: r[0] || (r[0] = (y) => t.value = !1)
        }, null, 8, ["model-value"])
      ], 2);
    };
  }
}), ge = { class: "lkt-admin-spa lkt-admin-pages" }, be = /* @__PURE__ */ E({
  __name: "LktAdminPagesSpa",
  setup(u) {
    const t = O(), s = o(t.params.type), a = o(t.params.id), r = o({
      name: "",
      type: s.value
    }), d = o([]), y = o(null);
    z(t, (e) => {
      s.value = t.params.type, a.value = t.params.id, r.value.type = s.value;
    }, { flush: "pre", immediate: !0, deep: !0 });
    let k = M("lktAppSize");
    k || (k = o(B.MD));
    const c = g(() => [
      {
        type: D.Field,
        key: "name",
        label: "__:common.column.name",
        isForAccordionHeader: !0,
        field: {
          type: T.Text,
          icon: "lkt-icn-webpage"
        }
      },
      {
        type: D.Button,
        key: "details",
        label: "Details",
        button: {
          type: A.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (e) => `/admin/web-pages/${s.value}/${e.id}`
          }
        }
      }
    ]), l = g(() => {
      let e = "Web Pages";
      return ee.getPages().forEach((m) => {
        if (m.id == s.value) {
          e = m.label ?? "Web Pages";
          return;
        }
      }), e;
    });
    return (e, m) => {
      const w = R("lkt-table");
      return _(), U("section", ge, [
        Y(w, j({
          ref_key: "spaRef",
          ref: y,
          modelValue: d.value,
          "onUpdate:modelValue": m[0] || (m[0] = (C) => d.value = C)
        }, {
          type: n(k) < n(B).MD ? n(F).Accordion : n(F).Table,
          rowDisplayType: n(te).PreferColumns,
          title: l.value,
          titleTag: "h1",
          titleIcon: "lkt-icn-webpage",
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          columns: c.value,
          paginator: {
            resource: "ls-web-pages-type",
            resourceData: r.value
          },
          createButton: {
            icon: "lkt-icn-more",
            type: n(A).Anchor,
            anchor: {
              to: `/admin/web-pages/${s.value}/0`
            }
          },
          itemsContainerClass: n(k) < n(B).MD ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          }
        }), null, 16, ["modelValue"])
      ]);
    };
  }
}), he = { class: "lkt-admin-spa" }, _e = /* @__PURE__ */ E({
  __name: "LktAdminPageSpa",
  setup(u) {
    const t = O(), s = ne(), a = o(t.params.type), r = o(t.params.id);
    z(t, (k) => {
      a.value = t.params.type, r.value = t.params.id;
    }, { flush: "pre", immediate: !0, deep: !0 });
    const d = o({}), y = (k) => `/admin/web-pages/${a.value}/${k}`;
    return (k, c) => {
      const l = R("lkt-web-page");
      return _(), U("section", he, [
        Y(l, {
          modelValue: d.value,
          "onUpdate:modelValue": c[0] || (c[0] = (e) => d.value = e),
          "crud-config": {
            readResource: "r-web-page",
            readData: {
              id: r.value
            },
            mode: r.value > 0 ? n(W).Update : n(W).Create,
            buttonNavVisibility: n(ae).Always,
            editing: !0,
            perms: ["update"],
            createButton: {
              resource: "mk-web-page",
              resourceData: { ...d.value, type: a.value },
              text: "Create",
              disabled: !1
            },
            updateButton: {
              resource: "up-web-page",
              resourceData: d.value,
              text: "Update",
              disabled: !1
            },
            dropButton: {
              resource: "rm-web-page",
              resourceData: d.value,
              text: "Remove",
              disabled: !1,
              events: {
                click: () => {
                  n(s).back();
                }
              }
            },
            redirectOnCreate: y
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
}), we = {
  key: 0,
  class: "lkt-admin-spa lkt-admin-translations"
}, re = /* @__PURE__ */ E({
  __name: "LktAdminTranslationsSpa",
  props: {
    many: { type: Boolean, default: !1 }
  },
  setup(u) {
    const t = M("lktAdminEnabled");
    t.value || (window.location.href = "/");
    const s = u, a = O(), r = o(a.params.id), d = o({
      property: "",
      value: "",
      type: s.many ? "many" : ""
    }), y = o([]), k = o(null), c = o(P.getWebItemSettings(s.many ? "lkt-many-i18n" : "lkt-i18n")), l = g(() => s.many ? "many-i18n" : "i18n"), e = () => {
      var f, p, i;
      typeof c.value > "u" || (typeof ((f = c.value) == null ? void 0 : f.appHeaderMany) == "function" ? S(c.value.appHeaderMany({ item: item.value })) : typeof ((p = c.value) == null ? void 0 : p.appHeaderMany) == "object" && Object.keys((i = c.value) == null ? void 0 : i.appHeaderMany).length > 0 && S(c.value.appHeaderMany));
    };
    z(a, (f) => {
      r.value = a.params.id, $(() => {
        e();
      });
    }, { flush: "pre", immediate: !0, deep: !0 });
    let m = M("lktAppSize");
    m || (m = o(B.MD));
    const w = g(() => [
      {
        type: D.Field,
        key: "property",
        label: "Property",
        isForAccordionHeader: !0,
        field: {
          type: T.Text,
          icon: "lkt-icn-lang-picker"
        }
      },
      {
        type: D.Field,
        key: "value",
        label: "Value",
        ensureFieldLabel: m.value < B.MD,
        field: {
          type: "prop:type",
          readModeConfig: {
            textMaxLength: 10
          }
        }
      },
      {
        type: D.Button,
        key: "details",
        label: "Details",
        button: {
          type: A.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (f) => `/admin/${l.value}/${f.id}`
          }
        }
      }
    ]), C = g(() => {
      var p, i, h;
      return typeof ((p = c.value) == null ? void 0 : p.appHeaderMany) < "u" ? {} : {
        text: ((i = c.value) == null ? void 0 : i.labelMany) ?? "",
        icon: (h = c.value) == null ? void 0 : h.icon,
        tag: "h1"
      };
    }), V = g(() => ({
      header: {
        text: "Filters",
        tag: "h2"
      },
      items: [
        Q.mkFieldItemConfig("property", {
          type: T.Text,
          label: "Property"
        })
        // FormInstance.mkFieldItemConfig('value', {
        //     type: FieldType.Text,
        //     label: 'Value',
        // }),
      ]
    }));
    return (f, p) => {
      const i = R("lkt-table");
      return n(t) ? (_(), U("section", we, [
        Y(i, j({
          ref_key: "spaRef",
          ref: k,
          modelValue: y.value,
          "onUpdate:modelValue": p[0] || (p[0] = (h) => y.value = h)
        }, {
          type: n(m) < n(B).MD ? n(F).Accordion : n(F).Table,
          rowDisplayType: n(te).PreferColumns,
          header: C.value,
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          columns: w.value,
          paginator: {
            resource: "ls-lkt-i18n",
            resourceData: d.value
          },
          createButton: {
            icon: "lkt-icn-more",
            text: "Add translation",
            type: n(A).Anchor,
            anchor: {
              to: `/admin/${l.value}/new`
            }
          },
          itemsContainerClass: n(m) < n(B).MD ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          },
          filtersForm: V.value
        }), null, 16, ["modelValue"])
      ])) : N("", !0);
    };
  }
}), Te = {
  key: 0,
  class: "lkt-admin-spa"
}, ie = /* @__PURE__ */ E({
  __name: "LktAdminTranslationSpa",
  props: {
    onCreateTo: {},
    many: { type: Boolean, default: !1 }
  },
  setup(u) {
    const t = u, s = M("lktAdminEnabled");
    s.value || (window.location.href = "/");
    const a = O(), r = ne(), d = o(parseInt(a.params.id)), y = o(!1), k = o(!1), c = o(["create", "switch-edit-mode"]), l = o(P.getWebItemSettings(t.many ? "lkt-many-i18n" : "lkt-i18n")), e = o({
      property: "",
      type: T.Text,
      value: "",
      valueData: {},
      children: [],
      ...a.query
    }), m = g(() => t.many ? "many-i18n" : "i18n"), w = () => {
      var p, i, h;
      typeof l.value > "u" || (typeof ((p = l.value) == null ? void 0 : p.appHeaderSingle) == "function" ? S(l.value.appHeaderSingle({ item: e.value })) : typeof ((i = l.value) == null ? void 0 : i.appHeaderSingle) == "object" && Object.keys((h = l.value) == null ? void 0 : h.appHeaderSingle).length > 0 && S(l.value.appHeaderSingle));
    };
    z(a, (p) => {
      d.value = parseInt(a.params.id), k.value = !1, y.value = !1, e.value = {
        property: "",
        type: T.Text,
        value: "",
        valueData: {},
        children: [],
        ...a.query
      }, c.value = ["create", "switch-edit-mode"], $(() => {
        w(), $(() => k.value = !0);
      });
    }, { flush: "pre", immediate: !0, deep: !0 });
    const C = g(() => (p) => ({
      items: [
        Q.mkFieldItemConfig("property", {
          type: T.Text,
          label: "Property",
          mandatory: !0,
          validation: {
            trigger: Z.Blur
          }
        }),
        Q.mkFieldItemConfig("type", {
          type: T.Select,
          mandatory: !0,
          label: "Type",
          options: [T.Text, T.Textarea, "many"],
          readMode: e.value.type === "many" && e.value.id > 0,
          validation: {
            trigger: Z.Blur
          }
        }),
        Q.mkFieldItemConfig("valueData", {
          type: e.value.type,
          mandatory: !0,
          canI18n: !0,
          label: "Value",
          validation: {
            trigger: Z.Blur
          }
        }, {}, { canRender: e.value.type !== "many" }),
        Q.mkFieldItemConfig("children", {
          type: T.Table,
          multiple: !0,
          options: "prop:children",
          optionValueType: "option",
          searchable: !1,
          multipleDisplay: le.Table,
          multipleDisplayEdition: le.Table,
          tooltipConfig: {
            compensateGlobalContainers: !1
          },
          optionsConfig: {
            icon: "lkt-icn-edit",
            anchor: {
              to: `/admin/${m.value}/feed{value}`
            },
            zeroMeansEmpty: !0,
            table: {
              type: F.Table,
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
                  type: D.Field,
                  field: {
                    type: T.Text,
                    icon: "lkt-icn-lang-picker"
                  }
                },
                {
                  key: "details",
                  label: "Details",
                  type: D.Button,
                  button: {
                    type: A.Anchor,
                    text: "__:common.button.details",
                    class: "lkt-button--info",
                    icon: "lkt-icn-expand",
                    anchor: {
                      to: `/admin/${m.value}/feed{value}`
                    }
                  }
                }
              ]
            }
          },
          createButton: {
            type: A.Anchor,
            anchor: {
              type: ce.RouterLink,
              to: {
                path: `/admin/${m.value}/new`,
                query: {
                  parentId: p.item.id,
                  onCreateTo: `/admin/${m.value}/${p.item.id}`
                }
              }
            }
          }
        }, {}, { canRender: e.value.id > 0 && e.value.type === "many" })
      ]
    })), V = g(() => {
      var i, h, q;
      return typeof ((i = l.value) == null ? void 0 : i.appHeaderSingle) < "u" ? {} : {
        text: ((h = l.value) == null ? void 0 : h.labelSingle) ?? "",
        icon: ((q = l.value) == null ? void 0 : q.icon) ?? "lkt-icn-lang-picker",
        tag: "h1"
      };
    }), f = g(() => ({
      // header: {
      //     text: id.value > 0 ? item.value.property : 'New translation',
      //     icon: 'lkt-icn-lang-picker',
      //     tag: 'h1'
      // },
      header: V.value,
      readResource: "r-i18n",
      readData: {
        id: d.value,
        type: t.many ? "many" : void 0
      },
      mode: d.value > 0 ? W.Update : W.Create,
      form: C.value,
      buttonNavVisibility: ae.Always,
      createButton: {
        resource: "mk-i18n",
        icon: "lkt-icn-save",
        text: "Create",
        events: {
          click: (p) => {
            var i;
            t.onCreateTo ? r.push({
              path: t.onCreateTo,
              replace: !0
            }) : r.push({
              path: `/admin/${m.value}/${(i = p.httpResponse) == null ? void 0 : i.autoReloadId}`,
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
          click: (p) => {
            r.push({
              path: `/admin/${m.value}/new`,
              query: {
                keepCreating: se()
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
        resourceData: { id: d.value },
        icon: "lkt-icn-trash",
        text: "Remove",
        events: {
          click: () => {
            r.back();
          }
        }
      }
      // redirectOnCreate,
    }));
    return (p, i) => {
      const h = R("lkt-item-crud"), q = R("lkt-loader");
      return n(s) ? (_(), U("section", Te, [
        k.value ? (_(), L(h, j({
          key: 0,
          modelValue: e.value,
          "onUpdate:modelValue": i[0] || (i[0] = (v) => e.value = v),
          editing: y.value,
          "onUpdate:editing": i[1] || (i[1] = (v) => y.value = v),
          perms: c.value,
          "onUpdate:perms": i[2] || (i[2] = (v) => c.value = v)
        }, f.value), null, 16, ["modelValue", "editing", "perms"])) : (_(), L(q, { key: 1 }))
      ])) : N("", !0);
    };
  }
}), xe = {
  key: 0,
  class: "lkt-admin-spa lkt-web-items"
}, Ce = /* @__PURE__ */ E({
  __name: "LktWebItemsSpa",
  setup(u) {
    const t = M("lktAdminEnabled");
    t.value || (window.location.href = "/");
    const s = O(), a = o(s.params.type), r = o(s.params.id), d = o({
      name: "",
      type: a.value
    }), y = o([]), k = o(null), c = o(!1), l = o(P.getWebItemSettings(a.value)), e = () => {
      typeof l.value.appHeaderMany == "function" ? S(l.value.appHeaderMany({ item: item.value })) : typeof l.value.appHeaderMany == "object" && Object.keys(l.value.appHeaderMany).length > 0 && S(l.value.appHeaderMany);
    };
    z(s, (f) => {
      a.value = s.params.type, r.value = s.params.id, y.value.splice(0, y.value.length), c.value = !1, d.value.type = a.value, l.value = P.getWebItemSettings(a.value), $(() => {
        e(), $(() => c.value = !0);
      });
    }, { flush: "pre", immediate: !0, deep: !0 });
    let m = M("lktAppSize");
    m || (m = o(B.MD));
    const w = g(() => l.value.many.columns ? [
      ...l.value.many.columns,
      {
        type: D.Button,
        key: "details",
        label: "Details",
        button: {
          type: A.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (f) => `/admin/web-items/${a.value}/${f.id}`
          }
        }
      }
    ] : [
      {
        type: D.Field,
        key: "name",
        label: "Name",
        isForAccordionHeader: !0,
        field: {
          type: T.Text,
          icon: l.value.icon
        }
      },
      {
        type: D.Button,
        key: "details",
        label: "Details",
        button: {
          type: A.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (f) => `/admin/web-items/${a.value}/${f.id}`
          }
        }
      }
    ]), C = g(() => typeof l.value.appHeaderMany < "u" ? {} : {
      text: l.value.labelMany ?? "",
      icon: l.value.icon,
      tag: "h1"
    }), V = g(() => {
      var f, p, i;
      return ((p = (f = l.value) == null ? void 0 : f.many) == null ? void 0 : p.createButton) === !1 ? !1 : {
        icon: "lkt-icn-more",
        text: "Add web item",
        type: A.Anchor,
        anchor: {
          to: `/admin/web-items/${a.value}/new`
        },
        //@ts-ignore
        ...(i = l.value.many) == null ? void 0 : i.createButton
      };
    });
    return ue(() => {
      c.value = !0;
    }), (f, p) => {
      const i = R("lkt-table");
      return n(t) ? (_(), U("section", xe, [
        c.value ? (_(), L(i, j({
          key: 0,
          ref_key: "spaRef",
          ref: k,
          modelValue: y.value,
          "onUpdate:modelValue": p[0] || (p[0] = (h) => y.value = h)
        }, {
          type: n(m) < n(B).MD ? n(F).Accordion : n(F).Table,
          rowDisplayType: n(te).PreferColumns,
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          paginator: {
            resource: "ls-web-items",
            resourceData: d.value
          },
          itemsContainerClass: n(m) < n(B).MD ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          },
          ...l.value.many,
          columns: w.value,
          header: C.value,
          createButton: V.value
        }), null, 16, ["modelValue"])) : N("", !0)
      ])) : N("", !0);
    };
  }
}), Be = {
  key: 0,
  class: "lkt-admin-spa lkt-web-item-spa"
}, Ae = /* @__PURE__ */ E({
  __name: "LktWebItemSpa",
  props: {
    id: {},
    type: {},
    onCreateTo: {}
  },
  setup(u) {
    const t = M("lktAdminEnabled"), s = u, a = O(), r = ne(), d = o(a.params.type), y = o(a.params.id), k = o(!1), c = o(!1), l = o(["create"]), e = o(P.getWebItemSettings(d.value)), m = (v) => typeof e.value.itemGenerator == "function" ? e.value.itemGenerator(v) : {
      ...v
    }, w = o(m(a.query)), C = () => {
      typeof e.value.appHeaderSingle == "function" ? S(e.value.appHeaderSingle({ item: w.value })) : typeof e.value.appHeaderSingle == "object" && Object.keys(e.value.appHeaderSingle).length > 0 && S(e.value.appHeaderSingle);
    };
    z(a, (v) => {
      d.value = a.params.type, y.value = a.params.id, k.value = !1, c.value = !1, l.value = ["create"], e.value = P.getWebItemSettings(d.value), $(() => {
        w.value = m(a.query), $(() => {
          C(), $(() => k.value = !0);
        });
      });
    }, { flush: "pre", immediate: !0, deep: !0 });
    const V = g(() => typeof e.value.appHeaderSingle < "u" ? {} : {
      text: e.value.labelSingle ?? "",
      icon: e.value.icon,
      tag: "h1"
    }), f = g(() => {
      var v, b;
      return ((b = (v = e.value) == null ? void 0 : v.single) == null ? void 0 : b.createButton) === !1 ? !1 : {
        resource: "mk-web-item",
        icon: "lkt-icn-save",
        text: "Create",
        ...e.value.single.createButton,
        events: {
          click: (G) => {
            var I, x, K, J;
            typeof ((x = (I = e.value.single.createButton) == null ? void 0 : I.events) == null ? void 0 : x.click) == "function" && ((J = (K = e.value.single.createButton) == null ? void 0 : K.events) == null || J.click(G)), s.onCreateTo && r.push({
              path: s.onCreateTo,
              replace: !0
            });
          }
        }
      };
    }), p = g(() => {
      var v, b;
      return ((b = (v = e.value) == null ? void 0 : v.single) == null ? void 0 : b.createButton) === !1 ? !1 : {
        resource: "mk-web-item",
        icon: "lkt-icn-save",
        text: "Create",
        ...e.value.single.createAndNewButton,
        events: {
          click: (G) => {
            var I, x, K, J;
            typeof ((x = (I = e.value.single.createAndNewButton) == null ? void 0 : I.events) == null ? void 0 : x.click) == "function" && ((J = (K = e.value.single.createAndNewButton) == null ? void 0 : K.events) == null || J.click(G)), r.push({
              path: `/admin/web-items/${d.value}/new`,
              query: {
                keepCreating: se()
              },
              replace: !0
            });
          }
        }
      };
    }), i = g(() => {
      var v, b;
      return ((b = (v = e.value) == null ? void 0 : v.single) == null ? void 0 : b.updateButton) === !1 ? !1 : {
        resource: "up-web-item",
        icon: "lkt-icn-save",
        text: "Update",
        ...e.value.single.updateButton
      };
    }), h = g(() => {
      var v, b;
      return ((b = (v = e.value) == null ? void 0 : v.single) == null ? void 0 : b.dropButton) === !1 ? !1 : {
        resource: "rm-web-item",
        resourceData: { id: y },
        icon: "lkt-icn-trash",
        text: "Remove",
        events: {
          click: () => {
            r.back();
          }
        },
        ...e.value.single.dropButton
      };
    }), q = (v) => `/admin/web-items/${d.value}/${v}`;
    return ue(() => {
      $(() => {
        C();
      });
    }), (v, b) => {
      const G = R("lkt-item-crud"), I = R("lkt-loader");
      return n(t) ? (_(), U("section", Be, [
        k.value ? (_(), L(G, j({
          key: 0,
          modelValue: w.value,
          "onUpdate:modelValue": b[0] || (b[0] = (x) => w.value = x),
          editing: c.value,
          "onUpdate:editing": b[1] || (b[1] = (x) => c.value = x),
          perms: l.value,
          "onUpdate:perms": b[2] || (b[2] = (x) => l.value = x)
        }, {
          readResource: "r-web-item",
          readData: { id: y.value },
          mode: y.value > 0 ? n(W).Update : n(W).Create,
          buttonNavVisibility: n(ae).Always,
          redirectOnCreate: q,
          ...e.value.single,
          header: V.value,
          createButton: f.value,
          createAndNewButton: p.value,
          updateButton: i.value,
          dropButton: h.value
        }), null, 16, ["modelValue", "editing", "perms"])) : (_(), L(I, { key: 1 }))
      ])) : N("", !0);
    };
  }
}), Ee = () => {
  oe({
    url: "/translations",
    name: "ls-lkt-i18n",
    params: { property: { default: void 0 }, value: { default: void 0 }, type: { default: void 0 } },
    digToPerms: "perms",
    digToData: "results",
    mapData: (u) => u
  }), oe({
    url: "/translation/{id}",
    name: "r-i18n",
    params: { id: { default: void 0 }, type: { default: void 0 } },
    digToPerms: "perms",
    digToData: "item",
    mapData: (u) => u
  }), me({
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
  }), ve({
    url: "/translation/{id}",
    name: "up-i18n",
    params: {
      id: { default: void 0 },
      type: { default: void 0 },
      property: { default: void 0 },
      valueData: { default: void 0 }
    },
    digToPerms: "perms"
  }), ye({
    url: "/translation/{id}",
    name: "rm-i18n",
    params: {
      id: { default: void 0 }
    },
    digToPerms: "perms",
    digToData: "item"
  });
}, Ve = {
  install: (u) => {
    u.component("lkt-admin-menu-button") === void 0 && u.component("lkt-admin-menu-button", fe), u.component("lkt-admin-menu") === void 0 && u.component("lkt-admin-menu", ke);
  }
}, H = (u, t) => {
}, Ie = (u) => {
  u.addRoute({ path: "/admin/web-pages/:type", name: "lkt-admin-pages", component: be, beforeEnter: H }), u.addRoute({ path: "/admin/web-pages/:type/:id", name: "lkt-admin-page", component: _e, beforeEnter: H }), u.addRoute({ path: "/admin/web-items/:type", name: "lkt-web-items", component: Ce, beforeEnter: H }), u.addRoute({ path: "/admin/web-items/:type/:id", name: "lkt-web-item", component: Ae, beforeEnter: H, props: (t) => ({
    id: t.params.id,
    type: t.params.type,
    onCreateTo: t.query.onCreateTo ?? ""
  }) }), u.addRoute({ path: "/admin/i18n", name: "lkt-admin-translations", component: re, beforeEnter: H }), u.addRoute({ path: "/admin/i18n/:id", name: "lkt-admin-translation", component: ie, beforeEnter: H, props: (t) => ({
    onCreateTo: t.query.onCreateTo ?? ""
  }) }), u.addRoute({ path: "/admin/many-i18n", name: "lkt-admin-many-translations", component: re, beforeEnter: H, props: (t) => ({
    many: !0
  }) }), u.addRoute({ path: "/admin/many-i18n/:id", name: "lkt-admin-many-translation", component: ie, beforeEnter: H, props: (t) => ({
    many: !0,
    onCreateTo: t.query.onCreateTo ?? ""
  }) });
};
export {
  Ve as default,
  Ee as setupAdminTranslationsHttp,
  Ie as setupLktVueAdminRoutes
};

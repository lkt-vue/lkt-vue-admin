import { defineComponent as E, inject as M, resolveComponent as H, createBlock as N, createCommentVNode as W, unref as n, openBlock as x, mergeProps as j, isRef as ve, computed as k, createElementBlock as q, normalizeClass as ye, createVNode as ee, ref as l, watch as O, nextTick as $, onMounted as se } from "vue";
import { ButtonType as R, WebPageController as ae, MenuEntryType as Z, WebItemsController as U, AppSize as C, FieldType as I, ColumnType as B, TableRowType as ne, TableType as L, ItemCrudButtonNavVisibility as le, ItemCrudMode as z, FormInstance as X, LktTranslationType as Q, FieldAutoValidationTrigger as te, AnchorType as fe, TablePermission as ke, MultipleOptionsDisplay as oe } from "lkt-vue-kernel";
import { useRoute as G, useRouter as re } from "vue-router";
import { updateMainHeader as S } from "lkt-vue-app";
import { time as de } from "lkt-date-tools";
import { createHTTPGetResource as Y, createHTTPPostResource as pe, createHTTPPutResource as me, createHTTPDeleteResource as ce } from "lkt-http-client";
const ge = /* @__PURE__ */ E({
  __name: "LktAdminMenuButton",
  setup(r) {
    const e = M("adminMenu"), u = M("lktAdminEnabled");
    return (a, o) => {
      const s = H("lkt-button");
      return n(u) ? (x(), N(s, j({
        key: 0,
        checked: n(e),
        "onUpdate:checked": o[0] || (o[0] = (c) => ve(e) ? e.value = c : null)
      }, {
        type: n(R).HiddenSwitch,
        icon: "lkt-icn-lkt",
        class: "lkt-admin-button"
      }), null, 16, ["checked"])) : W("", !0);
    };
  }
}), be = /* @__PURE__ */ E({
  __name: "LktAdminMenu",
  setup(r) {
    const e = M("adminMenu"), u = k(() => {
      let a = [];
      return ae.hasDefaultPageEnabled() && a.push({
        key: "web-pages",
        type: Z.Entry,
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
      }), ae.getPages().forEach((o) => {
        a.push({
          key: o.code,
          type: Z.Entry,
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
      }), U.getItems().forEach((o) => {
        o.many !== !1 && a.push({
          key: o.code,
          type: Z.Entry,
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
          type: Z.Entry,
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
      const s = H("lkt-menu");
      return x(), q("div", {
        class: ye(["lkt-admin-menu", n(e) ? "is-opened" : ""])
      }, [
        ee(s, {
          "model-value": u.value,
          onClickOutside: o[0] || (o[0] = (c) => e.value = !1)
        }, null, 8, ["model-value"])
      ], 2);
    };
  }
}), he = { class: "lkt-admin-spa lkt-admin-pages" }, _e = /* @__PURE__ */ E({
  __name: "LktAdminPagesSpa",
  setup(r) {
    const e = G(), u = l(e.params.type), a = l(e.params.id), o = l({
      name: "",
      type: u.value
    }), s = l([]), c = l(null);
    O(e, (t) => {
      u.value = e.params.type, a.value = e.params.id, o.value.type = u.value;
    }, { flush: "pre", immediate: !0, deep: !0 });
    let g = M("lktAppSize");
    g || (g = l(C.MD));
    const d = k(() => [
      {
        type: B.Field,
        key: "name",
        label: "__:common.column.name",
        isForAccordionHeader: !0,
        field: {
          type: I.Text,
          icon: "lkt-icn-webpage"
        }
      },
      {
        type: B.Button,
        key: "details",
        label: "Details",
        button: {
          type: R.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (t) => `/admin/web-pages/${u.value}/${t.id}`
          }
        }
      }
    ]), i = k(() => {
      let t = "Web Pages";
      return ae.getPages().forEach((m) => {
        if (m.id == u.value) {
          t = m.label ?? "Web Pages";
          return;
        }
      }), t;
    });
    return (t, m) => {
      const f = H("lkt-table");
      return x(), q("section", he, [
        ee(f, j({
          ref_key: "spaRef",
          ref: c,
          modelValue: s.value,
          "onUpdate:modelValue": m[0] || (m[0] = (w) => s.value = w)
        }, {
          type: n(g) < n(C).MD ? n(L).Accordion : n(L).Table,
          rowDisplayType: n(ne).PreferColumns,
          title: i.value,
          titleTag: "h1",
          titleIcon: "lkt-icn-webpage",
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          columns: d.value,
          paginator: {
            resource: "ls-web-pages-type",
            resourceData: o.value
          },
          createButton: {
            icon: "lkt-icn-more",
            type: n(R).Anchor,
            anchor: {
              to: `/admin/web-pages/${u.value}/0`
            }
          },
          itemsContainerClass: n(g) < n(C).MD ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          }
        }), null, 16, ["modelValue"])
      ]);
    };
  }
}), Te = { class: "lkt-admin-spa" }, we = /* @__PURE__ */ E({
  __name: "LktAdminPageSpa",
  setup(r) {
    const e = G(), u = re(), a = l(e.params.type), o = l(e.params.id);
    O(e, (g) => {
      a.value = e.params.type, o.value = e.params.id;
    }, { flush: "pre", immediate: !0, deep: !0 });
    const s = l({}), c = (g) => `/admin/web-pages/${a.value}/${g}`;
    return (g, d) => {
      const i = H("lkt-web-page");
      return x(), q("section", Te, [
        ee(i, {
          modelValue: s.value,
          "onUpdate:modelValue": d[0] || (d[0] = (t) => s.value = t),
          "crud-config": {
            readResource: "r-web-page",
            readData: {
              id: o.value
            },
            mode: o.value > 0 ? n(z).Update : n(z).Create,
            buttonNavVisibility: n(le).Always,
            editing: !0,
            perms: ["update"],
            createButton: {
              resource: "mk-web-page",
              resourceData: { ...s.value, type: a.value },
              text: "Create",
              disabled: !1
            },
            updateButton: {
              resource: "up-web-page",
              resourceData: s.value,
              text: "Update",
              disabled: !1
            },
            dropButton: {
              resource: "rm-web-page",
              resourceData: s.value,
              text: "Remove",
              disabled: !1,
              events: {
                click: () => {
                  n(u).back();
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
        }, null, 8, ["modelValue", "crud-config"])
      ]);
    };
  }
}), xe = {
  key: 0,
  class: "lkt-admin-spa lkt-admin-translations"
}, ie = /* @__PURE__ */ E({
  __name: "LktAdminTranslationsSpa",
  props: {
    many: { type: Boolean, default: !1 }
  },
  setup(r) {
    const e = M("lktAdminEnabled");
    e.value || (window.location.href = "/");
    const u = r, a = G(), o = l(a.params.id), s = l({
      property: "",
      value: "",
      type: u.many ? "many" : ""
    }), c = l([]), g = l(null), d = l(U.getWebItemSettings(u.many ? "lkt-many-i18n" : "lkt-i18n")), i = k(() => u.many ? "many-i18n" : "i18n"), t = () => {
      var v, b, T;
      typeof d.value > "u" || (typeof ((v = d.value) == null ? void 0 : v.appHeaderMany) == "function" ? S(d.value.appHeaderMany({ item: item.value })) : typeof ((b = d.value) == null ? void 0 : b.appHeaderMany) == "object" && Object.keys((T = d.value) == null ? void 0 : T.appHeaderMany).length > 0 && S(d.value.appHeaderMany));
    };
    O(a, (v) => {
      o.value = a.params.id, $(() => {
        t();
      });
    }, { flush: "pre", immediate: !0, deep: !0 });
    let m = M("lktAppSize");
    m || (m = l(C.MD));
    const f = k(() => {
      let v = [
        {
          type: B.Field,
          key: "property",
          label: "Property",
          isForAccordionHeader: !0,
          field: {
            type: I.Text,
            icon: "lkt-icn-lang-picker"
          }
        }
      ];
      return u.many || v.push({
        type: B.Field,
        key: "value",
        label: "Value",
        ensureFieldLabel: m.value < C.MD,
        field: {
          type: "prop:type",
          readModeConfig: {
            textMaxLength: 10
          }
        }
      }), v.push({
        type: B.Button,
        key: "details",
        label: "Details",
        button: {
          type: R.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (b) => `/admin/${i.value}/${b.id}`
          }
        }
      }), v;
    }), w = k(() => {
      var b, T, h;
      return typeof ((b = d.value) == null ? void 0 : b.appHeaderMany) < "u" ? {} : {
        text: ((T = d.value) == null ? void 0 : T.labelMany) ?? "",
        icon: (h = d.value) == null ? void 0 : h.icon,
        tag: "h1"
      };
    }), V = k(() => ({
      header: {
        text: "Filters",
        tag: "h2"
      },
      items: [
        X.mkFieldItemConfig("property", {
          type: I.Text,
          label: "Property"
        })
        // FormInstance.mkFieldItemConfig('value', {
        //     type: FieldType.Text,
        //     label: 'Value',
        // }),
      ]
    }));
    return (v, b) => {
      const T = H("lkt-table");
      return n(e) ? (x(), q("section", xe, [
        ee(T, j({
          ref_key: "spaRef",
          ref: g,
          modelValue: c.value,
          "onUpdate:modelValue": b[0] || (b[0] = (h) => c.value = h)
        }, {
          type: n(m) < n(C).MD ? n(L).Accordion : n(L).Table,
          rowDisplayType: n(ne).PreferColumns,
          header: w.value,
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          columns: f.value,
          paginator: {
            resource: "ls-lkt-i18n",
            resourceData: s.value
          },
          createButton: {
            icon: "lkt-icn-more",
            text: "Add translation",
            type: n(R).Anchor,
            anchor: {
              to: `/admin/${i.value}/new`
            }
          },
          itemsContainerClass: n(m) < n(C).MD ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          },
          filtersForm: V.value
        }), null, 16, ["modelValue"])
      ])) : W("", !0);
    };
  }
}), Ce = {
  key: 0,
  class: "lkt-admin-spa"
}, ue = /* @__PURE__ */ E({
  __name: "LktAdminTranslationSpa",
  props: {
    onCreateTo: {},
    many: { type: Boolean, default: !1 }
  },
  setup(r) {
    const e = r, u = M("lktAdminEnabled");
    u.value || (window.location.href = "/");
    const a = G(), o = re(), s = l(parseInt(a.params.id)), c = l(!1), g = l(!1), d = l(["create", "switch-edit-mode"]);
    let i = M("lktAppSize");
    i || (i = l(C.MD));
    const t = l(U.getWebItemSettings(e.many ? "lkt-many-i18n" : "lkt-i18n")), m = k(() => e.many && !a.query.parentId), f = l({
      property: "",
      type: m.value ? Q.Many : Q.Text,
      value: "",
      parentId: 0,
      valueData: {},
      children: [],
      ...a.query
    }), w = k(() => e.many ? "many-i18n" : "i18n"), V = () => {
      var h, _, p;
      typeof t.value > "u" || (typeof ((h = t.value) == null ? void 0 : h.appHeaderSingle) == "function" ? S(t.value.appHeaderSingle({ item: f.value })) : typeof ((_ = t.value) == null ? void 0 : _.appHeaderSingle) == "object" && Object.keys((p = t.value) == null ? void 0 : p.appHeaderSingle).length > 0 && S(t.value.appHeaderSingle));
    };
    O(a, (h) => {
      s.value = parseInt(a.params.id), g.value = !1, c.value = !1, f.value = {
        property: "",
        type: m.value ? "many" : I.Text,
        value: "",
        parentId: 0,
        valueData: {},
        children: [],
        ...a.query
      }, d.value = ["create", "switch-edit-mode"], $(() => {
        V(), $(() => g.value = !0);
      });
    }, { flush: "pre", immediate: !0, deep: !0 }), k(() => !1);
    const v = k(() => (h) => ({
      items: [
        X.mkFieldItemConfig("property", {
          type: I.Text,
          label: "Property",
          mandatory: !0,
          validation: {
            trigger: te.Blur
          }
        }),
        X.mkFieldItemConfig("type", {
          type: I.Select,
          mandatory: !0,
          label: "Type",
          options: [Q.Text, Q.Textarea, Q.Many],
          optionsConfig: {
            filter: (_) => _.value === "many" ? m.value && !f.value.parentId : !0
          },
          readMode: m.value && !f.value.parentId,
          validation: {
            trigger: te.Blur
          }
        }, {}, { canRender: !0 }),
        X.mkFieldItemConfig("valueData", {
          type: f.value.type,
          mandatory: !0,
          canI18n: !0,
          label: "Value",
          validation: {
            trigger: te.Blur
          }
        }, {}, { canRender: f.value.type !== "many" }),
        X.mkFieldItemConfig("children", {
          type: I.Table,
          multiple: !0,
          options: "prop:children",
          optionValueType: "option",
          searchable: !1,
          multipleDisplay: oe.Table,
          multipleDisplayEdition: oe.Table,
          tooltipConfig: {
            compensateGlobalContainers: !1
          },
          optionsConfig: {
            icon: "lkt-icn-edit",
            anchor: {
              to: `/admin/${w.value}/feed{value}`
            },
            zeroMeansEmpty: !0,
            table: {
              type: L.Table,
              drag: {
                enabled: !1,
                isDraggable: !1,
                isValid: !0,
                isDisabled: !0,
                canRender: !0,
                dragKey: "drag-indicator"
              },
              perms: [ke.Create],
              requiredItemsForTopCreate: 999,
              columns: [
                {
                  key: "property",
                  label: "Property",
                  type: B.Field,
                  field: {
                    type: I.Text,
                    icon: "lkt-icn-lang-picker"
                  }
                },
                {
                  key: "valueData",
                  label: "Value",
                  type: B.Field,
                  ensureFieldLabel: i.value < C.MD,
                  field: {
                    type: "prop:type",
                    canI18n: !0,
                    readModeConfig: {
                      textMaxLength: 10
                    }
                  }
                },
                {
                  key: "details",
                  label: "Details",
                  type: B.Button,
                  button: {
                    type: R.Anchor,
                    text: "__:common.button.details",
                    class: "lkt-button--info",
                    icon: "lkt-icn-expand",
                    anchor: {
                      to: `/admin/${w.value}/feed{id}`
                    }
                  }
                }
              ],
              createButton: {
                type: R.Anchor,
                anchor: {
                  type: fe.RouterLink,
                  to: {
                    path: `/admin/${w.value}/new`,
                    query: {
                      parentId: h.item.id,
                      onCreateTo: `/admin/${w.value}/${h.item.id}`
                    }
                  }
                }
              }
            }
          }
        }, {}, { canRender: f.value.id > 0 && f.value.type === "many" })
      ]
    })), b = k(() => {
      var _, p, y;
      return typeof ((_ = t.value) == null ? void 0 : _.appHeaderSingle) < "u" ? {} : {
        text: ((p = t.value) == null ? void 0 : p.labelSingle) ?? "",
        icon: ((y = t.value) == null ? void 0 : y.icon) ?? "lkt-icn-lang-picker",
        tag: "h1"
      };
    }), T = k(() => ({
      // header: {
      //     text: id.value > 0 ? item.value.property : 'New translation',
      //     icon: 'lkt-icn-lang-picker',
      //     tag: 'h1'
      // },
      header: b.value,
      readResource: "r-i18n",
      readData: {
        id: s.value,
        type: e.many ? "many" : void 0
      },
      mode: s.value > 0 ? z.Update : z.Create,
      form: v.value,
      buttonNavVisibility: le.Always,
      createButton: {
        resource: "mk-i18n",
        icon: "lkt-icn-save",
        text: "Create",
        events: {
          click: (h) => {
            var _;
            e.onCreateTo ? o.push({
              path: e.onCreateTo,
              replace: !0
            }) : o.push({
              path: `/admin/${w.value}/${(_ = h.httpResponse) == null ? void 0 : _.autoReloadId}`,
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
          click: (h) => {
            o.push({
              path: `/admin/${w.value}/new`,
              query: {
                keepCreating: de()
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
        resourceData: { id: s.value },
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
    return (h, _) => {
      const p = H("lkt-item-crud"), y = H("lkt-loader");
      return n(u) ? (x(), q("section", Ce, [
        g.value ? (x(), N(p, j({
          key: 0,
          modelValue: f.value,
          "onUpdate:modelValue": _[0] || (_[0] = (D) => f.value = D),
          editing: c.value,
          "onUpdate:editing": _[1] || (_[1] = (D) => c.value = D),
          perms: d.value,
          "onUpdate:perms": _[2] || (_[2] = (D) => d.value = D)
        }, T.value), null, 16, ["modelValue", "editing", "perms"])) : (x(), N(y, { key: 1 }))
      ])) : W("", !0);
    };
  }
}), De = {
  key: 0,
  class: "lkt-admin-spa lkt-web-items"
}, Ae = /* @__PURE__ */ E({
  __name: "LktWebItemsSpa",
  setup(r) {
    const e = M("lktAdminEnabled");
    e.value || (window.location.href = "/");
    const u = G(), a = l(u.params.type), o = l(u.params.id), s = l({
      name: "",
      type: a.value
    }), c = l([]), g = l(null), d = l(!1), i = l(U.getWebItemSettings(a.value)), t = () => {
      typeof i.value.appHeaderMany == "function" ? S(i.value.appHeaderMany({ item: item.value })) : typeof i.value.appHeaderMany == "object" && Object.keys(i.value.appHeaderMany).length > 0 && S(i.value.appHeaderMany);
    };
    O(u, (v) => {
      a.value = u.params.type, o.value = u.params.id, c.value.splice(0, c.value.length), d.value = !1, s.value.type = a.value, i.value = U.getWebItemSettings(a.value), $(() => {
        t(), $(() => d.value = !0);
      });
    }, { flush: "pre", immediate: !0, deep: !0 });
    let m = M("lktAppSize");
    m || (m = l(C.MD));
    const f = k(() => i.value.many.columns ? [
      ...i.value.many.columns,
      {
        type: B.Button,
        key: "details",
        label: "Details",
        button: {
          type: R.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (v) => `/admin/web-items/${a.value}/${v.id}`
          }
        }
      }
    ] : [
      {
        type: B.Field,
        key: "name",
        label: "Name",
        isForAccordionHeader: !0,
        field: {
          type: I.Text,
          icon: i.value.icon
        }
      },
      {
        type: B.Button,
        key: "details",
        label: "Details",
        button: {
          type: R.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (v) => `/admin/web-items/${a.value}/${v.id}`
          }
        }
      }
    ]), w = k(() => typeof i.value.appHeaderMany < "u" ? {} : {
      text: i.value.labelMany ?? "",
      icon: i.value.icon,
      tag: "h1"
    }), V = k(() => {
      var v, b, T;
      return ((b = (v = i.value) == null ? void 0 : v.many) == null ? void 0 : b.createButton) === !1 ? !1 : {
        icon: "lkt-icn-more",
        text: "Add web item",
        type: R.Anchor,
        anchor: {
          to: `/admin/web-items/${a.value}/new`
        },
        //@ts-ignore
        ...(T = i.value.many) == null ? void 0 : T.createButton
      };
    });
    return se(() => {
      d.value = !0;
    }), (v, b) => {
      const T = H("lkt-table");
      return n(e) ? (x(), q("section", De, [
        d.value ? (x(), N(T, j({
          key: 0,
          ref_key: "spaRef",
          ref: g,
          modelValue: c.value,
          "onUpdate:modelValue": b[0] || (b[0] = (h) => c.value = h)
        }, {
          type: n(m) < n(C).MD ? n(L).Accordion : n(L).Table,
          rowDisplayType: n(ne).PreferColumns,
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          paginator: {
            resource: "ls-web-items",
            resourceData: s.value
          },
          itemsContainerClass: n(m) < n(C).MD ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          },
          ...i.value.many,
          columns: f.value,
          header: w.value,
          createButton: V.value
        }), null, 16, ["modelValue"])) : W("", !0)
      ])) : W("", !0);
    };
  }
}), Be = {
  key: 0,
  class: "lkt-admin-spa lkt-web-item-spa"
}, Me = /* @__PURE__ */ E({
  __name: "LktWebItemSpa",
  props: {
    id: {},
    type: {},
    onCreateTo: {}
  },
  setup(r) {
    const e = M("lktAdminEnabled"), u = r, a = G(), o = re(), s = l(a.params.type), c = l(a.params.id), g = l(!1), d = l(!1), i = l(["create"]), t = l(U.getWebItemSettings(s.value)), m = (p) => typeof t.value.itemGenerator == "function" ? t.value.itemGenerator(p) : {
      ...p
    }, f = l(m(a.query)), w = () => {
      typeof t.value.appHeaderSingle == "function" ? S(t.value.appHeaderSingle({ item: f.value })) : typeof t.value.appHeaderSingle == "object" && Object.keys(t.value.appHeaderSingle).length > 0 && S(t.value.appHeaderSingle);
    };
    O(a, (p) => {
      s.value = a.params.type, c.value = a.params.id, g.value = !1, d.value = !1, i.value = ["create"], t.value = U.getWebItemSettings(s.value), $(() => {
        f.value = m(a.query), $(() => {
          w(), $(() => g.value = !0);
        });
      });
    }, { flush: "pre", immediate: !0, deep: !0 });
    const V = k(() => typeof t.value.appHeaderSingle < "u" ? {} : {
      text: t.value.labelSingle ?? "",
      icon: t.value.icon,
      tag: "h1"
    }), v = k(() => {
      var p, y;
      return ((y = (p = t.value) == null ? void 0 : p.single) == null ? void 0 : y.createButton) === !1 ? !1 : {
        resource: "mk-web-item",
        icon: "lkt-icn-save",
        text: "Create",
        ...t.value.single.createButton,
        events: {
          click: (D) => {
            var F, A, K, J;
            typeof ((A = (F = t.value.single.createButton) == null ? void 0 : F.events) == null ? void 0 : A.click) == "function" && ((J = (K = t.value.single.createButton) == null ? void 0 : K.events) == null || J.click(D)), u.onCreateTo && o.push({
              path: u.onCreateTo,
              replace: !0
            });
          }
        }
      };
    }), b = k(() => {
      var p, y;
      return ((y = (p = t.value) == null ? void 0 : p.single) == null ? void 0 : y.createButton) === !1 ? !1 : {
        resource: "mk-web-item",
        icon: "lkt-icn-save",
        text: "Create",
        ...t.value.single.createAndNewButton,
        events: {
          click: (D) => {
            var F, A, K, J;
            typeof ((A = (F = t.value.single.createAndNewButton) == null ? void 0 : F.events) == null ? void 0 : A.click) == "function" && ((J = (K = t.value.single.createAndNewButton) == null ? void 0 : K.events) == null || J.click(D)), o.push({
              path: `/admin/web-items/${s.value}/new`,
              query: {
                keepCreating: de()
              },
              replace: !0
            });
          }
        }
      };
    }), T = k(() => {
      var p, y;
      return ((y = (p = t.value) == null ? void 0 : p.single) == null ? void 0 : y.updateButton) === !1 ? !1 : {
        resource: "up-web-item",
        icon: "lkt-icn-save",
        text: "Update",
        ...t.value.single.updateButton
      };
    }), h = k(() => {
      var p, y;
      return ((y = (p = t.value) == null ? void 0 : p.single) == null ? void 0 : y.dropButton) === !1 ? !1 : {
        resource: "rm-web-item",
        resourceData: { id: c },
        icon: "lkt-icn-trash",
        text: "Remove",
        events: {
          click: () => {
            o.back();
          }
        },
        ...t.value.single.dropButton
      };
    }), _ = (p) => `/admin/web-items/${s.value}/${p}`;
    return se(() => {
      $(() => {
        w();
      });
    }), (p, y) => {
      const D = H("lkt-item-crud"), F = H("lkt-loader");
      return n(e) ? (x(), q("section", Be, [
        g.value ? (x(), N(D, j({
          key: 0,
          modelValue: f.value,
          "onUpdate:modelValue": y[0] || (y[0] = (A) => f.value = A),
          editing: d.value,
          "onUpdate:editing": y[1] || (y[1] = (A) => d.value = A),
          perms: i.value,
          "onUpdate:perms": y[2] || (y[2] = (A) => i.value = A)
        }, {
          readResource: "r-web-item",
          readData: { id: c.value },
          mode: c.value > 0 ? n(z).Update : n(z).Create,
          buttonNavVisibility: n(le).Always,
          redirectOnCreate: _,
          ...t.value.single,
          header: V.value,
          createButton: v.value,
          createAndNewButton: b.value,
          updateButton: T.value,
          dropButton: h.value
        }), null, 16, ["modelValue", "editing", "perms"])) : (x(), N(F, { key: 1 }))
      ])) : W("", !0);
    };
  }
}), Ee = () => {
  Y({
    url: "/translations",
    name: "ls-lkt-i18n",
    params: { property: { default: void 0 }, value: { default: void 0 }, type: { default: void 0 }, page: { default: void 0 } },
    digToPerms: "perms",
    digToData: "results",
    mapData: (r) => r
  }), Y({
    url: "/translation/{id}",
    name: "r-i18n",
    params: { id: { default: void 0 }, type: { default: void 0 } },
    digToPerms: "perms",
    digToData: "item",
    mapData: (r) => r
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
  }), me({
    url: "/translation/{id}",
    name: "up-i18n",
    params: {
      id: { default: void 0 },
      type: { default: void 0 },
      property: { default: void 0 },
      valueData: { default: void 0 }
    },
    digToPerms: "perms"
  }), ce({
    url: "/translation/{id}",
    name: "rm-i18n",
    params: {
      id: { default: void 0 }
    },
    digToPerms: "perms",
    digToData: "item"
  });
}, Ve = () => {
  Y({
    url: "/user/roles/page-{page}",
    name: "ls-user-role",
    params: { page: { default: void 0 } },
    digToPerms: "perms",
    digToData: "results",
    mapData: (r) => r
  }), Y({
    url: "/user/roles",
    name: "all-user-role",
    digToPerms: "perms",
    digToData: "results",
    mapData: (r) => r
  }), Y({
    url: "/user/role/{id}",
    name: "r-user-role",
    params: { id: { default: void 0 } },
    digToPerms: "perms",
    digToData: "item",
    mapData: (r) => r
  }), pe({
    url: "/user/role",
    name: "mk-user-role",
    params: {
      name: { default: void 0 },
      permissions: { default: void 0 }
    },
    digToPerms: "perms",
    digToAutoReloadId: "item.id"
  }), me({
    url: "/user/role/{id}",
    name: "up-user-role",
    params: {
      id: { default: void 0 },
      name: { default: void 0 },
      permissions: { default: void 0 }
    },
    digToPerms: "perms"
  }), ce({
    url: "/user/role/{id}",
    name: "rm-user-role",
    params: {
      id: { default: void 0 }
    },
    digToPerms: "perms",
    digToData: "item"
  });
}, Fe = {
  install: (r) => {
    r.component("lkt-admin-menu-button") === void 0 && r.component("lkt-admin-menu-button", ge), r.component("lkt-admin-menu") === void 0 && r.component("lkt-admin-menu", be);
  }
}, P = (r, e) => {
}, Ue = (r) => {
  r.addRoute({ path: "/admin/web-pages/:type", name: "lkt-admin-pages", component: _e, beforeEnter: P }), r.addRoute({ path: "/admin/web-pages/:type/:id", name: "lkt-admin-page", component: we, beforeEnter: P }), r.addRoute({ path: "/admin/web-items/:type", name: "lkt-web-items", component: Ae, beforeEnter: P }), r.addRoute({ path: "/admin/web-items/:type/:id", name: "lkt-web-item", component: Me, beforeEnter: P, props: (e) => ({
    id: e.params.id,
    type: e.params.type,
    onCreateTo: e.query.onCreateTo ?? ""
  }) }), r.addRoute({ path: "/admin/i18n", name: "lkt-admin-translations", component: ie, beforeEnter: P }), r.addRoute({ path: "/admin/i18n/:id", name: "lkt-admin-translation", component: ue, beforeEnter: P, props: (e) => ({
    onCreateTo: e.query.onCreateTo ?? ""
  }) }), r.addRoute({ path: "/admin/many-i18n", name: "lkt-admin-many-translations", component: ie, beforeEnter: P, props: (e) => ({
    many: !0
  }) }), r.addRoute({ path: "/admin/many-i18n/:id", name: "lkt-admin-many-translation", component: ue, beforeEnter: P, props: (e) => ({
    many: !0,
    onCreateTo: e.query.onCreateTo ?? ""
  }) });
};
export {
  Fe as default,
  Ee as setupAdminTranslationsHttp,
  Ve as setupAdminUserRoleHttp,
  Ue as setupLktVueAdminRoutes
};

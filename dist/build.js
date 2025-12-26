import { defineComponent as P, inject as R, resolveComponent as $, createBlock as N, createCommentVNode as W, unref as n, openBlock as x, mergeProps as j, isRef as de, computed as k, createElementBlock as L, normalizeClass as pe, createVNode as Y, ref as l, watch as O, nextTick as H, onMounted as ue } from "vue";
import { ButtonType as I, WebPageController as ee, MenuEntryType as X, WebItemsController as U, AppSize as B, FieldType as C, ColumnType as M, TableRowType as te, TableType as q, ItemCrudButtonNavVisibility as ae, ItemCrudMode as z, FormInstance as Q, FieldAutoValidationTrigger as Z, AnchorType as ce, TablePermission as me, MultipleOptionsDisplay as le } from "lkt-vue-kernel";
import { useRoute as G, useRouter as ne } from "vue-router";
import { updateMainHeader as E } from "lkt-vue-app";
import { time as se } from "lkt-date-tools";
import { createHTTPGetResource as oe, createHTTPPostResource as ve, createHTTPPutResource as ye, createHTTPDeleteResource as fe } from "lkt-http-client";
const ke = /* @__PURE__ */ P({
  __name: "LktAdminMenuButton",
  setup(i) {
    const e = R("adminMenu"), u = R("lktAdminEnabled");
    return (a, o) => {
      const s = $("lkt-button");
      return n(u) ? (x(), N(s, j({
        key: 0,
        checked: n(e),
        "onUpdate:checked": o[0] || (o[0] = (m) => de(e) ? e.value = m : null)
      }, {
        type: n(I).HiddenSwitch,
        icon: "lkt-icn-lkt",
        class: "lkt-admin-button"
      }), null, 16, ["checked"])) : W("", !0);
    };
  }
}), ge = /* @__PURE__ */ P({
  __name: "LktAdminMenu",
  setup(i) {
    const e = R("adminMenu"), u = k(() => {
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
              e.value = !1;
            }
          }
        }
      }), ee.getPages().forEach((o) => {
        a.push({
          key: o.code,
          type: X.Entry,
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
          type: X.Entry,
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
          type: X.Entry,
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
      const s = $("lkt-menu");
      return x(), L("div", {
        class: pe(["lkt-admin-menu", n(e) ? "is-opened" : ""])
      }, [
        Y(s, {
          "model-value": u.value,
          onClickOutside: o[0] || (o[0] = (m) => e.value = !1)
        }, null, 8, ["model-value"])
      ], 2);
    };
  }
}), be = { class: "lkt-admin-spa lkt-admin-pages" }, he = /* @__PURE__ */ P({
  __name: "LktAdminPagesSpa",
  setup(i) {
    const e = G(), u = l(e.params.type), a = l(e.params.id), o = l({
      name: "",
      type: u.value
    }), s = l([]), m = l(null);
    O(e, (t) => {
      u.value = e.params.type, a.value = e.params.id, o.value.type = u.value;
    }, { flush: "pre", immediate: !0, deep: !0 });
    let g = R("lktAppSize");
    g || (g = l(B.MD));
    const d = k(() => [
      {
        type: M.Field,
        key: "name",
        label: "__:common.column.name",
        isForAccordionHeader: !0,
        field: {
          type: C.Text,
          icon: "lkt-icn-webpage"
        }
      },
      {
        type: M.Button,
        key: "details",
        label: "Details",
        button: {
          type: I.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (t) => `/admin/web-pages/${u.value}/${t.id}`
          }
        }
      }
    ]), r = k(() => {
      let t = "Web Pages";
      return ee.getPages().forEach((c) => {
        if (c.id == u.value) {
          t = c.label ?? "Web Pages";
          return;
        }
      }), t;
    });
    return (t, c) => {
      const f = $("lkt-table");
      return x(), L("section", be, [
        Y(f, j({
          ref_key: "spaRef",
          ref: m,
          modelValue: s.value,
          "onUpdate:modelValue": c[0] || (c[0] = (w) => s.value = w)
        }, {
          type: n(g) < n(B).MD ? n(q).Accordion : n(q).Table,
          rowDisplayType: n(te).PreferColumns,
          title: r.value,
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
            type: n(I).Anchor,
            anchor: {
              to: `/admin/web-pages/${u.value}/0`
            }
          },
          itemsContainerClass: n(g) < n(B).MD ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          }
        }), null, 16, ["modelValue"])
      ]);
    };
  }
}), _e = { class: "lkt-admin-spa" }, Te = /* @__PURE__ */ P({
  __name: "LktAdminPageSpa",
  setup(i) {
    const e = G(), u = ne(), a = l(e.params.type), o = l(e.params.id);
    O(e, (g) => {
      a.value = e.params.type, o.value = e.params.id;
    }, { flush: "pre", immediate: !0, deep: !0 });
    const s = l({}), m = (g) => `/admin/web-pages/${a.value}/${g}`;
    return (g, d) => {
      const r = $("lkt-web-page");
      return x(), L("section", _e, [
        Y(r, {
          modelValue: s.value,
          "onUpdate:modelValue": d[0] || (d[0] = (t) => s.value = t),
          "crud-config": {
            readResource: "r-web-page",
            readData: {
              id: o.value
            },
            mode: o.value > 0 ? n(z).Update : n(z).Create,
            buttonNavVisibility: n(ae).Always,
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
}), we = {
  key: 0,
  class: "lkt-admin-spa lkt-admin-translations"
}, re = /* @__PURE__ */ P({
  __name: "LktAdminTranslationsSpa",
  props: {
    many: { type: Boolean, default: !1 }
  },
  setup(i) {
    const e = R("lktAdminEnabled");
    e.value || (window.location.href = "/");
    const u = i, a = G(), o = l(a.params.id), s = l({
      property: "",
      value: "",
      type: u.many ? "many" : ""
    }), m = l([]), g = l(null), d = l(U.getWebItemSettings(u.many ? "lkt-many-i18n" : "lkt-i18n")), r = k(() => u.many ? "many-i18n" : "i18n"), t = () => {
      var v, b, T;
      typeof d.value > "u" || (typeof ((v = d.value) == null ? void 0 : v.appHeaderMany) == "function" ? E(d.value.appHeaderMany({ item: item.value })) : typeof ((b = d.value) == null ? void 0 : b.appHeaderMany) == "object" && Object.keys((T = d.value) == null ? void 0 : T.appHeaderMany).length > 0 && E(d.value.appHeaderMany));
    };
    O(a, (v) => {
      o.value = a.params.id, H(() => {
        t();
      });
    }, { flush: "pre", immediate: !0, deep: !0 });
    let c = R("lktAppSize");
    c || (c = l(B.MD));
    const f = k(() => {
      let v = [
        {
          type: M.Field,
          key: "property",
          label: "Property",
          isForAccordionHeader: !0,
          field: {
            type: C.Text,
            icon: "lkt-icn-lang-picker"
          }
        }
      ];
      return u.many || v.push({
        type: M.Field,
        key: "value",
        label: "Value",
        ensureFieldLabel: c.value < B.MD,
        field: {
          type: "prop:type",
          readModeConfig: {
            textMaxLength: 10
          }
        }
      }), v.push({
        type: M.Button,
        key: "details",
        label: "Details",
        button: {
          type: I.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (b) => `/admin/${r.value}/${b.id}`
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
        Q.mkFieldItemConfig("property", {
          type: C.Text,
          label: "Property"
        })
        // FormInstance.mkFieldItemConfig('value', {
        //     type: FieldType.Text,
        //     label: 'Value',
        // }),
      ]
    }));
    return (v, b) => {
      const T = $("lkt-table");
      return n(e) ? (x(), L("section", we, [
        Y(T, j({
          ref_key: "spaRef",
          ref: g,
          modelValue: m.value,
          "onUpdate:modelValue": b[0] || (b[0] = (h) => m.value = h)
        }, {
          type: n(c) < n(B).MD ? n(q).Accordion : n(q).Table,
          rowDisplayType: n(te).PreferColumns,
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
            type: n(I).Anchor,
            anchor: {
              to: `/admin/${r.value}/new`
            }
          },
          itemsContainerClass: n(c) < n(B).MD ? "lkt-grid-1 xs-grid-style" : "",
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
}), xe = {
  key: 0,
  class: "lkt-admin-spa"
}, ie = /* @__PURE__ */ P({
  __name: "LktAdminTranslationSpa",
  props: {
    onCreateTo: {},
    many: { type: Boolean, default: !1 }
  },
  setup(i) {
    const e = i, u = R("lktAdminEnabled");
    u.value || (window.location.href = "/");
    const a = G(), o = ne(), s = l(parseInt(a.params.id)), m = l(!1), g = l(!1), d = l(["create", "switch-edit-mode"]);
    let r = R("lktAppSize");
    r || (r = l(B.MD));
    const t = l(U.getWebItemSettings(e.many ? "lkt-many-i18n" : "lkt-i18n")), c = k(() => e.many && !a.query.parentId), f = l({
      property: "",
      type: c.value ? "many" : C.Text,
      value: "",
      parentId: 0,
      valueData: {},
      children: [],
      ...a.query
    });
    console.log("check: ", e.many, parseInt(a.query.parentId));
    const w = k(() => e.many ? "many-i18n" : "i18n"), V = () => {
      var h, _, p;
      typeof t.value > "u" || (typeof ((h = t.value) == null ? void 0 : h.appHeaderSingle) == "function" ? E(t.value.appHeaderSingle({ item: f.value })) : typeof ((_ = t.value) == null ? void 0 : _.appHeaderSingle) == "object" && Object.keys((p = t.value) == null ? void 0 : p.appHeaderSingle).length > 0 && E(t.value.appHeaderSingle));
    };
    O(a, (h) => {
      s.value = parseInt(a.params.id), g.value = !1, m.value = !1, f.value = {
        property: "",
        type: c.value ? "many" : C.Text,
        value: "",
        parentId: 0,
        valueData: {},
        children: [],
        ...a.query
      }, d.value = ["create", "switch-edit-mode"], H(() => {
        V(), H(() => g.value = !0);
      });
    }, { flush: "pre", immediate: !0, deep: !0 }), k(() => !1);
    const v = k(() => (h) => ({
      items: [
        Q.mkFieldItemConfig("property", {
          type: C.Text,
          label: "Property",
          mandatory: !0,
          validation: {
            trigger: Z.Blur
          }
        }),
        Q.mkFieldItemConfig("type", {
          type: C.Select,
          mandatory: !0,
          label: "Type",
          options: [C.Text, C.Textarea, "many"],
          optionsConfig: {
            filter: (_) => _.value === "many" ? c.value && !f.value.parentId : !0
          },
          readMode: c.value && !f.value.parentId,
          validation: {
            trigger: Z.Blur
          }
        }, {}, { canRender: !0 }),
        Q.mkFieldItemConfig("valueData", {
          type: f.value.type,
          mandatory: !0,
          canI18n: !0,
          label: "Value",
          validation: {
            trigger: Z.Blur
          }
        }, {}, { canRender: f.value.type !== "many" }),
        Q.mkFieldItemConfig("children", {
          type: C.Table,
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
              to: `/admin/${w.value}/feed{value}`
            },
            zeroMeansEmpty: !0,
            table: {
              type: q.Table,
              drag: {
                enabled: !1,
                isDraggable: !1,
                isValid: !0,
                isDisabled: !0,
                canRender: !0,
                dragKey: "drag-indicator"
              },
              perms: [me.Create],
              requiredItemsForTopCreate: 999,
              columns: [
                {
                  key: "property",
                  label: "Property",
                  type: M.Field,
                  field: {
                    type: C.Text,
                    icon: "lkt-icn-lang-picker"
                  }
                },
                {
                  key: "valueData",
                  label: "Value",
                  type: M.Field,
                  ensureFieldLabel: r.value < B.MD,
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
                  type: M.Button,
                  button: {
                    type: I.Anchor,
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
                type: I.Anchor,
                anchor: {
                  type: ce.RouterLink,
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
      buttonNavVisibility: ae.Always,
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
      const p = $("lkt-item-crud"), y = $("lkt-loader");
      return n(u) ? (x(), L("section", xe, [
        g.value ? (x(), N(p, j({
          key: 0,
          modelValue: f.value,
          "onUpdate:modelValue": _[0] || (_[0] = (A) => f.value = A),
          editing: m.value,
          "onUpdate:editing": _[1] || (_[1] = (A) => m.value = A),
          perms: d.value,
          "onUpdate:perms": _[2] || (_[2] = (A) => d.value = A)
        }, T.value), null, 16, ["modelValue", "editing", "perms"])) : (x(), N(y, { key: 1 }))
      ])) : W("", !0);
    };
  }
}), Ce = {
  key: 0,
  class: "lkt-admin-spa lkt-web-items"
}, Be = /* @__PURE__ */ P({
  __name: "LktWebItemsSpa",
  setup(i) {
    const e = R("lktAdminEnabled");
    e.value || (window.location.href = "/");
    const u = G(), a = l(u.params.type), o = l(u.params.id), s = l({
      name: "",
      type: a.value
    }), m = l([]), g = l(null), d = l(!1), r = l(U.getWebItemSettings(a.value)), t = () => {
      typeof r.value.appHeaderMany == "function" ? E(r.value.appHeaderMany({ item: item.value })) : typeof r.value.appHeaderMany == "object" && Object.keys(r.value.appHeaderMany).length > 0 && E(r.value.appHeaderMany);
    };
    O(u, (v) => {
      a.value = u.params.type, o.value = u.params.id, m.value.splice(0, m.value.length), d.value = !1, s.value.type = a.value, r.value = U.getWebItemSettings(a.value), H(() => {
        t(), H(() => d.value = !0);
      });
    }, { flush: "pre", immediate: !0, deep: !0 });
    let c = R("lktAppSize");
    c || (c = l(B.MD));
    const f = k(() => r.value.many.columns ? [
      ...r.value.many.columns,
      {
        type: M.Button,
        key: "details",
        label: "Details",
        button: {
          type: I.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (v) => `/admin/web-items/${a.value}/${v.id}`
          }
        }
      }
    ] : [
      {
        type: M.Field,
        key: "name",
        label: "Name",
        isForAccordionHeader: !0,
        field: {
          type: C.Text,
          icon: r.value.icon
        }
      },
      {
        type: M.Button,
        key: "details",
        label: "Details",
        button: {
          type: I.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (v) => `/admin/web-items/${a.value}/${v.id}`
          }
        }
      }
    ]), w = k(() => typeof r.value.appHeaderMany < "u" ? {} : {
      text: r.value.labelMany ?? "",
      icon: r.value.icon,
      tag: "h1"
    }), V = k(() => {
      var v, b, T;
      return ((b = (v = r.value) == null ? void 0 : v.many) == null ? void 0 : b.createButton) === !1 ? !1 : {
        icon: "lkt-icn-more",
        text: "Add web item",
        type: I.Anchor,
        anchor: {
          to: `/admin/web-items/${a.value}/new`
        },
        //@ts-ignore
        ...(T = r.value.many) == null ? void 0 : T.createButton
      };
    });
    return ue(() => {
      d.value = !0;
    }), (v, b) => {
      const T = $("lkt-table");
      return n(e) ? (x(), L("section", Ce, [
        d.value ? (x(), N(T, j({
          key: 0,
          ref_key: "spaRef",
          ref: g,
          modelValue: m.value,
          "onUpdate:modelValue": b[0] || (b[0] = (h) => m.value = h)
        }, {
          type: n(c) < n(B).MD ? n(q).Accordion : n(q).Table,
          rowDisplayType: n(te).PreferColumns,
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          paginator: {
            resource: "ls-web-items",
            resourceData: s.value
          },
          itemsContainerClass: n(c) < n(B).MD ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          },
          ...r.value.many,
          columns: f.value,
          header: w.value,
          createButton: V.value
        }), null, 16, ["modelValue"])) : W("", !0)
      ])) : W("", !0);
    };
  }
}), Ae = {
  key: 0,
  class: "lkt-admin-spa lkt-web-item-spa"
}, De = /* @__PURE__ */ P({
  __name: "LktWebItemSpa",
  props: {
    id: {},
    type: {},
    onCreateTo: {}
  },
  setup(i) {
    const e = R("lktAdminEnabled"), u = i, a = G(), o = ne(), s = l(a.params.type), m = l(a.params.id), g = l(!1), d = l(!1), r = l(["create"]), t = l(U.getWebItemSettings(s.value)), c = (p) => typeof t.value.itemGenerator == "function" ? t.value.itemGenerator(p) : {
      ...p
    }, f = l(c(a.query)), w = () => {
      typeof t.value.appHeaderSingle == "function" ? E(t.value.appHeaderSingle({ item: f.value })) : typeof t.value.appHeaderSingle == "object" && Object.keys(t.value.appHeaderSingle).length > 0 && E(t.value.appHeaderSingle);
    };
    O(a, (p) => {
      s.value = a.params.type, m.value = a.params.id, g.value = !1, d.value = !1, r.value = ["create"], t.value = U.getWebItemSettings(s.value), H(() => {
        f.value = c(a.query), H(() => {
          w(), H(() => g.value = !0);
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
          click: (A) => {
            var F, D, K, J;
            typeof ((D = (F = t.value.single.createButton) == null ? void 0 : F.events) == null ? void 0 : D.click) == "function" && ((J = (K = t.value.single.createButton) == null ? void 0 : K.events) == null || J.click(A)), u.onCreateTo && o.push({
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
          click: (A) => {
            var F, D, K, J;
            typeof ((D = (F = t.value.single.createAndNewButton) == null ? void 0 : F.events) == null ? void 0 : D.click) == "function" && ((J = (K = t.value.single.createAndNewButton) == null ? void 0 : K.events) == null || J.click(A)), o.push({
              path: `/admin/web-items/${s.value}/new`,
              query: {
                keepCreating: se()
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
        resourceData: { id: m },
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
    return ue(() => {
      H(() => {
        w();
      });
    }), (p, y) => {
      const A = $("lkt-item-crud"), F = $("lkt-loader");
      return n(e) ? (x(), L("section", Ae, [
        g.value ? (x(), N(A, j({
          key: 0,
          modelValue: f.value,
          "onUpdate:modelValue": y[0] || (y[0] = (D) => f.value = D),
          editing: d.value,
          "onUpdate:editing": y[1] || (y[1] = (D) => d.value = D),
          perms: r.value,
          "onUpdate:perms": y[2] || (y[2] = (D) => r.value = D)
        }, {
          readResource: "r-web-item",
          readData: { id: m.value },
          mode: m.value > 0 ? n(z).Update : n(z).Create,
          buttonNavVisibility: n(ae).Always,
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
  oe({
    url: "/translations",
    name: "ls-lkt-i18n",
    params: { property: { default: void 0 }, value: { default: void 0 }, type: { default: void 0 } },
    digToPerms: "perms",
    digToData: "results",
    mapData: (i) => i
  }), oe({
    url: "/translation/{id}",
    name: "r-i18n",
    params: { id: { default: void 0 }, type: { default: void 0 } },
    digToPerms: "perms",
    digToData: "item",
    mapData: (i) => i
  }), ve({
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
  }), ye({
    url: "/translation/{id}",
    name: "up-i18n",
    params: {
      id: { default: void 0 },
      type: { default: void 0 },
      property: { default: void 0 },
      valueData: { default: void 0 }
    },
    digToPerms: "perms"
  }), fe({
    url: "/translation/{id}",
    name: "rm-i18n",
    params: {
      id: { default: void 0 }
    },
    digToPerms: "perms",
    digToData: "item"
  });
}, Pe = {
  install: (i) => {
    i.component("lkt-admin-menu-button") === void 0 && i.component("lkt-admin-menu-button", ke), i.component("lkt-admin-menu") === void 0 && i.component("lkt-admin-menu", ge);
  }
}, S = (i, e) => {
}, Ve = (i) => {
  i.addRoute({ path: "/admin/web-pages/:type", name: "lkt-admin-pages", component: he, beforeEnter: S }), i.addRoute({ path: "/admin/web-pages/:type/:id", name: "lkt-admin-page", component: Te, beforeEnter: S }), i.addRoute({ path: "/admin/web-items/:type", name: "lkt-web-items", component: Be, beforeEnter: S }), i.addRoute({ path: "/admin/web-items/:type/:id", name: "lkt-web-item", component: De, beforeEnter: S, props: (e) => ({
    id: e.params.id,
    type: e.params.type,
    onCreateTo: e.query.onCreateTo ?? ""
  }) }), i.addRoute({ path: "/admin/i18n", name: "lkt-admin-translations", component: re, beforeEnter: S }), i.addRoute({ path: "/admin/i18n/:id", name: "lkt-admin-translation", component: ie, beforeEnter: S, props: (e) => ({
    onCreateTo: e.query.onCreateTo ?? ""
  }) }), i.addRoute({ path: "/admin/many-i18n", name: "lkt-admin-many-translations", component: re, beforeEnter: S, props: (e) => ({
    many: !0
  }) }), i.addRoute({ path: "/admin/many-i18n/:id", name: "lkt-admin-many-translation", component: ie, beforeEnter: S, props: (e) => ({
    many: !0,
    onCreateTo: e.query.onCreateTo ?? ""
  }) });
};
export {
  Pe as default,
  Ee as setupAdminTranslationsHttp,
  Ve as setupLktVueAdminRoutes
};

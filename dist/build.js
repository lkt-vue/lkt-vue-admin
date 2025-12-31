import { defineComponent as E, inject as M, resolveComponent as H, createBlock as N, createCommentVNode as W, unref as n, openBlock as C, mergeProps as j, isRef as ye, computed as k, createElementBlock as q, normalizeClass as fe, createVNode as te, ref as l, watch as O, nextTick as $, onMounted as de } from "vue";
import { ButtonType as R, WebPageController as ne, MenuEntryType as ee, WebItemsController as U, AppSize as B, FieldType as I, ColumnType as A, LktSettings as Z, TableRowType as le, TableType as L, ItemCrudButtonNavVisibility as re, ItemCrudMode as z, FormInstance as X, LktTranslationType as Q, FieldAutoValidationTrigger as ae, AnchorType as ke, TablePermission as ge, MultipleOptionsDisplay as ie } from "lkt-vue-kernel";
import { useRoute as G, useRouter as oe } from "vue-router";
import { updateMainHeader as S } from "lkt-vue-app";
import { time as pe } from "lkt-date-tools";
import { createHTTPGetResource as Y, createHTTPPostResource as me, createHTTPPutResource as ce, createHTTPDeleteResource as ve } from "lkt-http-client";
const be = /* @__PURE__ */ E({
  __name: "LktAdminMenuButton",
  setup(r) {
    const e = M("adminMenu"), u = M("lktAdminEnabled");
    return (a, o) => {
      const s = H("lkt-button");
      return n(u) ? (C(), N(s, j({
        key: 0,
        checked: n(e),
        "onUpdate:checked": o[0] || (o[0] = (c) => ye(e) ? e.value = c : null)
      }, {
        type: n(R).HiddenSwitch,
        icon: "lkt-icn-lkt",
        class: "lkt-admin-button"
      }), null, 16, ["checked"])) : W("", !0);
    };
  }
}), he = /* @__PURE__ */ E({
  __name: "LktAdminMenu",
  setup(r) {
    const e = M("adminMenu"), u = k(() => {
      let a = [];
      return ne.hasDefaultPageEnabled() && a.push({
        key: "web-pages",
        type: ee.Entry,
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
      }), ne.getPages().forEach((o) => {
        a.push({
          key: o.code,
          type: ee.Entry,
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
          type: ee.Entry,
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
          type: ee.Entry,
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
      return C(), q("div", {
        class: fe(["lkt-admin-menu", n(e) ? "is-opened" : ""])
      }, [
        te(s, {
          "model-value": u.value,
          onClickOutside: o[0] || (o[0] = (c) => e.value = !1)
        }, null, 8, ["model-value"])
      ], 2);
    };
  }
}), Te = { class: "lkt-admin-spa lkt-admin-pages" }, _e = /* @__PURE__ */ E({
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
    g || (g = l(B.MD));
    const d = k(() => [
      {
        type: A.Field,
        key: "name",
        label: "__:common.column.name",
        isForAccordionHeader: !0,
        field: {
          type: I.Text,
          icon: "lkt-icn-webpage"
        }
      },
      {
        type: A.Button,
        key: "details",
        label: "Details",
        button: {
          ...Z.defaultDetailsButton,
          type: R.Anchor,
          anchor: {
            to: (t) => `/admin/web-pages/${u.value}/${t.id}`
          }
        }
      }
    ]), i = k(() => {
      let t = "Web Pages";
      return ne.getPages().forEach((m) => {
        if (m.id == u.value) {
          t = m.label ?? "Web Pages";
          return;
        }
      }), t;
    });
    return (t, m) => {
      const f = H("lkt-table");
      return C(), q("section", Te, [
        te(f, j({
          ref_key: "spaRef",
          ref: c,
          modelValue: s.value,
          "onUpdate:modelValue": m[0] || (m[0] = (w) => s.value = w)
        }, {
          type: n(g) < n(B).MD ? n(L).Accordion : n(L).Table,
          rowDisplayType: n(le).PreferColumns,
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
}), we = { class: "lkt-admin-spa" }, Ce = /* @__PURE__ */ E({
  __name: "LktAdminPageSpa",
  setup(r) {
    const e = G(), u = oe(), a = l(e.params.type), o = l(e.params.id);
    O(e, (g) => {
      a.value = e.params.type, o.value = e.params.id;
    }, { flush: "pre", immediate: !0, deep: !0 });
    const s = l({}), c = (g) => `/admin/web-pages/${a.value}/${g}`;
    return (g, d) => {
      const i = H("lkt-web-page");
      return C(), q("section", we, [
        te(i, {
          modelValue: s.value,
          "onUpdate:modelValue": d[0] || (d[0] = (t) => s.value = t),
          "crud-config": {
            readResource: "r-web-page",
            readData: {
              id: o.value
            },
            mode: o.value > 0 ? n(z).Update : n(z).Create,
            buttonNavVisibility: n(re).Always,
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
}), Be = {
  key: 0,
  class: "lkt-admin-spa lkt-admin-translations"
}, ue = /* @__PURE__ */ E({
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
      var v, b, _;
      typeof d.value > "u" || (typeof ((v = d.value) == null ? void 0 : v.appHeaderMany) == "function" ? S(d.value.appHeaderMany({ item: item.value })) : typeof ((b = d.value) == null ? void 0 : b.appHeaderMany) == "object" && Object.keys((_ = d.value) == null ? void 0 : _.appHeaderMany).length > 0 && S(d.value.appHeaderMany));
    };
    O(a, (v) => {
      o.value = a.params.id, $(() => {
        t();
      });
    }, { flush: "pre", immediate: !0, deep: !0 });
    let m = M("lktAppSize");
    m || (m = l(B.MD));
    const f = k(() => {
      let v = [
        {
          type: A.Field,
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
        type: A.Field,
        key: "value",
        label: "Value",
        ensureFieldLabel: m.value < B.MD,
        field: {
          type: "prop:type",
          readModeConfig: {
            textMaxLength: 10
          }
        }
      }), v.push({
        type: A.Button,
        key: "details",
        label: "Details",
        button: {
          ...Z.defaultDetailsButton,
          type: R.Anchor,
          anchor: {
            to: (b) => `/admin/${i.value}/${b.id}`
          }
        }
      }), v;
    }), w = k(() => {
      var b, _, h;
      return typeof ((b = d.value) == null ? void 0 : b.appHeaderMany) < "u" ? {} : {
        text: ((_ = d.value) == null ? void 0 : _.labelMany) ?? "",
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
      const _ = H("lkt-table");
      return n(e) ? (C(), q("section", Be, [
        te(_, j({
          ref_key: "spaRef",
          ref: g,
          modelValue: c.value,
          "onUpdate:modelValue": b[0] || (b[0] = (h) => c.value = h)
        }, {
          type: n(m) < n(B).MD ? n(L).Accordion : n(L).Table,
          rowDisplayType: n(le).PreferColumns,
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
          itemsContainerClass: n(m) < n(B).MD ? "lkt-grid-1 xs-grid-style" : "",
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
}), De = {
  key: 0,
  class: "lkt-admin-spa"
}, se = /* @__PURE__ */ E({
  __name: "LktAdminTranslationSpa",
  props: {
    onCreateTo: {},
    many: { type: Boolean, default: !1 }
  },
  setup(r) {
    const e = r, u = M("lktAdminEnabled");
    u.value || (window.location.href = "/");
    const a = G(), o = oe(), s = l(parseInt(a.params.id)), c = l(!1), g = l(!1), d = l(["create", "switch-edit-mode"]);
    let i = M("lktAppSize");
    i || (i = l(B.MD));
    const t = l(U.getWebItemSettings(e.many ? "lkt-many-i18n" : "lkt-i18n")), m = k(() => e.many && !a.query.parentId), f = l({
      property: "",
      type: m.value ? Q.Many : Q.Text,
      value: "",
      parentId: 0,
      valueData: {},
      children: [],
      ...a.query
    }), w = k(() => e.many ? "many-i18n" : "i18n"), V = () => {
      var h, T, p;
      typeof t.value > "u" || (typeof ((h = t.value) == null ? void 0 : h.appHeaderSingle) == "function" ? S(t.value.appHeaderSingle({ item: f.value })) : typeof ((T = t.value) == null ? void 0 : T.appHeaderSingle) == "object" && Object.keys((p = t.value) == null ? void 0 : p.appHeaderSingle).length > 0 && S(t.value.appHeaderSingle));
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
            trigger: ae.Blur
          }
        }),
        X.mkFieldItemConfig("type", {
          type: I.Select,
          mandatory: !0,
          label: "Type",
          options: [Q.Text, Q.Textarea, Q.Many],
          optionsConfig: {
            filter: (T) => T.value === "many" ? m.value && !f.value.parentId : !0
          },
          readMode: m.value && !f.value.parentId,
          validation: {
            trigger: ae.Blur
          }
        }, {}, { canRender: !0 }),
        X.mkFieldItemConfig("valueData", {
          type: f.value.type,
          mandatory: !0,
          canI18n: !0,
          label: "Value",
          validation: {
            trigger: ae.Blur
          }
        }, {}, { canRender: f.value.type !== "many" }),
        X.mkFieldItemConfig("children", {
          type: I.Table,
          multiple: !0,
          options: "prop:children",
          optionValueType: "option",
          searchable: !1,
          multipleDisplay: ie.Table,
          multipleDisplayEdition: ie.Table,
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
              perms: [ge.Create],
              requiredItemsForTopCreate: 999,
              columns: [
                {
                  key: "property",
                  label: "Property",
                  type: A.Field,
                  field: {
                    type: I.Text,
                    icon: "lkt-icn-lang-picker"
                  }
                },
                {
                  key: "valueData",
                  label: "Value",
                  type: A.Field,
                  ensureFieldLabel: i.value < B.MD,
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
                  type: A.Button,
                  button: {
                    ...Z.defaultDetailsButton,
                    type: R.Anchor,
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
                  type: ke.RouterLink,
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
      var T, p, y;
      return typeof ((T = t.value) == null ? void 0 : T.appHeaderSingle) < "u" ? {} : {
        text: ((p = t.value) == null ? void 0 : p.labelSingle) ?? "",
        icon: ((y = t.value) == null ? void 0 : y.icon) ?? "lkt-icn-lang-picker",
        tag: "h1"
      };
    }), _ = k(() => ({
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
      buttonNavVisibility: re.Always,
      createButton: {
        resource: "mk-i18n",
        icon: "lkt-icn-save",
        text: "Create",
        events: {
          click: (h) => {
            var T;
            e.onCreateTo ? o.push({
              path: e.onCreateTo,
              replace: !0
            }) : o.push({
              path: `/admin/${w.value}/${(T = h.httpResponse) == null ? void 0 : T.autoReloadId}`,
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
                keepCreating: pe()
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
    return (h, T) => {
      const p = H("lkt-item-crud"), y = H("lkt-loader");
      return n(u) ? (C(), q("section", De, [
        g.value ? (C(), N(p, j({
          key: 0,
          modelValue: f.value,
          "onUpdate:modelValue": T[0] || (T[0] = (D) => f.value = D),
          editing: c.value,
          "onUpdate:editing": T[1] || (T[1] = (D) => c.value = D),
          perms: d.value,
          "onUpdate:perms": T[2] || (T[2] = (D) => d.value = D)
        }, _.value), null, 16, ["modelValue", "editing", "perms"])) : (C(), N(y, { key: 1 }))
      ])) : W("", !0);
    };
  }
}), xe = {
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
    m || (m = l(B.MD));
    const f = k(() => i.value.many.columns ? [
      ...i.value.many.columns,
      {
        type: A.Button,
        key: "details",
        label: "Details",
        button: {
          ...Z.defaultDetailsButton,
          type: R.Anchor,
          anchor: {
            to: (v) => `/admin/web-items/${a.value}/${v.id}`
          }
        }
      }
    ] : [
      {
        type: A.Field,
        key: "name",
        label: "Name",
        isForAccordionHeader: !0,
        field: {
          type: I.Text,
          icon: i.value.icon
        }
      },
      {
        type: A.Button,
        key: "details",
        label: "Details",
        button: {
          ...Z.defaultDetailsButton,
          type: R.Anchor,
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
      var v, b, _;
      return ((b = (v = i.value) == null ? void 0 : v.many) == null ? void 0 : b.createButton) === !1 ? !1 : {
        icon: "lkt-icn-more",
        text: "Add web item",
        type: R.Anchor,
        anchor: {
          to: `/admin/web-items/${a.value}/new`
        },
        //@ts-ignore
        ...(_ = i.value.many) == null ? void 0 : _.createButton
      };
    });
    return de(() => {
      d.value = !0;
    }), (v, b) => {
      const _ = H("lkt-table");
      return n(e) ? (C(), q("section", xe, [
        d.value ? (C(), N(_, j({
          key: 0,
          ref_key: "spaRef",
          ref: g,
          modelValue: c.value,
          "onUpdate:modelValue": b[0] || (b[0] = (h) => c.value = h)
        }, {
          type: n(m) < n(B).MD ? n(L).Accordion : n(L).Table,
          rowDisplayType: n(le).PreferColumns,
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          paginator: {
            resource: "ls-web-items",
            resourceData: s.value
          },
          itemsContainerClass: n(m) < n(B).MD ? "lkt-grid-1 xs-grid-style" : "",
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
}), Me = {
  key: 0,
  class: "lkt-admin-spa lkt-web-item-spa"
}, Re = /* @__PURE__ */ E({
  __name: "LktWebItemSpa",
  props: {
    id: {},
    type: {},
    onCreateTo: {}
  },
  setup(r) {
    const e = M("lktAdminEnabled"), u = r, a = G(), o = oe(), s = l(a.params.type), c = l(a.params.id), g = l(!1), d = l(!1), i = l(["create"]), t = l(U.getWebItemSettings(s.value)), m = (p) => typeof t.value.itemGenerator == "function" ? t.value.itemGenerator(p) : {
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
            var F, x, K, J;
            typeof ((x = (F = t.value.single.createButton) == null ? void 0 : F.events) == null ? void 0 : x.click) == "function" && ((J = (K = t.value.single.createButton) == null ? void 0 : K.events) == null || J.click(D)), u.onCreateTo && o.push({
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
            var F, x, K, J;
            typeof ((x = (F = t.value.single.createAndNewButton) == null ? void 0 : F.events) == null ? void 0 : x.click) == "function" && ((J = (K = t.value.single.createAndNewButton) == null ? void 0 : K.events) == null || J.click(D)), o.push({
              path: `/admin/web-items/${s.value}/new`,
              query: {
                keepCreating: pe()
              },
              replace: !0
            });
          }
        }
      };
    }), _ = k(() => {
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
    }), T = (p) => `/admin/web-items/${s.value}/${p}`;
    return de(() => {
      $(() => {
        w();
      });
    }), (p, y) => {
      const D = H("lkt-item-crud"), F = H("lkt-loader");
      return n(e) ? (C(), q("section", Me, [
        g.value ? (C(), N(D, j({
          key: 0,
          modelValue: f.value,
          "onUpdate:modelValue": y[0] || (y[0] = (x) => f.value = x),
          editing: d.value,
          "onUpdate:editing": y[1] || (y[1] = (x) => d.value = x),
          perms: i.value,
          "onUpdate:perms": y[2] || (y[2] = (x) => i.value = x)
        }, {
          readResource: "r-web-item",
          readData: { id: c.value },
          mode: c.value > 0 ? n(z).Update : n(z).Create,
          buttonNavVisibility: n(re).Always,
          redirectOnCreate: T,
          ...t.value.single,
          header: V.value,
          createButton: v.value,
          createAndNewButton: b.value,
          updateButton: _.value,
          dropButton: h.value
        }), null, 16, ["modelValue", "editing", "perms"])) : (C(), N(F, { key: 1 }))
      ])) : W("", !0);
    };
  }
}), Ve = () => {
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
  }), ve({
    url: "/translation/{id}",
    name: "rm-i18n",
    params: {
      id: { default: void 0 }
    },
    digToPerms: "perms",
    digToData: "item"
  });
}, Fe = () => {
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
  }), me({
    url: "/user/role",
    name: "mk-user-role",
    params: {
      name: { default: void 0 },
      permissions: { default: void 0 }
    },
    digToPerms: "perms",
    digToAutoReloadId: "item.id"
  }), ce({
    url: "/user/role/{id}",
    name: "up-user-role",
    params: {
      id: { default: void 0 },
      name: { default: void 0 },
      permissions: { default: void 0 }
    },
    digToPerms: "perms"
  }), ve({
    url: "/user/role/{id}",
    name: "rm-user-role",
    params: {
      id: { default: void 0 }
    },
    digToPerms: "perms",
    digToData: "item"
  });
}, Ue = {
  install: (r) => {
    r.component("lkt-admin-menu-button") === void 0 && r.component("lkt-admin-menu-button", be), r.component("lkt-admin-menu") === void 0 && r.component("lkt-admin-menu", he);
  }
}, P = (r, e) => {
}, Le = (r) => {
  r.addRoute({ path: "/admin/web-pages/:type", name: "lkt-admin-pages", component: _e, beforeEnter: P }), r.addRoute({ path: "/admin/web-pages/:type/:id", name: "lkt-admin-page", component: Ce, beforeEnter: P }), r.addRoute({ path: "/admin/web-items/:type", name: "lkt-web-items", component: Ae, beforeEnter: P }), r.addRoute({ path: "/admin/web-items/:type/:id", name: "lkt-web-item", component: Re, beforeEnter: P, props: (e) => ({
    id: e.params.id,
    type: e.params.type,
    onCreateTo: e.query.onCreateTo ?? ""
  }) }), r.addRoute({ path: "/admin/i18n", name: "lkt-admin-translations", component: ue, beforeEnter: P }), r.addRoute({ path: "/admin/i18n/:id", name: "lkt-admin-translation", component: se, beforeEnter: P, props: (e) => ({
    onCreateTo: e.query.onCreateTo ?? ""
  }) }), r.addRoute({ path: "/admin/many-i18n", name: "lkt-admin-many-translations", component: ue, beforeEnter: P, props: (e) => ({
    many: !0
  }) }), r.addRoute({ path: "/admin/many-i18n/:id", name: "lkt-admin-many-translation", component: se, beforeEnter: P, props: (e) => ({
    many: !0,
    onCreateTo: e.query.onCreateTo ?? ""
  }) });
};
export {
  Ue as default,
  Ve as setupAdminTranslationsHttp,
  Fe as setupAdminUserRoleHttp,
  Le as setupLktVueAdminRoutes
};

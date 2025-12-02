import { defineComponent as E, inject as M, resolveComponent as H, createBlock as L, createCommentVNode as N, unref as l, openBlock as h, mergeProps as W, isRef as ue, computed as g, createElementBlock as F, normalizeClass as se, createVNode as Y, ref as o, watch as j, nextTick as R, onMounted as re } from "vue";
import { ButtonType as D, WebPageController as ee, MenuEntryType as X, WebItemsController as I, AppSize as B, FieldType as _, ColumnType as A, TableRowType as te, TableType as P, ItemCrudButtonNavVisibility as ae, ItemCrudMode as q, FormInstance as Q, FieldAutoValidationTrigger as Z, AnchorType as de, MultipleOptionsDisplay as le } from "lkt-vue-kernel";
import { useRoute as z, useRouter as ne } from "vue-router";
import { updateMainHeader as S } from "lkt-vue-app";
import { time as ie } from "lkt-date-tools";
import { createHTTPGetResource as oe, createHTTPPostResource as pe, createHTTPPutResource as ce, createHTTPDeleteResource as me } from "lkt-http-client";
const ve = /* @__PURE__ */ E({
  __name: "LktAdminMenuButton",
  setup(p) {
    const t = M("adminMenu"), u = M("lktAdminEnabled");
    return (n, r) => {
      const i = H("lkt-button");
      return l(u) ? (h(), L(i, W({
        key: 0,
        checked: l(t),
        "onUpdate:checked": r[0] || (r[0] = (c) => ue(t) ? t.value = c : null)
      }, {
        type: l(D).HiddenSwitch,
        icon: "lkt-icn-lkt",
        class: "lkt-admin-button"
      }), null, 16, ["checked"])) : N("", !0);
    };
  }
}), ye = /* @__PURE__ */ E({
  __name: "LktAdminMenu",
  setup(p) {
    const t = M("adminMenu"), u = g(() => {
      let n = [];
      return ee.hasDefaultPageEnabled() && n.push({
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
        n.push({
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
      }), I.getItems().forEach((r) => {
        r.many !== !1 && n.push({
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
      }), n.push(
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
      ), n;
    });
    return (n, r) => {
      const i = H("lkt-menu");
      return h(), F("div", {
        class: se(["lkt-admin-menu", l(t) ? "is-opened" : ""])
      }, [
        Y(i, {
          "model-value": u.value,
          onClickOutside: r[0] || (r[0] = (c) => t.value = !1)
        }, null, 8, ["model-value"])
      ], 2);
    };
  }
}), fe = { class: "lkt-admin-spa lkt-admin-pages" }, ke = /* @__PURE__ */ E({
  __name: "LktAdminPagesSpa",
  setup(p) {
    const t = z(), u = o(t.params.type), n = o(t.params.id), r = o({
      name: "",
      type: u.value
    }), i = o([]), c = o(null);
    j(t, (e) => {
      u.value = t.params.type, n.value = t.params.id, r.value.type = u.value;
    }, { flush: "pre", immediate: !0, deep: !0 });
    let d = M("lktAppSize");
    d || (d = o(B.MD));
    const v = g(() => [
      {
        type: A.Field,
        key: "name",
        label: "__:common.column.name",
        isForAccordionHeader: !0,
        field: {
          type: _.Text,
          icon: "lkt-icn-webpage"
        }
      },
      {
        type: A.Button,
        key: "details",
        label: "Details",
        button: {
          type: D.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (e) => `/admin/web-pages/${u.value}/${e.id}`
          }
        }
      }
    ]), a = g(() => {
      let e = "Web Pages";
      return ee.getPages().forEach((k) => {
        if (k.id == u.value) {
          e = k.label ?? "Web Pages";
          return;
        }
      }), e;
    });
    return (e, k) => {
      const T = H("lkt-table");
      return h(), F("section", fe, [
        Y(T, W({
          ref_key: "spaRef",
          ref: c,
          modelValue: i.value,
          "onUpdate:modelValue": k[0] || (k[0] = (b) => i.value = b)
        }, {
          type: l(d) < l(B).MD ? l(P).Accordion : l(P).Table,
          rowDisplayType: l(te).PreferColumns,
          title: a.value,
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
            type: l(D).Anchor,
            anchor: {
              to: `/admin/web-pages/${u.value}/0`
            }
          },
          itemsContainerClass: l(d) < l(B).MD ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          }
        }), null, 16, ["modelValue"])
      ]);
    };
  }
}), ge = { class: "lkt-admin-spa" }, be = /* @__PURE__ */ E({
  __name: "LktAdminPageSpa",
  setup(p) {
    const t = z(), u = ne(), n = o(t.params.type), r = o(t.params.id);
    j(t, (d) => {
      n.value = t.params.type, r.value = t.params.id;
    }, { flush: "pre", immediate: !0, deep: !0 });
    const i = o({}), c = (d) => `/admin/web-pages/${n.value}/${d}`;
    return (d, v) => {
      const a = H("lkt-web-page");
      return h(), F("section", ge, [
        Y(a, {
          modelValue: i.value,
          "onUpdate:modelValue": v[0] || (v[0] = (e) => i.value = e),
          "crud-config": {
            readResource: "r-web-page",
            readData: {
              id: r.value
            },
            mode: r.value > 0 ? l(q).Update : l(q).Create,
            buttonNavVisibility: l(ae).Always,
            editing: !0,
            perms: ["update"],
            createButton: {
              resource: "mk-web-page",
              resourceData: { ...i.value, type: n.value },
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
                  l(u).back();
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
}), _e = {
  key: 0,
  class: "lkt-admin-spa lkt-admin-translations"
}, he = /* @__PURE__ */ E({
  __name: "LktAdminTranslationsSpa",
  setup(p) {
    const t = M("lktAdminEnabled");
    t.value || (window.location.href = "/");
    const u = z(), n = o(u.params.id), r = o({
      property: "",
      value: ""
    }), i = o([]), c = o(null), d = o(I.getWebItemSettings("lkt-i18n")), v = () => {
      var b, w, s;
      typeof ((b = d.value) == null ? void 0 : b.appHeaderMany) == "function" ? S(d.value.appHeaderMany({ item: item.value })) : typeof ((w = d.value) == null ? void 0 : w.appHeaderMany) == "object" && Object.keys((s = d.value) == null ? void 0 : s.appHeaderMany).length > 0 && S(d.value.appHeaderMany);
    };
    j(u, (b) => {
      n.value = u.params.id, R(() => {
        v();
      });
    }, { flush: "pre", immediate: !0, deep: !0 });
    let a = M("lktAppSize");
    a || (a = o(B.MD));
    const e = g(() => [
      {
        type: A.Field,
        key: "property",
        label: "Property",
        isForAccordionHeader: !0,
        field: {
          type: _.Text,
          icon: "lkt-icn-lang-picker"
        }
      },
      {
        type: A.Field,
        key: "type",
        label: "Type",
        ensureFieldLabel: a.value < B.MD,
        field: {
          type: _.Select,
          options: [_.Text, _.Textarea]
        }
      },
      {
        type: A.Field,
        key: "value",
        label: "Value",
        ensureFieldLabel: a.value < B.MD,
        field: {
          type: "prop:type",
          readModeConfig: {
            textMaxLength: 10
          }
        }
      },
      {
        type: A.Button,
        key: "details",
        label: "Details",
        button: {
          type: D.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (b) => `/admin/i18n/${b.id}`
          }
        }
      }
    ]), k = g(() => typeof d.value.appHeaderMany < "u" ? {} : {
      text: d.value.labelMany ?? "",
      icon: d.value.icon,
      tag: "h1"
    }), T = g(() => ({
      header: {
        text: "Filters",
        tag: "h2"
      },
      items: [
        Q.mkFieldItemConfig("property", {
          type: _.Text,
          label: "Property"
        })
        // FormInstance.mkFieldItemConfig('value', {
        //     type: FieldType.Text,
        //     label: 'Value',
        // }),
      ]
    }));
    return (b, w) => {
      const s = H("lkt-table");
      return l(t) ? (h(), F("section", _e, [
        Y(s, W({
          ref_key: "spaRef",
          ref: c,
          modelValue: i.value,
          "onUpdate:modelValue": w[0] || (w[0] = (m) => i.value = m)
        }, {
          type: l(a) < l(B).MD ? l(P).Accordion : l(P).Table,
          rowDisplayType: l(te).PreferColumns,
          header: k.value,
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          columns: e.value,
          paginator: {
            resource: "ls-lkt-i18n",
            resourceData: r.value
          },
          createButton: {
            icon: "lkt-icn-more",
            text: "Add translation",
            type: l(D).Anchor,
            anchor: {
              to: "/admin/i18n/new"
            }
          },
          itemsContainerClass: l(a) < l(B).MD ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          },
          filtersForm: T.value
        }), null, 16, ["modelValue"])
      ])) : N("", !0);
    };
  }
}), Te = {
  key: 0,
  class: "lkt-admin-spa"
}, we = /* @__PURE__ */ E({
  __name: "LktAdminTranslationSpa",
  props: {
    onCreateTo: {}
  },
  setup(p) {
    const t = p;
    console.log("i18n props: ", t);
    const u = M("lktAdminEnabled");
    u.value || (window.location.href = "/");
    const n = z(), r = ne(), i = o(parseInt(n.params.id)), c = o(!1), d = o(!1), v = o(["create", "switch-edit-mode"]), a = o(I.getWebItemSettings("lkt-i18n")), e = o({
      property: "",
      type: _.Text,
      value: "",
      valueData: {},
      children: [],
      ...n.query
    }), k = () => {
      var s, m, x;
      typeof ((s = a.value) == null ? void 0 : s.appHeaderSingle) == "function" ? S(a.value.appHeaderSingle({ item: e.value })) : typeof ((m = a.value) == null ? void 0 : m.appHeaderSingle) == "object" && Object.keys((x = a.value) == null ? void 0 : x.appHeaderSingle).length > 0 && S(a.value.appHeaderSingle);
    };
    j(n, (s) => {
      i.value = parseInt(n.params.id), d.value = !1, c.value = !1, e.value = {
        property: "",
        type: _.Text,
        value: "",
        valueData: {},
        children: [],
        ...n.query
      }, v.value = ["create", "switch-edit-mode"], R(() => {
        k(), R(() => d.value = !0);
      });
    }, { flush: "pre", immediate: !0, deep: !0 });
    const T = g(() => (s) => ({
      items: [
        Q.mkFieldItemConfig("property", {
          type: _.Text,
          label: "Property",
          mandatory: !0,
          validation: {
            trigger: Z.Blur
          }
        }),
        Q.mkFieldItemConfig("type", {
          type: _.Select,
          mandatory: !0,
          label: "Type",
          options: [_.Text, _.Textarea, "many"],
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
          type: _.Table,
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
              to: "/admin/i18n/feed{value}"
            },
            zeroMeansEmpty: !0,
            table: {
              type: P.Table,
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
                  type: A.Field,
                  field: {
                    type: _.Text,
                    icon: "lkt-icn-lang-picker"
                  }
                },
                {
                  key: "details",
                  label: "Details",
                  type: A.Button,
                  button: {
                    type: D.Anchor,
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
            type: D.Anchor,
            anchor: {
              type: de.RouterLink,
              to: {
                path: "/admin/i18n/new",
                query: {
                  parentId: s.item.id,
                  onCreateTo: `/admin/i18n/${s.item.id}`
                }
              }
            }
          }
        }, {}, { canRender: e.value.id > 0 && e.value.type === "many" })
      ]
    })), b = g(() => typeof a.value.appHeaderSingle < "u" ? {} : {
      text: a.value.labelSingle ?? "",
      icon: a.value.icon ?? "lkt-icn-lang-picker",
      tag: "h1"
    }), w = g(() => ({
      // header: {
      //     text: id.value > 0 ? item.value.property : 'New translation',
      //     icon: 'lkt-icn-lang-picker',
      //     tag: 'h1'
      // },
      header: b.value,
      readResource: "r-i18n",
      readData: {
        id: i.value
      },
      mode: i.value > 0 ? q.Update : q.Create,
      form: T.value,
      buttonNavVisibility: ae.Always,
      createButton: {
        resource: "mk-i18n",
        icon: "lkt-icn-save",
        text: "Create",
        events: {
          click: (s) => {
            var m;
            t.onCreateTo ? r.push({
              path: t.onCreateTo,
              replace: !0
            }) : r.push({
              path: `/admin/i18n/${(m = s.httpResponse) == null ? void 0 : m.autoReloadId}`,
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
          click: (s) => {
            r.push({
              path: "/admin/i18n/new",
              query: {
                keepCreating: ie()
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
            r.back();
          }
        }
      }
      // redirectOnCreate,
    }));
    return (s, m) => {
      const x = H("lkt-item-crud"), O = H("lkt-loader");
      return l(u) ? (h(), F("section", Te, [
        d.value ? (h(), L(x, W({
          key: 0,
          modelValue: e.value,
          "onUpdate:modelValue": m[0] || (m[0] = (V) => e.value = V),
          editing: c.value,
          "onUpdate:editing": m[1] || (m[1] = (V) => c.value = V),
          perms: v.value,
          "onUpdate:perms": m[2] || (m[2] = (V) => v.value = V)
        }, w.value), null, 16, ["modelValue", "editing", "perms"])) : (h(), L(O, { key: 1 }))
      ])) : N("", !0);
    };
  }
}), xe = {
  key: 0,
  class: "lkt-admin-spa lkt-web-items"
}, Ce = /* @__PURE__ */ E({
  __name: "LktWebItemsSpa",
  setup(p) {
    const t = M("lktAdminEnabled");
    t.value || (window.location.href = "/");
    const u = z(), n = o(u.params.type), r = o(u.params.id), i = o({
      name: "",
      type: n.value
    }), c = o([]), d = o(null), v = o(!1), a = o(I.getWebItemSettings(n.value)), e = () => {
      typeof a.value.appHeaderMany == "function" ? S(a.value.appHeaderMany({ item: item.value })) : typeof a.value.appHeaderMany == "object" && Object.keys(a.value.appHeaderMany).length > 0 && S(a.value.appHeaderMany);
    };
    j(u, (s) => {
      n.value = u.params.type, r.value = u.params.id, c.value.splice(0, c.value.length), v.value = !1, i.value.type = n.value, a.value = I.getWebItemSettings(n.value), R(() => {
        e(), R(() => v.value = !0);
      });
    }, { flush: "pre", immediate: !0, deep: !0 });
    let k = M("lktAppSize");
    k || (k = o(B.MD));
    const T = g(() => a.value.many.columns ? [
      ...a.value.many.columns,
      {
        type: A.Button,
        key: "details",
        label: "Details",
        button: {
          type: D.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (s) => `/admin/web-items/${n.value}/${s.id}`
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
          type: _.Text,
          icon: a.value.icon
        }
      },
      {
        type: A.Button,
        key: "details",
        label: "Details",
        button: {
          type: D.Anchor,
          text: "Details",
          icon: "lkt-icn-expand",
          anchor: {
            to: (s) => `/admin/web-items/${n.value}/${s.id}`
          }
        }
      }
    ]), b = g(() => typeof a.value.appHeaderMany < "u" ? {} : {
      text: a.value.labelMany ?? "",
      icon: a.value.icon,
      tag: "h1"
    }), w = g(() => {
      var s, m, x;
      return ((m = (s = a.value) == null ? void 0 : s.many) == null ? void 0 : m.createButton) === !1 ? !1 : {
        icon: "lkt-icn-more",
        text: "Add web item",
        type: D.Anchor,
        anchor: {
          to: `/admin/web-items/${n.value}/new`
        },
        //@ts-ignore
        ...(x = a.value.many) == null ? void 0 : x.createButton
      };
    });
    return re(() => {
      v.value = !0;
    }), (s, m) => {
      const x = H("lkt-table");
      return l(t) ? (h(), F("section", xe, [
        v.value ? (h(), L(x, W({
          key: 0,
          ref_key: "spaRef",
          ref: d,
          modelValue: c.value,
          "onUpdate:modelValue": m[0] || (m[0] = (O) => c.value = O)
        }, {
          type: l(k) < l(B).MD ? l(P).Accordion : l(P).Table,
          rowDisplayType: l(te).PreferColumns,
          editMode: !0,
          requiredItemsForBottomCreate: 99,
          paginator: {
            resource: "ls-web-items",
            resourceData: i.value
          },
          itemsContainerClass: l(k) < l(B).MD ? "lkt-grid-1 xs-grid-style" : "",
          accordion: {
            contentClass: "lkt-flex-column",
            toggleIconAtEnd: !0,
            iconRotation: "180"
          },
          ...a.value.many,
          columns: T.value,
          header: b.value,
          createButton: w.value
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
  setup(p) {
    const t = M("lktAdminEnabled"), u = p, n = z(), r = ne(), i = o(n.params.type), c = o(n.params.id), d = o(!1), v = o(!1), a = o(["create"]), e = o(I.getWebItemSettings(i.value)), k = (y) => typeof e.value.itemGenerator == "function" ? e.value.itemGenerator(y) : {
      ...y
    }, T = o(k(n.query)), b = () => {
      typeof e.value.appHeaderSingle == "function" ? S(e.value.appHeaderSingle({ item: T.value })) : typeof e.value.appHeaderSingle == "object" && Object.keys(e.value.appHeaderSingle).length > 0 && S(e.value.appHeaderSingle);
    };
    j(n, (y) => {
      i.value = n.params.type, c.value = n.params.id, d.value = !1, v.value = !1, a.value = ["create"], e.value = I.getWebItemSettings(i.value), R(() => {
        T.value = k(n.query), R(() => {
          b(), R(() => d.value = !0);
        });
      });
    }, { flush: "pre", immediate: !0, deep: !0 });
    const w = g(() => typeof e.value.appHeaderSingle < "u" ? {} : {
      text: e.value.labelSingle ?? "",
      icon: e.value.icon,
      tag: "h1"
    }), s = g(() => {
      var y, f;
      return ((f = (y = e.value) == null ? void 0 : y.single) == null ? void 0 : f.createButton) === !1 ? !1 : {
        resource: "mk-web-item",
        icon: "lkt-icn-save",
        text: "Create",
        ...e.value.single.createButton,
        events: {
          click: (G) => {
            var $, C, K, J;
            typeof ((C = ($ = e.value.single.createButton) == null ? void 0 : $.events) == null ? void 0 : C.click) == "function" && ((J = (K = e.value.single.createButton) == null ? void 0 : K.events) == null || J.click(G)), u.onCreateTo && r.push({
              path: u.onCreateTo,
              replace: !0
            });
          }
        }
      };
    }), m = g(() => {
      var y, f;
      return ((f = (y = e.value) == null ? void 0 : y.single) == null ? void 0 : f.createButton) === !1 ? !1 : {
        resource: "mk-web-item",
        icon: "lkt-icn-save",
        text: "Create",
        ...e.value.single.createAndNewButton,
        events: {
          click: (G) => {
            var $, C, K, J;
            typeof ((C = ($ = e.value.single.createAndNewButton) == null ? void 0 : $.events) == null ? void 0 : C.click) == "function" && ((J = (K = e.value.single.createAndNewButton) == null ? void 0 : K.events) == null || J.click(G)), r.push({
              path: `/admin/web-items/${i.value}/new`,
              query: {
                keepCreating: ie()
              },
              replace: !0
            });
          }
        }
      };
    }), x = g(() => {
      var y, f;
      return ((f = (y = e.value) == null ? void 0 : y.single) == null ? void 0 : f.updateButton) === !1 ? !1 : {
        resource: "up-web-item",
        icon: "lkt-icn-save",
        text: "Update",
        ...e.value.single.updateButton
      };
    }), O = g(() => {
      var y, f;
      return ((f = (y = e.value) == null ? void 0 : y.single) == null ? void 0 : f.dropButton) === !1 ? !1 : {
        resource: "rm-web-item",
        resourceData: { id: c },
        icon: "lkt-icn-trash",
        text: "Remove",
        events: {
          click: () => {
            r.back();
          }
        },
        ...e.value.single.dropButton
      };
    }), V = (y) => `/admin/web-items/${i.value}/${y}`;
    return re(() => {
      R(() => {
        b();
      });
    }), (y, f) => {
      const G = H("lkt-item-crud"), $ = H("lkt-loader");
      return l(t) ? (h(), F("section", Be, [
        d.value ? (h(), L(G, W({
          key: 0,
          modelValue: T.value,
          "onUpdate:modelValue": f[0] || (f[0] = (C) => T.value = C),
          editing: v.value,
          "onUpdate:editing": f[1] || (f[1] = (C) => v.value = C),
          perms: a.value,
          "onUpdate:perms": f[2] || (f[2] = (C) => a.value = C)
        }, {
          readResource: "r-web-item",
          readData: { id: c.value },
          mode: c.value > 0 ? l(q).Update : l(q).Create,
          buttonNavVisibility: l(ae).Always,
          redirectOnCreate: V,
          ...e.value.single,
          header: w.value,
          createButton: s.value,
          createAndNewButton: m.value,
          updateButton: x.value,
          dropButton: O.value
        }), null, 16, ["modelValue", "editing", "perms"])) : (h(), L($, { key: 1 }))
      ])) : N("", !0);
    };
  }
}), Ve = () => {
  oe({
    url: "/translations",
    name: "ls-lkt-i18n",
    params: { property: { default: void 0 }, value: { default: void 0 } },
    digToPerms: "perms",
    digToData: "results",
    mapData: (p) => p
  }), oe({
    url: "/translation/{id}",
    name: "r-i18n",
    params: { id: { default: void 0 } },
    digToPerms: "perms",
    digToData: "item",
    mapData: (p) => p
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
}, $e = {
  install: (p) => {
    p.component("lkt-admin-menu-button") === void 0 && p.component("lkt-admin-menu-button", ve), p.component("lkt-admin-menu") === void 0 && p.component("lkt-admin-menu", ye);
  }
}, U = (p, t) => {
}, Ie = (p) => {
  p.addRoute({ path: "/admin/web-pages/:type", name: "lkt-admin-pages", component: ke, beforeEnter: U }), p.addRoute({ path: "/admin/web-pages/:type/:id", name: "lkt-admin-page", component: be, beforeEnter: U }), p.addRoute({ path: "/admin/web-items/:type", name: "lkt-web-items", component: Ce, beforeEnter: U }), p.addRoute({ path: "/admin/web-items/:type/:id", name: "lkt-web-item", component: Ae, beforeEnter: U, props: (t) => ({
    id: t.params.id,
    type: t.params.type,
    onCreateTo: t.query.onCreateTo ?? ""
  }) }), p.addRoute({ path: "/admin/i18n", name: "lkt-admin-translations", component: he, beforeEnter: U }), p.addRoute({ path: "/admin/i18n/:id", name: "lkt-admin-translation", component: we, beforeEnter: U, props: (t) => ({
    onCreateTo: t.query.onCreateTo ?? ""
  }) });
};
export {
  $e as default,
  Ve as setupAdminTranslationsHttp,
  Ie as setupLktVueAdminRoutes
};

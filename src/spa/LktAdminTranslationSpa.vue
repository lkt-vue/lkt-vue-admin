<script setup lang="ts">
import {
    AnchorType,
    AppSize,
    ButtonType,
    ClickEventArgs,
    ColumnType,
    FieldAutoValidationTrigger,
    FieldType,
    FormConfig,
    FormInstance,
    HeaderConfig,
    ItemCrudButtonNavVisibility,
    ItemCrudConfig,
    ItemCrudMode,
    ItemCrudView,
    LktObject, LktTranslationConfig,
    LktTranslationType,
    MultipleOptionsDisplay,
    TablePermission,
    TableType,
    WebItemsController
} from "lkt-vue-kernel";
import {computed, inject, nextTick, Ref, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {time} from "lkt-date-tools";
import {updateMainHeader} from "lkt-vue-app";

const props = withDefaults(defineProps<{
    onCreateTo: string
    many: boolean
}>(), {
    many: false
});

const lktAdminEnabled = <Ref<boolean>>inject('lktAdminEnabled');
if (!lktAdminEnabled.value) window.location.href = '/';


const route = useRoute(), router = useRouter();

const id = ref(parseInt(route.params.id));
const editing = ref(false);
const ready = ref(false);
const perms = ref(['create', 'switch-edit-mode']);

let appSize = <Ref<AppSize>>inject('lktAppSize');

if (!appSize) appSize = ref(AppSize.MD);

const settings = ref(WebItemsController.getWebItemSettings(props.many ? 'lkt-many-i18n' : 'lkt-i18n'));

const computedIsDictionaryParent = computed(() => {
    return props.many && !route.query.parentId;
})

const item = ref(<LktTranslationConfig>{
    property: '',
    type: computedIsDictionaryParent.value ? LktTranslationType.Many : LktTranslationType.Text,
    value: '',
    parentId: 0,
    valueData: {},
    children: [],

    ...route.query
});

const computedRoutePath = computed(() => {
    return props.many ? 'many-i18n' : 'i18n'
})

const updateHeader = () => {
    if (typeof settings.value === 'undefined') return;
    if (typeof settings.value?.appHeaderSingle === 'function') {
        updateMainHeader(settings.value.appHeaderSingle({item: item.value}));
    } else if (typeof settings.value?.appHeaderSingle === 'object' && Object.keys(settings.value?.appHeaderSingle).length > 0) {
        updateMainHeader(settings.value.appHeaderSingle);
    }
}

watch(route, (to) => {
    id.value = parseInt(route.params.id);
    ready.value = false;
    editing.value = false;
    item.value = <LktTranslationConfig>{
        property: '',
        type: computedIsDictionaryParent.value ? 'many' : FieldType.Text,
        value: '',
        parentId: 0,
        valueData: {},
        children: [],
        ...route.query
    };
    perms.value = ['create', 'switch-edit-mode'];
    nextTick(() => {
        updateHeader();
        nextTick(() => ready.value = true);
    });
}, {flush: 'pre', immediate: true, deep: true});

const redirectOnCreate = (id: string | number) => {
    return `/admin/i18n/${id}`;
}

const computedDisabledType = computed(() => {
    //@todo
    return false;
})

const form = computed(() => {
        return (data: {item: LktTranslationConfig, mode: ItemCrudMode, view: ItemCrudView}): FormConfig => {
            return {
                items: [
                    FormInstance.mkFieldItemConfig('property', {
                        type: FieldType.Text,
                        label: 'Property',
                        mandatory: true,
                        validation: {
                            trigger: FieldAutoValidationTrigger.Blur
                        }
                    }),
                    FormInstance.mkFieldItemConfig('type', {
                        type: FieldType.Select,
                        mandatory: true,
                        label: 'Type',
                        options: [LktTranslationType.Text, LktTranslationType.Textarea, LktTranslationType.Many],
                        optionsConfig: {
                            filter: (opt) => {
                                if (opt.value === 'many') return computedIsDictionaryParent.value && !item.value.parentId;
                                return true;
                            }
                        },
                        readMode: computedIsDictionaryParent.value && !item.value.parentId,
                        validation: {
                            trigger: FieldAutoValidationTrigger.Blur
                        }
                    }, {}, {canRender: true}),
                    FormInstance.mkFieldItemConfig('valueData', {
                        type: item.value.type,
                        mandatory: true,
                        canI18n: true,
                        label: 'Value',
                        validation: {
                            trigger: FieldAutoValidationTrigger.Blur
                        }
                    }, {}, {canRender: item.value.type !== 'many'}),

                    FormInstance.mkFieldItemConfig('children', {
                        type: FieldType.Table,
                        multiple: true,
                        options: 'prop:children',
                        optionValueType: 'option',
                        searchable: false,
                        multipleDisplay: MultipleOptionsDisplay.Table,
                        multipleDisplayEdition: MultipleOptionsDisplay.Table,
                        tooltipConfig: {
                            compensateGlobalContainers: false
                        },
                        optionsConfig: {
                            icon: 'lkt-icn-edit',
                            anchor: {
                                to: `/admin/${computedRoutePath.value}/feed{value}`
                            },
                            zeroMeansEmpty: true,
                            table: {
                                type: TableType.Table,
                                drag: {
                                    enabled: false,
                                    isDraggable: false,
                                    isValid: true,
                                    isDisabled: true,
                                    canRender: true,
                                    dragKey: 'drag-indicator'
                                },
                                perms: [TablePermission.Create],
                                requiredItemsForTopCreate: 999,
                                columns: [
                                    {
                                        key: 'property',
                                        label: 'Property',
                                        type: ColumnType.Field,
                                        field: {
                                            type: FieldType.Text,
                                            icon: 'lkt-icn-lang-picker',
                                        }
                                    },
                                    {
                                        key: 'valueData',
                                        label: 'Value',
                                        type: ColumnType.Field,
                                        ensureFieldLabel: appSize.value < AppSize.MD,
                                        field: {
                                            type: 'prop:type',
                                            canI18n: true,
                                            readModeConfig: {
                                                textMaxLength: 10,
                                            }
                                        }
                                    },
                                    {
                                        key: 'details',
                                        label: 'Details',
                                        type: ColumnType.Button,
                                        button: {
                                            type: ButtonType.Anchor,
                                            text: '__:common.button.details',
                                            class: 'lkt-button--info',
                                            icon: 'lkt-icn-expand',
                                            anchor: {
                                                to: `/admin/${computedRoutePath.value}/feed{id}`
                                            }
                                        }
                                    }
                                ],
                                createButton: {
                                    type: ButtonType.Anchor,
                                    anchor: {
                                        type: AnchorType.RouterLink,
                                        to: {
                                            path: `/admin/${computedRoutePath.value}/new`,
                                            query: {
                                                parentId: data.item.id,
                                                onCreateTo: `/admin/${computedRoutePath.value}/${data.item.id}`
                                            }
                                        }
                                    },
                                }
                            }
                        },
                    }, {}, {canRender: item.value.id > 0 && item.value.type === 'many'}),
                ]
            }
        }
    }),
    header = computed(() => {
        if (typeof settings.value?.appHeaderSingle !== 'undefined') return {};
        let text = settings.value?.labelSingle ?? '';
        return <HeaderConfig>{
            text,
            icon: settings.value?.icon ?? 'lkt-icn-lang-picker',
            tag: 'h1',
        }
    }),
    computedItemCrudConfig = computed(() => {
        return <ItemCrudConfig>{
            // header: {
            //     text: id.value > 0 ? item.value.property : 'New translation',
            //     icon: 'lkt-icn-lang-picker',
            //     tag: 'h1'
            // },
            header: header.value,
            readResource: 'r-i18n',
            readData: {
                id: id.value,
                type: props.many ? 'many' : undefined,
            },
            mode: id.value > 0 ? ItemCrudMode.Update : ItemCrudMode.Create,
            form: form.value,
            buttonNavVisibility: ItemCrudButtonNavVisibility.Always,
            createButton: {
                resource: 'mk-i18n',
                icon: 'lkt-icn-save',
                text: 'Create',
                events: {
                    click: (data: ClickEventArgs) => {
                        if (props.onCreateTo) {
                            router.push({
                                path: props.onCreateTo,
                                replace: true,
                            })
                        } else {
                            router.push({
                                path: `/admin/${computedRoutePath.value}/${data.httpResponse?.autoReloadId}`,
                                replace: true,
                            })
                        }
                    }
                }
            },
            createAndNewButton: {
                resource: 'mk-i18n',
                icon: 'lkt-icn-save',
                text: 'Create and new',
                events: {
                    click: (data: ClickEventArgs) => {
                        router.push({
                            path: `/admin/${computedRoutePath.value}/new`,
                            query: {
                                keepCreating: time()
                            },
                            replace: true,
                        })
                    }
                }
            },
            updateButton: {
                resource: 'up-i18n',
                icon: 'lkt-icn-save',
                text: 'Update',
            },
            dropButton: {
                resource: 'rm-i18n',
                resourceData: {id: id.value},
                icon: 'lkt-icn-trash',
                text: 'Remove',
                events: {
                    click: () => {
                        router.back();
                    }
                }
            },
            // redirectOnCreate,
        }
    })
</script>

<template>
    <section class="lkt-admin-spa" v-if="lktAdminEnabled">
        <lkt-item-crud
            v-if="ready"
            v-model="item"
            v-model:editing="editing"
            v-model:perms="perms"
            v-bind="computedItemCrudConfig"
        />
        <lkt-loader v-else/>
    </section>
</template>
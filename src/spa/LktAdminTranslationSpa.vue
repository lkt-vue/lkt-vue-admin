<script setup lang="ts">
import {
    AnchorType,
    ButtonType,
    ClickEventArgs,
    ColumnType,
    FieldAutoValidationTrigger,
    FieldType,
    FormConfig,
    FormInstance,
    ItemCrudButtonNavVisibility,
    ItemCrudConfig,
    ItemCrudMode,
    ItemCrudView,
    LktObject,
    MultipleOptionsDisplay,
    TableType
} from "lkt-vue-kernel";
import {computed, inject, nextTick, Ref, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {time} from "lkt-date-tools";

const props = defineProps<{
    onCreateTo: string
}>();

console.log('i18n props: ', props)

const lktAdminEnabled = <Ref<boolean>>inject('lktAdminEnabled');
if (!lktAdminEnabled.value) window.location.href = '/';


const route = useRoute(), router = useRouter();

const id = ref(parseInt(route.params.id));
const editing = ref(false);
const ready = ref(false);
const perms = ref(['create', 'switch-edit-mode']);

const item = ref(<LktObject>{
    property: '',
    type: FieldType.Text,
    value: '',
    valueData: {},
    children: [],
    ...route.query
});

watch(route, (to) => {
    id.value = parseInt(route.params.id);
    ready.value = false;
    editing.value = false;
    item.value = <LktObject>{
        property: '',
        type: FieldType.Text,
        value: '',
        valueData: {},
        children: [],
        ...route.query
    };
    perms.value = ['create', 'switch-edit-mode'];
    nextTick(() => ready.value = true);
}, {flush: 'pre', immediate: true, deep: true});

const redirectOnCreate = (id: string | number) => {
    return `/admin/i18n/${id}`;
}

const form = computed(() => {
        return (data: {item: LktObject, mode: ItemCrudMode, view: ItemCrudView}): FormConfig => {
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
                        options: [FieldType.Text, FieldType.Textarea, 'many'],
                        readMode: item.value.type === 'many' && item.value.id > 0,
                        validation: {
                            trigger: FieldAutoValidationTrigger.Blur
                        }
                    }),
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
                                to: '/admin/i18n/feed{value}'
                            },
                            zeroMeansEmpty: true,
                            table: {
                                type: TableType.Table,
                                drag: {
                                    enabled: true,
                                    isDraggable: true,
                                    isValid: true,
                                    isDisabled: false,
                                    canRender: true,
                                    dragKey: 'drag-indicator'
                                },
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
                                        key: 'details',
                                        label: 'Details',
                                        type: ColumnType.Button,
                                        button: {
                                            type: ButtonType.Anchor,
                                            text: '__:common.button.details',
                                            class: 'lkt-button--info',
                                            icon: 'lkt-icn-expand',
                                            anchor: {
                                                to: '/admin/i18n/feed{value}'
                                            }
                                        }
                                    }
                                ]
                            }
                        },
                        createButton: {
                            type: ButtonType.Anchor,
                            anchor: {
                                type: AnchorType.RouterLink,
                                to: {
                                    path: '/admin/i18n/new',
                                    query: {
                                        parentId: data.item.id,
                                        onCreateTo: `/admin/i18n/${data.item.id}`
                                    }
                                }
                            },
                        }
                    }, {}, {canRender: item.value.id > 0 && item.value.type === 'many'}),
                ]
            }
        }
    }),
    computedItemCrudConfig = computed(() => {
        return <ItemCrudConfig>{
            header: {
                text: id.value > 0 ? item.value.property : 'New translation',
                icon: 'lkt-icn-lang-picker',
                tag: 'h1'
            },
            readResource: 'r-i18n',
            readData: {
                id: id.value,
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
                                path: `/admin/i18n/${data.httpResponse?.autoReloadId}`,
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
                            path: `/admin/i18n/new`,
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
<script setup lang="ts">
import {computed, inject, nextTick, onMounted, Ref, ref, watch} from "vue";
import {
    AppSize,
    ButtonType,
    ColumnConfig,
    ColumnType,
    FieldType,
    LktObject,
    TableConfig,
    TableRowType,
    TableType, WebItemsController
} from "lkt-vue-kernel";
import {useRoute} from "vue-router";

const lktAdminEnabled = <Ref<boolean>>inject('lktAdminEnabled');
if (!lktAdminEnabled.value) window.location.href = '/';


const route = useRoute();

const type = ref(route.params.type),
    id = ref(route.params.id);

const filters = ref({
        name: '',
        type: type.value,
    }),
    items = ref([]),
    spaRef = ref(null),
    ready = ref(false);

const settings = ref(WebItemsController.getWebItemSettings(type.value))

watch(route, (to) => {
    type.value = route.params.type;
    id.value = route.params.id;
    items.value.splice(0, items.value.length);
    ready.value = false;

    filters.value.type = type.value;

    settings.value = WebItemsController.getWebItemSettings(type.value);
    nextTick(() => ready.value = true);
}, {flush: 'pre', immediate: true, deep: true});


let appSize = <Ref<AppSize>>inject('lktAppSize');

if (!appSize) appSize = ref(AppSize.MD);

const columns = computed(() => {
    if (settings.value.many.columns) {
        return [
            ...settings.value.many.columns,
            {
                type: ColumnType.Button,
                key: 'details',
                label: 'Details',
                button: {
                    type: ButtonType.Anchor,
                    text: 'Details',
                    icon: 'lkt-icn-expand',
                    anchor: {
                        to: (data: LktObject) => `/admin/web-items/${type.value}/${data.id}`,
                    }
                }
            },
        ]
    }
    return <Array<ColumnConfig>>[
        {
            type: ColumnType.Field,
            key: 'name',
            label: 'Name',
            isForAccordionHeader: true,
            field: {
                type: FieldType.Text,
                icon: settings.icon,
            }
        },
        {
            type: ColumnType.Button,
            key: 'details',
            label: 'Details',
            button: {
                type: ButtonType.Anchor,
                text: 'Details',
                icon: 'lkt-icn-expand',
                anchor: {
                    to: (data: LktObject) => `/admin/web-items/${type.value}/${data.id}`,
                }
            }
        },
    ];
})

onMounted(() => {
    ready.value = true;
})
</script>

<template>
    <section class="lkt-admin-spa lkt-web-items" v-if="lktAdminEnabled">
        <lkt-table
            v-if="ready"
            ref="spaRef"
            v-model="items"
            v-bind="<TableConfig>{
                type: appSize < AppSize.MD ? TableType.Accordion : TableType.Table,
                rowDisplayType: TableRowType.PreferColumns,
                title: settings.labelMany,
                titleTag: 'h1',
                titleIcon: settings.icon,
                editMode: true,
                requiredItemsForBottomCreate: 99,
                paginator: {
                    resource: 'ls-web-items',
                    resourceData: filters,
                },
                createButton: {
                    icon: 'lkt-icn-more',
                    text: 'Add web item',
                    type: ButtonType.Anchor,
                    anchor: {
                        to: `/admin/web-item/new`,
                    }
                },
                itemsContainerClass: appSize < AppSize.MD ? 'lkt-grid-1 xs-grid-style' : '',
                accordion: {
                    contentClass: 'lkt-flex-column',
                    toggleIconAtEnd: true,
                    iconRotation: '180',
                },
                ...settings.many,
                columns,
            }"
        />
    </section>
</template>
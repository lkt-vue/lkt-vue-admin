<script setup lang="ts">
import {computed, inject, Ref, ref, watch} from "vue";
import {
    ButtonType,
    ColumnConfig,
    ColumnType,
    FieldType,
    LktObject, MenuEntryType,
    TableConfig,
    TableRowType,
    TableType, WebPageController
} from "lkt-vue-kernel";
import {useRoute} from "vue-router";


const route = useRoute();

const type = ref(route.params.type),
    id = ref(route.params.id);

const filters = ref({
        name: '',
        type: type.value,
    }),
    items = ref([]),
    spaRef = ref(null);

watch(route, (to) => {
    type.value = route.params.type;
    id.value = route.params.id;
    filters.value.type = type.value;
}, {flush: 'pre', immediate: true, deep: true});

let appSize = <Ref>inject('appSize');

if (!appSize) appSize = ref('');

const columns = computed(() => {
    return <Array<ColumnConfig>>[
        {
            type: ColumnType.Field,
            key: 'name',
            label: '__:common.column.name',
            isForAccordionHeader: true,
            field: {
                type: FieldType.Text,
                icon: 'lkt-icn-webpage',
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
                    to: (data: LktObject) => `/admin/web-pages/${type.value}/${data.id}`,
                }
            }
        },
    ];
})

const computedTitle = computed(() => {
    let r = 'Web Pages';
    WebPageController.getPages().forEach(page => {
        if (page.id == type.value) {
            r = page.label ?? 'Web Pages';
            return;
        }
    })
    return r;
})

watch(items, v => {
    console.log(v);
})
</script>

<template>
    <div class="lkt-admin-pages">
        <lkt-table
            ref="spaRef"
            v-model="items"
            v-bind="<TableConfig>{
                type: appSize === 'xs' ? TableType.Accordion : TableType.Table,
                rowDisplayType: TableRowType.PreferColumns,
                title: computedTitle,
                titleTag: 'h1',
                editMode: true,
                requiredItemsForBottomCreate: 99,
                columns,
                paginator: {
                    resource: 'ls-web-pages-type',
                    resourceData: filters,
                },
                createButton: {
                    icon: 'lkt-icn-more',
                    type: ButtonType.Anchor,
                    anchor: {
                        to: `/admin/web-pages/${type}/0`,
                    }
                },
                itemsContainerClass: appSize === 'xs' ? 'lkt-grid-1 xs-grid-style' : '',
                accordion: {
                    contentClass: 'lkt-flex-column',
                    toggleIconAtEnd: true,
                    iconRotation: '180',
                }
            }"
        />
    </div>
</template>
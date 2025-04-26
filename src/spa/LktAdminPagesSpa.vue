<script setup lang="ts">
import {computed, inject, Ref, ref, watch} from "vue";
import {ButtonType, ColumnConfig, ColumnType, FieldType, TableConfig, TableRowType, TableType} from "lkt-vue-kernel";

let appSize = <Ref>inject('appSize');

if (!appSize) appSize = ref('');

const filters = ref({
        name: '',
    }),
    items = ref([]),
    spaRef = ref(null);

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
                    to: '/admin/web-page/id',
                }
            }
        },
    ];
})

watch(items, v => {
    console.log(v);
})
</script>

<template>
    <div class="spa-page lkt-grid-1">
        <lkt-table
            ref="spaRef"
            v-model="items"
            v-bind="<TableConfig>{
                type: appSize === 'xs' ? TableType.Accordion : TableType.Table,
                rowDisplayType: TableRowType.PreferColumns,
                title: 'Web Pages',
                titleTag: 'h1',
                editMode: true,
                requiredItemsForBottomCreate: 99,
                columns,
                paginator: {
                    resource: 'ls-web-pages',
                    resourceData: filters,
                },
                createButton: {
                    icon: 'lkt-icn-more',
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
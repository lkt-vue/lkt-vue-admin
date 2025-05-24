<script setup lang="ts">
import {computed, inject, Ref, ref, watch} from "vue";
import {
    AppSize,
    ButtonType,
    ColumnConfig,
    ColumnType,
    FieldType,
    LktObject,
    TableConfig,
    TableRowType,
    TableType
} from "lkt-vue-kernel";
import {useRoute} from "vue-router";


const route = useRoute();

const id = ref(route.params.id);

const filters = ref({
        name: '',
    }),
    items = ref([]),
    spaRef = ref(null);

watch(route, (to) => {
    id.value = route.params.id;
}, {flush: 'pre', immediate: true, deep: true});

let appSize = <Ref<AppSize>>inject('lktAppSize');

if (!appSize) appSize = ref(AppSize.MD);

const columns = computed(() => {
    return <Array<ColumnConfig>>[
        {
            type: ColumnType.Field,
            key: 'property',
            label: 'Property',
            isForAccordionHeader: true,
            field: {
                type: FieldType.Text,
                icon: 'lkt-icn-lang-picker',
            }
        },
        {
            type: ColumnType.Field,
            key: 'type',
            label: 'Type',
            ensureFieldLabel: appSize.value < AppSize.MD,
            field: {
                type: FieldType.Select,
                options: [FieldType.Text, FieldType.Textarea],
            }
        },
        {
            type: ColumnType.Field,
            key: 'value',
            label: 'Value',
            ensureFieldLabel: appSize.value < AppSize.MD,
            field: {
                type: 'prop:type',
                readModeConfig: {
                    textMaxLength: 10,
                }
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
                    to: (data: LktObject) => `/admin/i18n/${data.id}`,
                }
            }
        },
    ];
})

const computedTitle = computed(() => {
    let r = 'Translations';
    return r;
})

watch(items, v => {
    console.log(v);
})
</script>

<template>
    <section class="lkt-admin-spa lkt-admin-translations">
        <lkt-table
            ref="spaRef"
            v-model="items"
            v-bind="<TableConfig>{
                type: appSize < AppSize.MD ? TableType.Accordion : TableType.Table,
                rowDisplayType: TableRowType.PreferColumns,
                title: computedTitle,
                titleTag: 'h1',
                titleIcon: 'lkt-icn-lang-picker',
                editMode: true,
                requiredItemsForBottomCreate: 99,
                columns,
                paginator: {
                    resource: 'ls-lkt-i18n',
                    resourceData: filters,
                },
                createButton: {
                    icon: 'lkt-icn-more',
                    text: 'Add translation',
                    type: ButtonType.Anchor,
                    anchor: {
                        to: `/admin/i18n/new`,
                    }
                },
                itemsContainerClass: appSize < AppSize.MD ? 'lkt-grid-1 xs-grid-style' : '',
                accordion: {
                    contentClass: 'lkt-flex-column',
                    toggleIconAtEnd: true,
                    iconRotation: '180',
                }
            }"
        />
    </section>
</template>
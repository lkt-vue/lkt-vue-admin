<script setup lang="ts">
import {computed, inject, nextTick, Ref, ref, watch} from "vue";
import {
    AppSize,
    ButtonType,
    ColumnConfig,
    ColumnType,
    FieldType,
    FormConfig,
    FormInstance,
    HeaderConfig,
    LktObject,
    MultipleOptionsDisplay,
    TableConfig,
    TableRowType,
    TableType,
    WebItemsController
} from "lkt-vue-kernel";
import {useRoute} from "vue-router";
import {updateMainHeader} from "lkt-vue-app";

const lktAdminEnabled = <Ref<boolean>>inject('lktAdminEnabled');
if (!lktAdminEnabled.value) window.location.href = '/';

const props = withDefaults(defineProps<{
    many: boolean
}>(), {
    many: false
});

const route = useRoute();

const id = ref(route.params.id);

const filters = ref({
        property: '',
        value: '',
        type: props.many ? 'many' : ''
    }),
    items = ref([]),
    spaRef = ref(null);

const settings = ref(WebItemsController.getWebItemSettings(props.many ? 'lkt-many-i18n' : 'lkt-i18n'));

const computedRoutePath = computed(() => {
    return props.many ? 'many-i18n' : 'i18n'
})

const updateHeader = () => {
    if (typeof settings.value === 'undefined') return;
    if (typeof settings.value?.appHeaderMany === 'function') {
        updateMainHeader(settings.value.appHeaderMany({item: item.value}));
    } else if (typeof settings.value?.appHeaderMany === 'object' && Object.keys(settings.value?.appHeaderMany).length > 0) {
        updateMainHeader(settings.value.appHeaderMany);
    }
}

watch(route, (to) => {
    id.value = route.params.id;

    nextTick(() => {
        updateHeader();
        // nextTick(() => ready.value = true);
    });
}, {flush: 'pre', immediate: true, deep: true});

let appSize = <Ref<AppSize>>inject('lktAppSize');

if (!appSize) appSize = ref(AppSize.MD);

const columns = computed(() => {
    let r = <Array<ColumnConfig>>[
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
    ];

    if (props.many) {
        // r.push({
        //     type: ColumnType.Field,
        //     key: 'children',
        //     label: 'Items',
        //     ensureFieldLabel: appSize.value < AppSize.MD,
        //     field: {
        //         type: FieldType.Select,
        //         multipleDisplay: MultipleOptionsDisplay.Count,
        //         options: 'prop:children',
        //         optionValueType: 'option'
        //     }
        // });
    } else {
        r.push({
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
        });
    }

    r.push({
        type: ColumnType.Button,
        key: 'details',
        label: 'Details',
        button: {
            type: ButtonType.Anchor,
            text: 'Details',
            icon: 'lkt-icn-expand',
            anchor: {
                to: (data: LktObject) => `/admin/${computedRoutePath.value}/${data.id}`,
            }
        }
    })

    return r;
})

const header = computed(() => {
        if (typeof settings.value?.appHeaderMany !== 'undefined') return {};
        let text = settings.value?.labelMany ?? '';
        return <HeaderConfig>{
            text,
            icon: settings.value?.icon,
            tag: 'h1',
        }
    });

const computedFiltersForm = computed(() => {
    return <FormConfig>{
        header: {
            text: 'Filters',
            tag: 'h2',
        },
        items: [
            FormInstance.mkFieldItemConfig('property', {
                type: FieldType.Text,
                label: 'Property',
            }),
            // FormInstance.mkFieldItemConfig('value', {
            //     type: FieldType.Text,
            //     label: 'Value',
            // }),
        ]
    }
})
</script>

<template>
    <section class="lkt-admin-spa lkt-admin-translations" v-if="lktAdminEnabled">
        <lkt-table
            ref="spaRef"
            v-model="items"
            v-bind="<TableConfig>{
                type: appSize < AppSize.MD ? TableType.Accordion : TableType.Table,
                rowDisplayType: TableRowType.PreferColumns,
                header,
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
                        to: `/admin/${computedRoutePath}/new`,
                    }
                },
                itemsContainerClass: appSize < AppSize.MD ? 'lkt-grid-1 xs-grid-style' : '',
                accordion: {
                    contentClass: 'lkt-flex-column',
                    toggleIconAtEnd: true,
                    iconRotation: '180',
                },
                filtersForm: computedFiltersForm
            }"
        />
    </section>
</template>
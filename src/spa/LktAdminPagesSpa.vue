<script setup lang="ts">
import {computed, inject, nextTick, onMounted, Ref, ref, watch} from "vue";
import {
    AppSize, ButtonConfig,
    ButtonType,
    ColumnConfig,
    ColumnType,
    FieldType, HeaderConfig,
    LktObject, LktSettings,
    TableConfig,
    TableRowType,
    TableType, WebItemsController,
    WebPageController
} from "lkt-vue-kernel";
import {useRoute} from "vue-router";
import {updateMainHeader} from "lkt-vue-app";


const route = useRoute();

const type = ref(<string>route.params.type),
    id = ref(route.params.id);

const filters = ref({
        name: '',
        type: type.value,
    }),
    items = ref([]),
    spaRef = ref(null),
    ready = ref(false);

const settings = ref(WebPageController.getCustomWebPageSettings(type.value))

const updateHeader = () => {
    if (typeof settings.value.appHeaderMany === 'function') {
        updateMainHeader(settings.value.appHeaderMany({items: items.value}));
    } else if (typeof settings.value.appHeaderMany === 'object' && Object.keys(settings.value.appHeaderMany).length > 0) {
        updateMainHeader(settings.value.appHeaderMany);
    }
}

watch(route, (to) => {
    type.value = route.params.type as string;
    id.value = route.params.id;
    filters.value.type = type.value;
    ready.value = false;

    settings.value = WebPageController.getCustomWebPageSettings(type.value);

    nextTick(() => {
        updateHeader();
        nextTick(() => ready.value = true);
    })
}, {flush: 'pre', immediate: true, deep: true});

let appSize = <Ref<AppSize>>inject('lktAppSize');

if (!appSize) appSize = ref(AppSize.MD);

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
            label: '',
            button: {
                ...LktSettings.defaultDetailsButton,
                type: ButtonType.Anchor,
                anchor: {
                    to: (data: LktObject) => `/admin/web-pages/${type.value}/${data.id}`,
                }
            }
        },
    ];
})

const header = computed(() => {
        if (typeof settings.value?.appHeaderMany !== 'undefined') return {};
        let text = settings.value?.labelMany ?? '';
        return <HeaderConfig>{
            text,
            icon: settings.value?.icon,
            tag: 'h1',
        }
    }),
    createButton = computed(() => {
        //@ts-ignore
        if (settings.value?.many?.createButton === false) return false;
        return <ButtonConfig>{
            icon: 'lkt-icn-more',
            text: 'Add web page',
            type: ButtonType.Anchor,
            anchor: {
                to: `/admin/web-pages/${type.value}/new`,
            },
            //@ts-ignore
            ...settings.value.many?.createButton,
        }
    });

// const computedTitle = computed(() => {
//     let r = 'Web Pages';
//     WebPageController.getPages().forEach(page => {
//         if (page.id == type.value) {
//             r = page.label ?? 'Web Pages';
//             return;
//         }
//     })
//     return r;
// })

onMounted(() => {
    ready.value = true;
})
</script>

<template>
    <section class="lkt-admin-spa lkt-admin-pages">
        <lkt-table
            v-if="ready"
            ref="spaRef"
            v-model="items"
            v-bind="<TableConfig>{
                type: appSize < AppSize.MD ? TableType.Accordion : TableType.Table,
                rowDisplayType: TableRowType.PreferColumns,
                editMode: true,
                requiredItemsForBottomCreate: 99,
                header,
                columns,
                paginator: {
                    resource: 'ls-web-pages-type',
                    resourceData: filters,
                },
                createButton,
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
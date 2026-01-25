<script setup lang="ts">
import {
    FileBrowserConfig,
    ItemCrudButtonNavVisibility,
    ItemCrudConfig,
    ItemCrudMode, LktObject, WebItemsController,
    WebPage,
    WebPageController
} from "lkt-vue-kernel";
import {nextTick, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {updateMainHeader} from "lkt-vue-app";


const route = useRoute(), router = useRouter();

const type = ref(route.params.type),
    id = ref(route.params.id),
    ready = ref(false),
    editing = ref(false),
    perms = ref(['create']);

watch(route, (to) => {
    type.value = route.params.type;
    id.value = route.params.id;
}, {flush: 'pre', immediate: true, deep: true});

const settings = ref(WebPageController.getCustomWebPageSettings(type.value))

const generateItem = (data: LktObject) => {
    if (typeof settings.value?.itemGenerator == 'function') {
        return settings.value.itemGenerator(data);
    }

    return new WebPage({
        ...data,
    })
}

const item = ref(<WebPage>generateItem(route.query));

const updateHeader = () => {
    if (typeof settings.value?.appHeaderSingle === 'function') {
        updateMainHeader(settings.value.appHeaderSingle({item: item.value}));
    } else if (typeof settings.value?.appHeaderSingle === 'object' && Object.keys(settings.value.appHeaderSingle).length > 0) {
        updateMainHeader(settings.value.appHeaderSingle);
    }
}

watch(route, (to) => {
    type.value = route.params.type;
    id.value = route.params.id;
    ready.value = false;
    editing.value = false;
    perms.value = ['create'];
    settings.value = WebPageController.getCustomWebPageSettings(type.value);
    nextTick(() => {
        item.value = generateItem(route.query);
        nextTick(() => {
            updateHeader();
            nextTick(() => ready.value = true);
        });
    })
}, {flush: 'pre', immediate: true, deep: true});

const redirectOnCreate = (id: string|number) => {
    return `/admin/web-pages/${type.value}/${id}`;
}
</script>

<template>
    <section class="lkt-admin-spa">
        <lkt-web-page
            v-if="ready"
            v-model="item"
            :crud-config="<ItemCrudConfig>{
                readResource: 'r-web-page',
                readData: {
                    id,
                },
                mode: id > 0 ? ItemCrudMode.Update : ItemCrudMode.Create,
                buttonNavVisibility: ItemCrudButtonNavVisibility.Always,
                editing: true,
                perms: ['update'],
                createButton: {
                    resource: 'mk-web-page',
                    resourceData: {...item, type},
                    text: 'Create',
                    disabled: false,
                },
                updateButton: {
                    resource: 'up-web-page',
                    resourceData: item,
                    text: 'Update',
                    disabled: false,
                },
                dropButton: {
                    resource: 'rm-web-page',
                    resourceData: item,
                    text: 'Remove',
                    disabled: false,
                    events: {
                        click: () => {
                            router.back();
                        }
                    }
                },
                redirectOnCreate,
            }"
            :modal-crud-config="<ItemCrudConfig>{
                readResource: 'r-web-element',
                createButton: {
                    resource: 'mk-web-element',
                },
                updateButton: {
                    resource: 'up-web-element',
                },
                dropButton: {
                    resource: 'rm-web-element',
                },
            }"

            :file-browser-config="<FileBrowserConfig>{
                http: {
                    resource: 'file-browser'
                },
                entityCreateButton: {
                    text: 'Create',
                    resource: 'mk-file-entity',
                },
                entityUpdateButton: {
                    text: 'Update',
                    resource: 'up-file-entity',
                }
            }"
        />
    </section>
</template>
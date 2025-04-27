<script setup lang="ts">

import {FileBrowserConfig, ItemCrudButtonNavVisibility, ItemCrudConfig, ItemCrudMode, WebPage} from "lkt-vue-kernel";
import {ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";


const route = useRoute(), router = useRouter();

const type = ref(route.params.type),
    id = ref(route.params.id);

watch(route, (to) => {
    type.value = route.params.type;
    id.value = route.params.id;
}, {flush: 'pre', immediate: true, deep: true});

const item = ref(<WebPage>{});

const redirectOnCreate = (id: string|number) => {
    return `/admin/web-pages/${type.value}/${id}`;
}
</script>

<template>
    <lkt-web-page
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
</template>
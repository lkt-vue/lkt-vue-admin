<script setup lang="ts">

import {
    FileBrowserConfig,
    ItemCrudButtonNavVisibility,
    ItemCrudConfig,
    ItemCrudMode, WebPage
} from "lkt-vue-kernel";
import {ref} from "vue";

const item = ref(<WebPage>{});
</script>

<template>
    <lkt-web-page
        v-model="item"
        :crud-config="<ItemCrudConfig>{
            readResource: 'r-web-page',
            readData: {
                id: 2
            },
            mode: ItemCrudMode.Update,
            buttonNavVisibility: ItemCrudButtonNavVisibility.Always,
            editing: true,
            perms: ['update'],
            updateButton: {
                resource: 'up-web-page',
                resourceData: item,
                text: 'Update',
                disabled: false,
            }
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
<script setup lang="ts">

import {
    FileBrowserConfig,
    ItemCrudButtonNavVisibility,
    ItemCrudConfig,
    ItemCrudMode,
    WebItemsController,
    WebPage
} from "lkt-vue-kernel";
import {ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";

const lktAdminEnabled = <Ref<boolean>>inject('lktAdminEnabled');
if (!lktAdminEnabled.value) window.location.href = '/';


const route = useRoute(), router = useRouter();

const type = ref(route.params.type),
    id = ref(route.params.id);

const settings = ref(WebItemsController.getWebItemSettings(type.value))

watch(route, (to) => {
    type.value = route.params.type;
    id.value = route.params.id;
    settings.value = WebItemsController.getWebItemSettings(type.value);
}, {flush: 'pre', immediate: true, deep: true});

const item = ref(<WebPage>{});

const redirectOnCreate = (id: string|number) => {
    return `/admin/web-items/${type.value}/${id}`;
}
</script>

<template>
    <section class="lkt-admin-spa lkt-web-item-spa" v-if="lktAdminEnabled">
        <lkt-item-crud
            v-model="item"
            v-bind="<ItemCrudConfig>{
                title: settings.labelSingle,
                readResource: 'r-web-item',
                readData: {
                    id,
                },
                mode: id > 0 ? ItemCrudMode.Update : ItemCrudMode.Create,
                buttonNavVisibility: ItemCrudButtonNavVisibility.Always,
                editing: true,
                createButton: {
                    resource: 'mk-web-item',
                    icon: 'lkt-icn-save',
                    text: 'Create',
                },
                updateButton: {
                    resource: 'up-web-item',
                    icon: 'lkt-icn-save',
                    text: 'Update',
                },
                dropButton: {
                    resource: 'rm-web-item',
                    resourceData: {id},
                    icon: 'lkt-icn-trash',
                    text: 'Remove',
                    events: {
                        click: () => {
                            router.back();
                        }
                    }
                },
                redirectOnCreate,
                ...settings.single,
            }"
        />
    </section>
</template>
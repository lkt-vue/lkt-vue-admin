<script setup lang="ts">

import {
    HeaderConfig,
    ItemCrudButtonNavVisibility,
    ItemCrudConfig,
    ItemCrudMode,
    LktObject,
    WebItemsController
} from "lkt-vue-kernel";
import {computed, inject, nextTick, Ref, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";

const lktAdminEnabled = <Ref<boolean>>inject('lktAdminEnabled');
if (!lktAdminEnabled.value) window.location.href = '/';


const route = useRoute(), router = useRouter();

const type = ref(route.params.type),
    id = ref(route.params.id),
    ready = ref(false);

const settings = ref(WebItemsController.getWebItemSettings(type.value))

const item = ref(<LktObject>{});

watch(route, (to) => {
    item.value = {};
    type.value = route.params.type;
    id.value = route.params.id;
    ready.value = false;
    settings.value = WebItemsController.getWebItemSettings(type.value);
    nextTick(() => ready.value = true);
}, {flush: 'pre', immediate: true, deep: true});

const header = computed(() => {
    let text = settings.value.labelSingle ?? '';
    return <HeaderConfig>{
        text,
        icon: settings.value.icon,
        tag: 'h1',
    }
})

const redirectOnCreate = (id: string|number) => {
    return `/admin/web-items/${type.value}/${id}`;
}
</script>

<template>
    <section class="lkt-admin-spa lkt-web-item-spa" v-if="lktAdminEnabled">
        <lkt-item-crud
            v-if="ready"
            v-model="item"
            v-bind="<ItemCrudConfig>{
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
                header,
            }"
        />
        <lkt-loader v-else/>
    </section>
</template>
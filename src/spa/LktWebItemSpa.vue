<script setup lang="ts">

import {
    ButtonConfig, ClickEventArgs,
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
// if (!lktAdminEnabled.value) window.location.href = '/';

const props = defineProps<{
    id: string|number
    type: string
    onCreateTo: string
}>();


const route = useRoute(), router = useRouter();

const type = ref(route.params.type),
    id = ref(route.params.id),
    ready = ref(false),
    editing = ref(false),
    perms = ref(['create']);

const settings = ref(WebItemsController.getWebItemSettings(type.value))

const generateItem = (data: LktObject) => {
    if (typeof settings.value.itemGenerator == 'function') {
        return settings.value.itemGenerator(data);
    }

    return {
        ...data,
    }
}

const item = ref(<LktObject>generateItem(route.query));

watch(route, (to) => {
    item.value = generateItem(route.query);
    type.value = route.params.type;
    id.value = route.params.id;
    ready.value = false;
    editing.value = false;
    perms.value = ['create'];
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
    }),
    createButton = computed(() => {
        if (settings.value?.single?.createButton === false) return false;
        return <ButtonConfig>{
            resource: 'mk-web-item',
            icon: 'lkt-icn-save',
            text: 'Create',
            ...settings.value.single.createButton,
            events: {
                click: (data: ClickEventArgs) => {
                    if (typeof settings.value.single.createButton === 'function') settings.value.single.createButton(data);
                    if (props.onCreateTo) {
                        router.push({
                            path: props.onCreateTo,
                            replace: true,
                        })
                    }
                }
            }
        }
    }),
    updateButton = computed(() => {
        if (settings.value?.single?.updateButton === false) return false;
        return <ButtonConfig>{
            resource: 'up-web-item',
            icon: 'lkt-icn-save',
            text: 'Update',
            ...settings.value.single.updateButton,
        }
    }),
    dropButton = computed(() => {
        if (settings.value?.single?.dropButton === false) return false;
        return <ButtonConfig>{
            resource: 'rm-web-item',
            resourceData: {id},
            icon: 'lkt-icn-trash',
            text: 'Remove',
            events: {
                click: () => {
                    router.back();
                }
            },
            ...settings.value.single.dropButton,
        }
    })

const redirectOnCreate = (id: string | number) => {
    return `/admin/web-items/${type.value}/${id}`;
}
</script>

<template>
    <section class="lkt-admin-spa lkt-web-item-spa" v-if="lktAdminEnabled">
        <lkt-item-crud
            v-if="ready"
            v-model="item"
            v-model:editing="editing"
            v-model:perms="perms"
            v-bind="<ItemCrudConfig>{
                readResource: 'r-web-item',
                readData: {id},
                mode: id > 0 ? ItemCrudMode.Update : ItemCrudMode.Create,
                buttonNavVisibility: ItemCrudButtonNavVisibility.Always,
                redirectOnCreate,
                ...settings.single,
                header,
                createButton,
                updateButton,
                dropButton,
            }"
        />
        <lkt-loader v-else/>
    </section>
</template>
<script setup lang="ts">

import {
    ClickEventArgs,
    FieldAutoValidationTrigger,
    FieldType,
    FormConfig,
    FormInstance,
    ItemCrudButtonNavVisibility,
    ItemCrudConfig,
    ItemCrudMode,
    LktObject
} from "lkt-vue-kernel";
import {computed, inject, nextTick, Ref, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {time} from "lkt-date-tools";

const lktAdminEnabled = <Ref<boolean>>inject('lktAdminEnabled');
if (!lktAdminEnabled.value) window.location.href = '/';


const route = useRoute(), router = useRouter();

const id = ref(parseInt(route.params.id));
const editing = ref(false);
const ready = ref(false);
const perms = ref(['create', 'switch-edit-mode']);

const item = ref(<LktObject>{
    property: '',
    type: FieldType.Text,
    value: '',
    valueData: {}
});

watch(route, (to) => {
    id.value = parseInt(route.params.id);
    ready.value = false;
    editing.value = false;
    item.value = <LktObject>{
        property: '',
        type: FieldType.Text,
        value: '',
        valueData: {}
    };
    perms.value = ['create', 'switch-edit-mode'];
    nextTick(() => ready.value = true);
}, {flush: 'pre', immediate: true, deep: true});

const redirectOnCreate = (id: string | number) => {
    return `/admin/i18n/${id}`;
}

const form = computed(() => {
        return <FormConfig>{
            items: [
                FormInstance.mkFieldItemConfig('property', {
                    type: FieldType.Text,
                    label: 'Property',
                    mandatory: true,
                    validation: {
                        trigger: FieldAutoValidationTrigger.Blur
                    }
                }),
                FormInstance.mkFieldItemConfig('type', {
                    type: FieldType.Select,
                    mandatory: true,
                    label: 'Type',
                    options: [FieldType.Text, FieldType.Textarea],
                    validation: {
                        trigger: FieldAutoValidationTrigger.Blur
                    }
                }),
                FormInstance.mkFieldItemConfig('valueData', {
                    type: item.value.type,
                    mandatory: true,
                    canI18n: true,
                    label: 'Value',
                    validation: {
                        trigger: FieldAutoValidationTrigger.Blur
                    }
                }),
            ]
        }
    }),
    computedItemCrudConfig = computed(() => {
        return <ItemCrudConfig>{
            header: {
                text: id.value > 0 ? item.value.property : 'New translation',
                icon: 'lkt-icn-lang-picker',
                tag: 'h1'
            },
            readResource: 'r-i18n',
            readData: {
                id: id.value,
            },
            mode: id.value > 0 ? ItemCrudMode.Update : ItemCrudMode.Create,
            form: form.value,
            buttonNavVisibility: ItemCrudButtonNavVisibility.Always,
            createButton: {
                resource: 'mk-i18n',
                icon: 'lkt-icn-save',
                text: 'Create',
                events: {
                    click: (data: ClickEventArgs) => {
                        router.push({
                            path: `/admin/i18n/${data.httpResponse?.autoReloadId}`,
                            replace: true,
                        })
                    }
                }
            },
            createAndNewButton: {
                resource: 'mk-i18n',
                icon: 'lkt-icn-save',
                text: 'Create and new',
                events: {
                    click: (data: ClickEventArgs) => {
                        router.push({
                            path: `/admin/i18n/new`,
                            query: {
                                keepCreating: time()
                            },
                            replace: true,
                        })
                    }
                }
            },
            updateButton: {
                resource: 'up-i18n',
                icon: 'lkt-icn-save',
                text: 'Update',
            },
            dropButton: {
                resource: 'rm-i18n',
                resourceData: {id: id.value},
                icon: 'lkt-icn-trash',
                text: 'Remove',
                events: {
                    click: () => {
                        router.back();
                    }
                }
            },
            // redirectOnCreate,
        }
    })
</script>

<template>
    <section class="lkt-admin-spa" v-if="lktAdminEnabled">
        <lkt-item-crud
            v-if="ready"
            v-model="item"
            v-model:editing="editing"
            v-model:perms="perms"
            v-bind="computedItemCrudConfig"
        />
        <lkt-loader v-else/>
    </section>
</template>
<script setup lang="ts">

import {
    FieldAutoValidationTrigger,
    FieldType,
    FormConfig,
    FormInstance,
    ItemCrudButtonNavVisibility,
    ItemCrudConfig,
    ItemCrudMode,
    LktObject
} from "lkt-vue-kernel";
import {computed, inject, Ref, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";

const lktAdminEnabled = <Ref<boolean>>inject('lktAdminEnabled');
if (!lktAdminEnabled.value) window.location.href = '/';


const route = useRoute(), router = useRouter();

const id = ref(parseInt(route.params.id));
const editing = ref(false);

watch(route, (to) => {
    id.value = parseInt(route.params.id);
}, {flush: 'pre', immediate: true, deep: true});

const item = ref(<LktObject>{
    property: '',
    type: FieldType.Text,
    value: '',
    valueData: {}
});

const redirectOnCreate = (id: string|number) => {
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
})
</script>

<template>
    <section class="lkt-admin-spa" v-if="lktAdminEnabled">
        <lkt-item-crud
            v-model="item"
            v-model:editing="editing"
            v-bind="<ItemCrudConfig>{
                header: {
                    text: id > 0 ? item.property : 'New translation',
                    icon: 'lkt-icn-lang-picker',
                    tag: 'h1'
                },
                readResource: 'r-i18n',
                readData: {
                    id,
                },
                mode: id > 0 ? ItemCrudMode.Update : ItemCrudMode.Create,
                form,
                buttonNavVisibility: ItemCrudButtonNavVisibility.Always,
                createButton: {
                    resource: 'mk-i18n',
                    icon: 'lkt-icn-save',
                    text: 'Create',
                },
                updateButton: {
                    resource: 'up-i18n',
                    icon: 'lkt-icn-save',
                    text: 'Update',
                },
                dropButton: {
                    resource: 'rm-i18n',
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
            }"
        />
    </section>
</template>
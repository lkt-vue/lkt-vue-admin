<script setup lang="ts">
import {computed, inject, Ref} from "vue";
import {MenuEntryConfig, MenuEntryType} from "lkt-vue-kernel";

const adminMenu = <Ref>inject('adminMenu');

const computedMainMenu = computed(() => {
    return <Array<MenuEntryConfig>>[
        {
            key: 'web-pages',
            type: MenuEntryType.Entry,
            icon: 'lkt-icn-webpage',
            anchor: {
                to: '/admin/web-pages/web-page',
                text: 'Pages',
                events: {
                    click: () => {
                        adminMenu.value = false;
                    }
                }
            }
        }
    ];
});
</script>

<template>
    <div class="lkt-admin-menu" :class="adminMenu ? 'is-opened' : ''">
        <lkt-menu
            :model-value="computedMainMenu"
            @click-outside="adminMenu = false"
        />
    </div>
</template>
<script setup lang="ts">
import {computed, inject, Ref} from "vue";
import {MenuEntryConfig, MenuEntryType, WebItemsController, WebPageController} from "lkt-vue-kernel";

const adminMenu = <Ref>inject('adminMenu');

const computedMainMenu = computed(() => {
    let r = <Array<MenuEntryConfig>>[];

    if (WebPageController.hasDefaultPageEnabled()) {
        r.push({
            key: 'web-pages',
            type: MenuEntryType.Entry,
            icon: 'lkt-icn-webpage',
            anchor: {
                to: '/admin/web-pages/0',
                text: 'Pages',
                events: {
                    click: () => {
                        adminMenu.value = false;
                    }
                }
            }
        })
    }

    WebPageController.getPages().forEach(page => {
        r.push({
            key: page.code,
            type: MenuEntryType.Entry,
            icon: 'lkt-icn-webpage',
            anchor: {
                to: `/admin/web-pages/${page.id}`,
                text: page.label,
                events: {
                    click: () => {
                        adminMenu.value = false;
                    }
                }
            }
        })
    })

    WebItemsController.getItems().forEach(webItem => {
        r.push({
            key: webItem.code,
            type: MenuEntryType.Entry,
            icon: webItem.icon,
            anchor: {
                to: `/admin/web-items/${webItem.code}`,
                text: webItem.labelMany,
                events: {
                    click: () => {
                        adminMenu.value = false;
                    }
                }
            }
        })
    })

    r.push(
        {
            key: 'translations',
            type: MenuEntryType.Entry,
            icon: 'lkt-icn-lang-picker',
            anchor: {
                to: '/admin/i18n',
                text: 'Translations',
                events: {
                    click: () => {
                        adminMenu.value = false;
                    }
                }
            }
        })

    return r;
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
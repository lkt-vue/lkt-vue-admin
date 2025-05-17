<script setup lang="ts">

import {ButtonConfig, ButtonType} from "lkt-vue-kernel";
import {inject, Ref} from "vue";

const adminMenu = <Ref>inject('adminMenu');
</script>

<template>
    <lkt-button
        v-model:checked="adminMenu"
        v-bind="<ButtonConfig>{
            type: ButtonType.HiddenSwitch,
            icon: 'lkt-icn-lkt',
            class: 'lkt-admin-button'
        }"
    />
</template>
import {App, inject, Plugin, Ref} from 'vue';
import {Router} from 'vue-router';

import "../styles.css";
import LktAdminMenuButton from "./lib-components/LktAdminMenuButton.vue";
import LktAdminMenu from "./lib-components/LktAdminMenu.vue";
import LktAdminPagesSpa from "./spa/LktAdminPagesSpa.vue";
import LktAdminPageSpa from "./spa/LktAdminPageSpa.vue";
import LktAdminTranslationsSpa from "./spa/LktAdminTranslationsSpa.vue";
import LktAdminTranslationSpa from "./spa/LktAdminTranslationSpa.vue";
import LktWebItemsSpa from "./spa/LktWebItemsSpa.vue";
import LktWebItemSpa from "./spa/LktWebItemSpa.vue";

const LktVueAdmin: Plugin = {
    install: (app: App) => {
        // Register plugin components
        if (app.component('lkt-admin-menu-button') === undefined) app.component('lkt-admin-menu-button', LktAdminMenuButton);
        if (app.component('lkt-admin-menu') === undefined) app.component('lkt-admin-menu', LktAdminMenu);
    }
};

const navigationGuard = (to, from) => {
    // const lktAdminEnabled = <Ref<boolean>>inject('lktAdminEnabled');
    // if (!lktAdminEnabled.value) return false;
};

export default LktVueAdmin;
export const setupLktVueAdminRoutes = (router: Router) => {
    router.addRoute({path: '/admin/web-pages/:type', name: 'lkt-admin-pages', component: LktAdminPagesSpa, beforeEnter: navigationGuard});
    router.addRoute({path: '/admin/web-pages/:type/:id', name: 'lkt-admin-page', component: LktAdminPageSpa, beforeEnter: navigationGuard});
    router.addRoute({path: '/admin/web-items/:type', name: 'lkt-web-items', component: LktWebItemsSpa, beforeEnter: navigationGuard});
    router.addRoute({path: '/admin/web-items/:type/:id', name: 'lkt-web-item', component: LktWebItemSpa, beforeEnter: navigationGuard});
    router.addRoute({path: '/admin/i18n', name: 'lkt-admin-translations', component: LktAdminTranslationsSpa, beforeEnter: navigationGuard});
    router.addRoute({path: '/admin/i18n/:id', name: 'lkt-admin-translation', component: LktAdminTranslationSpa, beforeEnter: navigationGuard});
}

export {setupAdminTranslationsHttp} from "./http/admin-translations-http";
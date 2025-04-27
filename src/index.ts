import {App, Plugin} from 'vue';
import {Router} from 'vue-router';

import "../styles.css";
import LktAdminMenuButton from "./lib-components/LktAdminMenuButton.vue";
import LktAdminMenu from "./lib-components/LktAdminMenu.vue";
import LktAdminPagesSpa from "./spa/LktAdminPagesSpa.vue";
import LktAdminPageSpa from "./spa/LktAdminPageSpa.vue";

const LktVueAdmin: Plugin = {
    install: (app: App) => {
        // Register plugin components
        if (app.component('lkt-admin-menu-button') === undefined) app.component('lkt-admin-menu-button', LktAdminMenuButton);
        if (app.component('lkt-admin-menu') === undefined) app.component('lkt-admin-menu', LktAdminMenu);
    }
};

export default LktVueAdmin;
export const setupLktVueAdminRoutes = (router: Router) => {
    router.addRoute({path: '/admin/web-pages/:type', name: 'lkt-admin-pages', component: LktAdminPagesSpa});
    router.addRoute({path: '/admin/web-pages/:type/:id', name: 'lkt-admin-page', component: LktAdminPageSpa});
}
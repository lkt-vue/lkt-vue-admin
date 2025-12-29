import {
    createHTTPDeleteResource,
    createHTTPGetResource,
    createHTTPPostResource,
    createHTTPPutResource
} from "lkt-http-client";
import {LktObject} from "lkt-vue-kernel";


export const setupAdminUserRoleHttp = () => {

    createHTTPGetResource({
        url: '/user/roles/page-{page}',
        name: 'ls-user-role',
        params: {page: {default: undefined}},
        digToPerms: 'perms',
        digToData: 'results',
        mapData: (data: LktObject[]) => {
            return data;
        }
    });

    createHTTPGetResource({
        url: '/user/roles',
        name: 'all-user-role',
        digToPerms: 'perms',
        digToData: 'results',
        mapData: (data: LktObject[]) => {
            return data;
        }
    });


    createHTTPGetResource({
        url: '/user/role/{id}',
        name: 'r-user-role',
        params: {id: {default: undefined}},
        digToPerms: 'perms',
        digToData: 'item',
        mapData: (data: LktObject) => {
            return data;
        }
    });

    createHTTPPostResource({
        url: '/user/role',
        name: 'mk-user-role',
        params: {
            name: {default: undefined},
            permissions: {default: undefined},
        },
        digToPerms: 'perms',
        digToAutoReloadId: 'item.id'
    });

    createHTTPPutResource({
        url: '/user/role/{id}',
        name: 'up-user-role',
        params: {
            id: {default: undefined},
            name: {default: undefined},
            permissions: {default: undefined},
        },
        digToPerms: 'perms'
    });

    createHTTPDeleteResource({
        url: '/user/role/{id}',
        name: 'rm-user-role',
        params: {
            id: {default: undefined},
        },
        digToPerms: 'perms',
        digToData: 'item',
    });
}
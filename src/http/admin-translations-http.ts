import {
    createHTTPDeleteResource,
    createHTTPGetResource,
    createHTTPPostResource,
    createHTTPPutResource
} from "lkt-http-client";
import {LktObject} from "lkt-vue-kernel";


export const setupAdminTranslationsHttp = () => {

    createHTTPGetResource({
        url: '/translations',
        name: 'ls-lkt-i18n',
        params: {property: {default: undefined}, value: {default: undefined}},
        digToPerms: 'perms',
        digToData: 'results',
        mapData: (data: LktObject[]) => {
            return data;
        }
    });


    createHTTPGetResource({
        url: '/translation/{id}',
        name: 'r-i18n',
        params: {id: {default: undefined}},
        digToPerms: 'perms',
        digToData: 'item',
        mapData: (data: LktObject) => {
            return data;
        }
    });

    createHTTPPostResource({
        url: '/translation',
        name: 'mk-i18n',
        params: {
            type: {default: undefined},
            property: {default: undefined},
            valueData: {default: undefined},
            parentId: {default: undefined},
        },
        digToPerms: 'perms',
        digToAutoReloadId: 'item.id'
    });

    createHTTPPutResource({
        url: '/translation/{id}',
        name: 'up-i18n',
        params: {
            id: {default: undefined},
            type: {default: undefined},
            property: {default: undefined},
            valueData: {default: undefined},
        },
        digToPerms: 'perms'
    });

    createHTTPDeleteResource({
        url: '/translation/{id}',
        name: 'rm-i18n',
        params: {
            id: {default: undefined},
        },
        digToPerms: 'perms',
        digToData: 'item',
    });
}
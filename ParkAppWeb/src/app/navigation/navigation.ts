import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    
    // Applications :
    
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        icon     : 'apps',
        children : [
            {
                id       : 'dashboards',
                title    : 'Dashboards',
                translate: 'NAV.DASHBOARDS',
                type     : 'collapsable',
                icon     : 'dashboard',
                children : [
                    {
                        id   : 'analytics',
                        title: 'Analytics',
                        type : 'item',
                        url  : '/apps/dashboards/analytics'
                    },
                    {
                        id   : 'forms',
                        title: 'Forms',
                        type : 'item',
                        url  : '/apps/dashboards/forms'
                    }
                ]
            },
        ]
    },


];

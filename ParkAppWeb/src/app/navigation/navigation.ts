import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    
    // Applications :
    {
        id       : 'applications',
        title    : 'Applications',
        type     : 'group',
        icon     : 'apps',
        children : [
            {
                id       : 'dashboards',
                title    : 'Dashboards',
                type     : 'collapsable',
                icon     : 'dashboard',
                children : [
                    {
                        id   : 'analytics',
                        title: 'Analytics',
                        type : 'item',
                        url  : '/dashboards/analytics'
                    },
                    {
                        id   : 'project',
                        title: 'Project',
                        type : 'item',
                        url  : '/dashboards/project'
                    }
                ]
            },
            {
                id       : 'users',
                title    : 'Gestion d\'utilisateurs',
                type     : 'item',
                icon     : 'account_box',
                url      : '/administration/gstuser'
            }
        ]
    }

];

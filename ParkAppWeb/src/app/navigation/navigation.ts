import { FuseNavigation } from '@fuse/types';

export const navigation : FuseNavigation[] = [
    
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
                        url  : '/dashboard'
                    },
                    {
                        id   : 'project',
                        title: 'Project',
                        type : 'item',
                        url  : '/project'
                    }
                ]
            },
            {
                id       : 'users',
                title    : 'Gestion d\'utilisateurs',
                type     : 'item',
                icon     : 'account_box',
                url      : '/administration/gstuser'
            },
            {
<<<<<<< HEAD
                id       : 'gstloc',
                title    : 'Gestion Locations',
                type     : 'collapsable',
                icon     : 'dashboard',
                children : [
                    {
                        id       : 'list-locations',
                        title    : 'Liste de mes locations',
                        type     : 'item',
                        url      : '/locations/liste'
                    },
                    {
                        id   : 'add-loc',
                        title: 'Ajouter une Location',
                        type : 'item',
                        url  : '/locations/ajouter'
                    }
                ]
=======
                id       : 'places',
                title    : 'Gestion d\'places',
                type     : 'item',
                icon     : 'account_box',
                url      : '/places'
>>>>>>> 2ef23fbe91cfd7fee957a76050ea525c94a68f27
            }
        ]
    }

];

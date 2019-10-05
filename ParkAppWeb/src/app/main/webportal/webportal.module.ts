import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule,MatToolbarModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { WebportalComponent } from './webportal.component';

const routes = [
    {
        path     : '**',
        component: WebportalComponent,
    },
];

@NgModule({
    declarations: [
        WebportalComponent,
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatToolbarModule,
        MatButtonModule,
        
        FuseSharedModule,
        FuseSidebarModule
    ]
})
export class PortalModule
{
}

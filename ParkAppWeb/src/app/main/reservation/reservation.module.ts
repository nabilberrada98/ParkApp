import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule,MatCardModule, MatIconModule, MatTabsModule, MatDividerModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { AgmCoreModule } from '@agm/core';
import { ReservationComponent } from './reservation.component';
import { UICarouselModule } from "ui-carousel";

const routes = [
    {
        path     : '**',
        component: ReservationComponent,
    },
];

@NgModule({
    declarations: [
        ReservationComponent
    ],
    imports     : [
    RouterModule.forChild(routes),
        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        MatButtonModule,
        MatCardModule,
        FuseSharedModule,
        FuseSidebarModule,
        MatDividerModule,
        UICarouselModule,
        // Google Map
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAAFz7wsoEsvZOY24eqBigX57ZdcUT-RbA'
        }),
    ],
    entryComponents : [
        ReservationComponent
    ]
})
export class ReservationModule
{
}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatCardModule, MatIconModule, MatTabsModule, MatDividerModule, MatDialogModule, MatInputModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { AgmCoreModule } from '@agm/core';
import { ReservationComponent } from './reservation.component';
import { UICarouselModule } from "ui-carousel";
import { AddReservationComponent } from './add-reservation/add-reservation.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
const routes = [
    {
        path     : '**',
        component: ReservationComponent,
    },
];

@NgModule({
    declarations: [
        ReservationComponent,
        AddReservationComponent
    ],
    imports     : [
    RouterModule.forChild(routes),
        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        FuseSharedModule,
        MatInputModule,
        FuseSidebarModule,
        MatDividerModule,
        UICarouselModule,
        NgxDaterangepickerMd.forRoot(),
        // Google Map
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAAFz7wsoEsvZOY24eqBigX57ZdcUT-RbA'
        }),
    ],
    entryComponents : [
        ReservationComponent,
        AddReservationComponent
    ]
})
export class ReservationModule
{
}

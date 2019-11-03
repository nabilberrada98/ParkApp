import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatTableModule,
    MatToolbarModule,
    MatStepperModule,
    MatOptionModule,
    MatSelectModule,
    MatTooltipModule
} from "@angular/material";
import { FuseSharedModule } from "@fuse/shared.module";
import { FuseConfirmDialogModule, FuseSidebarModule } from "@fuse/components";
import { ReservationListComponent } from "./reservations-list/reservations-list.component";
import { ReservationsComponent } from "./Reservations.component";
import { ReservationsSelectedBarComponent } from "./selected-bar/selected-bar.component";
import { ReservationsMainSidebarComponent } from "./sidebars/main/main.component";
import { ReservationService } from "app/services/reservation.service";
const routes: Routes = [
    {
        path: "**",
        component: ReservationsComponent,
        resolve: {
            reservations : ReservationService
        }
    },
];

@NgModule({
    declarations: [
        ReservationsComponent,
        ReservationListComponent,
        ReservationsSelectedBarComponent,
        ReservationsMainSidebarComponent,
    ],
    imports: [
    RouterModule.forChild(routes),
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule, 
        MatRippleModule,
        MatTableModule,
        MatToolbarModule,
        MatStepperModule,
        MatOptionModule,
        MatSelectModule,
        MatTooltipModule,
        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule
    ],
    providers: [ReservationService],
    entryComponents: [ReservationListComponent]
})
export class ReservationsModule {}

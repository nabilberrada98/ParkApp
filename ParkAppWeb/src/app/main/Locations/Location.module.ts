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
    MatToolbarModule
} from "@angular/material";
import { FuseSharedModule } from "@fuse/shared.module";
import { FuseConfirmDialogModule, FuseSidebarModule } from "@fuse/components";
import { LocationsComponent } from "./locations.component";
import { LocationsService } from "./Location.service";
import { LocationsListComponent } from "./locations-list/locations-list.component";
import { LocationsSelectedBarComponent } from "./selected-bar/selected-bar.component";
import { LocationsMainSidebarComponent } from "./sidebars/main/main.component";
import { LocationsFormDialogComponent } from "./locations-form/locations-form.component";

const routes: Routes = [
    {
        path: "**",
        component: LocationsComponent,
        resolve: {
            users: LocationsService
        }
    }
];

@NgModule({
    declarations: [
        LocationsComponent,
        LocationsListComponent,
        LocationsSelectedBarComponent,
        LocationsMainSidebarComponent,
        LocationsFormDialogComponent
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

        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule
    ],
    providers: [LocationsService],
    entryComponents: [LocationsFormDialogComponent]
})
export class LocationsModule {}

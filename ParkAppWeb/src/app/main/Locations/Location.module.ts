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
import { LocationAddComponent } from './location-add/location-add.component';

const routes: Routes = [
    {
        path: "**",
        component: LocationsComponent,
        resolve: {
            locations : LocationsService
        }
    }
];

@NgModule({
    declarations: [
        LocationsComponent,
        LocationsListComponent,
        LocationsSelectedBarComponent,
        LocationsMainSidebarComponent,
        LocationAddComponent,
        LocationAddComponent
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
    entryComponents: [LocationsListComponent]
})
export class LocationsModule {}

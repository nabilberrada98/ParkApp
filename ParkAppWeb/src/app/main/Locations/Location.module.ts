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
import { AgmCoreModule } from '@agm/core';
import { FuseConfirmDialogModule, FuseSidebarModule } from "@fuse/components";
import { LocationsComponent } from "./locations.component";
import { LocationsService } from "../../services/Location.service";
import { LocationsListComponent } from "./locations-list/locations-list.component";
import { LocationsSelectedBarComponent } from "./selected-bar/selected-bar.component";
import { LocationsMainSidebarComponent } from "./sidebars/main/main.component";
import { LocationAddComponent } from './location-add/location-add.component';
import { InputFileConfig, InputFileModule } from 'ngx-input-file';
const routes: Routes = [
    {
        path: "ajouter",
        component: LocationAddComponent
    },
    {
        path: "liste",
        component: LocationsComponent,
        resolve: {
            locations : LocationsService
        }
    },
    {
        path: "**",
        component: LocationsComponent,
        resolve: {
            locations : LocationsService
        }
    },
];
const config: InputFileConfig = {
    fileAccept: 'image/*',
    fileLimit: 4,
    sizeLimit : 10000
};

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
        MatStepperModule,
        MatOptionModule,
        MatSelectModule,
        MatTooltipModule,
        // Google Map
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAAFz7wsoEsvZOY24eqBigX57ZdcUT-RbA'
        }),
        InputFileModule.forRoot(config),
        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule
    ],
    providers: [LocationsService],
    entryComponents: [LocationsListComponent]
})
export class LocationsModule {}

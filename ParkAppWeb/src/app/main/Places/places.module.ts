import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatSlideToggleModule, MatButtonToggleModule, MatMenuModule, MatToolbarModule, MatRippleModule, MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatListModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatSidenavModule, MatSliderModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatTooltipModule, MatTreeModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { FuseSidebarModule, FuseConfirmDialogModule } from '@fuse/components';
import { PlaceService } from 'app/services/place.service';
import { PlacesComponent } from './places.component';
import { PlacesListComponent } from './places-list/places-list.component';
import { PagerService } from './pager.service';
import { Ng5SliderModule } from 'ng5-slider';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown-angular7';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker'; 
import { CustomSearchComponent } from "./customsearch/customsearch.component";
import { MoreInfoDialogComponent } from "./places-list/more-dialog/more-dialog.component";

const routes = [
    {
        path     : '**',
        component: PlacesComponent,
    },
];


@NgModule({
    declarations: [
        PlacesComponent,
        PlacesListComponent,
        CustomSearchComponent,
        MoreInfoDialogComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatButtonToggleModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatSelectModule,
        MatSlideToggleModule,
        Ng5SliderModule,
        NgMultiSelectDropDownModule.forRoot(),
        NgxMaterialTimepickerModule,
        
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatListModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatRadioModule,
        MatSidenavModule,
        MatSliderModule,
        MatSnackBarModule,
        MatSortModule,
        MatStepperModule,
        MatTableModule,
        MatTabsModule,
        MatTooltipModule,
        MatTreeModule,


        FuseSharedModule,
        FuseSidebarModule,
        FuseConfirmDialogModule

    ],
    providers   : [
        PlaceService,
        PagerService,
    ],
    entryComponents: [PlacesComponent, MoreInfoDialogComponent]
})
export class PlacesModule
{
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatSliderModule } from '@angular/material';


import { FuseSharedModule } from '@fuse/shared.module';
import { AnalyticsDashboardComponent } from './analytics.component';
import { AnalyticsDashboardService } from './analytics.service';

const routes: Routes = [
    {
        path     : '**',
        component: AnalyticsDashboardComponent,
        resolve  : {
            data: AnalyticsDashboardService
        }
    }
];

@NgModule({
    declarations: [
        AnalyticsDashboardComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        MatSliderModule,
        FuseSharedModule,
    ],
    providers   : [
        AnalyticsDashboardService
    ]
})
export class AnalyticsDashboardModule
{
}


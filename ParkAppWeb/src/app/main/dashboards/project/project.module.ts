import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';

import { ProjectDashboardComponent } from 'app/main/dashboards/project/project.component';
import { ProjectDashboardService } from 'app/main/dashboards/project/project.service';

const routes: Routes = [
    {
        path     : '**',
        component: ProjectDashboardComponent,
       
    }
];

@NgModule({
    declarations: [
        ProjectDashboardComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule,
        FuseSidebarModule
    ],
    providers   : [
        ProjectDashboardService
    ]
})
export class ProjectDashboardModule
{
}


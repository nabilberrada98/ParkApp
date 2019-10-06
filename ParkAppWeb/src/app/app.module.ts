import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AgmCoreModule } from '@agm/core';

import { AppComponent } from 'app/app.component';
import { AppStoreModule } from 'app/store/store.module';
import { LayoutModule } from 'app/layout/layout.module';
import { FakeDbService } from './fake-db/fake-db.service';
const appRoutes: Routes = [
    {
        path        : '**',
        loadChildren: './main/webportal/webportal.module#PortalModule'
    },
    {
        path        : 'login',
        loadChildren: './main/login/login.module#LoginModule'
    },
    {
        path        : 'dashboards/analytics',
        loadChildren: './main/dashboards/analytics/analytics.module#AnalyticsDashboardModule',
    },
    {
        path        : 'dashboards/project',
        loadChildren: './main/dashboards/project/project.module#ProjectDashboardModule'
    },
    {
        path        : 'administration/gstuser',
        loadChildren: './main/administration/gstuser/gstuser.module#UsersModule'
    }
];

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),

        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay             : 0,
            passThruUnknownUrl: true
        }),
        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        AppStoreModule,



    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}

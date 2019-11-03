import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule } from '@angular/material';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { AppStoreModule } from 'app/store/store.module';
import { LayoutModule } from 'app/layout/layout.module';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { AuthGuardService } from './services/auth-guard.service';


const appRoutes: Routes = [
    {
        path        : 'lock',
        loadChildren: './main/login/login.module#LoginModule',
        canActivate: [AuthGuardService]
    },
    {
        path        : 'administration/gstuser',
        loadChildren: './main/administration/gstuser/gstuser.module#UsersModule',
        canActivate: [AuthGuardService]
    },
    {
        path        : 'project',
        loadChildren: './main/dashboards/project/project.module#ProjectDashboardModule',
        canActivate: [AuthGuardService]
    },
    {
        path        : 'dashboard',
        loadChildren: './main/dashboards/analytics/analytics.module#AnalyticsDashboardModule',
        canActivate: [AuthGuardService]
    },
    {
        path        : 'locations',
        loadChildren: './main/Locations/Location.module#LocationsModule',
        canActivate: [AuthGuardService]
    },
    {
        path        : 'reservation/:placeId',
        loadChildren: './main/reservation/reservation.module#ReservationModule',
        canActivate: [AuthGuardService]
    },
    {
        path        : 'places',
        loadChildren: './main/Places/places.module#PlacesModule',
        canActivate: [AuthGuardService]
    },
    {
        path        : '**',
        loadChildren: './main/webportal/webportal.module#PortalModule'
    }
];

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
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
    providers: [
        AuthService,
        UserService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule
{
}

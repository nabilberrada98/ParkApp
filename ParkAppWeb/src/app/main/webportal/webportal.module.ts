import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatToolbarModule, MatDialogModule, MatTabsModule, MatSnackBarModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { WebportalComponent } from './webportal.component';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
import { ProprioRegisterComponent } from './register-dialog/proprio-register/proprio-register.component';
import { LocataireRegisterComponent } from './register-dialog/locataire-register/locataire-register.component';
import { AgmCoreModule } from '@agm/core';
import { LoginDialogComponent } from "./login-dialog/login-dialog.component";
import { TableComponent } from './register-dialog/locataire-register/table/table.component';
 



const routes = [
    {
        path     : '**',
        component: WebportalComponent,
    },
];

@NgModule({
    declarations: [
        WebportalComponent,
        RegisterDialogComponent,
        ProprioRegisterComponent,
        LocataireRegisterComponent,
        TableComponent,
        LoginDialogComponent,
    ],
    imports     : [
    RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatTabsModule,
        MatSelectModule,
        MatToolbarModule,
        MatButtonModule,
        MatSnackBarModule,
        MatDialogModule,
        FuseSharedModule,
        FuseSidebarModule,

        // Google Map
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAAFz7wsoEsvZOY24eqBigX57ZdcUT-RbA'
        }),


    ],
    entryComponents : [
        RegisterDialogComponent,
        LoginDialogComponent
    ]
})
export class PortalModule
{
}

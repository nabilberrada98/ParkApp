import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule, MatTableModule, MatToolbarModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';
import { UsersComponent } from './gstuser.component';
import { UserService } from './User.service';
import { UsersFormDialogComponent } from './gstuser-form/gstuser-form.component';
import { UsersListComponent } from './gstuser-list/gstuser-list.component';
import { UsersMainSidebarComponent } from './sidebars/main/main.component';
import { UsersSelectedBarComponent } from './selected-bar/selected-bar.component';

const routes: Routes = [
    {
        path     : '**',
        component: UsersComponent,
        resolve  : {
            users : UserService
        }
    }
];

@NgModule({
    declarations   : [
        UsersComponent,
        UsersListComponent,
        UsersSelectedBarComponent,
        UsersMainSidebarComponent,
        UsersFormDialogComponent
    ],
    imports        : [
        
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
    providers      : [
        UserService
    ],
    entryComponents: [
        UsersFormDialogComponent
    ]
})
export class UsersModule
{
}

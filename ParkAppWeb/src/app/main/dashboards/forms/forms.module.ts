import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { MatTableModule } from '@angular/material' 
import { AgmCoreModule } from '@agm/core';
import { FormsComponent } from './forms.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
    {
        path     : '**',
        component: FormsComponent
    }
];

@NgModule({
    declarations: [
        FormsComponent,
        TableComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
 
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        MatTableModule,

        FuseSharedModule,
    ]
})
export class UIFormsModule
{
}

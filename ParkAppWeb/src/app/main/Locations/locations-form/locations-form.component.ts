import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Location } from '../Location.model';


@Component({
    selector     : 'locations-form-dialog',
    templateUrl  : './locations-form.component.html',
    styleUrls    : ['./locations-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class LocationsFormDialogComponent
{
    action: string;
    location : Location;
    locationForm: FormGroup;
    dialogTitle: string;
    /**
     * Constructor
     *
     * @param {MatDialogRef<locationsFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<LocationsFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    )
    {
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = '';
            this.location = _data.location;
        }
        else
        {
            this.dialogTitle = 'Ajouter une location';
            this.location = new Location({});
        }

        this.locationForm = this.createLocationForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create contact form
     *
     * @returns {FormGroup}
     */
    createLocationForm(): FormGroup
    {
        return this._formBuilder.group({
            id      : [this.location._id],
            // nom    : [this.location.nom],
            // prenom : [this.location.prenom],
            // avatar  : [this.location.avatar],
            // isBanned : [this.location.isBanned],
            // email   : [this.location.email],
            // NumTel   : [this.location.NumTel]
        });
    }
}

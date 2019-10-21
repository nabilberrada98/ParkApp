import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { User } from 'app/api/models/user';


@Component({
    selector     : 'gstuser-form-dialog',
    templateUrl  : './gstuser-form.component.html',
    styleUrls    : ['./gstuser-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class UsersFormDialogComponent
{
    action: string;
    user : User;
    userForm: FormGroup;
    dialogTitle: string;
    /**
     * Constructor
     *
     * @param {MatDialogRef<UsersFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<UsersFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    )
    {
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = '';
            this.user = _data.user;
        }
        else
        {
            this.dialogTitle = 'Ajouter un utilisateur';
            this.user = new User({});
        }

        this.userForm = this.createUserForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create contact form
     *
     * @returns {FormGroup}
     */
    createUserForm(): FormGroup
    {
        return this._formBuilder.group({
            _id      : [this.user._id],
            nom    : [this.user.nom],
            prenom : [this.user.prenom],
            avatar  : [this.user.avatar],
            isBanned : [this.user.isBanned],
            email   : [this.user.email],
            NumTel   : [this.user.phone]
        });
    }
}

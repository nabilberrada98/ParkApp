import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { UserService } from '../User.service';
import { UsersFormDialogComponent } from './../gstuser-form/gstuser-form.component';

@Component({
    selector     : 'users-list',
    templateUrl  : './gstuser-list.component.html',
    styleUrls    : ['./gstuser-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class UsersListComponent implements OnInit, OnDestroy
{
    @ViewChild('dialogContent')
    dialogContent: TemplateRef<any>;

    users: any;
    user: any;
    dataSource: FilesDataSource | null;
    displayedColumns = ['checkbox', 'Avatar', 'Nom', 'Email', 'Numéro','Etat', 'Buttons'];
    selectedUsers: any[];
    checkboxes: {};
    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {UserService} _userService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _userService: UserService,
        public _matDialog: MatDialog
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.dataSource = new FilesDataSource(this._userService);

        this._userService.onUsersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(users => {
                console.log(users);
                this.users = users;
                this.checkboxes = {};
                users.map(user => {
                    this.checkboxes[user.id] = false;
                });
            });

        this._userService.onSelectedUsersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedUsers => {
                for ( const id in this.checkboxes )
                {
                    if ( !this.checkboxes.hasOwnProperty(id) )
                    {
                        continue;
                    }

                    this.checkboxes[id] = selectedUsers.includes(id);
                }
                this.selectedUsers = selectedUsers;
            });

        this._userService.onUserDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(user => {
                this.user = user;
            });

        this._userService.onFilterChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this._userService.deselectUsers();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    editUser(user): void
    {
        this.dialogRef = this._matDialog.open(UsersFormDialogComponent, {
            panelClass: 'user-form-dialog',
            data      : {
                user,
                action : 'edit'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe(response => {
                if ( !response )
                {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                switch ( actionType )
                {
                    /**
                     * Save
                     */
                    case 'save':

                        this._userService.updateUser(formData.getRawValue());

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        this.deleteUser(user);

                        break;
                }
            });
    }

    deleteUser(user): void
    {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if ( result )
            {
                this._userService.deleteUser(user);
            }
            this.confirmDialogRef = null;
        });

    }

    onSelectedChange(Id): void
    {
        this._userService.toggleSelectedUser(Id);
    }
}

export class FilesDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param {UserService} _userService
     */
    constructor(
        private _userService: UserService
    )
    {
        super();
    } 

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        return this._userService.onUsersChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}

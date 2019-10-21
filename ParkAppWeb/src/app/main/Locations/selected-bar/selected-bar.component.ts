import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { LocationsService } from '../../../services/Location.service';

@Component({
    selector   : 'selected-bar',
    templateUrl: './selected-bar.component.html',
    styleUrls  : ['./selected-bar.component.scss']
})
export class LocationsSelectedBarComponent implements OnInit, OnDestroy
{
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    hasSelectedLocations: boolean;
    isIndeterminate: boolean;
    selectedLocations: string[];

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {UserServilocation}
     * @param {MatDialog} _matDialog
     */
    constructor(
        public _matDialog: MatDialog,
        private locationService : LocationsService
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
        this.locationService.onSelectedLocationChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedLocations => {
                this.selectedLocations = selectedLocations;
                setTimeout(() => {
                    this.hasSelectedLocations = selectedLocations.length > 0;
                    this.isIndeterminate = (selectedLocations.length !== this.locationService.locations.length && selectedLocations.length > 0);
                }, 0);
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

    /**
     * Select all
     */
    selectAll(): void
    {
        this.locationService.selectLocations();
    }

    /**
     * Deselect all
     */
    deselectAll(): void
    {
        this.locationService.deselectLocations();
    }

    deleteSelectedLocations(): void
    {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Etes vous sur de vouloir supprimer toutes vos locations ?';

        this.confirmDialogRef.afterClosed()
            .subscribe(result => {
                if ( result )
                {
                    this.locationService.deleteselectedLocations();
                }
                this.confirmDialogRef = null;
            });
    }
}

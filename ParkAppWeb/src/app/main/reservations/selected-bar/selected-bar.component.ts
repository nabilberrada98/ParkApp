import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { ReservationService } from './../../../services/reservation.service';

@Component({
    selector   : 'selected-bar',
    templateUrl: './selected-bar.component.html',
    styleUrls  : ['./selected-bar.component.scss']
})
export class ReservationsSelectedBarComponent implements OnInit, OnDestroy
{
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    hasSelectedReservations: boolean;
    isIndeterminate: boolean;
    selectedReservations: string[];

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ReservationService}
     * @param {MatDialog} _matDialog
     */
    constructor(
        public _matDialog: MatDialog,
        private _ReservationsService : ReservationService
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
        this._ReservationsService.onSelectedReservationChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedReservations => {
                this.selectedReservations = selectedReservations;
                setTimeout(() => {
                    this.hasSelectedReservations = selectedReservations.length > 0;
                    this.isIndeterminate = (selectedReservations.length !== this._ReservationsService.reservations.length && selectedReservations.length > 0);
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
        this._ReservationsService.selectReservations();
    }

    /**
     * Deselect all
     */
    deselectAll(): void
    {
        this._ReservationsService.deselectReservations();
    }

    deleteSelectedReservations(): void
    {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Etes vous sur de vouloir supprimer toutes vos Locations ?';

        this.confirmDialogRef.afterClosed()
            .subscribe(result => {
                if ( result )
                {
                    this._ReservationsService.deleteselectedReservations();
                }
                this.confirmDialogRef = null;
            });
    }
}

import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { ReservationService } from '../../../services/reservation.service';

@Component({
    selector     : 'reservations-list',
    templateUrl  : './reservations-list.component.html',
    styleUrls    : ['./reservations-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ReservationListComponent implements OnInit, OnDestroy
{
    @ViewChild('dialogContent')
    dialogContent: TemplateRef<any>;
    reservations: any;
    reservation: any;
    dataSource: FilesDataSource | null;
    displayedColumns = ['checkbox', 'Locataire', 'Place', 'NbrJours', 'Debut','Fin','Confirmed', 'Buttons'];
    selectedReservations: any[];
    checkboxes: {};
    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ReservationService} _reservationservice
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _reservationservice: ReservationService,
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
        this.dataSource = new FilesDataSource(this._reservationservice);
        this._reservationservice.onReservationsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(reservations => {
                console.log(reservations);
                this.reservations = reservations;
                this.checkboxes = {};
                reservations.map(reservation => {
                    this.checkboxes[reservation._id] = false;
                });
            });

        this._reservationservice.onSelectedReservationChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedreservations => {
                for ( const id in this.checkboxes )
                {
                    if ( !this.checkboxes.hasOwnProperty(id) )
                    {
                        continue;
                    }

                    this.checkboxes[id] = selectedreservations.includes(id);
                }
                this.selectedReservations = selectedreservations;
            });

        this._reservationservice.onReservationDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(reservation => {
                this.reservation = reservation;
            });

        this._reservationservice.onFilterChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this._reservationservice.deselectReservations();
            });
    }

    showConfirm(reservation): void
    {

         this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Etes vous sure de vouloir confirmé cette reservation ?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if ( result )
            {
                this._reservationservice.confirmReservation(reservation);
            }
            this.confirmDialogRef = null;
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
    deleteReservation(reservation): void
    {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Etes vous sur ?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if ( result )
            {
                this._reservationservice.deleteReservation(reservation);
            }
            this.confirmDialogRef = null;
        });

    }

    onSelectedChange(Id): void
    {
        this._reservationservice.toggleSelectedReservation(Id);
    }
}

export class FilesDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param {reservationservice} _reservationservice
     */
    constructor(
        private _reservationservice: ReservationService
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
        return this._reservationservice.onReservationsChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}

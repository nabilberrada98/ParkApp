import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { ReservationService } from 'app/services/reservation.service';

@Component({
    selector     : 'reservations',
    templateUrl  : './Reservations.component.html',
    styleUrls    : ['./Reservations.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})

export class ReservationsComponent implements OnInit, OnDestroy
{
    dialogRef: any;
    hasSelectedReservations: boolean;
    searchInput: FormControl;

    // Private
    private _unsubscribeAll: Subject<any>;
    
    /**
     * Constructor
     *
     * @param {ReservationService}
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _reservationService: ReservationService,
        private _fuseSidebarService: FuseSidebarService
    )
    {
        // Set the defaults
        this.searchInput = new FormControl('');

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
        this._reservationService.onSelectedReservationChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedReservation => {
                this.hasSelectedReservations = selectedReservation.length > 0;
            });

        this.searchInput.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe(searchText => {
                this._reservationService.onSearchTextChanged.next(searchText);
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
    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void
    {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}

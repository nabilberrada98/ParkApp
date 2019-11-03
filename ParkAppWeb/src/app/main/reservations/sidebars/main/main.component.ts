import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ReservationService } from './../../../../services/reservation.service';

@Component({
    selector   : 'reservation-main-sidebar',
    templateUrl: './main.component.html',
    styleUrls  : ['./main.component.scss']
})
export class ReservationsMainSidebarComponent implements OnInit, OnDestroy
{
    reservation: any;
    filterBy: string;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ReservationService} _ReservationService
     */
    constructor(
        private _ReservationsService: ReservationService
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
        this.filterBy = this._ReservationsService.filterBy || 'all';

        this._ReservationsService.onReservationDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(reservation => {
                this.reservation = reservation;
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
     * Change the filter
     *
     * @param filter
     */
    changeFilter(filter): void
    {
        this.filterBy = filter;
        this._ReservationsService.onFilterChanged.next(this.filterBy);
    }
}

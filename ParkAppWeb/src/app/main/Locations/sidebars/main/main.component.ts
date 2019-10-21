import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LocationsService } from '../../../../services/Location.service';

@Component({
    selector   : 'locations-main-sidebar',
    templateUrl: './main.component.html',
    styleUrls  : ['./main.component.scss']
})
export class LocationsMainSidebarComponent implements OnInit, OnDestroy
{
    location: any;
    filterBy: string;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {locationService} _locationsService
     */
    constructor(
        private _locationsService: LocationsService
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
        this.filterBy = this._locationsService.filterBy || 'all';

        this._locationsService.onLocationDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(location => {
                this.location = location;
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
        this._locationsService.onFilterChanged.next(this.filterBy);
    }
}

import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { LocationsService } from 'app/services/Location.service';

@Component({
    selector     : 'locations',
    templateUrl  : './Locations.component.html',
    styleUrls    : ['./Locations.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})

export class LocationsComponent implements OnInit, OnDestroy
{
    dialogRef: any;
    hasSelectedLocations: boolean;
    searchInput: FormControl;

    // Private
    private _unsubscribeAll: Subject<any>;
    
    /**
     * Constructor
     *
     * @param {LocationsService}
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _locationService: LocationsService,
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
        this._locationService.onSelectedLocationChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedUsers => {
                this.hasSelectedLocations = selectedUsers.length > 0;
            });

        this.searchInput.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe(searchText => {
                this._locationService.onSearchTextChanged.next(searchText);
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

    // newLocation(): void
    // {
    //     this.dialogRef.afterClosed()
    //         .subscribe((response: FormGroup) => {
    //             if ( !response )
    //             {
    //                 return;
    //             }

    //             this._locationService.updateLocation(response.getRawValue());
    //         });
    // }

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

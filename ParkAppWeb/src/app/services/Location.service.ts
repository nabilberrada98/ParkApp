import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject} from 'rxjs';
import { FuseUtils } from '@fuse/utils';
import { Location } from './../api/models/Location.model';
import {getAllLocations,storeLocation,updateLocation} from '../api/controllers/LocationInstance.js';
@Injectable()
export class LocationsService implements Resolve<any>
{
    onLocationsChanged: BehaviorSubject<any>;
    onSelectedLocationChanged: BehaviorSubject<any>;
    onLocationDataChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;
    locations: Location[];
    location : any;
    selectedLocations: string[] = [];

    searchText: string;
    filterBy: string;

    /**
     * Constructor
     *
     *
     */
    constructor()
    {
        // Set the defaults
        this.onLocationsChanged = new BehaviorSubject([]);
        this.onSelectedLocationChanged = new BehaviorSubject([]);
        this.onLocationDataChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new Subject();
        this.onFilterChanged = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return  this.getLocations().then((data) => {
                    this.onSearchTextChanged.subscribe(searchText => {
                        this.searchText = searchText;
                        this.getLocations();
                    });

                    this.onFilterChanged.subscribe(filter => {
                        this.filterBy = filter;
                        this.getLocations();
                    });
                });
    }

    getLocations(): Promise<any>
    {
        return getAllLocations().then((response)=>{
                        this.locations = response;
                        if ( this.filterBy === 'Active' )
                        {
                            this.locations = this.locations.filter(_loc => {
                                return _loc.status;
                            });
                        }

                        if ( this.filterBy === 'Inactive' )
                        {
                            this.locations = this.locations.filter(_loc => {
                                return !_loc.status;
                            });
                        }

                        if ( this.searchText && this.searchText !== '' )
                        {
                            this.locations = FuseUtils.filterArrayByString(this.locations, this.searchText);
                        }
                        // console.log('here');
                        // this.locations = this.locations.map(loc => {
                        //     return new Location(loc);
                        // });
                        // console.log('here');
                        this.onLocationsChanged.next(this.locations);
            });
    }

    toggleSelectedLocation(id): void
    {
        if ( this.selectedLocations.length > 0 )
        {
            const index = this.selectedLocations.indexOf(id);

            if ( index !== -1 )
            {
                this.selectedLocations.splice(index, 1);

                // Trigger the next event
                this.onSelectedLocationChanged.next(this.selectedLocations);

                // Return
                return;
            }
        }

        // If we don't have it, push as selected
        this.selectedLocations.push(id);

        // Trigger the next event
        this.onSelectedLocationChanged.next(this.selectedLocations);
    }

    /**
     * Toggle select all
     */
    toggleSelectAll(): void
    {
        if ( this.selectedLocations.length > 0 )
        {
            this.deselectLocations();
        }
        else
        {
            this.selectLocations();
        }
    }

    selectLocations(filterParameter?, filterValue?): void
    {
        this.selectedLocations = [];

        // If there is no filter, select all locations
        if ( filterParameter === undefined || filterValue === undefined )
        {
            this.selectedLocations = [];
            this.locations.map(loc => {
                this.selectedLocations.push(loc._id);
            });
        }

        // Trigger the next event
        this.onSelectedLocationChanged.next(this.selectedLocations);
    }

    updateLocation(location): Promise<any>
    {
        return updateLocation(location._id,{...location}).then(response => {
                    this.getLocations();
            });
    }

    deselectLocations(): void
    {
        this.selectedLocations = [];

        // Trigger the next event
        this.onSelectedLocationChanged.next(this.selectedLocations);
    }

    deletelocation(location): void
    {
        const Index = this.locations.indexOf(location);
        this.locations.splice(Index, 1);
        this.onLocationsChanged.next(this.locations);
    }

    deleteselectedLocations(): void
    {
        for ( const locationId of this.selectedLocations )
        {
            const location = this.locations.find(location => {
                return location._id === locationId;
            });
            const Index = this.locations.indexOf(location);
            this.locations.splice(Index, 1);
        }
        this.onLocationsChanged.next(this.locations);
        this.deselectLocations();
    }

    public storeLocation(data): Promise<any>{
        return storeLocation(data).then(response => {
            this.getLocations();
        });
    }


}

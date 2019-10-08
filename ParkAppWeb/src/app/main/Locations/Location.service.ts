import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject, from } from 'rxjs';
import {Location} from './Location.model';
import { FuseUtils } from '@fuse/utils';

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
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
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
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getLocations()
            ]).then(
                ([files]) => {
                    this.onSearchTextChanged.subscribe(searchText => {
                        this.searchText = searchText;
                        this.getLocations();
                    });

                    this.onFilterChanged.subscribe(filter => {
                        this.filterBy = filter;
                        this.getLocations();
                    });

                    resolve();

                },
                reject
            );
        });
    }

    getLocations(): Promise<any>
    {
        return new Promise((resolve, reject) => {
                this._httpClient.get('api/locations')
                    .subscribe((response: any) => {
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

                        this.locations = this.locations.map(loc => {
                            return new Location(loc);
                        });
                        console.log('from service get locations');
                        console.log(this.locations);
                        this.onLocationsChanged.next(this.locations);
                        resolve(this.locations);
                    }, reject);
            }
        );
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
        return new Promise((resolve, reject) => {

            this._httpClient.post('api/locations/' + location._id, {...location})
                .subscribe(response => {
                    this.getLocations();
                    resolve(response);
                });
        });
    }

    /**
     * Update location data
     *
     * @param locationData
     * @returns {Promise<any>}
     */
    updateLocationData(locationData): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/locations/' + this.location.id, {...locationData})
                .subscribe(response => {
                    this.getLocations();
                    resolve(response);
                });
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

}

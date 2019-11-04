import { Injectable } from '@angular/core';
import { getRangePrices, getUserLibelles, getAllPlaces } from '../api/controllers/PlaceInstance.js';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { FuseUtils } from '@fuse/utils/index.js';
import * as _ from 'lodash';
import { AuthService } from './auth.service.js';
@Injectable({
  providedIn: 'root'
})
export class PlaceService {

    onPlacesChanged: BehaviorSubject<any>;
    onPlaceDataChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;

    places: any[];
    place: any;
    rangePrices: {};

    searchText: string;
    filterBy: string;

    constructor(
        private _authService: AuthService
    ) {
        this.onPlacesChanged = new BehaviorSubject([]);
        this.onPlaceDataChanged = new BehaviorSubject([]);
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

            Promise.all([this.getPlaces()]).then(
                () => {

                    this.onSearchTextChanged.subscribe(searchText => {
                        this.searchText = searchText;
                        this.getPlaces();
                    });

                    resolve();

                },
            );
        });
    }

    getPlaces(): Promise<any>{
        return new Promise( (resolve) => {
            getAllPlaces().then((data) => {
                this.places = data;

                resolve(data);

                if ( this.searchText && this.searchText !== '' ){
                    this.places = FuseUtils.filterArrayByString(this.places, this.searchText);
                }
    
                this.onPlacesChanged.next(this.places);
    
            });
        });
    }

    rangePrix(): Promise<Object>{
        return new Promise( (resolve, reject) => {
            getRangePrices().then( (data) => {
                resolve(data);
            });
        });
    }

    userLibelles(): Promise<any>{
        let id = this._authService.user._id;
        return new Promise( (resolve, reject) => {
            getUserLibelles(id).then( (data) => {
                resolve(data);
            }) ;
        });
    }



}

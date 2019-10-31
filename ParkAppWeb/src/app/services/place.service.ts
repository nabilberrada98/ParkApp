import { Injectable } from '@angular/core';
import { getRangePrices, getUserAddressTxt } from '../api/controllers/PlaceInstance.js';
import { User } from '../api/models/user';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { FuseUtils } from '@fuse/utils/index.js';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class PlaceService {

    onUsersChanged: BehaviorSubject<any>;
    onSelectedUsersChanged: BehaviorSubject<any>;
    onUserDataChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;

    users: any[];
    user: any;
    selectedUsers: string[] = [];

    searchText: string;
    filterBy: string;

    rangePrices: {};

    constructor() {

        this.onUsersChanged = new BehaviorSubject([]);
        this.onSelectedUsersChanged = new BehaviorSubject([]);
        this.onUserDataChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new Subject();
        this.onFilterChanged = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    rangePrix(): Promise<Object>{
        return new Promise( (resolve, reject) => {
            getRangePrices().then( (data) => {
                resolve(data);
            });
        });
    }

    userAddressTxt(id): Promise<any>{
        return new Promise( (resolve, reject) => {
            getUserAddressTxt(id).then( (data) => {
                resolve(data);
            }) ;
        });
    }

}

import { Injectable, OnInit } from '@angular/core';
import { storeUser as storeUService,getUser, updateUser as updUserS,getAllUsers} from '../api/controllers/UserInstance.js';
import { User } from '../api/models/user';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { FuseUtils } from '@fuse/utils/index.js';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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
                this.getUsers(),
                this.getUserData()
            ]).then(
                ([files]) => {
                    this.onSearchTextChanged.subscribe(searchText => {
                        this.searchText = searchText;
                        this.getUsers();
                    });

                    this.onFilterChanged.subscribe(filter => {
                        this.filterBy = filter;
                        this.getUsers();
                    });
                    resolve();
                },
                reject
            );
        });
    }

    getUsers()
    {
        return getAllUsers().then((data) => {
                        this.users = data;
                        console.log(data);
                        if ( this.filterBy === 'Propriétaire' )
                        {
                            this.users = this.users.filter(_user => {
                                return _user.role.name==='proprietaire';
                            });
                        }

                        if ( this.filterBy === 'Administrateur' )
                        {
                            this.users = this.users.filter(_user => {
                                return _user.role.name==='administrateur';
                            });
                        }

                        if ( this.filterBy === 'Locataire' )
                        {
                            this.users = this.users.filter(_user => {
                                return _user.role.name === 'locataire';
                            });
                        }

                        if ( this.searchText && this.searchText !== '' )
                        {
                            this.users = FuseUtils.filterArrayByString(this.users, this.searchText);
                        }
                        // this.users = this.users.map(user => {
                        //     return new User(user);
                        // });
                        this.onUsersChanged.next(this.users);
            });
    }

    /**
     * Get user data
     *
     * @returns {Promise<any>}
     */
    getUserData()
    {
        this.user = this.getCurrentUser();
        this.onUserDataChanged.next(this.user);
        return new Promise((resolve, reject) => { 
            this.onUserDataChanged.next(this.user);
            resolve(this.user);
        });
    }

    toggleSelectedUser(_id): void
    {
        if ( this.selectedUsers.length > 0 )
        {
            const index = this.selectedUsers.indexOf(_id);

            if ( index !== -1 )
            {
                this.selectedUsers.splice(index, 1);

                // Trigger the next event
                this.onSelectedUsersChanged.next(this.selectedUsers);

                // Return
                return;
            }
        }

        // If we don't have it, push as selected
        this.selectedUsers.push(_id);

        // Trigger the next event
        this.onSelectedUsersChanged.next(this.selectedUsers);
    }

    /**
     * Toggle select all
     */
    toggleSelectAll(): void
    {
        if ( this.selectedUsers.length > 0 )
        {
            this.deselectUsers();
        }
        else
        {
            this.selectUsers();
        }
    }

    selectUsers(filterParameter?, filterValue?): void
    {
        this.selectedUsers = [];
        // If there is no filter, select all users
        if ( filterParameter === undefined || filterValue === undefined )
        {
            this.selectedUsers = [];
            this.users.map(user => {
                this.selectedUsers.push(user._id);
            });
        }
        // Trigger the next event
        this.onSelectedUsersChanged.next(this.selectedUsers);
    }

    updateUser(user): Promise<any>
    {
        return updUserS(user._id, {...user}).then(data => {
                    this.getUsers();
                });
    }

    deselectUsers(): void
    {
        this.selectedUsers = [];
        // Trigger the next event
        this.onSelectedUsersChanged.next(this.selectedUsers);
    }

    deleteUser(user): void
    {
        const Index = this.users.indexOf(user);
        this.users.splice(Index, 1);
        this.onUsersChanged.next(this.users);
    }

    deleteselectedUsers(): void
    {
        for ( const userId of this.selectedUsers )
        {
            const user = this.users.find(user => {
                return user._id === userId;
            });
            const Index = this.users.indexOf(user);
            this.users.splice(Index, 1);
        }
        this.onUsersChanged.next(this.users);
        this.deselectUsers();
    }

    getCurrentUser(): User {
        const user = JSON.parse(sessionStorage.getItem("currentUser"));
        return user ? new User({...user, role : user.authorities}) : undefined;
    }

    async storeUser(user): Promise<boolean>{
        await storeUService(user).then((data)=>{
            return true;
        });
        return false;
    }


    save(user,token): void {
        sessionStorage.setItem("currentUser", JSON.stringify(user));
        sessionStorage.setItem("token", JSON.stringify(token));
    }

    delete(): void {
        sessionStorage.removeItem("currentUser");
        sessionStorage.removeItem("token");
    }

    get(uid: number): void{
        getUser(uid).then( (data) => { 
            console.log(data);
        })
        .catch( (err) => console.log(err) );
    }

}

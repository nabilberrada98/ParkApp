import { Injectable } from "@angular/core";
import {
    Router,
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from "@angular/router";
import { storeReservation } from "../api/controllers/ReservationInstance";
import { BehaviorSubject, Subject, Observable } from "rxjs";
import { Reservation } from "app/api/models/Reservation.model";
import {
    getAllReservations,
    updateReservation as updateReservationApi,
    confirmReservation as ConfirmR
} from "app/api/controllers/ReservationInstance";
import { FuseUtils } from "@fuse/utils";
import { AuthService } from './auth.service';
@Injectable({
    providedIn: "root"
})
export class ReservationService implements Resolve<any> {
    onReservationsChanged: BehaviorSubject<any>;
    onSelectedReservationChanged: BehaviorSubject<any>;
    onReservationDataChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;
    reservations: Reservation[];
    reservation: any;
    selectedReservations: string[] = [];

    searchText: string;
    filterBy: string;

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        return this.getReservations().then(data => {
            this.onSearchTextChanged.subscribe(searchText => {
                this.searchText = searchText;
                this.getReservations();
            });
            this.onFilterChanged.subscribe(filter => {
                this.filterBy = filter;
                this.getReservations();
            });
        });
    }
    
    constructor(private router: Router,private authS : AuthService)
    {
        this.onReservationsChanged = new BehaviorSubject([]);
        this.onSelectedReservationChanged = new BehaviorSubject([]);
        this.onReservationDataChanged= new BehaviorSubject([]);
        this.onSearchTextChanged = new Subject();
        this.onFilterChanged = new Subject();
    }


    async confirmReservation(reservation) {
       return await ConfirmR(reservation).then((data)=>{
           return data;
       });
    }

    getReservations(): Promise<any> {
        return getAllReservations().then(response => {
            this.reservations = response;
            /*this.reservations = [
                new Reservation({
                    _id : "45678912321213",
                    startTime : "20/10/2019",
                    endTime: "27/10/2019",
                    isConfirmed : true,
                    locataire: this.authS.user,
                    place : {
                        localisation : {
                            adresseTxt : "44 ,khiame 6"
                        }
                    },
                    nbrJours : 7
                }),    
                new Reservation({
                    _id : "45678912321213",
                    startTime : "20/10/2019",
                    endTime: "27/10/2019",
                    isConfirmed : true,
                    locataire: this.authS.user,
                    place : {
                        localisation : {
                            adresseTxt : "44 ,khiame 6"
                        }
                    },
                    nbrJours : 7
                })
            ];*/
            if (this.filterBy === "Confirmé") {
                this.reservations = this.reservations.filter(_reserv => {
                    return _reserv.isConfirmed;
                });
            } else if (this.filterBy === "En attente") {
                this.reservations = this.reservations.filter(_reserv => {
                    return !_reserv.isConfirmed;
                });
            } else if (this.filterBy === "En cours") {
                this.reservations = this.reservations.filter(_reserv => {
                    // To edit
                    return !_reserv.startTime;
                });
            }

            if (this.searchText && this.searchText !== "") {
                this.reservations = FuseUtils.filterArrayByString(
                    this.reservations,
                    this.searchText
                );
            }
            // console.log('here');
            // this.reservations = this.reservations.map(reserv => {
            //     return new Reservation(reserv);
            // });
            // console.log('here');
            this.onReservationsChanged.next(this.reservations);
        });
    }

    toggleSelectedReservation(id): void {
        if (this.selectedReservations.length > 0) {
            const index = this.selectedReservations.indexOf(id);

            if (index !== -1) {
                this.selectedReservations.splice(index, 1);

                // Trigger the next event
                this.onSelectedReservationChanged.next(
                    this.selectedReservations
                );

                // Return
                return;
            }
        }

        // If we don't have it, push as selected
        this.selectedReservations.push(id);

        // Trigger the next event
        this.onSelectedReservationChanged.next(this.selectedReservations);
    }

    /**
     * Toggle select all
     */
    toggleSelectAll(): void {
        if (this.selectedReservations.length > 0) {
            this.deselectReservations();
        } else {
            this.selectReservations();
        }
    }

    selectReservations(filterParameter?, filterValue?): void {
        this.selectedReservations = [];

        // If there is no filter, select all reservations
        if (filterParameter === undefined || filterValue === undefined) {
            this.selectedReservations = [];
            this.reservations.map(reserv => {
                this.selectedReservations.push(reserv._id);
            });
        }

        // Trigger the next event
        this.onSelectedReservationChanged.next(this.selectedReservations);
    }

    updateReservation(reserv): Promise<any> {
        return updateReservationApi(reserv._id, { ...reserv }).then(
            response => {
                this.getReservations();
            }
        );
    }

    deselectReservations(): void {
        this.selectedReservations = [];

        // Trigger the next event
        this.onSelectedReservationChanged.next(this.selectedReservations);
    }

    deleteReservation(reserv): void {
        const Index = this.reservations.indexOf(reserv);
        this.reservations.splice(Index, 1);
        this.onReservationsChanged.next(this.reservations);
    }

    deleteselectedReservations(): void {
        for (const reservationId of this.selectedReservations) {
            const reservation = this.reservations.find(reservation => {
                return reservation._id === reservationId;
            });
            const Index = this.reservations.indexOf(reservation);
            this.reservations.splice(Index, 1);
        }
        this.onReservationsChanged.next(this.reservations);
        this.deselectReservations();
    }

    public async storeReservation(data): Promise<void> {
        await storeReservation(data)
            .then(data => {
                this.router.navigate(["/"]);
            })
            .catch(err => console.log(err));
    }
}

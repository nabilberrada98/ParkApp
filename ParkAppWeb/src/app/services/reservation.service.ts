import { Injectable, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {storeReservation} from '../api/controllers/ReservationInstance';
@Injectable({
  providedIn: 'root'
})
export class ReservationService {


    constructor(
        private router: Router) {
    }

    public async storeReservation(data): Promise<void> {
        await storeReservation(data).then((data)=>{
            this.router.navigate(['/']);
        })
        .catch( (err) => console.log(err) );
    }

}

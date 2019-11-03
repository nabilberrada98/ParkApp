import { Place } from "./Place.model";
import { User } from 'app/api/models/User.model';

export class Reservation
{

    _id : string;
    startTime : string;
    endTime: string;
    isConfirmed : boolean;
    locataire: string;
    place : Place;
    nbrJours : Number;
    constructor(Reservation)
    {
        {
            this._id = Reservation._id;
            this.startTime = Reservation.startTime;
            this.endTime = Reservation.endTime;
            this.isConfirmed = Reservation.isConfirmed;
            this.locataire = Reservation.locataire.nom + " "+Reservation.locataire.prenom;
            this.place = Reservation.place;
            this.nbrJours = Reservation.nbrJours;
        }
    }
}

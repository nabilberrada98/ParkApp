import { Place } from "./Place.model";

export class Location
{
    _id : string;
    prix : number;
    status: boolean;
    type: number;
    locataire: string;
    place : Place;
    constructor(Location)
    {
        {
            this._id = Location.id || undefined;
            this.prix = Location.prix;
            this.status = Location.status || true;
            this.type = Location.type;
            this.locataire = Location.locataire;
            this.place = Location.place;
        }
    }
}

export class Place
{
    description: string;
    disponibilite: JSON;
    numero: number;
    etage: number;
    vehicule: JSON;
    parking: string;
    images : [];
    constructor(place)
    {
        {
            this.description = place.description;
            this.disponibilite = place.disponibilite;
            this.numero = place.numero || '';
            this.etage = place.etage || 0;
            this.vehicule = place.isBanned || ['Citadine'];
            this.parking = place.parking;
            this.images = place.images || [];
        }
    }
}

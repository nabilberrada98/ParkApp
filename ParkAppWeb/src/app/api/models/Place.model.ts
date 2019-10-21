export class Place
{
    description: string;
    disponibilite: JSON;
    numero: number;
    etage: number;
    vehicules : [];
    isInParking : boolean;
    heureFermetureParking: string;
    heureOuvertureParking: string;
    images : [];
    constructor(place)
    {
        {
            this.description = place.description;
            this.disponibilite = place.disponibilite;
            this.numero = place.numero || '';
            this.etage = place.etage || 0;
            this.vehicules = place.vehicules || ['Citadine'];
            this.isInParking = place.parking;
            this.heureFermetureParking=place.heureFermetureParking;
            this.heureOuvertureParking =place.heureOuvertureParking;
            this.images = place.images || [];
        }
    }
}

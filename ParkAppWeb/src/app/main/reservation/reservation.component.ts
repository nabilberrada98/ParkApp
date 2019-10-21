import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
  animations   : fuseAnimations
})
export class ReservationComponent implements OnInit {

  public SelectedLocation : {}

  constructor() { }
  
  ngOnInit() {
    this.SelectedLocation = {
      prix: 20,
      type : 0,
      description: "Ceci est un exemple de description",
      place: {
        numero: "K220",
        etage: 0,
        type: 0,
        vehicules: [
          0,
          1
        ],
        heureOuvertureParking: 6,
        heureFermetureParking: 23,
        isInParking: true,
        isCameraEquiped: true,
        localisation: {
          lat: 33.9664448022247,
          lng: -6.872549057006836,
          ville: "rabat"
        },
        images : [
          "assets/places/place1.jpeg",
          "assets/places/place2.jpg"
      ]
      }
    };
  }

}

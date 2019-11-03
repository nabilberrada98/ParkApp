import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog } from '@angular/material';
import {AddReservationComponent} from './add-reservation/add-reservation.component';
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class ReservationInfoComponent implements OnInit {

  public SelectedLocation;

  constructor(private dialog: MatDialog) { }
  
  ngOnInit() {
    this.SelectedLocation = {
      prix: 20,
      type : 0,
      joursLouable : [1,2,3,4] ,
      description: "Ceci est un exemple de description",
      place: {
        _id : "2332ZIOEFJZEF",
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


  reservDialog(){
    AddReservationComponent.location = this.SelectedLocation.joursLouable;  
    let dialogRef=this.dialog.open(AddReservationComponent,{
      height: '80%',
      width: '70%',
    });
    let instance = dialogRef.componentInstance;
    instance.prix = this.SelectedLocation.prix;
    instance.type = this.SelectedLocation.type;
    instance.placeId = this.SelectedLocation._id;
  }

  

}

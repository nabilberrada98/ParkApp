import { Component, Input, OnInit } from '@angular/core';
import { MoreInfoDialogComponent } from "./more-dialog/more-dialog.component";
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-places-list',
  templateUrl: './places-list.component.html',
  styleUrls: ['./places-list.component.scss']
})
export class PlacesListComponent implements OnInit {

    cardExpanded: Boolean;
    @Input() places: [];

    constructor(
        public dialog: MatDialog
    ) { 
        this.cardExpanded = false;
    }

    ngOnInit(): void{
        
    }


    moreInfo(placeId): void{
        // const place = this.places.filter( (p) => p.id === placeId)[0];
        // this.dialog.open(MoreInfoDialogComponent, { data: place }); 
    }


}

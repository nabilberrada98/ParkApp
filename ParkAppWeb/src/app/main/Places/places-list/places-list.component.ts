import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-places-list',
  templateUrl: './places-list.component.html',
  styleUrls: ['./places-list.component.scss']
})
export class PlacesListComponent implements OnInit {

    cardExpanded: Boolean;

    constructor() { 
        this.cardExpanded = false;
    }

    ngOnInit() {
    }



}

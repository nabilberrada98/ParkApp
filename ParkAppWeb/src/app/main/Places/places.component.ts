import { Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { PagerService } from './pager.service';
import { Options, LabelType } from 'ng5-slider';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PlaceService } from 'app/services/place.service';


@Component({
    selector     : 'app-places',
    templateUrl  : './places.component.html',
    styleUrls    : ['./places.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class PlacesComponent implements OnInit {

    @ViewChild('settingsSidenav') sidenav: any;
    dialogRef: any;
    hasSelectedUsers: boolean;
    searchInput: FormControl;

    pagedItems: any[];
    places = [];
    // pager object
    pager: any = {};

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {UserService} _userService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _placeService: PlaceService,
        private _fuseSidebarService: FuseSidebarService,
        private pagerService: PagerService, 
        private fb: FormBuilder,
    ){
        this.searchInput = new FormControl('');

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
    
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void{ 

        this.places.push(
            {
                id: 1,
                prix: 20,
                description: "place 1",
                locataire: {
                    "id": "5da39d87a6b37c6a141358e9",
                    "nom" : "younes",
                    "prenom" : "enhari",
                    "phone" : "0622365290",
                    "email" : "test@test.com",
                },
                numero: "K1",
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
            },
            {
                id: 2,
                prix: 20,
                description: "place 2",
                locataire: {
                    "id": "5da39d87a6b37c6a141358e9",
                    "nom" : "youssi",
                    "prenom" : "azolaye",
                    "phone" : "0622365290",
                    "email" : "test@test.com",
                },
                numero: "K2",
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
        );

        // initialize to page 1
        this.setPage(1);

        this.searchInput.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe(searchText => {
                console.log(searchText);
                //this._placesService.onSearchTextChanged.next(searchText);
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

 

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void
    {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }


    setPage(page: number): void {
        // get pager object from service
        this.pager = this.pagerService.getPager(this.places.length, page);

        // get current page of items
        this.pagedItems = this.places.slice(this.pager.startIndex, this.pager.endIndex + 1);
    
        console.log(this.pagedItems, this.pager);
    
    }    
 

}

 
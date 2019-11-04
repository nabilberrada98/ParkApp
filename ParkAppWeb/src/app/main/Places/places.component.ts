import { Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { PagerService } from './pager.service';
import { Options, LabelType } from 'ng5-slider';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { Subject, BehaviorSubject, combineLatest } from 'rxjs';
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
    placesFiltered = null;

    markers = [];
    places$ = new BehaviorSubject<any[]>([]);
    filteredPlaces$ = new BehaviorSubject<any[]>([]);

    // pager object
    pager: any = {};
    search: [];

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

        this._placeService.getPlaces().then( (data) => {
            this.places = data;
            this.places$.next(data);
            this.filteredPlaces$.next(data);

            // initialize to page 1
            this.setPage(1);
        });

        

        // this._placeService.onPlacesChanged
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(place => {
        //         this.places = place;
        //     });


        console.log("places : ", this._placeService.places);


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

    customSearch({ libelles, prix, days }): void{
        
        this.setFilters(libelles, prix, days);

    }

    customFilter(libelles, prix: { max: number, min: number }){
        const data = [];
        const self = this;
        
        this.places.forEach(function(p, i){

            const isBwn = p.prix >= prix.min && p.prix <= prix.max;

            libelles.forEach(function(lib){
                const address = p.place.localisation.libelle.address.trim() === lib.address.trim();
                const nearPlaces = self.findNearPlaces(lib.loc.lat, lib.loc.lng, self.places);
                // if (address || isBwn){
                //     data.push(p);
                // }

                self.places.filter( (p, i) => {
                    console.log( nearPlaces[i] );
                });
                
                data.push([]);

            });

        });

        return data;
    }

    setFilters(libelles, prix, days){
        
        this.filteredPlaces$.next(this.places$.value);
        console.log(libelles, prix, days);
        const self = this;


        combineLatest(
            this.places$,
        )
        .subscribe(([places]) => {
            let filteredPlaces = [ ...places ];

            // find near places : 
            if(libelles.length >= 1){
                const nears = [];
                libelles.forEach(function(lib){
                    const data = self.findNearPlaces(lib.loc.lat, lib.loc.lng);
                    nears.push(data);
                });
                filteredPlaces = nears;
            }

            // find matchers price :
            if (!(prix.max && prix.min)){
                filteredPlaces = filteredPlaces.filter((p) =>  p.prix >= prix.min && p.prix <= prix.max);
            }

            if(days.length >= 1){
                // 
            }

            self.filteredPlaces$.next(filteredPlaces);
        });

        //libelles.setValue('');
    }


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
 
    findNearPlaces( lat1: number, lon1: number){    
        const pi = Math.PI;
        const R = 6371;
        const distances = [];
        let closest = -1;
        const places = this.places$.value;

        for( let i=0; i < places.length; i++ ) {  
            var lat2 = places[i].place.localisation.lat;
            let lon2 = places[i].place.localisation.lng;
    
            let chLat = lat2-lat1;
            let chLon = lon2-lon1;
    
            let dLat = chLat*(pi/180);
            let dLon = chLon*(pi/180);
    
            let rLat1 = lat1*(pi/180);
            let rLat2 = lat2*(pi/180);
    
            let a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(rLat1) * Math.cos(rLat2); 
            let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            let d = R * c;
    
            distances[i] = d;
            if ( closest == -1 || d < distances[closest] ) {
                closest = i;
            }
        }
    
        return places[closest];
    }


}


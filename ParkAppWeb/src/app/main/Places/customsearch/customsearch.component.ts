import { Component, Input, OnDestroy, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Options, LabelType } from 'ng5-slider';
import { fuseAnimations } from '@fuse/animations';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PlaceService } from 'app/services/place.service';
import { AuthService } from 'app/services/auth.service';

@Component({
    selector     : 'custom-search',
    templateUrl  : './customsearch.component.html',
    styleUrls    : ['./customsearch.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class CustomSearchComponent implements OnInit, OnDestroy
{

    @Output() onCustomSearch: EventEmitter<any> = new EventEmitter<any>();


    constructor(
        private _placeService: PlaceService,
        private _authService: AuthService
    )
    {

        this.getUserAddressTxt();

        this.getPrices().then( () => {
            this.minValue = this.rangePrix.min;
            this.maxValue = this.rangePrix.max;
            this.options = {
                floor: 0,
                ceil: this.maxValue + this.minValue,
                translate: (value: number, label: LabelType): string => {
                switch (label) {
                    case LabelType.Low:
                    return '<b>Min:</b> ' + value + 'DH';
                    case LabelType.High:
                    return '<b>Max:</b> ' + value + 'DH';
                    default:
                    return value + 'DH';
                }
                }
            };
            this.isLoaded = true;
        });

        // Set the defaults
        this.view = 'main';

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    board: any;
    view: string;
    form = new FormControl();
    toppingList: string[] = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

    @Input() rgPrix: any;
    options: Options = {};
    minValue = 0;
    maxValue = 0;
    ceil = 0;
    rangePrix: any;
    days = [];
    libelles = [];
    selectedAddress = [];

    isLoaded = false;

    // Private
    private _unsubscribeAll: Subject<any>;

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    // tslint:disable-next-line:typedef
    async getPrices(){
        await this._placeService.rangePrix().then( (data) => {
            this.rangePrix = data;
        });
    }

    async getUserAddressTxt(){
        await this._placeService.userLibelles().then( (data) => {
            this.libelles = data;
       });
    }

    onChangeSlider({ value, highValue }): void{
        this.rangePrix = { min: value, max: highValue};
    }

    onChangeDates(event): void{
        if(event.isUserInput) {
            if(event.source.selected) {
                this.days.push(event.source.value);
            }else{
                this.days = this.days.filter( (a) => a !== event.source.value);
            }
        }
    }

    onChangeTxt(event): void{
        if(event.isUserInput) {
            if(event.source.selected) {
                this.libelles.forEach( (l) => {
                    if(l.address.trim() ===  event.source.value.trim()){
                        this.selectedAddress.push(l);
                    }
                });
            }else{
                this.selectedAddress = this.selectedAddress.filter( (a) => a.address !== event.source.value);
                console.log(this.selectedAddress);
            }
        }
    }

    onSubmit(e): void{
        const data = { days: this.days, prix: this.rangePrix, libelles: this.selectedAddress };
        this.onCustomSearch.emit(data);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
 

        // this.scrumboardService.onBoardChanged
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(board => {
        //         this.board = board;
        //     });
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

    /**
     * Toggle card cover
     */
    toggleCardCover(): void
    {
        this.board.settings.cardCoverImages = !this.board.settings.cardCoverImages;
        // this.scrumboardService.updateBoard();
    }

    /**
     * Toggle subscription
     */
    toggleSubscription(): void
    {
        this.board.settings.subscribed = !this.board.settings.subscribed;
        // this.scrumboardService.updateBoard();
    }

}

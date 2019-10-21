import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { PagerService } from './pager.service';
import { Options, LabelType } from 'ng5-slider';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';


@Component({
    selector     : 'app-places',
    templateUrl  : './places.component.html',
    styleUrls    : ['./places.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class PlacesComponent implements OnInit {

    toppings = new FormControl();
    toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];


    time = new Date();

    // Optional message to display below each input field
    message = {
      hour: 'Hour is required',
      minute: 'Minute is required',
      meridiem: 'Meridiem is required'
    }

    readonly = false;

    required = true;


    constructor(private pagerService: PagerService, private fb: FormBuilder){

    }
    
    myForm:FormGroup;
    disabled = false;
    ShowFilter = false;
    limitSelection = false;
    cities = [];
    selectedItems = [];
    dropdownSettings: any = {};

    // array of all items to be paged
    private allItems: any[];

    // pager object
    pager: any = {};

    // paged items
    pagedItems: any[];

    minValue: number = 100;
    maxValue: number = 400;

    options: Options = {
      floor: 0,
      ceil: 500,
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            return '<b>Min price:</b> $' + value;
          case LabelType.High:
            return '<b>Max price:</b> $' + value;
          default:
            return '$' + value;
        }
      }
    };


    onItemSelect(item: any) {
        console.log('onItemSelect', item);
    }
    onSelectAll(items: any) {
        console.log('onSelectAll', items);
    }
    toogleShowFilter() {
        this.ShowFilter = !this.ShowFilter;
        this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter });
    }

    // tslint:disable-next-line:typedef
    handleLimitSelection() {
        if (this.limitSelection) {
            this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
        } else {
            this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
        }
    }


    ngOnInit(){

        this.cities = [
            { item_id: 1, item_text: 'New Delhi' },
            { item_id: 2, item_text: 'Mumbai' },
            { item_id: 3, item_text: 'Bangalore' },
            { item_id: 4, item_text: 'Pune' },
            { item_id: 5, item_text: 'Chennai' },
            { item_id: 6, item_text: 'Navsari' }
        ];
        this.selectedItems = [{ item_id: 4, item_text: 'Pune' }, { item_id: 6, item_text: 'Navsari' }];
        this.dropdownSettings = {
            singleSelection: false,
            idField: 'item_id',
            textField: 'item_text',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            allowSearchFilter: this.ShowFilter
        };
        this.myForm = this.fb.group({
            city: [this.selectedItems]
        });


        this.allItems = [
            {
                "name": "Item 1"
            },
            {
                "name": "Item 2"
            },
            {
                "name": "Item 3"
            },
            {
                "name": "Item 4"
            },            
            {
                "name": "Item 1"
            },
            {
                "name": "Item 2"
            },
            {
                "name": "Item 3"
            },
            {
                "name": "Item 4"
            },
            {
                "name": "Item 1"
            },
            {
                "name": "Item 2"
            },
            {
                "name": "Item 3"
            },
            {
                "name": "Item 4"
            }
        ];

        // initialize to page 1
        this.setPage(1);

    }

    setPage(page: number) {
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page);

        // get current page of items
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    
        console.log(this.pagedItems, this.pager);
    
    }


    

}

class PriceRange {
    constructor(
      public lower: number,
      public upper: number
    ) {
    }
}
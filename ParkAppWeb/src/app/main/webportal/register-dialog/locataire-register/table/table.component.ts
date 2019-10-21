import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from "rxjs";
import { Component, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
//import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: [ './table.component.css' ]
})
export class TableComponent implements OnInit {  
  
    @Output() sendRow: EventEmitter<number> = new EventEmitter();
    @Output() sendLibelle: EventEmitter<any> = new EventEmitter();
    loc: Loc;
    selected: string = "";
    data = [];

    constructor(private myElement: ElementRef) { }  
    
    dynamicArray: Array<DynamicGrid> = [];  
    newDynamic: any = {}; 

    ngOnInit(): void {
        console.log("selected : ", this.selected);
    }
    
    addRow(obj): void{
        this.loc = obj;
        console.log(obj);
        this.dynamicArray.push(obj);
        const index = this.dynamicArray.indexOf(obj);
        this.data.push({ libelle: '', index: index });

        console.log(this.dynamicArray);  
    }  
    
    deleteRow(index) {
        this.sendRow.emit(index);
        this.dynamicArray.splice(index, 1);
    }

    onChange(value: string, index): void{
        if (value !== ''){
            //this.data.libelle = value;

            this.data.find( (val, i) => {
                if(i === Number(index)){
                    val.libelle = value;
                    console.log("valeur : ",val);
                    this.sendLibelle.emit(val);
                    return true;
                }
            });
        
            // console.log(this.data);
            // this.sendLibelle.emit(this.data);
        }
    }

} 

interface DynamicGrid {     
    title1:string;  
    title2:string;  
    title3:string;  
}

interface Loc {
    city: string;
    region: string;
    position: string;
}
import {Component, ViewChild, OnInit} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import { FormBuilder, Validators, FormGroup, ValidationErrors } from '@angular/forms';

export interface PeriodicElement {
  name: string;
  id: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {id: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {id: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {id: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {id: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {id: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {id: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {id: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {id: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {id: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-table',
  styleUrls: ['table.component.css'],
  templateUrl: 'table.component.html',
})
export class TableComponent implements OnInit{

    displayedColumns: string[] = ['id', 'name', 'weight', 'symbol', 'action'];
    dataSource = ELEMENT_DATA ;
  
    form: FormGroup;

    edit: boolean;
    editId: number;

    constructor(private _formBuilder: FormBuilder){

    }

    ngOnInit(){
        this.form = this._formBuilder.group({
            symbol: ['', Validators.required],
            weight: ['', Validators.required],
            name: ['', Validators.required],
        });
    }

    handelStartEdit(user){
        this.editId = user.id;
        this.edit = true;
        //console.log("Edit : ", user);
    }

    handelStopEdit(user){
        console.log('StopEditUser : ', this.dataSource);
      

        const arr = Object.values(user).filter(value => value !== "");

        console.log(user);
        console.log(arr);
        console.log(this.hasErrors());

        if (arr.length === Object.keys(user).length && !this.hasErrors()){
            this.edit = false;
            this.editId = -1;
        }

    }

    hasErrors(): boolean{
        const errors = Object.keys(this.form.controls).map(key => {
            const controlErrors: ValidationErrors = this.form.get(key).errors;
            return controlErrors !== null;
        });
        return errors.every(error => error === true);
    }


    delete(userId): void{
        this.dataSource = this.dataSource.filter(user => user.id !== userId);
    }

    handleChange(event , user): void{
        const name = event.target.name;
        const value = event.target.value;
        const userId = user.id;

        this.dataSource.filter(function(user){
            if(user.id === userId && user[name] !== value){
                user[name] = value;
            }
        });
    }
 



}
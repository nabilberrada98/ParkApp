import { Component, ViewChild, ElementRef, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import {Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-more-dialog',
  templateUrl: './more-dialog.component.html',
  styleUrls: ['./more-dialog.component.scss'],
})
export class MoreInfoDialogComponent implements OnInit {

    form: FormGroup;
    place: any;

    constructor(
        private formBuilder: FormBuilder,
        public dialog: MatDialog, 
        public dialogRef: MatDialogRef<MoreInfoDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {
    }

    ngOnInit(): void {
        this.place = this.data;
    }
    

}


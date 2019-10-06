import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogClose } from '@angular/material';
import axios from 'axios';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent implements OnInit {

    constructor(){
    }

    ngOnInit(): void {
    }
    

    onSubmit(): void {
    }


}


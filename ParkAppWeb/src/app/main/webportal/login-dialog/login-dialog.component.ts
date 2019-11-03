import { Component, OnInit } from '@angular/core';
import {Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'app/services/auth.service.js';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent implements OnInit {

    form: FormGroup;
    errorMessage = null;
    constructor(private formBuilder: FormBuilder,private _snackBar: MatSnackBar,private authService: AuthService) {
    }

    ngOnInit(): void {
        this.initForm();
    }
    
    initForm(): void{
        this.form = this.formBuilder.group({
            email : ['', Validators.required],
            password  : ['', Validators.required],
        });
    }

    onSubmit(): void {
        const data = this.form.value;
        this.authService.login(data).catch((err)=>{
            this._snackBar.open('Authentification échoué', 'Fermer', {
                duration: 2000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
                panelClass: ['error-dialog']
              });
        });
    }
}


import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

import { Login } from '../../../api/AuthInstance.js';
import { AuthService } from 'app/services/auth.service.js';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent implements OnInit {

    form: FormGroup;

    constructor(private formBuilder: FormBuilder,private authService: AuthService) {
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
        this.authService.login(data);
    }
}


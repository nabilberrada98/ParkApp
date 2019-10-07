import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogClose } from '@angular/material';
import axios from 'axios';
import { Login } from '../../../api/AuthInstance.js';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent implements OnInit {

    form: FormGroup;

    constructor(private formBuilder: FormBuilder) {
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
        this.handleLogin(data);
    }

    handleLogin(data): void{
        Login(data).then( (obj) => {
            console.log(obj);
            //obj.login.authorities = obj.authorities;
            // sessionStorage.setItem("currentUser", obj.login);
            // sessionStorage.setItem("token", obj.login.token);
        })
        .catch( (err) => console.log(err) );
    }

}


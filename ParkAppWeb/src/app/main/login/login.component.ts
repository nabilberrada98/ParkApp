import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from 'app/services/auth.service.js';


@Component({
    selector     : 'login',
    templateUrl  : './login.component.html',
    styleUrls    : ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup;
    config: any;
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private authService: AuthService
    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._fuseConfigService.config
            .subscribe((config) => {
                this.config = config;
            });

        this.initForm();
        
    }

    onSubmit(): void {
        const data = this.loginForm.value;
        this.handleLogin(data);
    }

    initForm(): void{
        this.loginForm = this._formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    handleLogin(data): void {
        this.authService.login(data);
        // Login(data).then( (obj) => {
        //     console.log(obj);
        //     //obj.login.authorities = obj.authorities;
        //     // sessionStorage.setItem("currentUser", obj.login);
        //     // sessionStorage.setItem("token", obj.login.token);
        // })
        // .catch( (err) => console.log(err) );
    }


    
}

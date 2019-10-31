import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from 'app/services/auth.service.js';


@Component({
    selector     : 'lock',
    templateUrl  : './login.component.html',
    styleUrls    : ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LoginComponent implements OnInit
{
    lockForm: FormGroup;
    config: any;
    user: any;

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
                },
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

        this.user = this.authService.user;

        this.lockForm = this._formBuilder.group({
            email: [
                {
                    value: this.user.email,
                    disabled: true
                }, Validators.required
            ],
            password: ['', Validators.required]
        });
    

    }

    onSubmit(): void {
        const data = this.lockForm.getRawValue();
        
        this.handleLogin(data);
    }

    handleLogin(data): void {
        this.authService.expiredSession().then( () => {
            this.authService.login(data);
        });
    }

    
}

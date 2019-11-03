import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';

import { navigation } from 'app/navigation/navigation';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import * as _ from 'lodash';

@Component({
    selector   : 'app',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy
{
    fuseConfig: any;
    navigation: any;
    urls = [];

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {DOCUMENT} document
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseNavigationService} _fuseNavigationService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {FuseSplashScreenService} _fuseSplashScreenService
     * @param {Platform} _platform
     */
    constructor(
        @Inject(DOCUMENT) private document: any,
        private _fuseConfigService: FuseConfigService,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseSidebarService: FuseSidebarService,
        private _fuseSplashScreenService: FuseSplashScreenService,
        private _platform: Platform,
        private router: Router,
        private authService: AuthService
    )
    {
        // Get default navigation
        this.navigation = navigation;

        // Register the navigation to the service
        this._fuseNavigationService.register('main', this.navigation);

        // Set the main navigation as our current navigation
        this._fuseNavigationService.setCurrentNavigation('main');

        
        // Add is-mobile class to the body if the platform is mobile
        if ( this._platform.ANDROID || this._platform.IOS )
        {
            this.document.body.classList.add('is-mobile');
        }

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit(): void {
    
        this.getUrls();

        this.authService.isLogin().then( (data) => {
            if (!this.isEmptyObj(this.authService.user) && !this.urls.includes(window.location.pathname) ){
                this.router.navigate(['dashboard']);
            }
        })
        .catch( () => {
            //session expired :
            console.log("session is expired !!");
            if (window.location.pathname !== '/lock' && !this.isEmptyObj(this.authService.user)){
                this.router.navigate(['lock']);
            }

        });

    }

    isEmptyObj(obj): boolean{
        return _.values(obj).every(_.isEmpty);
    }

    getUrls(): void{
        navigation.find( (child) => { 
            const sub = child.children;
            if(_.isArray(sub)){ 
                this.subChilds(sub);
            } else { console.log("has not !!"); }
            return true;  
        });

    }

    subChilds(sub): void {
        sub.find( (subChild) => { 
            if(_.isArray(subChild.children)) {
                this.subChilds(subChild.children);
            }
            if(subChild.url){ 
                this.urls.push(subChild.url);
            } 
            return true;
        });
    }

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.fuseConfig = config;
                this.fuseConfig.set

                // Color theme - Use normal for loop for IE11 compatibility
                for ( let i = 0; i < this.document.body.classList.length; i++ )
                {
                    const className = this.document.body.classList[i];
                    if ( className.startsWith('theme-') )
                    {
                        this.document.body.classList.remove(className);
                    }
                }

                this.document.body.classList.add(this.fuseConfig.colorTheme);
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}

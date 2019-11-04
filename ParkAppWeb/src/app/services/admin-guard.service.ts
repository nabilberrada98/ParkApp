import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

    constructor(private auth: AuthService, private router: Router) { }

    canActivate(route, state: RouterStateSnapshot): boolean {
        if(this.auth.user.role !== "admin"){
            this.router.navigate(["/"]);
            return false;
        }
        return true;
    }


}

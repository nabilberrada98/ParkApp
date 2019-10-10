import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot): boolean {
    console.log("canActivate auth: ", this.auth.user);
    if( this.auth.user.length === 0){
        this.router.navigate(["/"]);
        return false;
    }
    return true;
  }

}

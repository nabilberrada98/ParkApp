import { Injectable, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { User } from '../api/models/user';
import { Login, Logout, accessToken } from "../api/controllers/AuthInstance.js";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    user:User;

    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private router: Router) {
        this.user = this.userService.getCurrentUser();
    }

    login(data): void {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
        sessionStorage.setItem('returnUrl', returnUrl);
        Login(data).then( (result) => {
            result.login.authorities = result.authorities;
            this.userService.save(result.login,result.token);
            const route = sessionStorage.getItem('returnUrl');
            window.location.href = '/dashboard';
        })
        .catch( (err) => console.log(err) );

    }

    logout(): void {
        Logout().then( (data) => {
            this.userService.delete();
            //window.location.href = '/login';
            this.router.navigate(['/']);
        })
        .catch( (err) => console.log(err) );
    }

    isLogin(): Promise<boolean> {
        return new Promise( (resolve, reject) => {
            accessToken().catch( (error) => {
                const data = error.response.data;
                if (data.message && data.message === 'TOKEN_EXPIRED'){
                    this.logout();
                    resolve(false);
                }
                resolve(true);
            });
        });

    }

//   get appUser$(): Observable<User> {
//     return this.user$
//       .pipe(switchMap(user => {
//         if (user) {
//           return this.userService.get(user.uid).valueChanges();
//         }
//         return of(null);
//       }));
//   }



}

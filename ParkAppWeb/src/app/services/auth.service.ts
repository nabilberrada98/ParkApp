import { Injectable, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { User } from '../api/models/user';
import { Login, Logout, accessToken } from "../api/controllers/AuthInstance.js";
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    user:User; //<User>;


    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private router: Router) {
        this.user = this.userService.getCurrentUser();
    }

    login(data): void {
        console.log('login: ',data);
        Login(data).then( (result) => {
            result.login.authorities = result.authorities;
            this.userService.save(result.login, result.token);
            window.location.href = '/dashboard';
        })
        .catch( (err) => console.log(err) );
    }
 
    logout(): void {
        Logout().then( (data) => {
            this.userService.delete();
            this.router.navigate(['/']);
        })
        .catch( (err) => console.log(err) );
    }

    expiredSession(): Promise<boolean> {
        return new Promise( (resolve, reject) => {
            Logout().then( (data) => {
                this.userService.delete();
                resolve(true);
            })
            .catch( (err) => { 
                console.log(err);
                reject(true);
            });
       });
    }

    isLogin(): Promise<boolean> {

        return new Promise( (resolve, reject) => {
            accessToken().catch( (error) => {
                const data = error.response.data;
                console.log("data :", data);
                if (data.message && data.message === "TOKEN_EXPIRED"){
                    //this.logout();
                    reject(true);
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

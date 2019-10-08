import { Injectable } from '@angular/core';
import { storeUser, getUser, updateUser } from '../api/controllers/UserInstance.js';
import { User } from '../api/models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor() {
    }

    save(user): void {
        sessionStorage.setItem("currentUser", JSON.stringify(user));
        sessionStorage.setItem("token", JSON.stringify(user.token));
        // updateUser(user.id, user).then( (obj) => {
        //     console.log(obj);
        // })
        // .catch( (err) => console.log(err) );
    }

    storeUser(user) : boolean{
        return storeUser(user).then((data)=>{
            sessionStorage.setItem("currentUser", JSON.stringify(data));
            sessionStorage.setItem("token", JSON.stringify(data.token));
            return true;
        }).catch((err) => {
            return false;
        });
    }


    delete(): void {
        sessionStorage.removeItem("returnUrl");
        sessionStorage.removeItem("currentUser");
        sessionStorage.removeItem("token");
    }

    get(uid: number): void{
        getUser(uid).then( (data) => { 
            console.log(data);
        })
        .catch( (err) => console.log(err) );
    }

    getCurrentUser(): Array<any> {
        const user = JSON.parse(sessionStorage.getItem("currentUser"));
        if(user !== null){
            return new Array(user);
        }else{
            return new Array();
        }
    }


}

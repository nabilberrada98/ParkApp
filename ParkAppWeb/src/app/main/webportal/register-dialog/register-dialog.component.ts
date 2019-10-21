import { Component, ViewChild, ElementRef } from '@angular/core';
import { LocataireRegisterComponent } from './locataire-register/locataire-register.component';
import { MatDialogClose } from '@angular/material';
import axios from 'axios';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss'],
})
export class RegisterDialogComponent{
    constructor(){
    }

    ngOnInit(): void {
        this.getGeoInfo();
    }
    
    getGeoInfo = async () => {
        await axios.get('https://ipapi.co/json/').then((response) => {
            let data = response.data;
            console.log(data);
        }).catch((error) => {
            console.log(error);
        });
    };


}


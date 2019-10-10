import { Component, OnInit, ElementRef, Input, OnDestroy, Optional, Self, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ControlValueAccessor, NgControl, FormGroupDirective} from '@angular/forms';
import {MatFormFieldControl} from '@angular/material/form-field';
import {Subject, Observable} from 'rxjs';
import { MouseEvent } from '@agm/core';
import axios from "axios";
import { storeUser } from "../../../../api/UserInstance";


@Component({
  selector: 'locataire-register',
  templateUrl: './locataire-register.component.html',
  styleUrls: ['./locataire-register.component.scss']
})
export class LocataireRegisterComponent implements OnInit, OnDestroy {

    @Input() isSaved: Boolean;
    @Output() eventChanged: EventEmitter<number> = new EventEmitter();

    form: FormGroup;
    coordinates: any;
    markers: Marker[] = [];
    zoom: number = 8;
    lat: number = 33.9718626;
    lng: number = -6.8695921;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(private formBuilder: FormBuilder) {
        this.isSaved = false;
        this._unsubscribeAll = new Subject();
    }
  
    /**
     * On init
     */
    ngOnInit(): void {

        this.initForm();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    onSubmit(): void{
        const data = this.form.value;
        const libelle = Object.assign({ nom: data.libelle }, { loc: this.markers[0] });
        data.libelle = libelle;
        
        console.log(data);

        //this.store(data);
    }

    store(user){
        storeUser(user).then( (obj) => {
            const { data } = obj;
            console.log(data);
        })
        .catch( (err) => console.log(err) );
    }



    initForm(): void{
        // Reactive Form
        this.form = this.formBuilder.group({
            nom : ['', Validators.required],
            prenom  : ['', Validators.required],
            phone   : ['', Validators.required],
            email  : ['', Validators.required],
            password   : ['', Validators.required],
            libelle : ['', Validators.required],
        });

    }


    clickedMarker(label: string, index: number) {
        console.log(`clicked the marker: ${label || index}`);
    }
    
    mapClicked($event: MouseEvent) {
        console.log("coordinations : ", $event.coords);
        this.markers = [];
        this.markers.push({ lat: $event.coords.lat, lng: $event.coords.lng });
        this.getGeoInfo($event.coords);
    }
    
    markerDragEnd(m: Marker, $event: MouseEvent) {
        console.log('dragEnd', m, $event);
    }

    getGeoInfo = async (data) => {
        await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.lat}, ${data.lng}&key=AIzaSyAAFz7wsoEsvZOY24eqBigX57ZdcUT-RbA`).then((response) => {
            let data = response.data;
            let city = data.plus_code.compound_code.split(" ")[1].split(",")[0];
            let region = data.results[data.results.length - 2].formatted_address.split(",")[0];
            let temp = Object.assign({ ville: { nom: city, region: { nom: region }  }  }, this.markers[0]);
            this.markers[0] = temp;
            console.log(this.markers);
        }).catch((error) => {
            console.log(error);
        });
    }

    addLibelle(){
        
    }

}


interface Marker {
    lat: number;
    lng: number;
    label?: string;
}
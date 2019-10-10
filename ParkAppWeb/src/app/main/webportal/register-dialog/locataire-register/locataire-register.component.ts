import { Component, OnInit, ViewChild, Input, OnDestroy, Optional, Self, Output, EventEmitter, SimpleChanges } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ControlValueAccessor, NgControl, FormGroupDirective} from '@angular/forms';
import {MatFormFieldControl} from '@angular/material/form-field';
import {Subject, Observable} from 'rxjs';
import axios from "axios";
import { MouseEvent } from '@agm/core';
import { storeUser } from "../../../../api/UserInstance";
import { TableComponent } from './table/table.component';



@Component({
  selector: 'locataire-register',
  templateUrl: './locataire-register.component.html',
  styleUrls: ['./locataire-register.component.scss']
})
export class LocataireRegisterComponent implements OnInit, OnDestroy {

    @ViewChild('table') private table: TableComponent;
    @Input() isSaved: Boolean;
    @Output() eventChanged: EventEmitter<number> = new EventEmitter();

    form: FormGroup;
    coordinates: any;
    markers: Marker[] = [];
    zoom: number = 15;
    lat: number = 33.9718626;
    lng: number = -6.8695921;
    newRow: any;
    city: string;
    region: string;
    temp: string;
    libelles = [];


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

        data.libelles = this.handleLibelles();

        console.log(data);

        //this.store(data);
    }

    handleLibelles(){
        const libelleData = [];
        this.libelles.find( (val, i) => {
            if(val){
                let marker = this.markers[i];
                let libelle = this.libelles[i];
                libelleData.push( Object.assign({ nom: libelle }, { loc: marker }) );
            }
        });
        return libelleData;
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
    
    mapClicked($event: MouseEvent): void {
        console.log('coordinations : ', $event.coords);
        let obj = { lat: $event.coords.lat, lng: $event.coords.lng };
        this.markers.push($event.coords);
        this.handleGeoInfo($event.coords);
    }

    markerDragEnd(m: Marker, $event: MouseEvent) {
        console.log('dragEnd', m, $event);
    }

    handleGeoInfo = async (data) => {
        await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.lat}, ${data.lng}&key=AIzaSyAAFz7wsoEsvZOY24eqBigX57ZdcUT-RbA`).then((response) => {
            let data = response.data;
            let currentMarkerPosition = data.results[0].formatted_address.split(",")[0];
            console.log(currentMarkerPosition, data.results);
            this.city = data.plus_code.compound_code.split(" ")[1].split(",")[0];
            this.region = data.results[data.results.length - 2].formatted_address.split(",")[0];
            this.table.addRow({ city: this.city, rehion: this.region, position: currentMarkerPosition });
            this.getGeoInfo();
        }).catch((error) => {
            console.log(error);
        });
    }

    getGeoInfo = async () => {
        let lastest = this.markers[this.markers.length - 1];
        const temp = Object.assign({ ville: { nom: this.city, region: { nom: this.region }  }  }, lastest);
        lastest = temp;
        console.log(this.markers);
    }

    customFunc(index){
        this.markers.splice(index, 1);
        this.libelles.splice(index, 1);
    }

    addLibelle({libelle, index}){
        this.libelles[index] = libelle;
    }

}


interface Marker {
    lat: number;
    lng: number;
    label?: string;
}
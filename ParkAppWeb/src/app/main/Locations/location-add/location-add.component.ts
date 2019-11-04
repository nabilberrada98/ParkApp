import { Component, OnInit} from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Subject } from "rxjs";
import { MouseEvent } from "@agm/core";
import axios from "axios";
import { LocationsService } from "app/services/Location.service";
import { Router } from "@angular/router";
@Component({
    selector: "app-location-add",
    templateUrl: "./location-add.component.html",
    styleUrls: ["./location-add.component.scss"]
})
export class LocationAddComponent implements OnInit {

    horizontalStepperStep1: FormGroup;
    horizontalStepperStep2: FormGroup;
    horizontalStepperStep3: FormGroup;
    coordinates: any;
    lat: number = 33.9718626;
    lng: number = -6.8695921;
    ville: string;
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _formBuilder: FormBuilder,
        private _locationService : LocationsService,
        private router: Router
    ) {
        this._unsubscribeAll = new Subject();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    async mapClicked($event: MouseEvent) {
        console.log("coordinations : ", $event.coords);
        this.lat = $event.coords.lat;
        this.lng = $event.coords.lng;
        await axios
            .get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${$event.coords.lat}, ${$event.coords.lng}&key=AIzaSyAAFz7wsoEsvZOY24eqBigX57ZdcUT-RbA`
            )
            .then(response => {
                let data = response.data;
                this.ville = data.plus_code.compound_code
                    .split(" ")[1]
                    .split(",")[0];
                console.log(this.ville);
            })
            .catch(error => {
                console.log(error);
            });
    }

    markerDragEnd(m: Marker, $event: MouseEvent) {
        console.log("dragEnd", m, $event);
        this.lat = $event.coords.lat;
        this.lng = $event.coords.lng;
    }

    /**
     * Finish the horizontal stepper
     */
    finishHorizontalStepper(): void {

        const formData = new FormData();
        const files = this.horizontalStepperStep3.value.images;

        for (const file of files) {
            formData.append('file', file.file);
        }

        const data = {
            prix: this.horizontalStepperStep2.value.prix, 
            type: this.horizontalStepperStep2.value.type,
            place: {
                ...this.horizontalStepperStep1.value , 
                localisation: {
                    lat: this.lat,
                    lng: this.lng,
                    ville: this.ville ? this.ville.toLowerCase() : null
                }
            }
        };


        formData.append('content', JSON.stringify(data));

        var self = this;
        this._locationService.storeLocation(formData).then(( data ) => {
            console.log(data);
            self.router.navigate(["/locations"]);
        });
    }

    ngOnInit() {
        // Horizontal Stepper form steps
        this.horizontalStepperStep1 = this._formBuilder.group({
            numero: [""],
            etage: [0, Validators.required],
            type: [""],
            vehicules : [[]],
            heureOuvertureParking : [6,Validators.compose([
                Validators.minLength(1),
                Validators.maxLength(2),
                Validators.min(0),
                Validators.max(24)
            ])],
            heureFermetureParking : [23,Validators.compose([
                Validators.minLength(1),
                Validators.maxLength(2),
                Validators.min(0),
                Validators.max(24)
            ])],
            isInParking : [false], 
            isCameraEquiped: [false]
        });

        this.horizontalStepperStep2 = this._formBuilder.group({
            type: ["", Validators.required],
            prix: ["", Validators.required],
            jourLouable : [["1","2","3","4","5","6","7"],Validators.required],
            description : [""]
        });

        this.horizontalStepperStep3 = this._formBuilder.group({
            images: [[],Validators.required]
        });
    }
}

interface Marker {
    lat: number;
    lng: number;
    label?: string;
}

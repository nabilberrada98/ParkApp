import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
const moment = require('moment');
require('moment-weekday-calc');
import * as localization from 'moment/locale/fr';
import { ReservationService } from './../../../services/reservation.service';
moment.locale('fr', localization);
@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.scss']
})
export class AddReservationComponent implements OnInit {

  @Input() type;
  @Input() prix;
  @Input() placeId;
  public static location;
  public _reload = true;
  form: FormGroup;
  totalDays : number = 0;
  minDate = moment();
  local = {
      format: 'DD MM YYYY',
      direction: 'ltr', 
      separator: ' - ', // default is ' - '
      cancelLabel: 'Annuler', // detault is 'Cancel'
      applyLabel: 'Confirmer', // detault is 'Apply'
      clearLabel: 'vider', // detault is 'Clear'
      daysOfWeek: moment.weekdaysShort(),
      monthNames: moment.monthsShort(),
      firstDay: 1 // first day is monday
  };

  ranges: any = {
    'Aujourd\'hui': [moment(), moment()],
    'Demain': [moment().add(1, 'days'), moment().add(1, 'days')],
    'La semaine': [moment(),moment().add(6, 'days')],
    'Ce mois': [moment(),moment().add(29, 'days')],
  }

  constructor(private formBuilder: FormBuilder,private reservationService:ReservationService) {}

  change(eve) { 
    this.totalDays =  moment().weekdayCalc({  
            rangeStart: eve.startDate,  
            rangeEnd: eve.endDate,  
            weekdays: AddReservationComponent.location 
          }) + 1;
          console.log(this.totalDays);
    }
  
  ngOnInit() {
    this.initForm();
  }

  initForm(): void{
    this.form = this.formBuilder.group({
      Selecteddates : [{}, Validators.required],
    });
  }

  isLouable(e){
      if(AddReservationComponent.location.includes(e.weekday()+1)){
          return [];
      }
      return ["notLoubleDates"];
  }

  onSubmit(): void {
      if(this.totalDays<=0){
        this.form.hasError('Nombre de jours de locations doit etre supérieur a 0');
        return;
      }else{
        const dataToPost = {
          startTime : this.form.value.Selecteddates.startDate,
          endTime : this.form.value.Selecteddates.endDate,
          nbrJours : this.totalDays,
          placeId : this.placeId
        };
        this.reservationService.storeReservation(dataToPost);
      }
  }
  
}
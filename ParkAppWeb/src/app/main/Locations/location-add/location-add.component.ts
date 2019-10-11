import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-location-add',
  templateUrl: './location-add.component.html',
  styleUrls: ['./location-add.component.scss']
})
export class LocationAddComponent implements OnInit {

  horizontalStepperStep1: FormGroup;
  horizontalStepperStep2: FormGroup;
  horizontalStepperStep3: FormGroup;

  private _unsubscribeAll: Subject<any>;

  constructor(private _formBuilder: FormBuilder) { 

    this._unsubscribeAll = new Subject();
  }

   /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     * Finish the horizontal stepper
     */
    finishHorizontalStepper(): void
    {
        alert('You have finished the horizontal stepper!');
    }

  ngOnInit() {
    // Horizontal Stepper form steps
    this.horizontalStepperStep1 = this._formBuilder.group({
        firstName: ['', Validators.required],
        lastName : ['', Validators.required]
    });

  this.horizontalStepperStep2 = this._formBuilder.group({
      address: ['', Validators.required]
  });

  this.horizontalStepperStep3 = this._formBuilder.group({
      city      : ['', Validators.required],
      state     : ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.maxLength(5)]]
  });
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { UserService } from './../../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'proprio-register',
  templateUrl: './proprio-register.component.html',
  styleUrls: ['./proprio-register.component.scss']
})
export class ProprioRegisterComponent implements OnInit,OnDestroy {

  form: FormGroup;
  private _unsubscribeAll: Subject<any>;

  constructor(private _formBuilder: FormBuilder,private _userService : UserService
    ,private router: Router) {
    this._unsubscribeAll = new Subject();
   }
   
  //  ValidatePass(propertyName: string): ValidatorFn {
  //    let pass=this.form.value.password;
  //   return (currentControl: AbstractControl): { [key: string]: any } => {
  //     if (currentControl.value.equals(pass)) {
  //       return { propertyName: true }
  //     }
  //   }
  // }

  ngOnInit() {
    this.form = this._formBuilder.group({
      nom : ['', Validators.required],
      prenom  : ['', Validators.required],
      phone   : ['',  Validators.compose(
        [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
        ])],
      email  : ['', Validators.compose(
                    [
                        Validators.required,
                        Validators.email
                    ])],
      password : ['',Validators.compose(
        [
            Validators.required,
            Validators.minLength(6)
        ])],
      confirmPass : ['',Validators.compose(
          [
              Validators.required,
              Validators.minLength(6)
      ])]
  });
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


    SaveProprio(obj){
      let dataToPost = {...obj.value, role : "proprietaire"};
      let res = this._userService.storeUser(dataToPost);
      if(res){
          this.router.navigate(["/"]);
      }
    }

}

import { Component, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-webportal',
  templateUrl: './webportal.component.html',
  styleUrls: [
    './webportal.component.scss'
  ]
})

export class WebportalComponent implements AfterViewInit  {
    
  constructor() {
   }


   ngAfterViewInit() {
      // loading templates js after dom render
      $.getScript("/assets/js/bootstrap.min.js", function () {
      });
      $.getScript("/assets/js/popper.min.js", function () {
      });
      $.getScript("/assets/js/jquery.easing.min.js", function () {
      });
      $.getScript("/assets/js/jquery.magnific-popup.js", function () {
      });
      $.getScript("/assets/js/morphext.min.js", function () {
      });
      $.getScript("/assets/js/validator.min.js", function () {
      });
      $.getScript("/assets/js/scripts.js", function () {
      });
    }

}

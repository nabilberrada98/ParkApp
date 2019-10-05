import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';
import * as $ from 'jquery';
import { MatDialog } from '@angular/material';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
@Component({
  selector: 'app-webportal',
  templateUrl: './webportal.component.html',
  styleUrls: [
    './webportal.component.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})

export class WebportalComponent implements OnInit {
  config: any;
  constructor(private _fuseConfigService: FuseConfigService,
    public dialog: MatDialog)
{
    // Configure the layout
    this._fuseConfigService.config={
        layout: {
            navbar: {
                hidden: true
            },
            toolbar: {
                hidden: true
            },
            footer: {
                hidden: true
            }
        }
    };
}


registerDialog(){
    const dialogRef = this.dialog.open(RegisterDialogComponent);
}
 /**
     * On init
     */
    ngOnInit(): void
    {
        this._fuseConfigService.config
            .subscribe((config) => {
                this.config = config;
        });
        $.getScript("/assets/js/jquery.easing.min.js", ()=>{});
        $.getScript("/assets/js/morphext.min.js", ()=>{});
        $.getScript("/assets/js/scripts.js", ()=>{});
    }
}

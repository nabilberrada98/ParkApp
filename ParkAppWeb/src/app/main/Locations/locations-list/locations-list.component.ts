import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { LocationsService } from './../Location.service';

@Component({
    selector     : 'locations-list',
    templateUrl  : './locations-list.component.html',
    styleUrls    : ['./locations-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LocationsListComponent implements OnInit, OnDestroy
{
    @ViewChild('dialogContent')
    dialogContent: TemplateRef<any>;
    locations: any;
    location: any;
    dataSource: FilesDataSource | null;
    displayedColumns = ['checkbox', 'NumPlace', 'Etage', 'Prix', 'Parking','Etat', 'Buttons'];
    selectedlocations: any[];
    checkboxes: {};
    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {locationservice} _locationservice
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _locationservice: LocationsService,
        public _matDialog: MatDialog
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.dataSource = new FilesDataSource(this._locationservice);

        this._locationservice.onLocationsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(locations => {
                console.log(locations);
                this.locations = locations;
                this.checkboxes = {};
                locations.map(location => {
                    this.checkboxes[location._id] = false;
                });
            });

        this._locationservice.onSelectedLocationChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedlocations => {
                for ( const id in this.checkboxes )
                {
                    if ( !this.checkboxes.hasOwnProperty(id) )
                    {
                        continue;
                    }

                    this.checkboxes[id] = selectedlocations.includes(id);
                }
                this.selectedlocations = selectedlocations;
            });

        this._locationservice.onLocationDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(location => {
                this.location = location;
            });

        this._locationservice.onFilterChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this._locationservice.deselectLocations();
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    editlocation(location): void
    {
        // this.dialogRef = this._matDialog.open(LocationsFormDialogComponent, {
        //     panelClass: 'locations-form-dialog',
        //     data      : {
        //         location,
        //         action : 'edit'
        //     }
        // });

        // this.dialogRef.afterClosed()
        //     .subscribe(response => {
        //         if ( !response )
        //         {
        //             return;
        //         }
        //         const actionType: string = response[0];
        //         const formData: FormGroup = response[1];
        //         switch ( actionType )
        //         {
        //             /**
        //              * Save
        //              */
        //             case 'save':

        //                 this._locationservice.updateLocation(formData.getRawValue());

        //                 break;
        //             /**
        //              * Delete
        //              */
        //             case 'delete':

        //                 this.deletelocation(location);

        //                 break;
        //         }
        //     });
    }

    deletelocation(location): void
    {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Etes vous sur ?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if ( result )
            {
                this._locationservice.deletelocation(location);
            }
            this.confirmDialogRef = null;
        });

    }

    onSelectedChange(Id): void
    {
        this._locationservice.toggleSelectedLocation(Id);
    }
}

export class FilesDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param {locationservice} _locationservice
     */
    constructor(
        private _locationservice: LocationsService
    )
    {
        super();
    } 

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        return this._locationservice.onLocationsChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}

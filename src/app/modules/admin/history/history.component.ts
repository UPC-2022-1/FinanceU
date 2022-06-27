import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertService, FuseAlertType } from '@fuse/components/alert';
import { Bono } from 'app/models/bono';
import { BonoService } from 'app/services/bono.service';

@Component({
    selector: 'calculator',
    templateUrl: './history.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class HistoryComponent implements OnInit {
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    data: any[];
    showAlert: boolean = false;
    /**
     * Constructor
     */
    constructor(private _bonoService: BonoService,
        private _router: Router,
    ) { }

    ngOnInit(): void {
        this._bonoService.getBonos().subscribe((data) => {
            this.data = data;
        });
    }

    cargar(bono: Bono): void {
        localStorage.setItem('bono', JSON.stringify(bono));
        this._router.navigateByUrl('/calculator');
    }
}

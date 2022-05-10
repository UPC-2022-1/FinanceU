import {
    Component,
    OnChanges,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { Bono } from 'app/models/bono';
import { BonoService } from 'app/services/bono.service';

@Component({
    selector: 'calculator',
    templateUrl: './calculator.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class CalculatorComponent implements OnInit, OnDestroy, OnChanges {
    @ViewChild('bonoDataNgForm') bonoDataNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };

    public bono: Bono = new Bono();
    public bonoDataForm: FormGroup;
    showAlert: boolean = false;
    /**
     * Constructor
     */
    constructor(
        private _bonoService: BonoService,
        private _formBuilder: FormBuilder,
    ) {}
    ngOnDestroy(): void {}
    ngOnChanges(): void {}
    ngOnInit(): void {
        // Create the form
        this.bonoDataForm = this._formBuilder.group({
            moneda: ['USD'],
            valorNominal     : ['0'],
            valorComercial  : ['0'],
        });
    }
}

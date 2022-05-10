import {
    Component,
    OnChanges,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
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
    columns: number = 16;
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
        private _formBuilder: FormBuilder
    ) {}
    ngOnDestroy(): void {}
    ngOnChanges(): void {}
    ngOnInit(): void {
        this.bono.moneda = 'USD';
        this.bono.valorNominal = 0;
        this.bono.valorComercial = 0;
        this.bono.numeroAnios = 0;

        // Create the form
        this.bonoDataForm = this._formBuilder.group({
            moneda: ['USD'],
            valorNominal: ['0'],
            valorComercial: ['0'],
        });
    }
}

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
import { Indicadores } from 'app/models/indicadores';
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
    public indicadores: Indicadores = new Indicadores();
    public bonoDataForm: FormGroup;
    public indicadoresDataForm: FormGroup;
    showAlert: boolean = false;
    /**
     * Constructor
     */
    constructor(
        private _bonoService: BonoService,
        private _formBuilder: FormBuilder
    ) {}
    ngOnDestroy(): void {}
    ngOnChanges(): void {
        this.calculate();
    }
    ngOnInit(): void {
        // Create the form
        this.bonoDataForm = this._formBuilder.group({
            moneda: ['USD'],
            valorNominal: ['0'],
            valorComercial: ['0'],
            numeroAnios: ['0'],
            frecuenciaCupon: ['MENSUAL'],
            diasXAnio: ['360'],
            tipoTasaInteres: ['EFECTIVA'],
            capitalizacion: ['MENSUAL'],
            tasaInteres: ['0'],
            tasaAnualDescuento: ['0'],
            fechaEmision: [new Date()],
            impuestoRenta: ['0'],
            prima: ['0'],
            estructuracion: ['0'],
            colocacion: ['0'],
            flotacion: ['0'],
            cavali: ['0'],
            tipoBono: ['AMERICANO'],
        });
        this.indicadoresDataForm = this._formBuilder.group({
            frecuenciaCupon: ['0'],
            diasCapitalizacion: ['0'],
            periodosAnio: ['0'],
            totalPeriodos: ['0'],
            tasaEfectivaAnual: ['0'],
            tasaEfectiva: ['0'],
            cok: ['0'],
            costesInicialesEmisor: ['0'],
            costesInicialesBonista: ['0'],
            precioActual: ['0'],
            utilidadPerdida: ['0'],
            duracion: ['0'],
            convexidad: ['0'],
            total: ['0'],
            duracionModificada: ['0'],
            tceaEmisor: ['0'],
            tceaEmisorEscudo: ['0'],
            treaBonista: ['0'],
        });
        this.calculate();
    }

    calculate(): void {
        try {
            this.showAlert = false;
            switch (this.bono.frecuenciaCupon) {
                case 'MENSUAL':
                    this.indicadores.frecuenciaCupon = 30;
                    break;
                case 'BIMESTRAL':
                    this.indicadores.frecuenciaCupon = 60;
                    break;
                case 'TRIMESTRAL':
                    this.indicadores.frecuenciaCupon = 90;
                    break;
                case 'SEMESTRAL':
                    this.indicadores.frecuenciaCupon = 180;
                    break;
                case 'ANUAL':
                    this.indicadores.frecuenciaCupon = 360;
                    break;
                default:
                    this.indicadores.frecuenciaCupon = 30;
            }
        } catch (error) {
            this.alert = {
                type: 'error',
                message: error.message,
            };
            this.showAlert = true;
        }
        try {
            this.showAlert = false;
            switch (this.bono.capitalizacion) {
                case 'DIARIA':
                    this.indicadores.diasCapitalizacion = 1;
                    break;
                case 'QUINCENAL':
                    this.indicadores.diasCapitalizacion = 15;
                    break;
                case 'MENSUAL':
                    this.indicadores.diasCapitalizacion = 30;
                    break;
                case 'BIMESTRAL':
                    this.indicadores.diasCapitalizacion = 60;
                    break;
                case 'TRIMESTRAL':
                    this.indicadores.diasCapitalizacion = 90;
                    break;
                case 'SEMESTRAL':
                    this.indicadores.diasCapitalizacion = 180;
                    break;
                case 'ANUAL':
                    this.indicadores.diasCapitalizacion = 360;
                    break;
                default:
                    this.indicadores.diasCapitalizacion = 30;
            }
        } catch (error) {
            this.alert = {
                type: 'error',
                message: error.message,
            };
            this.showAlert = true;
        }
        try {
            this.indicadores.periodosAnio =
                this.bono.diasXAnio / this.indicadores.frecuenciaCupon;
        } catch (error) {
            this.alert = {
                type: 'error',
                message: error.message,
            };
            this.showAlert = true;
        }
        try {
            this.indicadores.totalPeriodos =
                this.indicadores.periodosAnio * this.bono.numeroAnios;
        } catch (error) {
            this.alert = {
                type: 'error',
                message: error.message,
            };
            this.showAlert = true;
        }
        try {
            switch (this.bono.tipoTasaInteres) {
                case 'EFECTIVA':
                    this.indicadores.tasaEfectivaAnual =
                        this.bono.tasaInteres / 100;
                    break;
                case 'NOMINAL':
                    this.indicadores.tasaEfectivaAnual =
                        (1 +
                            this.bono.tasaInteres /
                                100 /
                                (this.bono.diasXAnio /
                                    this.indicadores.diasCapitalizacion)) **
                        (this.bono.diasXAnio /
                            this.indicadores.diasCapitalizacion);
                    this.indicadores.tasaEfectivaAnual *= 100;
                    break;
            }
        } catch (error) {
            this.alert = {
                type: 'error',
                message: error.message,
            };
            this.showAlert = true;
        }
        try {
            this.indicadores.tasaEfectiva.type = this.bono.frecuenciaCupon;
            this.indicadores.tasaEfectiva.value =
                (1 + this.indicadores.tasaEfectivaAnual / 100) **
                    (this.indicadores.frecuenciaCupon / this.bono.diasXAnio) -
                1;
            this.indicadores.tasaEfectiva.value *= 100;
        } catch (error) {
            this.alert = {
                type: 'error',
                message: error.message,
            };
            this.showAlert = true;
        }
        try {
            this.indicadores.cok.type = this.bono.frecuenciaCupon;
            this.indicadores.cok.value =
                (1 + this.bono.tasaAnualDescuento / 100) **
                    (this.indicadores.frecuenciaCupon / this.bono.diasXAnio) -
                1;
            this.indicadores.cok.value *= 100;
        } catch (error) {
            this.alert = {
                type: 'error',
                message: error.message,
            };
            this.showAlert = true;
        }
        try {
            this.indicadores.costesInicialesEmisor =
                ((this.bono.estructuracion +
                    this.bono.colocacion +
                    this.bono.flotacion +
                    this.bono.cavali) /
                    100) *
                this.bono.valorComercial;
        } catch (error) {
            this.alert = {
                type: 'error',
                message: error.message,
            };
            this.showAlert = true;
        }
        try {
            this.indicadores.costesInicialesBonista =
                ((this.bono.flotacion + this.bono.cavali) / 100) *
                this.bono.valorComercial;
        } catch (error) {
            this.alert = {
                type: 'error',
                message: error.message,
            };
            this.showAlert = true;
        }
        try {
            this.indicadores.costesInicialesBonista =
                ((this.bono.flotacion + this.bono.cavali) / 100) *
                this.bono.valorComercial;
        } catch (error) {
            this.alert = {
                type: 'error',
                message: error.message,
            };
            this.showAlert = true;
        }
    }
}
